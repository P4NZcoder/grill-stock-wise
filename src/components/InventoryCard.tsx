import { useState } from 'react';
import { Minus, Plus, AlertTriangle } from 'lucide-react';
import { InventoryItem } from '../types/inventory';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { cn } from '../lib/utils';

interface InventoryCardProps {
  item: InventoryItem;
  onUpdateStock: (id: string, newStock: number) => void;
}

export function InventoryCard({ item, onUpdateStock }: InventoryCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isLowStock = item.currentStock <= item.minStock;

  const handleUpdateStock = async (change: number) => {
    const newStock = Math.max(0, item.currentStock + change);
    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onUpdateStock(item.id, newStock);
      setIsUpdating(false);
    }, 200);
  };

  return (
    <Card className={cn(
      "relative transition-all duration-200 hover:shadow-md",
      isLowStock && "border-warning bg-warning/5"
    )}>
      {isLowStock && (
        <div className="absolute -top-2 -right-2 bg-warning text-warning-foreground rounded-full p-1">
          <AlertTriangle className="h-4 w-4" />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>ต่ำสุด: {item.minStock} {item.unit}</span>
          <span className={cn(
            "font-medium",
            isLowStock ? "text-warning" : "text-success"
          )}>
            {isLowStock ? "เหลือน้อย" : "เพียงพอ"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className={cn(
              "text-2xl font-bold",
              isLowStock ? "text-warning" : "text-foreground"
            )}>
              {item.currentStock}
            </div>
            <div className="text-xs text-muted-foreground">{item.unit}</div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpdateStock(-1)}
              disabled={isUpdating || item.currentStock <= 0}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpdateStock(1)}
              disabled={isUpdating}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}