import React from 'react';
import {
  Search,
  ShieldAlert,
  Clock,
  Menu,
} from 'lucide-react';
import { LuminalLogo } from './LuminalLogo';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenKillSwitch: () => void;
  pendingApprovalsCount: number;
  onNavigateToApprovals: () => void;
  onToggleMobileMenu: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenKillSwitch,
  pendingApprovalsCount,
  onNavigateToApprovals,
  onToggleMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0A0A0A]/95 border-b border-[#1A1A1A] px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section: Mobile Menu & Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 -ml-1 rounded-sm text-[#888] hover:text-white hover:bg-[#141414] active:bg-[#1A1A1A] transition shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Buka Menu Navigasi"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo on Mobile & Tablet: Sleek and compact */}
          <div className="lg:hidden flex items-center shrink-0">
            <LuminalLogo size="sm" showText={true} compact={true} />
          </div>

          {/* Context breadcrumb ONLY on Desktop (lg and up) when sidebar is present */}
          <div className="hidden lg:flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-xs text-[#666] font-sans">
              <span className="text-[#4ADE80] font-semibold flex items-center gap-1.5 tracking-wider shrink-0">
                <span className="h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
                LIVE ENFORCING
              </span>
              <span className="text-[#333]">/</span>
              <span className="text-[#888] truncate max-w-[180px] xl:max-w-none">PT Sinar Pendanaan Nusantara</span>
              <span className="px-1.5 py-0.5 rounded-sm text-[10px] bg-[#141414] text-[#C5A059] border border-[#C5A059]/30 uppercase tracking-wider shrink-0 hidden xl:inline-block font-medium">
                LPBBTI Berizin
              </span>
            </div>
            <h1 className="text-xs xl:text-sm font-light text-white tracking-wide mt-0.5 truncate font-sans">
              Konsol Kendali Otorisasi & Kepatuhan Regulator
            </h1>
          </div>
        </div>

        {/* Center: Quick Search Trigger for Desktop */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] text-[#666] hover:text-[#D1D1D1] hover:border-[#C5A059]/40 transition text-xs group shadow-inner font-sans"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Search className="w-3.5 h-3.5 text-[#555] group-hover:text-[#C5A059] transition-colors shrink-0" />
              <span className="tracking-wide truncate text-left">Cari agent, kebijakan, pasal OJK...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-sm bg-[#161616] text-[#888] text-[10px] font-sans font-semibold border border-[#262626] shrink-0">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* Quick Search mobile icon */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] text-[#888] hover:text-white min-h-[36px] min-w-[36px] flex items-center justify-center transition"
            title="Pencarian Cepat"
            aria-label="Pencarian"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Pending Approvals Chip */}
          {pendingApprovalsCount > 0 && (
            <button
              onClick={onNavigateToApprovals}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-sm bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] hover:bg-[#C5A059]/20 text-xs font-sans font-medium transition min-h-[36px]"
              title="Antrean persetujuan bertingkat menunggu tindakan"
            >
              <Clock className="w-3.5 h-3.5 text-[#C5A059] animate-spin shrink-0" style={{ animationDuration: '6s' }} />
              <span className="font-semibold">{pendingApprovalsCount}</span>
              <span className="hidden sm:inline tracking-wider uppercase text-[10px]">Persetujuan</span>
            </button>
          )}

          {/* Emergency Kill Switch Button */}
          <button
            onClick={onOpenKillSwitch}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-sm bg-[#F87171]/10 hover:bg-[#F87171]/20 active:bg-[#F87171]/30 text-[#F87171] border border-[#F87171]/40 text-xs font-medium tracking-wider uppercase transition shadow-[0_0_15px_rgba(248,113,113,0.15)] min-h-[36px]"
            title="Penghentian Darurat Agent"
          >
            <ShieldAlert className="w-4 h-4 text-[#F87171] shrink-0" />
            <span className="hidden sm:inline">Hentikan Darurat</span>
          </button>

          {/* User Account */}
          <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 border-l border-[#1A1A1A]">
            <div className="relative group cursor-pointer">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141414] border border-[#333] group-hover:border-[#C5A059] flex items-center justify-center text-xs font-medium text-[#C5A059] transition-colors shadow-sm">
                RK
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#4ADE80] ring-2 ring-[#0A0A0A]"></span>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-wider text-[#666] leading-tight font-medium">
                Kepala Kepatuhan
              </span>
              <span className="text-xs font-semibold text-[#C5A059] leading-tight">
                RINA KUSUMA
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
