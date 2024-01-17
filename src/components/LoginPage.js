"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "@/utilities/toast";

function LoginPage(props) {
  const { searchParams, params, accessToken } = props;
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const [account, setAccount] = useState(null)


  const logout = useCallback(() => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.refresh();
  }, [router]);

  const login = useCallback( () => {
    window.location.href = `${process.env.SSO_SERVICE_URL}?serviceUrl=${window.location.protocol}//${window.location.host}`
  }, []);

  const getAccountData = useCallback(async ()=>{
    try {
      const res = await api.getAccountDetail()
      const account = res.account
      setAccount(account)
    } catch (error) {
      console.log('getAccountData error >> ', error);
    }
  }, [])

  useEffect(()=>{
    getAccountData()
  }, [])


  return (
    <div className="flex min-h-screen items-center justify-center">
      {accessToken ? (
        <div className="flex flex-col gap-4">
          <h3 className="text-center">You are logged in</h3>
          <p>{account ? JSON.stringify(account) : null}</p>
          <Button color="primary" variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="text-center">Service Login</h3>
          <Button
            color="primary"
            variant="ghost"
            isLoading={loading}
            onClick={login}
          >
            SSO LOGIN
          </Button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
