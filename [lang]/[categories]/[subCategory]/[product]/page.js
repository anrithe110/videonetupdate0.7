
import NavTer from "@/_components/NavTer";
import ProductPage from "./Product";
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
export default async function Product() {
  const session = await getServerSession(authOptions);
  return (
    <NavTer classNameBottom="!pb-[55px]">  
    <ProductPage session={session}/>
    </NavTer>
  );
}
