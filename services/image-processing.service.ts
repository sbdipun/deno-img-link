import { TelegramService } from "./telegram.service.ts";
import { ImgbbUploadService } from "./imgbb-upload.service.ts";

export const ImageProcessingService = {
  async processImage(fileId?: string, imageUrl?: string): Promise<string> {
    try {
      if (fileId) {
        const fileUrl = await TelegramService.getFileUrl(fileId);
        if (!fileUrl) throw new Error("Failed to get file URL");

        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error("Failed to download image");
        
        const fileContent = await response.arrayBuffer();
        const uploadedUrl = await ImgbbUploadService.uploadImage(fileContent);
        return uploadedUrl || "Error uploading image to hosting service";
      } else if (imageUrl) {
        const uploadedUrl = await ImgbbUploadService.uploadImage(undefined, imageUrl);
        return uploadedUrl || "Error uploading image to hosting service";
      } else {
        throw new Error("Either fileId or imageUrl must be provided");
      }
    } catch (error) {
      console.error("Image processing error:", error);
      return "Error processing image";
    }
  }
};