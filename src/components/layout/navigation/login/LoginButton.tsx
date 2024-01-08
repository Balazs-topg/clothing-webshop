"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { UserIcon } from "@heroicons/react/24/solid";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useAuthSlice } from "@/state/useAuthSlice";

export default function LoginButton({
  serverAuthorization,
}: {
  serverAuthorization: boolean;
}) {
  const openLogin = useAuthSlice((state: any) => state.openLogin) as any;
  const isLoggedIn = useAuthSlice((state) => state.isLoggedIn);
  const router = useRouter();

  return (
    <>
      {!isLoggedIn ? (
        <Button variant="outline" onClick={() => openLogin()}>
          <UserIcon className="mr-2 size-6" />
          Log in
        </Button>
      ) : (
        <Button variant="outline" onClick={() => router.push(`/account`)}>
          <UserIcon className="mr-2 size-6" />
          View Account
        </Button>
      )}
      <LoginModal />
      <SignupModal />
    </>
  );
}
