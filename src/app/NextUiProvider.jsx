"use client";

import { NextUIProvider } from "@nextui-org/react";

function NextUiProvider({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export default NextUiProvider;
