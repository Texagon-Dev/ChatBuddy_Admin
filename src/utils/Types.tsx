export interface SidebarProps {
  options: {
    id: number;
    title: string;
    link: string;
    active: boolean;
    icon: any;
    activeIcon: any;
  }[];
  setOptions: any;
}

export interface NavProps {
  routeName?: string;
  dashboard?: boolean;
}
