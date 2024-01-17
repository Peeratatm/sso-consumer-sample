import SSOPage from "@/components/SSOPage";
import { cookies } from "next/headers";

export default function Page(props) {
  const { searchParams, params } = props;
  const accessToken = cookies().get("accessToken")?.value || "";
  return (
    <SSOPage
      {...{
        ...props,
        accessToken,
      }}
    />
  );
}
