import React from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  Activity,
  ScrollText,
  AlertTriangle,
  FileCheck2,
  Network,
  Server,
  X,
} from 'lucide-react';
import { LuminalLogo } from './LuminalLogo';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  openAlertsCount: number;
  unresolvedApprovalsCount: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  openAlertsCount,
  unresolvedApprovalsCount,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navGroups = [
    {
      label: 'Utama',
      items: [
        {
          id: 'overview' as ActiveTab,
          label: 'Ikhtisar Postur',
          icon: LayoutDashboard,
          badge: null,
        },
      ],
    },
    {
      label: 'Temukan (Discovery)',
      items: [
        {
          id: 'registry' as ActiveTab,
          label: 'Registri & Topologi',
          icon: ShieldCheck,
          badge: '9',
          badgeColor: 'bg-[#141414] text-[#888] border border-[#222]',
        },
      ],
    },
    {
      label: 'Kendalikan (Runtime)',
      items: [
        {
          id: 'runtime' as ActiveTab,
          label: 'Otorisasi Runtime',
          icon: Activity,
          badge: unresolvedApprovalsCount > 0 ? `${unresolvedApprovalsCount} antre` : 'Live',
          badgeColor: unresolvedApprovalsCount > 0 ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40' : 'bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30',
        },
        {
          id: 'policies' as ActiveTab,
          label: 'Studio Kebijakan',
          icon: ScrollText,
          badge: '7 Aktif',
          badgeColor: 'bg-[#141414] text-[#888] border border-[#222]',
        },
        {
          id: 'detection' as ActiveTab,
          label: 'Deteksi & Respons',
          icon: AlertTriangle,
          badge: openAlertsCount > 0 ? `${openAlertsCount} Terbuka` : null,
          badgeColor: 'bg-[#F87171]/20 text-[#F87171] border border-[#F87171]/40 font-semibold',
        },
      ],
    },
    {
      label: 'Tata Kelola (Audit & Proof)',
      items: [
        {
          id: 'evidence' as ActiveTab,
          label: 'Kewajiban & Bukti',
          icon: FileCheck2,
          badge: 'PADK / PDP',
          badgeColor: 'bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30',
        },
        {
          id: 'integrations' as ActiveTab,
          label: 'Titik Penegakan',
          icon: Network,
          badge: '8 Sistem',
          badgeColor: 'bg-[#141414] text-[#888] border border-[#222]',
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 lg:w-64 flex flex-col justify-between bg-[#090909] border-r border-[#1A1A1A] transition-transform duration-200 ease-in-out shadow-2xl lg:shadow-none ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Brand */}
        <div>
          <div className="p-4 sm:p-5 border-b border-[#1A1A1A] flex items-center justify-between">
            <LuminalLogo size="md" />
            {/* Dedicated Close Button for Mobile Screens */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-sm text-[#888] hover:text-white hover:bg-[#141414] active:bg-[#1A1A1A] transition min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Groups */}
          <nav className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-13rem)]">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 text-[11px] font-sans uppercase tracking-wider text-[#666] font-semibold mb-1.5">
                  {group.label}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectTab(item.id);
                          onCloseMobile();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 sm:py-2 rounded-sm text-xs font-medium transition-all group min-h-[42px] font-sans ${
                          isActive
                            ? 'bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 font-semibold shadow-[0_0_15px_rgba(197,160,89,0.1)]'
                            : 'text-[#888] hover:text-[#D1D1D1] hover:bg-[#121212] border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 transition-colors ${
                              isActive
                                ? 'text-[#C5A059]'
                                : 'text-[#666] group-hover:text-[#D1D1D1]'
                            }`}
                          />
                          <span className="tracking-wide text-left">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-sm text-[10px] font-sans font-medium leading-none ${
                              item.badgeColor || 'bg-[#141414] text-[#888]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Environment & Health Card */}
        <div className="p-3 border-t border-[#1A1A1A] bg-[#090909]">
          <div className="p-3 rounded-sm bg-[#0C0C0C] border border-[#1A1A1A] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#888] font-semibold">
                LINGKUNGAN
              </span>
              <span className="flex items-center gap-1.5 text-xs font-sans text-[#4ADE80] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse"></span>
                id-jkt-1
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#D1D1D1]">
              <div className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-sans text-xs text-[#D1D1D1]">Enforcer Cluster</span>
              </div>
              <span className="font-sans text-xs text-[#888]">99.99% Up</span>
            </div>

            <div className="pt-1.5 border-t border-[#1A1A1A] flex items-center justify-between text-xs font-sans text-[#888]">
              <span>Latency Otorisasi</span>
              <span className="text-[#4ADE80] font-semibold font-sans">1.8 ms</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
