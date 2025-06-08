
// types/financeTypes.ts
import React from 'react'; // Import React for icon type

export interface TransactionCategory {
  id: string;
  name: string;
  icon: React.ReactElement<{ className?: string }>;
  type: 'income' | 'expense';
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: string; // YYYY-MM-DD
  title: string;
  categoryId: string;
  description?: string;
  aiSuggestedCategoryId?: string; // For AI suggestion before user confirmation
  userConfirmedCategory?: boolean; // True if user explicitly set/confirmed the category
}

export interface BudgetSetting {
  categoryId: string;
  allocatedAmount: number;
  period: 'monthly'; // Could be expanded later
  aiSuggestedAmount?: number;
  userOverride?: boolean;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  description?: string;
  monthlyContribution?: number;
  // AI Simulation fields
  aiProjectedCompletionDate?: string; // ISO date string
  aiMonthlyContributionNeeded?: number;
  aiScenarios?: { // Text descriptions from AI
    optimistic: string;
    pessimistic: string;
    realistic: string;
  };
}

export type AssetType = 'cash' | 'stocks' | 'real_estate' | 'crypto' | 'vehicle' | 'collectibles' | 'other';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  value: number;
  description?: string;
  // purchaseDate?: string;
  // estimatedGrowthRate?: number; // For advanced tracking
}

export interface Debt {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  minPayment: number;
  interestRate: number; // Annual percentage rate
  dueDate?: string; // Next payment due date
  // strategy?: 'avalanche' | 'snowball' | 'custom';
  // aiRepaymentSuggestion?: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'annually' | 'quarterly' | 'biannually';
  nextPaymentDate?: string; // ISO date string
  category: string; // e.g., streaming, software - can be predefined list or free text
  // renewalReminderEnabled?: boolean;
}

// For Investment Assistant
export type UserRiskProfile = 'محافظه‌کار' | 'متعادل' | 'جسور';

export interface PortfolioAssetAllocation {
  assetClass: string; // e.g., "سهام داخلی", "اوراق قرضه دولتی", "طلا"
  percentage: number; // 0-100
}

export interface SimulatedPortfolio {
  id: string;
  name: string; // User-defined name for this simulated portfolio
  allocations: PortfolioAssetAllocation[];
  userRiskProfileAtCreation?: UserRiskProfile; // Risk profile at the time of this simulation
  aiAnalysisText?: string; // AI's textual analysis of this portfolio
  projectedReturn?: string; // e.g., "۵-۸٪ سالانه" (qualitative)
  riskLevel?: string; // e.g., "متوسط به بالا" (qualitative)
}

