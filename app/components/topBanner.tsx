import React from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import banner from "../../public/Top Banner.png";
import Icon from "public/Icon";

export default function TopBanner() {
  return (
    <div className=" relative">
      <img src={banner} alt="Top Banner" className="  w-full relative h-auto" />
      <div className="textbox whitespace-nowrap flex justify-center items-center text-xl gap-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <p>Admission is Open, Grab your seat now</p>
        <Icon />
      </div>
    </div>
  );
}
