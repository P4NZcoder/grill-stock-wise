import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Package2, ClipboardCheck } from 'lucide-react';

export function AppNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/shopping-list') return 'shopping';
    if (location.pathname === '/inventory') return 'inventory';
    if (location.pathname === '/stock-check') return 'check';
    return 'home';
  };

  const handleTabChange = (value: string) => {
    switch (value) {
      case 'home':
        navigate('/');
        break;
      case 'shopping':
        navigate('/shopping-list');
        break;
      case 'inventory':
        navigate('/inventory');
        break;
      case 'check':
        navigate('/stock-check');
        break;
    }
  };

  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4">
        <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-14">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">หน้าแรก</span>
            </TabsTrigger>
            <TabsTrigger value="shopping" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">รายการซื้อ</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package2 className="h-4 w-4" />
              <span className="hidden sm:inline">คลังสินค้า</span>
            </TabsTrigger>
            <TabsTrigger value="check" className="flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4" />
              <span className="hidden sm:inline">เช็คสต๊อก</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}