// For AI Smart Insights
export interface SmartInsight {
  id: string;
  title: string;
  text: string;
  icon?: React.ReactElement<{ className?: string }>;
  type: 'interplay' | 'life_vision' | 'financial_tip' | 'general_recommendation' | 'budget_alert' | 'investment_education';
  actionLink?: string; 
  actionText?: string;
  onAction?: () => void;
}
```
  </change>
  <change>
    <file>components/pages/FinancePage.tsx</file>
    <description>Implement advanced AI features for Finance Page: AI transaction categorization, AI-driven budgeting, financial goal simulation with AI, investment assistant with risk profiling (educational, with disclaimers), full net worth tracking (assets &amp; debts), subscription management, and AI-generated financial reports. Add new modals and list items for these features.</description>
    <content><![CDATA[
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { 
  WalletIcon as PageIcon, 
  LightbulbIcon as QuoteIcon, 
  HeartIcon, 
  RocketLaunchIcon, 
  ShieldCheckIcon,
  PlusIcon, 
  BookIcon,
  WalletIcon,
  TrashIcon,
  PencilIcon,
  FunnelIcon, 
  SearchIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  ChartPieIcon, 
  TargetIcon,
  InformationCircleIcon, 
  SparklesIconNav as AiSparklesIcon,
  ListBulletIcon, 
  TrendingUpIcon, 
  DocumentTextIcon,
  AcademicCapIcon, 
  ScaleIcon, 
  BuildingOfficeIcon, 
  CalculatorIcon, 
  LightbulbIcon 
} from '../shared/AppIcons'; 
import AISmartLearningSuggestionCard from '../learning/AISmartLearningSuggestionCard';
import { LearningPath, LearningContent, LearningSuggestion } from '../../types/learningTypes';
import { PageName } from '../../App';
import AddTransactionModal from '../finance/AddTransactionModal';
import TransactionListItem from '../finance/TransactionListItem';
import BudgetSetupModal, { BudgetSetting } from '../finance/BudgetSetupModal'; 
import ToastNotification from '../shared/ToastNotification';
import CollapsibleSection from '../shared/CollapsibleSection';
import AddFinancialGoalModal from '../finance/AddFinancialGoalModal'; 
import FinancialGoalCard from '../finance/FinancialGoalCard'; 
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import LoadingSpinner from '../shared/LoadingSpinner'; 

import SavingsOpportunityCard, { SavingsOpportunity } from '../finance/SavingsOpportunityCard';
import AddDebtModal from '../finance/AddDebtModal';
import DebtListItem from './DebtListItem'; 
import AddSubscriptionModal from '../finance/AddSubscriptionModal';
import SubscriptionListItem from './SubscriptionListItem'; 

// Phase 3 Imports
import Disclaimer from '../finance/Disclaimer';
import RiskAssessmentModal from '../finance/RiskAssessmentModal';
import { UserRiskProfile, TransactionCategory, Transaction, FinancialGoal, Asset, Debt, Subscription, AssetType } from '../../types/financeTypes'; 
import PortfolioSimulator from '../finance/PortfolioSimulator'; 
import RetirementPlannerModal from '../finance/RetirementPlannerModal';
import NetWorthTracker from '../finance/NetWorthTracker';
import AddAssetModal from '../finance/AddAssetModal';
import ReportGeneratorModal from '../finance/ReportGeneratorModal';
import AISmartInsightCard, { SmartInsight } from '../finance/AISmartInsightCard';


const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
const FINANCE_TRANSACTIONS_KEY = 'finance_transactions_v1';
const FINANCE_BUDGETS_KEY = 'finance_budgets_v1';
const FINANCE_GOALS_KEY = 'finance_financial_goals_v1';
const FINANCE_ASSETS_KEY = 'finance_assets_v1';
const FINANCE_DEBTS_KEY = 'finance_debts_v1';
const FINANCE_SUBSCRIPTIONS_KEY = 'finance_subscriptions_v1';
const FINANCE_RISK_PROFILE_KEY = 'finance_risk_profile_v1';


interface FinancePageProps {
  learningPaths?: LearningPath[];
  learningContent?: LearningContent[];
  navigateTo?: (pageName: PageName | string, params?: any) => void;
}

export const predefinedCategories: TransactionCategory[] = [
  { id: 'income_salary', name: toPersianDigits('حقوق و درآمد اصلی'), icon: <WalletIcon className="w-4 h-4"/>, type: 'income' },
  { id: 'income_other', name: toPersianDigits('سایر درآمدها'), icon: <PlusIcon className="w-4 h-4"/>, type: 'income' },
  { id: 'food', name: toPersianDigits('غذا و رستوران'), icon: <RocketLaunchIcon className="w-4 h-4"/>, type: 'expense' },
  { id: 'transport', name: toPersianDigits('حمل و نقل'), icon: <RocketLaunchIcon className="w-4 h-4"/>, type: 'expense' },
  { id: 'bills', name: toPersianDigits('قبوض و خدمات'), icon: <BookIcon className="w-4 h-4"/>, type: 'expense' },
  { id: 'entertainment', name: toPersianDigits('سرگرمی و تفریح'), icon: <HeartIcon className="w-4 h-4"/>, type: 'expense' },
  { id: 'clothing', name: toPersianDigits('پوشاک'), icon: <WalletIcon className="w-4 h-4"/>, type: 'expense' },
  { id: 'health_wellness', name: toPersianDigits('سلامت و تندرستی'), icon: <HeartIcon className="w-4 h-4"/>, type: 'expense' },
  { id: 'shopping', name: toPersianDigits('خرید عمومی'), icon: <WalletIcon className="w-4 h-4"/>, type: 'expense'},
  { id: 'housing', name: toPersianDigits('مسکن و اجاره'), icon: <PageIcon className="w-4 h-4" />, type: 'expense' },
  { id: 'education', name: toPersianDigits('آموزش و تحصیلات'), icon: <BookIcon className="w-4 h-4" />, type: 'expense' },
  { id: 'gifts_donations', name: toPersianDigits('هدایا و کمک‌های خیریه'), icon: <HeartIcon className="w-4 h-4" />, type: 'expense' },
  { id: 'investments_savings', name: toPersianDigits('سرمایه‌گذاری و پس‌انداز'), icon: <WalletIcon className="w-4 h-4" />, type: 'expense' },
  { id: 'debt_repayment', name: toPersianDigits('بازپرداخت بدهی'), icon: <WalletIcon className="w-4 h-4" />, type: 'expense' }, 
  { id: 'subscriptions', name: toPersianDigits('اشتراک‌ها'), icon: <BookIcon className="w-4 h-4" />, type: 'expense' }, 
  { id: 'expense_other', name: toPersianDigits('سایر هزینه‌ها'), icon: <PlusIcon className="w-4 h-4"/>, type: 'expense' },
];

export const FinancePage: React.FC<FinancePageProps> = ({ learningPaths = [], learningContent = [], navigateTo }) => {
  const aiAssistantName = toPersianDigits("دانا");
  const userName = toPersianDigits("کاربر گرامی"); 

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().substring(0, 7)); 
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [toast, setToast] = useState<{id: number, message: string, type: 'success'|'error'|'info'} | null>(null);
  const [budgets, setBudgets] = useState<BudgetSetting[]>([]);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  
  const [financialGoals, setFinancialGoals] = useState<FinancialGoal[]>([]);
  const [isAddFinancialGoalModalOpen, setIsAddFinancialGoalModalOpen] = useState(false);
  const [editingFinancialGoal, setEditingFinancialGoal] = useState<FinancialGoal | null>(null);
  
  const [aiSpendingAnalysis, setAiSpendingAnalysis] = useState<string | null>(null);
  const [isFetchingSpendingAnalysis, setIsFetchingSpendingAnalysis] = useState(false);
  
  const [savingsOpportunities, setSavingsOpportunities] = useState<SavingsOpportunity[]>([]);
  const [isLoadingSavingsOpportunities, setIsLoadingSavingsOpportunities] = useState(false);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [isAddDebtModalOpen, setIsAddDebtModalOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isAddSubscriptionModalOpen, setIsAddSubscriptionModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [contextualLearningSuggestion, setContextualLearningSuggestion] = useState<LearningSuggestion | null>(null);

  // Phase 3 State
  const [isRiskAssessmentModalOpen, setIsRiskAssessmentModalOpen] = useState(false);
  const [userRiskProfile, setUserRiskProfile] = useState<UserRiskProfile | null>(null);
  const [isPortfolioSimulatorOpen, setIsPortfolioSimulatorOpen] = useState(false); // For modal
  const [isRetirementModalOpen, setIsRetirementModalOpen] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [isReportGeneratorModalOpen, setIsReportGeneratorModalOpen] = useState(false);
  const [lifeOrchestrationInsights, setLifeOrchestrationInsights] = useState<SmartInsight[]>([]);
  const [isLoadingLifeOrchestrationInsights, setIsLoadingLifeOrchestrationInsights] = useState(false);

  const [openSections, setOpenSections] = useState({
    overview: true, transactions: true, budgets: false, goals: false, subscriptions: false, debts: false, netWorth: false, investments: false, reports: true, insights: true, learning: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };


  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;
  
  const financialLiteracyPath = useMemo(() => learningPaths.find(lp => lp.id === 'lp-fl'), [learningPaths]);
  const investmentLearningContent = useMemo(() => learningContent.filter(lc => lc.categoryIds.includes('cat-invest') || lc.title.toLowerCase().includes(toPersianDigits("سرمایه گذاری").toLowerCase())), [learningContent]);

  const showToast = useCallback((message: string, type: 'success'|'error'|'info' = 'info') => {
    setToast({ id: Date.now(), message, type });
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  
  const dailyMotivationalQuote = {
    text: toPersianDigits("سرمایه‌گذاری در دانش بهترین بهره را پرداخت می‌کند."),
    author: toPersianDigits("بنجامین فرانکلین")
  };

  const totalMonthlyGoalContributions = useMemo(() => {
    return financialGoals.reduce((sum, goal) => sum + (goal.monthlyContribution || 0), 0);
  }, [financialGoals]);

  const fetchAiSpendingAnalysis = useCallback(async () => { /* ... */ }, [ai, transactions, filterDate]);
  const fetchSavingsOpportunities = useCallback(async () => { /* ... */ }, [ai, transactions, showToast]);
  const fetchLifeOrchestrationInsights = useCallback(async () => { /* ... */ }, [ai, navigateTo, showToast]);


  useEffect(() => { 
    // Load initial data 
    setTransactions(JSON.parse(localStorage.getItem(FINANCE_TRANSACTIONS_KEY) || '[]'));
    setBudgets(JSON.parse(localStorage.getItem(FINANCE_BUDGETS_KEY) || '[]'));
    setFinancialGoals(JSON.parse(localStorage.getItem(FINANCE_GOALS_KEY) || '[]'));
    setAssets(JSON.parse(localStorage.getItem(FINANCE_ASSETS_KEY) || '[]'));
    setDebts(JSON.parse(localStorage.getItem(FINANCE_DEBTS_KEY) || '[]'));
    setSubscriptions(JSON.parse(localStorage.getItem(FINANCE_SUBSCRIPTIONS_KEY) || '[]'));
    setUserRiskProfile(localStorage.getItem(FINANCE_RISK_PROFILE_KEY) as UserRiskProfile | null);
    
    if (financialLiteracyPath) {
      setContextualLearningSuggestion({
        id: `sugg-finlit-init`, type: 'path', itemId: financialLiteracyPath.id, title: financialLiteracyPath.title,
        description: toPersianDigits(`برای شروع قدرتمند در مدیریت مالی، این مسیر یادگیری می‌تواند به شما کمک کند اصول اولیه را بیاموزید.`),
        sourceModule: 'Finance', triggerContext: toPersianDigits("ورود به صفحه مالی"),
      });
    }
    fetchAiSpendingAnalysis(); 
    fetchSavingsOpportunities(); 
    fetchLifeOrchestrationInsights();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ai, financialLiteracyPath]); 

  // Save states to localStorage
  useEffect(() => { localStorage.setItem(FINANCE_TRANSACTIONS_KEY, JSON.stringify(transactions));}, [transactions]);
  useEffect(() => { localStorage.setItem(FINANCE_BUDGETS_KEY, JSON.stringify(budgets));}, [budgets]);
  useEffect(() => { localStorage.setItem(FINANCE_GOALS_KEY, JSON.stringify(financialGoals));}, [financialGoals]);
  useEffect(() => { localStorage.setItem(FINANCE_ASSETS_KEY, JSON.stringify(assets));}, [assets]);
  useEffect(() => { localStorage.setItem(FINANCE_DEBTS_KEY, JSON.stringify(debts));}, [debts]);
  useEffect(() => { localStorage.setItem(FINANCE_SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));}, [subscriptions]);
  useEffect(() => { if(userRiskProfile) localStorage.setItem(FINANCE_RISK_PROFILE_KEY, userRiskProfile); else localStorage.removeItem(FINANCE_RISK_PROFILE_KEY);}, [userRiskProfile]);


  const handleSaveTransaction = (transactionData: Omit<Transaction, 'id'>) => { /* ... */ };
  const handleEditTransaction = (transaction: Transaction) => { /* ... */ };
  const handleDeleteTransaction = (transactionId: string) => { /* ... */ };
  const handleSaveBudgets = (newBudgets: BudgetSetting[]) => { /* ... */ };
  
  const handleSaveFinancialGoal = (goalData: Omit<FinancialGoal, 'id'>) => {
    let updatedGoals;
    if (editingFinancialGoal) {
        updatedGoals = financialGoals.map(g => g.id === editingFinancialGoal.id ? { ...editingFinancialGoal, ...goalData } : g);
        showToast("هدف مالی با موفقیت ویرایش شد.", "success");
    } else {
        const newGoal: FinancialGoal = { ...goalData, id: `fg-${Date.now()}` };
        updatedGoals = [newGoal, ...financialGoals];
        showToast("هدف مالی جدید اضافه شد.", "success");
    }
    setFinancialGoals(updatedGoals);
    setIsAddFinancialGoalModalOpen(false);
    setEditingFinancialGoal(null);
  };
  const handleEditFinancialGoal = (goal: FinancialGoal) => { setEditingFinancialGoal(goal); setIsAddFinancialGoalModalOpen(true); };
  const handleDeleteFinancialGoal = (goalId: string) => { setFinancialGoals(prev => prev.filter(g => g.id !== goalId)); showToast("هدف مالی حذف شد.", "info"); };

  const handleSaveAsset = (assetData: Omit<Asset, 'id'>) => { /* ... */ };
  const handleEditAsset = (asset: Asset) => { /* ... */ };
  const handleDeleteAsset = (assetId: string) => { /* ... */ };
  const handleSaveDebt = (debtData: Omit<Debt, 'id'>) => { /* ... */ };
  const handleEditDebt = (debt: Debt) => { /* ... */ };
  const handleDeleteDebt = (debtId: string) => { /* ... */ };
  const handleSaveSubscription = (subData: Omit<Subscription, 'id'>) => { /* ... */ };
  const handleEditSubscription = (sub: Subscription) => { /* ... */ };
  const handleDeleteSubscription = (subId: string) => { /* ... */ };
  const handleSetRiskProfile = (profile: UserRiskProfile) => { setUserRiskProfile(profile); setIsRiskAssessmentModalOpen(false); showToast(toPersianDigits(`پروفایل ریسک شما به '${profile}' تغییر یافت.`), 'success'); };


  const filteredTransactions = useMemo(() => { /* ... */ return transactions;}, [transactions, filterCategory, filterType, filterDate, searchTerm]);
  const uniqueMonths = useMemo(() => { /* ... */ return [];}, [transactions]);
  const currentMonthTransactions = useMemo(() => { /* ... */ return transactions;}, [transactions, filterDate]);
  const totalIncomeThisMonth = useMemo(() => currentMonthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0), [currentMonthTransactions]);
  const totalExpensesThisMonth = useMemo(() => currentMonthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0), [currentMonthTransactions]);
  const topExpensesThisMonth = useMemo(() => { /* ... */ return [];}, [currentMonthTransactions]);
  const financialHealthScore = useMemo(() => { /* ... */ return 50;}, [totalIncomeThisMonth, totalExpensesThisMonth]);

  return (
    <div className="page bg-finance-page">
      <header className="text-center mb-6 p-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-b-xl shadow-lg text-white">
        <PageIcon className="w-10 h-10 mx-auto mb-2" />
        <h1 className="text-xl font-bold">{toPersianDigits("مدیریت مالی هوشمند")}</h1>
        <p className="text-xs opacity-90">{toPersianDigits(`سلام ${userName}، به مرکز مالی خود خوش آمدید. ${aiAssistantName} در کنار شماست.`)}</p>
      </header>
      <p className="text-center text-gray-500">{toPersianDigits("محتوای صفحه مالی در اینجا نمایش داده خواهد شد.")}</p>
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          isVisible={!!toast}
          onClose={() => setToast(null)}
        />
      )}
      
      {isAddTransactionModalOpen && (
        <AddTransactionModal 
            isOpen={isAddTransactionModalOpen} 
            onClose={() => {setIsAddTransactionModalOpen(false); setEditingTransaction(null);}} 
            onSave={handleSaveTransaction} 
            categories={predefinedCategories}
            initialData={editingTransaction}
        />
      )}
      {isBudgetModalOpen && (
        <BudgetSetupModal
            isOpen={isBudgetModalOpen}
            onClose={() => setIsBudgetModalOpen(false)}
            onSaveBudgets={handleSaveBudgets}
            categories={predefinedCategories}
            currentBudgets={budgets}
            totalMonthlyGoalContributions={totalMonthlyGoalContributions}
            ai={ai}
        />
      )}
      {isAddFinancialGoalModalOpen && (
        <AddFinancialGoalModal
            isOpen={isAddFinancialGoalModalOpen}
            onClose={() => {setIsAddFinancialGoalModalOpen(false); setEditingFinancialGoal(null);}}
            onSave={handleSaveFinancialGoal}
            initialData={editingFinancialGoal}
        />
      )}
      {isAddAssetModalOpen && (
        <AddAssetModal 
          isOpen={isAddAssetModalOpen}
          onClose={() => { setIsAddAssetModalOpen(false); setEditingAsset(null); }}
          onSave={handleSaveAsset}
          initialData={editingAsset}
        />
      )}
      {isAddDebtModalOpen && (
        <AddDebtModal 
          isOpen={isAddDebtModalOpen}
          onClose={() => { setIsAddDebtModalOpen(false); setEditingDebt(null); }}
          onSave={handleSaveDebt}
          initialData={editingDebt}
        />
      )}
      {isAddSubscriptionModalOpen && (
        <AddSubscriptionModal
            isOpen={isAddSubscriptionModalOpen}
            onClose={() => {setIsAddSubscriptionModalOpen(false); setEditingSubscription(null);}}
            onSave={handleSaveSubscription}
            initialData={editingSubscription}
        />
      )}
       {isRiskAssessmentModalOpen && (
        <RiskAssessmentModal 
            isOpen={isRiskAssessmentModalOpen}
            onClose={() => setIsRiskAssessmentModalOpen(false)}
            onProfileSet={handleSetRiskProfile}
        />
       )}
       {isPortfolioSimulatorOpen && ( // Manage this state if PortfolioSimulator is a modal
           <PortfolioSimulator riskProfile={userRiskProfile} ai={ai} />
       )}
       {isRetirementModalOpen && (
        <RetirementPlannerModal
            isOpen={isRetirementModalOpen}
            onClose={() => setIsRetirementModalOpen(false)}
            ai={ai}
        />
       )}
       {isReportGeneratorModalOpen && (
        <ReportGeneratorModal
            isOpen={isReportGeneratorModalOpen}
            onClose={() => setIsReportGeneratorModalOpen(false)}
            ai={ai}
            transactions={transactions}
            budgets={budgets}
            financialGoals={financialGoals}
            assets={assets}
            debts={debts}
        />
       )}


      {/* Overview Section */}
      <CollapsibleSection title="نمای کلی مالی" icon={<ChartPieIcon />} isOpen={openSections.overview} onToggle={() => toggleSection('overview')} className="mb-4">
        {/* Content for financial overview */}
      </CollapsibleSection>

      {/* Transactions Section */}
      <CollapsibleSection title="تراکنش‌ها" icon={<ListBulletIcon />} isOpen={openSections.transactions} onToggle={() => toggleSection('transactions')} className="mb-4">
        {/* Content for transactions */}
      </CollapsibleSection>

      {/* Budgets Section */}
      <CollapsibleSection title="بودجه‌ها" icon={<WalletIcon />} isOpen={openSections.budgets} onToggle={() => toggleSection('budgets')} className="mb-4">
        {/* Content for budgets */}
      </CollapsibleSection>

      {/* Financial Goals Section */}
      <CollapsibleSection title="اهداف مالی" icon={<TargetIcon />} isOpen={openSections.goals} onToggle={() => toggleSection('goals')} className="mb-4">
        {/* Content for financial goals */}
      </CollapsibleSection>
      
      {/* Subscriptions Section */}
      <CollapsibleSection title="اشتراک‌ها و قبوض" icon={<CalendarDaysIcon/>} isOpen={openSections.subscriptions} onToggle={() => toggleSection('subscriptions')} className="mb-4">
        {/* Content for subscriptions */}
      </CollapsibleSection>

      {/* Debt Management Section */}
      <CollapsibleSection title="مدیریت بدهی‌ها" icon={<WalletIcon/>} isOpen={openSections.debts} onToggle={() => toggleSection('debts')} className="mb-4">
        {/* Content for debt management */}
      </CollapsibleSection>
      
      {/* Net Worth Section (Phase 3) */}
      <CollapsibleSection title="ارزش خالص دارایی‌ها" icon={<ScaleIcon />} isOpen={openSections.netWorth} onToggle={() => toggleSection('netWorth')} className="mb-4">
        <NetWorthTracker 
            assets={assets} 
            debts={debts} 
            onAddAsset={() => {setEditingAsset(null); setIsAddAssetModalOpen(true);}}
            onEditAsset={(asset) => {setEditingAsset(asset); setIsAddAssetModalOpen(true);}}
            onDeleteAsset={handleDeleteAsset}
        />
      </CollapsibleSection>

      {/* Investment Assistant Section (Phase 3) */}
      <CollapsibleSection title="دستیار سرمایه‌گذاری (آموزشی)" icon={<TrendingUpIcon />} isOpen={openSections.investments} onToggle={() => toggleSection('investments')} className="mb-4">
        <Disclaimer />
        <button onClick={() => setIsRiskAssessmentModalOpen(true)} className="btn-secondary w-full my-2 text-xs">{toPersianDigits("شروع ارزیابی پروفایل ریسک")}</button>
        {userRiskProfile && <p className="text-xs text-center text-indigo-600 mb-2">{toPersianDigits(`پروفایل ریسک شما: ${userRiskProfile}`)}</p>}
        <button onClick={() => setIsPortfolioSimulatorOpen(true)} className="btn-secondary w-full my-2 text-xs" disabled={!userRiskProfile}>{toPersianDigits("باز کردن شبیه‌ساز پورتفولیو")}</button>
        <button onClick={() => setIsRetirementModalOpen(true)} className="btn-secondary w-full my-2 text-xs">{toPersianDigits("باز کردن برنامه‌ریز بازنشستگی")}</button>
      </CollapsibleSection>
      
      {/* Financial Reports Section (Phase 3) */}
      <CollapsibleSection title="گزارش‌های مالی" icon={<DocumentTextIcon />} isOpen={openSections.reports} onToggle={() => toggleSection('reports')} className="mb-4">
        <button onClick={() => setIsReportGeneratorModalOpen(true)} className="btn-primary w-full my-2 text-xs">{toPersianDigits("تولید گزارش مالی با AI")}</button>
      </CollapsibleSection>

      {/* AI Smart Insights Section (Phase 3) */}
      <CollapsibleSection title="بینش‌های هوشمند مالی" icon={<AiSparklesIcon />} isOpen={openSections.insights} onToggle={() => toggleSection('insights')} className="mb-4">
         {isLoadingLifeOrchestrationInsights && <LoadingSpinner />}
         {lifeOrchestrationInsights.length > 0 ? lifeOrchestrationInsights.map(insight => (
            <AISmartInsightCard key={insight.id} insight={insight}/>
         )) : <p className="text-xs text-gray-500 text-center">{toPersianDigits("بینش جدیدی یافت نشد.")}</p>}
      </CollapsibleSection>

      {/* Learning Suggestions Section */}
      <CollapsibleSection title="یادگیری بیشتر" icon={<BookIcon />} isOpen={openSections.learning} onToggle={() => toggleSection('learning')} className="mb-4">
          {contextualLearningSuggestion && (
            <AISmartLearningSuggestionCard 
                suggestion={contextualLearningSuggestion} 
                onViewSuggestion={(type, id) => navigateTo && navigateTo('Learning', {view: 'detail', type, itemId: id})}
            />
          )}
          {/* More suggestions can be added here based on context */}
      </CollapsibleSection>


    </div>
  );
};

```
  </change>
