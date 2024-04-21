export interface IMenuItem {
  url: string;
  title: DashboardMenuItem;
  isActive: boolean;
}

export enum DashboardMenuItem {
  Profile = "Profile",
  Products = "Products",
  UserList = "UserList",
}
