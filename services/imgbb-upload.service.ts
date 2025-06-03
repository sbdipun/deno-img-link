import { IMGBB_UPLOAD_URL } from "../config/config.ts";

interface ImgBBResponse {
  url?: string;
  error?: any;
}

export const ImgbbUploadService = {
  async uploadImage(fileContent: ArrayBuffer): Promise<string | null> {
    try {
      const formData = new FormData();
      const fileName = `${crypto.randomUUID()}.jpg`;
      
      formData.append("file", new Blob([fileContent], { type: "image/jpeg" }), fileName);

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