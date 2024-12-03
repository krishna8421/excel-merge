import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExcelMergerStore } from "@/lib/store";

export function CommonColumnSelector() {
  const { files, selectedColumn, setSelectedColumn } = useExcelMergerStore();

  if (files.length !== 2) return null;

  const commonColumns = files[0].columns.filter((col) =>
    files[1].columns.includes(col)
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Select Common Column
      </h2>
      <Select onValueChange={setSelectedColumn} value={selectedColumn}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a column" />
        </SelectTrigger>
        <SelectContent>
          {commonColumns.map((column) => (
            <SelectItem key={column} value={column}>
              {column}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
