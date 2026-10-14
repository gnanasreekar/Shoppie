import type { Cart, CartItem, Product } from '@shoppie/shared';

const CART_STORAGE_KEY = 'shoppie_cart_v1';

export function getCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], subtotal: 0, deliveryFee: 0, discount: 0, total: 0 };
  }
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return { items: [], subtotal: 0, deliveryFee: 0, discount: 0, total: 0 };
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse cart:', e);
    return { items: [], subtotal: 0, deliveryFee: 0, discount: 0, total: 0 };
  }
}

export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('shoppie-cart-updated', { detail: cart }));
}

export function addToCart(product: Product, quantity = 1): { success: boolean; message: string; cart: Cart } {
  const currentCart = getCart();

  // Enforce single-merchant cart policy for MVP simplicity
  if (currentCart.items.length > 0 && currentCart.merchantId && currentCart.merchantId !== product.merchantId) {
    return {
      success: false,
      message: `Your cart already contains items from "${currentCart.merchantName || 'another store'}". Please complete that order or clear your cart first.`,
      cart: currentCart,
    };
  }

  const existingIndex = currentCart.items.findIndex((item) => item.productId === product.id);
  const effectivePrice = product.salePrice ?? product.basePrice;

  if (existingIndex > -1) {
    currentCart.items[existingIndex].quantity += quantity;
    currentCart.items[existingIndex].itemTotal =
      currentCart.items[existingIndex].quantity * currentCart.items[existingIndex].unitPrice;
  } else {
    const newItem: CartItem = {
      id: `ci_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      productId: product.id,
      productName: product.name,
      productImage: product.images[0] || '',
      productSlug: product.slug,
      merchantId: product.merchantId,
      merchantName: product.merchantName || 'Local Merchant',
      unitPrice: effectivePrice,
      quantity: quantity,
      itemTotal: effectivePrice * quantity,
    };
    currentCart.items.push(newItem);
  }

  currentCart.merchantId = product.merchantId;
  currentCart.merchantName = product.merchantName || 'Local Merchant';

  // Recalculate totals
  currentCart.subtotal = currentCart.items.reduce((sum, item) => sum + item.itemTotal, 0);
  
  // Standard local delivery fee rule: free above ₹499, otherwise ₹30
  currentCart.deliveryFee = currentCart.subtotal >= 499 ? 0 : 30;
  currentCart.discount = 0;
  currentCart.total = currentCart.subtotal + currentCart.deliveryFee - currentCart.discount;

  saveCart(currentCart);
  return { success: true, message: `Added "${product.name}" to cart!`, cart: currentCart };
}

export function updateItemQuantity(productId: string, quantity: number): Cart {
  const currentCart = getCart();
  if (quantity <= 0) {
    currentCart.items = currentCart.items.filter((item) => item.productId !== productId);
  } else {
    const item = currentCart.items.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      item.itemTotal = item.quantity * item.unitPrice;
    }
  }

  if (currentCart.items.length === 0) {
    currentCart.merchantId = undefined;
    currentCart.merchantName = undefined;
    currentCart.subtotal = 0;
    currentCart.deliveryFee = 0;
    currentCart.total = 0;
  } else {
    currentCart.subtotal = currentCart.items.reduce((sum, item) => sum + item.itemTotal, 0);
    currentCart.deliveryFee = currentCart.subtotal >= 499 ? 0 : 30;
    currentCart.total = currentCart.subtotal + currentCart.deliveryFee - currentCart.discount;
  }

  saveCart(currentCart);
  return currentCart;
}

export function clearCart(): Cart {
  const emptyCart: Cart = { items: [], subtotal: 0, deliveryFee: 0, discount: 0, total: 0 };
  saveCart(emptyCart);
  return emptyCart;
}
