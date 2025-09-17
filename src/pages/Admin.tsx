import { useState } from "react";
import { 
  Package, 
  Tag, 
  Building2, 
  Settings, 
  Upload,
  BarChart3,
  Users,
  ShoppingCart
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminManufacturers } from "@/components/admin/AdminManufacturers";
import { AdminFeedImport } from "@/components/admin/AdminFeedImport";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

const adminMenuItems = [
  {
    title: "Панель управления",
    icon: BarChart3,
    key: "dashboard",
  },
  {
    title: "Товары",
    icon: Package,
    key: "products",
  },
  {
    title: "Категории",
    icon: Tag,
    key: "categories",
  },
  {
    title: "Производители",
    icon: Building2,
    key: "manufacturers",
  },
  {
    title: "Импорт товаров",
    icon: Upload,
    key: "import",
  },
  {
    title: "Заказы",
    icon: ShoppingCart,
    key: "orders",
  },
  {
    title: "Пользователи",
    icon: Users,
    key: "users",
  },
  {
    title: "Настройки",
    icon: Settings,
    key: "settings",
  },
];

function AppSidebar({ activeItem, setActiveItem }: { activeItem: string; setActiveItem: (key: string) => void }) {
  return (
    <Sidebar>
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-foreground">Админ-панель</h2>
        <p className="text-sm text-muted-foreground">СП-ГРУПП Каталог</p>
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Управление</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => setActiveItem(item.key)}
                    className={activeItem === item.key ? "bg-primary text-primary-foreground" : ""}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const Admin = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <AdminProducts />;
      case "categories":
        return <AdminCategories />;
      case "manufacturers":
        return <AdminManufacturers />;
      case "import":
        return <AdminFeedImport />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">
              Раздел "{adminMenuItems.find(item => item.key === activeItem)?.title}" в разработке
            </p>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        
        <main className="flex-1">
          <header className="h-14 border-b flex items-center px-4">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-xl font-semibold">
                {adminMenuItems.find(item => item.key === activeItem)?.title}
              </h1>
            </div>
          </header>
          
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;