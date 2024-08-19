"use client";
import { onClose } from "@/app/store/LoginModalSlice";
import { RootState } from "@/app/store/store";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Input";
import Modal from "../Modal";

import { signIn } from "next-auth/react";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginModalState = useSelector((state: RootState) => state.loginModal);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      alert(res);
      dispatch(onClose());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />

      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center my-4">
      <p>
        Dont have an account?&nbsp;
        <span className="text-white cursor-pointer hover:underline">
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
      onClose={() => dispatch(onClose())}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
