import React, { useContext } from "react";
import { ThemeContext } from "../../components/ModeThemeContext";

function ContactUs() {
  const [theme] = useContext(ThemeContext);

  return (
    <section
      className={`${
        theme === "light"
          ? "bg-zinc-100 h-screen text-zinc-800"
          : "bg-zinc-800 h-screen text-zinc-500"
      } transition-all duration-200 ease-linear`}
    >
      <div className="container h-full px-6 py-24 mx-auto">
        <div className="flex flex-col h-full items-center justify-center">
          <div className="md:w-8/12 lg:w-5/12">
            <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
            <form>
              {/* Name */}
              <div className="relative mb-8">
                <input
                  type="text"
                  className="peer block w-full rounded border-0 bg-transparent px-3 py-2 outline-none border-b-2 border-zinc-300 transition-all duration-200 ease-linear focus:text-primary peer-focus:text-primary"
                  id="nameInput"
                  required
                />
                <label
                  htmlFor="nameInput"
                  className="absolute left-3 -top-3 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                >
                  Name
                </label>
              </div>

              {/* Email */}
              <div className="relative mb-8">
                <input
                  type="email"
                  className="peer block w-full rounded border-0 bg-transparent px-3 py-2 outline-none border-b-2 border-zinc-300 transition-all duration-200 ease-linear focus:text-primary peer-focus:text-primary"
                  id="emailInput"
                  required
                />
                <label
                  htmlFor="emailInput"
                  className="absolute left-3 -top-3 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                >
                  Email
                </label>
              </div>

              {/* Message */}
              <div className="relative mb-8">
                <textarea
                  rows="4"
                  className="peer block w-full rounded border-0 bg-transparent px-3 py-2 outline-none border-b-2 border-zinc-300 transition-all duration-200 ease-linear focus:text-primary peer-focus:text-primary"
                  id="messageInput"
                  required
                />
                <label
                  htmlFor="messageInput"
                  className="absolute left-3 -top-3 mb-0 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.05rem] peer-focus:scale-[0.8] peer-focus:text-primary"
                >
                  Message
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full rounded px-7 pb-2.5 pt-3 text-sm font-medium text-white transition duration-150 ease-in-out ${
                  theme === "light" ? "bg-zinc-900" : "bg-orange-700"
                } hover:bg-orange-700 focus:outline-none`}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
