import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useExcelMergerStore } from "@/lib/store";

export function FileDropZone() {
  const { files, handleFilesAccepted } = useExcelMergerStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleFilesAccepted(acceptedFiles);
    },
    [handleFilesAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 2,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition duration-300 ease-in-out transform hover:border-blue-500 hover:bg-blue-50 hover:scale-105"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <FiUploadCloud className="w-12 h-12 text-gray-400" />
        {isDragActive ? (
          <p className="text-lg font-semibold text-blue-500">
            Drop the Excel file here ...
          </p>
        ) : (
          <p className="text-lg font-semibold text-gray-600">
            {files.length === 0
              ? "Drag 'n' drop two Excel files here, or click to select files"
              : files.length === 1
              ? "Drag 'n' drop one more Excel file, or click to select it"
              : "Two files selected. Drop a file to replace the last one."}
          </p>
        )}
        <p className="text-sm text-gray-500">
          (Only *.xlsx files will be accepted)
        </p>
      </div>
    </div>
  );
}
