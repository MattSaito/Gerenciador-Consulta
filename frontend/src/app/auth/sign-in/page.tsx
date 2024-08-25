"use client";
import Footer from "@/components/main/Footer";
import SignIn from "@/components/main/Login";
import Navbar from "@/components/main/Navbar";
import AuthNav from "@/components/sub/AuthNav";

export default function Page() {
  return (
    <>
      <AuthNav />
      <div className="mt-10">
        <SignIn />
      </div>
    </>
  );
}
