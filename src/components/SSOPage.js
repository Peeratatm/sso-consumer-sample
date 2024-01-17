"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "@/utilities/toast";

function SSOPage(props) {
  const { searchParams, params } = props;
  const { redirectUrl = '', ssoToken = '' } = searchParams;
  const router = useRouter();
  const [loading, setLoading] = useState("");


  const loginWithSSOToken = useCallback(async () => {
    try {
        if (ssoToken) {
            toast.loading("Verifying SSO Token...")
            const res = await api.loginWithSSOToken({}, {token: ssoToken})
            const accessToken = res.accessToken;
            const refreshToken = res.refreshToken;
            Cookies.set("accessToken", accessToken);
            Cookies.set("refreshToken", refreshToken);
            window.location.href = redirectUrl || '/'
            toast.clear()
        }else{
            window.location.href = '/'
        }
    } catch (error) {
        toast.clear()
        console.log('error >> ', error);
    }
  }, []);


  useEffect(()=>{
    loginWithSSOToken()
  },[])

  return (
    <div className="flex min-h-screen items-center justify-center">
      
    </div>
  );
}

export default SSOPage;
