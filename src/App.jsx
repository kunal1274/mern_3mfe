import React, { useState } from "react";
import * as XLSX from "xlsx";
import { format, parse } from "date-fns"; // Importing for date formatting

const ExcelUpload = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Format Dates and Times in the data
      jsonData = jsonData.map((row) => ({
        ...row,
        Date: formatDate(row.Date), // Custom function to handle date conversion
        Duration: formatTime(row.Duration), // Custom function to handle time conversion
      }));

      setData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  // Function to format Excel date serial numbers
  const formatDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30); // Excel's base date (Dec 30, 1899)
    const days = Math.floor(serial);
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    return format(date, "dd/MM/yyyy"); // Using date-fns to format the date
  };

  // Function to format Excel date-time serial numbers
  const formatDateTime = (serial) => {
    const excelEpoch = new Date(1899, 11, 30); // Excel's base date (Dec 30, 1899)
    const days = Math.floor(serial);
    const time = serial - days;

    // Calculate date part
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);

    // Calculate time part (fractional day)
    const totalSeconds = Math.round(86400 * time); // 86400 seconds in a day
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Combine date and time
    const formattedDate = format(date, "dd/MM/yyyy");
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return `${formattedDate} ${formattedTime}`;
  };

  // Function to format Excel time serials as "hh:mm:ss"
  const formatTime = (serial) => {
    const totalSeconds = Math.round(86400 * serial); // 86400 seconds in a day
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {data.length > 0 && (
        <div className="flex flex-col justify-start">
          <h3>Excel Data:</h3>
          <table border="1" className="overflow-x-auto overflow-y-auto">
            <thead className="">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, idx) => (
                    <td key={idx}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const ExcelUpload1 = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Format Dates and Times in the data
      jsonData = jsonData.map((row) => ({
        ...row,
        Date: formatDate(row.Date), // Custom function to handle date conversion
        Duration: formatTime(row.Duration), // Custom function to handle time conversion
      }));

      setData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  // Function to format Excel date serial numbers
  const formatDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30); // Excel's base date (Dec 30, 1899)
    const days = Math.floor(serial);
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    return format(date, "dd/MM/yyyy"); // Using date-fns to format the date
  };

  // Function to format Excel date-time serial numbers
  const formatDateTime = (serial) => {
    const excelEpoch = new Date(1899, 11, 30); // Excel's base date (Dec 30, 1899)
    const days = Math.floor(serial);
    const time = serial - days;

    // Calculate date part
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);

    // Calculate time part (fractional day)
    const totalSeconds = Math.round(86400 * time); // 86400 seconds in a day
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Combine date and time
    const formattedDate = format(date, "dd/MM/yyyy");
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return `${formattedDate} ${formattedTime}`;
  };

  // Function to format Excel time serials as "hh:mm:ss"
  const formatTime = (serial) => {
    const totalSeconds = Math.round(86400 * serial); // 86400 seconds in a day
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-2 p-2 border rounded-lg"
      />
      {data.length > 0 && (
        <div className="flex flex-col justify-start mt-4">
          <h3 className="text-md font-semibold mb-3">Excel Data:</h3>
          <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((val, idx) => (
                      <td
                        key={idx}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <>
      <h1>The tickets</h1>
      <ExcelUpload1 />
    </>
  );
}

export default App;
