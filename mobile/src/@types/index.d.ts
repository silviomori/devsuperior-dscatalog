declare module "*.png";

export interface IProduct {
  id?: number;
  imgUrl?: string;
  name?: string;
  price?: number;
  description?: string;
  date?: string;
  categories?: ICategory[];
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IRole {
  role: "ROLE_OPERATOR" | "ROLE_ADMIN";
}
