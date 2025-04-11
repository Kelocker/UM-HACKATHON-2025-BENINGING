import React from "react";
import placeholderImage from "../assets/random.png";
import IconButton from "../components/IconButton.tsx";
import { useNavigate } from "react-router-dom";
import ImagesBlog from "../components/ImagesBlog.tsx";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  Cell,
} from "recharts";
import {
  IconLabelImportantFilled,
  IconRobot,
  IconFiretruck,
  IconUpload,
} from "@tabler/icons-react";

// import LocalNotificationButton from "../components/LocalNotificationButton.tsx";
// import ImageSwiper from "../components/ImageSwiper.tsx";

const HomePage = () => {
  const navigate = useNavigate();

  const seenList = [
    {
      src: placeholderImage,
      title: "Placeholder Placeholder Placeholder 1",
      code: "S001",
    },
    { src: placeholderImage, title: "Placeholder 2", code: "S002" },
    { src: placeholderImage, title: "Placeholder 3", code: "S003" },
  ];
  const unSeenList = [
    { src: placeholderImage, title: "Placeholder 1", code: "U001" },
    { src: placeholderImage, title: "Placeholder 2", code: "U002" },
    { src: placeholderImage, title: "Placeholder 3", code: "U003" },
  ];

  const importantList = [
    { src: placeholderImage, title: "Placeholder 1", code: "I001" },
    { src: placeholderImage, title: "Placeholder 2", code: "I002" },
    { src: placeholderImage, title: "Placeholder 3", code: "I003" },
  ];

  const data = [
    { name: "Mon", sales: 4000, code: "MON", title: "Monday Sales Record" },
    { name: "Tue", sales: -3000, code: "TUE", title: "Tuesday Sales Record" },
    { name: "Wed", sales: -2000, code: "WED", title: "Wednesday Sales Record" },
    { name: "Thu", sales: -7800, code: "THU", title: "Thusday Sales Record" },
    { name: "Fri", sales: 5000, code: "FRI", title: "Friday Sales Record" },
    { name: "Sat", sales: -500, code: "SAT", title: "Saturday Sales Record" },
    { name: "Sun", sales: 2000, code: "SUN", title: "Sunday Sales Record" },
  ];

  const colors = [
    "#E40303",
    "#FF8C00",
    "#FFED00",
    "#008026",
    "#004DFF",
    "#750787",
    "#87CEEB",
  ]; // Pride colors + sky blue

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">Welcome</span>
        </div>
        <div className="flex items-center gap-2">
          <IconButton onClick={() => navigate("/aibot")} Icon={IconRobot} />
          <IconButton onClick={() => navigate("/upload")} Icon={IconUpload} />
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
      <div className="w-[100%] flex justify-center">
        <div className="p-4 w-[100%] max-w-3xl">
          <div className="text-center font-semibold mb-2">
            Sales Record from the Last 7 Days
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name">
                <Label
                  value="Moments in Time"
                  offset={-5}
                  position="insideBottom"
                />
              </XAxis>
              <YAxis
                label={{ value: "Sales", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              {/* <Legend verticalAlign="top" height={36} /> */}
              <Bar dataKey="sales">
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={colors[index % colors.length]}
                    className="cursor-pointer"
                    onClick={() =>
                      navigate("/aibot", {
                        state: { code: entry.code, title: entry.title },
                      })
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* <ImageSwiper images={importantList} title="Important" /> */}

      <ImagesBlog
        images={importantList}
        title="Important"
        Icon={IconFiretruck}
        iconColor="text-red-600"
      />

      <ImagesBlog
        images={unSeenList}
        title="Unseen"
        Icon={IconLabelImportantFilled}
        iconColor="text-yellow-300"
      />

      <ImagesBlog
        images={seenList}
        title="Seen"
        Icon={IconLabelImportantFilled}
        iconColor="text-gray-200"
      />
    </div>
  );
};

export default HomePage;
