import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../components/ModeThemeContext";
import { BiLogoGoogle, BiPhone } from "react-icons/bi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { UserContext } from "../../components/UserContextProvider";
import SpinnerLoader from "../../components/SpinnerLoader";

const UserLogin = () => {
  const [theme] = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(UserContext);

  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(email, password);
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user==>", user);
      toast.success("User Login Successfully");

      if (user.isLogin == true) {
        navigate("/");
        console.log(user);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.isLogin == true) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <section className="min-h-[calc(100vh-6rem)]">
          <div
            className={`${
              theme === "light"
                ? "bg-zinc-50 text-zinc-700"
                : "bg-zinc-800 text-zinc-300"
            } min-h-screen p-5`}
          >
            <div className="flex h-full flex-wrap items-center justify-center lg:justify-between mt-24">
              {/* Left column */}
              <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="w-full"
                  alt="Sample image"
                />
              </div>

              {/* Right column */}
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                <form onSubmit={handleLoginForm}>
                  <div className="flex flex-row items-center justify-center lg:justify-start relative">
                    <p className="mb-0   text-center ">Login with</p>

                    {/* google button */}
                    <button
                      type="button"
                      className={`${
                        theme == "light"
                          ? "bg-zinc-900 hover:bg-zinc-950"
                          : "bg-orange-600 hover:bg-orange-700"
                      }   mx-1 inline-block h-9 w-9 rounded-full p-2 shadow-primary-3 transition duration-150 ease-in-out absolute left-0 lg:left-28`}
                    >
                      <BiLogoGoogle size={21} className={`$ text-zinc-100`} />
                    </button>

                    {/* Phone button */}
                    <button
                      type="button"
                      className={`${
                        theme == "light"
                          ? "bg-zinc-900 hover:bg-zinc-950"
                          : "bg-orange-600 hover:bg-orange-700"
                      }  mx-1 inline-block h-9 w-9 rounded-full p-2 shadow-primary-3 transition duration-150 ease-in-out absolute right-0 lg:right-28`}
                    >
                      <BiPhone size={20} className="text-zinc-100" />
                    </button>
                  </div>

                  {/* Separator */}
                  <div className="my-4 flex items-center before:flex-1 before:border-t before:border-neutral-300 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold">Or</p>
                  </div>

                  {/* Email input */}
                  <div className="relative mb-6">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      className="peer block w-full rounded border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-500 transition-all dark:text-white"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-3 top-1 -translate-y-4 scale-75 transform text-gray-500 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1.5 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-600"
                    >
                      Email address
                    </label>
                  </div>

                  {/* Password input */}
                  <div className="relative mb-6">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      className="peer block w-full rounded border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-500 transition-all dark:text-white"
                      placeholder=" "
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-3 top-1 -translate-y-4 scale-75 transform text-gray-500 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1.5 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange-600"
                    >
                      Password
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    className={` ${
                      theme == "light"
                        ? "bg-zinc-900 hover:bg-zinc-950"
                        : "bg-orange-600 hover:bg-orange-700"
                    } inline-block w-full  text-white py-2 rounded transition duration-200 ease-in-out`}
                  >
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserLogin;
