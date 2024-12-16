import React, { useState, useRef } from 'react';
import { Course } from '../types/Course';
import { parseCSV } from '../utils/csvParser';

interface CSVUploaderProps {
  onCsvLoaded: (courses: Course[]) => void;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onCsvLoaded }) => {
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const courses = parseCSV(text);
        onCsvLoaded(courses);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (err) {
        setError('Failed to parse CSV file. Please check the format.');
        console.log(err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="csv-uploader">
      <div className="upload-container">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          ref={fileInputRef}
        />
        <button
          className="info-button"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          type="button"
        >
          ?
        </button>
        {showTooltip && (
          <div className="tooltip">
            Expected CSV format:<br />
            Course Code,Semester,Course Title,Credits,Major,Prerequisites<br />
            CSIT101,Sem-1/2,Introduction to Programming,2.0,Elective,<br />
            CSIT201,Sem-3,Data Structures,4.0,Core,CSIT101 or CSIT121
            CSIT301,Sem-4,Advanced Algorithms,4.0,Core,CSIT101 or CSIT121 and CSIT201
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
      <style>{`
        .csv-uploader {
          margin: 20px 0;
        }
        
        .upload-container {
          position: relative;
          display: inline-block;
        }
        
        .info-button {
          margin-left: 10px;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }
        
        .tooltip {
          position: absolute;
          top: 100%;
          left: 0;
          background: #333;
          color: white;
          padding: 10px;
          border-radius: 4px;
          font-size: 14px;
          white-space: pre-line;
          z-index: 1000;
          max-width: 400px;
        }
        
        .error-message {
          color: red;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default CSVUploader;
