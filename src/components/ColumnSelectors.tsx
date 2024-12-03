import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useExcelMergerStore } from "@/lib/store";

export function ColumnSelectors() {
  const {
    files,
    selectedColumns,
    setSelectedColumns,
    newColumnName,
    setNewColumnName,
  } = useExcelMergerStore();

  if (files.length !== 2) return null;

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Select Matching Columns
      </h2>
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="file1-column">File 1 Column</Label>
          <Select
            value={selectedColumns[0]}
            onValueChange={(value) =>
              setSelectedColumns([value, selectedColumns[1]])
            }
          >
            <SelectTrigger id="file1-column">
              <SelectValue placeholder="Select a column" />
            </SelectTrigger>
            <SelectContent>
              {files[0].columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="file2-column">File 2 Column</Label>
          <Select
            value={selectedColumns[1]}
            onValueChange={(value) =>
              setSelectedColumns([selectedColumns[0], value])
            }
          >
            <SelectTrigger id="file2-column">
              <SelectValue placeholder="Select a column" />
            </SelectTrigger>
            <SelectContent>
              {files[1].columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="new-column-name">New Column Name (optional)</Label>
        <Input
          id="new-column-name"
          type="text"
          placeholder="Enter new column name"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        />
      </div>
    </div>
  );
}
