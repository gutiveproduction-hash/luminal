import React, { useState, useEffect } from 'react';
import {
  INITIAL_AGENTS,
  INITIAL_POLICIES,
  INITIAL_APPROVALS,
  INITIAL_ALERTS,
  DETECTION_RULES,
  OBLIGATION_GROUPS,
  INITIAL_EVIDENCE_SECTIONS,
  INITIAL_INTEGRATIONS,
} from './data/mockData';
import {
  ActiveTab,
  Agent,
  Policy,
  RuntimeEvent,
  ApprovalRequest,
  SecurityAlert,
  DetectionRule,
  ObligationGroup,
  EvidenceSection,
  Integration,
} from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CommandPalette } from './components/CommandPalette';
import { KillSwitchModal } from './components/KillSwitchModal';
import { ToastContainer, ToastMessage } from './components/Toast';

import { OverviewView } from './components/views/OverviewView';
import { RegistryView } from './components/views/RegistryView';
import { RuntimeView } from './components/views/RuntimeView';
import { PolicyView } from './components/views/PolicyView';
import { DetectionView } from './components/views/DetectionView';
import { EvidenceView } from './components/views/EvidenceView';
import { IntegrationsView } from './components/views/IntegrationsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(INITIAL_AGENTS[0].id);
  const [policies, setPolicies] = useState<Policy[]>(INITIAL_POLICIES);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(INITIAL_APPROVALS);
  const [alerts, setAlerts] = useState<SecurityAlert[]>(INITIAL_ALERTS);
  const [rules, setRules] = useState<DetectionRule[]>(DETECTION_RULES);
  const [obligations] = useState<ObligationGroup[]>(OBLIGATION_GROUPS);
  const [evidenceSections, setEvidenceSections] = useState<EvidenceSection[]>(INITIAL_EVIDENCE_SECTIONS);
  const [integrations] = useState<Integration[]>(INITIAL_INTEGRATIONS);

  // Modals & Triggers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isKillSwitchOpen, setIsKillSwitchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'warning' | 'info', title: string, description: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initial Runtime Events Seed
  const [events, setEvents] = useState<RuntimeEvent[]>([
    {
      id: 'EVT-1001',
      timestamp: '10:26:14',
      agentId: 'AGT-001',
      agentName: 'Skoring Kredit Otomatis',
      action: 'scoring.model:invoke',
      policyId: 'POL-04',
      decision: 'ALLOW',
      reason: 'Invocations ke model inferensi XGBoost risiko diizinkan.',
    },
    {
      id: 'EVT-1002',
      timestamp: '10:25:58',
      agentId: 'AGT-002',
      agentName: 'Asisten Penagihan WhatsApp',
      action: 'pesan.keluar:send',
      policyId: 'POL-06',
      decision: 'ALLOW',
      reason: 'Waktu eksekusi 10:25 WIB berada dalam jam etis 08:00 - 20:00 WIB.',
    },
    {
      id: 'EVT-1003',
      timestamp: '10:25:21',
      agentId: 'AGT-005',
      agentName: 'Deteksi Fraud Lintas Transaksi',
      action: 'core.nasabah:read',
      policyId: 'POL-02',
      decision: 'DENY',
      reason: 'Akses multi-rekening ditolak karena di luar konteks transaksi nasabah aktif.',
    },
    {
      id: 'EVT-1004',
      timestamp: '10:24:45',
      agentId: 'AGT-001',
      agentName: 'Skoring Kredit Otomatis',
      action: 'refund:execute',
      policyId: 'POL-01',
      decision: 'STEP_UP',
      reason: 'Nominal Rp 4.750.000 melampaui batas otomatis Rp 2.000.000.',
    },
    {
      id: 'EVT-1005',
      timestamp: '10:24:02',
      agentId: 'AGT-004',
      agentName: 'Chatbot Layanan Nasabah',
      action: 'pengetahuan:read',
      policyId: 'POL-02',
      decision: 'ALLOW',
      reason: 'Membaca repositori FAQ publik tanpa muatan data pribadi.',
    },
    {
      id: 'EVT-1006',
      timestamp: '10:23:19',
      agentId: 'AGT-006',
      agentName: 'Rekonsiliasi Pembayaran',
      action: 'ledger:read',
      policyId: 'POL-04',
      decision: 'ALLOW',
      reason: 'Batch job validasi mutasi settlement bank mitra.',
    },
    {
      id: 'EVT-1007',
      timestamp: '10:22:38',
      agentId: 'AGT-003',
      agentName: 'Verifikasi Dokumen & OCR KTP',
      action: 'dokumen.kyc:write',
      policyId: 'POL-05',
      decision: 'ALLOW',
      reason: 'Penyimpanan hasil ekstraksi e-KTP ke basis data KYC terenkripsi.',
    },
    {
      id: 'EVT-1008',
      timestamp: '10:21:40',
      agentId: 'AGT-007',
      agentName: 'Asisten Analis (Shadow)',
      action: 'payload:egress',
      policyId: 'POL-05',
      decision: 'QUARANTINE',
      reason: 'Eksfiltrasi data NIK nasabah ke LLM publik di luar whitelist cloud bank.',
    },
  ]);

  const [isStreaming, setIsStreaming] = useState(true);

  // Runtime Stream Simulator
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const activePool = agents.filter((a) => a.status === 'active');
      if (activePool.length === 0) return;

      const randomAgent = activePool[Math.floor(Math.random() * activePool.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const poolActions = [
        { action: 'scoring.model:invoke', policyId: 'POL-04', decision: 'ALLOW' as const, reason: 'Evaluasi model risiko kredit berjalan normal.' },
        { action: 'pesan.keluar:send', policyId: 'POL-06', decision: 'ALLOW' as const, reason: 'Pengiriman reminder angsuran diizinkan dalam jam kerja.' },
        { action: 'core.nasabah:read', policyId: 'POL-02', decision: Math.random() < 0.25 ? ('DENY' as const) : ('ALLOW' as const), reason: 'Pemeriksaan filter konteks pengajuan aktif.' },
        { action: 'pengetahuan:read', policyId: 'POL-02', decision: 'ALLOW' as const, reason: 'Akses repositori SOP & FAQ.' },
        { action: 'refund:execute', policyId: 'POL-01', decision: Math.random() < 0.35 ? ('STEP_UP' as const) : ('ALLOW' as const), reason: 'Pengecekan batasan nominal pengembalian dana.' },
      ];

      const sample = poolActions[Math.floor(Math.random() * poolActions.length)];

      const newEvt: RuntimeEvent = {
        id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: timeStr,
        agentId: randomAgent.id,
        agentName: randomAgent.name,
        action: sample.action,
        policyId: sample.policyId,
        decision: sample.decision,
        reason: sample.reason,
        isNew: true,
      };

      setEvents((prev) => [newEvt, ...prev.slice(0, 45)]);
    }, 3800);

    return () => clearInterval(interval);
  }, [isStreaming, agents]);

  // Handlers
  const handleRotateKey = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId
          ? {
              ...a,
              lastRotated: 'Baru saja',
              credDetail: `${a.credDetail} · Rotasi Kriptografis Sukses`,
            }
          : a
      )
    );
    addToast(
      'success',
      'Rotasi Kredensial Berhasil',
      `Kunci rahasia untuk ${agentId} telah dirotasi secara otomatis. Kredensial lama dinonaktifkan dalam 10 menit.`
    );
  };

  const handleConvertToJit = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId
          ? {
              ...a,
              isStanding: false,
              ttl: '1 jam (Ephemeral)',
              credType: 'Identitas JIT Terkelola',
              riskScore: Math.max(15, a.riskScore - 30),
            }
          : a
      )
    );
    addToast(
      'success',
      'Migrasi ke Akses JIT Selesai',
      `Identitas ${agentId} dialihkan ke token sesaat (Just-in-time) 1 jam. Hak istimewa permanen dicabut.`
    );
  };

  const handleConfirmHalt = (agentId: string, reason: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId
          ? {
              ...a,
              status: 'stopped',
            }
          : a
      )
    );

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    setEvents((prev) => [
      {
        id: `EVT-HALT-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: timeStr,
        agentId,
        agentName: agents.find((a) => a.id === agentId)?.name || agentId,
        action: 'EMERGENCY:KILL_SWITCH',
        policyId: 'CRIT-HALT',
        decision: 'DENY',
        reason: `Penghentian Darurat Diaktifkan: ${reason}`,
        isNew: true,
      },
      ...prev,
    ]);

    addToast(
      'warning',
      `Penghentian Darurat: ${agentId} Dihentikan`,
      `Seluruh token aktif dicabut. Permintaan berikutnya ditolak seketika. Dicatat ke berkas insiden OJK.`
    );
  };

  const handleRestoreAgent = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId
          ? {
              ...a,
              status: 'active',
            }
          : a
      )
    );
    addToast(
      'info',
      `Status Agent Dipulihkan`,
      `Agent ${agentId} telah diaktifkan kembali ke lingkungan produksi setelah verifikasi mitigasi.`
    );
  };

  const handleApprove = (id: string) => {
    const target = approvals.find((a) => a.id === id);
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    if (target) {
      addToast(
        'success',
        'Persetujuan Diberikan',
        `Permintaan ${target.action} oleh ${target.agentName} disahkan oleh Kepala Kepatuhan.`
      );
    }
  };

  const handleReject = (id: string) => {
    const target = approvals.find((a) => a.id === id);
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    if (target) {
      addToast(
        'warning',
        'Permintaan Ditolak',
        `Permintaan ${target.action} oleh ${target.agentName} ditolak sesuai kebijakan pembatasan risiko.`
      );
    }
  };

  const handleTogglePolicyMode = (policyId: string) => {
    setPolicies((prev) =>
      prev.map((p) => {
        if (p.id === policyId) {
          const newMode = p.mode === 'enforce' ? 'monitor' : 'enforce';
          addToast(
            'info',
            `Mode Kebijakan ${p.id} Diperbarui`,
            `Kebijakan '${p.name}' beralih ke mode ${newMode === 'enforce' ? 'Tegakkan (Enforce)' : 'Pantau (Audit-Only)'}.`
          );
          return { ...p, mode: newMode };
        }
        return p;
      })
    );
  };

  const handleToggleEvidenceSection = (secId: string) => {
    setEvidenceSections((prev) =>
      prev.map((s) => (s.id === secId ? { ...s, selected: !s.selected } : s))
    );
  };

  const handleSimulateEvent = () => {
    const activePool = agents.filter((a) => a.status === 'active');
    if (activePool.length === 0) {
      addToast(
        'warning',
        'Tidak Ada Agent Aktif',
        'Tidak dapat menjalankan simulasi karena tidak ada agent berstatus aktif.'
      );
      return;
    }
    const randomAgent = activePool[Math.floor(Math.random() * activePool.length)];
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newEvt: RuntimeEvent = {
      id: `EVT-SIM-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: timeStr,
      agentId: randomAgent.id,
      agentName: randomAgent.name,
      action: 'core.nasabah:read (Simulasi Uji)',
      policyId: 'POL-02',
      decision: 'ALLOW',
      reason: 'Simulasi pengujian interceptor runtime: lolos validasi tenant isolation.',
      isNew: true,
    };

    setEvents((prev) => [newEvt, ...prev]);
    addToast(
      'info',
      'Uji Coba Transaksi Runtime Dikirim',
      `Permintaan simulasi dari ${randomAgent.name} dievaluasi seketika oleh GARDA Enforcer.`
    );
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#D1D1D1] flex flex-col font-sans">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          openAlertsCount={alerts.length}
          unresolvedApprovalsCount={approvals.length}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenKillSwitch={() => setIsKillSwitchOpen(true)}
            pendingApprovalsCount={approvals.length}
            onNavigateToApprovals={() => setActiveTab('runtime')}
            onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
            theme={theme}
            onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          />

          {/* Body Content by Active Tab */}
          <main className="flex-1 p-3.5 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
            {activeTab === 'overview' && (
              <OverviewView
                agents={agents}
                recentEvents={events}
                pendingApprovals={approvals}
                alerts={alerts}
                onNavigate={setActiveTab}
                onSelectAgent={(id) => {
                  setSelectedAgentId(id);
                  setActiveTab('registry');
                }}
                onApprove={handleApprove}
                onReject={handleReject}
                onOpenKillSwitch={() => setIsKillSwitchOpen(true)}
              />
            )}

            {activeTab === 'registry' && (
              <RegistryView
                agents={agents}
                selectedAgentId={selectedAgentId}
                onSelectAgent={setSelectedAgentId}
                onRotateKey={handleRotateKey}
                onConvertToJit={handleConvertToJit}
                onOpenKillSwitchFor={(id) => {
                  setSelectedAgentId(id);
                  setIsKillSwitchOpen(true);
                }}
                onRestoreAgent={handleRestoreAgent}
              />
            )}

            {activeTab === 'runtime' && (
              <RuntimeView
                events={events}
                isStreaming={isStreaming}
                onToggleStreaming={() => setIsStreaming((prev) => !prev)}
                onSimulateEvent={handleSimulateEvent}
                approvals={approvals}
                onApprove={handleApprove}
                onReject={handleReject}
                agents={agents}
                onOpenKillSwitch={() => setIsKillSwitchOpen(true)}
              />
            )}

            {activeTab === 'policies' && (
              <PolicyView
                policies={policies}
                onTogglePolicyMode={handleTogglePolicyMode}
              />
            )}

            {activeTab === 'detection' && (
              <DetectionView
                alerts={alerts}
                rules={rules}
                onQuarantineAgent={(agentId) => {
                  handleConfirmHalt(agentId, 'Karantina Otomatis Deteksi Anomali');
                }}
                onNavigateToEvidence={() => setActiveTab('evidence')}
              />
            )}

            {activeTab === 'evidence' && (
              <EvidenceView
                obligations={obligations}
                evidenceSections={evidenceSections}
                onToggleSection={handleToggleEvidenceSection}
              />
            )}

            {activeTab === 'integrations' && (
              <IntegrationsView integrations={integrations} />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Handphone) */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        unresolvedApprovalsCount={approvals.length}
        openAlertsCount={alerts.filter((a) => a.status === 'open').length}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onToggle={() => setIsSearchOpen((prev) => !prev)}
        agents={agents}
        policies={policies}
        onSelectAgent={(agentId) => {
          setSelectedAgentId(agentId);
          setActiveTab('registry');
        }}
        onSelectTab={setActiveTab}
        onOpenKillSwitch={() => setIsKillSwitchOpen(true)}
      />

      {/* Emergency Kill Switch Modal */}
      <KillSwitchModal
        isOpen={isKillSwitchOpen}
        onClose={() => setIsKillSwitchOpen(false)}
        agents={agents}
        selectedAgentId={selectedAgentId}
        onConfirmHalt={handleConfirmHalt}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
