import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, db, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, query, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      const q = query(doc(db, `users/${authUser?.email}`));
      const docSnap = await getDoc(q);
      if (docSnap?.data().role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    });
  }, [user]);

  const signInUser = () => {
    signInWithPopup(auth, provider)
      .then((authUser) => {
        if (authUser) {
          if (authUser.user.email === "chrisrocks2829@gmail.com") {
            const q = query(doc(db, `users/${authUser.user.email}`));
            setDoc(q, {
              name: authUser.user.displayName,
              email: authUser.user.email,
              profilePic: authUser.user.photoURL,
              role: "admin",
            });
            navigate("/admin");
          } else {
            const q = query(doc(db, `users/${authUser.user.email}`));
            setDoc(q, {
              name: authUser.user.displayName,
              email: authUser.user.email,
              profilePic: authUser.user.photoURL,
              role: "none",
            });
            navigate("/");
          }
        }
      })
      .catch((err) => err.message);
  };

  return (
    <div className="h-screen w-screen grid place-items-center bg-green-400 ">
      <div className="flex flex-col items-center">
        <img
          src="https://kisansuvidha.gov.in/assets/images/kisan-logo.png"
          alt="banner"
          height={200}
          width={200}
        />
        <button
          onClick={signInUser}
          className="bg-orange-500 p-4 rounded-lg mt-10 mx-auto font-bold text-white hover:scale-125 transition-all duration-200 ease-out"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
