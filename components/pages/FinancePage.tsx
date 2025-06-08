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
  MagnifyingGlassIcon as SearchIcon, // Corrected: Was SearchIcon, aliased for consistency
  ChevronDownIcon, 
  ChevronUpIcon,
  ChartPieIcon, 
  TargetIcon,
  InformationCircleIcon, // Added
  SparklesIconNav as AiSparklesIcon,
  ListBulletIcon, 
  TrendingUpIcon, 
  DocumentTextIcon,
  AcademicCapIcon, // For Investment Education & GrowingPlantIcon
  ScaleIcon, 
  BuildingOfficeIcon, 
  CalculatorIcon, // Added
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
import DebtListItem, { Debt } from './DebtListItem'; 
import AddSubscriptionModal from '../finance/AddSubscriptionModal';
import SubscriptionListItem, { Subscription } from './SubscriptionListItem'; 

// Phase 3 Imports
import Disclaimer from '../finance/Disclaimer';
import RiskAssessmentModal from '../finance/RiskAssessmentModal';
import { UserRiskProfile } from '../../types/financeTypes'; 
import PortfolioSimulator from '../finance/PortfolioSimulator'; 
import RetirementPlannerModal from '../finance/RetirementPlannerModal';
import NetWorthTracker from '../finance/NetWorthTracker';
import AddAssetModal from '../finance/AddAssetModal';
// AssetListItem is used within NetWorthTracker, already imported if used directly elsewhere
import ReportGeneratorModal from '../finance/ReportGeneratorModal';
import AISmartInsightCard, { SmartInsight } from '../finance/AISmartInsightCard';
import { Asset } from '../../types/financeTypes';


const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';


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
}

