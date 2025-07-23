import { cn } from "../../lib/utils";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { uploadToCloudinary } from "../../lib/uploadToCloudinary";
import { LoaderOne } from "./loader";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (urls: string[]) => void; // ✅ Now returns URL strings
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false); // 💡 show loading if needed

  const handleFileChange = async (newFiles: File[]) => {
    setUploading(true);
    setFiles((prevFiles) => [...newFiles, ...prevFiles]);
    const cloudUrls: string[] = [];
    for (const file of newFiles) {
      const blobUrl = URL.createObjectURL(file);
      const cloudUrl = await uploadToCloudinary(blobUrl);
      if (cloudUrl) cloudUrls.push(cloudUrl);
    }

    onChange?.(cloudUrls); // ✅ pass uploaded URLs
    setUploading(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your images here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {/* <button className="p-5 absolute right-0 -top-0 rounded-2xl">
                    <X />
                  </button> */}

            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >

                  {/* file name and type */}
                  <div className="w-full flex justify-between">
                    <div className="flex text-sm flex-col gap-y-4 max-h-18 justify-between text-neutral-600 dark:text-neutral-400">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2) || "32"} MB
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                      >
                        {file.type || "image/png"}
                      </motion.p>

                    </div>
                    <div className="flex justify-end w-full flex-1 items-center gap-4">
                      {uploading && idx === (files.length - files.length) && (
                        <div className="absolute z-20 top-1/2 right-10">
                          <LoaderOne />
                        </div>
                      )}
                      <motion.img
                        src={URL.createObjectURL(file)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className={`object-contain ${uploading && idx === (files.length - files.length) && 'blur-lg'} rounded-xl w-32`}
                      />

                    </div>
                  </div>

                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${index % 2 === 0
                ? "bg-gray-50 dark:bg-neutral-950"
                : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                }`}
            />
          );
        })
      )}
    </div>
  );
}
