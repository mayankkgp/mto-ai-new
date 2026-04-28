import React from 'react';
import { FileText, X } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card.jsx';

/**
 * FileThumbnail Component
 * Handles the display of individual file attachments with preview and hover card details.
 */
const FileThumbnail = ({ file, index, onRemove, onOpenLightbox, isReadOnly }) => {
  const isImage = file.type?.startsWith('image/');
  const isPdf = file.type === 'application/pdf';
  const fileSize = file.size ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown size';
  
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div 
          onClick={() => onOpenLightbox(index)}
          className="relative group bg-gray-50 rounded border border-gray-100 overflow-hidden w-16 h-16 shrink-0 flex flex-col cursor-pointer transition-all"
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

export default FileThumbnail;
