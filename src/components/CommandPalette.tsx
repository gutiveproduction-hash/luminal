import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShieldAlert,
  ShieldCheck,
  ScrollText,
  FileCheck2,
  Activity,
  AlertTriangle,
  ArrowRight,
  X,
} from 'lucide-react';
import { Agent, Policy, ActiveTab } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  agents: Agent[];
  policies: Policy[];
  onSelectAgent: (agentId: string) => void;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenKillSwitch: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  agents,
  policies,
  onSelectAgent,
  onSelectTab,
  onOpenKillSwitch,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.id.toLowerCase().includes(query.toLowerCase()) ||
      a.system.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPolicies = policies.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-3 sm:px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] flex flex-col bg-[#0C0C0C] border border-[#222] rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-3.5 sm:px-4 py-3 sm:py-3.5 border-b border-[#1A1A1A] bg-[#0E0E0E] shrink-0">
          <Search className="w-4 sm:w-5 h-4 sm:h-5 text-[#C5A059] mr-2.5 sm:mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari agent, kebijakan, atau tindakan..."
            className="w-full bg-transparent border-none text-white placeholder:text-[#555] text-xs sm:text-sm focus:outline-none tracking-wide"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#666] hover:text-white hover:bg-[#1A1A1A] min-h-[36px] min-w-[36px] flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4 font-sans">
          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1 text-[11px] font-sans text-[#888] uppercase tracking-wider font-semibold">
              Aksi Cepat
            </div>
            <div className="space-y-0.5 mt-1">
              <button
                onClick={() => {
                  onOpenKillSwitch();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs hover:bg-[#F87171]/10 text-[#F87171] transition group border border-transparent hover:border-[#F87171]/30 gap-2 text-left font-sans"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <ShieldAlert className="w-4 h-4 text-[#F87171] shrink-0" />
                  <span className="font-medium truncate">Buka Penghentian Darurat (Emergency Kill Switch)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition shrink-0" />
              </button>

              <button
                onClick={() => {
                  onSelectTab('evidence');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs hover:bg-[#C5A059]/10 text-[#C5A059] transition group border border-transparent hover:border-[#C5A059]/30 gap-2 text-left font-sans"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <FileCheck2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="truncate font-medium">Susun Paket Bukti Kepatuhan Regulator Baru</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition shrink-0" />
              </button>

              <button
                onClick={() => {
                  onSelectTab('runtime');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs hover:bg-[#141414] text-[#D1D1D1] transition group border border-transparent hover:border-[#222] gap-2 text-left font-sans"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <Activity className="w-4 h-4 text-[#4ADE80] shrink-0" />
                  <span className="truncate font-medium">Pantau Aliran Otorisasi Runtime Langsung</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition shrink-0" />
              </button>
            </div>
          </div>

          {/* Agents */}
          {filteredAgents.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-sans text-[#888] uppercase tracking-wider font-semibold">
                Identitas Agent ({filteredAgents.length})
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredAgents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => {
                      onSelectTab('registry');
                      onSelectAgent(agent.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs hover:bg-[#141414] text-[#D1D1D1] transition group border border-transparent hover:border-[#222] gap-2 text-left font-sans"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-white block truncate">{agent.name}</span>
                        <span className="text-[11px] text-[#888] font-sans block truncate">
                          {agent.id} · {agent.system}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      {agent.isShadow && (
                        <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-sans font-medium bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/40">
                          Bayangan
                        </span>
                      )}
                      <span className="text-[11px] font-sans text-[#888]">
                        Skor: {agent.riskScore}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#C5A059] transition hidden sm:block" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Policies */}
          {filteredPolicies.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-sans text-[#888] uppercase tracking-wider font-semibold">
                Kebijakan Penegakan ({filteredPolicies.length})
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredPolicies.map((pol) => (
                  <button
                    key={pol.id}
                    onClick={() => {
                      onSelectTab('policies');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs hover:bg-[#141414] text-[#D1D1D1] transition group border border-transparent hover:border-[#222] gap-2 text-left font-sans"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <ScrollText className="w-4 h-4 text-[#4ADE80] shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-white block truncate">{pol.name}</span>
                        <span className="text-[11px] text-[#888] font-sans block truncate">
                          {pol.id} · {pol.category}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-1.5 py-0.5 rounded-sm text-[10px] font-sans font-medium shrink-0 ${
                        pol.mode === 'enforce'
                          ? 'bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30'
                          : 'bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30'
                      }`}
                    >
                      {pol.mode === 'enforce' ? 'Tegakkan' : 'Pantau'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#090909] border-t border-[#1A1A1A] flex items-center justify-between text-xs font-sans text-[#888]">
          <span>Tekan ESC untuk menutup</span>
          <span className="tracking-wider uppercase font-medium">LUMINAL Engine 2.4</span>
        </div>
      </div>
    </div>
  );
};
