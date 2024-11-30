import React, { useContext, useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { useParams } from "react-router-dom";
import Faceauth from "../components/faceAuth/faceauth";
import { useAuth } from "../context/AuthContext";
//
const backend = import.meta.env.VITE_PUBLIC_API;
function ExamInterface() {
  const { id } = useParams();
  const { user } = useAuth();
  const [User, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [domain, setDomain] = useState(id);
  useEffect(() => {
    console.log(image);
  }, [image]);
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${backend}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const userData = await response.json();
      setUser(userData);
      setImage(backend + userData.data.user.profile_image);
      console.log(userData);
      console.log(image);
    }
    setDomain(id);
    fetchData();
    setLoading(false);
  }, []);
  if (loading) {
    return <>Loading</>;
  }
  return (
    <div>
      {!auth ? (
        <Faceauth referenceImage={image} setAuth={setAuth} />
      ) : (
        <QuestionCard domain={domain} />
      )}
    </div>
  );
}

export default ExamInterface;
