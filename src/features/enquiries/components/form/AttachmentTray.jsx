import React from 'react';
import { Paperclip, FileText, Image as ImageIcon, X } from 'lucide-react';

const FileThumbnail = ({ file, onRemove, isReadOnly }) => {
  const isImage = file.type?.startsWith('image/');
  
  return (
    <div className="relative group bg-gray-50 rounded border border-gray-100 overflow-hidden w-16 h-16 shrink-0 flex flex-col cursor-pointer transition-all hover:border-primary/30">
      <div className="flex-1 flex items-center justify-center bg-gray-100/50">
        {isImage ? (
          <ImageIcon size={20} className="text-gray-400" />
        ) : (
          <FileText size={20} className="text-gray-400" />
        )}
      </div>
      <div className="px-1 py-0.5 bg-white border-t border-gray-50 truncate text-[8px] font-medium text-gray-500">
        {file.name}
      </div>
      
      {!isReadOnly && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(file.id);
          }}
          className="absolute top-0.5 right-0.5 p-0.5 bg-white/80 rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
        >
          <X size={10} />
        </button>
      )}
    </div>
  );
};

const AttachmentTray = ({ formData, setFormData, isReadOnly }) => {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const addFiles = (newFiles) => {
    const formattedFiles = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }));

    setFormData(prev => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...formattedFiles]
    }));
  };

  const removeFile = (id) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(f => f.id !== id)
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isReadOnly) return;
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  return (
    <div 
      className="space-y-1 px-2 py-0 -mx-2 rounded-lg transition-colors hover:bg-gray-50/50"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar min-h-[64px]">
        {formData.attachments?.map((file) => (
          <FileThumbnail 
            key={file.id} 
            file={file} 
            onRemove={removeFile} 
            isReadOnly={isReadOnly}
          />
        ))}
        
        {!isReadOnly && (
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-gray-300 rounded w-16 h-16 shrink-0 flex flex-col items-center justify-center gap-1 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer bg-gray-50/50"
          >
            <Paperclip size={16} className="text-gray-400" />
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">Attach</span>
          </button>
        )}
      </div>
      
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
