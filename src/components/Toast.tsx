import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto p-3.5 rounded-sm bg-[#0C0C0C] border border-[#222] shadow-[0_0_30px_rgba(0,0,0,0.9)] flex items-start justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-start gap-2.5">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-[#4ADE80] mt-0.5 shrink-0" />
            )}
            {toast.type === 'warning' && (
              <AlertTriangle className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
            )}
            <div>
              <h5 className="text-xs font-medium text-white leading-tight">
                {toast.title}
              </h5>
              <p className="text-[11px] text-[#888] font-sans mt-0.5 leading-snug">
                {toast.description}
              </p>
            </div>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 text-[#666] hover:text-white rounded-sm transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
