import Header from "~/components/header";
import type { Route } from "./+types/home";
import Hero from "../components/Hero";
import Benefit from "../components/Benefit.jsx";
import Testimonial from "~/components/Testimonial";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col lg:gap-36 xl:gap-40 2xl:gap-50">
      <Hero />
      <Benefit />
      <Testimonial />
    </div>
  );
}
