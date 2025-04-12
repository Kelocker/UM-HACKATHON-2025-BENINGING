import React from "react";
import { useNavigate } from "react-router-dom";

type ImageItem = {
  src: string;
  title: string;
  code: string;
  desc: string;
};

const ImagesBlog = ({ images, title, Icon, iconColor }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState<ImageItem | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (image: ImageItem) => {
    setSelected(image);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (selected) {
      navigate("/aibot", {
        state: { code: selected.code, title: selected.title },
      });
    }
  };

  return (
    <div className="p-4">
      <div className="text-start flex gap-1 font-semibold mb-2">
        <Icon className={iconColor} />

        {title}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index}>
            <div
              className="relative bg-gray-100 rounded-lg cursor-pointer aspect-[4/2] w-full h-auto overflow-hidden"
              onClick={() => handleClick(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover rounded-lg"
              />

              <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-white/30 p-2">
                <span className="text-white text-xs font-bold leading-snug block">
                  {image.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
      {open && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-4">
            <img
              src={selected.src}
              alt={selected.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-1">{selected.title}</h2>
            <p className="text-sm text-gray-700 mb-4">{selected.desc}</p>
            <div className="flex justify-end gap-2">
              <button
                className="text-sm px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Back
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded text-sm"
                onClick={handleConfirm}
              >
                Ask AI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesBlog;
