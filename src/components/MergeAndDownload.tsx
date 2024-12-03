import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";
import { useExcelMergerStore } from "@/lib/store";

export function MergeAndDownload() {
  const { handleMerge, mergedData, finalFileName, setFinalFileName } =
    useExcelMergerStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    if (mergedData) {
      setIsDownloading(true);
      try {
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, mergedData, "Merged Data");
        XLSX.writeFile(wb, finalFileName);
      } catch (error) {
        console.error("Error downloading file:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Enter final file name"
          value={finalFileName}
          onChange={(e) => setFinalFileName(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleMerge}>Merge Files</Button>
      </div>
      <Button
        onClick={handleDownload}
        disabled={!mergedData || isDownloading}
        className="w-full"
      >
        {isDownloading ? "Downloading..." : "Download Merged File"}
      </Button>
    </div>
  );
}
