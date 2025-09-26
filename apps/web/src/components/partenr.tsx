import React from "react";

const Partners = () => {
  const partners = [
    {
      name: "Ethio telecom",
      image:
        "https://www.pngfind.com/pngs/m/495-4957388_ethio-telecom-logo-hd-png-download.png",
    },
    {
      name: "Tele Birr",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHzYqVJzaSRDA1ZetkukXAGqmyq9DTyKHZGg&s",
    },
    {
      name: "Safari com",
      image:
        "https://icon2.cleanpng.com/20180612/ouh/kisspng-kenya-safaricom-mobile-phones-customer-service-bus-safari-logo-5b2087f2242e85.0806080715288586101482.jpg",
    },
    {
      name: "Ethiopian commercial bank",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStP78qifNUtUsQYf1VdMz4pS40TCb7VL5UQw&s",
    },
    {
      name: "Tele Birr",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHzYqVJzaSRDA1ZetkukXAGqmyq9DTyKHZGg&s",
    },
  ];

  // Duplicate the array to create a seamless infinite scroll effect
  const partnersToRender = [...partners, ...partners];

  return (
    <div className="p-8 rounded-lg shadow-md flex flex-col items-center justify-center dark:bg-black h-auto ">
      <h1 className="text-yellow-500 font-bold text-7xl -mt-6 text-shadow-2xs">
        HuluGebeya
      </h1>
      <main className="mt-4">
        <div className="text-lg text-yellow-500 dark:text-white flex items-center justify-center ">
          Some of The partners that Work with HuluGebeya
        </div>

        {/* The main scrolling container */}
        <div className="marquee-container w-full overflow-hidden mt-8">
          {/* The content that gets animated */}
          <div className="marquee-content flex space-x-8">
            {partnersToRender.map((p, index) => (
              <div
                key={p.name + index}
                className="flex-shrink-0 flex flex-col items-center justify-center p-4"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Tailwind CSS CDN and custom styles for the animation */}
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite; /* Increased duration for smoother scroll */
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Partners;
