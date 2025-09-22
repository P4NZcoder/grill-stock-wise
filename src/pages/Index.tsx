import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { mockInventoryData } from '../data/inventory';
import { InventoryItem } from '../types/inventory';
import Home from './Home';
import ShoppingList from './ShoppingList';
import InventoryManagement from './InventoryManagement';
import StockCheck from './StockCheck';

const Index = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventoryData);

  const handleUpdateStock = (id: string, newStock: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, currentStock: newStock } : item
      )
    );
  };

  const handleUpdateInventory = (newInventory: InventoryItem[]) => {
    setInventory(newInventory);
  };

  return (
    <Routes>
      <Route path="/" element={<Home inventory={inventory} />} />
      <Route 
        path="/shopping-list" 
        element={
          <ShoppingList 
            inventory={inventory} 
            onUpdateInventory={handleUpdateInventory}
          />
        } 
      />
      <Route 
        path="/inventory" 
        element={
          <InventoryManagement 
            inventory={inventory} 
            onUpdateStock={handleUpdateStock}
          />
        } 
      />
      <Route 
        path="/stock-check" 
        element={
          <StockCheck 
            inventory={inventory} 
            onUpdateInventory={handleUpdateInventory}
          />
        } 
      />
    </Routes>
  );
};

export default Index;
