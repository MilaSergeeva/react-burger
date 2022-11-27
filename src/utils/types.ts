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

export type TResetPasswordApi = string;
export type TFuncVoid = () => void;

export type TNewPasswordApi = {
  password: string;
  token: string;
};

export type TLoginApi = {
  email: string;
  password: string;
};


export type TUserApi = {
  name: string;
  email: string;
  password: string;
};




