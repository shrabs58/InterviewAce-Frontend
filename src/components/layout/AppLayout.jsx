import "./AppLayout.css";

import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout({ menuItems, children }) {
  return (
    <div className="app-layout">

      <Header />

      <div className="app-layout-body">

        <Sidebar menuItems={menuItems} />

        <main className="app-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AppLayout;