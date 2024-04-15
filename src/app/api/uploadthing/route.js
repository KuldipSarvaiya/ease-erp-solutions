import { createUploadthing, getFileChunk } from "uploadthing";

const uploadthing = createUploadthing({
  // Set your desired options here
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const chunk = await getFileChunk(req);
    const body = await uploadthing.handleUpload(chunk);
    res.status(200).send(body);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: e.message });
  }
}