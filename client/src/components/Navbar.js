import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
function NavBar({ getData }) {
  const [search, setSearch] = useState();
  const [language, setLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  const handleLanguage = () => {
    if (language === "en") {
      i18n.changeLanguage("de");
    } else {
      i18n.changeLanguage("en");
    }
  };

  const searchData = () => {
    getData(search);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <nav className="flex items-center justify-between flex-wrap bg-custom py-4 lg:px-8 mt-5">
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid pb-5 lg:pb-0">
        <div className="flex flex-col  flex-shrink-0 text-gray-800 mr-16">
          <span className="font-normal text-xl tracking-tight primary-text-color">
            {t("Active lads")}
          </span>
          <div className="flex items-center justify-center">
            <img
              className="w-8 h-8 rounded-full border-2 border-white"
              src="/Ellipse_12.png"
              alt=""
            />
            <img
              className="w-8 h-8 rounded-full -ml-2 border-2 border-white"
              src="/Ellipse_13.png"
              alt=""
            />
            <div className="w-4 h-4 bg-gray-200 rounded-md icon-background flex items-center justify-center mr-1 ml-2">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <span class="ml-1 underline text-sm font-medium">
              {t("Add more")}
            </span>
          </div>
        </div>
      </div>

      <div className="menu w-full block flex items-center w-auto px-3 px-8">
        <div className="relative mx-auto text-gray-600 block">
          <input
            className="border-2 border card-custom-bg h-10 pl-2 pr-8 rounded-xl text-xs primary-text-color focus:outline-none"
            type="search"
            name="search"
            value={search}
            onChange={handleInputChange}
            placeholder={t("Search")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchData();
              }
            }}
          />
          <button
            type="submit"
            onClick={searchData}
            className="absolute right-0 top-0 mt-3 mr-2"
          >
            <svg
              className="text-yellow-400 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
        <div className="relative mx-auto text-gray-600 block">
          <select
            className="border-2 border card-custom-bg h-10 pl-2 pr-1 ml-2 rounded-xl text-xs primary-text-color focus:outline-none"
            name="search"
          >
            <option value="">{t("All time")}</option>
            {/* Add more options here */}
          </select>
        </div>

        <div className="relative mx-auto text-gray-600 block">
          <div className="border-2 border card-custom-bg h-10 pl-3 pr-3 ml-2 rounded-xl text-xs primary-text-color flex items-center justify-center">
            <div class="relative">
              <svg
                width="14"
                height="14"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3 13.5V8.50002C17.2711 6.90634 16.6177 5.38769 15.4805 4.27087C14.3432 3.15404 12.8129 2.52831 11.219 2.52831C9.62505 2.52831 8.09478 3.15404 6.95752 4.27087C5.82026 5.38769 5.16684 6.90634 5.13794 8.50002V13.5C5.13891 14.2031 4.95178 14.8936 4.59595 15.5H17.843C17.4868 14.8937 17.2994 14.2032 17.3 13.5ZM21.354 17.5H1.08398C0.818768 17.5 0.564489 17.3947 0.376953 17.2071C0.189417 17.0196 0.0839844 16.7652 0.0839844 16.5C0.0839844 16.2348 0.189417 15.9805 0.376953 15.7929C0.564489 15.6054 0.818768 15.5 1.08398 15.5C1.61796 15.5035 2.13149 15.2947 2.5116 14.9197C2.89171 14.5446 3.10726 14.034 3.11096 13.5V8.50002C3.14439 6.3717 4.01336 4.34187 5.53027 2.84859C7.04718 1.35532 9.09041 0.518372 11.219 0.518372C13.3476 0.518372 15.3908 1.35532 16.9077 2.84859C18.4246 4.34187 19.2936 6.3717 19.327 8.50002V13.5C19.3307 14.034 19.5463 14.5446 19.9264 14.9197C20.3065 15.2947 20.82 15.5035 21.354 15.5C21.6192 15.5 21.8736 15.6054 22.0612 15.7929C22.2487 15.9805 22.354 16.2348 22.354 16.5C22.354 16.7652 22.2487 17.0196 22.0612 17.2071C21.8736 17.3947 21.6192 17.5 21.354 17.5ZM13.849 21C13.5777 21.4557 13.1926 21.833 12.7316 22.095C12.2705 22.3571 11.7493 22.4949 11.219 22.4949C10.6887 22.4949 10.1675 22.3571 9.70642 22.095C9.24538 21.833 8.86032 21.4557 8.58899 21C8.50074 20.8472 8.45448 20.6737 8.45496 20.4973C8.45543 20.3208 8.5026 20.1476 8.59167 19.9952C8.68075 19.8429 8.8086 19.7168 8.96216 19.6298C9.11571 19.5429 9.28948 19.4981 9.46594 19.5H12.973C13.1494 19.4983 13.3231 19.5432 13.4766 19.6302C13.63 19.7173 13.7576 19.8434 13.8466 19.9957C13.9355 20.148 13.9826 20.3211 13.983 20.4975C13.9835 20.6739 13.9372 20.8473 13.849 21Z"
                  fill="#190041"
                />
              </svg>
              <span class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-yellow-500 rounded-full w-1 h-1"></span>
            </div>
          </div>
        </div>
        <div className="relative mx-auto text-gray-600 block">
          {language === "en" ? (
            <button onClick={handleLanguage}>
              <div className="border-2 border card-custom-bg h-10 pl-2 pr-2 ml-2 rounded-xl text-xs primary-text-color flex items-center justify-center">
                <img
                  src="/united-states.png"
                  alt="mage"
                  width="2"
                  height="2"
                  class="w-5 h-5 rounded-full"
                />
              </div>
            </button>
          ) : (
            <button onClick={handleLanguage}>
              <div className="border-2 border card-custom-bg h-10 pl-2 pr-2 ml-2 rounded-xl text-xs primary-text-color flex items-center justify-center">
                <img
                  src="/germany-flag-icon.png"
                  alt="mage"
                  width="2"
                  height="2"
                  class="w-5 h-5 rounded-full"
                />
              </div>
            </button>
          )}
        </div>
        <div className="relative mx-auto text-gray-600 block">
          <div className="border-2 border card-custom-bg h-10 w-10 ml-2 rounded-full flex items-center justify-center">
            <div className="rounded-full overflow-hidden w-full h-full primary-bg"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
