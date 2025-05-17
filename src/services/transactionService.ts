
import { v4 as uuid } from 'uuid';

// Transaction types
export type TransactionType = "credit" | "debit";
export type TransactionStatus = "completed" | "pending" | "failed";
export type TransactionCategory = "deposit" | "withdrawal" | "transfer" | "loan" | "savings" | "bills" | "shopping";

export interface Transaction {
  id: string;
  amount: string;
  date: string;
  type: TransactionType;
  description: string;
  status: TransactionStatus;
  reference?: string;
  recipient?: string;
  sender?: string;
  category?: TransactionCategory;
}

// In-memory wallet and transactions
let walletBalance = "125,000";
let transactions: Transaction[] = [
  {
    id: uuid(),
    amount: "25,000",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toLocaleString(),
    type: "credit",
    description: "Deposit from Bank",
    status: "completed",
    reference: "DEP" + Math.random().toString().slice(2, 10),
    sender: "Access Bank ****1234",
    category: "deposit"
  },
  {
    id: uuid(),
    amount: "15,000",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toLocaleString(),
    type: "debit",
    description: "Transfer to Abayomi",
    status: "completed",
    reference: "TRF" + Math.random().toString().slice(2, 10),
    recipient: "Abayomi ****5678",
    category: "transfer"
  },
  {
    id: uuid(),
    amount: "5,000",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toLocaleString(),
    type: "debit",
    description: "MTN Airtime Purchase",
    status: "completed",
    reference: "AIR" + Math.random().toString().slice(2, 10),
    recipient: "MTN (080****1234)",
    category: "bills"
  },
  {
    id: uuid(),
    amount: "50,000",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toLocaleString(),
    type: "credit",
    description: "Loan Disbursement",
    status: "completed",
    reference: "LNP" + Math.random().toString().slice(2, 10),
    sender: "WorkWealth Loans",
    category: "loan"
  },
  {
    id: uuid(),
    amount: "2,500",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toLocaleString(),
    type: "debit",
    description: "DSTV Subscription",
    status: "completed",
    reference: "BIL" + Math.random().toString().slice(2, 10),
    recipient: "DSTV Nigeria",
    category: "bills"
  },
];

// Get wallet balance
export const getWalletBalance = (): string => {
  return walletBalance;
};

// Get recent transactions
export const getRecentTransactions = (): Transaction[] => {
  return [...transactions];
};

// Get all transactions - new function
export const getAllTransactions = (): Transaction[] => {
  return [...transactions];
};

// Update wallet balance
const updateWalletBalance = (amount: number, isCredit: boolean): string => {
  // Convert string with commas to number
  const currentBalance = parseFloat(walletBalance.replace(/,/g, ""));
  
  // Calculate new balance
  const newBalance = isCredit
    ? currentBalance + amount
    : currentBalance - amount;
  
  // Format with commas and update
  walletBalance = newBalance.toLocaleString();
  
  return walletBalance;
};

// Add a deposit transaction
export const addDeposit = (amount: number): Transaction => {
  // Update balance
  updateWalletBalance(amount, true);
  
  // Create transaction
  const transaction: Transaction = {
    id: uuid(),
    amount: amount.toLocaleString(),
    date: new Date().toLocaleString(),
    type: "credit",
    description: "Wallet Deposit",
    status: "completed",
    reference: "DEP" + Math.random().toString().slice(2, 10),
    sender: "Bank Transfer",
    category: "deposit"
  };
  
  // Add to transactions
  transactions = [transaction, ...transactions];
  
  return transaction;
};

// Add a withdrawal transaction
export const addWithdrawal = (amount: number): Transaction => {
  // Check if enough balance
  const currentBalance = parseFloat(walletBalance.replace(/,/g, ""));
  if (currentBalance < amount) {
    throw new Error("Insufficient balance");
  }
  
  // Update balance
  updateWalletBalance(amount, false);
  
  // Create transaction
  const transaction: Transaction = {
    id: uuid(),
    amount: amount.toLocaleString(),
    date: new Date().toLocaleString(),
    type: "debit",
    description: "Wallet Withdrawal",
    status: "completed",
    reference: "WTH" + Math.random().toString().slice(2, 10),
    recipient: "Bank Account",
    category: "withdrawal"
  };
  
  // Add to transactions
  transactions = [transaction, ...transactions];
  
  return transaction;
};

// Add a transfer transaction
export const addTransfer = (amount: number, recipient: string): Transaction => {
  // Check if enough balance
  const currentBalance = parseFloat(walletBalance.replace(/,/g, ""));
  if (currentBalance < amount) {
    throw new Error("Insufficient balance");
  }
  
  // Update balance
  updateWalletBalance(amount, false);
  
  // Create transaction
  const transaction: Transaction = {
    id: uuid(),
    amount: amount.toLocaleString(),
    date: new Date().toLocaleString(),
    type: "debit",
    description: `Transfer to ${recipient}`,
    status: "completed",
    reference: "TRF" + Math.random().toString().slice(2, 10),
    recipient: recipient,
    category: "transfer"
  };
  
  // Add to transactions
  transactions = [transaction, ...transactions];
  
  return transaction;
};

// Add a bill payment transaction
export const addBillPayment = (amount: number, description: string): Transaction => {
  // Check if enough balance
  const currentBalance = parseFloat(walletBalance.replace(/,/g, ""));
  if (currentBalance < amount) {
    throw new Error("Insufficient balance");
  }
  
  // Update balance
  updateWalletBalance(amount, false);
  
  // Create transaction
  const transaction: Transaction = {
    id: uuid(),
    amount: amount.toLocaleString(),
    date: new Date().toLocaleString(),
    type: "debit",
    description,
    status: "completed",
    reference: "BIL" + Math.random().toString().slice(2, 10),
    recipient: description.split(" ")[0],
    category: "bills"
  };
  
  // Add to transactions
  transactions = [transaction, ...transactions];
  
  return transaction;
};
