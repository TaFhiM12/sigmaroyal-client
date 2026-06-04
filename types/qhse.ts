export interface QhsePolicy {
  id: string;
  key: string;
  pageTitle: string;
  breadcrumbLabel: string;
  sectionTitle: string;
  heroImageUrl: string;
  policyStatement: string;
  bulletPoints: string[];
  analysisStatement: string;
  goldenRulesTitle: string;
  goldenRules: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QhsePolicyResponse {
  success: boolean;
  message: string;
  data: QhsePolicy;
}
