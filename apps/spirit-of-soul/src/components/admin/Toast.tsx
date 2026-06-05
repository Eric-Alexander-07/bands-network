"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ToastType = "success" | "error" | "info";
interface ToastItem { id: number; message: string; type: ToastType; }

interface ToastCtx { toast: (message: string, type?: ToastType) => void; }
const ToastContext = createContext<ToastCtx>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

let _counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++_counter;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="a-toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`a-toast a-toast-${t.type}`}>
            {t.type === "success" && <span style={{ color: "var(--a-success)" }}>✓</span>}
            {t.type === "error"   && <span style={{ color: "var(--a-error)" }}>✕</span>}
            {t.type === "info"    && <span style={{ color: "var(--a-accent)" }}>i</span>}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
