"use client";

import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-[90vh] md:min-h-screen w-full flex items-center justify-center">
      {children}
    </section>
  );
};

export default AuthLayout;
