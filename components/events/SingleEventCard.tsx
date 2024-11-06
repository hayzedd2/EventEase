import { eventProps } from "@/types/type";
import { generateGradient } from "@/utils/generateGradients";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { IoBookmark, IoTimeOutline } from "react-icons/io5";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import {
  formatDate,
  formatTime,
} from "@/utils/formatDateTime";

const SingleEventCard = ({
  id,
  name,
  description,
  startDate,
  startTime,
  location,
}: eventProps) => {
  const gradientStyle = {
    background: generateGradient(id),
  };
  return (
    <div className="flex gap-5 py-10  w-full md:py-0 md:gap-10 flex-wrap md:flex-nowrap  items-center">
      <div className="basis-[100%] md:basis-[45%] flex flex-col gap-3">
        <div
          style={gradientStyle}
          className="h-[30rem] w-full rounded-lg"
        ></div>
      </div>
      <div className="basis-[100%] md:basis-[55%] flex h-full  flex-col gap-3">
        <div className="">
          <h2 className="font-[500] text-[2rem]">{name}</h2>
        </div>
        <div className="flex flex-col gap-3 border-b-gray-500 border-b py-5">
          <div className="flex gap-2 items-center capitalize">
            <CiCalendar className="w-6 h-6" />
            <p className="text-[1.2rem] mt-1">{formatDate(startDate)}</p>
          </div>
          <div className="flex gap-2 items-center capitalize">
            <IoTimeOutline className="w-6 h-6" />
            <p className="text-[1.2rem] mt-1">{formatTime(startTime)}</p>
          </div>
          <div className="flex gap-2 items-center capitalize">
            <CiLocationOn className="w-6 h-6" />
            <p className="text-[1.2rem] mt-1">{location}</p>
          </div>
        </div>
        <div className="py-5">
          <h3 className="font-[700] text-[1.2rem] mb-4">About this event</h3>
          <h6 className="font-[500] text-[1.2rem]">{description}</h6>
        </div>
        <div className="w-full">
          <Link href={""}>
            <Button className="flex gap-1 w-full items-center">
              <IoBookmark className="text-white fill-white" />{" "}
              <p className="mt-1">Book event</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleEventCard;
