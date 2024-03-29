import { ITransaction } from "../types/type";

export const handleFilterChange = (value:string ,data:ITransaction[]) => {
  if (!data) {
    return [];
  }
  // Filtering logic
  const currentDate = new Date();
  const filtered = data.filter((item:ITransaction) => {
    const itemDate = new Date(item.date);
    switch(value) {
      case 'week':
        return itemDate >= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
      case 'month':
        return itemDate >= new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
      case 'year':
        return itemDate >= new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
      default:
        return true; // Default to show all data
    }
  });
  return filtered;
}