import React, { useState, useRef, useContext } from "react";
import { BiPause, BiPlay } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ThemeContext } from "./ModeThemeContext";

const sliderObj = [
  {
    url: `https://www.apple.com/105/media/us/iphone/family/2024/cf19f185-dd7e-4350-97ff-e44860713b54/anim/welcome/xlarge_2x.mp4`,
  },
  {
    url: `https://images.samsung.com/pk/smartphones/galaxy-z-fold6/videos/galaxy-z-fold6-features-highlights-design.webm?imbypass=true`,
  },
  {
    url: `https://storage.googleapis.com/mannequin/blobs/3d072c47-0c13-4851-82f9-e913b1bd9073.webm`,
  },
];

function SlideShow() {
  const [theme, setTheme] = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0); // Current active slide
  const [isPlaying, setIsPlaying] = useState(true); // For play/pause
  const videoRefs = useRef([]); // Array to hold video refs

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === sliderObj.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? sliderObj.length - 1 : prevIndex - 1
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    videoRefs.current.forEach((video) => {
      if (video) {
        isPlaying ? video.pause() : video.play();
      }
    });
  };

  return (
    <div
      className={`${
        theme == "light"
          ? "bg-zinc-50 text-zinc-800"
          : "bg-zinc-800 text-zinc-300"
      } max-w-full flex  flex-col  justify-center  h-[calc(100vh-6rem)] mt-24`}
    >
      <div className="intro ml-10 mr-10 mb-10 max-w-full ">
        <h1 className="mb-5 text-4xl font-bold">Welcome Phone Bazaar Wala</h1>
        <p className="sm:w-3/4 md:3/4 w-full text-pretty ">
          Discover a seamless marketplace for new and used mobile phones. Buy
          from verified sellers or dealers, set your own prices, and enjoy
          secure, transparent transactions. Connect with local sellers and get
          the best deals on your next mobile phone.
        </p>
      </div>
      {/* Slider Wrapper */}
      <div className="videoContainer w-full flex justify-between items-center overflow-hidden  h-2/4 lg:h-3/5 ">
        <div
          className="flex transition-transform duration-500 ease-in-out w-full h-full "
          style={{
            transform: `translateX(-${activeIndex * 100}%) `,
          }}
        >
          {sliderObj.map((card, index) => (
            <div
              key={index}
              className={`min-w-full flex-shrink-0 flex justify-center items-center transition-transform ${
                index === activeIndex ? "scale-100" : "scale-75 opacity-50"
              } h-full `}
            >
              <div className="card w-64 h-56 md:w-[60%] sm:w-[60%] sm:h-full md:h-full lg:h-full  border shadow-md rounded-2xl overflow-hidden border-none outline-none ">
                <div className="imgContainer flex items-center justify-center w-full h-full overflow-hidden relative">
                  <video
                    src={card.url}
                    ref={(el) => (videoRefs.current[index] = el)} // Store reference to each video
                    autoPlay={false} // Remove autoplay for manual control
                    loop
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  {/*  */}
                  {/* Left Arrow */}
                  <FaArrowLeft
                    size={36}
                    className="absolute left-5 sm:left-12 top-[50%] translate-y-[-50%] text-zinc-50 z-20 hover:bg-orange-600 transition-all ease-linear hover:cursor-pointer hover:rounded-full p-2 "
                    onClick={handlePrev}
                  />

                  {/* Right Arrow */}
                  <FaArrowRight
                    size={36}
                    className="absolute right-5 sm:right-12 top-[50%] translate-y-[-50%] text-zinc-50 z-20 hover:bg-orange-600 transition-all ease-linear hover:cursor-pointer hover:rounded-full p-2 "
                    onClick={handleNext}
                  />

                  {/* Play/Pause Button */}
                  {isPlaying ? (
                    <BiPause
                      size={44}
                      className="absolute bottom-5 left-1/2 translate-x-[-50%] text-zinc-50 z-20 hover:bg-orange-600 transition-all ease-linear hover:cursor-pointer hover:rounded-full p-2 "
                      onClick={togglePlayPause}
                    />
                  ) : (
                    <BiPlay
                      size={44}
                      className="absolute bottom-5 left-1/2 translate-x-[-50%] text-zinc-50 z-20 hover:bg-orange-600 transition-all ease-linear hover:cursor-pointer hover:rounded-full p-2 "
                      onClick={togglePlayPause}
                    />
                  )}
                  {/*  */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SlideShow;
