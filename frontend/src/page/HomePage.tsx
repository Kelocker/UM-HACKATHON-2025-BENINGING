import React from "react";
import placeholderImage from "../assets/random.png";
import {
  IconBed,
  IconFile3d,
  IconHome,
  IconRobot,
  IconSpeedboat,
  IconUser,
} from "@tabler/icons-react";
import IconButton from "../components/IconButton.tsx";
import { useNavigate } from "react-router-dom";
import ImageSwiper from "../components/ImageSwiper.tsx";
import ImagesBlog from "../components/ImagesBlog.tsx";
// import LocalNotificationButton from "../components/LocalNotificationButton.tsx";

const HomePage = () => {
  const navigate = useNavigate();

  const seenList = [
    { src: placeholderImage, alt: "Placeholder 1", code: "S001" },
    { src: placeholderImage, alt: "Placeholder 2", code: "S002" },
    { src: placeholderImage, alt: "Placeholder 3", code: "S003" },
  ];
  const unSeenList = [
    { src: placeholderImage, alt: "Placeholder 1", code: "U001" },
    { src: placeholderImage, alt: "Placeholder 2", code: "U002" },
    { src: placeholderImage, alt: "Placeholder 3", code: "U003" },
  ];

  const importantList = [
    { src: placeholderImage, alt: "Placeholder 1", code: "I001" },
    { src: placeholderImage, alt: "Placeholder 2", code: "I002" },
    { src: placeholderImage, alt: "Placeholder 3", code: "I003" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">Welcome</span>
        </div>
        <div className="flex items-center gap-2">
          <IconButton onClick={() => navigate("/aibot")} Icon={IconRobot} />
        </div>
      </div>

      {/* <div className="p-4">
        <div className="flex items-center bg-gray-200 p-2 rounded-full">
          <IconSearch className="text-gray-500" />
          <input
            className="flex-grow ml-2 bg-transparent outline-none"
            placeholder="Search"
          />
        </div>
        <LocalNotificationButton />
        
      </div> */}

      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <IconHome className="text-2xl" />
          <span>Houses</span>
        </div>
        <div className="flex flex-col items-center">
          <IconBed className="text-2xl" />
          <span>Rooms</span>
        </div>
        <div className="flex flex-col items-center">
          <IconFile3d className="text-2xl" />
          <span>Saved</span>
        </div>
        <div className="flex flex-col items-center">
          <IconSpeedboat className="text-2xl" />
          <span>Instant</span>
        </div>
        <div className="flex flex-col items-center">
          <IconUser className="text-2xl" />
          <span>Profile</span>
        </div>
      </div>

      {/* <ImageSwiper images={importantList} title="Important" /> */}

      <ImagesBlog images={importantList} title="Important" />

      <ImagesBlog images={unSeenList} title="UnSeen" />

      <ImagesBlog images={seenList} title="Seen" />
    </div>
  );
};

export default HomePage;