export interface FinancialGoal { 
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  description?: string;
  monthlyContribution?: number; 
}

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
  const [isRetirementModalOpen, setIsRetirementModalOpen] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [isReportGeneratorModalOpen, setIsReportGeneratorModalOpen] = useState(false);
  const [lifeOrchestrationInsights, setLifeOrchestrationInsights] = useState<SmartInsight[]>([]);
  const [isLoadingLifeOrchestrationInsights, setIsLoadingLifeOrchestrationInsights] = useState(false);

  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [isLifeInsightsOpen, setIsLifeInsightsOpen] = useState(false);


  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;
  
  const financialLiteracyPath = useMemo(() => learningPaths.find(lp => lp.id === 'lp-fl'), [learningPaths]);
  // Assuming 'cat-invest' is a categoryId for investment-related learning content
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

  const fetchAiSpendingAnalysis = useCallback(async () => {
    if (!ai) { setAiSpendingAnalysis(toPersianDigits("تحلیل هوش مصنوعی در دسترس نیست.")); return; }
    setIsFetchingSpendingAnalysis(true);
    try {
      const currentMonthExpenses = transactions.filter(t => t.type === 'expense' && t.date.startsWith(filterDate || new Date().toISOString().substring(0,7))).map(t => `${t.title}: ${t.amount} تومان`).join('؛ ');
      if (!currentMonthExpenses.trim()) {
         setAiSpendingAnalysis(toPersianDigits("هنوز هزینه قابل توجهی برای تحلیل در این ماه ثبت نشده است."));
         setIsFetchingSpendingAnalysis(false);
         return;
      }
      const prompt = toPersianDigits(`هزینه‌های کاربر در ماه جاری: ${currentMonthExpenses}. یک بینش کوتاه و مفید (حداکثر ۳۰ کلمه) به فارسی در مورد الگوی خرج کردن کاربر ارائه بده.`);
      const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt });
      setAiSpendingAnalysis(response.text || toPersianDigits("تحلیل در دسترس نیست."));
    } catch (error) { setAiSpendingAnalysis(toPersianDigits("خطا در دریافت تحلیل.")); } 
    finally { setIsFetchingSpendingAnalysis(false); }
  }, [ai, transactions, filterDate]);

  const fetchSavingsOpportunities = useCallback(async () => {
    if (!ai) {
      setSavingsOpportunities([{id: 'mock1', title: toPersianDigits("بررسی اشتراک‌های بلااستفاده"), description: toPersianDigits("اشتراک سرویس پخش موسیقی شما در این ماه فقط ۲ بار استفاده شده. لغو آن می‌تواند ماهانه ۱۰۰،۰۰۰ تومان ذخیره کند."), potentialSavings: toPersianDigits("۱۰۰،۰۰۰ تومان ماهانه"), xaiRationale: "این پیشنهاد بر اساس تحلیل الگوی مصرف و شناسایی هزینه‌هایی است که بازدهی کمی برای شما دارند."}]);
      return;
    }
    setIsLoadingSavingsOpportunities(true);
    try {
      const recentExpenses = transactions.filter(t => t.type === 'expense').slice(0, 5).map(t => `${t.title}: ${t.amount}`).join(', ');
      const prompt = toPersianDigits(`با توجه به هزینه‌های اخیر کاربر (${recentExpenses || 'داده‌ای موجود نیست'}) و با فرض اینکه کاربر به دنبال کاهش هزینه‌ها است، ۱ یا ۲ فرصت پس‌انداز به زبان فارسی پیشنهاد بده. هر فرصت باید شامل "title"، "description" (توضیح فرصت)، "potentialSavings" (مبلغ پس‌انداز احتمالی) و "xaiRationale" باشد. پاسخ را به صورت آرایه JSON بده.`);
      const response: GenerateContentResponse = await ai.models.generateContent({ model: AI_MODEL_NAME, contents: prompt, config: {responseMimeType: "application/json"} });
      const data = parseJsonFromString<Omit<SavingsOpportunity, 'id'>[]>(response.text);
      
      if (data) {
        setSavingsOpportunities(data.map((item, index) => ({ ...item, id: `so-${Date.now()}-${index}` })));
      } else {
        throw new Error("Failed to parse JSON response for savings opportunities.");
      }
    } catch (error) { 
        console.error("Error fetching savings opportunities:", error);
        showToast(toPersianDigits("خطا در دریافت فرصت‌های پس‌انداز."), "error"); 
    } 
    finally { setIsLoadingSavingsOpportunities(false); }
  }, [ai, transactions, showToast]);

  // Placeholder for the function, as its definition is not provided
  const fetchLifeOrchestrationInsights = useCallback(async () => {
    setIsLoadingLifeOrchestrationInsights(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLifeOrchestrationInsights([
        { id: 'loi1', title: 'اتصال اهداف مالی به سلامت', text: 'تحقیقات نشان می‌دهد استرس مالی می‌تواند بر سلامت جسمی و روانی تاثیر بگذارد. دستیابی به اهداف مالی می‌تواند به کاهش استرس و بهبود کلی بهزیستی کمک کند.', type: 'interplay', icon: <HeartIcon className="w-5 h-5 text-teal-400"/>, actionText: 'مشاهده اهداف سلامت', onAction: () => navigateTo && navigateTo('Health')},
        { id: 'loi2', title: 'سرمایه‌گذاری روی خودتان', text: 'یادگیری مهارت‌های جدید مالی نه تنها به مدیریت بهتر پول کمک می‌کند، بلکه می‌تواند فرصت‌های درآمدزایی جدیدی ایجاد کند. آیا آماده‌اید دانش مالی خود را افزایش دهید؟', type: 'life_vision', icon: <AcademicCapIcon className="w-5 h-5 text-purple-400"/>, actionText: 'کاوش مسیرهای یادگیری مالی', onAction: () => navigateTo && navigateTo('Learning', { initialFilter: 'مالی' }) }
    ]);
    setIsLoadingLifeOrchestrationInsights(false);
  }, [navigateTo]);


  useEffect(() => { 
    // Load initial data for Phase 1 & 2 features
    const mockTransactions: Transaction[] = [
      { id: 't1', type: 'income', amount: 5000000, date: '1403-04-01', title: 'حقوق ماه تیر', categoryId: 'income_salary' },
      { id: 't2', type: 'expense', amount: 120000, date: '1403-04-03', title: 'ناهار با همکاران', categoryId: 'food' },
      { id: 't3', type: 'expense', amount: 50000, date: '1403-04-05', title: 'شارژ موبایل', categoryId: 'bills' },
    ];
    setTransactions(mockTransactions);

    const mockGoals: FinancialGoal[] = [
        {id: 'fg1', title: toPersianDigits("پس‌انداز برای سفر تابستانی"), targetAmount: 10000000, savedAmount: 2500000, monthlyContribution: 500000},
        {id: 'fg2', title: toPersianDigits("خرید دوره آموزشی آنلاین"), targetAmount: 1500000, savedAmount: 1500000, monthlyContribution: 0},
    ];
    setFinancialGoals(mockGoals);
    
    if (financialLiteracyPath) {
      setContextualLearningSuggestion({
        id: `sugg-finlit-init`,
        type: 'path',
        itemId: financialLiteracyPath.id,
        title: financialLiteracyPath.title,
        description: toPersianDigits(`برای شروع قدرتمند در مدیریت مالی، این مسیر یادگیری می‌تواند به شما کمک کند اصول اولیه را بیاموزید.`),
        sourceModule: 'Finance',
        triggerContext: toPersianDigits("ورود به صفحه مالی"),
      });
    }

    fetchAiSpendingAnalysis(); 
    fetchSavingsOpportunities(); 
    // Phase 3 data fetching
    fetchLifeOrchestrationInsights();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ai, financialLiteracyPath]); // Removed fetchAiSpendingAnalysis, fetchSavingsOpportunities, fetchLifeOrchestrationInsights from deps for initial load

  const handleSaveTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
    };
    if (editingTransaction) {
      setTransactions(prev => prev.map(t => t.id === editingTransaction.id ? newTransaction : t));
      showToast(toPersianDigits("تراکنش با موفقیت ویرایش شد."), "success");
    } else {
      setTransactions(prev => [newTransaction, ...prev]);
      showToast(toPersianDigits("تراکنش جدید با موفقیت اضافه شد."), "success");
    }
    setIsAddTransactionModalOpen(false);
    setEditingTransaction(null);
  };
  const handleEditTransaction = (transaction: Transaction) => { setEditingTransaction(transaction); setIsAddTransactionModalOpen(true); };
  const handleDeleteTransaction = (transactionId: string) => { if(window.confirm(toPersianDigits("آیا از حذف این تراکنش مطمئن هستید؟"))) { setTransactions(prev => prev.filter(t => t.id !== transactionId)); showToast(toPersianDigits("تراکنش حذف شد."), "info"); }};
  
  const handleSaveBudgets = (newBudgets: BudgetSetting[]) => { setBudgets(newBudgets); showToast(toPersianDigits("بودجه‌ها با موفقیت ذخیره شدند."), "success"); };
  
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchCategory = filterCategory === 'all' || transaction.categoryId === filterCategory;
      const matchType = filterType === 'all' || transaction.type === filterType;
      const matchDate = !filterDate || transaction.date.startsWith(filterDate); // YYYY-MM comparison
      const matchSearch = !searchTerm || 
        toPersianDigits(transaction.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (transaction.description && toPersianDigits(transaction.description).toLowerCase().includes(searchTerm.toLowerCase())) ||
        (predefinedCategories.find(c=>c.id === transaction.categoryId)?.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCategory && matchType && matchDate && matchSearch;
    });
  }, [transactions, filterCategory, filterType, filterDate, searchTerm]);

  const uniqueMonths = useMemo(() => {
    const months = new Set<string>();
    transactions.forEach(t => months.add(t.date.substring(0, 7))); // YYYY-MM
    return Array.from(months).sort().reverse();
  }, [transactions]);

  const currentMonthTransactions = useMemo(() => {
    const targetMonth = filterDate || new Date().toISOString().substring(0, 7);
    return transactions.filter(t => t.date.startsWith(targetMonth));
  }, [transactions, filterDate]);

  const totalIncomeThisMonth = useMemo(() => currentMonthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0), [currentMonthTransactions]);
  const totalExpensesThisMonth = useMemo(() => currentMonthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0), [currentMonthTransactions]);

  const topExpensesThisMonth = useMemo(() => {
    const expenseSummary: Record<string, number> = {};
    currentMonthTransactions.filter(t => t.type === 'expense').forEach(t => {
      expenseSummary[t.categoryId] = (expenseSummary[t.categoryId] || 0) + t.amount;
    });
    return Object.entries(expenseSummary)
      .map(([categoryId, amount]) => ({ categoryId, amount, categoryName: predefinedCategories.find(c => c.id === categoryId)?.name || 'نامشخص' }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [currentMonthTransactions]);

  const financialHealthScore = useMemo(() => {
    if (totalIncomeThisMonth === 0 && totalExpensesThisMonth === 0) return 50; // Neutral if no data
    if (totalIncomeThisMonth === 0) return Math.max(0, 20 - Math.floor(totalExpensesThisMonth / 100000)); // Penalize expenses with no income
    
    const ratio = totalExpensesThisMonth / totalIncomeThisMonth;
    if (ratio <= 0.5) return Math.min(100, 80 + Math.floor((0.5 - ratio) * 40)); // Score 80-100 for low expense ratio
    if (ratio <= 0.8) return Math.min(79, 60 + Math.floor((0.8 - ratio) * 60)); // Score 60-79 for medium ratio
    if (ratio <= 1) return Math.min(59, 40 + Math.floor((1 - ratio) * 100)); // Score 40-59 for high ratio
    return Math.max(0, 39 - Math.floor((ratio - 1) * 50)); // Score < 40 if expenses exceed income
  }, [totalIncomeThisMonth, totalExpensesThisMonth]);

  // Return a placeholder JSX element
  return (
    <div className="page bg-finance-page">
      <header className="text-center mb-6 p-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-b-xl shadow-lg text-white">
        <PageIcon className="w-10 h-10 mx-auto mb-2" />
        <h1 className="text-xl font-bold">{toPersianDigits("مدیریت مالی هوشمند")}</h1>
        <p className="text-xs opacity-90">{toPersianDigits(`سلام ${userName}، به مرکز مالی خود خوش آمدید. ${aiAssistantName} در کنار شماست.`)}</p>
      </header>
      <p className="text-center text-gray-500">{toPersianDigits("محتوای صفحه مالی در اینجا نمایش داده خواهد شد.")}</p>
      {/* You can add more detailed structure here based on your actual page content */}
      {/* For example, listing transactions, budgets, goals, etc. */}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          isVisible={!!toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

// Note: No default export, as App.tsx uses named import: import { FinancePage } from ...
// This is correct based on the current structure.
// If a default export was intended, it would be: export default FinancePage;
// However, keeping it as a named export to match App.tsx.