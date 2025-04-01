export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;

  children?: NavigationItem[];
  roles?: string[];
}
export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Menu Item List',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
        roles: ['Customer'],
      },
      {
        id: 'menu-catagory',
        title: 'Catagory List',
        type: 'item',
        url: '/forms',
        icon: 'feather icon-server',
        classes: 'nav-item',
        roles: ['Manager'],
      },
      {
        id: 'menu-item',
        title: 'Menu Items List',
        type: 'item',
        url: '/tables',
        icon: 'feather icon-book',
        classes: 'nav-item',
        roles: ['Manager'],
      }
      
    ]
  },

 
 
];
