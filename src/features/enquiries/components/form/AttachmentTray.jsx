import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Paperclip, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card.jsx';
import { useUIState } from '@/contexts/UIStateContext.jsx';
import { useEnquiryDetail } from '@/contexts/EnquiryDetailContext.jsx';
import FileLightbox from './FileLightbox.jsx';

const FileThumbnail = ({ file, index, onRemove, onOpenLightbox, isReadOnly }) => {
  const isImage = file.type?.startsWith('image/');
  const isPdf = file.type === 'application/pdf';
  const fileSize = file.size ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown size';
  
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div 
          className="relative group bg-gray-50 rounded border border-gray-100 overflow-hidden w-16 h-16 shrink-0 flex flex-col cursor-default transition-all"
        >
          <div className="flex-1 flex items-center justify-center bg-gray-100/50">
            {isImage ? (
              <img 
                src={file.url} 
                alt={file.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <FileText size={20} className="text-gray-400" />
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-0.5 bg-white/90 backdrop-blur-sm border-t border-gray-100 truncate text-[8px] font-medium text-gray-500">
            {file.name}
          </div>
          
          {!isReadOnly && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onRemove(file.id);
              }}
              className="absolute top-0.5 right-0.5 p-0.5 bg-white/80 rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
            >
              <X size={10} />
            </button>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        side="top" 
        align="start" 
        sideOffset={8} 
        className="w-auto max-w-sm min-w-64 p-0 overflow-hidden bg-white rounded-lg shadow-2xl border border-gray-200 z-[60]"
      >
        {isImage ? (
          <div className="flex flex-col">
            <img 
              src={file.url} 
              alt={file.name} 
              className="w-full h-auto min-h-32 max-h-64 object-contain bg-gray-50"
              referrerPolicy="no-referrer"
            />
            <div className="p-2 bg-white border-t border-gray-100">
              <p className="text-sm font-bold text-gray-700 truncate text-center">{file.name}</p>
              <p className="text-[10px] text-gray-500 text-center uppercase mt-0.5">{fileSize}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox(index);
                }}
                className="mt-2 w-full py-1 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors rounded text-[10px] font-bold uppercase tracking-wide"
              >
                View Full Screen
              </button>
            </div>
          </div>
        ) : isPdf ? (
          <div className="flex flex-col">
            <div className="w-full h-48 relative overflow-hidden bg-gray-100 pointer-events-none">
              <iframe 
                src={`${file.url}#toolbar=0&navpanes=0&view=FitH`}
                className="w-full h-full border-0"
                title={file.name}
              />
            </div>
            <div className="p-2 bg-white border-t border-gray-100">
              <p className="text-sm font-bold text-gray-700 truncate text-center">{file.name}</p>
              <p className="text-[10px] text-gray-500 text-center uppercase mt-0.5">{fileSize} • PDF</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox(index);
                }}
                className="mt-2 w-full py-1 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors rounded text-[10px] font-bold uppercase tracking-wide"
              >
                View Full Screen
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full p-6 flex flex-col items-center justify-center bg-gray-50 gap-4">
            <FileText size={48} className="text-blue-500" />
            <div className="text-center space-y-1">
              <p className="text-sm font-bold text-gray-800 break-all">{file.name}</p>
              <p className="text-xs text-gray-500 uppercase">{fileSize}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenLightbox(index);
              }}
              className="mt-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-wide shadow-sm hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            >
              Click to View
            </button>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

const AttachmentTray = ({ isReadOnly }) => {
  const { watch, setValue } = useFormContext();
  const fileInputRef = React.useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  
  const { uploadProgress } = useUIState();
  const { handleFileUpload, handleFileDelete } = useEnquiryDetail();

  const attachments = watch('attachments') || [];

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      const uploadedFile = await handleFileUpload(file);
      if (uploadedFile) {
        const currentAttachments = watch('attachments') || [];
        setValue('attachments', [...currentAttachments, uploadedFile]);
      }
    }
    // Clear input so same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = async (id) => {
    const success = await handleFileDelete(id);
    if (success) {
      const currentAttachments = watch('attachments') || [];
      setValue('attachments', currentAttachments.filter(f => f.id !== id));
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (isReadOnly) return;
    const files = Array.from(e.dataTransfer.files);
    for (const file of files) {
      const uploadedFile = await handleFileUpload(file);
      if (uploadedFile) {
        const currentAttachments = watch('attachments') || [];
        setValue('attachments', [...currentAttachments, uploadedFile]);
      }
    }
  };

  return (
    <div 
      className="px-2 py-0 -mx-2 rounded-lg transition-colors hover:bg-gray-50/50"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {attachments.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar min-h-[64px]">
          {attachments.map((file, index) => (
            <FileThumbnail 
              key={file.id} 
              file={file} 
              index={index}
              onRemove={removeFile} 
              onOpenLightbox={setLightboxIndex}
              isReadOnly={isReadOnly}
            />
          ))}
        </div>
      )}
      
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mb-2 px-1">
          <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase mb-1">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
      
      {!isReadOnly && (
        <button 
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "w-full h-[26px] py-0 border border-dashed border-gray-300 rounded flex items-center justify-center gap-2 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer bg-gray-50/50",
            attachments.length > 0 && "mt-1"
          )}
        >
          <Paperclip size={12} className="text-gray-400" />
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Attach Files</span>
        </button>
      )}
      
      <input 
        type="file" 
        multiple 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange}
      />

      {lightboxIndex !== null && (
        <FileLightbox 
          files={attachments}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          isReadOnly={isReadOnly}
        />
      )}
    </div>
  );
};

export default AttachmentTray;
