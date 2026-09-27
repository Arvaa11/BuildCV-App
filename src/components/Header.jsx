import React, { useRef } from 'react';
import { exportCvToJson, importCvFromJson } from '../utils/cvStorage';

export function Header({ cvData, setCvData }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const data = await importCvFromJson(file);
      setCvData(data); // Overwrites state with loaded JSON
      alert('Resume loaded successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">BuildCV</h1>

      <div className="flex gap-3">
        {/* Export Button */}
        <button
          onClick={() => exportCvToJson(cvData)}
          className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded text-sm font-medium"
        >
          📥 Backup JSON
        </button>

        {/* Import Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-sm font-medium"
        >
          📤 Load JSON
        </button>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".json"
          className="hidden"
        />
      </div>
    </header>
  );
}