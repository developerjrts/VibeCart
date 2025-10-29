import Button from "@/Components/Button";
import TextField from "@/Components/TextField";
import { local_url } from "@/constant/constant";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        `${local_url}/auth/sign-in`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.status) {
        localStorage.setItem("session_code", response.data.session_code);
        navigate("/");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        const errMessage = error.response?.data.message;
        alert(errMessage);
      }
    }
  };

  return (
    <div className="h-screen text-gray-800 w-screen flex items-center justify-center">
      <Link
        className="absolute top-3 right-3 hover:underline transition-all"
        to={"/sign-in"}
      >
        Don't have an Account
      </Link>
      <div className="flex flex-col w-[35%] gap-2 items-center justify-between">
        <h1 className=" text-2xl font-bold"> Welcome Back 👋</h1>
        <p>Sign in to continue shopping with VibeCart.</p>
        <TextField
          value={username}
          setValue={setUsername}
          placeholder="Choose a username"
          label="Username"
          type="text"
        />
        <TextField
          value={password}
          setValue={setPassword}
          placeholder="Create a password"
          label="Password"
          type="password"
        />

        <Button onClick={handleSignIn} label="Sign In" />
      </div>
    </div>
  );
};

export default SignIn;
