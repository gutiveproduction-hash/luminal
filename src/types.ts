export type AgentStatus = 'active' | 'quarantined' | 'stopped';
export type RiskLevel = 'high' | 'medium' | 'low';
export type DecisionType = 'ALLOW' | 'DENY' | 'STEP_UP' | 'QUARANTINE';

export interface DelegationNode {
  entity: string;
  role: string;
  isBroken: boolean;
  boundaryCrossed?: boolean;
}

export interface PermissionScope {
  scope: string;
  note: string;
  isExcessive?: boolean;
}

export interface ComplianceGap {
  severity: 'bad' | 'warn' | 'good';
  text: string;
}

export interface Agent {
  id: string;
  name: string;
  system: string;
  credType: string;
  credDetail: string;
  isStanding: boolean; // Permanent static credential without expiration
  riskScore: number; // 0 - 100
  status: AgentStatus;
  owner: string;
  ownerDept: string;
  ttl: string;
  lastRotated: string;
  personalDataCategory: string;
  personalDataLevel: RiskLevel;
  dpiaStatus: 'valid' | 'draft' | 'missing' | 'na';
  isShadow: boolean;
  legalBasis: string;
  delegationChain: DelegationNode[];
  permissions: PermissionScope[];
  gaps: ComplianceGap[];
}

export interface Policy {
  id: string;
  name: string;
  mode: 'enforce' | 'monitor';
  description: string;
  ruleExpression: string;
  evaluationsCount: number;
  denialsCount: number;
  category: string;
  enforcedScopes: string[];
}

export interface RuntimeEvent {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  action: string;
  policyId: string;
  decision: DecisionType;
  reason: string;
  isNew?: boolean;
}

export interface ApprovalRequest {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  action: string;
  amount?: string;
  policyTriggered: string;
  rationale: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewer?: string;
}

export interface SecurityAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  ruleId: string;
  agentId?: string;
  timeAgo: string;
  status: 'open' | 'investigating' | 'resolved';
  autoActionTaken?: string;
  tags: string[];
}

export interface DetectionRule {
  id: string;
  title: string;
  signalPattern: string;
  autoResponse: string;
  status: 'active' | 'monitor';
  triggerCount: number;
}

export interface ObligationItem {
  id: string;
  title: string;
  status: 'complete' | 'partial' | 'missing';
  evidenceRatio: string;
  description: string;
  regulationRef: string;
}

export interface ObligationGroup {
  source: string;
  note: string;
  penaltyNote?: string;
  items: ObligationItem[];
}

export interface EvidenceSection {
  id: string;
  title: string;
  description: string;
  metric: string;
  selected: boolean;
  previewDetails: string[];
}

export interface Integration {
  id: string;
  name: string;
  type: 'Enforcement Point' | 'Identity Source' | 'Visibility Only' | 'Discovery';
  status: 'connected' | 'partial' | 'restricted';
  description: string;
  protocol: string;
}

export type ActiveTab =
  | 'overview'
  | 'registry'
  | 'runtime'
  | 'policies'
  | 'detection'
  | 'evidence'
  | 'integrations';
