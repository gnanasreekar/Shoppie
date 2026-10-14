// Core Enums
export type UserRole =
  | 'SUPER_ADMIN'
  | 'OPERATIONS_ADMIN'
  | 'SUPPORT_EXECUTIVE'
  | 'FINANCE_ADMIN'
  | 'MERCHANT_OWNER'
  | 'STORE_MANAGER'
  | 'CASHIER'
  | 'INVENTORY_MANAGER'
  | 'SALES_EMPLOYEE'
  | 'CUSTOMER'
  | 'DELIVERY_PARTNER'
  | 'GUEST';

export type MerchantStatus =
  | 'PENDING_VERIFICATION'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'REJECTED'
  | 'CLOSED';

export type StoreStatus = 'DRAFT' | 'ACTIVE' | 'TEMPORARILY_CLOSED' | 'CLOSED';

export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED' | 'OUT_OF_STOCK';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'ACCEPTED_BY_MERCHANT'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentMethod = 'COD' | 'UPI' | 'CARD' | 'NETBANKING' | 'WALLET';
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type DeliveryMethod = 'STORE_PICKUP' | 'MERCHANT_DELIVERY' | 'PLATFORM_DELIVERY';
export type DeliveryStatus = 'PENDING' | 'ASSIGNED' | 'PICKED_UP' | 'DELIVERED' | 'FAILED';

// Entity Interfaces
export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MerchantSettings {
  id: string;
  merchantId: string;
  codEnabled: boolean;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  deliveryRadiusKm: number;
  autoAcceptOrders: boolean;
  aiMonthlyTokenLimit: number;
  aiUsedTokens: number;
  pincodesServed: string[];
}

export interface Merchant {
  id: string;
  ownerId: string;
  businessName: string;
  tradeName?: string;
  gstin?: string;
  contactEmail?: string;
  contactPhone: string;
  status: MerchantStatus;
  category: string;
  rating: number;
  reviewCount: number;
  settings?: MerchantSettings;
  stores?: Store[];
  createdAt: string;
}

export interface Store {
  id: string;
  merchantId: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  status: StoreStatus;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
  deliveryAvailable: boolean;
  pickupAvailable: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  parentId?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  title: string; // e.g. "500g", "1kg", "Red", "Blue"
  sku: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
}

export interface Product {
  id: string;
  merchantId: string;
  merchantName?: string;
  storeId?: string;
  categoryId: string;
  categoryName?: string;
  name: string;
  slug: string;
  description?: string;
  basePrice: number;
  salePrice?: number;
  costPrice?: number;
  unit: string; // e.g. "kg", "pack", "piece", "item"
  sku: string;
  barcode?: string;
  status: ProductStatus;
  featured: boolean;
  images: string[];
  stockQuantity: number;
  lowStockThreshold: number;
  variants?: ProductVariant[];
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  productSlug: string;
  merchantId: string;
  merchantName: string;
  variantId?: string;
  variantTitle?: string;
  unitPrice: number;
  quantity: number;
  itemTotal: number;
}

export interface Cart {
  merchantId?: string;
  merchantName?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  variantTitle?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  merchantId: string;
  merchantName: string;
  storeId?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryMethod: DeliveryMethod;
  deliveryStatus: DeliveryStatus;
  deliveryAddress: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// AI Assistant & LLM Configuration (OpenAI-compatible & user-budget configurable)
export interface AIProviderConfig {
  providerName: string; // "OpenAI", "Groq", "Ollama", "Together", "DeepSeek", "Custom"
  baseUrl: string; // default e.g. "https://api.openai.com/v1"
  apiKey?: string;
  model: string; // e.g. "gpt-4o-mini", "llama-3.3-70b-versatile", "mistral-small"
  temperature: number;
  maxTokens: number;
}

export interface AIBudgetSettings {
  monthlyBudgetInr: number; // e.g. 500, 1000, 5000 INR
  estimatedCostPer1kTokensInr: number;
  maxTokensPerQuery: number;
  allowAutonomousTools: boolean;
  alertThresholdPercent: number; // e.g. 80%
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string; payload?: Record<string, unknown> }[];
}

export interface AIConversation {
  id: string;
  merchantId?: string;
  customerId?: string;
  context: 'SHOPPING_ASSISTANT' | 'MERCHANT_COPILOT' | 'PLATFORM_SUPPORT';
  messages: AIMessage[];
}

// Subscription Plans
export interface SubscriptionPlan {
  id: string;
  name: string; // 'Free' | 'Basic' | 'Professional' | 'Premium'
  monthlyPriceInr: number;
  maxProducts: number;
  maxOrdersPerMonth: number;
  maxEmployees: number;
  aiQueriesPerMonth: number;
  features: string[];
  isPopular?: boolean;
}

// Platform Config
export interface PlatformConfig {
  platformName: string;
  defaultTown: string;
  defaultPincode: string;
  supportedPincodes: string[];
  platformCommissionPercent: number;
  featureFlags: {
    enableAIAssistant: boolean;
    enableMultiMerchantCart: boolean;
    enableMerchantSubscriptions: boolean;
    enableCashOnDelivery: boolean;
    enableTeluguLanguage: boolean;
  };
}
