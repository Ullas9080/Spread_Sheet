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
