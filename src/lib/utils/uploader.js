import { createUploadthing } from "uploadthing/next";

const uploader = createUploadthing({
  endpoint: "/api/uploadthing",
  onUploadComplete: (upload) => {
    // Handle successful upload
    console.log("Upload complete:", upload);
  },
  onUploadError: (error) => {
    // Handle upload error
    console.error("Upload error:", error);
  },
  // Set other options as needed
});

export default uploader;
