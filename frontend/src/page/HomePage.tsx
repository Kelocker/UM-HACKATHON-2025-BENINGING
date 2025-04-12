import React from "react";
// import placeholderImage from "../assets/random.png";
import IconButton from "../components/IconButton.tsx";
import { useNavigate } from "react-router-dom";
import ImagesBlog from "../components/ImagesBlog.tsx";

import S001 from "../assets/S001.jpg";
import S002 from "../assets/S002.jpg";
import S003 from "../assets/S003.png";

import U001 from "../assets/U001.jpg";
import U002 from "../assets/U002.jpg";
import U003 from "../assets/U003.jpg";

import I001 from "../assets/I001.jpg";
import I002 from "../assets/I002.jpg";
import I003 from "../assets/I003.jpg";
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
  IconRobot,
  IconUpload,
  IconMoneybag,
  IconBuildingStore,
  IconCalendarBolt,
  IconArrowDown,
  IconArrowUp,
  IconCashBanknote,
} from "@tabler/icons-react";

// import LocalNotificationButton from "../components/LocalNotificationButton.tsx";
// import ImageSwiper from "../components/ImageSwiper.tsx";

const HomePage = () => {
  const navigate = useNavigate();

  const nowList = [
    {
      src: S001,
      title: "Concert Crowd Incoming?",
      code: "S001",
      desc: "Big concert nearby next Friday, potential late-night delivery surge.",
    },
    {
      src: S002,
      title: "Salad ayam Trend Growing",
      code: "S002",
      desc: "'salad ayam' / ‘salad ayam caeser’ keyword searches up 50% recently",
    },
    {
      src: S003,
      title: "AOV Winning vs Peers!",
      code: "S003",
      desc: "Your Average Order Value (AOV) is 10% higher than similar fast-food averages in this city.",
    },
  ];

  const shopList = [
    {
      src: U001,
      title: "Burger Sales Dropped!",
      code: "U001",
      desc: "'Signature Burger' sales decreased by 20% last week",
    },
    {
      src: U002,
      title: "Monthly Sales Trending Up!",
      code: "U002",
      desc: "Great start! Your total sales revenue for April so far is tracking 10% higher compared to the same period in March.",
    },
    {
      src: U003,
      title: "Lunch Rush Slowdown?",
      code: "U003",
      desc: "During lunch peak last week (12:30 PM - 1:30 PM), average order prep time hit 15 mins, with driver wait times over 7 mins.",
    },
  ];

  const tipsList = [
    {
      src: I001,
      title: "Combo Idea: Burger & Fries",
      code: "I001",
      desc: "Suggest bundling 'Fries' + 'Signature Burger' as customers often buy them together",
    },
    {
      src: I002,
      title: "Afternoon Snack Deal?",
      code: "I002",
      desc: "Offer a small combo (Fries + Drink or Wrap) at special price from 3 PM - 5 PM to boost sales during slow hours.",
    },
    {
      src: I003,
      title: "Push Drink Add-ons!",
      code: "I003",
      desc: "Many skip drinks. Try 'Add a Large Drink for just RM2 more' to increase basket size.",
    },
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

  const amount = 25859;
  const change = 17.25;

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
      <div className="w-[100%] mt-4 flex justify-center p-4">
        <div className="p-2  pb-4 w-[100%] max-w-3xl border-2 shadow-md rounded-lg">
          <div className="md:text-center text-start flex gap-1 font-semibold mb-4">
            <IconCashBanknote className="text-yellow-600" /> Sales Record from
            the Last 7 Days
          </div>

          <div className="flex px-4 gap-2 mb-4">
            <div className="text-3xl text-end font-bold text-gray-900">
              ${amount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 flex justify-end items-center mt-1">
              {change >= 0 ? (
                <>
                  <IconArrowUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 font-semibold">
                    {change}%
                  </span>
                  <span className="ml-1">vs. last month</span>
                </>
              ) : (
                <>
                  <IconArrowDown className="w-4 h-4 text-red-500" />
                  <span className="text-red-500 font-semibold">
                    {Math.abs(change)}%
                  </span>
                  <span className="ml-1">vs. last month</span>
                </>
              )}
            </div>
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
                    fill={entry.sales >= 0 ? "#22c55e" : "#ef4444"} // Use green for positive sales, red for negative
                    // fill={colors[index % colors.length]} // each day not same color
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
      {/* <ImageSwiper images={tipsList} title="Important" /> */}

      <ImagesBlog
        images={nowList}
        title="What's Happening Nearby?"
        Icon={IconCalendarBolt}
        iconColor="text-violet-800"
      />
      <ImagesBlog
        images={shopList}
        title="How Your Shop Is Doing?"
        Icon={IconBuildingStore}
        iconColor="text-sky-500"
      />
      <ImagesBlog
        images={tipsList}
        title="Tips For Your Business?"
        Icon={IconMoneybag}
        iconColor="text-yellow-400"
      />
    </div>
  );
};

export default HomePage;
