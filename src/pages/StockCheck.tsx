import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck } from 'lucide-react';
import { InventoryItem } from '../types/inventory';
import { StockCheckItem } from '../types/shopping';
import { useToast } from '../components/ui/use-toast';

interface StockCheckProps {
  inventory: InventoryItem[];
  onUpdateInventory: (items: InventoryItem[]) => void;
}

export default function StockCheck({ inventory, onUpdateInventory }: StockCheckProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stockItems, setStockItems] = useState<StockCheckItem[]>(
    inventory.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      currentStock: item.currentStock,
      newStock: item.currentStock,
      unit: item.unit
    }))
  );

  const updateNewStock = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setStockItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, newStock: numValue } : item
      )
    );
  };

  const submitStockCheck = () => {
    // อัพเดทข้อมูลสต๊อกในระบบ
    const updatedInventory = inventory.map(item => {
      const stockItem = stockItems.find(s => s.id === item.id);
      if (stockItem) {
        return {
          ...item,
          currentStock: stockItem.newStock
        };
      }
      return item;
    });

    onUpdateInventory(updatedInventory);

    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "อัพเดทข้อมูลสต๊อกทั้งหมดแล้ว",
    });

    navigate('/');
  };

  const categorizedItems = {
    fresh: stockItems.filter(item => item.category === 'fresh'),
    vegetables: stockItems.filter(item => item.category === 'vegetables'),
    others: stockItems.filter(item => item.category === 'others')
  };

  const categoryNames = {
    fresh: 'ของสด 🥩',
    vegetables: 'ผัก 🥬',
    others: 'อื่นๆ 🍯'
  };

  const hasChanges = stockItems.some(item => item.newStock !== item.currentStock);

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
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
            เช็คสต๊อกวัตถุดิบ
          </h1>
          <p className="text-muted-foreground">
            ใส่จำนวนคงเหลือของวัตถุดิบแต่ละรายการ
          </p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {Object.entries(categorizedItems).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                {categoryNames[category as keyof typeof categoryNames]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        เดิม: {item.currentStock} {item.unit}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={item.newStock}
                        onChange={(e) => updateNewStock(item.id, e.target.value)}
                        className="w-20 text-center"
                        min="0"
                        step="0.1"
                      />
                      <span className="text-sm text-muted-foreground min-w-0">
                        {item.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
        <Button
          onClick={submitStockCheck}
          className="w-full"
          disabled={!hasChanges}
        >
          บันทึกข้อมูลสต๊อก
        </Button>
      </div>
    </div>
  );
}