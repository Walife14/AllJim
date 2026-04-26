export type TransactionType = 'management' | 'kiosk' | 'direct_debit' | 'api';

export type PaymentMethod = 'cash' | 'card' | 'external_card' | 'none' | 'other';

export type MembershipUnit = 'days' | 'weeks' | 'months' | 'years';

type EntryPoint = 'management_portal' | 'kiosk_tablet'

export interface MembershipReceipt {
  gym_id: string;
  membership_id: string;
  // Optional because DB handles it with DEFAULT auth.uid()
  performed_by?: string; 
  
  amount_added: number;
  unit: MembershipUnit;
  
  // optional as it defaults to 0.00 and 'GBP'
  amount_paid?: number;
  currency?: string; // e.g., 'GBP'
  
  transaction_type: TransactionType;
  payment_method: PaymentMethod;
  
  notes?: string;
  
  // Storing the "Before & After" logic makes fact-checking 10x easier
  metadata: {
    staff_name: string;
    entry_point: EntryPoint;
    old_expiry?: string;
    new_expiry?: string;
    [key: string]: any; 
  };
}