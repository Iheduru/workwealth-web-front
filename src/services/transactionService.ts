
// A simple service to manage wallet transactions in the frontend
// In a real app, this would connect to a backend API

// Transaction types
export type TransactionType = "credit" | "debit";

export interface Transaction {
  id: number;
  description: string;
  amount: string;
  type: TransactionType;
  date: string;
  category: string;
}

// Mock data storage - would be replaced by API calls in a production app
let walletBalance = 85750; // Starting balance in kobo (85,750 NGN)
let transactions: Transaction[] = [
  { id: 1, description: "Deposit from Bank", amount: "15,000", type: "credit", date: "Today, 10:24 AM", category: "deposit" },
  { id: 2, description: "Mobile Airtime", amount: "2,000", type: "debit", date: "Yesterday, 6:30 PM", category: "bills" },
  { id: 3, description: "Savings Plan Contribution", amount: "5,000", type: "debit", date: "May 14, 9:15 AM", category: "savings" },
];
let nextId = 4;

// Helper to convert amount string to number
const parseAmount = (amount: string): number => {
  return parseInt(amount.replace(/,/g, ""), 10);
};

// Helper to format number to comma-separated string
const formatAmount = (amount: number): string => {
  return amount.toLocaleString();
};

// Get current wallet balance
export const getWalletBalance = (): string => {
  return formatAmount(walletBalance);
};

// Get recent transactions
export const getRecentTransactions = (limit: number = 3): Transaction[] => {
  return [...transactions].slice(0, limit);
};

// Get all transactions
export const getAllTransactions = (): Transaction[] => {
  return [...transactions];
};

// Add a deposit transaction
export const addDeposit = (amount: number): Transaction => {
  walletBalance += amount;
  
  const newTransaction: Transaction = {
    id: nextId++,
    description: "Deposit to Wallet",
    amount: formatAmount(amount),
    type: "credit",
    date: "Today, " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    category: "deposit"
  };
  
  transactions = [newTransaction, ...transactions];
  return newTransaction;
};

// Add a withdrawal transaction
export const addWithdrawal = (amount: number): Transaction => {
  if (amount > walletBalance) {
    throw new Error("Insufficient funds");
  }
  
  walletBalance -= amount;
  
  const newTransaction: Transaction = {
    id: nextId++,
    description: "Withdrawal from Wallet",
    amount: formatAmount(amount),
    type: "debit",
    date: "Today, " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    category: "withdrawal"
  };
  
  transactions = [newTransaction, ...transactions];
  return newTransaction;
};

// Add a transfer transaction
export const addTransfer = (amount: number, recipient: string): Transaction => {
  if (amount > walletBalance) {
    throw new Error("Insufficient funds");
  }
  
  walletBalance -= amount;
  
  const newTransaction: Transaction = {
    id: nextId++,
    description: `Transfer to ${recipient}`,
    amount: formatAmount(amount),
    type: "debit",
    date: "Today, " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    category: "transfer"
  };
  
  transactions = [newTransaction, ...transactions];
  return newTransaction;
};

// Add a bill payment transaction
export const addBillPayment = (amount: number, description: string): Transaction => {
  if (amount > walletBalance) {
    throw new Error("Insufficient funds");
  }
  
  walletBalance -= amount;
  
  const newTransaction: Transaction = {
    id: nextId++,
    description: description,
    amount: formatAmount(amount),
    type: "debit",
    date: "Today, " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    category: "bills"
  };
  
  transactions = [newTransaction, ...transactions];
  return newTransaction;
};
