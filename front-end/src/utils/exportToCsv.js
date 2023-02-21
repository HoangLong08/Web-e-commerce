import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
// file-saver là một package npm dùng để lưu trữ và tải xuống tệp từ trình duyệt của người dùng. Nó cung cấp một cách đơn giản để tạo ra một tệp mới trực tiếp từ trình duyệt
//và tải xuống nó mà không cần máy chủ trung gian.

// xlsx:  đọc và ghi file Excel (.xlsx và .xls)
const exportToCSV = (csvData, fileName) => {
  console.log("csvData, fileName: ", csvData, fileName);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

export default exportToCSV;
