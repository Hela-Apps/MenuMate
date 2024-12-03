import MenuBar from "@/components/ui/menubar";
import React from "react";
import "../../../app/index.css";
import { PrimeReactProvider } from "primereact/api";

const MainPage = () => {
  return (
    <React.StrictMode>
      <PrimeReactProvider>
        <MenuBar></MenuBar>
      </PrimeReactProvider>
    </React.StrictMode>
  );
};
export default MainPage;
