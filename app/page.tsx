import Image from "next/image";
import Layout from "./components/Layout";
import Modal from "./components/Modal";
import { Provider } from "react-redux";
import store from "./store/store";
import ClientProviderWrapper from "./components/ClientProviderWrapper";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import EditModal from "./components/modals/EditModal";
import Navbar from "./components/Navbar";
import MyComponent from "./components/MyComponent";
import { Toaster } from "react-hot-toast";
import Avatar from "./components/Avatar";
import Button from "./components/Button";
import TesterComponent from "./components/TesterComponent";
import PostForm from "./components/posts/PostForm";
import PostFeed from "./components/posts/PostFeed";
import UserView from "./components/UserView";
import { useSession } from "next-auth/react";

export default function Home() {
  //const { data: session, status } = useSession();
  return (
    <main className="bg-black">
      <ClientProviderWrapper>
        <Toaster />
        <LoginModal />
        <RegisterModal />
        <EditModal />

        <Layout>
          {/* <Navbar /> */}
          {/* <MyComponent /> */}
          <h1 className="text-sky-400 ">Home</h1>
          {/* <Avatar user={session?.user} userId={""} isLarge hasBorder /> */}
          <UserView />
          <PostForm placeholder="What's on your mind?" />

          <PostFeed />
          {/* <TesterComponent /> */}
        </Layout>
      </ClientProviderWrapper>
    </main>
  );
}
