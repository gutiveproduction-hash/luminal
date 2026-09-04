import React from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Menu,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenMobileMenu: () => void;
  unresolvedApprovalsCount: number;
  openAlertsCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenMobileMenu,
  unresolvedApprovalsCount,
  openAlertsCount,
}) => {
  const isMenuTab = activeTab === 'policies' || activeTab === 'evidence' || activeTab === 'integrations';

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#1A1A1A] px-2 py-1.5 flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.85)]"
      style={{ paddingBottom: 'calc(0.4rem + env(safe-area-inset-bottom, 0px))' }}
      aria-label="Navigasi Bawah Seluler"
    >
      {/* 1. Ikhtisar */}
      <button
        onClick={() => onSelectTab('overview')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-sm min-w-[58px] min-h-[44px] transition-all ${
          activeTab === 'overview'
            ? 'text-[#C5A059]'
            : 'text-[#777] hover:text-[#bbb] active:text-white'
        }`}
      >
        <div className="relative">
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          {activeTab === 'overview' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#C5A059] rounded-full"></span>
          )}
        </div>
        <span className="text-[10px] font-sans font-medium tracking-wide">Ikhtisar</span>
      </button>

      {/* 2. Registri */}
      <button
        onClick={() => onSelectTab('registry')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-sm min-w-[58px] min-h-[44px] transition-all ${
          activeTab === 'registry'
            ? 'text-[#C5A059]'
            : 'text-[#777] hover:text-[#bbb] active:text-white'
        }`}
      >
        <div className="relative">
          <ShieldCheck className="w-4 h-4 mb-0.5" />
          {activeTab === 'registry' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#C5A059] rounded-full"></span>
          )}
        </div>
        <span className="text-[10px] font-sans font-medium tracking-wide">Registri</span>
      </button>

      {/* 3. Runtime */}
      <button
        onClick={() => onSelectTab('runtime')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-sm min-w-[58px] min-h-[44px] transition-all ${
          activeTab === 'runtime'
            ? 'text-[#C5A059]'
            : 'text-[#777] hover:text-[#bbb] active:text-white'
        }`}
      >
        <div className="relative">
          <Activity className="w-4 h-4 mb-0.5" />
          {unresolvedApprovalsCount > 0 ? (
            <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-[#C5A059] text-black text-[9px] font-bold font-sans">
              {unresolvedApprovalsCount}
            </span>
          ) : (
            <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
          )}
          {activeTab === 'runtime' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#C5A059] rounded-full"></span>
          )}
        </div>
        <span className="text-[10px] font-sans font-medium tracking-wide">Runtime</span>
      </button>

      {/* 4. Deteksi */}
      <button
        onClick={() => onSelectTab('detection')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-sm min-w-[58px] min-h-[44px] transition-all ${
          activeTab === 'detection'
            ? 'text-[#F87171]'
            : 'text-[#777] hover:text-[#bbb] active:text-white'
        }`}
      >
        <div className="relative">
          <AlertTriangle className="w-4 h-4 mb-0.5" />
          {openAlertsCount > 0 && (
            <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-[#F87171] text-black text-[9px] font-bold font-sans">
              {openAlertsCount}
            </span>
          )}
          {activeTab === 'detection' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#F87171] rounded-full"></span>
          )}
        </div>
        <span className="text-[10px] font-sans font-medium tracking-wide">Deteksi</span>
      </button>

      {/* 5. Menu Drawer Trigger (Kebijakan, Bukti OJK, Integrasi) */}
      <button
        onClick={onOpenMobileMenu}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-sm min-w-[58px] min-h-[44px] transition-all ${
          isMenuTab
            ? 'text-[#C5A059]'
            : 'text-[#777] hover:text-[#bbb] active:text-white'
        }`}
      >
        <div className="relative">
          <Menu className="w-4 h-4 mb-0.5" />
          {isMenuTab && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#C5A059] rounded-full"></span>
          )}
        </div>
        <span className="text-[10px] font-sans font-medium tracking-wide">Menu</span>
      </button>
    </nav>
  );
};
