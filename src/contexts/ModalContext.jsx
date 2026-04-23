import React, { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(undefined);

/**
 * ModalProvider component to manage global modal state.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [modalProps, setModalProps] = useState({});

  /**
   * Opens a modal by its identifier and sets its props.
   * 
   * @param {string} modalName - Identifier for the modal
   * @param {Object} props - Data/callbacks to pass to the modal
   */
  const openModal = useCallback((modalName, props = {}) => {
    setActiveModal(modalName);
    setModalProps(props);
  }, []);

  /**
   * Closes the active modal and resets its props.
   */
  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalProps({});
  }, []);

  const value = {
    activeModal,
    modalProps,
    openModal,
    closeModal
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

/**
 * Custom hook to use the ModalContext.
 * 
 * @returns {Object} { activeModal, modalProps, openModal, closeModal }
 */
export const useModals = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
};

export default ModalContext;
