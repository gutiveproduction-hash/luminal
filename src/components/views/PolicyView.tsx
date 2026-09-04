import React, { useState } from 'react';
import {
  ScrollText,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Code2,
  PlayCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Policy } from '../../types';

interface PolicyViewProps {
  policies: Policy[];
  onTogglePolicyMode: (policyId: string) => void;
}

export const PolicyView: React.FC<PolicyViewProps> = ({
  policies,
  onTogglePolicyMode,
}) => {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>(policies[0]?.id ?? 'POL-01');
  const selectedPolicy = policies.find((p) => p.id === selectedPolicyId) || policies[0];

  // Sandbox State
  const [testAction, setTestAction] = useState('refund:execute');
  const [testAmount, setTestAmount] = useState('3500000');
  const [testHour, setTestHour] = useState('14');
  const [testResult, setTestResult] = useState<{
    verdict: 'ALLOW' | 'DENY' | 'STEP_UP';
    message: string;
  } | null>(null);

  const handleTestPolicy = () => {
    const amt = parseInt(testAmount, 10) || 0;
    const hr = parseInt(testHour, 10) || 12;

    if (selectedPolicy.id === 'POL-01') {
      if (hr < 8 || hr > 17) {
        setTestResult({
          verdict: 'DENY',
          message: 'TOLAK: Transaksi dilakukan di luar jam operasional (08:00 - 17:00 WIB).',
        });
      } else if (amt > 2000000) {
        setTestResult({
          verdict: 'STEP_UP',
          message: 'BERTINGKAT: Nominal Rp ' + amt.toLocaleString('id-ID') + ' melebihi ambang batas otomatis Rp 2.000.000. Wajib persetujuan supervisor.',
        });
      } else {
        setTestResult({
          verdict: 'ALLOW',
          message: 'IZINKAN: Nominal dan jam transaksi memenuhi kriteria aman POL-01.',
        });
      }
    } else if (selectedPolicy.id === 'POL-02') {
      setTestResult({
        verdict: 'DENY',
        message: 'TOLAK: Akses tabel nasabah ditolak karena konteks ID pemohon tidak cocok dengan sesi aktif.',
      });
    } else {
      setTestResult({
        verdict: 'ALLOW',
        message: `IZINKAN: Evaluasi aturan ${selectedPolicy.id} menghasilkan status patuh terhadap kondisi yang ditetapkan.`,
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-sans">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-sans tracking-wider text-[#888] uppercase">
            <span className="text-[#C5A059] font-semibold">KENDALIKAN (CONTROL)</span>
            <span>/</span>
            <span>POLICY STUDIO</span>
          </div>
          <h2 className="text-2xl font-light text-white tracking-tight mt-1 font-sans">
            Studio Kebijakan & Guardrails Otorisasi
          </h2>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs">
          <span className="px-2.5 py-1 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] text-[#888] font-medium">
            {policies.filter((p) => p.mode === 'enforce').length} Mode Tegakkan (Enforce)
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059] font-medium">
            {policies.filter((p) => p.mode === 'monitor').length} Mode Pantau (Audit-only)
          </span>
        </div>
      </div>

      {/* Main Grid: Policy List (6 cols) & Policy Inspector & Sandbox (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start font-sans">
        {/* Left Column: List of Policies */}
        <div className="lg:col-span-6 space-y-2.5">
          {policies.map((pol) => {
            const isSelected = pol.id === selectedPolicy?.id;

            return (
              <div
                key={pol.id}
                onClick={() => setSelectedPolicyId(pol.id)}
                className={`p-4 rounded-sm border transition cursor-pointer font-sans ${
                  isSelected
                    ? 'bg-[#141414] border-l-2 border-[#C5A059] border-r border-t border-b border-[#1A1A1A]'
                    : 'bg-[#0C0C0C] border-[#1A1A1A] hover:bg-[#111111]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded-sm font-sans text-[10px] font-semibold bg-[#080808] text-[#C5A059] border border-[#C5A059]/30 shrink-0">
                        {pol.id}
                      </span>
                      <span className="text-xs font-sans text-[#888] truncate">
                        {pol.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-white break-words font-sans">
                      {pol.name}
                    </h3>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePolicyMode(pol.id);
                    }}
                    className={`px-3 py-1.5 rounded-sm text-xs font-sans font-semibold transition flex items-center gap-1.5 min-h-[36px] shrink-0 ${
                      pol.mode === 'enforce'
                        ? 'bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30 hover:bg-[#4ADE80]/25'
                        : 'bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30 hover:bg-[#C5A059]/25'
                    }`}
                  >
                    {pol.mode === 'enforce' ? (
                      <>
                        <ToggleRight className="w-4 h-4 text-[#4ADE80]" />
                        <span>Tegakkan</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-4 h-4 text-[#C5A059]" />
                        <span>Pantau</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-[#888] mt-2 leading-relaxed font-sans">
                  {pol.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-[#1A1A1A] flex items-center justify-between text-xs font-sans text-[#888]">
                  <span>{pol.evaluationsCount.toLocaleString('id-ID')} evaluasi</span>
                  <span className="text-[#F87171] font-medium">
                    {pol.denialsCount} ditolak / dialihkan
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Rule Logic & Interactive Sandbox */}
        {selectedPolicy && (
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-20 font-sans">
            {/* Rule Definition Card */}
            <div className="p-5 rounded-sm border border-[#1A1A1A] bg-[#0C0C0C] space-y-4">
              <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                <div>
                  <span className="text-[11px] font-sans text-[#C5A059] uppercase tracking-wider block font-semibold">
                    Definisi Aturan Formal ({selectedPolicy.id})
                  </span>
                  <h3 className="text-base font-medium text-white mt-1 font-sans">
                    {selectedPolicy.name}
                  </h3>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-sm text-xs font-sans font-semibold uppercase tracking-wider ${
                    selectedPolicy.mode === 'enforce'
                      ? 'bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30'
                      : 'bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30'
                  }`}
                >
                  {selectedPolicy.mode === 'enforce' ? 'AKTIF TEGAKKAN' : 'MODE PANTAU'}
                </span>
              </div>

              {/* Code Expression */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-sans text-[#888] uppercase tracking-wider block font-semibold">
                  Logika Penegakan Declarative:
                </span>
                <pre className="p-3.5 rounded-sm bg-[#080808] border border-[#1A1A1A] text-[#D1D1D1] font-sans text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {selectedPolicy.ruleExpression}
                </pre>
              </div>

              {/* Enforced scopes tags */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-sans text-[#888] uppercase tracking-wider block font-semibold">
                  Scope yang Terikat:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPolicy.enforcedScopes.map((scope, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-sm bg-[#141414] text-[#C5A059] font-sans text-xs border border-[#C5A059]/30 font-medium"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Policy Tester / Sandbox */}
            <div className="p-5 rounded-sm border border-[#1A1A1A] bg-[#0C0C0C] space-y-4 font-sans">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#C5A059]" />
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-white">
                  Sandbox Pengujian Aturan (Interactive Tester)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <div className="space-y-1">
                  <label className="text-[#888] text-[11px] uppercase tracking-wider font-semibold">Aksi yang Diminta</label>
                  <input
                    type="text"
                    value={testAction}
                    onChange={(e) => setTestAction(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-sm bg-[#080808] border border-[#1A1A1A] text-[#D1D1D1] text-xs focus:border-[#C5A059] focus:outline-none min-h-[38px] font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#888] text-[11px] uppercase tracking-wider font-semibold">Nomor Jam Eksekusi (0-23)</label>
                  <input
                    type="number"
                    value={testHour}
                    onChange={(e) => setTestHour(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-sm bg-[#080808] border border-[#1A1A1A] text-[#D1D1D1] text-xs focus:border-[#C5A059] focus:outline-none min-h-[38px] font-sans"
                  />
                </div>

                <div className="space-y-1 col-span-1 sm:col-span-2">
                  <label className="text-[#888] text-[11px] uppercase tracking-wider font-semibold">Nilai Nominal / Argumen (Rupiah)</label>
                  <input
                    type="number"
                    value={testAmount}
                    onChange={(e) => setTestAmount(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-sm bg-[#080808] border border-[#1A1A1A] text-[#D1D1D1] text-xs focus:border-[#C5A059] focus:outline-none min-h-[38px] font-sans"
                  />
                </div>
              </div>

              <button
                onClick={handleTestPolicy}
                className="w-full py-2.5 px-3 rounded-sm bg-[#C5A059] hover:bg-[#b08e4d] text-black text-xs font-semibold tracking-wider uppercase transition flex items-center justify-center gap-2 font-sans"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Simulasikan Evaluasi Kebijakan</span>
              </button>

              {/* Simulation Result */}
              {testResult && (
                <div
                  className={`p-3 rounded-sm border text-xs font-sans leading-relaxed space-y-1 ${
                    testResult.verdict === 'ALLOW'
                      ? 'bg-[#09140C] border-[#4ADE80]/30 text-[#4ADE80]'
                      : testResult.verdict === 'DENY'
                      ? 'bg-[#140808] border-[#F87171]/30 text-[#F87171]'
                      : 'bg-[#161208] border-[#C5A059]/30 text-[#C5A059]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold">
                    {testResult.verdict === 'ALLOW' && <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />}
                    {testResult.verdict === 'DENY' && <XCircle className="w-4 h-4 text-[#F87171]" />}
                    {testResult.verdict === 'STEP_UP' && <AlertTriangle className="w-4 h-4 text-[#C5A059]" />}
                    <span className="tracking-wider uppercase">HASIL EVALUASI: {testResult.verdict}</span>
                  </div>
                  <p className="text-xs font-sans text-[#D1D1D1]">
                    {testResult.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
