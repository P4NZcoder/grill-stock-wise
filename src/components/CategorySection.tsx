import { InventoryItem } from '../types/inventory';
import { InventoryCard } from './InventoryCard';

interface CategorySectionProps {
  title: string;
  icon: string;
  items: InventoryItem[];
  onUpdateStock: (id: string, newStock: number) => void;
}

export function CategorySection({ title, icon, items, onUpdateStock }: CategorySectionProps) {
  const lowStockCount = items.filter(item => item.currentStock <= item.minStock).length;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <span className="text-sm text-muted-foreground">({items.length} รายการ)</span>
        </div>
        {lowStockCount > 0 && (
          <div className="bg-warning text-warning-foreground px-3 py-1 rounded-full text-sm font-medium">
            เหลือน้อย {lowStockCount} รายการ
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            onUpdateStock={onUpdateStock}
          />
        ))}
      </div>
    </section>
  );
}