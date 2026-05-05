import React from 'react';
import { Paperclip } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils.js';
import { useModals } from '@/contexts/ModalContext.jsx';
import FileThumbnail from './file-thumbnail.jsx';

const AttachmentTray = ({ 
  files = [], 
  onUploadAction = () => {}, 
  onDeleteAction = () => {}, 
  uploadProgress = 0, 
  isReadOnly 
}) => {
  const { openModal } = useModals();
  const fileInputRef = React.useRef(null);

  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File "${file.name}" exceeds the 100MB limit.`);
      return false;
    }
    return true;
  };

  const attachments = files || [];

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(validateFile);
    if (validFiles.length > 0) {
      onUploadAction(validFiles);
    }
    // Clear input so same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = async (id) => {
    onDeleteAction(id);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (isReadOnly) return;
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(validateFile);
    if (validFiles.length > 0) {
      onUploadAction(validFiles);
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
              onOpenLightbox={(idx) => openModal('FILE_LIGHTBOX', { 
                files: attachments, 
                initialIndex: idx, 
                isReadOnly: isReadOnly,
                onDelete: (file) => onDeleteAction(file.id)
              })}
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
    </div>
  );
};

export default AttachmentTray;
