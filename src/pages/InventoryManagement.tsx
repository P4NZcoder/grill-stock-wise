import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { InventoryItem } from '../types/inventory';
import { CategorySection } from '../components/CategorySection';

interface InventoryManagementProps {
  inventory: InventoryItem[];
  onUpdateStock: (id: string, newStock: number) => void;
}

export default function InventoryManagement({ inventory, onUpdateStock }: InventoryManagementProps) {
  const navigate = useNavigate();

  const freshItems = inventory.filter(item => item.category === 'fresh');
  const vegetableItems = inventory.filter(item => item.category === 'vegetables');
  const otherItems = inventory.filter(item => item.category === 'others');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            จัดการคลังสินค้า
          </h1>
          <p className="text-muted-foreground">
            แก้ไขและจัดการวัตถุดิบในระบบ
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <CategorySection
          title="ของสด"
          icon="🥩"
          items={freshItems}
          onUpdateStock={onUpdateStock}
        />

        <CategorySection
          title="ผัก"
          icon="🥬"
          items={vegetableItems}
          onUpdateStock={onUpdateStock}
        />

        <CategorySection
          title="อื่นๆ"
          icon="🍯"
          items={otherItems}
          onUpdateStock={onUpdateStock}
        />
      </div>
    </div>
  );
}