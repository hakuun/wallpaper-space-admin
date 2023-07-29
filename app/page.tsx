"use client";

import { signOut } from "next-auth/react";

export default function Home() {
  return <div onClick={() => signOut()}>Hello World</div>;
}
