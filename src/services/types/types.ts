

export interface ITypeOfIngredient {
  fat: number;
  calories: number;
  carbohydrates: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  count?: number;
  type: string;
  __v: number;
  _id: string;
  
}

export type TIngredientWithUniqueId = ITypeOfIngredient & {
  uniqueId: string;
};

export type TFuncVoid = () => void;

export type TNewPasswordApi = {
  password: string | null;
  token: string | null;
};

export type TLoginApi = {
  email: string | null;
  password: string | null;
};


export type TUserApi = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
};

export type TOrderData = {
  name: string;
  order: { number: number };
  success: boolean;
};



export type TIngredientsCounter = {
  [index: string]: number;
};

export type TUserInfo = {
  name?: string | null;
  email?: string | null;
}

export type TUserData = {
  success: boolean;
  user: TUserInfo;
};

export type TUserDataWithToken = TUserData & {
  accessToken: string;
  refreshToken: string;
};
