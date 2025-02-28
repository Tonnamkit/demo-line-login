import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import liff from "@line/liff";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID as string;
  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: LIFF_ID });
        if (liff.isLoggedIn()) {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        }
      } catch (error) {
        console.error("LIFF initialization failed", error);
      }
    };

    initializeLiff();
  }, []);

  const handleLogin = () => {
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  };

  const handleLogout = () => {
    liff.logout();
    setProfile(null);
  };

  return (
    <div className={geistSans.variable}>
      <h1>Hello LINE</h1>
      {profile ? (
        <div>
          <p>Welcome: {profile.displayName}</p>
          <p>Line id: {profile.userId} </p>
          <img src={profile.pictureUrl} alt="Profile" width={100} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>LINE Login</button>
      )}
    </div>
  );
}
