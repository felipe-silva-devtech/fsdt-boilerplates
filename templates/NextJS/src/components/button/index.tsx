import React from "react";
import { ReactFCWithChildren } from "../../types/react";

export const Button: ReactFCWithChildren = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
