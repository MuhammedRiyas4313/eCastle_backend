import fs from "fs";
import path from "path";

export const storeFileAndReturnNameBase64 = async (base64: string): Promise<string> => {
  try {
    // Validate base64 input
    if (!base64 || typeof base64 !== "string") {
      throw new Error("Invalid base64 string");
    }

    // Extract parts
    const parts = base64.split(",");
    if (parts.length !== 2) {
      throw new Error('Invalid base64 format - should be "data:image/type;base64,actualData"');
    }

    const [header, data] = parts;
    const extensionMatch = header.match(/^data:image\/(\w+);base64$/);

    if (!extensionMatch) {
      throw new Error("Invalid base64 header - only image files supported");
    }

    const extension = extensionMatch[1];
    const filename = `${Date.now()}.${extension}`;
    const uploadDir = "./public/uploads";
    const filePath = path.join(uploadDir, filename);

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write file
    await fs.promises.writeFile(filePath, data, "base64");

    return filename;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error; // Re-throw for the caller to handle
  }
};
