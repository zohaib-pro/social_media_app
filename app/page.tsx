import Image from "next/image";
import Layout from "./components/Layout";
import Modal from "./components/Modal";
import { Provider } from "react-redux";
import store from "./store/store";
import LoginModal from "./components/modals/LoginModal";
import ClientProviderWrapper from "./components/ClientProviderWrapper";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/Navbar";
import MyComponent from "./components/MyComponent";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main>
      <ClientProviderWrapper>
        <Toaster />
        <LoginModal />
        <RegisterModal />

        <Layout>
          {/* <Navbar /> */}
          <MyComponent />
          <h1 className="text-sky-400 ">Home3</h1>
        </Layout>
      </ClientProviderWrapper>
    </main>
  );
}
