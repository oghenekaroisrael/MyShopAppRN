export type LoginResponse = {
  access_token?: string;
  User?: IUser;
};

export type AuthResponse = {
  isLoggedIn?: boolean;
  user?: IUser;
};

export interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  UserId: number;
  email: string;
}
export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  isVerified: boolean;
  createdAt: string;
}

export enum DeliverySize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum DeliveryPriority {
  Standard = 'standard',
  High = 'high',
}

export enum DeliveryStatus {
  Processing = 'processing',
  Started = 'started',
  Completed = 'completed',
}

export interface IDelivery {
  [x: string]: any;
  id?: number;
  senderName: string;
  recipientName: string;
  description: string;
  pickupPhoneNumber: string;
  pickupStreetAddress: string;
  pickupEmailAddress: string;
  dropoffPhoneNumber: string;
  dropoffStreetAddress: string;
  dropoffEmailAddress: string;
  pickupArea: string;
  dropoffArea: string;
  instructions: string;
  size: DeliverySize | null;
  priority: DeliveryPriority | null;
  cost: string | null;
  itemCount?: number | null;
  pickupPin?: string | null;
  dropoffPin?: string | null;
  pickupDate?: string | null;
  dropoffDate?: string | null;
  assignDate?: string | null;
  status?: DeliveryStatus;
  comment?: string | null;
  createdAt?: string;
  updatedAt?: string;
  ProviderId: number | null;
  CustomerId?: number;
  AgentId?: number | null;
  images?: any[];
}

export interface IDeliveryArea {
  id: number;
  name: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDeliveryFare {
  id: number;
  origin: string;
  destination: string;
  size: string;
  cost: string;
  ProviderId: number;
  createdAt: string;
  updatedAt: string;
  Provider: IProvider;
}

export interface IProvider {
  id: number;
  companyName: string | null;
  phoneNumber: string | null;
  taxIdentificationNumber: string | null;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  avgRating: number;
}

export interface IReview {
  id: number;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  CustomerId: number;
  ProviderId: number;
  Customer: IProfile;
}

export interface ICard {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  email: string;
  amountInKobo: number;
  subAccount: String;
}

export interface ICategory {
  id: number;
  title: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  id: number;
  avatar: string;
  categoryId: number;
  product: string;
  productcode: string;
  quantity: string;
  description: string;
  amount: string;
}

export interface ICart {
  avatar: string;
  name: string;
  itemId: number;
  quantity: number;
  amount: number;
  providerId: number;
}

export interface ICreditCard {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  email: string;
  amountInKobo: number;
  subAccount: string[];
}

export interface IDeliveryImage {
  uri: string;
  fileName: string;
  fileSize: number;
  height: number;
  width: number;
  type: string;
}

export interface ISale {
  id: number;
  item_name: string;
  item_id: number;
  quantity: number;
  selling_price: number;
  payment_type: string;
  shop_id: number;
  created_at: string;
}

export interface ISaleRequest {
  item_name: string;
  item_id: number;
  quantity: number;
  selling_price: number;
  payment_type: string;
  shop_id: number;
}

export interface IExpense {
  id: number;
  particular: string;
  recipient: string;
  amount: number;
  payment_type: string;
  shop_id: number;
  created_at: string;
}

export interface IExpenseRequest {
  particular: string;
  recipient: string;
  amount: number;
  payment_type: string;
  shop_id: number;
}

export interface IShopItem {
  id: number;
  item_name: string;
  quantity: number;
  cost_price: number;
  selling_price_standard: number;
  payment_type: string;
  status: string;
  shop_id: number;
  created_at: string;
}

export interface INewShopItem {
  item_name: string;
  quantity: string;
  cost_price: string;
  selling_price_standard: string;
  payment_type: string;
  status: string;
  shop_id: number;
}

export interface IPayout {
  id: number;
  particular: string;
  recipient: string;
  amount: number;
  payment_type: string;
  shop_id: number;
  created_at: string;
}

export interface IBank {
  id: number;
  icon: string;
  bank_name: string;
  account_number: string;
  shop_id: number;
  created_at: string;
}

export interface IBankRequest {
  icon?: string;
  bank_name: string;
  account_number: string;
  shop_id: number;
}

export interface IShop {
  id: number;
  shop_name: string;
  shop_type: string;
  address: string;
  user_id: number;
  created_at: string;
}

export interface ILogoBank {
  code: string;
  logo: string;
  ussd: string;
  name: string;
  slug: string;
}
