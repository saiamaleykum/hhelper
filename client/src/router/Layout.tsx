import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu.tsx";


const Layout = () => {
  return (
      <div>
          <Outlet />
          <Menu />
      </div>
  )
}

export default Layout

