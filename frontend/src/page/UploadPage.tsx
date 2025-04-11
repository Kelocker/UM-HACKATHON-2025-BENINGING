import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconDatabase,
  IconInfoCircle,
  IconCalendar,
  IconNote,
  IconUpload,
  IconArrowLeft,
} from "@tabler/icons-react";
import IconButton from "../components/IconButton.tsx";

type DialogStage = "loading" | "done";

const UploadPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dataSource, setDataSource] = useState("");
  const [infoType, setInfoType] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [dialogStage, setDialogStage] = useState<DialogStage>("loading");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    setShowDialog(true);
    setDialogStage("loading");

    // Simulate 3-second loading
    setTimeout(() => {
      setDialogStage("done");
    }, 3000);
  };

  const handleProceedToChat = () => {
    const title = selectedFiles[0]?.name || "UploadedFile";
    const filename = `Uploaded Data (${title})`;

    navigate("/aibot", {
      state: { code: "upload", title: filename },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <IconButton onClick={() => navigate(-1)} Icon={IconArrowLeft} />
          <span className="font-bold text-sm">Upload files</span>
        </div>
      </div>
      <div className="w-full mt-4 flex flex-col items-center">
        <div className="max-w-lg w-full border rounded-md p-4">
          <div
            className="border-2 w-full border-dashed border-gray-400 rounded-md py-6 px-2 flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={handleBrowseFiles}
          >
            <p className="mb-2">Drop your files here!</p>
            <p className="text-xs text-gray-500">or click</p>
            <button
              onClick={handleBrowseFiles}
              className="mt-2 px-4 py-2 bg-black text-white text-sm rounded flex items-center gap-1"
            >
              <IconUpload size={16} />
              Add files
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <ul className="mt-2 text-sm list-disc list-inside">
            {selectedFiles.map((file, idx) => (
              <li key={idx} className="truncate">
                {file.name}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <div className="font-semibold mb-2">OPTIONS</div>

            <label className="flex items-center gap-2 mb-2">
              <IconDatabase size={18} />
              <span>Where did this data come from?</span>
            </label>
            <select
              value={dataSource}
              onChange={(e) => setDataSource(e.target.value)}
              className="w-full border rounded p-2 text-sm mb-4"
            >
              <option value="" disabled>
                Select one
              </option>
              <option>Shopee Seller Centre</option>
              <option>Lazada Seller Center</option>
              <option>GrabFood / GrabMerchant</option>
              <option>FoodPanda Portal</option>
              <option>TikTok Shop</option>
              <option>Facebook / Instagram / WhatsApp Sales</option>
              <option>My POS System</option>
              <option>My Own Record</option>
              <option>Other</option>
            </select>

            <label className="flex items-center gap-2 mb-2">
              <IconInfoCircle size={18} />
              <span>What kind of information is this?</span>
            </label>
            <select
              value={infoType}
              onChange={(e) => setInfoType(e.target.value)}
              className="w-full border rounded p-2 text-sm mb-4"
            >
              <option value="" disabled>
                Select one
              </option>
              <option>Daily Sales Summary</option>
              <option>Monthly Sales Report</option>
              <option>Order List</option>
              <option>Inventory List</option>
              <option>Customer List</option>
              <option>Product Details</option>
              <option>Expense Record</option>
              <option>Other</option>
            </select>

            <label className="flex items-center gap-2 mb-2">
              <IconCalendar size={18} />
              <span>What time period does this data cover?</span>
            </label>
            <input
              type="text"
              placeholder="E.g. 2023-01-01 to 2023-01-31"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full border rounded p-2 text-sm mb-4"
            />

            <label className="flex items-center gap-2 mb-2">
              <IconNote size={18} />
              <span>Additional notes</span>
            </label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full border rounded p-2 text-sm mb-4"
              rows={3}
            ></textarea>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleUpload}
              className="bg-black text-white px-4 py-2 rounded text-sm"
            >
              Upload files
            </button>
            {/* <button
              onClick={() => navigate(-1)}
              className="text-sm underline text-gray-600"
            >
              Cancel
            </button> */}
          </div>
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded w-72 text-center relative">
            {dialogStage === "loading" && (
              <div className="flex flex-col my-3 items-center w-full">
                <div className="loader"></div>
                <div className="pt-8 font-bold">Analyzing the data ...</div>
              </div>
            )}
            {dialogStage === "done" && (
              <>
                <div className="mb-3 font-semibold">
                  We've received your data!
                </div>
                <p className="text-sm mb-3">
                  To ensure everything is accurate before saving, our AI
                  assistant has 1-2 quick questions. A short chat will help us
                  get it right.
                </p>
                <button
                  className="bg-black text-white px-4 py-2 rounded text-sm"
                  onClick={handleProceedToChat}
                >
                  Proceed to chat?
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
