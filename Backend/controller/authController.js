import { oauth2Client } from "../config/googleAuth.js";


export const googleLogin = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    scope: ["https://www.googleapis.com/auth/drive.file"]
  });

  res.redirect(authUrl);
};


export const googleCallback = async (req, res) => {
  try {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    res.redirect("http://localhost:5173/?login=success");

  } catch (error) {
    res.status(500).send("OAuth failed");
  }
};