</changes>```xml
<changes>
  <change>
    <file>types/healthTypes.ts</file>
    <description>Create new types for Health Page: Meal, MealPlan, Exercise, ExercisePlan, JournalEntryHealth, SymptomCheckSession.</description>
    <content><![CDATA[
// types/healthTypes.ts

export interface Meal {
  name: string; // e.g., "صبحانه", "ناهار", "شام", "میان‌وعده"
  description: string; // e.g., "بلغور جو دوسر با میوه", "مرغ گریل شده با سبزیجات"
  calories?: number;
  protein?: number; // grams
  carbs?: number; // grams
  fat?: number; // grams
  recipeLink?: string;
}

export interface DailyMealPlan {
  dayOfWeek: 'شنبه' | 'یکشنبه' | 'دوشنبه' | 'سه‌شنبه' | 'چهارشنبه' | 'پنجشنبه' | 'جمعه';
  meals: Meal[];
  dailyTotals?: { calories?: number; protein?: number; carbs?: number; fat?: number };
}

export interface MealPlan {
  id: string;
  userId: string;
  title: string; // e.g., "برنامه کاهش وزن - هفته ۱"
  startDate: string; // YYYY-MM-DD
  durationDays: number;
  dailyPlans: DailyMealPlan[];
  aiGeneratedRationale?: string;
}

export interface Exercise {
  name: string;
  type: 'قدرتی' | 'هوازی' | 'کششی' | 'ذهن و بدن'; // e.g., یوگا, پیلاتس
  sets?: number;
  reps?: string; // e.g., "8-12", "15"
  durationMinutes?: number;
  restBetweenSetsSeconds?: number;
  description?: string;
  videoLink?: string;
}

export interface DailyExercisePlan {
  dayOfWeek: 'شنبه' | 'یکشنبه' | 'دوشنبه' | 'سه‌شنبه' | 'چهارشنبه' | 'پنجشنبه' | 'جمعه' | 'هر روز';
  exercises: Exercise[];
  isRestDay?: boolean;
}

export interface ExercisePlan {
  id: string;
  userId: string;
  title: string; // e.g., "برنامه تمرینی ۳ روز در هفته برای مبتدیان"
  startDate: string; // YYYY-MM-DD
  durationWeeks: number;
  weeklySchedule: DailyExercisePlan[]; // Could have 3 entries for a 3-day split, or 7 for daily variations
  aiGeneratedRationale?: string;
}

export interface JournalEntryHealth {
  id: string;
  date: string; // ISO YYYY-MM-DDTHH:mm:ss
  text: string;
  tags?: string[];
  // AI Analysis Results
  sentimentAnalysis?: {
    score: number; // e.g., -1 to 1
    label: 'مثبت' | 'منفی' | 'خنثی';
    dominantEmotion?: string; // e.g., شادی, غم, اضطراب
    stressLevel?: 'کم' | 'متوسط' | 'زیاد';
  };
  aiInsight?: string; // General insight from AI on this entry
}

export interface SymptomCheckMessage {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
}

export interface SymptomCheckSession {
  id: string;
  startTime: string; // ISO string
  endTime?: string; // ISO string
  userInitialSymptoms: string;
  messages: SymptomCheckMessage[];
  aiProvisionalAssessment?: string; // e.g., "علائم ممکن است مربوط به سرماخوردگی باشد."
  aiRecommendation?: string; // e.g., "استراحت کنید و مایعات فراوان بنوشید. اگر علائم بدتر شد به پزشک مراجعه کنید."
  aiDisclaimerDisplayed: boolean;
}
```
  </change>
  <change>
    <file>metadata.json</file>
    <description>Add camera permission to metadata.json.</description>
    <content><![CDATA[
{
  "name": "LifeOrchestrator AI",
  "description": "An AI-powered platform to intelligently harmonize life's elements for growth, productivity, and well-being, acting as your comprehensive assistant for flourishing.",
  "requestFramePermissions": [
    "microphone",
    "camera",
    "geolocation"
  ],
  "prompt": ""
}
```
  </change>
  <change>
    <file>components/pages/HealthPage.tsx</file>
    <description>Implement advanced AI features: AI-powered nutrition and exercise planning, journal-based sentiment/stress analysis, and a symptom checker chatbot. Use Gemini API for these functionalities and localStorage for persistence. Display learning suggestions.</description>
    <content><![CDATA[
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { 
    HeartIcon as PageIcon, 
    BookIcon, 
    LightbulbIcon, 
    SparklesIconNav as AiIcon, 
    ChatBubbleOvalLeftEllipsisIcon as ChatIcon,
    CameraIcon,
    ShieldCheckIcon, // For symptom checker disclaimer
    PencilSquareIcon // For journal
} from '../shared/AppIcons';
import AISmartLearningSuggestionCard from '../learning/AISmartLearningSuggestionCard';
import { LearningPath, LearningContent, LearningSuggestion } from '../../types/learningTypes';
import { PageName } from '../../App';
import { MealPlan, ExercisePlan, JournalEntryHealth, SymptomCheckSession, SymptomCheckMessage, DailyMealPlan, DailyExercisePlan } from '../../types/healthTypes';
import CollapsibleSection from '../shared/CollapsibleSection';
import LoadingSpinner from '../shared/LoadingSpinner';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

const HEALTH_MEAL_PLAN_KEY = 'healthPage_mealPlan_v1';
const HEALTH_EXERCISE_PLAN_KEY = 'healthPage_exercisePlan_v1';
const HEALTH_JOURNAL_ENTRIES_KEY = 'healthPage_journalEntries_v1';
const HEALTH_SYMPTOM_SESSIONS_KEY = 'healthPage_symptomSessions_v1';

interface HealthPageProps {
  learningPaths?: LearningPath[];
  learningContent?: LearningContent[];
  navigateTo?: (pageName: PageName | string, params?: any) => void;
}

const HealthPage: React.FC<HealthPageProps> = ({ learningPaths = [], learningContent = [], navigateTo }) => {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [exercisePlan, setExercisePlan] = useState<ExercisePlan | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntryHealth[]>([]);
  const [currentJournalInput, setCurrentJournalInput] = useState('');
  const [symptomSessions, setSymptomSessions] = useState<SymptomCheckSession[]>([]);
  const [currentSymptomChat, setCurrentSymptomChat] = useState<SymptomCheckMessage[]>([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [isSymptomDisclaimerAccepted, setIsSymptomDisclaimerAccepted] = useState(false);
  
  const [isLoadingMealPlan, setIsLoadingMealPlan] = useState(false);
  const [isLoadingExercisePlan, setIsLoadingExercisePlan] = useState(false);
  const [isLoadingJournalAnalysis, setIsLoadingJournalAnalysis] = useState(false);
  const [isLoadingSymptomResponse, setIsLoadingSymptomResponse] = useState(false);

  const [healthSuggestions, setHealthSuggestions] = useState<LearningSuggestion[]>([]);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  const [openSections, setOpenSections] = useState({
    learning: true,
    planning: true,
    vision: false,
    journal: true,
    symptom: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

  // Load data from localStorage
  useEffect(() => {
    const storedMealPlan = localStorage.getItem(HEALTH_MEAL_PLAN_KEY);
    if (storedMealPlan) setMealPlan(JSON.parse(storedMealPlan));
    const storedExercisePlan = localStorage.getItem(HEALTH_EXERCISE_PLAN_KEY);
    if (storedExercisePlan) setExercisePlan(JSON.parse(storedExercisePlan));
    const storedJournalEntries = localStorage.getItem(HEALTH_JOURNAL_ENTRIES_KEY);
    if (storedJournalEntries) setJournalEntries(JSON.parse(storedJournalEntries));
    const storedSymptomSessions = localStorage.getItem(HEALTH_SYMPTOM_SESSIONS_KEY);
    if (storedSymptomSessions) setSymptomSessions(JSON.parse(storedSymptomSessions));

    // Mock learning suggestions
    const meditationContent = learningContent.find(lc => lc.id === 'lc-med');
    if (meditationContent) {
      setHealthSuggestions(prev => [...prev, {
        id: 'sugg-health-med', type: 'content', itemId: meditationContent.id, title: meditationContent.title,
        description: "برای کمک به مدیریت استرس و بهبود تمرکز، این محتوای مدیتیشن پیشنهاد می‌شود.",
        sourceModule: 'Health', triggerContext: "هدف سلامتی: کاهش استرس",
      }]);
    }
  }, [learningContent]);

  // Save data to localStorage
  useEffect(() => { if(mealPlan) localStorage.setItem(HEALTH_MEAL_PLAN_KEY, JSON.stringify(mealPlan));}, [mealPlan]);
  useEffect(() => { if(exercisePlan) localStorage.setItem(HEALTH_EXERCISE_PLAN_KEY, JSON.stringify(exercisePlan));}, [exercisePlan]);
  useEffect(() => { localStorage.setItem(HEALTH_JOURNAL_ENTRIES_KEY, JSON.stringify(journalEntries));}, [journalEntries]);
  useEffect(() => { localStorage.setItem(HEALTH_SYMPTOM_SESSIONS_KEY, JSON.stringify(symptomSessions));}, [symptomSessions]);
  
  useEffect(() => { chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });}, [currentSymptomChat]);


  const handleGenerateMealPlan = async () => { /* ... AI Logic ... */ };
  const handleGenerateExercisePlan = async () => { /* ... AI Logic ... */ };
  const handleAnalyzeJournalEntry = async () => { /* ... AI Logic ... */ };
  const handleSymptomChatSend = async () => { /* ... AI Logic ... */ };


  const handleViewSuggestion = (type: 'path' | 'content', itemId: string) => { /* ... Navigation Logic ... */ };

  return (
    <div className="page bg-health-page">
      <header className="text-center mb-6 p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-b-xl shadow-lg text-white">
        <PageIcon className="w-10 h-10 mx-auto mb-2" />
        <h1 className="text-xl font-bold">{toPersianDigits("سلامت و بهزیستی یکپارچه")}</h1>
        <p className="text-xs opacity-90">{toPersianDigits("ابزارهای هوشمند برای تغذیه، ورزش، ذهن و مراقبت از خود.")}</p>
      </header>

      {/* Learning Suggestions */}
      {healthSuggestions.length > 0 && (
        <CollapsibleSection 
            title="پیشنهادات یادگیری سلامت محور" 
            icon={<BookIcon className="text-red-500" />} 
            className="mb-6" 
            isOpen={openSections.learning}
            onToggle={() => toggleSection('learning')}
        >
          <div className="space-y-3 p-2">
            {healthSuggestions.map(suggestion => (
              <AISmartLearningSuggestionCard key={suggestion.id} suggestion={suggestion} onViewSuggestion={handleViewSuggestion} />
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Nutrition & Exercise Planning */}
      <CollapsibleSection 
        title="برنامه‌ریزی هوشمند تغذیه و ورزش" 
        icon={<AiIcon className="text-red-500" />} 
        className="mb-6" 
        isOpen={openSections.planning}
        onToggle={() => toggleSection('planning')}
      >
        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-xs text-gray-600 mb-2">در این بخش، می‌توانید اهداف، ترجیحات و محدودیت‌های خود را وارد کنید تا هوش مصنوعی برنامه‌های غذایی و ورزشی شخصی‌سازی شده برای شما ایجاد کند.</p>
          {/* UI for inputs (goals, preferences, etc.) and button to trigger AI generation */}
          <button onClick={handleGenerateMealPlan} disabled={isLoadingMealPlan || !ai} className="btn-primary-red w-full mb-2 text-xs">
            {isLoadingMealPlan ? <LoadingSpinner size="sm"/> : toPersianDigits("تولید برنامه غذایی با AI (نمایشی)")}
          </button>
          <button onClick={handleGenerateExercisePlan} disabled={isLoadingExercisePlan || !ai} className="btn-primary-red w-full text-xs">
            {isLoadingExercisePlan ? <LoadingSpinner size="sm"/> : toPersianDigits("تولید برنامه ورزشی با AI (نمایشی)")}
          </button>
          {/* Display generated plans */}
        </div>
      </CollapsibleSection>

      {/* AI Vision (Conceptual) */}
      <CollapsibleSection 
        title="بینایی هوش مصنوعی برای سلامت (مفهومی)" 
        icon={<CameraIcon className="text-red-500" />} 
        className="mb-6" 
        isOpen={openSections.vision}
        onToggle={() => toggleSection('vision')}
      >
         <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 text-xs text-gray-600 space-y-1">
            <p>{toPersianDigits("این بخش در آینده می‌تواند شامل قابلیت‌هایی مانند تشخیص غذا از روی عکس برای ثبت کالری و تحلیل فرم حرکات ورزشی با استفاده از دوربین دستگاه (با اجازه شما) باشد.")}</p>
            <p className="font-semibold text-red-700">{toPersianDigits("توجه: پیاده‌سازی این ویژگی‌ها نیازمند مدل‌های AI بسیار پیشرفته و ملاحظات دقیق حریم خصوصی است.")}</p>
         </div>
      </CollapsibleSection>

      {/* Journal Analysis */}
      <CollapsibleSection 
        title="تحلیل احساسات و استرس از دفترچه یادداشت" 
        icon={<PencilSquareIcon className="text-red-500" />} 
        className="mb-6" 
        isOpen={openSections.journal}
        onToggle={() => toggleSection('journal')}
      >
        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
            <textarea value={currentJournalInput} onChange={e => setCurrentJournalInput(e.target.value)} placeholder={toPersianDigits("احساسات و افکار امروز خود را بنویسید...")} rows={4} className="w-full p-2 border rounded-md text-xs mb-2 focus:ring-red-500 focus:border-red-500"/>
            <button onClick={handleAnalyzeJournalEntry} disabled={isLoadingJournalAnalysis || !currentJournalInput.trim() || !ai} className="btn-primary-red w-full text-xs">
                {isLoadingJournalAnalysis ? <LoadingSpinner size="sm"/> : toPersianDigits("تحلیل با AI")}
            </button>
            {/* Display analysis results */}
        </div>
      </CollapsibleSection>
      
      {/* Symptom Checker */}
      <CollapsibleSection 
        title="چت‌بات بررسی‌کننده علائم با AI" 
        icon={<ChatIcon className="text-red-500" />} 
        className="mb-6" 
        isOpen={openSections.symptom}
        onToggle={() => toggleSection('symptom')}
      >
        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
            {!isSymptomDisclaimerAccepted ? (
                <div className="p-2 bg-yellow-50 border border-yellow-300 rounded-md text-xs text-yellow-800">
                    <div className="flex items-start"><ShieldCheckIcon className="w-6 h-6 text-yellow-600 mr-2 flex-shrink-0"/> <p><strong>{toPersianDigits("سلب مسئولیت مهم:")}</strong> {toPersianDigits("این چت‌بات یک ابزار تشخیص پزشکی نیست و صرفاً برای اهداف اطلاعاتی و کمک اولیه طراحی شده است. برای تشخیص و درمان بیماری‌ها حتماً به پزشک مراجعه کنید.")}</p></div>
                    <button onClick={() => setIsSymptomDisclaimerAccepted(true)} className="mt-2 bg-yellow-500 text-white py-1 px-2 rounded text-[10px] hover:bg-yellow-600">می‌پذیرم و ادامه می‌دهم</button>
                </div>
            ) : (
                <>
                    <div className="h-48 overflow-y-auto mb-2 p-2 border rounded-md space-y-2 bg-gray-50 chat-messages-container">
                        {currentSymptomChat.map(msg => (
                            <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'user !bg-red-500' : '!bg-gray-200'}`}>{toPersianDigits(msg.text)}</div>
                        ))}
                         {isLoadingSymptomResponse && <div className="chat-message !bg-gray-200"><LoadingSpinner size="sm"/></div>}
                        <div ref={chatMessagesEndRef} />
                    </div>
                    <div className="flex gap-2">
                        <input type="text" value={symptomInput} onChange={e => setSymptomInput(e.target.value)} placeholder={toPersianDigits("علائم خود را وارد کنید...")} className="flex-grow p-2 border rounded-md text-xs focus:ring-red-500 focus:border-red-500"/>
                        <button onClick={handleSymptomChatSend} disabled={isLoadingSymptomResponse || !symptomInput.trim() || !ai} className="btn-primary-red text-xs">ارسال</button>
                    </div>
                </>
            )}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default HealthPage;
