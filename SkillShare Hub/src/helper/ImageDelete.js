import SummaryAPI from "../common/API";

const deleteUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUD_NAME_CLOUDINARY}/image/destroy`;

const DeleteImage = async (publicId) => {
  const timestamp = Math.floor(Date.now() / 1000);

  try {
    // Get the signature from the backend
    // console.log("Backend API Called")
    const signatureResponse = await fetch(SummaryAPI.deleteCloudImage.url, {
      method: SummaryAPI.deleteCloudImage.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id: publicId, timestamp }),
    });

    const signatureData = await signatureResponse.json();

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", signatureData.api_key);
    formData.append("timestamp", signatureData.timestamp);
    formData.append("signature", signatureData.signature);
    // console.log("Cloud API Call")
    const response = await fetch(deleteUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Delete response:", data);
    return data;
  } catch (error) {
    // console.log("Error deleting image:", error);
    return null;
  }
};

export default DeleteImage;
