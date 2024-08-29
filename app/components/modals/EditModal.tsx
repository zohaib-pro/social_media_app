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

import { usePost } from "@/app/hooks/fetcher";
import { User } from "@prisma/client";
import { updateData } from "@/app/store/slices/UsersSlice";
import { setThisUser } from "@/app/store/slices/ThisUserSlice";

const EditModal = () => {
  const {
    post: postEditData,
    data: editResultsData,
    error,
    loading,
  } = usePost<User>("/api/users/edit");

  const editModalState = useSelector((state: RootState) => state.editModal);
  const thisUserState = useSelector((state: RootState) => state.thisUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileimage] = useState<string | null>("");
  const [coverImage, setCoverImage] = useState<string | null>();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = thisUserState.data as User;
    if (user) {
      setEmail(user.email);
      setProfileimage(user.profileImage);
      setCoverImage(user.coverImage);
      setName(user.name);
    }
  }, [thisUserState.data]);

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
      dispatch(setThisUser(editResultsData));
      //console.log(editResultsData);
      //updateData(editResultsData);
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

      <ImageUpload
        value={profileImage || ""}
        onChange={setProfileimage}
        label="Profile Image"
      />
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
      isOpen={editModalState.isOpen}
      title="Edit Profile"
      actionLabel="Save"
      onClose={() => dispatch(onCloseEdit())}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
