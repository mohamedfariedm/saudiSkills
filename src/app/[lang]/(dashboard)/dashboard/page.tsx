import DashboardPageView from "./page-view";
import { getServerSession } from "next-auth/next";
import { getDictionary } from "@/localization/dictionaries";
import { authOptions } from "@/lib/auth";
export const metadata = {
  title: "Dashboard",
};
interface DashboardProps {
  params: Promise<{
    lang: any;
  }>;
}
const Dashboard = async (props: DashboardProps) => {
  const params = await props.params;
  //const session = await getServerSession(authOptions);
  const { lang } = params;
  //console.log("session_session", session);
  const trans = await getDictionary(lang);
  return <DashboardPageView trans={trans} />;
};

export default Dashboard;
