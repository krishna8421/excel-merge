"use client";

import { FileDropZone } from "@/components/FileDropZone";
import { FileList } from "@/components/FileList";
import { ColumnSelectors } from "@/components/ColumnSelectors";
import { MergeAndDownload } from "@/components/MergeAndDownload";

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Excel File Merger
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <FileDropZone />
        <FileList />
        <ColumnSelectors />
        <MergeAndDownload />
      </div>
    </main>
  );
}
