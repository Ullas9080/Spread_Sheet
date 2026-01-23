import { uploadToDrive } from "../services/driveService.js";

export const uploadFile = async (req, res) => {
  try {
    console.log("Upload API hit");

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const driveFile = await uploadToDrive(file);

    return res.json({
      success: true,
      message: "File uploaded to Google Drive",
      fileId: driveFile.id
    });

  } catch (error) {
    console.error("Upload error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
