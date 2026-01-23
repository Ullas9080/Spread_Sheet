import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
const CLIENT_ID =process.env.CLIENT_ID ;
const CLIENT_SECRET =process.env.ClIENT_SECRET ;
const REDIRECT_URI =process.env.REDIRECT_URI ;

export const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
