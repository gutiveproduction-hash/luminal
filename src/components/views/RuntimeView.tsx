import React, { useState } from 'react';
import {
  Activity,
  Play,
  Pause,
  Filter,
  Clock,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Sparkles,
  Layers,
  FileSpreadsheet,
} from 'lucide-react';
import { RuntimeEvent, ApprovalRequest, Agent, DecisionType } from '../../types';

interface RuntimeViewProps {
  events: RuntimeEvent[];
  isStreaming: boolean;
  onToggleStreaming: () => void;
  onSimulateEvent: () => void;
  approvals: ApprovalRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  agents: Agent[];
  onOpenKillSwitch: () => void;
}

export const RuntimeView: React.FC<RuntimeViewProps> = ({
  events,
  isStreaming,
  onToggleStreaming,
  onSimulateEvent,
  approvals,
  onApprove,
  onReject,
  agents,
  onOpenKillSwitch,
}) => {
  const [decisionFilter, setDecisionFilter] = useState<string>('ALL');

  const filteredEvents = events.filter((e) => {
    if (decisionFilter === 'ALL') return true;
    return e.decision === decisionFilter;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-sans">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-sans tracking-wider text-[#888] uppercase">
            <span className="text-[#C5A059] font-semibold">KENDALIKAN (RUNTIME)</span>
            <span>/</span>
            <span>ENFORCEMENT ENGINE</span>
          </div>
          <h2 className="text-2xl font-light text-white tracking-tight mt-1 font-sans">
            Otorisasi Runtime & Penegakan Kebijakan Seketika
          </h2>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto font-sans">
          <button
            onClick={onSimulateEvent}
            className="w-full sm:w-auto px-3.5 py-2 sm:py-1.5 rounded-sm bg-[#141414] hover:bg-[#1a1a1a] text-[#C5A059] border border-[#C5A059]/30 text-xs font-sans font-medium tracking-wider uppercase transition flex items-center justify-center gap-1.5 min-h-[38px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Simulasi Permintaan</span>
          </button>

          <button
            onClick={onToggleStreaming}
            className={`w-full sm:w-auto px-3.5 py-2 sm:py-1.5 rounded-sm text-xs font-sans font-semibold tracking-wider uppercase transition flex items-center justify-center gap-1.5 min-h-[38px] ${
              isStreaming
                ? 'bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 hover:bg-[#C5A059]/25'
                : 'bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30 hover:bg-[#4ADE80]/25'
            }`}
          >
            {isStreaming ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Jeda Stream</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Lanjutkan Stream</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Live Events Stream (8 cols) + Approval Queue & Kill Widget (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Streaming Events */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A]">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                {isStreaming && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isStreaming ? 'bg-[#4ADE80]' : 'bg-[#555]'}`}></span>
              </span>
              <span className="text-xs font-medium text-white tracking-wide">
                Aliran Keputusan Langsung ({filteredEvents.length} entri)
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 font-sans text-xs overflow-x-auto max-w-full pb-0.5">
              {['ALL', 'ALLOW', 'DENY', 'STEP_UP'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDecisionFilter(tab)}
                  className={`px-3 py-1.5 rounded-sm transition text-xs whitespace-nowrap min-h-[34px] ${
                    decisionFilter === tab
                      ? 'bg-[#C5A059] text-black font-semibold'
                      : 'bg-[#080808] text-[#888] hover:text-white border border-[#1A1A1A]'
                  }`}
                >
                  {tab === 'ALL'
                    ? 'Semua'
                    : tab === 'ALLOW'
                    ? 'Izinkan'
                    : tab === 'DENY'
                    ? 'Tolak'
                    : 'Bertingkat'}
                </button>
              ))}
            </div>
          </div>

          {/* Events Table and Mobile Feed */}
          <div className="rounded-sm border border-[#1A1A1A] bg-[#0C0C0C] overflow-hidden shadow-sm">
            {/* Desktop / Tablet Table */}
            <div className="hidden sm:block max-h-[600px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0E0E0E] border-b border-[#1A1A1A] text-[10px] font-mono uppercase tracking-[0.15em] text-[#666] sticky top-0 z-10 backdrop-blur-md">
                  <tr>
                    <th className="py-2.5 px-3">Waktu</th>
                    <th className="py-2.5 px-3">Agent</th>
                    <th className="py-2.5 px-3">Tindakan API</th>
                    <th className="py-2.5 px-3">Kebijakan</th>
                    <th className="py-2.5 px-3 text-right">Putusan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161616] font-mono">
                  {filteredEvents.map((evt) => (
                    <tr
                      key={evt.id}
                      className={`hover:bg-[#111111] transition-colors ${
                        evt.isNew ? 'bg-[#141414]' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 text-[#666] whitespace-nowrap text-[11px]">
                        {evt.timestamp}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="font-medium text-white block text-xs font-sans">
                          {evt.agentName}
                        </span>
                        <span className="text-[10px] text-[#666] block font-mono">
                          {evt.agentId}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <code className="text-[#C5A059] text-[11px] block">{evt.action}</code>
                        <span className="text-[10px] text-[#777] block font-sans truncate max-w-[220px]">
                          {evt.reason}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-[#777] text-[11px] whitespace-nowrap">
                        {evt.policyId}
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        {evt.decision === 'ALLOW' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30">
                            IZINKAN
                          </span>
                        )}
                        {evt.decision === 'DENY' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/30">
                            TOLAK
                          </span>
                        )}
                        {evt.decision === 'STEP_UP' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                            BERTINGKAT
                          </span>
                        )}
                        {evt.decision === 'QUARANTINE' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                            ISOLASI
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredEvents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#666] font-sans">
                        Tidak ada log keputusan yang cocok dengan filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Event Cards Feed */}
            <div className="sm:hidden divide-y divide-[#161616]">
              {filteredEvents.slice(0, 15).map((evt) => (
                <div
                  key={evt.id}
                  className={`p-3.5 space-y-2 transition-colors ${
                    evt.isNew ? 'bg-[#181818]' : 'hover:bg-[#101010]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#666]">{evt.timestamp}</span>
                    {evt.decision === 'ALLOW' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30">
                        IZINKAN
                      </span>
                    )}
                    {evt.decision === 'DENY' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/30">
                        TOLAK
                      </span>
                    )}
                    {evt.decision === 'STEP_UP' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                        BERTINGKAT
                      </span>
                    )}
                    {evt.decision === 'QUARANTINE' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                        ISOLASI
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="font-medium text-white text-xs block">
                      {evt.agentName}
                    </span>
                    <span className="text-[10px] text-[#666] font-mono">{evt.agentId}</span>
                  </div>

                  <div className="pt-1 border-t border-[#181818] space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono gap-2">
                      <code className="text-[#C5A059] truncate flex-1 min-w-0">{evt.action}</code>
                      <span className="text-[#777] text-[10px] shrink-0">{evt.policyId}</span>
                    </div>
                    <p className="text-[11px] text-[#888] font-sans leading-snug">
                      {evt.reason}
                    </p>
                  </div>
                </div>
              ))}

              {filteredEvents.length === 0 && (
                <div className="py-8 text-center text-[#666] text-xs font-sans">
                  Tidak ada log keputusan yang cocok dengan filter.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Approval Queue & Kill Switch Widget */}
        <div className="lg:col-span-4 space-y-4">
          {/* Pending Approval Queue */}
          <div className="rounded-sm border border-[#1A1A1A] bg-[#0C0C0C] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-white font-semibold">
                  Antrean Persetujuan ({approvals.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#666] uppercase">Human-in-the-loop</span>
            </div>

            <div className="space-y-3">
              {approvals.map((apr) => (
                <div
                  key={apr.id}
                  className="p-3.5 rounded-sm bg-[#080808] border border-[#1A1A1A] space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="font-medium text-white block text-xs">
                        {apr.action}
                      </span>
                      <span className="text-[11px] text-[#C5A059] font-mono">
                        {apr.agentName} ({apr.agentId})
                      </span>
                    </div>
                    {apr.amount && apr.amount !== '-' && (
                      <span className="px-2 py-0.5 rounded-sm text-[11px] font-mono font-semibold bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                        {apr.amount}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#888] leading-relaxed font-sans">
                    {apr.rationale}
                  </p>

                  <div className="pt-2 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[10px]">
                    <span className="text-[#666] truncate max-w-full sm:max-w-[170px]" title={apr.policyTriggered}>
                      {apr.policyTriggered}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => onApprove(apr.id)}
                        className="px-3 py-1.5 rounded-sm bg-[#4ADE80] hover:bg-[#3ec46f] active:bg-[#32ab5d] text-black font-semibold tracking-wider uppercase transition text-xs min-h-[34px]"
                      >
                        Setujui
                      </button>
                      <button
                        onClick={() => onReject(apr.id)}
                        className="px-3 py-1.5 rounded-sm bg-[#161616] hover:bg-[#222] active:bg-[#2a2a2a] text-[#F87171] border border-[#262626] font-semibold tracking-wider uppercase transition text-xs min-h-[34px]"
                      >
                        Tolak
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {approvals.length === 0 && (
                <div className="py-6 text-center text-[#666] text-xs font-sans">
                  <CheckCircle2 className="w-5 h-5 text-[#4ADE80] mx-auto mb-1.5" />
                  Antrean bersih. Seluruh permintaan berisiko telah diverifikasi.
                </div>
              )}
            </div>
          </div>

          {/* Quick Kill Switch Widget */}
          <div className="rounded-sm border border-[#F87171]/30 bg-[#120808] p-4 space-y-3">
            <div className="flex items-center gap-2 text-[#F87171]">
              <ShieldAlert className="w-4 h-4 text-[#F87171]" />
              <h3 className="text-xs font-mono uppercase tracking-[0.15em] font-semibold">
                Penghentian Darurat (Kill Switch)
              </h3>
            </div>
            <p className="text-xs text-[#E5A3A3] leading-relaxed font-sans">
              Mencabut seluruh token aktif, memutuskan koneksi in-flight, dan menolak panggilan berikutnya seketika jika terdeteksi anomali kritis.
            </p>
            <button
              onClick={onOpenKillSwitch}
              className="w-full py-2.5 px-3 rounded-sm bg-[#F87171]/15 hover:bg-[#F87171]/25 text-[#F87171] border border-[#F87171]/40 text-xs font-semibold tracking-wider uppercase transition flex items-center justify-center gap-2"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Buka Konsol Penghentian Darurat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
