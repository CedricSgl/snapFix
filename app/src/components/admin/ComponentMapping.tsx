import { AdminDashboard } from "./AdminDashboard";
import Buildings from "./Buildings";
import ComingSoon from "./ComingSoon";
import {
  Icon2fa,
  IconBellRinging,
  IconBuildings,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
} from '@tabler/icons-react';


export const componentMapping = {
  Notifications: <ComingSoon />,
  Dashboard: <AdminDashboard />,
  Billing: <><Buildings /><AdminDashboard /></>,
  Buildings: <Buildings />,
  Users: <ComingSoon />,
};


export const adminComponentMapping = [
  { label: 'Notifications', icon: IconBellRinging, component: <ComingSoon />},
  { label: 'Dashboard', icon: IconReceipt2, component: <AdminDashboard /> },
  { label: 'Security', icon: IconFingerprint, component: <ComingSoon /> },
  { label: 'SSH Keys', icon: IconKey, component: <ComingSoon /> },
  { label: 'Buildings', icon: IconBuildings, component: <Buildings /> },
  { label: 'Authentication', icon: Icon2fa, component: <ComingSoon /> },
  { label: 'Other Settings', icon: IconSettings, component: <ComingSoon /> },
];
