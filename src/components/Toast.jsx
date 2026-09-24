import React from 'react';

const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className={`cyber-toast ${toast.type || 'info'} show`}>
      <div className="d-flex align-items-center gap-3">
        <div className="toast-icon">
          {isSuccess && <i className="bi bi-check-circle-fill text-neon-green"></i>}
          {isError && <i className="bi bi-exclamation-triangle-fill text-danger"></i>}
          {!isSuccess && !isError && <i className="bi bi-info-circle-fill text-neon-blue"></i>}
        </div>
        <div className="toast-content">
          <div className="toast-title fw-bold text-white small">{toast.title || 'Notification'}</div>
          <div className="toast-message text-highlight small">{toast.message}</div>
        </div>
        <button 
          type="button" 
          className="btn-close btn-close-white ms-auto small" 
          aria-label="Close" 
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default Toast;
