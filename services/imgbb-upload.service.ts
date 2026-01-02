import { IMGBB_UPLOAD_URL } from "../config/config.ts";

interface ImgBBResponse {
  url?: string;
  error?: any;
}

export const ImgbbUploadService = {
  async uploadImage(fileContent?: ArrayBuffer, imageUrl?: string): Promise<string | null> {
    try {
      const formData = new FormData();

      if (imageUrl) {
        // Upload via remote URL
        formData.append("url", imageUrl);
      } else if (fileContent) {
        // Upload via local file
        const fileName = `${crypto.randomUUID()}.jpg`;
        formData.append("file", new Blob([fileContent], { type: "image/jpeg" }), fileName);
      } else {
        throw new Error("Either fileContent or imageUrl must be provided.");
      }

      const response = await fetch(IMGBB_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data: ImgBBResponse = await response.json();
      return data.url || null;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  }
};