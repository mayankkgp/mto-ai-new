import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  FileText 
} from 'lucide-react';
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog.jsx";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button.jsx";
import { cn } from "@/lib/utils.js";

const FileLightbox = ({ files, initialIndex, onClose, isReadOnly }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const activeFile = files[currentIndex];

  if (!activeFile) return null;

  const isImage = activeFile.type?.startsWith('image/');
  const isPdf = activeFile.type === 'application/pdf';

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (currentIndex < files.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleDownload = (e) => {
    e?.stopPropagation();
    const link = document.createElement('a');
    link.href = activeFile.url;
    link.download = activeFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm z-[80]" />
        <DialogPrimitive.Popup
          className={cn(
            "fixed top-1/2 left-1/2 z-[81] -translate-x-1/2 -translate-y-1/2",
            "max-w-5xl w-full max-h-full flex flex-col items-center justify-center border-none bg-transparent shadow-none p-4 sm:p-8 outline-none",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          )}
        >
          {/* Top Controls */}
          <div className="absolute top-2 right-2 z-50 min-[height:801px]:-top-12 min-[height:801px]:right-0 flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={handleDownload}
            >
              <Download size={18} />
            </Button>
            {!isReadOnly && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-red-500/20 hover:text-red-500"
              >
                <Trash2 size={18} />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X size={18} />
            </Button>
          </div>

          {/* Content Viewer */}
          <div className="bg-black rounded-lg overflow-hidden shadow-2xl w-full flex items-center justify-center max-h-[calc(100vh-60px)] min-[height:801px]:max-h-[calc(100vh-200px)] relative group">
            {/* Navigation Arrows */}
            {currentIndex > 0 && (
              <button 
                onClick={handlePrev}
                className="absolute left-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {currentIndex < files.length - 1 && (
              <button 
                onClick={handleNext}
                className="absolute right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Media Content */}
            <div className="w-full h-full flex items-center justify-center">
              {isImage ? (
                <img 
                  src={activeFile.url} 
                  alt={activeFile.name} 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : isPdf ? (
                <iframe 
                  src={`${activeFile.url}#toolbar=0&navpanes=0&view=FitH`}
                  className="w-full h-[70vh] border-0 bg-gray-100"
                  title={activeFile.name}
                />
              ) : (
                <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-900 text-gray-400 gap-4">
                  <FileText size={64} />
                  <p className="text-sm font-medium">{activeFile.name}</p>
                </div>
              )}
            </div>

            {/* Bottom Label */}
            <div className="absolute -bottom-8 left-0 right-0 text-center">
              <p className="text-white text-sm font-medium truncate px-4">
                {activeFile.name}
              </p>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none w-full max-w-md px-4">
            <div className="pointer-events-auto flex gap-2 overflow-x-auto py-2 px-3 bg-black/60 backdrop-blur-md rounded-xl max-w-full no-scrollbar border border-white/10 shadow-2xl">
              {files.map((file, index) => (
                <button
                  key={file.id}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "relative w-12 h-12 rounded border-2 shrink-0 overflow-hidden transition-all",
                    currentIndex === index ? "border-primary" : "border-transparent opacity-50 hover:opacity-100"
                  )}
                >
                  {file.type?.startsWith('image/') ? (
                    <img 
                      src={file.url} 
                      alt="" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
                      <FileText size={16} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
};

export default FileLightbox;
