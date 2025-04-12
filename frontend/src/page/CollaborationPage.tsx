import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconCoffee,
  IconIceCream2,
  IconShoppingCartPlus,
  IconBrandCampaignmonitor,
  IconArrowLeft,
} from "@tabler/icons-react";
import IconButton from "../components/IconButton.tsx";

import C001 from "../assets/C001.jpeg";
import C002 from "../assets/C002.jpeg";
import C003 from "../assets/C003.jpeg";
import C004 from "../assets/C004.jpg";

const CollaborationPage = () => {
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDialog(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const opportunities = [
    {
      id: "C0O1",
      src: C001,
      icon: <IconCoffee size={24} className="text-green-600" />,
      title: "Opportunity 1: Upsell with Premium Beverages",
      partner: "Bubble Tea Mania (Beverage Shop | 📍 300m away)",
      collaboration:
        "Offer a bundled upgrade: Customer buys your 'Cheesy Beef Burger Meal' + can upgrade the standard drink to 'Classic Pearl Milk Tea (R)' for an additional RM Y.YY.",
      insight:
        "Analysis shows high correlation between burger meals and bubble tea orders during evenings & weekends in your area.",
    },
    {
      id: "C0O2",
      src: C002,

      icon: <IconIceCream2 size={24} className="text-sky-600" />,
      title: "Opportunity 2: Complete the Meal: Dinner + Dessert",
      partner: "Cool Cones Ice Cream (Dessert Parlor | 📍 550m away)",
      collaboration:
        "Offer an add-on deal: Your 'Double Cheeseburger Value Meal' + their 'Single Scoop Ice Cream Cup.'",
      insight:
        "Platform data indicates many dinner-time fast-food orders (7 PM - 9 PM) are followed by dessert searches. Proximity makes bundling feasible.",
    },
    {
      id: "C0O3",
      src: C003,

      icon: <IconShoppingCartPlus size={24} className="text-yellow-600" />,
      title: "Opportunity 3: Target Late-Night Snackers",
      partner: "MyNews Bites (Convenience Store | 📍 250m away)",
      collaboration:
        "Launch a 'Supper Saver Pack' after 10 PM: Your 'Cheesy Beef Burger' + a choice of 'Large Snack' from MyNews Bites.",
      insight:
        "Data shows a spike in both fast-food + convenience store orders between 10 PM - 1 AM on Fri/Sat in this zone.",
    },
    {
      id: "C0O4",
      src: C004,

      icon: <IconBrandCampaignmonitor size={24} className="text-purple-600" />,
      title: "Opportunity 4: “Quick Bites Week” Campaign",
      partner:
        "GrabFood Platform Initiative (multiple QSRs in City A) - upcoming event",
      collaboration:
        "Opt-in to 'City A Quick Bites Week.' Feature a special high-value combo only during the campaign.",
      insight:
        "AI analysis shows participants in similar campaigns see ~40% higher visibility and ~20% more orders. High-impact, low-effort exposure.",
    },
  ];

  const handleExploreMore = (oppId, oppTitle) => {
    navigate("/aibot", {
      state: { code: oppId, title: oppTitle },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <IconButton onClick={() => navigate(-1)} Icon={IconArrowLeft} />

          <span className="font-bold text-sm">Collaboration Opportunities</span>
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded w-72 text-center relative">
            <div className="flex flex-col my-3 items-center w-full">
              {/* Simple rotating loader */}
              <div className="loader"></div>
              <div className="pt-8 font-bold">
                Finding Nearby Opportunities ...
              </div>
            </div>
          </div>
        </div>
      )}

      {!showDialog && (
        <>
          {/* Grid: 1 col on mobile, 3 on md/lg */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="border rounded p-4 shadow flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-2">
                  {opp.icon}
                  <h2 className="font-bold text-md">{opp.title}</h2>
                </div>
                <div className="relative bg-gray-100 rounded-lg cursor-pointer aspect-[4/2] w-full h-auto overflow-hidden">
                  <img
                    src={opp.src}
                    alt={opp.id}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div className="mb-2 text-sm mt-2">
                  <span className="font-bold">Potential Partner:</span>{" "}
                  {opp.partner}
                </div>
                <div className="mb-2 text-sm">
                  <span className="font-bold">Suggested Collaboration:</span>{" "}
                  {opp.collaboration}
                </div>
                <div className="mb-4 text-sm">
                  <span className="font-bold">Insight:</span> {opp.insight}
                </div>

                <button
                  className="bg-black text-white px-4 py-2 rounded text-sm"
                  onClick={() => handleExploreMore(opp.id, opp.title)}
                >
                  Explore More
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CollaborationPage;
