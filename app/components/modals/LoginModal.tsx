"use client";
import { onClose as onCloseLogin } from "@/app/store/slices/LoginModalSlice";
import { onOpen as onOpenRegister } from "@/app/store/slices/RegisterModalSlice";
import { RootState } from "@/app/store/store";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../form/Input";
import Modal from "../Modal";

import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginModalState = useSelector((state: RootState) => state.loginModal);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      console.log("sending email: ", email);
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      //console.log("login", res);
      if (res?.status == 401)
        toast.error('Invalid Credentials!');
      else
        dispatch(onCloseLogin());
    } catch (e) {
      toast.error('Login Server Error!');
    } finally {
      setLoading(false);
    }
  }, [dispatch, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        disabled={isLoading}
      />

      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center my-4">
      <p>
        Dont have an account?&nbsp;
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={() => {
            dispatch(onOpenRegister());
            dispatch(onCloseLogin());
          }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModalState.isOpen}
      title="Login"
      actionLabel="Sign In"
      onClose={() => dispatch(onCloseLogin())}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
