"use client";

// import "@uploadthing/react/styles.css";
// import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
// import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { Avatar, Snippet } from "@nextui-org/react";
import { useState } from "react";

export const UploadButton = generateUploadButton(ourFileRouter);

export const UploadDropzone = generateUploadDropzone(ourFileRouter);

export function ImageUploadButton({ image, setImage }) {
  const [success, setSuccess] = useState(false);

  return (
    <div className="md:col-start-2 md:col-end-4    flex flex-row flex-nowrap items-center gap-3 bg-default-100 rounded-lg border-md py-1 px-2 border-default-200 w-max border-2 hover:border-[#9455D3]">
      <Avatar size="md" src={image} />
      {/* <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} /> */}
      <UploadButton
        skipPolling={true}
        appearance={{
          button:
            "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none p-1  border-2 border-default-200 text-white h-fit min-w-20 block",
          container: "flex-row justify-start",
          allowedContent:
            "flex flex-col items-center justify-center px-2 text-white",
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setImage(res[0].url);
          // console.log("Files: ", res, res[0].url);
          setSuccess("✅ Uploading Successful");
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }}
        onUploadError={(error) => {
          // alert(`ERROR! ${error.message}`);
          // console.log(error);
          setSuccess("⚠️ Uploading Failed");
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }}
      />
      {success !== false && (
        <Snippet
          color={success.includes("Successful") ? "success" : "danger"}
          hideCopyButton
          hideSymbol
        >
          {success}
        </Snippet>
      )}
    </div>
  );
}
