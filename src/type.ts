export type BillingCycle = 'weekly' | 'monthly' | 'yearly';

export type Category =
  | 'Streaming'
  | 'Software/SaaS'
  | 'Fitness'
  | 'Gaming'
  | 'News/Media'
  | 'Other';

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  billingCycle: BillingCycle;
  category: Category;
  nextRenewalDate: string;
  startDate: string;
  isRarelyUsed: boolean;
}

export interface Stats {
  totalMonthlySpend: number;
  totalYearlySpend: number;
  spendByCategory: { category: string; total: number }[];
  upcomingRenewals: Subscription[];
  potentialSavings: number;
}