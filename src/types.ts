/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActivePage = 'home' | 'products' | 'packages' | 'guides' | 'services' | 'contact' | 'pos-demo';

export interface BusinessType {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  image: string;
}

export interface PackageFeature {
  name: string;
  free: string | boolean;
  s: string | boolean;
  m: string | boolean;
  l: string | boolean;
  pro: string | boolean;
}

export interface PackageCategory {
  title: string;
  icon?: string;
  features: PackageFeature[];
}

export interface PricingPlan {
  id: 'free' | 's' | 'm' | 'l' | 'pro';
  name: string;
  price: number;
  period: string;
  popular?: boolean;
  badge?: string;
  features: {
    text: string;
    available: boolean;
  }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}

export interface POSItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export interface CartItem {
  product: POSItem;
  quantity: number;
}

export interface OrderRecord {
  orderNo: string;
  items: CartItem[];
  discount: number;
  total: number;
  time: string;
}

