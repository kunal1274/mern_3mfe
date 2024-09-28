import React, { useState, useEffect } from "react";
// import { Table, Column, AutoSizer } from "react-virtualized";
// import { AutoSizer, Table, Column } from "react-virtualized-auto-sizer";

//import "react-virtualized/styles.css"; // React-virtualized styles
import "./App.css";
import * as XLSX from "xlsx";
import { format, getTime, parse } from "date-fns"; // Importing for date formatting
import { loremIpsum } from "lorem-ipsum";
import { FixedSizeList as List } from "react-window";
// import { List, AutoSizer, Grid, Table, Column } from "react-virtualized";

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

const ExcelUploadWithTabs = () => {
  const [activeTab, setActiveTab] = useState("yesterdayTickets");
  const [loading, setLoading] = useState(false); // Loading state
  const [data, setData] = useState({
    yesterdayTickets: [],
    todayTickets: [],
    highPriority: [],
  });

  const handleFileUpload = (event, tabName) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    setLoading(true); // Start loading when the file is being processed

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Format Dates and Times in the data
      jsonData = jsonData.map((row) => ({
        ...row,
        ...(row.Date && { Date: formatDate(row.Date) }), // Only format Date if it exists
        ...(row.Duration && { Duration: formatTime(row.Duration) }), // Only format Duration if it exists
      }));

      setData((prevData) => ({
        ...prevData,
        [tabName]: jsonData,
      }));
      setLoading(false); // Stop loading once processing is done
    };

    reader.readAsArrayBuffer(file);
  };

  // Function to format Excel date serial numbers
  const formatDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    const days = Math.floor(serial);
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    return format(date, "dd/MM/yyyy");
  };

  // Function to format Excel time serials as "hh:mm:ss"
  const formatTime = (serial) => {
    const totalSeconds = Math.round(86400 * serial);
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
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "yesterdayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("yesterdayTickets")}
        >
          Yesterday Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "todayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("todayTickets")}
        >
          Today's Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "highPriority"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("highPriority")}
        >
          High Priority
        </button>
      </div>

      {/* File Upload */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => handleFileUpload(e, activeTab)}
          className="mb-2 p-2 border rounded-lg"
        />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="loader border-t-4 border-blue-400 border-solid rounded-full w-8 h-8 animate-spin mx-auto"></div>
          <p>Loading data, please wait...</p>
        </div>
      )}

      {/* Display Table */}
      {!loading && data[activeTab].length > 0 && (
        <div className="flex flex-col justify-start mt-4">
          <h3 className="text-md font-semibold mb-3">Excel Data:</h3>
          <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(data[activeTab][0]).map((colName) => (
                    <th
                      key={colName}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {colName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data[activeTab].map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((val, idx) => (
                      <td
                        key={idx}
                        className={`px-6 py-4 whitespace-normal w-96 text-sm font-medium text-gray-900`}
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

const ExcelUploadWithVirtualization = () => {
  const [activeTab, setActiveTab] = useState("yesterdayTickets");
  const [loading, setLoading] = useState(false); // Loading state
  const [data, setData] = useState({
    yesterdayTickets: [],
    todayTickets: [],
    highPriority: [],
  });

  const handleFileUpload = (event, tabName) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    setLoading(true); // Start loading when the file is being processed

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Format Dates and Times in the data
      jsonData = jsonData.map((row) => ({
        ...row,
        ...(row.Date && { Date: formatDate(row.Date) }), // Only format Date if it exists
        ...(row.Duration && { Duration: formatTime(row.Duration) }), // Only format Duration if it exists
      }));

      console.log("parsed json data", jsonData);
      setData((prevData) => ({
        ...prevData,
        [tabName]: jsonData,
      }));
      setLoading(false); // Stop loading once processing is done
    };

    reader.readAsArrayBuffer(file);
  };

  // Function to format Excel date serial numbers
  const formatDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    const days = Math.floor(serial);
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    return format(date, "dd/MM/yyyy");
  };

  // Function to format Excel time serials as "hh:mm:ss"
  const formatTime = (serial) => {
    const totalSeconds = Math.round(86400 * serial);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // Function to render each row in the virtualized list
  const rowRenderer = ({ key, index, style }) => {
    const row = data[activeTab][index];
    //if (!row) return null; // Add this safeguard in case the data isn't ready
    return (
      <tr key={key} style={style} className="border-b">
        {Object.values(row).map((val, idx) => (
          <td
            key={idx}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            {val}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "yesterdayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("yesterdayTickets")}
        >
          Yesterday Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "todayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("todayTickets")}
        >
          Today's Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "highPriority"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("highPriority")}
        >
          High Priority
        </button>
      </div>

      {/* File Upload */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => handleFileUpload(e, activeTab)}
          className="mb-2 p-2 border rounded-lg"
        />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="loader border-t-4 border-blue-400 border-solid rounded-full w-8 h-8 animate-spin mx-auto"></div>
          <p>Loading data, please wait...</p>
        </div>
      )}

      {/* Display Table */}
      {!loading && data[activeTab].length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-3">Excel Data:</h3>
          <div className="h-96">
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  width={width}
                  height={height}
                  headerHeight={40}
                  rowHeight={40}
                  rowCount={data[activeTab].length}
                  rowGetter={({ index }) => data[activeTab][index]}
                  className="border border-gray-300"
                >
                  {/* Dynamically Generate Columns */}
                  {Object.keys(data[activeTab][0]).map((key) => (
                    <Column
                      key={key}
                      label={key}
                      dataKey={key}
                      width={200} // Adjust based on content
                    />
                  ))}
                </Table>
              )}
            </AutoSizer>
          </div>
        </div>
      )}
    </div>
  );
};

const ExcelUploadWithWorker = () => {
  const [activeTab, setActiveTab] = useState("yesterdayTickets");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    yesterdayTickets: [],
    todayTickets: [],
    highPriority: [],
  });

  useEffect(() => {
    return () => {
      if (worker) worker.terminate(); // Clean up worker on unmount
    };
  }, []);

  const handleFileUpload = (event, tabName) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const worker = new Worker(new URL("./worker.js", import.meta.url)); // Correct Worker import

    setLoading(true);

    // Reader onload sends the ArrayBuffer to the worker
    reader.onload = (e) => {
      worker.postMessage(e.target.result); // Send the file buffer to the worker
    };

    // Worker message listener to receive processed data
    worker.onmessage = (e) => {
      let jsonData = e.data;

      // Format Dates and Times in the data if needed
      jsonData = jsonData.map((row) => ({
        ...row,
        ...(row.Date && { Date: formatDate(row.Date) }),
        ...(row.Duration && { Duration: formatTime(row.Duration) }),
      }));

      // Update the relevant tab's data
      setData((prevData) => ({
        ...prevData,
        [tabName]: jsonData,
      }));

      setLoading(false);
      worker.terminate(); // Terminate the worker after processing
    };

    reader.readAsArrayBuffer(file); // Read file as ArrayBuffer for Worker
  };

  // Function to format Excel date serial numbers
  const formatDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    const days = Math.floor(serial);
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    return format(date, "dd/MM/yyyy");
  };

  // Function to format Excel time serials as "hh:mm:ss"
  const formatTime = (serial) => {
    const totalSeconds = Math.round(86400 * serial);
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
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "yesterdayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("yesterdayTickets")}
        >
          Yesterday Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "todayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("todayTickets")}
        >
          Today's Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "highPriority"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("highPriority")}
        >
          High Priority
        </button>
      </div>

      {/* File Upload */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => handleFileUpload(e, activeTab)}
          className="mb-2 p-2 border rounded-lg"
        />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="loader border-t-4 border-blue-400 border-solid rounded-full w-8 h-8 animate-spin mx-auto"></div>
          <p>Loading data, please wait...</p>
        </div>
      )}

      {/* Display Table */}
      {!loading && data[activeTab].length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-3">Excel Data:</h3>
          <div className="h-96">
            {" "}
            {/* Define a fixed height */}
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  width={width}
                  height={height}
                  headerHeight={40}
                  rowHeight={40}
                  rowCount={data[activeTab].length}
                  rowGetter={({ index }) => data[activeTab][index]}
                  className="border border-gray-300"
                >
                  {Object.keys(data[activeTab][0]).map((key) => (
                    <Column
                      key={key}
                      label={key}
                      dataKey={key}
                      width={200} // Adjust based on content
                    />
                  ))}
                </Table>
              )}
            </AutoSizer>
          </div>
        </div>
      )}
    </div>
  );
};

