import React, { useContext } from "react";
import { ThemeContext } from "./ModeThemeContext";

const HeroGallery = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme !== "light"
          ? "bg-zinc-800 text-zinc-300"
          : "bg-zinc-50 text-zinc-800"
      } heroGaller max-w-full flex flex-col pl-4 sm:pl-10`}
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 pr-5">
        Today's Hot Deals
      </h1>
      <p className="text-base sm:text-lg leading-relaxed  pr-5 text-pretty">
        Explore the latest mobile listings from local sellers and trusted
        dealers in your area. Whether you're looking for a budget-friendly phone
        or a premium model, today’s freshly listed deals offer unbeatable
        prices. Connect directly with sellers, compare options, and take
        advantage of competitive pricing. Don’t miss out on the best offers find
        your perfect mobile at a great price today!
      </p>

      <div className="container mx-auto pr-3 sm:px-5 py-4 lg:px-32 lg:pt-8">
        <div className=" flex flex-wrap md:-m-2">
          <div className="flex w-full sm:w-[35%] flex-wrap">
            <div className="w-1/2 p-1 sm:p-2">
              <img
                alt="Samsung Galaxy S24 Ultra mobile phone"
                loading="lazy"
                className="block h-full w-full rounded-md object-cover object-center overflow-hidden hover:scale-[105%] transition ease-linear duration-500"
                src="https://bgr.com/wp-content/uploads/2024/01/samsung-galaxy-s24-ultra-6.jpg?quality=82&strip=all&resize=1400,1050"
              />
            </div>
            <div className="w-1/2 p-1 sm:p-2">
              <img
                alt="OnePlus 12 mobile phone display"
                loading="lazy"
                className="block h-full w-full rounded-md object-cover object-center overflow-hidden hover:scale-[105%] transition ease-linear duration-500"
                src="https://imageio.forbes.com/specials-images/imageserve/65ceada7adebb6e756f3ff40/OnePlus-12-6-82--LTPO-AMOLED-Display/960x0.jpg?height=483&width=711&fit=bounds"
              />
            </div>
            <div className="w-full p-1 sm:p-2">
              <img
                alt="iPhone 16 Pro Max smartphone design"
                loading="lazy"
                className="block h-full w-full rounded-md object-cover object-center overflow-hidden hover:scale-[105%] transition ease-linear duration-500"
                src="https://fdn.gsmarena.com/imgroot/news/24/09/what-to-expect-iphone-16pro-16promax/inline/-1200/gsmarena_002.jpg"
              />
            </div>
          </div>
          <div className="flex w-full sm:w-1/2 flex-wrap">
            <div className="w-full p-1 sm:p-2">
              <img
                alt="Foldable phone design featuring an OPPO model"
                loading="lazy"
                className="block h-full w-full rounded-md object-cover object-center overflow-hidden hover:scale-[105%] transition ease-linear duration-500"
                src="https://helios-i.mashable.com/imagery/articles/00dc5AHOoMIxpbGPdFqCYfR/images-2.fill.size_2000x1125.v1723371839.jpg"
              />
            </div>
            <div className="w-1/2 p-1 sm:p-2">
              <img
                alt="Xiaomi Mix Fold 2 foldable phone"
                loading="lazy"
                className="block h-full w-full rounded-md object-cover object-center overflow-hidden hover:scale-[105%] transition ease-linear duration-500"
                src="https://xiaomiplanet.sk/wp-content/uploads/2022/09/xiaomi-mix-fold-2-testujeme-xiaomiplanet-cover.jpg"
              />
            </div>
            <div className="w-1/2 p-1 sm:p-2">
              <img
                alt="OPPO Find N2 foldable phone design"
                loading="lazy"
                className="block h-full w-full rounded-md object-cover object-center overflow-hidden hover:scale-[105%] transition ease-linear duration-500"
                src="https://i0.wp.com/nasilemaktech.com/wp-content/uploads/2022/12/OPPO-Find-N2-review-00001.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGallery;
