import SignIn from "@/components/main/Login";
import AuthNav from "@/components/sub/nav/AuthNav";

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