const rowCount = 5000;
const listHeight = 400;
const rowHeight = 50;
const rowWidth = 700;

const list = Array(rowCount)
  .fill()
  .map((val, idx) => {
    return {
      id: idx,
      name: "John Doe",
      image: "http://via.placeholder.com/40",
      text: loremIpsum({
        count: 1,
        units: "sentences",
        sentenceLowerBound: 4,
        sentenceUpperBound: 8,
      }),
    };
  });

function renderRow({ index, key, style }) {
  return (
    <div key={key} style={style} className="row">
      <div className="image">
        <img src={list[index].image} alt="" />
      </div>
      <div className="content">
        <div>{list[index].name}</div>
        <div>{list[index].text}</div>
      </div>
    </div>
  );
}

/// GRID Example

const listGrid = [
  ["John Doe", "Frontend Developer", "New York", "NY", 10001],
  ["John Doe1", "Frontend Developer", "New York", "NY", 10001],
  ["John Doe2", "Frontend Developer", "New York", "NY", 10001],
  ["John Doe3", "Frontend Developer", "New York", "NY", 10001],
  // Add or remove rows as needed...
];

function cellRenderer({ columnIndex, key, rowIndex, style }) {
  return (
    <div key={key} style={style}>
      {list[rowIndex][columnIndex]}
    </div>
  );
}

