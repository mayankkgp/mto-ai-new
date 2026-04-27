import React from 'react';
import { motion } from 'motion/react';
import { useUIState } from '@/contexts/UIStateContext.jsx';
import { useEnquiryDetail } from '@/contexts/EnquiryDetailContext.jsx';
import { cn } from '@/lib/utils.js';
import EnquiryMasterPane from './components/EnquiryMasterPane.jsx';
import EnquiryDetailPane from './components/EnquiryDetailPane.jsx';

/**
 * EnquiriesModule Component
 * Encapsulates the split-pane layout for the Enquiries feature.
 */
export const EnquiriesModule = () => {
  const { isCreating } = useUIState();
  const { activeEnquiryId, closePane } = useEnquiryDetail();
  const isPaneOpen = !!activeEnquiryId || isCreating;

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Master Pane: Always visible, but width changes if Detail Pane is open */}
      <motion.div 
        layout
        className={cn(
          "shrink-0",
          isPaneOpen ? "w-[35%]" : "w-full"
        )}
      >
        <EnquiryMasterPane />
      </motion.div>

      {/* Detail Pane: Animated entry/exit */}
      {isPaneOpen && (
        <div className="w-[65%] shrink-0">
          <EnquiryDetailPane 
            activeEnquiryId={activeEnquiryId} 
            isCreating={isCreating}
            onClose={closePane} 
          />
        </div>
      )}
    </div>
  );
};

export default EnquiriesModule;
