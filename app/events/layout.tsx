import Navbar from "@/components/events/Navbar";
import NavCrumb from "@/components/events/NavCrumb";
import React from "react";

const EventsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full ">
      <div className="max-w-[1350px] flex flex-col mx-auto px-4">
        <Navbar />
        <NavCrumb/>
        {children}
      </div>
    </section>
  );
};

export default EventsLayout;
