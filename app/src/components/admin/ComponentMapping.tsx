import { AdminDashboard } from "./AdminDashboard";
import Buildings from "./Buildings";
import ComingSoon from "./ComingSoon";

export const componentMapping = {
  Notifications: <ComingSoon />,
  Billing: <><Buildings /><AdminDashboard /></>,
  Security: <AdminDashboard />,
  'SSH Keys': <ComingSoon />,
  Buildings: <Buildings />,
  Users: <ComingSoon />,
};