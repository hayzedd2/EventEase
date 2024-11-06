import React from "react";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { eventProps } from "@/types/type";
import { generateGradient } from "@/utils/generateGradients";
import { IoTimeOutline } from "react-icons/io5";
import { formatDate, formatTime } from "@/utils/formatDateTime";
import { addToGoogleCalendar } from "@/utils/addToGoogleCalendar";

const MAX_DESCRIPTION_LENGTH = 200;
const EventCard = ({
  id,
  name,
  description,
  startDate,
  startTime,
  category,
  location,
}: eventProps) => {
  const gradientStyle = {
    background: generateGradient(id),
  };
  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;
  return (
    <div className="rounded-lg  shadow-lg" key={id}>
      <div
        className="h-[10rem] relative flex items-center justify-center rounded-tr-lg rounded-tl-lg"
        style={gradientStyle}
      >
        <div className="absolute top-2 right-4 rounded-[2rem] light-shadow bg-white/50 px-2 py-[0.1rem] mt-[0.1rem]">
          <p className="text-[14px] capitalize ">{category}</p>
        </div>
        <h1 className="font-[500] text-white text-[1.3rem]">{name}</h1>
      </div>
      <div className="px-5 py-10">
        <h3 className=" text-base font-[500]">{truncatedDescription}</h3>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-2 items-center capitalize">
            <CiCalendar className="w-5 h-5" />
            <p className="mt-1">{formatDate(startDate)}</p>
          </div>
          <div className="flex gap-2 items-center capitalize">
            <IoTimeOutline className="w-5 h-5" />
            <p className="mt-1">{formatTime(startTime)}</p>
          </div>
          <div className="flex gap-2 items-center capitalize">
            <CiLocationOn className="w-5 h-5" />
            <p className="mt-1">{location}</p>
          </div>
        </div>
        <div className="w-full flex items-end mt-3 justify-end">
          {/* <Link href={`/events/${id}`}>
            <Button className="flex gap-1 items-center">
              <IoBookmark className="text-white fill-white" />{" "}
              <p className="mt-1">Book event</p>
            </Button>
          </Link> */}

          <div
            onClick={() =>
              addToGoogleCalendar(
                name,
                description,
                startDate,
                startTime,
                location
              )
            }
            className="rounded-[2rem] cursor-pointer flex gap-2 items-center light-shadow bg-white/50 px-3 py-[0.2rem] mt-[0.2rem]"
          >
            <FcGoogle className="mt-[-0.15rem]" />
            <p className="text-[14px] capitalize ">Add to Google calendar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
