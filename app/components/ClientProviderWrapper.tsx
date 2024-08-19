// components/ClientProviderWrapper.tsx
"use client"; // This marks this component as client-side

import React, { ReactNode } from "react";
import { Provider } from "react-redux"; // Client-side context provider
import store from "../store/store"; // Your Redux store

// Define the props type for the component
interface ClientProviderWrapperProps {
  children: ReactNode; // Use ReactNode to type the children prop
}

const ClientProviderWrapper: React.FC<ClientProviderWrapperProps> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientProviderWrapper;
