"use client";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import Partenr from "@/components/partenr";
export default function Home() {
  return (
    <div className="flex-1 items-center">
      <section className="h-auto relative min-h-screen bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center overflow-hidden flex-row ">
        <div className="container mx-auto px-6 py-24 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            {/* Left Content Area */}
            <div className="md:w-1/2 text-center md:text-left space-y-6 mb-28">
              <h1 className="text-xl md:text-3xl font-bold tracking-wide text-yellow-500">
                Hulu Gebeya
              </h1>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wide">
                Next Level Software Project for Ethiopian Market and Beyond
              </h2>
              <p className="text-base md:text-lg text-gray-200 mt-4 max-w-lg mx-auto md:mx-0">
                A comprehensive solution for Ethiopian businesses and
                entrepreneurs to grow this idustry by providing a platform for
                buying and selling products online and connecting with their
                Profision
              </p>
            </div>
            {/* Right Illustration Area */}
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="w-full max-w-sm md:max-w-md lg:max-w-xl h-auto relative">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 600 450"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="25"
                    y="25"
                    width="550"
                    height="400"
                    rx="25"
                    fill="#F4F4F9"
                    className="shadow-2xl"
                  />
                  <rect
                    x="50"
                    y="50"
                    width="500"
                    height="350"
                    rx="15"
                    fill="#FFFFFF"
                  />

                  {/* Simulated content inside the illustration */}
                  <circle cx="75" cy="75" r="5" fill="#E84F47" />
                  <circle cx="95" cy="75" r="5" fill="#F6BE4C" />
                  <circle cx="115" cy="75" r="5" fill="#69C85C" />

                  <rect
                    x="150"
                    y="65"
                    width="400"
                    height="20"
                    rx="5"
                    fill="#EAEAEA"
                  />
                  <rect
                    x="150"
                    y="100"
                    width="200"
                    height="15"
                    rx="5"
                    fill="#D4D4D4"
                  />

                  <g>
                    {/* Left chart section */}
                    <rect
                      x="75"
                      y="150"
                      width="180"
                      height="100"
                      rx="10"
                      fill="#E8F5E9"
                    />
                    <path
                      d="M85 240 L105 190 L125 210 L145 180 L165 220 L185 195 L205 225 L225 200"
                      stroke="#3D8B4D"
                      strokeWidth="4"
                      fill="none"
                    />
                    <text
                      x="85"
                      y="165"
                      fill="#3D8B4D"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      75%
                    </text>

                    {/* Right chart section */}
                    <rect
                      x="270"
                      y="150"
                      width="180"
                      height="100"
                      rx="10"
                      fill="#E8F5E9"
                    />
                    <path
                      d="M280 240 L300 200 L320 220 L340 180 L360 210 L380 190 L400 230 L420 210"
                      stroke="#3D8B4D"
                      strokeWidth="4"
                      fill="none"
                    />
                  </g>

                  {/* Bottom charts */}
                  <g>
                    <rect
                      x="75"
                      y="270"
                      width="425"
                      height="100"
                      rx="10"
                      fill="#E8F5E9"
                    />
                    <path
                      d="M85 360 V300 M115 360 V320 M145 360 V290 M175 360 V330 M205 360 V310 M235 360 V340 M265 360 V305 M295 360 V335 M325 360 V315 M355 360 V345 M385 360 V325 M415 360 V350 M445 360 V330 M475 360 V355"
                      stroke="#3D8B4D"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Person illustrations - simplified */}
                  <circle cx="150" cy="350" r="20" fill="#6091B6" />
                  <rect x="130" y="370" width="40" height="60" fill="#A8D0E6" />

                  <circle cx="450" cy="350" r="20" fill="#F4A261" />
                  <rect x="430" y="370" width="40" height="60" fill="#E76F51" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Wave SVG at the bottom */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,192L48,176C96,160,192,128,288,106.7C384,85,480,75,576,90.7C672,107,768,149,864,154.7C960,160,1056,128,1152,106.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
      <div className="bg-white">
        <Partenr />
      </div>
    </div>
  );
}
