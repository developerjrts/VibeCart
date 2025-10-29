import Button from "@/Components/Button";
import TextField from "@/Components/TextField";
import { local_url } from "@/constant/constant";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [address, setAddress] = useState<string>();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${local_url}/auth/sign-up`,
        {
          username,
          name,
          email,
          password,
          address,
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
        Already have an, Account
      </Link>
      <div className="flex flex-col w-[35%] gap-2 items-center justify-between">
        <h1 className=" text-2xl font-bold">Create your Account</h1>
        <p>Join VibeCart and explore amazing deals.</p>
        <TextField
          value={username}
          setValue={setUsername}
          placeholder="Choose a username"
          label="Username"
          type="text"
        />
        <TextField
          value={name}
          setValue={setName}
          placeholder="Enter your full name"
          label="Full Name"
          type="text"
        />
        <TextField
          value={email}
          setValue={setEmail}
          placeholder="Enter your email"
          label="Email"
          type="email"
        />
        <TextField
          value={password}
          setValue={setPassword}
          placeholder="Create a password"
          label="Password"
          type="password"
        />

        <TextField
          value={address}
          setValue={setAddress}
          placeholder="Enter your address"
          label="Adress (Optional)"
          type="text"
        />
        <Button onClick={handleSignUp} label="Sign Up" />
      </div>
    </div>
  );
};

export default SignUp;
