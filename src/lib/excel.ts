import * as XLSX from "xlsx";

export function readExcelFile(file: File): Promise<XLSX.WorkSheet> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      resolve(worksheet);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

export function getColumnsFromWorksheet(worksheet: XLSX.WorkSheet): string[] {
  const range = XLSX.utils.decode_range(worksheet["!ref"] as string);
  const columns: string[] = [];
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + "1";
    if (!worksheet[address]) continue;
    columns.push(XLSX.utils.format_cell(worksheet[address]));
  }
  return columns;
}

interface ExcelRow {
  [key: string]: string | number | boolean | null | undefined;
}

export function mergeWorksheets(
  ws1: XLSX.WorkSheet,
  ws2: XLSX.WorkSheet,
  column1: string,
  column2: string,
  newColumnName: string
): XLSX.WorkSheet {
  const data1 = XLSX.utils.sheet_to_json<ExcelRow>(ws1);
  const data2 = XLSX.utils.sheet_to_json<ExcelRow>(ws2);

  const mergedData = data1.map((row1) => {
    const matchingRow = data2.find((row2) => row2[column2] === row1[column1]);

    if (matchingRow) {
      const mergedRow: ExcelRow = { ...row1, ...matchingRow };
      if (newColumnName && newColumnName !== column1) {
        mergedRow[newColumnName] = mergedRow[column1];
        delete mergedRow[column1];
      }
      return mergedRow;
    }
    return row1;
  });

  return XLSX.utils.json_to_sheet(mergedData);
}
