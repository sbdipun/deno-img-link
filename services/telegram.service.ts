import { BOT_TOKEN, DEVELOPER_ID } from "../config/config.ts";

const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

interface MessageOptions {
  parse_mode?: string;
  reply_markup?: any;
  disable_web_page_preview?: boolean;
}

export const TelegramService = {  async sendMessage(
    chatId: number, 
    text: string, 
    options: MessageOptions = {}
  ): Promise<Response> {
    const response = await fetch(`${API_URL}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        ...options
      }),
    });
    if (!response.ok) {
      console.error('Telegram API Error:', await response.text());
    }
    return response;
  },

  async sendPhoto(
    chatId: number, 
    photo: string, 
    caption: string,
    replyMarkup?: any
  ): Promise<Response> {
    return fetch(`${API_URL}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        photo,
        caption,
        parse_mode: "HTML",
        reply_markup: replyMarkup
      }),
    });
  },

  async getFileUrl(fileId: string): Promise<string> {
    const response = await fetch(`${API_URL}/getFile?file_id=${fileId}`);
    const data = await response.json();
    return data.result?.file_path 
      ? `https://api.telegram.org/file/bot${BOT_TOKEN}/${data.result.file_path}`
      : "";
  },

  async answerCallbackQuery(
    callbackQueryId: string,
    text?: string
  ): Promise<Response> {
    return fetch(`${API_URL}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text,
      }),
    });
  },

  async editMessageText(
    chatId: number,
    messageId: number,
    text: string,
    options: MessageOptions = {}
  ): Promise<Response> {
    return fetch(`${API_URL}/editMessageText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: "HTML",
        ...options
      }),
    });
  }
};