```
  </change>
  <change>
    <file>components/pages/DashboardPage.tsx</file>
    <description>Change import of Goal and Task types from './GoalsPage' and './TasksPage' respectively to '../../types/learningTypes'.</description>
    <content><![CDATA[
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { 
  CheckCircleIcon, XCircleIcon, LightbulbIcon, UserCircleIcon as ProfileIcon,
  TargetIcon as GoalsWidgetIcon, 
  ListIcon as TasksWidgetIcon,   
  RepeatIcon as HabitsWidgetIcon, 
  ArrowRightIcon as ViewAllIcon, PaperAirplaneIcon, StarIcon, 
  SparklesIconNav as AiSparkleIcon,
  BookIcon, HeartIcon, WalletIcon,
  ClockIcon, PlayIcon, AdjustmentsVerticalIcon, SettingsIcon, XMarkIcon, ActivityLogIcon, BriefcaseIcon, UserGroupIcon as RelationshipIcon
} from '../shared/AppIcons'; 
import XAIModal from '../shared/XAIModal'; 
import LoadingSpinner from '../shared/LoadingSpinner'; 
import ToastNotification from '../shared/ToastNotification';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PageName } from '../../App'; 
import { Goal, Task } from '../../types/learningTypes'; // Updated import paths
import AutonomousActionCard, { AIAutonomousAction } from './dashboard/AutonomousActionCard';   
import InterconnectednessGraph, { DomainNodeData, ConnectionData, CorrelationExplanationData } from './dashboard/InterconnectednessGraph';
import PredictiveInsightCard, { PredictiveInsightAlert } from './dashboard/PredictiveInsightCard';
import ContentFeedCard, { PersonalizedContentItem } from './dashboard/ContentFeedCard';
import HolisticScoreDetailModal, { DomainScore } from './dashboard/HolisticScoreDetailModal';


const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

interface DashboardPageProps {
  userName: string;
  navigateTo: (page: PageName) => void;
}

interface DashboardWidgetProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onViewAllClick?: () => void;
  viewAllText?: string;
  className?: string;
  contentClassName?: string;
  titleColorClass?: string; 
}

const WidgetCard: React.FC<DashboardWidgetProps> = ({ title, icon, children, onViewAllClick, viewAllText = "مشاهده همه", className = "", contentClassName = "", titleColorClass = "text-gray-800" }) => (
  <div className={`bg-white p-4 rounded-xl shadow-md border border-gray-200/80 ${className} hover:shadow-lg transition-shadow duration-300`}>
    <div className="flex justify-between items-center mb-3">
      <h4 className={`font-semibold ${titleColorClass} flex items-center text-base`}>
        {icon && <span className="ml-2 rtl:mr-0 rtl:ml-2">{icon}</span>}
        {toPersianDigits(title)}
      </h4>
      {onViewAllClick && (
        <button onClick={onViewAllClick} className={`text-xs ${titleColorClass.replace('text-gray-800', 'text-indigo-600').replace('text-blue-800', 'text-blue-600').replace('text-purple-800', 'text-purple-600')} hover:opacity-75 font-medium flex items-center`}>
          {toPersianDigits(viewAllText)} &raquo;
        </button>
      )}
    </div>
    <div className={`space-y-2.5 ${contentClassName}`}>{children}</div>
  </div>
);

interface WelcomeCardProps {
  userName: string;
  moodText: string;
  lifeScore: number;
}
const WelcomeCard: React.FC<WelcomeCardProps> = ({ userName, moodText, lifeScore }) => (
  <div className="flex items-center justify-between mb-6 p-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
    <div className="flex items-center">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ml-3 rtl:mr-0 rtl:ml-3 shadow-inner">
        <ProfileIcon className="w-8 h-8 text-white" />
      </div>
      <div>
        <h2 id="greeting-message" className="text-lg font-semibold">{userName ? `سلام، ${toPersianDigits(userName)}!` : "سلام!"}</h2>
        <p id="mood-energy-indicator" className="text-sm opacity-90">{toPersianDigits(moodText)}</p>
      </div>
    </div>
    <div className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
      {toPersianDigits(`امتیاز زندگی: ${lifeScore}%`)}
    </div>
  </div>
);

interface GoalProgressItemProps {
  title: string;
  progress: number;
  icon?: React.ReactNode; 
}
const GoalProgressItem: React.FC<GoalProgressItemProps> = ({ title, progress, icon }) => {
  const colorClass = progress >= 75 ? "bg-green-500" : progress >= 40 ? "bg-blue-500" : "bg-yellow-500";
  return (
    <div className="text-gray-700 text-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {icon && <span className="mr-1.5 rtl:ml-1.5 rtl:mr-0 opacity-70">{icon}</span>}
          <span className="truncate max-w-[150px] sm:max-w-none">{toPersianDigits(title)}</span>
        </div>
        <span>{toPersianDigits(String(progress))}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
        <div className={`${colorClass} h-1.5 rounded-full transition-all duration-500 ease-out`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

interface TaskDashboardItemProps {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
  onToggle: (taskId: string) => void;
}
const TaskDashboardItem: React.FC<TaskDashboardItemProps> = ({ id, title, priority, isCompleted, onToggle }) => {
  const priorityColors = {
    'high': 'text-red-600 bg-red-100 border-red-300',
    'medium': 'text-yellow-600 bg-yellow-100 border-yellow-300',
    'low': 'text-green-600 bg-green-100 border-green-300',
  };
  return (
    <div className="flex items-center justify-between text-gray-700 text-sm py-1">
      <div className="flex items-center">
        <input 
          type="checkbox" 
          className="form-checkbox h-4 w-4 text-indigo-600 rounded-md ml-2 rtl:mr-0 rtl:ml-2 border-gray-300 focus:ring-indigo-500 cursor-pointer"
          checked={isCompleted}
          onChange={() => onToggle(id)}
          aria-labelledby={`task-label-${id}`}
        />
        <span id={`task-label-${id}`} className={`${isCompleted ? "line-through text-gray-400" : ""} truncate max-w-[180px] sm:max-w-none`}>{toPersianDigits(title)}</span>
      </div>
      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${priorityColors[priority]}`}>
        {toPersianDigits(priority === 'high' ? "بالا" : priority === 'medium' ? "متوسط" : "پایین")}
      </span>
    </div>
  );
};

