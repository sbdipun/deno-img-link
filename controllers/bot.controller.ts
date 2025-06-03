import { UserRepository } from "../database/repositories/user.repository.ts";
import { TelegramService } from "../services/telegram.service.ts";
import { ImageUploadService } from "../services/image-upload.service.ts";
import { ImgbbUploadService } from "../services/imgbb-upload.service.ts";
import { SubscriptionService } from "../services/subscription.service.ts";
import { 
  USE_DB, 
  WELCOME_IMAGE_URL, 
  DEVELOPER_ID,
  CLEAN_USERNAME
} from "../config/config.ts";

interface ImageData {
  fileId: string;
  messageId: number;
}

// Store temporary image data
const pendingUploads = new Map<number, ImageData>();

export const BotController = {
  async handleUpdate(update: any): Promise<Response> {
    if (update.callback_query) {
      return await this.handleCallbackQuery(update.callback_query);
    }

    if (!update.message) return new Response("OK");

    const { chat, from, text, photo, document } = update.message;
    const chatId = chat.id;
    const userId = from.id;

    try {
      if (text === "/start") {
        if (USE_DB) await UserRepository.createUser(userId);
        
        await TelegramService.sendPhoto(
          chatId,
          WELCOME_IMAGE_URL,
          `<b>🖍️ Welcome to Image to Link Bot!</b>\n\n` +
          `<i>Send me an image (as photo or file) to get a shareable link</i>`,
          {
            inline_keyboard: [
              [{
                text: "Join Channel 📢",
                url: `https://t.me/${CLEAN_USERNAME}`
              }],
            ]
          }
        );
        return new Response("OK");
      }

      if (text === "/users") {
        const responseText = USE_DB
          ? `Total users: ${(await UserRepository.getAllUsers()).length}`
          : "📊 Database not configured";
        await TelegramService.sendMessage(chatId, responseText);
        return new Response("OK");
      }

      // Handle both photos and document-based images
      if (photo || (document?.mime_type?.startsWith('image/'))) {
        const hasAccess = await SubscriptionService.checkSubscription(chatId);
        if (!hasAccess) {
          await TelegramService.sendMessage(
            chatId,
            `Join our channel to get started\n\n` +
            `<a href="https://t.me/${CLEAN_USERNAME}">👉 Click here to join</a>`,
            { disable_web_page_preview: true }
          );
          return new Response("OK");
        }

        let fileId: string;
        if (photo) {
          fileId = photo.pop().file_id;
        } else {
          fileId = document.file_id;
        }

        // Send message with upload options
        const response = await TelegramService.sendMessage(
          chatId,
          "Choose an upload service:",
          {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: "Upload to ImgBB 🖼", callback_data: `imgbb_${fileId}` },
                  { text: "Upload to envs.sh 📤", callback_data: `envsh_${fileId}` }
                ]
              ]
            }
          }
        );

        const responseData = await response.json();
        if (responseData.ok) {
          // Store the file ID and message ID for later use
          pendingUploads.set(chatId, {
            fileId,
            messageId: responseData.result.message_id
          });
        }

        return new Response("OK");
      }

      if (document) {
        await TelegramService.sendMessage(
          chatId,
          "❌ Unsupported file type. Please send an image file (JPEG, PNG, etc.)"
        );
        return new Response("OK");
      }

      await TelegramService.sendMessage(
        chatId,
        "📸 Send me an image (as photo or file) to get started!\n\n" +
        "✨ Features:\n" +
        "- Convert images to direct links\n" +
        "- Multiple imagehosts coming soon",
      );
    } catch (error) {
      console.error("Handler error:", error);
      await TelegramService.sendMessage(
        chatId,
        "⚠️ Oops! Something went wrong. Please try again."
      );
    }

    return new Response("OK");
  },

  async handleCallbackQuery(callbackQuery: any): Promise<Response> {
    const { id, from, data, message } = callbackQuery;
    const chatId = message.chat.id;
    const messageId = message.message_id;

    try {
      const [service, fileId] = data.split('_');
      let imageUrl: string | null = null;

      await TelegramService.editMessageText(
        chatId,
        messageId,
        "⏳ Uploading image..."
      );

      const fileUrl = await TelegramService.getFileUrl(fileId);
      if (!fileUrl) throw new Error("Failed to get file URL");

      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Failed to download image");
      const fileContent = await response.arrayBuffer();

      if (service === 'imgbb') {
        imageUrl = await ImgbbUploadService.uploadImage(fileContent);
      } else if (service === 'envsh') {
        imageUrl = await ImageUploadService.uploadImage(fileContent);
      }

      if (imageUrl) {
        await TelegramService.editMessageText(
          chatId,
          messageId,
          `✅ Upload successful!\n\n${imageUrl}`,
          {
            reply_markup: {
              inline_keyboard: [
                [{ 
                  text: "Share Link 🔗", 
                  url: `tg://msg_url?url=${encodeURIComponent(imageUrl)}`
                }],
              ]
            }
          }
        );
      } else {
        await TelegramService.editMessageText(
          chatId,
          messageId,
          "❌ Failed to upload image"
        );
      }

      await TelegramService.answerCallbackQuery(id);
    } catch (error) {
      console.error("Callback query error:", error);
      await TelegramService.answerCallbackQuery(id, "⚠️ Error processing upload");
      await TelegramService.editMessageText(
        chatId,
        messageId,
        "❌ Failed to process image"
      );
    }

    return new Response("OK");
  }
};
