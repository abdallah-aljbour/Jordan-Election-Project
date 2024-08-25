import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Advertisment() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2400,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false, // Hide arrows on very small screens
        },
      },
    ],
  };

  const getGradientStyle = (color1, color2, color3) => ({
    borderImage: `linear-gradient(to bottom, ${color1}, ${color2}, ${color3}) 1 / 4px`,
    borderImageSlice: 1,
  });

  const borderColors = ["red", "black", "green"];

  return (
    <section className="bg-white pb-10 dark:bg-dark lg:pb-20 lg:pt-[120px]">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="w-full ">
            <div className="mx-auto mb-[60px] max-w-[485px] text-center flex flex-col">
              <h2
                className="relative mx-4 my-8 text-2xl font-bold text-center title md:text-3xl before after md:my-10 md:mx-6"
                // style={{ color: borderColors[0] }}
              >
                أبرز المناظرات
              </h2>
              <p className="text-lg text-gray-500 md:text-xl">
                شاهد جهود أبرز المرشحين
              </p>
            </div>
          </div>
          <Link to="/Debates">
            <button className="self-end w-full mb-8 md:mb-10 md:w-80 btn btn-outline text-black border-black">
              مشاهدة جميع المناظرات
            </button>
          </Link>
        </div>

        <Slider className="flex justify-center gap-10 md:gap-4" {...settings}>
          {[" دعاء / سندس ", "باسل/ محمد", " عبدالله / عطا "].map(
            (title, index) => (
              <div className="mx-8 wrapper" key={index}>
                <div
                  className="card  bg-base-100 w-full sm:w-[18rem] md:w-[24rem] lg:w-[28rem] shadow-xl border-2 transition-all"
                  style={getGradientStyle("black", "black", "black")}
                >
                  <figure className="p-6 pr-12 ">
                    <img
                      src="https://www.iec.jo/sites/default/files/styles/d10_standard/public/images/2024-08/whatsapp_image_2024-08-13_at_6.14.18_pm.jpeg?h=09deafb6&itok=IKuP_Ech"
                      alt="Shoes"
                      className="w-full rounded-xl"
                    />
                  </figure>
                  <span
                    className="my-4 md:my-6 mx-auto inline-block w-full md:w-72 text-center rounded-[5px] py-0.5 text-xs font-medium leading-loose text-white"
                    style={{
                      backgroundColor:
                        borderColors[index % borderColors.length],
                    }}
                  >
                    Jan 05, 2023
                  </span>
                  <div className="items-center pt-2 text-center card-body md:pt-3">
                    <h2
                      className="inline-block mb-2 text-lg font-semibold md:mb-4 md:text-xl"
                      style={{
                        color: borderColors[index % borderColors.length],
                      }}
                    >
                      {title}
                    </h2>
                    <p className="text-sm md:text-base">
                      من يستحق تمثيل تمثيل الشعب
                    </p>
                    <div className="card-actions">
                      <button
                        className="mt-2 btn"
                        style={{
                          backgroundColor:
                            borderColors[index % borderColors.length],
                          borderColor:
                            borderColors[index % borderColors.length],
                          color: "white",
                        }}
                      >
                        شاهد الآن
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      </div>
    </section>
  );
}

export default Advertisment;
