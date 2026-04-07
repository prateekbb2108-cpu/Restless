import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useState } from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeRef: React.RefObject<HTMLDivElement | null>;
}

export function ExportModal({ isOpen, onClose, resumeRef }: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState<{url: string, filename: string} | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportPDF = async () => {
    if (!resumeRef.current) return;
    setIsExporting(true);
    setError(null);
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      const filename = 'Blueprint_Resume.pdf';
      
      setExportResult({ url, filename });
      
      // Try auto-download (might be blocked by iframe)
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export PDF failed', err);
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
    }
    setIsExporting(false);
  };

  const handleExportJPG = async () => {
    if (!resumeRef.current) return;
    setIsExporting(true);
    setError(null);
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const filename = 'Blueprint_Resume.jpg';
      
      setExportResult({ url: imgData, filename });
      
      // Try auto-download (might be blocked by iframe)
      const link = document.createElement('a');
      link.download = filename;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export JPG failed', err);
      setError(err instanceof Error ? err.message : 'Failed to generate JPG');
    }
    setIsExporting(false);
  };

  const handleClose = () => {
    setExportResult(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-lg font-bold text-on-surface mb-4">Export Resume</h3>
        
        {error && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg text-sm">
            {error}
          </div>
        )}

        {exportResult ? (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <p className="text-sm text-on-surface font-medium">Your file is ready!</p>
            <p className="text-xs text-on-surface-variant mb-4">
              If the download didn't start automatically, it might be blocked by the preview window.
            </p>
            
            <a 
              href={exportResult.url} 
              download={exportResult.filename}
              className="w-full bg-primary text-on-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">download</span>
              Click here to download
            </a>
            
            <div className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg mt-4 text-left border border-amber-200">
              <strong>Tip:</strong> If the button above still doesn't work, please open this app in a <strong>New Tab</strong> using the button in the top right corner of the screen.
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="w-full bg-primary text-on-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <span className="material-symbols-outlined">picture_as_pdf</span>
              {isExporting ? 'Generating PDF...' : 'Download PDF (A4)'}
            </button>
            <button 
              onClick={handleExportJPG}
              disabled={isExporting}
              className="w-full bg-surface-container-high text-on-surface-variant font-bold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <span className="material-symbols-outlined">image</span>
              {isExporting ? 'Generating JPG...' : 'Download JPG (High Res)'}
            </button>
          </div>
        )}
        
        <button 
          onClick={handleClose}
          disabled={isExporting}
          className="w-full mt-4 py-2 text-sm font-bold text-outline hover:text-on-surface transition-colors disabled:opacity-50"
        >
          {exportResult ? 'Close' : 'Cancel'}
        </button>
      </div>
    </div>
  );
}
