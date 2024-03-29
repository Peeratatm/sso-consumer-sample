import LoginPage from "@/components/LoginPage";
import { cookies } from "next/headers";

export default function Page(props) {
  const { searchParams, params } = props;
  const accessToken = cookies().get("accessToken")?.value || "";
  return (
    <LoginPage
      {...{
        ...props,
        accessToken,
      }}
    />
  );
}
