import React from "react";

interface EventError {
  text: string;
}
const EventError = ({ text }: EventError) => {
  return (
    <section className="h-full flex min-h-[80vh] items-center  justify-center w-full">
      <div className="flex flex-col gap-5 w-full items-center justify-center">
        <img src="/empty.svg" alt="" />
        <h2 className="text-2xl font-[500] max-w-[300px] text-center">
          {text}
        </h2>
      </div>
    </section>
  );
};

export default EventError;
