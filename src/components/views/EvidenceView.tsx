import React, { useState } from 'react';
import {
  FileCheck2,
  Download,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
  Shield,
  Stamp,
  Calendar,
  Building2,
  Hash,
  Sparkles,
  FileText,
} from 'lucide-react';
import { ObligationGroup, EvidenceSection } from '../../types';

interface EvidenceViewProps {
  obligations: ObligationGroup[];
  evidenceSections: EvidenceSection[];
  onToggleSection: (id: string) => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({
  obligations,
  evidenceSections,
  onToggleSection,
}) => {
  const [openObligationId, setOpenObligationId] = useState<string | null>(null);
  const [period, setPeriod] = useState('Agustus 2026');
  const [recipient, setRecipient] = useState('Pemeriksaan OJK (Pengawasan TI Sektoral)');
  const [isCompiling, setIsCompiling] = useState(false);
  const [downloadedNotice, setDownloadedNotice] = useState<string | null>(null);
  const [compiledDossier, setCompiledDossier] = useState<{
    id: string;
    sectionsCount: number;
    sha256: string;
    timestamp: string;
  } | null>({
    id: 'PB-2026-08-014',
    sectionsCount: 8,
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    timestamp: '2 September 2026 · 10:14:02 WIB',
  });

  const handleBuildDossier = () => {
    setIsCompiling(true);
    setTimeout(() => {
      const activeCount = evidenceSections.filter((s) => s.selected).length;
      const randomHex = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      setCompiledDossier({
        id: `PB-2026-08-${String(Math.floor(Math.random() * 80) + 20).padStart(3, '0')}`,
        sectionsCount: activeCount,
        sha256: randomHex,
        timestamp: new Date().toLocaleString('id-ID', {
          dateStyle: 'medium',
          timeStyle: 'medium',
        }) + ' WIB',
      });
      setIsCompiling(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-sans">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-sans tracking-wider text-[#888] uppercase">
            <span className="text-[#C5A059] font-semibold">TATA KELOLA (GOVERNANCE)</span>
            <span>/</span>
            <span>PEMETAAN REGULATOR & DOSSIER</span>
          </div>
          <h2 className="text-2xl font-light text-white tracking-tight mt-1 font-sans">
            Kewajiban Regulasi & Penyusun Paket Bukti Audit
          </h2>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs">
          <span className="px-2.5 py-1 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] text-[#888] font-medium">
            PADK OJK 1/2026
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] text-[#888] font-medium">
            UU PDP No. 27/2022
          </span>
        </div>
      </div>

      {/* Main Grid: Obligations Matrix (7 cols) & Evidence Pack Builder (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
        {/* Left Column: Obligations Matrix */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-4">
            {obligations.map((group, gIdx) => (
              <div
                key={gIdx}
                className="rounded-sm border border-[#1A1A1A] bg-[#0C0C0C] overflow-hidden shadow-sm font-sans"
              >
                {/* Group Header */}
                <div className="p-4 bg-[#0E0E0E] border-b border-[#1A1A1A] flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-medium text-white tracking-wide font-sans">
                      {group.source}
                    </h3>
                    <p className="text-xs text-[#888] font-sans mt-0.5">
                      {group.note}
                    </p>
                  </div>
                  {group.penaltyNote && (
                    <span className="text-xs font-sans text-[#F87171] bg-[#180B0B] px-2 py-0.5 rounded-sm border border-[#F87171]/30 font-medium">
                      {group.penaltyNote}
                    </span>
                  )}
                </div>

                {/* Items Accordion */}
                <div className="divide-y divide-[#161616]">
                  {group.items.map((item) => {
                    const isOpen = openObligationId === item.id;

                    return (
                      <div key={item.id} className="transition">
                        <button
                          onClick={() => setOpenObligationId(isOpen ? null : item.id)}
                          className="w-full p-3.5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 hover:bg-[#111111] transition font-sans"
                        >
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <span className="text-xs font-medium text-white block break-words">
                              {item.title}
                            </span>
                            <span className="text-xs font-sans text-[#888] block">
                              {item.regulationRef}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                            <span className="text-xs font-sans text-[#888]">
                              {item.evidenceRatio}
                            </span>
                            {item.status === 'complete' && (
                              <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold font-sans bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30">
                                LENGKAP
                              </span>
                            )}
                            {item.status === 'partial' && (
                              <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold font-sans bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                                SEBAGIAN
                              </span>
                            )}
                            {item.status === 'missing' && (
                              <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold font-sans bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/30">
                                KOSONG
                              </span>
                            )}
                            <ChevronRight
                              className={`w-4 h-4 text-[#555] transition-transform ${
                                isOpen ? 'rotate-90' : ''
                              }`}
                            />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="p-3.5 bg-[#080808] border-t border-[#1A1A1A] text-xs text-[#999] font-sans space-y-2 leading-relaxed">
                            <p className="break-words">{item.description}</p>
                            <div className="pt-2 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs font-sans text-[#C5A059] font-medium">
                              <span>Bukti terhubung ke arsip pemeriksaan</span>
                              <span className="text-[#888]">Kepatuhan Terverifikasi</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Evidence Pack Generator */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20 font-sans">
          <div className="p-4 sm:p-5 rounded-sm border border-[#1A1A1A] bg-[#0C0C0C] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#C5A059]" />
                <h3 className="text-sm font-medium text-white tracking-wide font-sans">
                  Penyusun Paket Bukti (Dossier Generator)
                </h3>
              </div>
              <span className="text-[11px] font-sans text-[#888] uppercase tracking-wider font-semibold">OJK Ready</span>
            </div>

            {/* Target & Period Pickers */}
            <div className="space-y-3 font-sans text-xs">
              <div className="space-y-1">
                <label className="text-[#888] text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                  <Calendar className="w-3 h-3 text-[#C5A059]" />
                  Periode Pemeriksaan:
                </label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#080808] border border-[#1A1A1A] text-[#D1D1D1] focus:border-[#C5A059] focus:outline-none text-xs font-sans"
                >
                  <option>Agustus 2026 (Audit Terkini)</option>
                  <option>Triwulan III 2026 (Jul–Sep)</option>
                  <option>Semester I 2026</option>
                  <option>Sejak Deployment Awal</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#888] text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                  <Building2 className="w-3 h-3 text-[#C5A059]" />
                  Ditujukan Kepada:
                </label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#080808] border border-[#1A1A1A] text-[#D1D1D1] focus:border-[#C5A059] focus:outline-none text-xs font-sans"
                >
                  <option>Pemeriksaan OJK (Pengawasan TI Sektoral)</option>
                  <option>Satuan Kerja Audit Internal (SKAI)</option>
                  <option>Kantor Akuntan Publik (KAP Independen)</option>
                  <option>Uji Tuntas Mitra Lender Institusi</option>
                </select>
              </div>
            </div>

            {/* Checklist of Included Evidence Sections */}
            <div className="space-y-2 font-sans">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-[#888] text-[11px] uppercase tracking-wider font-semibold">
                  Lingkup Bukti Terpilih ({evidenceSections.filter((s) => s.selected).length}/9)
                </span>
                <span className="text-[#C5A059] text-xs font-medium">
                  {evidenceSections.every((s) => s.selected) ? 'Semua Terpilih' : 'Sebagian Terpilih'}
                </span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {evidenceSections.map((sec) => (
                  <label
                    key={sec.id}
                    className={`p-2.5 rounded-sm border text-xs flex items-start gap-2.5 cursor-pointer transition ${
                      sec.selected
                        ? 'bg-[#141414] border-[#222] text-[#D1D1D1]'
                        : 'bg-[#080808] border-[#1A1A1A] text-[#666]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={sec.selected}
                      onChange={() => onToggleSection(sec.id)}
                      className="mt-0.5 rounded-sm border-[#333] text-[#C5A059] focus:ring-[#C5A059] bg-[#080808]"
                    />
                    <div className="min-w-0">
                      <span className="font-medium block truncate leading-tight text-xs font-sans">
                        {sec.title}
                      </span>
                      <span className="text-xs text-[#888] font-sans block mt-0.5 truncate">
                        {sec.metric}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleBuildDossier}
              disabled={isCompiling}
              className="w-full py-2.5 px-4 rounded-sm bg-[#C5A059] hover:bg-[#b08e4d] disabled:bg-[#161616] text-black font-semibold text-xs tracking-wider uppercase transition shadow-md flex items-center justify-center gap-2 min-h-[44px] font-sans"
            >
              {isCompiling ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Mengompilasi & Menandatangani Dossier...</span>
                </>
              ) : (
                <>
                  <FileCheck2 className="w-4 h-4" />
                  <span>Susun & Kunci Paket Bukti Resmi</span>
                </>
              )}
            </button>

            {/* Compiled Dossier Result Card */}
            {compiledDossier && (
              <div className="p-3.5 rounded-sm bg-[#09140C] border border-[#4ADE80]/30 space-y-2 font-sans">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[#4ADE80] font-semibold font-sans text-xs">
                    <Stamp className="w-4 h-4 shrink-0" />
                    <span className="truncate">{compiledDossier.id} Tersusun & Terkunci</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-sans font-semibold bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/40 uppercase tracking-wider shrink-0">
                    VERIFIKASI VALID
                  </span>
                </div>

                <p className="text-xs text-[#A3D9B1] font-sans leading-relaxed">
                  Paket bukti berisi {compiledDossier.sectionsCount} bagian lengkap dengan log 61.204 keputusan otorisasi, 37 identitas agent, dan lembar pengesahan direksi.
                </p>

                <div className="p-2.5 rounded-sm bg-[#050C07] border border-[#4ADE80]/20 font-sans text-xs text-[#888] space-y-1">
                  <div className="flex items-center gap-1 text-[#D1D1D1] font-medium">
                    <Hash className="w-3 h-3 text-[#4ADE80]" />
                    <span>SHA-256 Digest Seal:</span>
                  </div>
                  <div className="truncate text-[#4ADE80] font-sans text-[11px]">
                    {compiledDossier.sha256}
                  </div>
                  <div className="text-[#888]">
                    Stempel Waktu: {compiledDossier.timestamp}
                  </div>
                </div>

                {downloadedNotice && (
                  <div className="p-2 rounded-sm bg-[#4ADE80]/15 border border-[#4ADE80]/40 text-[#4ADE80] font-sans text-xs flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{downloadedNotice}</span>
                  </div>
                )}

                <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="text-xs font-sans text-[#888]">
                    Format: PDF/A-3 Audit Archival
                  </span>
                  <button
                    onClick={() => {
                      setDownloadedNotice(`Dossier ${compiledDossier.id} berhasil disiapkan untuk pengunduhan.`);
                      setTimeout(() => setDownloadedNotice(null), 5000);
                    }}
                    className="w-full sm:w-auto px-3 py-1.5 rounded-sm bg-[#4ADE80] hover:bg-[#3ec46f] text-black font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition min-h-[36px]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Dossier</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
