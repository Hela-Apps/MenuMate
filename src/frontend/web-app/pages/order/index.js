import RootLayout from "@/components/layout";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import OrderCreate from "@/components/order/create";

const OrderCreatePage = () => {
  return (
    <>
      <RootLayout>
        <OrderCreate />
      </RootLayout>
    </>
  );
};

export default OrderCreatePage;
