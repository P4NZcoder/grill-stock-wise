import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Package2, ClipboardCheck, AlertTriangle } from 'lucide-react';
import { InventoryItem } from '../types/inventory';

interface HomeProps {
  inventory: InventoryItem[];
}

export default function Home({ inventory }: HomeProps) {
  const navigate = useNavigate();
  
  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);
  const totalItems = inventory.length;
  const freshItems = inventory.filter(item => item.category === 'fresh').length;
  const vegetableItems = inventory.filter(item => item.category === 'vegetables').length;
  const otherItems = inventory.filter(item => item.category === 'others').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          ระบบเช็คสต๊อกวัตถุดิบ
        </h1>
        <p className="text-muted-foreground">
          ร้านหมูกระทะ - จัดการวัตถุดิบอย่างมีประสิทธิภาพ
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* รายการที่ต้องซื้อ */}
        <Card className={lowStockItems.length > 0 ? "border-warning bg-warning/5" : ""}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShoppingCart className="h-5 w-5 text-warning" />
              รายการที่ต้องซื้อ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning mb-2">
              {lowStockItems.length}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              วัตถุดิบที่เหลือน้อย
            </p>
            <Button 
              onClick={() => navigate('/shopping-list')}
              variant="outline"
              className="w-full"
              disabled={lowStockItems.length === 0}
            >
              ดูรายการซื้อ
            </Button>
          </CardContent>
        </Card>

        {/* จำนวนวัตถุดิบทั้งหมด */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package2 className="h-5 w-5 text-primary" />
              คลังสินค้า
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm">ของสด:</span>
                <span className="font-medium">{freshItems} รายการ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">ผัก:</span>
                <span className="font-medium">{vegetableItems} รายการ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">อื่นๆ:</span>
                <span className="font-medium">{otherItems} รายการ</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>รวม:</span>
                  <span>{totalItems} รายการ</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/inventory')}
              variant="outline"
              className="w-full"
            >
              จัดการคลังสินค้า
            </Button>
          </CardContent>
        </Card>

        {/* เช็คสต๊อก */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardCheck className="h-5 w-5 text-success" />
              เช็คสต๊อก
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">
              อัพเดทจำนวนคงเหลือของวัตถุดิบ
            </div>
            <Button 
              onClick={() => navigate('/stock-check')}
              className="w-full"
            >
              เริ่มเช็คสต๊อก
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* แสดงรายการเตือนหากมี */}
      {lowStockItems.length > 0 && (
        <Card className="border-warning bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              แจ้งเตือน: วัตถุดิบเหลือน้อย
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {lowStockItems.slice(0, 6).map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-background p-3 rounded-lg">
                  <span className="font-medium">{item.name}</span>
                  <div className="text-right">
                    <div className="text-sm text-warning font-medium">
                      เหลือ {item.currentStock} {item.unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {lowStockItems.length > 6 && (
              <div className="mt-3 text-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/shopping-list')}
                >
                  ดูทั้งหมด ({lowStockItems.length} รายการ)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}