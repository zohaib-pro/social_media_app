"use client";
import { onClose as onCloseEdit } from "@/app/store/slices/EditModalSlice";
import { RootState } from "@/app/store/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../form/Input";
import Modal from "../Modal";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUpload from "../form/ImageUpload";

import usePost from "@/app/hooks/fetcher";

const EditModal = () => {
  const {
    post: postEditData,
    data: editResultsData,
    error,
    loading,
  } = usePost("/api/users/edit");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileimage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const eidtModalState = useSelector((state: RootState) => state.editModal);

  const onSubmit = useCallback(async () => {
    postEditData({ email, name, profileImage, coverImage });
  }, [postEditData, name, email, profileImage, coverImage]);

  useEffect(() => {
    if (error) toast.error("Failed to edit user!");
  }, [error]);

  useEffect(() => {
    if (editResultsData) {
      toast.success("User profile updated successfully");
      dispatch(onCloseEdit());
      console.log(editResultsData);
    }
  }, [editResultsData]);

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

      <ImageUpload onChange={setProfileimage} label="Profile Image" />
      <ImageUpload onChange={setCoverImage} label="Cover Image" />

      {/* <Input
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
      /> */}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={eidtModalState.isOpen}
      title="Edit Profile"
      actionLabel="Save"
      onClose={() => dispatch(onCloseEdit())}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
