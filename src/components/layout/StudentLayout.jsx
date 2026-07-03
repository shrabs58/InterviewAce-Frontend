import { Outlet } from "react-router-dom";

import AppLayout from "./AppLayout";

import { studentMenu } from "../../utils/menuConfig";

function StudentLayout() {
  return (
    <AppLayout menuItems={studentMenu}>
      <Outlet />
    </AppLayout>
  );
}

export default StudentLayout;
