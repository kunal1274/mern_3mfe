// Import XLSX if using Webpack or Vite
importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
);

self.onmessage = (e) => {
  const workbook = XLSX.read(e.data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  // Send the processed data back to the main thread
  postMessage(jsonData);
};
