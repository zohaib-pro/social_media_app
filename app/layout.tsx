import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import AuthProvider from "./utils/SessionProvider";
import Layout from "./components/layout/Layout";
import ClientProviderWrapper from "./components/ClientProviderWrapper";
import { Toaster } from "react-hot-toast";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import EditModal from "./components/modals/EditModal";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <ClientProviderWrapper>
        <AuthProvider session={session}>
          <body className={inter.className + " bg-black"}>
            <Toaster />
            <LoginModal />
            <RegisterModal />
            <EditModal />
            <Layout>{children}</Layout>
          </body>
        </AuthProvider>
      </ClientProviderWrapper>
    </html>
  );
}
