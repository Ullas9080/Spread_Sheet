import { uploadToDrive } from "../services/driveService.js";

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false });
    }

    const rawSpreadsheetId = await uploadToDrive(file);

    res.json({
      success: true,
      rawSpreadsheetId
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
