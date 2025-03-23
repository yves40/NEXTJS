import { redirect } from "next/navigation";
import { sessionInfo } from "@/lib/serverMethods/session/sessionMethods";

// This layout is used to protect private pages in the /dashboard routes. 
// As it's located in dashboard folder, it applies to all children

export default async function layout({children}) {

    const session = await sessionInfo();
    if(!session.success) {
      redirect('/signin');
    }
  return (
    <div>{children}</div>
  )
}
