// src/components/CommonDialog/DialogContext.jsx
import { createContext, useContext, useState } from 'react';
import CommonDialog from '../CommonDialog/Dialog';

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState({
    visible: false,
    type: 'cross', // or 'check'
    message: '',
  });

  const showDialog = (type = 'cross', message = 'Something went wrong!') => {
    setDialog({ visible: true, type, message });
  };

  const hideDialog = () => {
    setDialog((prev) => ({ ...prev, visible: false }));
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      {dialog.visible && (
        <CommonDialog
          type={dialog.type}
          message={dialog.message}
          onClose={hideDialog}
        />
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
