
import AdminPanel from "./AdminPanel";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"; 
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
async function Admin() {
  const session = await getServerSession(authOptions);
  if(!session || !session.user || session && session.user.role != "admin" ){
    redirect("/")
  }else{
    return <AdminPanel />
   }
  
}

export default Admin;
