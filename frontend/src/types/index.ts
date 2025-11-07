export interface TimeStampedModel {
  created_at: string;
  updated_at: string;
}

export interface Company extends TimeStampedModel {
  id: string;
  title: string;
  tax_number: string;
  email: string;
  iban: string;
  description: string;
  is_active: boolean;
  metadata?: Record<string, any>;
  brand_count: number;
  total_branches: number;
  total_people: number;
}

export interface Brand extends TimeStampedModel {
  id: string;
  name: string;
  tax_number: string;
  phone: string;
  email: string;
  branch_count: number;
  company: Company | string; // Can be nested object or ID
  company_name?: string; // For display purposes
  metadata?: Record<string, any>;
}

export interface Branch extends TimeStampedModel {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  sgk_number: string;
  brand: Brand | string; // Can be nested object or ID
  brand_name?: string; // For display purposes
  company_name?: string; // For display purposes
  metadata?: Record<string, any>;
  employee_count: number;
}

export interface Role extends TimeStampedModel {
  id: string;
  name: string;
  display_name: string;
  permissions?: Record<string, any>;
  description?: string;
}

export interface Person extends TimeStampedModel {
  id: string;
  full_name: string;
  national_id: string;
  address: string;
  phone: string;
  email: string;
  iban: string;
  description: string;
  role: Role | string; // Can be nested object or ID
  role_name?: string; // For display purposes
  branch: Branch | string; // Can be nested object or ID
  is_active: boolean;
  masked_national_id?: string;
  masked_iban?: string;
}

export interface Report extends TimeStampedModel {
  id: string;
  title: string;
  content?: string;
  file?: string;
  report_type: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  scope: 'company' | 'brand' | 'branch' | 'person';
  report_date: string;
  company?: Company | string | null;
  brand?: Brand | string | null;
  branch?: Branch | string | null;
  person?: Person | string | null;
  tags?: string[];
  metadata?: Record<string, any>;
  created_by?: any; // User object or ID
}

export interface Contract extends TimeStampedModel {
  id: string;
  title: string;
  contract_number: string;
  template_name?: string;
  file: string;
  related_company?: Company | string | null;
  related_brand?: Brand | string | null;
  related_branch?: Branch | string | null;
  related_person?: Person | string | null;
  start_date: string;
  end_date?: string | null;
  status: 'draft' | 'active' | 'expired' | 'terminated';
  status_display?: string; // For display purposes
  related_entity?: string; // For display purposes
  versioning?: Record<string, any>;
  created_by?: any; // User object or ID
  is_active?: boolean;
}

export interface PromissoryNote extends TimeStampedModel {
  id: string;
  title: string;
  note_number: string;
  file?: string;
  amount: number;
  due_date: string;
  payment_status: 'pending' | 'paid' | 'overdue';
  related_company?: Company | string | null;
  related_brand?: Brand | string | null;
  related_branch?: Branch | string | null;
  related_person?: Person | string | null;
  metadata?: Record<string, any>;
  created_by?: any; // User object or ID
}

export interface FinancialRecord extends TimeStampedModel {
  id: string;
  title: string;
  type: 'income' | 'expense' | 'turnover' | 'profit_share';
  amount: number;
  currency: 'TRY' | 'USD' | 'EUR' | 'GBP';
  date: string;
  description?: string;
  related_company?: Company | string | null;
  related_brand?: Brand | string | null;
  related_branch?: Branch | string | null;
  related_person?: Person | string | null;
  attachments?: string;
  metadata?: Record<string, any>;
  created_by?: any; // User object or ID
  type_display?: string;
}

export interface DashboardStats {
  companies_count: number;
  brands_count: number;
  branches_count: number;
  people_count: number;
  reports_count: number;
  totalContracts: number;
  overdue_notes: PromissoryNote[];
  financial_records_count: number;
  totalIncome: number;
  totalExpense: number;
  totalProfit: number;
}
