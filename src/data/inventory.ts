import { InventoryItem } from '../types/inventory';

export const mockInventoryData: InventoryItem[] = [
  // Fresh meat items
  { id: '1', name: 'หมูสามชั้น', category: 'fresh', currentStock: 5, minStock: 4, unit: 'กก.' },
  { id: '2', name: 'หมูสันนอก', category: 'fresh', currentStock: 3, minStock: 4, unit: 'กก.' },
  { id: '3', name: 'เนื้อสันใน', category: 'fresh', currentStock: 6, minStock: 3, unit: 'กก.' },
  { id: '4', name: 'ไก่สันใน', category: 'fresh', currentStock: 2, minStock: 4, unit: 'กก.' },
  { id: '5', name: 'กุ้งแช่แข็ง', category: 'fresh', currentStock: 8, minStock: 5, unit: 'กก.' },
  { id: '6', name: 'ปลาหมึก', category: 'fresh', currentStock: 4, minStock: 3, unit: 'กก.' },
  { id: '7', name: 'ไส้กรอกญี่ปุ่น', category: 'fresh', currentStock: 12, minStock: 6, unit: 'แพ็ค' },
  { id: '8', name: 'เบคอน', category: 'fresh', currentStock: 3, minStock: 4, unit: 'แพ็ค' },

  // Vegetables
  { id: '9', name: 'กะหล่ำปลี', category: 'vegetables', currentStock: 15, minStock: 8, unit: 'หัว' },
  { id: '10', name: 'ผักกาดขาว', category: 'vegetables', currentStock: 4, minStock: 6, unit: 'กก.' },
  { id: '11', name: 'มะเขือเทศ', category: 'vegetables', currentStock: 3, minStock: 5, unit: 'กก.' },
  { id: '12', name: 'หอมใหญ่', category: 'vegetables', currentStock: 8, minStock: 4, unit: 'กก.' },
  { id: '13', name: 'พริกแห้ง', category: 'vegetables', currentStock: 2, minStock: 3, unit: 'กก.' },
  { id: '14', name: 'ข้าวโพดหวาน', category: 'vegetables', currentStock: 10, minStock: 5, unit: 'แพ็ค' },
  { id: '15', name: 'เห็ดเข็มทอง', category: 'vegetables', currentStock: 6, minStock: 4, unit: 'แพ็ค' },
  { id: '16', name: 'ถั่วงอก', category: 'vegetables', currentStock: 7, minStock: 3, unit: 'กก.' },

  // Others
  { id: '17', name: 'น้ำจิ้มสุกี้', category: 'others', currentStock: 8, minStock: 5, unit: 'ขวด' },
  { id: '18', name: 'น้ำจิ้มซีฟู้ด', category: 'others', currentStock: 3, minStock: 5, unit: 'ขวด' },
  { id: '19', name: 'น้ำมันหอย', category: 'others', currentStock: 4, minStock: 3, unit: 'ขวด' },
  { id: '20', name: 'ซีอิ๊วขาว', category: 'others', currentStock: 2, minStock: 4, unit: 'ขวด' },
  { id: '21', name: 'น้ำแข็ง', category: 'others', currentStock: 25, minStock: 15, unit: 'ถุง' },
  { id: '22', name: 'ถ่านไฟ', category: 'others', currentStock: 5, minStock: 8, unit: 'ถุง' },
  { id: '23', name: 'กระดาษทิชชู่', category: 'others', currentStock: 12, minStock: 6, unit: 'แพ็ค' },
  { id: '24', name: 'ถ้วยน้ำจิ้ม', category: 'others', currentStock: 45, minStock: 20, unit: 'ใบ' },
];
