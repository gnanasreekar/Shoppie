import { AIProviderConfig, AIBudgetSettings, PlatformConfig, SubscriptionPlan } from '../types';

export const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  platformName: 'Shoppie',
  defaultTown: 'Varni',
  defaultPincode: '503201',
  supportedPincodes: ['503201', '503001', '503002', '503003', '503206', '503186'],
  platformCommissionPercent: 0, // 0% commission for MVP launch in Varni/Nizamabad!
  featureFlags: {
    enableAIAssistant: true,
    enableMultiMerchantCart: false, // Single merchant cart for MVP simplicity
    enableMerchantSubscriptions: true,
    enableCashOnDelivery: true,
    enableTeluguLanguage: true,
  },
};

// Configurable OpenAI-compatible LLM provider defaults
export const DEFAULT_AI_PROVIDER_CONFIG: AIProviderConfig = {
  providerName: 'OpenAI-Compatible (e.g. OpenAI / Groq / Ollama / DeepSeek / Together)',
  baseUrl: 'https://api.openai.com/v1',
  apiKey: '',
  model: 'gpt-4o-mini',
  temperature: 0.7,
  maxTokens: 1024,
};

// Alternative popular preset endpoints that the user can pick or change anytime
export const AI_PROVIDER_PRESETS = [
  {
    name: 'OpenAI (Official)',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o-mini',
    models: ['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'],
  },
  {
    name: 'Groq (Ultra-Fast & Affordable)',
    baseUrl: 'https://api.groq.com/openai/v1',
    defaultModel: 'llama-3.3-70b-versatile',
    models: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'],
  },
  {
    name: 'Ollama (Local / Free / Self-Hosted)',
    baseUrl: 'http://localhost:11434/v1',
    defaultModel: 'llama3:latest',
    models: ['llama3:latest', 'mistral:latest', 'qwen2.5:latest'],
  },
  {
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    defaultModel: 'deepseek-chat',
    models: ['deepseek-chat', 'deepseek-reasoner'],
  },
  {
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    defaultModel: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
    models: ['meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', 'mistralai/Mistral-7B-Instruct-v0.3'],
  },
];

// User-chosen AI budget controls
export const DEFAULT_AI_BUDGET_SETTINGS: AIBudgetSettings = {
  monthlyBudgetInr: 500, // ₹500 default budget for testing
  estimatedCostPer1kTokensInr: 0.05,
  maxTokensPerQuery: 800,
  allowAutonomousTools: true,
  alertThresholdPercent: 80,
};

// Temp Pricing & Subscription Plans (all customizable via admin / DB)
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_free',
    name: 'Free Trial / Starter',
    monthlyPriceInr: 0,
    maxProducts: 50,
    maxOrdersPerMonth: 100,
    maxEmployees: 1,
    aiQueriesPerMonth: 25,
    features: [
      'Digital store with QR code',
      'Up to 50 active products',
      '100 monthly orders',
      'Direct WhatsApp customer notifications',
      'Basic sales reports',
      '25 AI assistant queries/mo',
    ],
  },
  {
    id: 'plan_basic',
    name: 'Basic Merchant',
    monthlyPriceInr: 499,
    maxProducts: 500,
    maxOrdersPerMonth: 999999,
    maxEmployees: 3,
    aiQueriesPerMonth: 150,
    isPopular: true,
    features: [
      'Everything in Starter',
      'Up to 500 products',
      'Unlimited customer orders',
      'Custom delivery zones & fees',
      'Inventory reorder alerts',
      'Multi-staff access (up to 3 staff)',
      '150 AI copilot queries/mo',
    ],
  },
  {
    id: 'plan_pro',
    name: 'Professional Store',
    monthlyPriceInr: 999,
    maxProducts: 2500,
    maxOrdersPerMonth: 999999,
    maxEmployees: 10,
    aiQueriesPerMonth: 600,
    features: [
      'Everything in Basic',
      'Up to 2,500 products with barcode scan',
      '10 staff accounts with role permissions',
      'Customer credit / Khata ledger',
      'Promotional banners & local offers',
      '600 AI copilot queries/mo',
      'Priority phone & WhatsApp support',
    ],
  },
  {
    id: 'plan_premium',
    name: 'Enterprise / Superstore',
    monthlyPriceInr: 1999,
    maxProducts: 999999,
    maxOrdersPerMonth: 999999,
    maxEmployees: 999,
    aiQueriesPerMonth: 2500,
    features: [
      'Unlimited products & variants',
      'Unlimited staff accounts',
      'Multi-branch store management',
      'Full B2B wholesale orders support',
      'Custom domain support for storefront',
      '2,500 AI copilot queries/mo',
      'Dedicated account manager',
    ],
  },
];
