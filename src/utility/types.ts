export interface IItemDetail {
  id: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  id: string;
  user_id: string;
  order_date: Date;
  total_cost: number;
  item_details: IItemDetail[];
}

export interface ICartItem {
  itemId: string;
  quantity: number;
}

export interface ICart {
  last_update_date: Date;
  items: ICartItem[];
}

export interface IUser {
  type: "guest" | "user";
  email?: string;
  username?: string;
}

export interface IItem {
  id: string;
  name: string;
  price: number;
  desciption: string;
  image_urls: string[];
  categories: string[];
  discount_price: number;
}

export interface IItemsHash {
  [key: string]: IItem;
}

export interface ICategory {
  id: string;
  name: string;
  itemIds: string[];
}

export interface ICategoryHash {
  [key: string]: ICategory;
}
