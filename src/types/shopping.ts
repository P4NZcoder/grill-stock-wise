export interface ShoppingListItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  unit: string;
  category: 'fresh' | 'vegetables' | 'others';
  isPurchased: boolean;
  quantityToBuy: number;
}

export interface StockCheckItem {
  id: string;
  name: string;
  category: 'fresh' | 'vegetables' | 'others';
  currentStock: number;
  newStock: number;
  unit: string;
}