
import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as XLSX from 'xlsx';

interface ExcelData {
  fileName: string;
  data: any[];
  columns: string[];
  uploadDate: Date;
  id: string;
}

interface Chart {
  id: string;
  fileName: string;
  chartType: string;
  xAxis: string;
  yAxis: string;
  data: any[];
  createdDate: Date;
}

interface DataContextType {
  excelFiles: ExcelData[];
  charts: Chart[];
  currentData: any[] | null;
  fileName: string | null;
  uploadExcelFile: (file: File) => Promise<void>;
  createChart: (chartData: Omit<Chart, 'id' | 'createdDate'>) => void;
  setCurrentData: (data: ExcelData | null) => void;
  deleteFile: (id: string) => void;
  deleteChart: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [excelFiles, setExcelFiles] = useState<ExcelData[]>([]);
  const [charts, setCharts] = useState<Chart[]>([]);
  const [currentData, setCurrentDataState] = useState<any[] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const uploadExcelFile = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          if (jsonData.length === 0) {
            reject(new Error('Excel file is empty'));
            return;
          }

          const columns = Object.keys(jsonData[0] as object);
          
          const newFile: ExcelData = {
            id: Date.now().toString(),
            fileName: file.name,
            data: jsonData,
            columns,
            uploadDate: new Date(),
          };

          setExcelFiles(prev => [...prev, newFile]);
          setCurrentDataState(jsonData);
          setFileName(file.name);
          resolve();
        } catch (error) {
          reject(new Error('Failed to parse Excel file'));
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsBinaryString(file);
    });
  };

  const createChart = (chartData: Omit<Chart, 'id' | 'createdDate'>) => {
    const newChart: Chart = {
      ...chartData,
      id: Date.now().toString(),
      createdDate: new Date(),
    };
    setCharts(prev => [...prev, newChart]);
  };

  const setCurrentData = (data: ExcelData | null) => {
    if (data) {
      setCurrentDataState(data.data);
      setFileName(data.fileName);
    } else {
      setCurrentDataState(null);
      setFileName(null);
    }
  };

  const deleteFile = (id: string) => {
    setExcelFiles(prev => prev.filter(file => file.id !== id));
    setCharts(prev => prev.filter(chart => chart.fileName !== excelFiles.find(f => f.id === id)?.fileName));
  };

  const deleteChart = (id: string) => {
    setCharts(prev => prev.filter(chart => chart.id !== id));
  };

  return (
    <DataContext.Provider value={{
      excelFiles,
      charts,
      currentData,
      fileName,
      uploadExcelFile,
      createChart,
      setCurrentData,
      deleteFile,
      deleteChart,
    }}>
      {children}
    </DataContext.Provider>
  );
};
