"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Ancho máximo del panel. Por defecto: max-w-lg */
  maxWidth?: string;
  /** aria-labelledby — debe apuntar al id del h* dentro de ModalHeader */
  ariaLabelledBy?: string;
}

interface ModalSectionProps {
  children: React.ReactNode;
  className?: string;
}

// ─── Sub-componentes públicos ─────────────────────────────────────────────────

export const ModalHeader = ({
  children,
  className = "",
}: ModalSectionProps) => (
  <div className={`border-border border-b px-6 py-4 pr-12 ${className}`}>
    {children}
  </div>
);

export const ModalBody = ({ children, className = "" }: ModalSectionProps) => (
  <div className={`flex-1 overflow-y-auto px-6 py-5 ${className}`}>
    {children}
  </div>
);

export const ModalFooter = ({
  children,
  className = "",
}: ModalSectionProps) => (
  <div
    className={`border-border flex items-center justify-end gap-3 border-t px-6 py-4 ${className}`}
  >
    {children}
  </div>
);

// ─── Botón OK reutilizable para ModalFooter ───────────────────────────────────

export const ModalOkButton = ({
  onClose,
  label = "OK",
}: {
  onClose: () => void;
  label?: string;
}) => (
  <button
    type="button"
    onClick={onClose}
    className="bg-primary-400 hover:bg-primary-500 focus-visible:ring-primary-400/30 rounded-md px-5 py-2 text-sm font-semibold tracking-wide text-white transition-all duration-200 focus-visible:ring-3 focus-visible:outline-none"
  >
    {label}
  </button>
);

// ─── Modal principal ──────────────────────────────────────────────────────────

const Modal = ({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-lg",
  ariaLabelledBy,
}: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Manejo de teclado: ESC para cerrar y Tab para atrapar el foco
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusableElements =
          panelRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Shift + Tab
        if (e.shiftKey) {
          if (
            document.activeElement === firstElement ||
            document.activeElement === panelRef.current
          ) {
            e.preventDefault();
            lastElement.focus();
          }
        }
        // Solo Tab
        else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Mover el foco al panel al abrir y devolverlo al botón original al cerrar
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // setTimeout asegura que el render del portal haya finalizado
      setTimeout(() => panelRef.current?.focus(), 0);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop semitransparente */}
      <div
        className="bg-primary-900/40 absolute inset-0 backdrop-blur-[2px] transition-opacity duration-200"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel del modal */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`shadow-modal relative z-10 flex w-full ${maxWidth} max-h-[90vh] flex-col rounded-2xl bg-white outline-none`}
      >
        {/* Botón de cierre — siempre visible, esquina superior derecha */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar modal"
          className="text-text-tertiary hover:text-text-primary hover:bg-surface-secondary focus-visible:ring-primary-400/30 absolute top-3 right-3 z-10 rounded-lg p-1.5 transition-colors focus-visible:ring-3 focus-visible:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>

        {/* Contenido — ModalHeader + ModalBody + ModalFooter */}
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
