import { 
  Hexagon, 
  LayoutDashboard, 
  Inbox, 
  CheckSquare, 
  BarChart2, 
  Settings 
} from 'lucide-react';

export const SIDEBAR_CONFIG = {
  brand: {
    name: "Fabrito MTO",
    icon: Hexagon
  },
  navItems: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'enquiries', label: 'Enquiries', icon: Inbox },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]
};
