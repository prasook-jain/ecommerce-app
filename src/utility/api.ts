import mockBackend from "./mock.json";
import { IOrder } from "./types";

export const getItems = async () => {
  return await new Promise((resolve) => {
    const items = mockBackend.itemsHash;
    console.log({ items });
    resolve(items);
  });
};

export const getCategories = async () => {
  return await new Promise((resolve) => {
    const categories = mockBackend.categories;
    resolve(categories);
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

export const login = async (username: string, password: string) => {
  return await new Promise((resolve, reject) => {
    let userMatched = false;
    let userToken;
    mockBackend.users.forEach((user) => {
      if (user.username === username && user.password === password) {
        userMatched = true;
        userToken = user.hash_token;
      }
    });
    if (userMatched) {
      resolve(userToken);
    } else {
      reject("Invalid Credentials");
    }
  });
};
