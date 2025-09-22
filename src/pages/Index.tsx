import { useState } from 'react';
import { mockInventoryData } from '../data/inventory';
import { InventoryItem } from '../types/inventory';
import { CategorySection } from '../components/CategorySection';
import { StockSummary } from '../components/StockSummary';

const Index = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventoryData);

  const handleUpdateStock = (id: string, newStock: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, currentStock: newStock } : item
      )
    );
  };

  const freshItems = inventory.filter(item => item.category === 'fresh');
  const vegetableItems = inventory.filter(item => item.category === 'vegetables');
  const otherItems = inventory.filter(item => item.category === 'others');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ระบบเช็คสต๊อกวัตถุดิบ
          </h1>
          <p className="text-muted-foreground">
            ร้านหมูกระทะ - จัดการวัตถุดิบอย่างมีประสิทธิภาพ
          </p>
        </header>

        <StockSummary items={inventory} />

        <div className="space-y-8">
          <CategorySection
            title="ของสด"
            icon="🥩"
            items={freshItems}
            onUpdateStock={handleUpdateStock}
          />

          <CategorySection
            title="ผัก"
            icon="🥬"
            items={vegetableItems}
            onUpdateStock={handleUpdateStock}
          />

          <CategorySection
            title="อื่นๆ"
            icon="🍯"
            items={otherItems}
            onUpdateStock={handleUpdateStock}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
