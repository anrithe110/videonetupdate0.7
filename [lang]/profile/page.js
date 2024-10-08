import ProfilePage from "./ProfilePage";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"; 
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
async function Profile() {
  const session = await getServerSession(authOptions);
  if(!session || !session.user){
    redirect("/")
  }else{
    return <ProfilePage session={session}/>
   }
  
}

export default  Profile;