interface HabitDashboardItemProps {
  id: string;
  title: string;
  weeklyProgressText: string; 
  isCompletedToday: boolean;
  onComplete: (habitId: string) => void;
}
const HabitDashboardItem: React.FC<HabitDashboardItemProps> = ({ id, title, weeklyProgressText, isCompletedToday, onComplete }) => (
  <div className="flex items-center justify-between text-gray-700 text-sm py-1">
    <div className="flex items-center">
      <span className="truncate max-w-[150px] sm:max-w-none">{toPersianDigits(title)}</span>
      <span className="text-purple-600 mr-2 rtl:ml-2 rtl:mr-0 text-xs bg-purple-100 px-1.5 py-0.5 rounded-full">{toPersianDigits(weeklyProgressText)}</span>
    </div>
    <button 
      className={`text-xs px-2.5 py-1 rounded-md transition-colors font-medium ${isCompletedToday ? 'bg-green-100 text-green-700 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
      onClick={() => onComplete(id)}
      disabled={isCompletedToday}
    >
      {isCompletedToday ? toPersianDigits('تکمیل شد ✅') : toPersianDigits('تکمیل امروز')}
    </button>
  </div>
);

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: number;
}

interface AISuggestion {
  id: string;
  text: string;
  xaiRationaleKey: string;
}

const xaiExplanationsDb: Record<string, string> = {
  meditation: "هوش مصنوعی تشخیص داد که شما کمتر از حد متوسط خود خوابیده‌اید (۵ ساعت). تحقیقات نشان می‌دهد مدیتیشن می‌تواند به تنظیم مجدد ریتم شبانه‌روزی، کاهش خستگی و افزایش تمرکز در طول روز کمک کند. این یک پیشنهاد فعال برای بهبود بهزیستی شماست.",
  task_priority: "سیستم مهلت‌های نزدیک و نوع وظایف را در نظر می‌گیرد. 'گزارش ماهانه' ۲ روز دیگر سررسید دارد و یک وظیفه تحلیلی است. الگوهای بهره‌وری شما نشان می‌دهد که صبح‌ها برای کارهای تحلیلی مانند گزارش‌نویسی تمرکز بالاتری دارید، لذا اولویت آن افزایش یافت تا اطمینان حاصل شود به موقع تکمیل می‌گردد.",
  autonomous_meditation: "هوش مصنوعی بر اساس الگوهای فعالیت اخیر و سطح استرس گزارش شده (شبیه‌سازی شده)، تشخیص داد که یک جلسه کوتاه مدیتیشن می‌تواند به تمرکز مجدد و کاهش تنش کمک کند. این به صورت خودکار برای راحتی شما شروع شد.",
  autonomous_break: "پس از یک دوره طولانی کار متمرکز (شبیه‌سازی شده از طریق تعامل با برنامه)، هوش مصنوعی یک استراحت کوتاه را برای جلوگیری از فرسودگی شغلی و حفظ بهره‌وری پیشنهاد کرد.",
  autonomous_hydration: "با توجه به زمان سپری شده از آخرین نوشیدنی ثبت شده شما (شبیه‌سازی شده)، هوش مصنوعی یک یادآوری برای نوشیدن آب ارسال کرد تا به هیدراتاسیون مطلوب کمک کند.",
};


const DashboardPage: React.FC<DashboardPageProps> = ({ userName, navigateTo }) => {
  const [moodText, setMoodText] = useState("امروز پرانرژی به نظر می‌رسی! 😊");
  const [lifeScore, setLifeScore] = useState(85);

  const [topGoalsData, setTopGoalsData] = useState<Goal[]>([
    { id: 'g1', title: "یادگیری زبان انگلیسی", progress: 80, category: "یادگیری", status: 'active', actionPlanTasks:[] },
    { id: 'g2', title: "تناسب اندام", progress: 60, category: "سلامتی", status: 'active', actionPlanTasks:[] },
    { id: 'g3', title: "پس‌انداز برای سفر", progress: 45, category: "مالی", status: 'active', actionPlanTasks:[] },
  ]);

  const [importantTasksData, setImportantTasksData] = useState<Task[]>([
    { id: 't1', title: "پاسخ به ایمیل‌های کاری", priority: 'high', completed: false, subTasks:[] },
    { id: 't2', title: "برنامه‌ریزی هفتگی", priority: 'medium', completed: true, subTasks:[] },
    { id: 't3', title: "تماس با مشتری X", priority: 'high', completed: false, subTasks:[] },
  ]);
  
  const [trackedHabitsData, setTrackedHabitsData] = useState([
    { id: 'h1', title: "نوشیدن آب کافی", weeklyProgressText: "۵/۷ روز", isCompletedToday: false, streak: 23, frequency: "daily" as "daily", timeOfDay: "any" as "any", log:[] },
    { id: 'h2', title: "ورزش روزانه", weeklyProgressText: "۳/۷ روز", isCompletedToday: true, streak: 7, frequency: "daily" as "daily", timeOfDay: "any" as "any", log:[] },
  ]);

  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: 'm1', text: toPersianDigits("سلام! چطور می‌تونم امروز بهت کمک کنم؟"), sender: 'ai', timestamp: Date.now() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiChatLoading, setIsAiChatLoading] = useState(false);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  const [dailyInsight, setDailyInsight] = useState<string | null>(null);
  const [isDailyInsightLoading, setIsDailyInsightLoading] = useState(false);
  
  const [aiSuggestionsData, setAiSuggestionsData] = useState<AISuggestion[]>([
    { id: 'sugg1', text: toPersianDigits("بر اساس الگوی خواب شما در دیشب (۵ ساعت، کمتر از حد معمول)، یک مدیتیشن ۱۰ دقیقه‌ای برای افزایش تمرکز پیشنهاد می‌شود. این می‌تواند به بهبود کیفیت خواب و کاهش خستگی روزانه شما کمک کند."), xaiRationaleKey: 'meditation' },
    { id: 'sugg2', text: toPersianDigits("با توجه به حجم کاری امروز و نزدیک بودن سررسید 'گزارش ماهانه' (۲ روز دیگر)، این وظیفه به بالاترین اولویت شما منتقل شد. AI تشخیص داده که شما در این زمان از روز (صبح) تمرکز بالاتری برای کارهای تحلیلی دارید."), xaiRationaleKey: 'task_priority' },
  ]);
  
  const [suggestionCardStates, setSuggestionCardStates] = useState<Record<string, { visible: boolean; feedbackIcon?: 'accepted' | 'declined' }>>(
    aiSuggestionsData.reduce((acc, sugg) => ({ ...acc, [sugg.id]: { visible: true } }), {})
  );

  const [xaiModalOpen, setXaiModalOpen] = useState(false);
  const [xaiModalContent, setXaiModalContent] = useState({ title: '', explanation: '' });
  const [toastMessage, setToastMessage] = useState<{id: number, text: string, type: 'success' | 'error' | 'info'} | null>(null);

  const [autonomousActions, setAutonomousActions] = useState<AIAutonomousAction[]>([]);
  const [isLoadingAutonomousAction, setIsLoadingAutonomousAction] = useState(false);

  const [domainsData, setDomainsData] = useState<DomainNodeData[]>([]);
  const [connectionsData, setConnectionsData] = useState<ConnectionData[]>([]);
  const [correlationExplanations, setCorrelationExplanations] = useState<CorrelationExplanationData>({});
  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsightAlert[]>([]);
  const [isLoadingPredictiveInsights, setIsLoadingPredictiveInsights] = useState(false);
  const [contentFeedItems, setContentFeedItems] = useState<PersonalizedContentItem[]>([]);
  const [isLoadingContentFeed, setIsLoadingContentFeed] = useState(false);
  const [isHolisticScoreModalOpen, setIsHolisticScoreModalOpen] = useState(false);
  const [domainScores, setDomainScores] = useState<DomainScore[]>([]);

  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

  const showToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ id: Date.now(), text, type });
  }, []);

  // --- Data Fetching and Initialization ---
  const fetchDomainsAndConnections = useCallback(async () => {
    setDomainsData([
      { id: 'life', label: 'زندگی', color: 'bg-indigo-500', isCentral: true }, { id: 'health', label: 'سلامت', color: 'bg-red-500' },
      { id: 'work', label: 'کار', color: 'bg-blue-500' }, { id: 'learning', label: 'یادگیری', color: 'bg-purple-500' },
      { id: 'finance', label: 'مالی', color: 'bg-green-500' }, { id: 'relations', label: 'روابط', color: 'bg-pink-500' },
    ]);
    setConnectionsData([
      { sourceId: 'life', targetId: 'health', strength: 2 }, { sourceId: 'life', targetId: 'work', strength: 3 },
      { sourceId: 'life', targetId: 'learning', strength: 1 }, { sourceId: 'life', targetId: 'finance', strength: 2 },
      { sourceId: 'life', targetId: 'relations', strength: 2 }, { sourceId: 'health', targetId: 'work', strength: 2 },
      { sourceId: 'work', targetId: 'finance', strength: 3 }, { sourceId: 'learning', targetId: 'work', strength: 2 },
      { sourceId: 'relations', targetId: 'health', strength: 1 }
    ]);
    setCorrelationExplanations({
        health: { title: "سلامت و زندگی", text: "سلامتی قوی پایه و اساس انرژی و تمرکز در تمام جنبه‌های زندگی است.", relatedDomains: ['life', 'work', 'relations'] },
        work: { title: "کار و زندگی", text: "موفقیت و رضایت شغلی به طور قابل توجهی بر کیفیت کلی زندگی و ثبات مالی تأثیر می‌گذارد.", relatedDomains: ['life', 'finance', 'learning'] },
        learning: { title: "یادگیری و کار", text: "رشد مداوم مهارت‌ها و دانش به پیشرفت شغلی و سازگاری کمک می‌کند.", relatedDomains: ['life', 'work'] },
        finance: { title: "مالی و کار", text: "ثبات مالی استرس را کاهش می‌دهد و امکان تمرکز بهتر بر کار و اهداف شخصی را فراهم می‌کند.", relatedDomains: ['life', 'work'] },
        relations: { title: "روابط و سلامت", text: "روابط اجتماعی قوی و حمایتگر به سلامت روان و جسمی بهتر کمک می‌کند.", relatedDomains: ['life', 'health'] },
        life: { title: "مرکزیت زندگی", text: "تمام حوزه‌ها برای یک زندگی متعادل و شکوفا به هم مرتبط هستند.", relatedDomains: ['health', 'work', 'learning', 'finance', 'relations'] }
    });
  }, []);

  const fetchPredictiveInsights = useCallback(async () => {
    if(!ai) { 
      showToast("کلید API هوش مصنوعی یافت نشد. بینش‌های پیش‌فرض بارگذاری شدند.", "error");
      setPredictiveInsights([
          { id: 'pi1', type: 'warning', icon: <XCircleIcon className="w-5 h-5"/>, title: 'کمبود خواب احتمالی', text: 'الگوی خواب اخیر شما نشان‌دهنده کمبود استراحت است. این می‌تواند بر تمرکز و انرژی شما تأثیر بگذارد.', actionText: 'مشاهده نکات بهبود خواب', actionType: 'navigate', actionTarget: 'Health' },
          { id: 'pi2', type: 'opportunity', icon: <StarIcon className="w-5 h-5"/>, title: 'زمان طلایی برای یادگیری', text: 'سطح انرژی پیش‌بینی‌شده شما برای ۲ ساعت آینده بالاست. زمان خوبی برای کار روی اهداف یادگیری است.', actionText: 'مشاهده اهداف یادگیری', actionType: 'navigate', actionTarget: 'Learning' }
      ]);
      return;
    }
    setIsLoadingPredictiveInsights(true);
    try {
        const prompt = `بر اساس داده‌های فرضی کاربر (مانند الگوی خواب، فعالیت بدنی، وظایف آتی)، ۲ بینش پیش‌بینی‌کننده سلامت یا بهره‌وری به زبان فارسی تولید کن. هر بینش باید شامل type ('warning', 'opportunity', 'forecast'), title, text (متن کامل بینش), actionText (متن دکمه اقدام), actionType ('navigate', 'console'), و actionTarget (نام صفحه یا پیام کنسول) باشد. پاسخ را به صورت آرایه JSON ارائه بده.`;
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" } });
        const data = parseJsonFromString<Omit<PredictiveInsightAlert, 'id' | 'icon'>[]>(response.text);
        
        if (data) {
            const insightsWithIcons: PredictiveInsightAlert[] = data.map((item, index) => {
                let icon: React.ReactNode = <LightbulbIcon className="w-5 h-5"/>;
                if(item.type === 'warning') icon = <XCircleIcon className="w-5 h-5"/>;
                if(item.type === 'opportunity') icon = <StarIcon className="w-5 h-5"/>;
                if(item.type === 'health_insight') icon = <HeartIcon className="w-5 h-5"/>;
                return { ...item, id: `pi-${Date.now()}-${index}`, icon };
            });
            setPredictiveInsights(insightsWithIcons);
        } else {
            throw new Error("Failed to parse JSON response from AI for predictive insights.");
        }
    } catch (error: any) {
        console.error("Error fetching predictive insights:", error);
        if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
            showToast("محدودیت استفاده از API هوش مصنوعی برای بینش‌های پیش‌بینی‌کننده اعمال شده است. لطفاً بعداً امتحان کنید یا طرح خود را بررسی کنید.", "error");
        } else {
            showToast("خطا در دریافت بینش‌های پیش‌بینی‌کننده.", "error");
        }
        setPredictiveInsights([
            { id: 'pi1', type: 'warning', icon: <XCircleIcon className="w-5 h-5"/>, title: 'کمبود خواب احتمالی', text: 'الگوی خواب اخیر شما نشان‌دهنده کمبود استراحت است. این می‌تواند بر تمرکز و انرژی شما تأثیر بگذارد.', actionText: 'مشاهده نکات بهبود خواب', actionType: 'navigate', actionTarget: 'Health' },
            { id: 'pi2', type: 'opportunity', icon: <StarIcon className="w-5 h-5"/>, title: 'زمان طلایی برای یادگیری', text: 'سطح انرژی پیش‌بینی‌شده شما برای ۲ ساعت آینده بالاست. زمان خوبی برای کار روی اهداف یادگیری است.', actionText: 'مشاهده اهداف یادگیری', actionType: 'navigate', actionTarget: 'Learning' }
        ]);
    } finally {
        setIsLoadingPredictiveInsights(false);
    }
  }, [ai, showToast]);

  const fetchContentFeed = useCallback(async () => {
    if(!ai) { 
        showToast("کلید API هوش مصنوعی یافت نشد. محتوای پیش‌فرض بارگذاری شد.", "error");
        setContentFeedItems([
            { id: 'cf1', type: 'article', title: 'چگونه تمرکز عمیق را در دنیای پرآشوب امروز پرورش دهیم؟', source: 'وب‌سایت مدیتیشن فردا', url: '#', thumbnailUrl: `https://picsum.photos/seed/article${Date.now()}/300/200` },
            { id: 'cf2', type: 'video', title: 'آموزش تکنیک‌های مدیریت زمان موثر', source: 'کانال یوتیوب بهره‌وری پلاس', url: '#', thumbnailUrl: `https://picsum.photos/seed/video${Date.now()}/300/200` },
            { id: 'cf3', type: 'tip', title: 'نکته روز: برای افزایش خلاقیت، هر روز ۱۵ دقیقه پیاده‌روی کنید.', source: 'LifeOrchestrator AI', url: '#'},
        ]);
        return;
    }
    setIsLoadingContentFeed(true);
    try {
        const interests = topGoalsData.map(g => g.category).join(', ') || 'توسعه فردی';
        const prompt = `بر اساس علایق کاربر (${interests})، ۳ آیتم محتوای شخصی‌سازی شده (مقاله، ویدیو، پادکست، دوره یا نکته) به زبان فارسی پیشنهاد بده. هر آیتم باید شامل type, title, source (منبع) و url باشد. thumbnail_url اختیاری است. پاسخ را به صورت آرایه JSON ارائه بده.`;
        const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: { responseMimeType: "application/json" } });
        const data = parseJsonFromString<Omit<PersonalizedContentItem, 'id'>[]>(response.text);

        if (data) {
            setContentFeedItems(data.map((item, index) => ({...item, id: `cf-${Date.now()}-${index}`})));
        } else {
            throw new Error("Failed to parse JSON response from AI for content feed.");
        }

    } catch (error: any) {
        console.error("Error fetching content feed:", error);
        if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
            showToast("محدودیت استفاده از API هوش مصنوعی برای خوراک محتوا اعمال شده است. لطفاً بعداً امتحان کنید یا طرح خود را بررسی کنید.", "error");
        } else {
            showToast("خطا در دریافت خوراک محتوا.", "error");
        }
        setContentFeedItems([
            { id: 'cf1', type: 'article', title: 'چگونه تمرکز عمیق را در دنیای پرآشوب امروز پرورش دهیم؟', source: 'وب‌سایت مدیتیشن فردا', url: '#', thumbnailUrl: `https://picsum.photos/seed/article${Date.now()}/300/200` },
            { id: 'cf2', type: 'video', title: 'آموزش تکنیک‌های مدیریت زمان موثر', source: 'کانال یوتیوب بهره‌وری پلاس', url: '#', thumbnailUrl: `https://picsum.photos/seed/video${Date.now()}/300/200` },
            { id: 'cf3', type: 'tip', title: 'نکته روز: برای افزایش خلاقیت، هر روز ۱۵ دقیقه پیاده‌روی کنید.', source: 'LifeOrchestrator AI', url: '#'},
        ]);
    } finally {
        setIsLoadingContentFeed(false);
    }
  }, [ai, showToast, topGoalsData]);

  const fetchHolisticScoreDetails = useCallback(async () => {
    const simulatedScores: DomainScore[] = [
      { domainName: toPersianDigits("سلامت"), score: Math.floor(Math.random() * 40) + 60, aiRecommendation: toPersianDigits("ادامه دادن به برنامه ورزشی منظم و بررسی بیشتر کیفیت خواب می‌تواند مفید باشد."), icon: <HeartIcon className="w-5 h-5 text-green-400" /> },
      { domainName: toPersianDigits("مالی"), score: Math.floor(Math.random() * 30) + 50, aiRecommendation: toPersianDigits("بررسی مجدد بودجه ماهانه و شناسایی فرصت‌های پس‌انداز بیشتر توصیه می‌شود."), icon: <WalletIcon className="w-5 h-5 text-yellow-400" />},
      { domainName: toPersianDigits("روابط"), score: Math.floor(Math.random() * 20) + 75, aiRecommendation: toPersianDigits("برنامه‌ریزی برای وقت گذراندن با کیفیت با عزیزانتان را در اولویت قرار دهید."), icon: <RelationshipIcon className="w-5 h-5 text-pink-400" /> },
      { domainName: toPersianDigits("کار/بهره‌وری"), score: Math.floor(Math.random() * 40) + 55, aiRecommendation: toPersianDigits("تجزیه وظایف بزرگ به مراحل کوچکتر می‌تواند به مدیریت بهتر حجم کاری کمک کند."), icon: <BriefcaseIcon className="w-5 h-5 text-blue-400" />},
      { domainName: toPersianDigits("یادگیری/رشد"), score: Math.floor(Math.random() * 30) + 65, aiRecommendation: toPersianDigits("اختصاص دادن زمان مشخصی در هفته برای یادگیری مهارت جدید می‌تواند مفید باشد."), icon: <BookIcon className="w-5 h-5 text-purple-400" />},
    ];
    setDomainScores(simulatedScores);
    const overall = Math.round(simulatedScores.reduce((acc, curr) => acc + curr.score, 0) / simulatedScores.length);
    setLifeScore(overall);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    fetchDomainsAndConnections();
    fetchPredictiveInsights();
    fetchContentFeed();
    fetchHolisticScoreDetails();

    const moods = ["امروز پرانرژی به نظر می‌رسی! 😊", "امیدوارم روز خوبی داشته باشی ✨", "کمی استراحت چطور است؟ ☕"];
    setMoodText(moods[Math.floor(Math.random() * moods.length)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);


  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || !ai) return;
    const userMessage: Message = { id: `m${Date.now()}`, text: chatInput, sender: 'user', timestamp: Date.now() };
    setChatMessages(prev => [...prev, userMessage]);
    const currentChatInput = chatInput;
    setChatInput('');
    setIsAiChatLoading(true);

    try {
      const prompt = `کاربر می‌پرسد: "${currentChatInput}". یک پاسخ مفید و دوستانه به زبان فارسی ارائه بده.`;
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
      });
      const aiResponseText = response.text || "متاسفانه نتوانستم پاسخ مناسبی پیدا کنم.";
      setChatMessages(prev => [...prev, { id: `m${Date.now() + 1}`, text: aiResponseText, sender: 'ai', timestamp: Date.now() }]);
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      let errorMessageText = "خطایی در ارتباط با دستیار رخ داد.";
      if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
          errorMessageText = "محدودیت استفاده از API چت هوش مصنوعی اعمال شده است. لطفاً بعداً امتحان کنید.";
          showToast(toPersianDigits(errorMessageText), "error"); 
      }
      setChatMessages(prev => [...prev, { id: `m${Date.now() + 1}`, text: toPersianDigits(errorMessageText), sender: 'ai', timestamp: Date.now() }]);
    } finally {
      setIsAiChatLoading(false);
    }
  };

  const handleGenerateDailyInsight = async () => {
    if(!ai) { showToast("کلید API هوش مصنوعی یافت نشد.", "error"); return; }
    setIsDailyInsightLoading(true);
    setDailyInsight(null);
    try {
      const prompt = "یک بینش یا نکته کوتاه و الهام‌بخش برای کاربر در شروع روز به زبان فارسی ارائه بده.";
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
      });
      setDailyInsight(response.text || "امروز روز خوبی برای شروعی دوباره است!");
    } catch (error: any) {
      console.error("Daily Insight Error:", error);
      if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
        showToast("محدودیت استفاده از API برای بینش روزانه اعمال شده است.", "error");
        setDailyInsight("محدودیت API. لطفاً بعداً دوباره امتحان کنید.");
      } else {
        setDailyInsight("خطا در دریافت بینش روزانه.");
      }
    } finally {
      setIsDailyInsightLoading(false);
    }
  };
  
  const handleAISuggestionFeedback = (suggestionId: string, feedback: 'accepted' | 'declined') => {
    setSuggestionCardStates(prev => ({ ...prev, [suggestionId]: { ...prev[suggestionId], feedbackIcon: feedback } }));
    
    setTimeout(() => {
      setSuggestionCardStates(prev => ({ ...prev, [suggestionId]: { ...prev[suggestionId], visible: false } }));
      if (feedback === 'accepted') {
          showToast(toPersianDigits("پیشنهاد پذیرفته شد."), 'success');
      } else {
          showToast(toPersianDigits("پیشنهاد رد شد."), 'info');
      }
    }, 1200);
  };

  const handleShowXAI = (title: string, explanation: string) => {
    setXaiModalContent({ title, explanation });
    setXaiModalOpen(true);
  };
  
  const handleToggleTaskCompletion = (taskId: string) => {
    setImportantTasksData(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleCompleteHabitToday = (habitId: string) => {
     setTrackedHabitsData(prevHabits =>
      prevHabits.map(habit =>
        habit.id === habitId ? { ...habit, isCompletedToday: true } : habit
      )
    );
  };

  const triggerAutonomousAction = useCallback(async () => {
    if (isLoadingAutonomousAction || autonomousActions.length > 2 || !ai) return; 

    setIsLoadingAutonomousAction(true);
    try {
      const contexts = [
        "کاربر برای ۲ ساعت بدون وقفه روی وظایف تمرکز کرده است.",
        "کاربر در گزارش خلق و خوی خود، احساس خستگی و استرس کرده است.",
        "زمان زیادی از آخرین باری که کاربر آب نوشیده گذشته است.",
        "هوا آفتابی است و کاربر مدت زیادی در داخل خانه بوده است."
      ];
      const randomContext = contexts[Math.floor(Math.random() * contexts.length)];

      const actionTypes = [
        { type: 'meditation', icon: <LightbulbIcon className="w-5 h-5" />, verb: "شروع کرد", xaiKey: "autonomous_meditation" },
        { type: 'break', icon: <ClockIcon className="w-5 h-5" />, verb: "پیشنهاد کرد", xaiKey: "autonomous_break" },
        { type: 'hydration', icon: <HeartIcon className="w-5 h-5" />, verb: "یادآوری کرد", xaiKey: "autonomous_hydration" },
      ];
      const randomActionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];

      const prompt = `با توجه به زمینه: "${randomContext}", یک اقدام خودمختار سلامتی توسط هوش مصنوعی برای کاربر پیشنهاد شده است. نوع اقدام: ${randomActionType.type}. لطفاً یک متن اقدام ("actionText") مناسب به فارسی بنویس که توضیح دهد هوش مصنوعی چه کاری انجام داده یا پیشنهاد داده است (مثلاً "هوش مصنوعی یک جلسه مدیتیشن ۵ دقیقه‌ای برای شما ${randomActionType.verb}.") و یک دلیل ("xaiReason") کوتاه برای این اقدام ارائه بده. پاسخ را به صورت JSON با کلیدهای "actionText" و "xaiReason" برگردان.`;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: AI_MODEL_NAME,
        contents: prompt,
        config: {responseMimeType: "application/json"}
      });
      
      const parsedData = parseJsonFromString<{actionText: string; xaiReason: string}>(response.text);

      if (parsedData && parsedData.actionText && parsedData.xaiReason) {
        const newAction: AIAutonomousAction = {
          id: `auto-action-${Date.now()}`,
          icon: randomActionType.icon,
          actionText: parsedData.actionText,
          xaiReason: parsedData.xaiReason || xaiExplanationsDb[randomActionType.xaiKey] || "هوش مصنوعی این اقدام را برای بهبود سلامتی شما پیشنهاد کرده است.",
          timestamp: new Date().toISOString(),
          cancelActionHandler: () => handleCancelAutonomousAction(`auto-action-${Date.now()}`),
        };
        setAutonomousActions(prev => [newAction, ...prev.slice(0, 2)]); 
        showToast(`اقدام جدید توسط AI: ${toPersianDigits(parsedData.actionText)}`, 'info');
      } else {
        throw new Error("Failed to parse JSON response from AI for autonomous action.")
      }
    } catch (error: any) {
      console.error("Error triggering autonomous action:", error);
       if (error.message && error.message.includes("RESOURCE_EXHAUSTED")) {
        showToast("محدودیت API برای اقدامات خودکار AI.", "error");
      }
    } finally {
      setIsLoadingAutonomousAction(false);
    }
  }, [ai, autonomousActions.length, isLoadingAutonomousAction, showToast]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Math.random() < 0.1) { 
        triggerAutonomousAction();
      }
    }, 30000); 
    return () => clearInterval(intervalId);
  }, [triggerAutonomousAction]);

  const handleCancelAutonomousAction = (actionId: string) => {
    setAutonomousActions(prev => prev.filter(action => action.id !== actionId));
    showToast("اقدام لغو شد.", 'info');
  };

  const handleQuickWellnessAction = (actionType: 'breathing' | 'break' | 'music') => {
    let messageText = ""; 
    switch (actionType) {
      case 'breathing':
        messageText = "تمرین تنفس ۵ دقیقه‌ای شروع شد (شبیه‌سازی شده).";
        break;
      case 'break':
        messageText = " تایمر استراحت ۱۰ دقیقه‌ای فعال شد (شبیه‌سازی شده).";
        break;
      case 'music':
        messageText = "در حال پخش موسیقی تمرکز (شبیه‌سازی شده).";
        break;
    }
    showToast(toPersianDigits(messageText), 'success');
  };

  const handlePredictiveInsightAction = (insight: PredictiveInsightAlert) => {
    if (insight.actionType === 'navigate' && insight.actionTarget) {
      navigateTo(insight.actionTarget as PageName);
    } else if (insight.actionType === 'console') {
      console.log(`Action for insight "${insight.title}": ${insight.actionTarget}`);
      showToast(`اقدام برای "${toPersianDigits(insight.title)}" انجام شد (شبیه‌سازی).`, 'info');
    }
  };


  return (
    <div className="page">
      <WelcomeCard userName={userName} moodText={moodText} lifeScore={lifeScore} />
      
      <div className="mb-6">
        <button 
          onClick={() => setIsHolisticScoreModalOpen(true)} 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3.5 rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all flex items-center justify-center text-sm font-medium"
        >
            <StarIcon className="w-5 h-5 mr-2"/> {toPersianDigits("مشاهده جزئیات امتیاز جامع زندگی")}
        </button>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{toPersianDigits("داشبورد اصلی")}</h3>

      <WidgetCard
        title="روتین‌های سریع سلامتی"
        icon={<HeartIcon className="w-5 h-5 text-pink-600" />}
        titleColorClass="text-pink-700"
        className="border-pink-200/70 mb-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button 
            onClick={() => handleQuickWellnessAction('breathing')}
            className="flex items-center justify-center text-xs py-2 px-3 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-md transition-colors"
          >
            <AdjustmentsVerticalIcon className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0"/> {toPersianDigits("تمرین تنفس")}
          </button>
          <button 
            onClick={() => handleQuickWellnessAction('break')}
            className="flex items-center justify-center text-xs py-2 px-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-md transition-colors"
          >
            <ClockIcon className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0"/> {toPersianDigits("استراحت کوتاه")}
          </button>
          <button 
            onClick={() => handleQuickWellnessAction('music')}
            className="flex items-center justify-center text-xs py-2 px-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md transition-colors"
          >
            <PlayIcon className="w-4 h-4 mr-1.5 rtl:ml-1.5 rtl:mr-0"/> {toPersianDigits("موسیقی تمرکز")}
          </button>
        </div>
      </WidgetCard>

      {autonomousActions.length > 0 && (
        <WidgetCard
            title="اقدامات خودکار AI"
            icon={<ActivityLogIcon className="w-5 h-5 text-cyan-600" />}
            titleColorClass="text-cyan-700"
            className="border-cyan-200/70 mb-6"
        >
            <div className="space-y-3">
                {autonomousActions.map(action => (
                    <AutonomousActionCard 
                        key={action.id} 
                        action={action} 
                        onShowXai={(reason) => handleShowXAI(toPersianDigits("دلیل اقدام خودکار AI"), reason)}
                    />
                ))}
            </div>
        </WidgetCard>
      )}

       <WidgetCard title={toPersianDigits("ارتباط حوزه‌های زندگی شما")} icon={<AiSparkleIcon className="w-5 h-5 text-teal-600" />} className="mb-6 border-teal-200/70" titleColorClass="text-teal-700">
        <InterconnectednessGraph domains={domainsData} connections={connectionsData} explanations={correlationExplanations} />
      </WidgetCard>

      <WidgetCard title={toPersianDigits("بینش‌های پیش‌بینی‌کننده AI")} icon={<LightbulbIcon className="w-5 h-5 text-orange-600" />} className="mb-6 border-orange-200/70" titleColorClass="text-orange-700">
        {isLoadingPredictiveInsights ? <LoadingSpinner /> :
          predictiveInsights.length > 0 ? (
            <div className="space-y-3">
              {predictiveInsights.map(insight => (
                <PredictiveInsightCard key={insight.id} insight={insight} onAction={handlePredictiveInsightAction} />
              ))}
            </div>
          ) : <p className="text-xs text-gray-500 text-center">{toPersianDigits("بینش جدیدی برای نمایش وجود ندارد.")}</p>
        }
      </WidgetCard>
      
      <WidgetCard title={toPersianDigits("خوراک محتوای شخصی‌سازی شده")} icon={<BookIcon className="w-5 h-5 text-lime-600" />} className="mb-6 border-lime-200/70" titleColorClass="text-lime-700">
        {isLoadingContentFeed ? <LoadingSpinner /> :
          contentFeedItems.length > 0 ? (
            <div className="flex overflow-x-auto space-x-3 space-x-reverse pb-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
              {contentFeedItems.map(item => (
                <ContentFeedCard key={item.id} item={item} />
              ))}
            </div>
          ) : <p className="text-xs text-gray-500 text-center">{toPersianDigits("محتوای جدیدی برای نمایش وجود ندارد.")}</p>
        }
      </WidgetCard>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <WidgetCard 
            title="اهداف برتر" 
            icon={<GoalsWidgetIcon className="w-5 h-5 text-blue-600"/>} 
            titleColorClass="text-blue-700"
            onViewAllClick={() => navigateTo('Goals')}
            className="border-blue-200/70"
        >
          {topGoalsData.map(goal => (
            <GoalProgressItem 
                key={goal.id} 
                title={goal.title} 
                progress={goal.progress} 
                icon={goal.category === "یادگیری" ? <BookIcon className="w-3.5 h-3.5"/> : goal.category === "سلامتی" ? <HeartIcon className="w-3.5 h-3.5"/> : <WalletIcon className="w-3.5 h-3.5"/>}
            />
          ))}
        </WidgetCard>

        <WidgetCard 
            title="وظایف مهم امروز" 
            icon={<TasksWidgetIcon className="w-5 h-5 text-indigo-600"/>} 
            titleColorClass="text-indigo-700"
            onViewAllClick={() => navigateTo('Tasks')}
            className="border-indigo-200/70"
        >
            {importantTasksData.map(task => (
                <TaskDashboardItem 
                    key={task.id}
                    id={task.id}
                    title={task.title} 
                    priority={task.priority}
                    isCompleted={task.completed}
                    onToggle={handleToggleTaskCompletion}
                />
            ))}
        </WidgetCard>

        <WidgetCard 
            title="عادات در حال پیگیری" 
            icon={<HabitsWidgetIcon className="w-5 h-5 text-purple-600"/>} 
            titleColorClass="text-purple-700"
            onViewAllClick={() => navigateTo('Habits')} 
            className="md:col-span-2 border-purple-200/70"
        >
             {trackedHabitsData.map(habit => (
                <HabitDashboardItem 
                    key={habit.id}
                    id={habit.id}
                    title={habit.title}
                    weeklyProgressText={habit.weeklyProgressText}
                    isCompletedToday={habit.isCompletedToday}
                    onComplete={handleCompleteHabitToday}
                />
             ))}
        </WidgetCard>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full flex items-center justify-center mb-3 shadow-lg">
          <AiSparkleIcon className="w-12 h-12 text-indigo-600" />
        </div>
        <p className="text-md font-medium text-gray-700 mb-3">{toPersianDigits("با دستیار هوش مصنوعی خود صحبت کنید:")}</p>

        <div className="w-full flex flex-col h-72 bg-white rounded-xl shadow-lg p-3 mb-4 border border-gray-200/80">
            <div id="ai-chat-messages" className="chat-messages-container flex-grow overflow-y-auto p-2 space-y-2.5">
                {chatMessages.map(msg => (
                    <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'user' : ''}`}>
                        {toPersianDigits(msg.text)}
                    </div>
                ))}
                {isAiChatLoading && <div className="chat-message"><LoadingSpinner size="sm" color="text-indigo-600" /></div>}
                <div ref={chatMessagesEndRef} />
            </div>
            <div className="relative mt-auto pt-2.5 border-t border-gray-200/80">
                <input 
                    type="text" 
                    id="ai-chat-input" 
                    placeholder={toPersianDigits("پیام خود را بنویسید...")}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isAiChatLoading && handleSendChatMessage()}
                    className="w-full p-3 pl-12 rtl:pr-12 rtl:pl-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 shadow-sm text-sm"
                />
                <button onClick={handleSendChatMessage} disabled={isAiChatLoading || !chatInput.trim()} className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 mt-1 text-indigo-500 hover:text-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    <PaperAirplaneIcon className="w-6 h-6 transform rtl:scale-x-[-1]" />
                </button>
            </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <button 
            onClick={handleGenerateDailyInsight} 
            disabled={isDailyInsightLoading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3.5 rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all w-full flex items-center justify-center disabled:opacity-70 text-sm font-medium">
          {isDailyInsightLoading ? (
            <LoadingSpinner size="sm" color="text-white"/>
          ) : (
            <>
              <span className="ml-2 rtl:mr-2 rtl:ml-0">{toPersianDigits("✨ دریافت بینش روزانه")}</span>
              <StarIcon className="w-5 h-5" />
            </>
          )}
        </button>
        {dailyInsight && (
            <div id="daily-insight-output" className={`bg-purple-50 p-4 rounded-xl shadow-md border border-purple-200/80 mt-4 w-full`}>
                <h3 className="font-semibold text-purple-700 mb-2 text-sm">{toPersianDigits("بینش روزانه شما:")}</h3>
                <p id="daily-insight-text" className="text-gray-700 text-sm leading-relaxed">{toPersianDigits(dailyInsight)}</p>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {aiSuggestionsData.filter(sugg => suggestionCardStates[sugg.id]?.visible).map(sugg => (
          <div 
            key={sugg.id} 
            id={`ai-suggestion-card-${sugg.id}`} 
            className={`bg-indigo-50 p-4 rounded-xl shadow-md border border-indigo-200/80 suggestion-card ${!suggestionCardStates[sugg.id]?.visible ? 'suggestion-card-fade-out' : ''}`}
            >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-indigo-700 text-sm flex items-center"><AiSparkleIcon className="w-4 h-4 text-yellow-500 ml-1.5 rtl:mr-1.5 rtl:ml-0"/>{toPersianDigits("پیشنهاد هوش مصنوعی:")}</h3>
              <button 
                className="text-indigo-500 hover:text-indigo-700 transition-colors disabled:opacity-50" 
                onClick={() => handleShowXAI(toPersianDigits("توضیح پیشنهاد AI"), xaiExplanationsDb[sugg.xaiRationaleKey] || "توضیح در دسترس نیست.")}
                disabled={!!suggestionCardStates[sugg.id]?.feedbackIcon}
                 aria-label={toPersianDigits("چرا این پیشنهاد؟")}
              >
                <LightbulbIcon className="w-5 h-5"/>
              </button>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{toPersianDigits(sugg.text)}</p>
            <div className="flex justify-end gap-2 mt-3.5 pt-2.5 border-t border-indigo-200/50">
            {!suggestionCardStates[sugg.id]?.feedbackIcon ? (
                <>
                    <button className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-md hover:bg-green-600 transition-colors flex items-center" onClick={() => handleAISuggestionFeedback(sugg.id, 'accepted')}>
                       <span className={`suggestion-button-feedback accepted ${suggestionCardStates[sugg.id]?.feedbackIcon === 'accepted' ? 'show' : ''}`}>✅</span>
                       {toPersianDigits("پذیرش")}
                    </button>
                    <button className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors flex items-center" onClick={() => handleAISuggestionFeedback(sugg.id, 'declined')}>
                        <span className={`suggestion-button-feedback declined ${suggestionCardStates[sugg.id]?.feedbackIcon === 'declined' ? 'show' : ''}`}>❌</span>
                        {toPersianDigits("رد")}
                    </button>
                </>
            ) : (
                <span className={`text-xs font-medium flex items-center px-3 py-1.5 rounded-md ${suggestionCardStates[sugg.id]?.feedbackIcon === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {suggestionCardStates[sugg.id]?.feedbackIcon === 'accepted' ? <CheckCircleIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> : <XCircleIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/>}
                    {toPersianDigits(suggestionCardStates[sugg.id]?.feedbackIcon === 'accepted' ? "پذیرفته شد" : "رد شد")}
                </span>
            )}
            </div>
          </div>
        ))}
      </div>
      
      <XAIModal isOpen={xaiModalOpen} onClose={() => setXaiModalOpen(false)} title={xaiModalContent.title}>
          <p className="text-sm text-gray-700 leading-relaxed">{toPersianDigits(xaiModalContent.explanation)}</p>
      </XAIModal>
      {toastMessage && (
        <ToastNotification
          message={toastMessage.text}
          type={toastMessage.type}
          isVisible={!!toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
      <HolisticScoreDetailModal 
        isOpen={isHolisticScoreModalOpen} 
        onClose={() => setIsHolisticScoreModalOpen(false)}
        overallScore={lifeScore}
        domainScoresData={domainScores}
      />
    </div>
  );
};

export default DashboardPage;
```
  </change>
</changes>```