function GridVirtualization() {
  return (
    <Grid
      cellRenderer={cellRenderer}
      columnCount={listGrid[0].length}
      columnWidth={100}
      height={300}
      rowCount={listGrid.length}
      rowHeight={30}
      width={300}
    />
  );
}

function generateData() {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({ number: i, name: `number${i}` });
  }
  return data;
}

function TableVirtualization() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    setRowData(generateData());
  }, []);

  return (
    <div className="App">
      <h1>Table Example</h1>
      <div style={{ height: "400px", width: "90%" }}>
        {({ height, width }) => (
          <Table
            gridStyle={{ outline: "none" }}
            width={width}
            height={height}
            headerHeight={20}
            rowHeight={70}
            rowCount={rowData.length}
            rowGetter={({ index }) => rowData[index]}
          >
            <Column width={200} label="Number" dataKey="number" />
            <Column width={200} label="Name" dataKey="name" />
          </Table>
        )}
      </div>
    </div>
  );
}

const ExcelUploadWithTabsWindow = () => {
  const [activeTab, setActiveTab] = useState("yesterdayTickets");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    yesterdayTickets: [],
    todayTickets: [],
    highPriority: [],
  });

  const handleFileUpload = (event, tabName) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    setLoading(true);

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData = jsonData.map((row) => ({
        ...row,
        ...(row.Date && { Date: formatDate(row.Date) }),
        ...(row.Duration && { Duration: formatTime(row.Duration) }),
      }));

      setData((prevData) => ({
        ...prevData,
        [tabName]: jsonData,
      }));
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const formatDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    const days = Math.floor(serial);
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  };

  const formatTime = (serial) => {
    const totalSeconds = Math.round(86400 * serial);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // Row renderer function for react-window
  const Row = ({ index, style }) => {
    const row = data[activeTab][index];
    return (
      <div style={style} className="flex">
        {Object.values(row).map((val, idx) => (
          <div
            key={idx}
            className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
          >
            {val}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "yesterdayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("yesterdayTickets")}
        >
          Yesterday Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "todayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("todayTickets")}
        >
          Today's Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "highPriority"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("highPriority")}
        >
          High Priority
        </button>
      </div>

      {/* File Upload */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => handleFileUpload(e, activeTab)}
          className="mb-2 p-2 border rounded-lg"
        />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="loader border-t-4 border-blue-400 border-solid rounded-full w-8 h-8 animate-spin mx-auto"></div>
          <p>Loading data, please wait...</p>
        </div>
      )}

      {/* Display Table with react-window */}
      {!loading && data[activeTab].length > 0 && (
        <div className="flex flex-col justify-start mt-4">
          <h3 className="text-md font-semibold mb-3">Excel Data:</h3>
          <List
            height={400}
            itemCount={data[activeTab].length}
            itemSize={50}
            width={"100%"}
            className="border rounded-lg"
          >
            {Row}
          </List>
        </div>
      )}
    </div>
  );
};

const ExcelUploadWithTabsWindowWithChunking = () => {
  const [activeTab, setActiveTab] = useState("yesterdayTickets");
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0); // For showing loading percentage
  const [data, setData] = useState({
    yesterdayTickets: [],
    todayTickets: [],
    highPriority: [],
  });

  const chunkSize = 10000;

  const handleFileUpload = (event, tabName) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    setLoading(true);

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData = jsonData.map((row) => ({
        ...row,
        ...(row.Date && { Date: formatDate(row.Date) }),
        ...(row.Duration && { Duration: formatTime(row.Duration) }),
      }));

      // setData((prevData) => ({
      //   ...prevData,
      //   [tabName]: jsonData,
      // }));
      // setLoading(false);

      // chunk the data
      processChunks(jsonData, tabName);
    };

    reader.readAsArrayBuffer(file);
  };

  const processChunks = (jsonData, tabName) => {
    const chunks = [];

    //  console.log(now)
    //const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    //return date.toLocaleDateString();

    // break data into chunks
    console.time("Creating Chunks");

    for (let i = 0; i < jsonData.length; i += chunkSize) {
      const chunk = jsonData.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    console.timeEnd("Creating Chunks");
    console.log("chunks data", chunks, chunks.length);

    const processChunk = (index) => {
      if (index >= chunks.length) {
        setLoading(false);
        return;
      }

      setData((prevData) => ({
        ...prevData,
        [tabName]: [...prevData[tabName], ...chunks[index]],
      }));
      console.log("index", index);
      //setLoadProgress((index / chunks.length) * 100);
      setLoadProgress(Math.round((index / chunks.length) * 100000) / 1000);
      //console.log("%progress : ", loadProgress);
      // continue processing next chunk
      setTimeout(() => processChunk(index + 1), 1000); // use a small chunk to unblock UI
    };

    processChunk(0); // start processing first chunk
  };

  const formatDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    const days = Math.floor(serial);
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  };

  const formatTime = (serial) => {
    const totalSeconds = Math.round(86400 * serial);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // Row renderer function for react-window
  const Row = ({ index, style }) => {
    const row = data[activeTab][index];
    return (
      <div style={style} className="flex">
        {Object.values(row).map((val, idx) => (
          <div
            key={idx}
            className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
          >
            {val}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "yesterdayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("yesterdayTickets")}
        >
          Yesterday Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "todayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("todayTickets")}
        >
          Today's Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "highPriority"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("highPriority")}
        >
          High Priority
        </button>
      </div>

      {/* File Upload */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => handleFileUpload(e, activeTab)}
          className="mb-2 p-2 border rounded-lg"
        />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="loader border-t-4 border-blue-400 border-solid rounded-full w-8 h-8 animate-spin mx-auto"></div>
          {/* {loadProgress === 0 ? (
            <p>Reading Data, Creating Chunks...</p>
          ) : ( */}
          <p>Loading data, please wait...{loadProgress}%</p>
          {/* )} */}
        </div>
      )}

      {/* Display Table with react-window */}
      {!loading && data[activeTab].length > 0 && (
        <div className="flex flex-col justify-start mt-4">
          <h3 className="text-md font-semibold mb-3">Excel Data:</h3>
          <List
            height={400}
            itemCount={data[activeTab].length}
            itemSize={50}
            width={"100%"}
            className="border rounded-lg"
          >
            {Row}
          </List>
        </div>
      )}
      {activeTab === "highPriority" && (
        <div>This will show high priority tickets.</div>
      )}
    </div>
  );
};

const ExcelUploadWithTabsWindowWithChunking1 = () => {
  const [activeTab, setActiveTab] = useState("yesterdayTickets");
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [data, setData] = useState({
    yesterdayTickets: [],
    todayTickets: [],
    highPriority: [],
  });
  const [columnHeaders, setColumnHeaders] = useState([]); // State for column headers

  const chunkSize = 10000;

  const handleFileUpload = (event, tabName) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    setLoading(true);

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Extract column headers from the first row
      setColumnHeaders(Object.keys(jsonData[0]));

      // Format the data (optional, based on your example)
      jsonData = jsonData.map((row) => ({
        ...row,
        ...(row.Date && { Date: formatDate(row.Date) }),
        ...(row.Duration && { Duration: formatTime(row.Duration) }),
      }));

      processChunks(jsonData, tabName);
    };

    reader.readAsArrayBuffer(file);
  };

  const processChunks = (jsonData, tabName) => {
    const chunks = [];
    for (let i = 0; i < jsonData.length; i += chunkSize) {
      const chunk = jsonData.slice(i, i + chunkSize);
      chunks.push(chunk);
    }

    const processChunk = (index) => {
      if (index >= chunks.length) {
        setLoading(false);
        return;
      }

      setData((prevData) => ({
        ...prevData,
        [tabName]: [...prevData[tabName], ...chunks[index]],
      }));
      setLoadProgress(Math.round((index / chunks.length) * 100000) / 1000);
      setTimeout(() => processChunk(index + 1), 1000); // Process next chunk
    };

    processChunk(0);
  };

  const formatDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    const days = Math.floor(serial);
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  };

  const formatTime = (serial) => {
    const totalSeconds = Math.round(86400 * serial);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // Row renderer function for react-window
  const Row = ({ index, style }) => {
    const row = data[activeTab][index];
    return (
      <div style={style} className="flex">
        {Object.values(row).map((val, idx) => (
          <div
            key={idx}
            className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
          >
            {val}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "yesterdayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("yesterdayTickets")}
        >
          Yesterday Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "todayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("todayTickets")}
        >
          Today's Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "highPriority"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("highPriority")}
        >
          High Priority
        </button>
      </div>

      {/* File Upload */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => handleFileUpload(e, activeTab)}
          className="mb-2 p-2 border rounded-lg"
        />
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="loader border-t-4 border-blue-400 border-solid rounded-full w-8 h-8 animate-spin mx-auto"></div>
          <p>Loading data, please wait... {loadProgress}%</p>
        </div>
      )}

      {/* Display Table with react-window */}
      {!loading && data[activeTab].length > 0 && (
        <div className="flex flex-col justify-start mt-4">
          <h3 className="text-md font-semibold mb-3">Excel Data:</h3>

          {/* Render the column headers */}
          <div className="flex border-b bg-gray-100">
            {columnHeaders.map((header, idx) => (
              <div
                key={idx}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </div>
            ))}
          </div>

          <List
            height={400}
            itemCount={data[activeTab].length}
            itemSize={50}
            width={"100%"}
            className="border rounded-lg"
          >
            {Row}
          </List>
        </div>
      )}

      {activeTab === "highPriority" && (
        <div>This will show high-priority tickets.</div>
      )}
    </div>
  );
};

function AppTest() {
  return (
    <>
      <h1>The tickets</h1>
      {/* <ExcelUploadWithTabs /> */}
      {/* <ExcelUploadWithTabsWindow /> */}
      <ExcelUploadWithTabsWindowWithChunking />
      {/* <ExcelUploadWithWorker /> */}
      {/* <ExcelUploadWithVirtualization /> */}
      {/* <GridVirtualization /> */}
      {/*<TableVirtualization />*/}
      {/* <div className="App">
        <div className="list">
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                rowHeight={rowHeight}
                rowRenderer={renderRow}
                rowCount={list.length}
                overscanRowCount={3}
              />
            )}
          </AutoSizer>
        </div>
      </div> */}
    </>
  );
}

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("historyTickets");
  const [firstLevelTab, setFirstLevelTab] = useState("yesterday");
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [data, setData] = useState({
    yesterday: [],
    dayBeforeYesterday: [],
    threeDaysAgo: [],
  });

  const chunkSize = 10000;

  const handleFileUpload = (event, tabName) => {
    if (loadingProgress !== 0) {
      setLoadingProgress(0);
    }
    const file = event.target.files[0];
    const reader = new FileReader();

    setLoading(true);

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData = jsonData.map((row) => ({
        ...row,
        ...(row.Date && { Date: formatDate(row.Date) }),
        ...(row.Duration && { Duration: formatTime(row.Duration) }),
      }));

      // setData((prevData) => ({
      //   ...prevData,
      //   [tabName]: jsonData,
      // }));
      // setLoading(false);

      // chunk the data

      processChunks(jsonData, tabName);
    };

    reader.readAsArrayBuffer(file);
  };

  const processChunks = (jsonData, tabName) => {
    const chunks = [];

    //  console.log(now)
    //const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    //return date.toLocaleDateString();

    // break data into chunks
    console.time("Creating Chunks");

    for (let i = 0; i < jsonData.length; i += chunkSize) {
      const chunk = jsonData.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    console.timeEnd("Creating Chunks");
    console.log("chunks data", chunks, chunks.length);

    const processChunk = (index) => {
      if (index >= chunks.length) {
        setLoading(false);
        return;
      }

      setData((prevData) => ({
        ...prevData,
        [tabName]: [...prevData[tabName], ...chunks[index]],
      }));
      console.log("index", index);
      //setLoadProgress((index / chunks.length) * 100);
      setLoadingProgress(Math.round((index / chunks.length) * 100000) / 1000);
      //console.log("%progress : ", loadProgress);
      // continue processing next chunk
      setTimeout(() => processChunk(index + 1), 1000); // use a small chunk to unblock UI
    };

    processChunk(0); // start processing first chunk
  };

  const formatDate = (serial) => {
    const excelEpoch = new Date(1899, 11, 30);
    const days = Math.floor(serial);
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  };

  const formatTime = (serial) => {
    const totalSeconds = Math.round(86400 * serial);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // Row renderer function for react-window
  const Row = ({ index, style }) => {
    const row = data[firstLevelTab][index];
    return (
      <div style={style} className="flex">
        {Object.values(row).map((val, idx) => (
          <div
            key={idx}
            className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
          >
            {val}
          </div>
        ))}
      </div>
    );
  };

  const columnHeaders = data[firstLevelTab].length
    ? Object.keys(data[firstLevelTab][0])
    : [];

  return (
    <div>
      <div className="flex space-x-4 mb-4 ml-4">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "historyTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("historyTickets")}
        >
          History Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "todayTickets"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("todayTickets")}
        >
          Today's Tickets
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "analysis" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("analysis")}
        >
          Ticket Analysis
        </button>
      </div>
      {activeTab === "historyTickets" && (
        <>
          <div className="flex flex-start ml-2">
            <div className="flex flex-col space-y-2 p-2">
              <button
                className={`px-4 py-2 font-semibold ${
                  firstLevelTab === "yesterday"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200"
                } rounded-md`}
                onClick={() => setFirstLevelTab("yesterday")}
              >
                Yesterday
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  firstLevelTab === "dayBeforeYesterday"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200"
                } rounded-md`}
                onClick={() => setFirstLevelTab("dayBeforeYesterday")}
              >
                Day Before Yesterday
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  firstLevelTab === "threeDaysAgo"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200"
                } rounded-md`}
                onClick={() => setFirstLevelTab("threeDaysAgo")}
              >
                3 Days Ago
              </button>
            </div>
            {firstLevelTab === "yesterday" && (
              <>
                <div className="flex flex-col w-[80%]">
                  <div className="mx-2 my-2">
                    {/* File Upload */}
                    <div>
                      <h2 className="text-md font-semibold mb-4">
                        Yesterday Upload Excel File
                      </h2>
                      <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={(e) => handleFileUpload(e, firstLevelTab)}
                        className="mb-2 p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    {/*loading in Progress*/}
                    {loading && (
                      <div className="text-center my-4">
                        <div className="loader border-t-4 border-blue-400 border-solid rounded-full w-8 h-8 animate-spin mx-auto"></div>

                        <p>
                          Loading Yesterday data, please wait...
                          {loadingProgress}%
                        </p>
                        {/* )} */}
                      </div>
                    )}

                    {/* Display Table with react-window */}
                    {!loading && data[firstLevelTab].length > 0 && (
                      <div className="flex flex-col justify-start mt-4">
                        <h3 className="text-md font-semibold mb-3">
                          Yesterday Excel Data:
                        </h3>
                        {/* Render the column headers */}
                        <div className="flex border-b bg-gray-100">
                          {columnHeaders.map((header, idx) => (
                            <div
                              key={idx}
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </div>
                          ))}
                        </div>
                        <List
                          height={400}
                          itemCount={data[firstLevelTab].length}
                          itemSize={50}
                          width={"100%"}
                          className="border rounded-lg"
                        >
                          {Row}
                        </List>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {firstLevelTab === "dayBeforeYesterday" && (
              <>
                <div className="flex flex-col w-[80%]">
                  <div className="mx-2 my-2">
                    {/* File Upload */}
                    <div>
                      <h2 className="text-md font-semibold mb-4">
                        Day Before Yesterday Upload Excel File
                      </h2>
                      <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={(e) => handleFileUpload(e, firstLevelTab)}
                        className="mb-2 p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    {/*loading in Progress*/}
                    {loading && (
                      <div className="text-center my-4">
                        <div className="loader border-t-4 border-blue-400 border-solid rounded-full w-8 h-8 animate-spin mx-auto"></div>

                        <p>
                          Loading Day Before Yesterday data, please wait...
                          {loadingProgress}%
                        </p>
                        {/* )} */}
                      </div>
                    )}

                    {/* Display Table with react-window */}
                    {!loading && data[firstLevelTab].length > 0 && (
                      <div className="flex flex-col justify-start mt-4">
                        <h3 className="text-md font-semibold mb-3">
                          Day Before Yesterday Excel Data:
                        </h3>
                        <List
                          height={400}
                          itemCount={data[firstLevelTab].length}
                          itemSize={50}
                          width={"100%"}
                          className="border rounded-lg"
                        >
                          {Row}
                        </List>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {activeTab === "todayTickets" && (
        <>
          <div className="ml-4">
            <p> This is today ticket tab</p>
          </div>
        </>
      )}

      {activeTab === "analysis" && (
        <>
          <div className="ml-4">
            <p>
              {data[firstLevelTab]
                .filter((each, idx) => each.PRODUCTNUMBER.includes("BB"))
                .map((ele, index) => {
                  return (
                    <p>
                      {ele.PRODUCTNUMBER} - {ele.PRODUCTNAME}
                    </p>
                  );
                })}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
function App() {
  return (
    <>
      <h1 className="m-3 p-2 text-3xl font-bold">Tickets</h1>
      {/* <Tabs /> */}
      <ExcelUploadWithTabsWindowWithChunking1 />
    </>
  );
}

export default App;
