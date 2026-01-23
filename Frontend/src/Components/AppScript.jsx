const sendToAppScript = async (rows) => {
  try {
    const response = await fetch("PASTE_YOUR_WEB_APP_URL_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ rows })
    });

    const result = await response.json();
    console.log("Apps Script Response:", result);
  } catch (error) {
    console.error("API Error:", error);
  }
};
export default sendToAppScript;