export type TProtectedRouteType = {
  onlyForAuth: boolean;
  children: any;
  path: string;
  exact?: boolean;
};