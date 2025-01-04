import * as XLSX from "xlsx";
import { PiFileXlsLight } from "react-icons/pi";

const ExportToExcel = ({ data, fileName, headers, name, onClick }) => {
  const handleExport = () => {
    // Format the data to match the headers (keep columns empty if missing)
    const formattedData = data.map((item) => {
      let row = {};
      headers.forEach((header) => {
        row[header.label] = item[header.key] || ""; // Keep blank if no data for this column
      });
      return row;
    });

    // Convert formatted data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleClick = (event) => {
    if (onClick) onClick(event);
    handleExport();
  };

  return (
    <div
      style={{
        color: "#3D8C29",
        padding: "8px 16px",
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") handleClick(e);
      }}
    >
      <span
        onClick={handleClick}
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        <PiFileXlsLight style={{ marginRight: "8px", fontSize: "24px" }} />
        {name || "Export To Excel"}
      </span>
    </div>
  );
};

export default ExportToExcel;
