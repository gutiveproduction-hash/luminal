import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertOctagon,
  X,
  CheckCircle2,
  Lock,
  RotateCcw,
} from 'lucide-react';
import { Agent } from '../types';

interface KillSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Agent[];
  selectedAgentId?: string;
  onConfirmHalt: (agentId: string, reason: string) => void;
}

export const KillSwitchModal: React.FC<KillSwitchModalProps> = ({
  isOpen,
  onClose,
  agents,
  selectedAgentId,
  onConfirmHalt,
}) => {
  const [targetId, setTargetId] = useState<string>(
    selectedAgentId || (agents[0]?.id ?? '')
  );
  const [reason, setReason] = useState('Anomali perilaku terdeteksi / Pelanggaran batas otorisasi');
  const [isArmed, setIsArmed] = useState(false);

  if (!isOpen) return null;

  const activeAgents = agents.filter((a) => a.status !== 'stopped');
  const targetAgent = agents.find((a) => a.id === targetId);

  const handleArm = () => {
    if (!isArmed) {
      setIsArmed(true);
      setTimeout(() => {
        setIsArmed(false);
      }, 7000);
    } else {
      onConfirmHalt(targetId, reason);
      setIsArmed(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg max-h-[92vh] flex flex-col bg-[#0C0C0C] border border-[#F87171]/40 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Modal Header */}
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#1A1A1A] bg-[#0E0E0E] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 text-[#F87171]">
            <div className="p-1.5 rounded-sm bg-[#F87171]/15 border border-[#F87171]/30">
              <ShieldAlert className="w-5 h-5 text-[#F87171]" />
            </div>
            <div>
              <h2 className="text-sm font-light text-white tracking-wide font-sans">
                Prosedur Penghentian Darurat (Kill Switch)
              </h2>
              <p className="text-[10px] text-[#F87171] font-sans tracking-wider uppercase font-medium">
                Pencabutan Kredensial Seketika
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#666] hover:text-white hover:bg-[#1A1A1A] transition min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 font-sans">
          <div className="p-3.5 rounded-sm bg-[#120B0B] border border-[#F87171]/30 text-xs text-[#F87171]/90 leading-relaxed">
            <p className="font-semibold text-white flex items-center gap-1.5 mb-1.5 font-sans">
              <AlertOctagon className="w-4 h-4 text-[#F87171] shrink-0" />
              Tindakan ini bersifat instan dan berdampak pada produksi:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[#D1D1D1]/90 text-xs font-sans pl-1">
              <li>Seluruh token sesi aktif & kunci API agent dicabut seketika.</li>
              <li>Permintaan runtime berikutnya ditolak dengan status HTTP 403.</li>
              <li>Peristiwa dicatat secara permanen ke Berkas Audit Insiden OJK PADK 1/2026.</li>
            </ul>
          </div>

          {/* Select Agent */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-sans uppercase text-[#888] tracking-wider font-semibold">
              Pilih Identitas Agent Sasaran:
            </label>
            <select
              value={targetId}
              onChange={(e) => {
                setTargetId(e.target.value);
                setIsArmed(false);
              }}
              className="w-full px-3 py-2 rounded-sm bg-[#080808] border border-[#1A1A1A] text-[#D1D1D1] text-xs focus:outline-none focus:border-[#C5A059] font-sans min-h-[40px]"
            >
              {activeAgents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} — {a.name} ({a.system})
                </option>
              ))}
            </select>
            {targetAgent && (
              <div className="text-xs font-sans text-[#888] pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="truncate">Pemilik: {targetAgent.owner}</span>
                <span className="text-[#F87171] font-medium shrink-0">
                  Skor Risiko: {targetAgent.riskScore}/100
                </span>
              </div>
            )}
          </div>

          {/* Reason Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-sans uppercase text-[#888] tracking-wider font-semibold">
              Alasan Penghentian (Wajib untuk Jejak Audit):
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Contoh: Anomali penarikan dana massal, kegagalan prompt..."
              className="w-full px-3 py-2 rounded-sm bg-[#080808] border border-[#1A1A1A] text-[#D1D1D1] placeholder:text-[#444] text-xs focus:outline-none focus:border-[#C5A059] leading-normal font-sans"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-5 py-3 bg-[#090909] border-t border-[#1A1A1A] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          <button
            onClick={onClose}
            className="px-3.5 py-2 sm:py-1.5 rounded-sm border border-[#222] text-xs font-medium text-[#888] hover:text-white hover:bg-[#141414] transition text-center min-h-[38px]"
          >
            Batal
          </button>

          <button
            onClick={handleArm}
            className={`px-4 py-2.5 rounded-sm text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px] ${
              isArmed
                ? 'bg-[#F87171] text-black hover:bg-rose-500 shadow-[0_0_25px_rgba(248,113,113,0.5)] animate-pulse'
                : 'bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/50 hover:bg-[#F87171]/25'
            }`}
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>
              {isArmed
                ? `KONFIRMASI: HENTIKAN ${targetId}`
                : 'Siapkan Penghentian Darurat'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
