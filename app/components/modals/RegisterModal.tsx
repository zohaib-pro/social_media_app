"use client";
import { onClose as onCloseRegister } from "@/app/store/slices/RegisterModalSlice";
import {
  onClose,
  onOpen as onOpenLogin,
} from "@/app/store/slices/LoginModalSlice";
import { RootState } from "@/app/store/store";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../form/Input";
import Modal from "../Modal";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginModalState = useSelector(
    (state: RootState) => state.registerModal
  );

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/register", {
        email,
        password,
        name,
      });

      if (response.status == 201) {
        toast.success("User Registration Successful!");
      } else {
        toast.error("Registration failed with error code: " + response.status);
      }

      dispatch(onCloseRegister());
    } catch (e: any) {
      console.log(e);
      toast.success("test");
    } finally {
      setLoading(false);
    }
  }, [dispatch, email, password, confirmpassword]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
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
        type="password"
        disabled={isLoading}
      />

      <Input
        placeholder="Confirm Password"
        onChange={(e) => setConfirmpassword(e.target.value)}
        value={password}
        type="password"
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center my-4">
      <p>
        Already have an account?&nbsp;
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={() => {
            dispatch(onOpenLogin());
            dispatch(onCloseRegister());
          }}
        >
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModalState.isOpen}
      title="Register"
      actionLabel="Sign Up"
      onClose={() => dispatch(onCloseRegister())}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
