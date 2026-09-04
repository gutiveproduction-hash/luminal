import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  AlertOctagon,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { SecurityAlert, DetectionRule } from '../../types';

interface DetectionViewProps {
  alerts: SecurityAlert[];
  rules: DetectionRule[];
  onQuarantineAgent: (agentId: string) => void;
  onNavigateToEvidence: () => void;
}

export const DetectionView: React.FC<DetectionViewProps> = ({
  alerts,
  rules,
  onQuarantineAgent,
  onNavigateToEvidence,
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-medium tracking-wider text-[#666] uppercase font-sans">
            <span className="text-[#C5A059] font-semibold">KENDALIKAN (DETEKSI)</span>
            <span>/</span>
            <span>INSIDEN & RESPON OTOMATIS</span>
          </div>
          <h2 className="text-2xl font-light text-white tracking-tight mt-1 font-sans">
            Deteksi Anomali, Agent Bayangan & Respons Insiden OJK
          </h2>
        </div>

        {/* 24-Hour SLA Badge */}
        <div className="flex items-center gap-3 p-3 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A]">
          <Clock className="w-4 h-4 text-[#C5A059] animate-spin" style={{ animationDuration: '6s' }} />
          <div>
            <span className="text-[10px] text-[#888] uppercase tracking-wider block font-sans font-medium">
              SLA Notifikasi Insiden OJK (Pasal 45 PADK 1/2026)
            </span>
            <span className="text-xs font-semibold text-[#C5A059] font-sans">
              Maksimal 24 Jam sejak Terdeteksi
            </span>
          </div>
        </div>
      </div>

      {/* Active Alerts Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wider text-white font-semibold flex items-center gap-2 font-sans">
            <ShieldAlert className="w-4 h-4 text-[#F87171]" />
            <span>Peringatan Keamanan Aktif ({alerts.length})</span>
          </h3>
          <span className="text-xs text-[#888] uppercase font-sans font-medium">Otomasi Respon Diaktifkan</span>
        </div>

        <div className="space-y-3">
          {alerts.map((alt) => {
            const isCrit = alt.severity === 'critical';

            return (
              <div
                key={alt.id}
                className={`p-4 rounded-sm border space-y-3 transition ${
                  isCrit
                    ? 'bg-[#180B0B] border-[#F87171]/40 shadow-lg shadow-black/60'
                    : 'bg-[#0C0C0C] border-[#1A1A1A]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`p-2 rounded-sm mt-0.5 shrink-0 ${
                        isCrit ? 'bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/40' : 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30'
                      }`}
                    >
                      <AlertOctagon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="px-2 py-0.5 rounded-sm text-[11px] font-semibold bg-[#080808] text-[#999] border border-[#1A1A1A] shrink-0 font-sans">
                          {alt.id} · {alt.ruleId}
                        </span>
                        <span className="text-xs text-[#888] font-sans shrink-0 font-medium">
                          {alt.timeAgo}
                        </span>
                        {isCrit && (
                          <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-bold bg-[#F87171] text-black uppercase tracking-wider shrink-0 font-sans">
                            KRITIS
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-medium text-white mt-1 break-words font-sans">
                        {alt.title}
                      </h4>
                      <p className="text-xs text-[#999] leading-relaxed font-sans mt-1 break-words">
                        {alt.description}
                      </p>
                    </div>
                  </div>
                </div>

                {alt.autoActionTaken && (
                  <div className="p-2.5 rounded-sm bg-[#080808] border border-[#1A1A1A] text-xs font-sans text-[#D1D1D1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
                      <span>Respons Otomatis: {alt.autoActionTaken}</span>
                    </div>
                    <button
                      onClick={onNavigateToEvidence}
                      className="text-[11px] text-[#C5A059] hover:text-[#e4c27d] font-semibold underline underline-offset-2 shrink-0 uppercase tracking-wider font-sans"
                    >
                      Buka Berkas Insiden OJK →
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {alt.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-sm text-xs font-medium font-sans bg-[#141414] text-[#B0B0B0] border border-[#222]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {alt.agentId && alt.status !== 'resolved' && (
                    <button
                      onClick={() => onQuarantineAgent(alt.agentId!)}
                      className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm text-[11px] font-semibold uppercase tracking-wider font-sans bg-[#F87171]/15 hover:bg-[#F87171]/25 text-[#F87171] border border-[#F87171]/40 transition"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Karantina {alt.agentId}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detection Rules Catalog */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wider text-white font-semibold font-sans">
            Katalog Aturan Deteksi (Detection Engine Rules)
          </h3>
          <span className="text-xs text-[#888] font-sans font-medium">{rules.length} Aturan Terpasang</span>
        </div>

        <div className="rounded-sm border border-[#1A1A1A] bg-[#0C0C0C] overflow-hidden shadow-sm">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0E0E0E] border-b border-[#1A1A1A] text-[11px] font-sans uppercase tracking-wider text-[#888] font-semibold">
                <tr>
                  <th className="py-3 px-3.5">Kode</th>
                  <th className="py-3 px-3.5">Aturan & Pola Sinyal</th>
                  <th className="py-3 px-3.5">Respons Otomatis Penegakan</th>
                  <th className="py-3 px-3.5">Pemicu</th>
                  <th className="py-3 px-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#161616] font-sans">
                {rules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-[#111111] transition">
                    <td className="py-3 px-3.5 font-semibold text-[#C5A059] whitespace-nowrap">
                      {rule.id}
                    </td>
                    <td className="py-3 px-3.5">
                      <span className="font-medium text-white block font-sans">
                        {rule.title}
                      </span>
                      <span className="text-[11px] text-[#888] font-sans block mt-0.5">
                        Pola: {rule.signalPattern}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-[#888] font-sans text-xs">
                      {rule.autoResponse}
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap text-[#888]">
                      {rule.triggerCount} kali
                    </td>
                    <td className="py-3 px-3.5 text-right whitespace-nowrap">
                      {rule.status === 'active' ? (
                        <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30 font-sans">
                          AKTIF
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-sans">
                          PANTAU
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Rule Cards */}
          <div className="md:hidden divide-y divide-[#161616]">
            {rules.map((rule) => (
              <div key={rule.id} className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-sm text-xs font-semibold bg-[#080808] text-[#C5A059] border border-[#C5A059]/30 font-sans">
                    {rule.id}
                  </span>
                  {rule.status === 'active' ? (
                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30 font-sans">
                      AKTIF
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-sans">
                      PANTAU
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-white text-xs font-sans">{rule.title}</h4>
                  <p className="text-[11px] text-[#888] font-sans mt-0.5">Pola: {rule.signalPattern}</p>
                </div>

                <div className="pt-1.5 border-t border-[#181818] flex items-center justify-between text-[11px]">
                  <span className="text-[#888] font-sans truncate max-w-[210px]">{rule.autoResponse}</span>
                  <span className="text-[#888] font-sans shrink-0">{rule.triggerCount} pemicu</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
