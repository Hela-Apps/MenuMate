import MenuBar from "./ui/menubar";
import React from "react";
import "../app/index.css";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

const RootLayout = ({ children }) => {
  return (
    <>
      <React.StrictMode>
        <PrimeReactProvider>
          <div className="body">
            <MenuBar></MenuBar>

            <main>{children}</main>
          </div>
        </PrimeReactProvider>
      </React.StrictMode>
    </>
  );
};

export default RootLayout;
