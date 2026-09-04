import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  AlertTriangle,
  RotateCw,
  Zap,
  KeyRound,
  FileText,
  UserCheck,
  ArrowRight,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Agent, AgentStatus } from '../../types';

interface RegistryViewProps {
  agents: Agent[];
  selectedAgentId: string;
  onSelectAgent: (id: string) => void;
  onRotateKey: (agentId: string) => void;
  onConvertToJit: (agentId: string) => void;
  onOpenKillSwitchFor: (agentId: string) => void;
  onRestoreAgent: (agentId: string) => void;
}

export const RegistryView: React.FC<RegistryViewProps> = ({
  agents,
  selectedAgentId,
  onSelectAgent,
  onRotateKey,
  onConvertToJit,
  onOpenKillSwitchFor,
  onRestoreAgent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'broken' | 'standing' | 'noowner' | 'shadow'>('all');

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const filteredAgents = agents.filter((a) => {
    // Search query
    const queryMatch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.system.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.owner.toLowerCase().includes(searchQuery.toLowerCase());

    if (!queryMatch) return false;

    if (filter === 'broken') return a.delegationChain.some((c) => c.isBroken);
    if (filter === 'standing') return a.isStanding;
    if (filter === 'noowner') return a.owner.includes('Belum');
    if (filter === 'shadow') return a.isShadow;

    return true;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* View Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-[#666]">
            <span className="text-[#C5A059] font-bold">TEMUKAN (DISCOVERY)</span>
            <span>/</span>
            <span>TOPOLOGI IDENTITAS</span>
          </div>
          <h2 className="text-2xl font-light text-white tracking-tight mt-1">
            Registri Agent & Rantai Delegasi Atribusi
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] text-[#888]">
            {agents.length} Total Identitas
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/30">
            {agents.filter((a) => a.isStanding).length} Hak Statis
          </span>
          <span className="px-2.5 py-1 rounded-sm bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
            {agents.filter((a) => a.delegationChain.some((c) => c.isBroken)).length} Atribusi Putus
          </span>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A]">
        <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-xs md:max-w-md">
          <Search className="w-4 h-4 text-[#666] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter nama agent, sistem, atau pemilik..."
            className="w-full pl-9 pr-3 py-2 sm:py-1.5 rounded-sm bg-[#080808] border border-[#1A1A1A] text-[#D1D1D1] placeholder:text-[#555] text-xs focus:outline-none focus:border-[#C5A059] min-h-[38px]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full w-full sm:w-auto scrollbar-thin">
          {[
            { id: 'all', label: 'Semua (9)' },
            { id: 'broken', label: 'Atribusi Putus (4)' },
            { id: 'standing', label: 'Hak Permanen (5)' },
            { id: 'noowner', label: 'Tanpa Pemilik (3)' },
            { id: 'shadow', label: 'Shadow Agent (1)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium transition whitespace-nowrap shrink-0 min-h-[36px] ${
                filter === tab.id
                  ? 'bg-[#C5A059] text-black font-semibold shadow-sm'
                  : 'bg-[#080808] text-[#888] hover:text-white border border-[#1A1A1A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split View: Table on Left (7 cols), Detailed Inspector on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Table of Agents */}
        <div className="lg:col-span-7 rounded-sm border border-[#1A1A1A] bg-[#0C0C0C] overflow-hidden shadow-sm">
          {/* Desktop & Tablet Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0E0E0E] border-b border-[#1A1A1A] text-[10px] font-mono uppercase tracking-[0.15em] text-[#666]">
                <tr>
                  <th className="py-3 px-3.5">Agent & Sistem</th>
                  <th className="py-3 px-3.5">Kredensial</th>
                  <th className="py-3 px-3.5">Atribusi</th>
                  <th className="py-3 px-3.5">Risiko</th>
                  <th className="py-3 px-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#161616] font-mono">
                {filteredAgents.map((agent) => {
                  const isSelected = agent.id === selectedAgent?.id;
                  const isBroken = agent.delegationChain.some((c) => c.isBroken);

                  return (
                    <tr
                      key={agent.id}
                      onClick={() => onSelectAgent(agent.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#141414] border-l-2 border-[#C5A059]'
                          : 'hover:bg-[#111111]'
                      }`}
                    >
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white text-xs font-sans">
                            {agent.name}
                          </span>
                          {agent.isShadow && (
                            <span className="px-1.5 py-0.2 rounded-sm text-[9px] font-mono bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/40 uppercase">
                              Bayangan
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#666] block font-mono mt-0.5">
                          {agent.id} · {agent.system}
                        </span>
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="text-[#D1D1D1] block">{agent.credType}</span>
                        <span className="text-[10px] text-[#666] block font-mono">
                          {agent.isStanding ? 'Hak Permanen' : `JIT (${agent.ttl})`}
                        </span>
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {isBroken ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/30">
                            Putus (Hop {agent.delegationChain.findIndex((c) => c.isBroken) + 1})
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30">
                            Utuh
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span
                          className={`font-medium font-mono px-2 py-0.5 rounded-sm text-[11px] ${
                            agent.riskScore >= 80
                              ? 'bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/30'
                              : agent.riskScore >= 50
                              ? 'bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30'
                              : 'bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30'
                          }`}
                        >
                          {agent.riskScore}/100
                        </span>
                      </td>

                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        {agent.status === 'active' && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#4ADE80] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
                            Aktif
                          </span>
                        )}
                        {agent.status === 'quarantined' && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#C5A059] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                            Isolasi
                          </span>
                        )}
                        {agent.status === 'stopped' && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#F87171] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F87171]"></span>
                            Berhenti
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards for Handphone / Small Screens */}
          <div className="md:hidden divide-y divide-[#161616]">
            {filteredAgents.map((agent) => {
              const isSelected = agent.id === selectedAgent?.id;
              const isBroken = agent.delegationChain.some((c) => c.isBroken);

              return (
                <div
                  key={agent.id}
                  onClick={() => onSelectAgent(agent.id)}
                  className={`p-3.5 space-y-2.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#141414] border-l-4 border-[#C5A059]' : 'hover:bg-[#111]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white text-sm font-sans">
                          {agent.name}
                        </span>
                        {agent.isShadow && (
                          <span className="px-1.5 py-0.5 rounded-sm text-[9px] font-mono bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/30">
                            SHADOW
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#777] font-mono mt-0.5">
                        {agent.id} · {agent.system}
                      </div>
                    </div>

                    <div className="text-right">
                      {agent.status === 'active' && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#4ADE80] font-medium font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
                          Aktif
                        </span>
                      )}
                      {agent.status === 'quarantined' && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#C5A059] font-medium font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                          Isolasi
                        </span>
                      )}
                      {agent.status === 'stopped' && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#F87171] font-medium font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F87171]"></span>
                          Berhenti
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#181818] text-[11px] font-mono">
                    <div>
                      <span className="text-[9px] text-[#666] block uppercase">Kredensial</span>
                      {agent.isStanding ? (
                        <span className="text-[#F87171] font-medium">Permanen</span>
                      ) : (
                        <span className="text-[#4ADE80] font-medium">JIT</span>
                      )}
                    </div>

                    <div>
                      <span className="text-[9px] text-[#666] block uppercase">Atribusi</span>
                      {isBroken ? (
                        <span className="text-[#F87171] font-medium">Putus</span>
                      ) : (
                        <span className="text-[#4ADE80] font-medium">Utuh</span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-[#666] block uppercase">Risiko</span>
                      <span
                        className={`font-semibold ${
                          agent.riskScore >= 80
                            ? 'text-[#F87171]'
                            : agent.riskScore >= 50
                            ? 'text-[#C5A059]'
                            : 'text-[#4ADE80]'
                        }`}
                      >
                        {agent.riskScore}/100
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-[#777]">
                    <span className="truncate max-w-[170px]">Pemilik: {agent.owner}</span>
                    <span className="text-[#C5A059] font-medium shrink-0">
                      {isSelected ? 'Sedang Diinspeksi ✓' : 'Sentuh untuk inspeksi →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Inspector */}
        {selectedAgent ? (
          <div className="lg:col-span-5 rounded-sm border border-[#1A1A1A] bg-[#0C0C0C] p-4 sm:p-5 space-y-4 sm:space-y-5 lg:sticky lg:top-20 shadow-xl">
            {/* Header of Inspector */}
            <div className="flex items-start justify-between gap-3 border-b border-[#1A1A1A] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-sm font-mono text-xs font-semibold bg-[#141414] text-[#C5A059] border border-[#C5A059]/30">
                    {selectedAgent.id}
                  </span>
                  {selectedAgent.isShadow && (
                    <span className="px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/40 uppercase tracking-wider">
                      SHADOW AGENT
                    </span>
                  )}
                </div>
                <h3 className="text-base font-light text-white tracking-wide mt-1.5">
                  {selectedAgent.name}
                </h3>
                <p className="text-xs text-[#666] font-mono mt-0.5">
                  {selectedAgent.system}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-[#666] block uppercase tracking-[0.2em]">
                  Blast Radius
                </span>
                <span
                  className={`text-xl font-light font-mono ${
                    selectedAgent.riskScore >= 80 ? 'text-[#F87171]' : 'text-[#C5A059]'
                  }`}
                >
                  {selectedAgent.riskScore}
                  <span className="text-xs text-[#555] font-normal">/100</span>
                </span>
              </div>
            </div>

            {/* SECTION 1: VISUAL DELEGATION PROVENANCE CHAIN */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666] font-bold">
                  Rantai Delegasi & Batas Kepercayaan
                </span>
                <span className="text-[10px] font-mono text-[#555] uppercase">Hop-by-Hop</span>
              </div>

              <div className="p-3.5 rounded-sm bg-[#080808] border border-[#1A1A1A] space-y-2.5">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                  {selectedAgent.delegationChain.map((node, idx) => {
                    const isBroken = node.isBroken;
                    const isLast = idx === selectedAgent.delegationChain.length - 1;

                    return (
                      <React.Fragment key={idx}>
                        <div
                          className={`shrink-0 min-w-[95px] p-2 rounded-sm border text-center transition-all ${
                            isBroken
                              ? 'bg-[#180B0B] border-[#F87171]/50 text-[#F87171] border-dashed'
                              : 'bg-[#0E0E0E] border-[#222] text-[#D1D1D1]'
                          }`}
                        >
                          <span className="text-[11px] font-semibold block truncate font-mono">
                            {node.entity}
                          </span>
                          <span className="text-[9px] text-[#666] block truncate leading-tight mt-0.5">
                            {node.role}
                          </span>
                        </div>

                        {!isLast && (
                          <span
                            className={`font-mono text-xs px-0.5 shrink-0 ${
                              selectedAgent.delegationChain[idx + 1]?.isBroken
                                ? 'text-[#F87171] font-bold'
                                : 'text-[#444]'
                            }`}
                          >
                            →
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {selectedAgent.delegationChain.some((c) => c.isBroken) ? (
                  <p className="text-[11px] text-[#F87171] font-mono bg-[#140808] p-2.5 rounded-sm border border-[#F87171]/30">
                    ⚠ Jejak atribusi ke penanggung jawab manusia terputus karena kredensial statis bersama atau transmisi lintas batas tanpa klaim On-Behalf-Of.
                  </p>
                ) : (
                  <p className="text-[11px] text-[#4ADE80] font-mono bg-[#09140C] p-2.5 rounded-sm border border-[#4ADE80]/30">
                    ✓ Rantai atribusi utuh: setiap eksekusi terikat ke izin nasabah & otorisasi petugas.
                  </p>
                )}
              </div>
            </div>

            {/* SECTION 2: METADATA & KREDENSIAL */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666] font-bold block">
                Identitas & Tata Kelola
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs bg-[#080808] p-3 rounded-sm border border-[#1A1A1A] font-mono">
                <div>
                  <span className="text-[#666] block text-[10px] uppercase tracking-wider">Pemilik Risiko (Owner)</span>
                  <span className="text-[#D1D1D1] font-medium">{selectedAgent.owner}</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[10px] uppercase tracking-wider">Unit Kerja</span>
                  <span className="text-[#D1D1D1]">{selectedAgent.ownerDept}</span>
                </div>
                <div className="pt-2 border-t border-[#1A1A1A]">
                  <span className="text-[#666] block text-[10px] uppercase tracking-wider">Tipe Kredensial</span>
                  <span className="text-[#D1D1D1]">{selectedAgent.credType}</span>
                </div>
                <div className="pt-2 border-t border-[#1A1A1A]">
                  <span className="text-[#666] block text-[10px] uppercase tracking-wider">Masa Berlaku (TTL)</span>
                  <span className={selectedAgent.isStanding ? 'text-[#F87171] font-semibold' : 'text-[#4ADE80]'}>
                    {selectedAgent.ttl}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#1A1A1A] col-span-2">
                  <span className="text-[#666] block text-[10px] uppercase tracking-wider">Dasar Hukum Pemrosesan (UU PDP)</span>
                  <span className="text-[#888] font-sans text-[11px] block mt-0.5">
                    {selectedAgent.legalBasis}
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 3: HAK AKSES EFEKTIF */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666] font-bold block">
                Hak Akses Efektif (Scopes & Permissions)
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {selectedAgent.permissions.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-sm bg-[#080808] border border-[#1A1A1A] flex items-start justify-between gap-2 text-xs font-mono"
                  >
                    <div>
                      <code className="text-[#C5A059] font-medium">{p.scope}</code>
                      <span className="text-[10px] text-[#666] block font-sans mt-0.5">
                        {p.note}
                      </span>
                    </div>
                    {p.isExcessive && (
                      <span className="px-1.5 py-0.5 rounded-sm text-[9px] font-mono bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/40 uppercase tracking-wider whitespace-nowrap">
                        Berlebih
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: GAP KEPATUHAN */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666] font-bold block">
                Catatan Temuan Kepatuhan Regulator
              </span>
              <div className="space-y-1">
                {selectedAgent.gaps.map((gap, gIdx) => (
                  <div
                    key={gIdx}
                    className={`p-2 rounded-sm text-[11px] flex items-start gap-2 ${
                      gap.severity === 'bad'
                        ? 'bg-[#180B0B] text-[#F87171] border border-[#F87171]/30'
                        : gap.severity === 'warn'
                        ? 'bg-[#161208] text-[#C5A059] border border-[#C5A059]/30'
                        : 'bg-[#0A160E] text-[#4ADE80] border border-[#4ADE80]/30'
                    }`}
                  >
                    <span className="font-mono font-bold mt-0.5">
                      {gap.severity === 'bad' ? '✕' : gap.severity === 'warn' ? '!' : '✓'}
                    </span>
                    <span className="leading-snug font-sans">{gap.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: ACTIONS */}
            <div className="pt-3 border-t border-[#1A1A1A] space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => onRotateKey(selectedAgent.id)}
                  className={`px-3 py-2.5 rounded-sm bg-[#161616] hover:bg-[#202020] active:bg-[#282828] text-[#D1D1D1] hover:text-white border border-[#222] text-xs font-medium flex items-center justify-center gap-1.5 transition tracking-wider uppercase min-h-[42px] ${
                    !selectedAgent.isStanding ? 'sm:col-span-2' : ''
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Rotasi Kredensial</span>
                </button>

                {selectedAgent.isStanding && (
                  <button
                    onClick={() => onConvertToJit(selectedAgent.id)}
                    className="px-3 py-2.5 rounded-sm bg-[#C5A059]/15 hover:bg-[#C5A059]/25 active:bg-[#C5A059]/35 text-[#C5A059] border border-[#C5A059]/30 text-xs font-medium flex items-center justify-center gap-1.5 transition tracking-wider uppercase min-h-[42px]"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Migrasi ke JIT (1h)</span>
                  </button>
                )}
              </div>

              {selectedAgent.status === 'stopped' ? (
                <button
                  onClick={() => onRestoreAgent(selectedAgent.id)}
                  className="w-full px-3 py-2.5 rounded-sm bg-[#4ADE80] hover:bg-[#3ec46f] active:bg-[#32ab5d] text-black text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition min-h-[44px]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pulihkan Status Agent (Aktifkan Kembali)</span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenKillSwitchFor(selectedAgent.id)}
                  className="w-full px-3 py-2.5 rounded-sm bg-[#F87171]/15 hover:bg-[#F87171]/25 active:bg-[#F87171]/35 text-[#F87171] border border-[#F87171]/40 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition min-h-[44px]"
                >
                  <ShieldAlert className="w-4 h-4 text-[#F87171]" />
                  <span>Hentikan Darurat Agent Ini (Kill Switch)</span>
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
