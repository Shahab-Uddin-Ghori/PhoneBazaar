import React, { useContext, useState } from "react";
import { ThemeContext } from "./ModeThemeContext";

const HeroGallery = () => {
  const [theme] = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  // r1 images
  const images = [
    "https://i.insider.com/66edcd1fcfb7f307e573a7c3?width=700",
    "https://img.leboncoin.fr/api/v1/lbcpb1/images/83/f0/c0/83f0c00a8e91e71f3fea10d4f04225158a6ce6dc.jpg?rule=ad-large",
    "https://www.digitaltrends.com/wp-content/uploads/2024/01/galaxy-24-ultra-and-s24-plus-back.jpg?fit=3000%2C2000&p=1",
    "https://www.zdnet.com/a/img/resize/f2c84b10135f62698ab1c094cabff3e109d369eb/2023/10/02/291be3ef-2e02-460b-87bc-b7623900a2e0/google-pixel-8-in-hand.jpg?auto=webp&fit=crop&height=1200&width=1200",
    "https://www.digitaltrends.com/wp-content/uploads/2024/02/pixel-8-pro-back-hand.jpg?fit=3000%2C2000&p=1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQto-f9lYLwjIaZyfRZK_9eAdtih6NkyHpLS0ktZmZQtEj-2wHIYki5dJfJe5ih8pNZ2U4&usqp=CAU",
  ];

  // r2images
  const imagesR2 = [
    "https://cdn.mos.cms.futurecdn.net/Nr6f9HPS4ymafxtXRRSsfU-1200-80.jpg",
    "https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/iphone-minijpg-013117-16x9.jpg?VersionId=8gnlHaLuyEpfzRHK8ZhziUWdNMS4kE5B&size=690:388",
    "https://www.androidauthority.com/wp-content/uploads/2020/11/iPhone-12-Pro-holding-bakc-of-phone-against-sunset.jpg",
    "https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2023/02/Samsung-Galaxy-S23-Ultra-review-9-scaled.jpg?ssl=1&quality=80&w=f",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSov5oNNSQn63-z6wXteQKaF8uDL80SlhpGmnv6sD62thNMNJ5kV-6Q0p5zVcHDK9LxwAo&usqp=CAU",
    "https://images.anandtech.com/doci/16582/2_678x452.jpg",
  ];
  const itemsPerPage = 3; // Number of images to show in one view

  // Function to handle next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= images.length ? 0 : prevIndex + itemsPerPage
    );
  };

  // Function to handle previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? images.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  // Function to handle previous slide
  const handlePrev2 = () => {
    setCurrentIndex2((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? images.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  // Function to handle next slide
  const handleNext2 = () => {
    setCurrentIndex2((prevIndex) =>
      prevIndex + itemsPerPage >= images.length ? 0 : prevIndex + itemsPerPage
    );
  };

  return (
    <div
      className={`${
        theme !== "light"
          ? "bg-zinc-800 text-zinc-300"
          : "bg-zinc-50 text-zinc-800"
      } heroGallery h-[calc(100vh-6rem)] max-w-full flex flex-col py-5`}
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 pr-5 text-center">
        Today's Hot Deals
      </h1>

      <div className="flex gap-5 flex-col">
        {/* Carousel 1*/}
        <div className="relative w-full mx-auto overflow-hidden ">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)`,
            }}
          >
            {images.map((src, index) => (
              <div key={index} className="flex-none w-1/3 p-2">
                <img
                  src={src}
                  alt={`carousel ${index + 1}`}
                  className="w-full h-72 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Prev/Next Buttons */}
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-r"
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-l"
            onClick={handleNext}
          >
            Next
          </button>
        </div>

        {/* Carousel 2 */}
        <div className="relative w-full mx-auto overflow-hidden ">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${
                (currentIndex2 / itemsPerPage) * 100
              }%)`,
            }}
          >
            {imagesR2.map((src, index) => (
              <div key={index} className="flex-none w-1/3 p-2 ">
                <img
                  src={src}
                  alt={`carousel ${index + 1}`}
                  className="w-full h-72 object-cover rounded-lg "
                />
              </div>
            ))}
          </div>

          {/* Prev/Next Buttons */}
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-r"
            onClick={handlePrev2}
          >
            Prev
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-l"
            onClick={handleNext2}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroGallery;
