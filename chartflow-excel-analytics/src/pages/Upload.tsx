import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload as UploadIcon, 
  FileSpreadsheet, 
  CheckCircle, 
  CloudUpload,
  FileText,
  BarChart3,
  Sparkles,
  ArrowRight,
  Zap,
  Database,
  TrendingUp,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

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
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/csv',
      'text/plain',
    ];
    const validExtensions = ['.xls', '.xlsx', '.csv'];
    
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

  const features = [
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "AI-powered insights from your data",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Database,
      title: "Secure Processing",
      description: "Your data is processed securely",
      color: "from-green-500 to-green-600"
    },
    {
      icon: TrendingUp,
      title: "Real-time Charts",
      description: "Create beautiful visualizations instantly",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data never leaves your control",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Enhanced Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <CloudUpload className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Upload Your Data 📁</h1>
              <p className="text-blue-100">Transform Excel files into stunning visualizations</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              <FileText className="w-3 h-3 inline mr-1" />
              Excel Support
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              <Zap className="w-3 h-3 inline mr-1" />
              Instant Processing
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              <Sparkles className="w-3 h-3 inline mr-1" />
              AI Powered
            </div>
          </div>
        </div>
        {/* Simple decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-8 text-3xl opacity-20">📊</div>
      </div>

      {/* Upload Area */}
      <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <UploadIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">File Upload</CardTitle>
              <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`
              border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ease-in-out
              ${isDragging 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 scale-105' 
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:scale-[1.02]'
              }
              ${isUploading ? 'opacity-50 pointer-events-none' : ''}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-6">
              <div className={`
                w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg transition-all duration-300
                ${isDragging ? 'scale-110 rotate-12' : 'hover:scale-105'}
              `}>
                <UploadIcon className="w-10 h-10 text-white" />
              </div>
              
              {!uploadedFile ? (
                <>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {isUploading ? 'Processing your file...' : 'Drop your Excel file here'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      or click to browse your files
                    </p>
                  </div>
                  
                  {isUploading && (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-blue-600 dark:text-blue-400">Processing...</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">
                          File Uploaded Successfully!
                        </h3>
                        <p className="text-green-600 dark:text-green-300">Ready for analysis</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{uploadedFile.name}</span>
                    </div>
                  </div>
                </>
              )}

              <input
                type="file"
                accept=".xls,.xlsx,.csv"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />
              
              {!uploadedFile && (
                <label htmlFor="file-upload">
                  <Button 
                    className="h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    disabled={isUploading}
                    asChild
                  >
                    <span className="cursor-pointer flex items-center gap-2">
                      {isUploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <UploadIcon className="w-5 h-5" />
                          Choose File
                        </>
                      )}
                    </span>
                  </Button>
                </label>
              )}
            </div>
          </div>

          {uploadedFile && (
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={() => navigate('/analytics')}
                className="h-12 px-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  Start Creating Charts
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Supported File Types */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Supported File Types</CardTitle>
              <p className="text-sm text-gray-500">All major Excel & CSV formats supported</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">.xlsx files</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Excel 2007 and later</p>
                <Badge variant="outline" className="mt-1">Recommended</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">.xls files</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Excel 97-2003</p>
                <Badge variant="outline" className="mt-1">Legacy</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">.csv files</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Comma Separated Values</p>
                <Badge variant="outline" className="mt-1">CSV</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;

