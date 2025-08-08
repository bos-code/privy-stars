import React from "react";
import comp from "../../public/Image Container.png";

export default function Hero() {
  return (
    <div className=" mt-12 mb-20 flex flex-col xl:gap-12 2xl:gap-16 lg:flex-row items-center justify-center">
      <figure className="heroImage flex-1/2">
        <picture>
          <img src={comp} alt="Hero" className="w-full h-auto" />
        </picture>
      </figure>
      <div className="heroText text-center flex-1/2 lg:text-left">
        <p className="text-base text-info underline underline-offset-8">
          Welcome to Privy Stars School
        </p>
        <h1 className="text-3xl font-raleway font-bold mt-2.5 ">
          Where Young Minds Blossom and{" "}
          <span className="text-primary">Dreams Take Flight.</span>
        </h1>
        <p className="text-base text-info mt-3.5">
          Our kinder garden school provides a nurturing and stimulating
          environment, fostering a love for learning that lasts a lifetime. Join
          us as we embark on an exciting educational journey together!
        </p>

        <div className="stats bg-success @apply shadow-[4px_4px_0px_1px_#ffbe99] border-2 border-[#262626] mt-10 opacity-100 rounded-[10px] p-10 lg:p-5 ">
          <ul className=" flex flex-col gap-4 justify-center items-center lg:flex-row">
            <li className="flex flex-col  justify-center items-center">
              <p className="text-3xl font-bold ">+700</p>
              <span className=" whitespace-normal">Students Enrolled</span>
            </li>
            <div className="divider bg-neutral lg:bg-transparent h-auto"></div>
            <li className="flex flex-col  justify-center items-center">
              <p className="text-3xl font-bold">+500</p>
              <span>Students Passed Out</span>
            </li>
            <div className="divider bg-neutral lg:bg-transparent h-auto "></div>
            <li className="flex flex-col  justify-center items-center">
              <p className="text-3xl font-bold">+20</p>
              <span>Qualified Teachers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
