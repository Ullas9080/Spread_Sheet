import { google } from "googleapis";
import { oauth2Client } from "../config/googleAuth.js";
import { Readable } from "stream";

export const uploadToDrive = async (file) => {
  if (!oauth2Client.credentials?.access_token) {
    throw new Error("User not authenticated");
  }

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  const stream = new Readable();
  stream.push(file.buffer);
  stream.push(null);

  const response = await drive.files.create({
    requestBody: {
      name: file.originalname,
      mimeType: "application/vnd.google-apps.spreadsheet"
    },
    media: {
      mimeType: file.mimetype,
      body: stream
    }
  });

  return response.data.id;
};
