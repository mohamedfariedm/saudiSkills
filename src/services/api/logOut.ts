import { toast } from "sonner";
import { getLanguageAndToken } from "./getLanguageAndToken";
import handleLogout from "./handle-logout";

export async function logOut() {
  const { lang } = await getLanguageAndToken();

  toast.error(
    lang === "en"
      ? "Your session has expired. Please login again."
      : "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى."
  );
  console.log("Unauthorized access, on client");
  handleLogout();
  // Open the login popup
}
