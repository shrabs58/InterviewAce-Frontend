import { Outlet } from "react-router-dom";

import AppLayout from "./AppLayout";

import { adminMenu } from "../../utils/menuConfig";

function AdminLayout() {
  return (
    <AppLayout menuItems={adminMenu}>
      <Outlet />
    </AppLayout>
  );
}

export default AdminLayout;