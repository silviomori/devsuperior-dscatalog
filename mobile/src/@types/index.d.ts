declare module "*.png";

export interface IProduct {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
  description: string;
  date: string;
  categories: string[];
}

interface ILoginData {
  username: string;
  password: string;
}

interface IRole {
  role: "ROLE_OPERATOR" | "ROLE_ADMIN";
}
