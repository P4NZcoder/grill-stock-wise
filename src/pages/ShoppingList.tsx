import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { InventoryItem } from '../types/inventory';
import { ShoppingListItem } from '../types/shopping';
import { useToast } from '../components/ui/use-toast';

interface ShoppingListProps {
  inventory: InventoryItem[];
  onUpdateInventory: (items: InventoryItem[]) => void;
}

export default function ShoppingList({ inventory, onUpdateInventory }: ShoppingListProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shoppingItems, setShoppingItems] = useState<ShoppingListItem[]>([]);

  useEffect(() => {
    // สร้างรายการซื้อจากวัตถุดิบที่เหลือน้อย
    const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);
    const shoppingList = lowStockItems.map(item => ({
      ...item,
      isPurchased: false,
      quantityToBuy: Math.max(1, item.minStock - item.currentStock + 2) // ซื้อให้เกินค่าขั้นต่ำ 2 หน่วย
    }));
    setShoppingItems(shoppingList);
  }, [inventory]);

  const togglePurchased = (id: string) => {
    setShoppingItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isPurchased: !item.isPurchased } : item
      )
    );
  };

  const confirmPurchases = () => {
    const purchasedItems = shoppingItems.filter(item => item.isPurchased);
    
    if (purchasedItems.length === 0) {
      toast({
        title: "ไม่มีรายการที่เลือก",
        description: "กรุณาเลือกรายการที่ซื้อแล้วก่อนยืนยัน",
        variant: "destructive"
      });
      return;
    }

    // อัพเดทสต๊อกของวัตถุดิบที่ซื้อแล้ว
    const updatedInventory = inventory.map(item => {
      const purchasedItem = purchasedItems.find(p => p.id === item.id);
      if (purchasedItem) {
        return {
          ...item,
          currentStock: item.currentStock + purchasedItem.quantityToBuy
        };
      }
      return item;
    });

    onUpdateInventory(updatedInventory);

    toast({
      title: "อัพเดทสำเร็จ",
      description: `อัพเดทสต๊อกของ ${purchasedItems.length} รายการแล้ว`,
    });

    navigate('/');
  };

  const purchasedCount = shoppingItems.filter(item => item.isPurchased).length;
  const totalItems = shoppingItems.length;

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
            รายการที่ต้องซื้อ
          </h1>
          <p className="text-muted-foreground">
            วัตถุดิบที่เหลือน้อยและต้องสั่งซื้อ
          </p>
        </div>
      </div>

      {shoppingItems.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">ไม่มีรายการที่ต้องซื้อ</h3>
            <p className="text-muted-foreground">วัตถุดิบทั้งหมดมีสต๊อกเพียงพอ</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>สรุปรายการซื้อ</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {purchasedCount}/{totalItems} รายการ
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shoppingItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        item.isPurchased ? 'bg-success/5 border-success/20' : 'bg-card'
                      }`}
                    >
                      <Checkbox
                        checked={item.isPurchased}
                        onCheckedChange={() => togglePurchased(item.id)}
                        className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                      />
                      <div className="flex-1">
                        <div className={`font-medium ${item.isPurchased ? 'line-through text-muted-foreground' : ''}`}>
                          {item.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ซื้อ {item.quantityToBuy} {item.unit} (เหลือ {item.currentStock} {item.unit})
                        </div>
                      </div>
                      {item.isPurchased && (
                        <Check className="h-4 w-4 text-success" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="sticky bottom-4">
            <Button
              onClick={confirmPurchases}
              className="w-full"
              disabled={purchasedCount === 0}
            >
              ยืนยันการซื้อ ({purchasedCount} รายการ)
            </Button>
          </div>
        </>
      )}
    </div>
  );
}