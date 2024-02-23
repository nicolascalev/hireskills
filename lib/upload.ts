import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";

if (!process.env.DO_SPACES_KEY || !process.env.DO_SPACES_SECRET) {
  throw new Error("DO_SPACES_KEY or DO_SPACES_SECRET env variables missing");
}

const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: "https://nyc3.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

const UPLOAD_MAX_MB = 4;

const path =
  process.env.NODE_ENV === "production" ? "hireskills/prod/" : "hireskills/dev/";

type FileObject = {
  size: number;
  mimetype: string;
  originalFilename: string;
  buffer: Buffer
};

const uploadSingleFile = async (file: FileObject) => {
  if (file.size / 1024 / 1000 > UPLOAD_MAX_MB) {
    return Promise.reject("The file is bigger than " + UPLOAD_MAX_MB + "MB");
  }
  const key = path + Date.now() + "-" + file.originalFilename;
  try {
    const data = await s3Client.send(
      new PutObjectCommand({
        ACL: "public-read",
        Bucket: "nicolascalev",
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentDisposition: "inline",
      })
    );
    const url = "https://nicolascalev.nyc3.cdn.digitaloceanspaces.com/" + key;
    return {
      url,
      key: key,
      originalFilename: file.originalFilename,
      ...data,
    };
  } catch (err) {
    return Promise.reject(err);
  }
};

export default uploadSingleFile;
