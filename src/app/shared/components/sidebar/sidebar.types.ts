export interface SidebarItem {
    label: string;
    route?: string; // porque puede no tener ruta si es solo contenedor de submenu
    icon: string;
    children?: SidebarItem[];
}