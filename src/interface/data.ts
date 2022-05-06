export interface Data {
  date_closed: string;
  zone: string;
  waiter: string;
  cashier: string;
  products: Product[];
  diners: number;
  date_opened: string;
  table: number;
  total: number;
  id: string;
  payments: Payment[];
}

export interface Product {
  category: string;
  price: number;
  name: string;
  quantity: number;
}

export interface Payment {
  amount: number;
  type: string;
}
