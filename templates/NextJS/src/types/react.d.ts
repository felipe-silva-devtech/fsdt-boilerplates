import React from "react";

export type ReactFCWithChildren<P = unknown> = React.FC<
  React.PropsWithChildren<P>
>;
