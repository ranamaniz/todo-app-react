import React from "react";
import { NavigationBar } from "../components/NavigationBar";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

export default MainLayout;
