import HyperFooter from "@/components/ui/hyperui/footer";
import HyperHeader from "@/components/ui/hyperui/header";
import Dashboard from "@/pages/dashboard";
import Image from "next/image";

export default function Home() {
  return (
   <div>
      <HyperHeader/>
      <Dashboard/>
      <HyperFooter/>
      </div>
  );
}
