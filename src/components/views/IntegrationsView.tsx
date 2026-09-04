import React from 'react';
import {
  Network,
  ShieldCheck,
  Eye,
  Radar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Layers,
  Cpu,
} from 'lucide-react';
import { Integration } from '../../types';

interface IntegrationsViewProps {
  integrations: Integration[];
}

export const IntegrationsView: React.FC<IntegrationsViewProps> = ({
  integrations,
}) => {
  const enforcementPoints = integrations.filter((i) => i.type === 'Enforcement Point');
  const identitySources = integrations.filter((i) => i.type === 'Identity Source');
  const visibilityOnly = integrations.filter((i) => i.type === 'Visibility Only');
  const discovery = integrations.filter((i) => i.type === 'Discovery');

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 font-sans">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-sans tracking-wider text-[#888] uppercase">
            <span className="text-[#C5A059] font-semibold">TATA KELOLA (GOVERNANCE)</span>
            <span>/</span>
            <span>ENFORCEMENT TOPOLOGY</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight mt-1 font-sans">
            Sumber Identitas, Titik Penegakan & Server MCP
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-sans text-xs">
          <span className="px-2.5 py-1 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] text-[#4ADE80] font-medium">
            {enforcementPoints.length} Titik Penegakan Aktif
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] text-[#C5A059] font-medium">
            {visibilityOnly.length} Visibilitas Pasif
          </span>
        </div>
      </div>

      {/* Architectural Guidance Box */}
      <div className="p-4 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] text-xs text-[#999] space-y-2 leading-relaxed font-sans">
        <div className="flex items-center gap-2 text-[#C5A059] font-sans font-semibold uppercase tracking-wider text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Prinsip Keamanan Runtime LUMINAL:</span>
        </div>
        <p>
          <strong className="text-white font-medium">Titik Penegakan (Enforcement Point)</strong> adalah simpul di mana platform LUMINAL memiliki wewenang inline untuk menolak dan menggagalkan tindakan berbahaya sebelum menyentuh data nasabah. Integrasi berstatus <strong className="text-[#C5A059] font-medium">Visibilitas Saja (Visibility Only)</strong> hanya mencatat kejadian setelah terjadi — berguna untuk bukti audit, tetapi tidak dapat mencegah kerugian seketika.
        </p>
      </div>

      {/* Grid of Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] hover:bg-[#111111] transition space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="px-1.5 py-0.5 rounded-sm font-sans text-[10px] font-semibold bg-[#080808] text-[#C5A059] border border-[#C5A059]/30">
                  {item.id}
                </span>

                {item.type === 'Enforcement Point' && (
                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold font-sans bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30">
                    PENEGAKAN INLINE
                  </span>
                )}
                {item.type === 'Identity Source' && (
                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold font-sans bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                    SUMBER IDENTITAS
                  </span>
                )}
                {item.type === 'Visibility Only' && (
                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold font-sans bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20">
                    VISIBILITAS SAJA
                  </span>
                )}
                {item.type === 'Discovery' && (
                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold font-sans bg-[#141414] text-[#D1D1D1] border border-[#333]">
                    DETEKSI ANOMALI
                  </span>
                )}
              </div>

              <h3 className="text-sm font-medium text-white mt-2 font-sans">
                {item.name}
              </h3>
              <p className="text-xs text-[#888] mt-1 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1A1A1A] flex items-center justify-between text-xs font-sans">
              <span className="text-[#888] truncate max-w-[170px]">
                {item.protocol}
              </span>
              <span className="flex items-center gap-1.5 text-[#4ADE80] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse"></span>
                Terhubung
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
