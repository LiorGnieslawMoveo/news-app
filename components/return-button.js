"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReturnButton() {
  // TODO:
  //add design to this button
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const handleBack = () => {
    if (currentPath === "/archive") {
      router.push("/");
    } else {
      router.back();
    }
  };

  return (
    <div className="return-button">
      <button onClick={handleBack}>Return</button>
    </div>
  );
}
