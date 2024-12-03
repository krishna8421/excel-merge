import { create } from "zustand";
import * as XLSX from "xlsx";
import {
  readExcelFile,
  getColumnsFromWorksheet,
  mergeWorksheets,
} from "./excel";
import { ExcelFile } from "@/types";

interface ExcelMergerState {
  files: ExcelFile[];
  selectedColumns: [string, string];
  newColumnName: string;
  finalFileName: string;
  mergedData: XLSX.WorkSheet | null;
  setFiles: (files: ExcelFile[]) => void;
  setSelectedColumns: (columns: [string, string]) => void;
  setNewColumnName: (name: string) => void;
  setFinalFileName: (name: string) => void;
  setMergedData: (data: XLSX.WorkSheet | null) => void;
  handleFilesAccepted: (acceptedFiles: File[]) => Promise<void>;
  handleMerge: () => Promise<void>;
}

export const useExcelMergerStore = create<ExcelMergerState>((set, get) => ({
  files: [],
  selectedColumns: ["", ""],
  newColumnName: "",
  finalFileName: "merged_data.xlsx",
  mergedData: null,
  setFiles: (files) => set({ files }),
  setSelectedColumns: (columns) => set({ selectedColumns: columns }),
  setNewColumnName: (name) => set({ newColumnName: name }),
  setFinalFileName: (name) =>
    set({ finalFileName: name.endsWith(".xlsx") ? name : `${name}.xlsx` }),
  setMergedData: (data) => set({ mergedData: data }),
  handleFilesAccepted: async (acceptedFiles) => {
    const currentFiles = get().files;
    const newFiles: ExcelFile[] = await Promise.all(
      acceptedFiles.map(async (file) => {
        const worksheet = await readExcelFile(file);
        const columns = getColumnsFromWorksheet(worksheet);
        return { file, columns };
      })
    );
    const updatedFiles = [...currentFiles, ...newFiles].slice(0, 2);
    set({ files: updatedFiles });
  },
  handleMerge: async () => {
    const { files, selectedColumns, newColumnName } = get();
    if (files.length === 2 && selectedColumns[0] && selectedColumns[1]) {
      const ws1 = await readExcelFile(files[0].file);
      const ws2 = await readExcelFile(files[1].file);
      const merged = mergeWorksheets(
        ws1,
        ws2,
        selectedColumns[0],
        selectedColumns[1],
        newColumnName
      );
      set({ mergedData: merged });
    }
  },
}));
