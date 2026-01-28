
export const loginWithGoogle = () => {
  window.location.href = "http://localhost:5000/auth/google";
};

export const uploadExcel = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Upload failed");
  }

  return data; 

};

export const processSheet = async (rawSpreadsheetId) => {
  const response = await fetch("http://localhost:5000/process", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rawSpreadsheetId })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Processing failed");
  }

  return data; 
};
