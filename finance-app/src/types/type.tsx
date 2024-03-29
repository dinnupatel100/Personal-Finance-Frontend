
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ICategory {
  category: string;
}

export interface ICategoryAmount { 
  category: string;
  amount: number;
}

export interface ITransaction {
  id : number;
  category: string;
  amount: number;
  description: string;
  date: string;
  tag: string;
  transaction_id: number;
}