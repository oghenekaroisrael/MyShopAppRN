// import axios from 'axios';
import axios from '../helpers/axios';
import {
  ICategory,
  IDelivery,
  IDeliveryArea,
  IDeliveryFare,
  IReview,
  IDeliveryImage,
  ISale,
  IShopItem,
  IExpense,
  IPayout,
  INewShopItem,
  ISaleRequest,
  IShop,
  IBank,
  ILogoBank,
  IBankRequest,
} from '../types';

const baseURL = 'http://localhost:8080';

export const countShops = async (user_id: number) => {
  try {
    const res = await axios.get(`/users/shops/count/${user_id}`);

    const payload = res.data;
    console.log(payload);
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const fetchSalesHistory = async (
  page: number,
  size: number,
  user: number,
) => {
  try {
    let query = `page_id=${page}&page_size=${size}&user_id=${user}`;
    const res = await axios.get(`/users/shops/sales/user?${query}`);
    const payload: ISale[] = res.data;
    // console.log(payload);
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const fetchShopInventory = async (
  page: number,
  size: number,
  shop?: number,
) => {
  try {
    let query = `page_id=${page}&page_size=${size}&shop_id=${shop}`;
    const res = await axios.get(`/users/shops/inventory?${query}`);
    const payload: IShopItem[] = res.data;
    console.log(payload);
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const fetchExpenses = async (
  page: number,
  size: number,
  shop?: number,
) => {
  try {
    let query = `page_id=${page}&page_size=${size}&shop_id=${shop}`;
    const res = await axios.get(`/users/shops/expenses?${query}`);
    const payload: IExpense[] = res.data;
    console.log(payload);
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const fetchPayouts = async (
  page: number,
  size: number,
  shop: number,
) => {
  try {
    let query = `page_id=${page}&page_size=${size}&shop_id=${shop}`;
    const res = await axios.get(`/users/shops/payouts?${query}`);
    const payload: IPayout[] = res.data;
    console.log(payload);
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const fetchSales = async (page: number, size: number, shop?: number) => {
  try {
    let query = `page_id=${page}&page_size=${size}&shop_id=${shop}`;
    const res = await axios.get(`/users/shops/sales?${query}`);
    const payload: ISale[] = res.data;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const fetchShops = async (page: number, size: number, user: number) => {
  try {
    let query = `page_id=${page}&page_size=${size}&user_id=${user}`;
    const res = await axios.get(`/users/shops?${query}`);
    const payload: IShop[] = res.data;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const fetchBanks = async (page: number, size: number, shop?: number) => {
  try {
    let query = `page_id=${page}&page_size=${size}&shop_id=${shop}`;
    const res = await axios.get(`/users/shops/banks?${query}`);
    const payload: IBank[] = res.data;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const bankLists = async () => {
  try {
    const res = await axios.get('https://nigerianbanks.xyz');
    const payload: ILogoBank[] = res.data;
    return {payload};
  } catch (error) {
    return {error};
  }
};

export const fetchCategories = async () => {
  try {
    const res = await axios.get('/categories');
    const payload: any[] = res.data.payload;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const fetchProducts = async (categoryId: number) => {
  try {
    const res = await axios.get(`/products/${categoryId}`);
    const payload: any[] = res.data.payload;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const fetchPickupArea = async (sellerUserId: number) => {
  try {
    const res = await axios.get(`/provider/pickuparea${sellerUserId}`);
    const payload: any[] = res.data.payload;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const fetchDeliveryFares = async (
  origin: string,
  destination: string,
  size: string,
) => {
  try {
    let query = `origin=${origin}&destination=${destination}&size=${size}`;
    const res = await axios.get(`/fares?${query}`);
    const payload: IDeliveryFare[] = res.data.payload;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const fetchReviews = async (providerId: number) => {
  try {
    const res = await axios.get(`/reviews?ProviderId=${providerId}`);
    const payload: IReview[] = res.data.payload;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    return {error};
  }
};

export const createInventory = async (data: INewShopItem) => {
  try {
    const form = {
      item_name: data.item_name,
      quantity: Number(data.quantity),
      cost_price: Number(data.cost_price),
      selling_price_standard: Number(data.selling_price_standard),
      status: data.status,
      shop_id: data.shop_id,
    };
    const res = await axios.post(`/users/shops/inventory`, form);
    const payload: IShopItem = res.data;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    console.log('err from req', error);
    return {error};
  }
};

export const createSale = async (data: ISaleRequest) => {
  try {
    const res = await axios.post(`/users/shops/sales`, data);
    const payload: ISale = res.data;
    console.log(res.data);
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    console.log('err from req', error);
    return {error};
  }
};

export const createBank = async (data: IBankRequest) => {
  try {
    console.log(data);
    const res = await axios.post(`/users/shops/banks`, data);
    const payload: IBank = res.data;
    console.log(res.data);
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    console.log('err from req', error);
    return {error};
  }
};

export const deleteBank = async (id?: number) => {
  try {
    console.log(id);
    const res = await axios.delete(`/users/shops/banks/${id}`);
    const payload: string = res.data.payload;
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    console.log('err from req', error);
    return {error};
  }
};


export const uploadImages = async () => {
  try {
    const formData = new FormData();

    data.map((image, index) => {
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    });

    const res = await axios.post('/uploadImages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const payload: IDeliveryImageLink[] = res.data.payload;
    console.log('payload from req ', payload);
    return {payload};
  } catch (error) {
    // TODO: make error user friendly
    console.log('err from req', error);
    return {error};
  }
};
