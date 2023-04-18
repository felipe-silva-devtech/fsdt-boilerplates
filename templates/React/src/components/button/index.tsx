import React from "react";

export const Button: React.FC<React.PropsWithChildren> = ({
  children,
  ...props
}) => <button {...props}>{children}</button>;
