import css from './Modal.module.css';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackDropClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (evt.target === evt.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    const handleEscKey = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement;
    const modalContent = document.querySelector(
      '[data-modal-content]'
    ) as HTMLElement;
    modalContent?.focus();
    return () => {
      previouslyFocused?.focus();
    };
  }, []);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackDropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} data-modal-content tabIndex={-1}>
        {children}
      </div>
    </div>,
    document.body
  );
}
