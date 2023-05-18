import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function TaskCard({ task, deleteTask }) {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMenuClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative flex flex-col items-start p-4 mt-3 hover:border-1 border-card card-custom-bg rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100">
      <button
        className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
        onClick={handleMenuClick}
      >
        <svg
          width="10"
          height="6"
          viewBox="0 0 28 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 3C22 2.40665 22.176 1.82663 22.5056 1.33328C22.8353 0.839933 23.3038 0.455424 23.8519 0.228361C24.4001 0.00129844 25.0033 -0.0581097 25.5853 0.057646C26.1672 0.173402 26.7018 0.459118 27.1213 0.878676C27.5409 1.29823 27.8266 1.83279 27.9424 2.41473C28.0581 2.99668 27.9987 3.59988 27.7717 4.14805C27.5446 4.69623 27.16 5.16477 26.6667 5.49441C26.1733 5.82406 25.5933 6 25 6C24.2044 6 23.4413 5.68393 22.8787 5.12132C22.3161 4.55871 22 3.79565 22 3ZM11 3C11 2.40665 11.176 1.82663 11.5056 1.33328C11.8353 0.839933 12.3038 0.455424 12.8519 0.228361C13.4001 0.00129844 14.0033 -0.0581097 14.5853 0.057646C15.1672 0.173402 15.7018 0.459118 16.1213 0.878676C16.5409 1.29823 16.8266 1.83279 16.9424 2.41473C17.0581 2.99668 16.9987 3.59988 16.7717 4.14805C16.5446 4.69623 16.16 5.16477 15.6667 5.49441C15.1733 5.82406 14.5933 6 14 6C13.2044 6 12.4413 5.68393 11.8787 5.12132C11.3161 4.55871 11 3.79565 11 3ZM0 3C0 2.40665 0.175971 1.82663 0.505615 1.33328C0.835259 0.839933 1.30375 0.455424 1.85193 0.228361C2.40011 0.00129844 3.00332 -0.0581097 3.58527 0.057646C4.16721 0.173402 4.70178 0.459118 5.12134 0.878676C5.5409 1.29823 5.82663 1.83279 5.94238 2.41473C6.05814 2.99668 5.99873 3.59988 5.77167 4.14805C5.5446 4.69623 5.16003 5.16477 4.66669 5.49441C4.17334 5.82406 3.59334 6 3 6C2.20435 6 1.44127 5.68393 0.878662 5.12132C0.316053 4.55871 0 3.79565 0 3Z"
            fill="#190041"
          />
        </svg>
      </button>
      {showDropdown && (
        <div className="absolute top-0 right-0 mt-8 bg-white rounded shadow-md">
          <button
            className="block px-1 py-1 text-xs text-red-500 hover:bg-gray-100"
            onClick={() => deleteTask(task.id)}
          >
            {t("Delete")}
          </button>
        </div>
      )}
      <span
        className={`flex items-center h-4 px-1 text-xs font-small rounded-sm ${
          task?.priority === "High"
            ? "text-white bg-red-400"
            : task?.priority === "Medium"
            ? "text-white bg-green-400"
            : "text-white bg-yellow-400"
        }`}
      >
        {" "}
        {t(task?.priority)}
      </span>
      <h4 className="mt-1 text-sm font-semibold">{task?.title}</h4>
      <h4 className="mt-1 text-xs font-small text-black">
        {task?.description}
      </h4>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <img
          className="w-6 h-6 rounded-full border"
          src="/Ellipse_12.png"
          alt=""
        />
        <div className="relative flex items-center ml-auto">
          <svg
            width="14"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.08277 15.2067C8.57443 15.2067 8.09555 14.9733 7.75666 14.5667L6.65156 13.2333C6.62946 13.2067 6.54105 13.1733 6.50421 13.1667H6.13585C3.06368 13.1667 1.16292 12.4133 1.16292 8.66666V5.33333C1.16292 2.38666 2.8795 0.833328 6.13585 0.833328H12.0297C15.286 0.833328 17.0026 2.38666 17.0026 5.33333V8.66666C17.0026 11.6133 15.286 13.1667 12.0297 13.1667H11.6613C11.6024 13.1667 11.5508 13.1933 11.514 13.2333L10.4089 14.5667C10.07 14.9733 9.59111 15.2067 9.08277 15.2067ZM6.13585 1.83333C3.49835 1.83333 2.26801 2.94666 2.26801 5.33333V8.66666C2.26801 11.68 3.40995 12.1667 6.13585 12.1667H6.50421C6.87995 12.1667 7.30725 12.36 7.53564 12.6333L8.64073 13.9667C8.89859 14.2733 9.26695 14.2733 9.52481 13.9667L10.6299 12.6333C10.873 12.34 11.2561 12.1667 11.6613 12.1667H12.0297C14.6672 12.1667 15.8975 11.0533 15.8975 8.66666V5.33333C15.8975 2.94666 14.6672 1.83333 12.0297 1.83333H6.13585Z"
              fill="#190041"
            />
            <path
              d="M9.08277 8.00001C8.6702 8.00001 8.34604 7.70001 8.34604 7.33334C8.34604 6.96667 8.67757 6.66667 9.08277 6.66667C9.48797 6.66667 9.8195 6.96667 9.8195 7.33334C9.8195 7.70001 9.49534 8.00001 9.08277 8.00001Z"
              fill="#190041"
            />
            <path
              d="M12.0297 8.00001C11.6171 8.00001 11.293 7.70001 11.293 7.33334C11.293 6.96667 11.6245 6.66667 12.0297 6.66667C12.4349 6.66667 12.7664 6.96667 12.7664 7.33334C12.7664 7.70001 12.4423 8.00001 12.0297 8.00001Z"
              fill="#190041"
            />
            <path
              d="M6.13584 8.00001C5.72327 8.00001 5.39911 7.70001 5.39911 7.33334C5.39911 6.96667 5.73064 6.66667 6.13584 6.66667C6.54104 6.66667 6.87257 6.96667 6.87257 7.33334C6.87257 7.70001 6.54841 8.00001 6.13584 8.00001Z"
              fill="#190041"
            />
          </svg>

          <span className="ml-1 leading-none text-xs font-medium primary-text-color">
            12 {t("messages")}
          </span>
        </div>
        <div className="flex items-center ml-3">
          <svg
            width="14"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8525 7.33333V11.3333C15.8525 14 15.1158 14.6667 12.1689 14.6667H4.80155C1.85463 14.6667 1.1179 14 1.1179 11.3333V4.66666C1.1179 1.99999 1.85463 1.33333 4.80155 1.33333H5.90664C7.01174 1.33333 7.25486 1.62666 7.6748 2.13333L8.77989 3.46666C9.05985 3.79999 9.22193 3.99999 9.95866 3.99999H12.1689C15.1158 3.99999 15.8525 4.66666 15.8525 7.33333Z"
              stroke="#190041"
              stroke-miterlimit="10"
            />
            <path
              d="M5.90656 1.33333H12.5371C14.0106 1.33333 14.7473 1.99999 14.7473 3.33333V4.25333"
              stroke="#190041"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.3269 10H6.64328"
              stroke="#190041"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span className="ml-1 leading-none text-xs font-medium primary-text-color">
            12 {t("files")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
