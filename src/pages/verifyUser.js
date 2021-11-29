import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AuthServices from "../services/AuthServices";
// import

function VerifyUser() {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;
  const [result, setResult] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await AuthServices.verifyUser(token);
        navigate(`/login`);
        setResult(data.message);
      } catch (err) {
        const message = err?.response?.data?.message || "Invalid Token URL";
        setResult(message);
      }
    };
    verifyToken();
  }, [token, navigate]);
  return <p>Verifing the User - {result}</p>;
}

export default VerifyUser;
