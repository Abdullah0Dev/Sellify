export const uploadToCloudinary = async (
  blobUrl: string
): Promise<string | null> => {
  const blob = await fetch(blobUrl).then((res) => res.blob());

  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", "dev_preset"); // 🔑 your unsigned preset

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/drglfiyhj/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url; // ✅ Hosted URL
  } catch (err) {
    console.error("Upload failed:", err);
    return null;
  }
};
