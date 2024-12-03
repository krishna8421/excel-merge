import { FiFile } from "react-icons/fi";
import { useExcelMergerStore } from "../lib/store";

export function FileList() {
  const files = useExcelMergerStore((state) => state.files);

  if (files.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-semibold text-gray-600 mb-2">
        Selected files:
      </h4>
      <ul className="list-none">
        {files.map((excelFile, index) => (
          <li
            key={index}
            className="flex items-center text-sm text-gray-600 mb-1"
          >
            <FiFile className="mr-2" />
            {excelFile.file.name}
            <span className="ml-2 text-xs text-gray-500">
              ({excelFile.columns.length} columns)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
