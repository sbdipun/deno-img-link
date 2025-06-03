import { ENVS_SH_UPLOAD_URL } from "../config/config.ts";

export const ImageUploadService = {
  async uploadImage(
    fileContent?: ArrayBuffer,
    imageUrl?: string
  ): Promise<string | null> {
    try {
      const formData = new FormData();

      if (imageUrl) {
        // Upload via remote URL
        formData.append("url", imageUrl);
      } else if (fileContent) {
        // Upload via local file
        const blob = new Blob([fileContent], { type: "image/jpeg" });
        const fileName = `${crypto.randomUUID()}.jpg`;
        formData.append("file", blob, fileName);
      } else {
        throw new Error("Either fileContent or imageUrl must be provided.");
      }

      // Send request
      const response = await fetch(ENVS_SH_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // envs.sh returns plain text URL
      const url = await response.text();
      const cleanedUrl = url.trim();

      if (cleanedUrl.startsWith("http")) {
        // Generate custom filename
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 10).replace(/-/g, "");
        const randomSuffix = Math.floor(Math.random() * 1000);
        const customFileName = `IMG${formattedDate}${randomSuffix}.jpg`;

        return `${cleanedUrl}/${customFileName}`;
      }

      return null;

    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  },
};
