import { InventoryItem } from '../types/inventory';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertTriangle, Package, ShoppingCart } from 'lucide-react';

interface StockSummaryProps {
  items: InventoryItem[];
}

export function StockSummary({ items }: StockSummaryProps) {
  const lowStockItems = items.filter(item => item.currentStock <= item.minStock);
  const totalItems = items.length;
  const okItems = totalItems - lowStockItems.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">รายการทั้งหมด</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItems}</div>
          <p className="text-xs text-muted-foreground">วัตถุดิบในระบบ</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">สต๊อกเพียงพอ</CardTitle>
          <div className="h-4 w-4 rounded-full bg-success"></div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{okItems}</div>
          <p className="text-xs text-muted-foreground">วัตถุดิบที่เพียงพอ</p>
        </CardContent>
      </Card>

      <Card className="border-warning bg-warning/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ต้องสั่งซื้อ</CardTitle>
          <AlertTriangle className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">{lowStockItems.length}</div>
          <p className="text-xs text-muted-foreground">วัตถุดิบที่เหลือน้อย</p>
        </CardContent>
      </Card>

      {lowStockItems.length > 0 && (
        <Card className="md:col-span-3 border-warning bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <ShoppingCart className="h-5 w-5" />
              รายการที่ต้องสั่งซื้อ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-background p-3 rounded-lg">
                  <span className="font-medium">{item.name}</span>
                  <div className="text-right">
                    <div className="text-sm text-warning font-medium">
                      เหลือ {item.currentStock} {item.unit}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ต่ำสุด {item.minStock} {item.unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}