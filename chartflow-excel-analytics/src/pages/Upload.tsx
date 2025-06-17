
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload as UploadIcon, FileSpreadsheet, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { uploadExcelFile } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateFile = (file: File): boolean => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    const validExtensions = ['.xls', '.xlsx'];
    
    const hasValidType = validTypes.includes(file.type);
    const hasValidExtension = validExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );

    return hasValidType || hasValidExtension;
  };

  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a valid Excel file (.xls or .xlsx)',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    
    try {
      await uploadExcelFile(file);
      setUploadedFile(file);
      toast({
        title: 'File Uploaded Successfully',
        description: `${file.name} has been processed and is ready for analysis.`,
      });
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Failed to upload file',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Excel File</h1>
        <p className="text-gray-600">
          Upload your Excel files (.xls, .xlsx) to start creating beautiful visualizations
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadIcon className="w-5 h-5" />
            File Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
              ${isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
              ${isUploading ? 'opacity-50 pointer-events-none' : ''}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <UploadIcon className="w-8 h-8 text-white" />
              </div>
              
              {!uploadedFile ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isUploading ? 'Processing...' : 'Drop your Excel file here'}
                  </h3>
                  <p className="text-gray-600">
                    or click to browse your files
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <h3 className="text-lg font-semibold text-green-700">
                      File Uploaded Successfully!
                    </h3>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <FileSpreadsheet className="w-5 h-5" />
                    <span>{uploadedFile.name}</span>
                  </div>
                </>
              )}

              <input
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />
              
              {!uploadedFile && (
                <label htmlFor="file-upload">
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    disabled={isUploading}
                    asChild
                  >
                    <span className="cursor-pointer">
                      {isUploading ? 'Processing...' : 'Choose File'}
                    </span>
                  </Button>
                </label>
              )}
            </div>
          </div>

          {uploadedFile && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={() => navigate('/analytics')}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Start Creating Charts
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supported File Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileSpreadsheet className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium">.xlsx files</p>
                <p className="text-sm text-gray-600">Excel 2007 and later</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileSpreadsheet className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-medium">.xls files</p>
                <p className="text-sm text-gray-600">Excel 97-2003</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;
