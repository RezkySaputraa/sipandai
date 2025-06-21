import UserMain from "../components/page/UserMain";
import { auth } from "./auth";

export default async function Home() {
  
  const session = await auth();

  return <UserMain role={session?.user?.role || "user"}></UserMain>;
}
