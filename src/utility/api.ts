import mockBackend from "./mock.json";
import { IOrder } from "./types";

export const getItems = async () => {
  return await new Promise((resolve) => {
    const items = mockBackend.items;
    resolve(items);
  });
};

export const getUserOrders = async (userId: string) => {
  return await new Promise((resolve) => {
    const userOrders = (mockBackend.orders as IOrder[]).filter(
      (order) => order.user_id === userId
    );
    resolve(userOrders);
  });
};
