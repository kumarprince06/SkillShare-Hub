const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const UploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "skillshare_hub");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    // console.log("Upload response:", data);
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default UploadImage;
