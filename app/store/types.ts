"use client";
export interface LoginModalState {
  isOpen: boolean;
}

// Define the root state type
export interface RootState {
  loginModalState: LoginModalState;
}
