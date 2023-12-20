// Interface for Order
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

//Interface for fullName;
export type TfullName = {
  firstName: string;
  lastName: string;
};

//Interface for address
export type Taddress = {
  street: string;
  city: string;
  country: string;
};

// Interface for User
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TfullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Taddress;
  // orders?: TOrder[];
};
