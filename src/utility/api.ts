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
    let userObj: any = "";
    mockBackend.users.forEach((user) => {
      if (user.username === username && user.password === password) {
        userMatched = true;
        userObj = {
          id: user.id,
          email: user.email,
          name: user.username,
          hash_token: user.hash_token,
        };
      }
    });
    if (userMatched) {
      resolve(userObj);
    } else {
      reject("Invalid Credentials");
    }
  });
};

export const isUserValid = async (user_token: string) => {
  return await new Promise((resolve, reject) => {
    const isValidUser = mockBackend.users.some(
      (user) => user.hash_token === user_token
    );
    resolve(isValidUser);
  });
};
