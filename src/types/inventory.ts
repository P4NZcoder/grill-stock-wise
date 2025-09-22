export interface InventoryItem {
  id: string;
  name: string;
  category: 'fresh' | 'vegetables' | 'others';
  currentStock: number;
  minStock: number;
  unit: string;
}

export interface InventoryCategory {
  id: string;
  name: string;
  icon: string;
  items: InventoryItem[];
}