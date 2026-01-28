import axios from "axios";

export const processSheet = async (req, res) => {
  try {
    const { rawSpreadsheetId } = req.body;

    const response = await axios.post(
      process.env.APPS_SCRIPT_URL,
      { rawSpreadsheetId }
    );

    const parsed =
      typeof response.data === "string"
        ? JSON.parse(response.data)
        : response.data;

    console.log("Parsed Apps Script response:", parsed);

    if (!parsed.url) {
      return res.status(500).json({
        error: "Sheet URL missing from Apps Script"
      });
    }

    res.json({
      success: true,
      newSheetUrl: parsed.url
    });

  } catch (err) {
    console.error("Process error:", err);
    res.status(500).json({ error: "Processing failed" });
  }
};
