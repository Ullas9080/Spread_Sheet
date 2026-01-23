import { google } from "googleapis";
import { oauth2Client } from "../config/googleAuth.js";
import { Readable } from "stream";

export const uploadToDrive = async (file) => {
  if (!oauth2Client.credentials?.access_token) {
    throw new Error("User not authenticated with Google");
  }

  const drive = google.drive({
    version: "v3",
    auth: oauth2Client
  });

  const bufferStream = new Readable();
  bufferStream.push(file.buffer);
  bufferStream.push(null);

  const response = await drive.files.create({
    requestBody: {
      name: file.originalname
    },
    media: {
      mimeType: file.mimetype,
      body: bufferStream
    }
  });

  return response.data;
};
