import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingDown,
  Activity,
  CheckCircle2,
  XCircle,
  FileCheck2,
  Users,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import { Agent, RuntimeEvent, ApprovalRequest, SecurityAlert, ActiveTab } from '../../types';

interface OverviewViewProps {
  agents: Agent[];
  recentEvents: RuntimeEvent[];
  pendingApprovals: ApprovalRequest[];
  alerts: SecurityAlert[];
  onNavigate: (tab: ActiveTab) => void;
  onSelectAgent: (agentId: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onOpenKillSwitch: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  agents,
  recentEvents,
  pendingApprovals,
  alerts,
  onNavigate,
  onSelectAgent,
  onApprove,
  onReject,
  onOpenKillSwitch,
}) => {
  const stoppedAgents = agents.filter((a) => a.status === 'stopped');
  const brokenAttributionCount = agents.filter((a) =>
    a.delegationChain.some((c) => c.isBroken)
  ).length;
  const permanentSecretsCount = agents.filter((a) => a.isStanding).length;
  const shadowAgents = agents.filter((a) => a.isShadow);

  return (
    <div className="space-y-6 pb-12">
      {/* Alert Banner for Stopped Agents if any */}
      {stoppedAgents.length > 0 && (
        <div className="p-3.5 sm:p-4 rounded-sm bg-[#180B0B] border border-[#F87171]/40 text-[#F87171] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(248,113,113,0.15)] animate-pulse font-sans">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <div className="p-2 rounded-sm bg-[#F87171] text-black shrink-0 mt-0.5 sm:mt-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide font-sans">
                PERINGATAN OPERASIONAL: {stoppedAgents.length} Agent Sedang Dihentikan Darurat
              </h4>
              <p className="text-xs text-[#F87171]/90 font-sans mt-0.5 leading-relaxed break-words">
                {stoppedAgents.map((a) => `${a.id} (${a.name})`).join(', ')} — Seluruh token dicabut, permintaan runtime ditolak.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('registry')}
            className="w-full sm:w-auto px-3.5 py-2 sm:py-1.5 rounded-sm bg-[#F87171] hover:bg-rose-500 text-black text-xs font-semibold tracking-wider uppercase transition flex items-center justify-center gap-1.5 shrink-0 min-h-[38px] font-sans"
          >
            <span>Tinjau di Registri</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Posture Summary Bar */}
      <div className="p-4 sm:p-6 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] space-y-4 sm:space-y-5 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-sans uppercase tracking-wider text-[#C5A059] font-semibold">
                POSTUR KENDALI & KEPATUHAN
              </span>
              <span className="text-xs text-[#333]">•</span>
              <span className="text-xs text-[#888] font-sans">
                Audit Periode: Triwulan III 2026
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight mt-1 font-sans">
              Dashboard Eksekutif Tata Kelola Agentik
            </h2>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1A1A1A]">
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-sans uppercase tracking-wider text-[#888] block font-medium">
                Indeks Kesiapan Audit OJK
              </span>
              <span className="text-xl sm:text-2xl font-light font-sans text-[#C5A059]">
                58% <span className="text-xs font-sans text-[#888] font-normal">(Sedang)</span>
              </span>
            </div>
            <button
              onClick={() => onNavigate('evidence')}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-sm bg-[#C5A059] hover:bg-[#b5924d] text-black text-xs font-semibold tracking-wider uppercase transition shadow-[0_0_20px_rgba(197,160,89,0.2)] flex items-center justify-center gap-2 min-h-[42px] font-sans"
            >
              <FileCheck2 className="w-4 h-4 text-black" />
              <span>Susun Paket Bukti OJK</span>
            </button>
          </div>
        </div>

        {/* 4 Core KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1 font-sans">
          {/* KPI 1 */}
          <div className="p-3.5 sm:p-4 rounded-sm bg-[#080808] border border-[#1A1A1A] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#888] text-[11px] font-sans uppercase tracking-wider font-semibold">
              <span>TOTAL IDENTITAS</span>
              <Users className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="mt-2.5 sm:mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-light font-sans text-white">37</span>
              <span className="text-xs text-[#888] font-sans">
                (9 aktif · {shadowAgents.length} shadow)
              </span>
            </div>
            <span className="text-xs text-[#888] mt-1.5 sm:mt-2 font-sans">
              9 identitas diawasi langsung di perimeter ini
            </span>
          </div>

          {/* KPI 2 */}
          <div className="p-3.5 sm:p-4 rounded-sm bg-[#080808] border border-[#F87171]/20 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#F87171]/90 text-[11px] font-sans uppercase tracking-wider font-semibold">
              <span>HAK PERMANEN</span>
              <KeyRound className="w-4 h-4 text-[#F87171]" />
            </div>
            <div className="mt-2.5 sm:mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-light font-sans text-[#F87171]">{permanentSecretsCount}</span>
              <span className="text-xs text-[#F87171]/80 font-sans font-medium">Akun Statis</span>
            </div>
            <span className="text-xs text-[#888] mt-1.5 sm:mt-2 font-sans">
              Berjalan tanpa kedaluwarsa · Perlu migrasi ke JIT
            </span>
          </div>

          {/* KPI 3 */}
          <div className="p-3.5 sm:p-4 rounded-sm bg-[#080808] border border-[#1A1A1A] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#888] text-[11px] font-sans uppercase tracking-wider font-semibold">
              <span>DITOLAK (24 JAM)</span>
              <XCircle className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="mt-2.5 sm:mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-light font-sans text-[#C5A059]">418</span>
              <span className="text-xs text-[#888] font-sans">/ 61.204 Total</span>
            </div>
            <span className="text-xs text-[#888] mt-1.5 sm:mt-2 font-sans">
              0.68% pelanggaran kebijakan ditepis seketika
            </span>
          </div>

          {/* KPI 4 */}
          <div className="p-3.5 sm:p-4 rounded-sm bg-[#080808] border border-[#1A1A1A] flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#888] text-[11px] font-sans uppercase tracking-wider font-semibold">
              <span>ATRIBUSI PUTUS</span>
              <AlertTriangle className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="mt-2.5 sm:mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-light font-sans text-[#C5A059]">
                {brokenAttributionCount}
              </span>
              <span className="text-xs text-[#888] font-sans">dari 9 Agent</span>
            </div>
            <span className="text-xs text-[#888] mt-1.5 sm:mt-2 font-sans">
              Tindakan tidak bisa ditelusuri ke identitas manusia
            </span>
          </div>
        </div>
      </div>

      {/* Tiga Pilar Kendali (Discovery - Runtime - Governance) */}
      <div className="space-y-3 font-sans">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-sans uppercase tracking-wider text-[#888] font-semibold">
            Tiga Pilar Arsitektur Kendali Agent
          </h3>
          <span className="text-xs font-sans uppercase tracking-wider text-[#666]">Standar Sektoral</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pilar 1 */}
          <div
            onClick={() => onNavigate('registry')}
            className="p-5 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] hover:border-[#C5A059]/40 transition cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white tracking-wide">1. Temukan (Discovery)</span>
                <span className="text-xs font-sans font-medium text-[#C5A059]">74% Terlindungi</span>
              </div>
              <p className="text-xs text-[#888] mt-1.5 leading-relaxed font-sans">
                Inventarisasi agent, topologi rantai delegasi, dan pemindaian agent bayangan tak terdaftar.
              </p>
            </div>
            <div>
              <div className="w-full bg-[#1A1A1A] rounded-full h-1 overflow-hidden">
                <div className="bg-[#C5A059] h-1 rounded-full" style={{ width: '74%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs font-sans text-[#888] mt-2.5">
                <span>9 Agent Terdata</span>
                <span className="text-[#C5A059] font-medium group-hover:underline">1 Shadow Diisolasi →</span>
              </div>
            </div>
          </div>

          {/* Pilar 2 */}
          <div
            onClick={() => onNavigate('runtime')}
            className="p-5 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] hover:border-[#C5A059]/40 transition cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white tracking-wide">2. Kendalikan (Runtime)</span>
                <span className="text-xs font-sans font-medium text-[#F87171]">41% Terlindungi</span>
              </div>
              <p className="text-xs text-[#888] mt-1.5 leading-relaxed font-sans">
                Otorisasi per tindakan, batas nominal transaksi, pembatalan izin instan, dan tombol henti darurat.
              </p>
            </div>
            <div>
              <div className="w-full bg-[#1A1A1A] rounded-full h-1 overflow-hidden">
                <div className="bg-[#F87171] h-1 rounded-full" style={{ width: '41%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs font-sans text-[#888] mt-2.5">
                <span>7 Kebijakan Aktif</span>
                <span className="text-[#F87171] font-medium group-hover:underline">11 Hak Statis →</span>
              </div>
            </div>
          </div>

          {/* Pilar 3 */}
          <div
            onClick={() => onNavigate('evidence')}
            className="p-5 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] hover:border-[#C5A059]/40 transition cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white tracking-wide">3. Tata Kelola (Proof)</span>
                <span className="text-xs font-sans font-medium text-[#4ADE80]">58% Terpenuhi</span>
              </div>
              <p className="text-xs text-[#888] mt-1.5 leading-relaxed font-sans">
                Pemetaan pasal PADK OJK 1/2026, pasal UU PDP 27/2022, lembar pengesahan, dan paket bukti.
              </p>
            </div>
            <div>
              <div className="w-full bg-[#1A1A1A] rounded-full h-1 overflow-hidden">
                <div className="bg-[#4ADE80] h-1 rounded-full" style={{ width: '58%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs font-sans text-[#888] mt-2.5">
                <span>10 Bukti Terpetakan</span>
                <span className="text-[#4ADE80] font-medium group-hover:underline">Buka Dossier →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Runtime Decision Stream & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
        {/* Left Column (7 cols): Live Authorization Stream */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#4ADE80] animate-pulse" />
              <h3 className="text-[11px] font-sans uppercase tracking-wider text-[#888] font-semibold">
                Aliran Putusan Otorisasi Runtime
              </h3>
            </div>
            <button
              onClick={() => onNavigate('runtime')}
              className="text-xs font-sans text-[#C5A059] hover:text-white flex items-center gap-1 font-medium"
            >
              Lihat Lengkap →
            </button>
          </div>

          <div className="rounded-sm border border-[#1A1A1A] bg-[#0C0C0C] overflow-hidden">
            {/* Desktop & Tablet Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#0E0E0E] border-b border-[#1A1A1A] text-[11px] font-sans uppercase tracking-wider text-[#888] font-semibold">
                  <tr>
                    <th className="py-3 px-3.5">Waktu</th>
                    <th className="py-3 px-3.5">Agent</th>
                    <th className="py-3 px-3.5">Tindakan Diminta</th>
                    <th className="py-3 px-3.5">Kebijakan</th>
                    <th className="py-3 px-3.5 text-right">Putusan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161616] font-sans">
                  {recentEvents.slice(0, 8).map((evt) => (
                    <tr
                      key={evt.id}
                      className={`hover:bg-[#121212] transition-colors ${
                        evt.isNew ? 'bg-[#C5A059]/10' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3.5 text-[#888] whitespace-nowrap font-sans text-xs">
                        {evt.timestamp}
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <button
                          onClick={() => {
                            onNavigate('registry');
                            onSelectAgent(evt.agentId);
                          }}
                          className="font-medium text-[#D1D1D1] hover:text-[#C5A059] text-left block transition-colors font-sans"
                        >
                          {evt.agentName}
                        </button>
                        <span className="text-xs text-[#666] block font-sans">
                          {evt.agentId}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 text-[#D1D1D1] font-sans text-xs">
                        <span className="font-medium">{evt.action}</span>
                      </td>
                      <td className="py-2.5 px-3.5 text-[#888] text-xs font-sans">
                        {evt.policyId}
                      </td>
                      <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                        {evt.decision === 'ALLOW' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-wider uppercase bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30 font-sans">
                            IZINKAN
                          </span>
                        )}
                        {evt.decision === 'DENY' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-wider uppercase bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/30 font-sans">
                            TOLAK
                          </span>
                        )}
                        {evt.decision === 'STEP_UP' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-wider uppercase bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-sans">
                            BERTINGKAT
                          </span>
                        )}
                        {evt.decision === 'QUARANTINE' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-wider uppercase bg-[#C5A059]/20 text-[#E0C078] border border-[#C5A059]/40 font-sans">
                            ISOLASI
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards Feed for Small Smartphone Screens */}
            <div className="sm:hidden divide-y divide-[#161616] font-sans">
              {recentEvents.slice(0, 7).map((evt) => (
                <div
                  key={evt.id}
                  className={`p-3.5 space-y-2 transition-colors ${
                    evt.isNew ? 'bg-[#C5A059]/10' : 'hover:bg-[#111]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-[#888]">{evt.timestamp}</span>
                    <div>
                      {evt.decision === 'ALLOW' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-wider uppercase bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30 font-sans">
                          IZINKAN
                        </span>
                      )}
                      {evt.decision === 'DENY' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-wider uppercase bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/30 font-sans">
                          TOLAK
                        </span>
                      )}
                      {evt.decision === 'STEP_UP' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-wider uppercase bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 font-sans">
                          BERTINGKAT
                        </span>
                      )}
                      {evt.decision === 'QUARANTINE' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold tracking-wider uppercase bg-[#C5A059]/20 text-[#E0C078] border border-[#C5A059]/40 font-sans">
                          ISOLASI
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        onNavigate('registry');
                        onSelectAgent(evt.agentId);
                      }}
                      className="text-xs font-medium text-[#E5E5E5] hover:text-[#C5A059] text-left block font-sans"
                    >
                      {evt.agentName}
                    </button>
                    <span className="text-xs font-sans text-[#666]">{evt.agentId}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-sans pt-1 border-t border-[#161616]">
                    <span className="text-[#C5A059] font-medium truncate max-w-[200px]">{evt.action}</span>
                    <span className="text-[#888] text-xs">{evt.policyId}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Actionable Approvals & Critical Warnings */}
        <div className="lg:col-span-5 space-y-4 font-sans">
          {/* Pending Approvals */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <h3 className="text-[11px] font-sans uppercase tracking-wider text-[#888] font-semibold">
                  Perlu Persetujuan ({pendingApprovals.length})
                </h3>
              </div>
              <span className="text-xs font-sans text-[#888] tracking-wider uppercase font-medium">SLA 15 Menit</span>
            </div>

            <div className="space-y-2.5">
              {pendingApprovals.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] hover:border-[#262626] transition space-y-2.5 font-sans"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-medium text-white block">
                        {req.action}
                      </span>
                      <span className="text-xs text-[#C5A059] font-sans font-medium">
                        {req.agentName} ({req.agentId})
                      </span>
                    </div>
                    {req.amount && req.amount !== '-' && (
                      <span className="px-2 py-0.5 rounded-sm text-xs font-sans font-semibold bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                        {req.amount}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#888] leading-normal font-sans">
                    {req.rationale}
                  </p>

                  <div className="pt-2.5 border-t border-[#1A1A1A] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                    <span className="text-xs font-sans text-[#888] truncate max-w-full sm:max-w-[200px]" title={`Pemicu: ${req.policyTriggered}`}>
                      Pemicu: {req.policyTriggered}
                    </span>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => onApprove(req.id)}
                        className="px-3 py-1.5 rounded-sm bg-[#4ADE80] hover:bg-[#3ec46f] active:bg-[#32ab5d] text-black font-semibold text-xs tracking-wider uppercase transition min-h-[34px] font-sans"
                      >
                        Setujui
                      </button>
                      <button
                        onClick={() => onReject(req.id)}
                        className="px-3 py-1.5 rounded-sm bg-[#161616] hover:bg-[#201515] active:bg-[#2a1a1a] text-[#F87171] border border-[#F87171]/30 font-medium text-xs tracking-wider uppercase transition min-h-[34px] font-sans"
                      >
                        Tolak
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {pendingApprovals.length === 0 && (
                <div className="p-6 text-center rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] text-[#888] text-xs font-sans">
                  <CheckCircle2 className="w-6 h-6 text-[#4ADE80]/50 mx-auto mb-2" />
                  Seluruh permohonan telah ditinjau. Tidak ada antrean tertahan.
                </div>
              )}
            </div>
          </div>

          {/* Active Security Alerts Widget */}
          <div className="space-y-2.5 font-sans">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-sans uppercase tracking-wider text-[#888] font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#F87171]" />
                <span>Peringatan Keamanan Terbuka ({alerts.length})</span>
              </h3>
              <button
                onClick={() => onNavigate('detection')}
                className="text-xs font-sans text-[#C5A059] hover:text-white font-medium"
              >
                Aturan Deteksi →
              </button>
            </div>

            <div className="space-y-2">
              {alerts.slice(0, 2).map((alt) => (
                <div
                  key={alt.id}
                  className="p-3.5 rounded-sm bg-[#0F0808] border border-[#F87171]/25 space-y-1.5 font-sans"
                >
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="font-semibold text-[#F87171] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F87171] animate-pulse"></span>
                      {alt.ruleId}
                    </span>
                    <span className="text-[#888]">{alt.timeAgo}</span>
                  </div>
                  <h4 className="text-xs font-medium text-white font-sans">
                    {alt.title}
                  </h4>
                  <p className="text-xs text-[#888] leading-relaxed font-sans">
                    {alt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers & Regulatory Context Footnote */}
      <div className="pt-4 border-t border-[#1A1A1A] text-xs text-[#888] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-sans tracking-wide">
        <span className="leading-normal">
          LUMINAL Enforcer Architecture · Zero Data Ingestion: Tidak pernah menyalin data nasabah keluar dari perimeter klien.
        </span>
        <span className="shrink-0 text-[#C5A059]/90 font-medium">Rujukan: PADK OJK 1/2026 & UU PDP No. 27/2022</span>
      </div>
    </div>
  );
};
