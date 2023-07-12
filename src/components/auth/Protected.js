import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function Protected({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedin(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (!isLoggedin) {
    return <Navigate to="/popup" />;
  }

  return children;
}
