import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import SectionHead from "./sectionHead";

const testimonials = [
  {
    name: "Jennifer B",
    image: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    text: "Little Learners Academy has been a second home for my child. The caring staff and engaging programs have made her excited to go to school every day!",
  },
  {
    name: "David K",
    image: "https://i.pravatar.cc/100?img=2",
    rating: 5,
    text: "Choosing Little Learners Academy for my daughter was the best decision. She has thrived in their nurturing and stimulating environment.",
  },
  {
    name: "Emily L",
    image: "https://i.pravatar.cc/100?img=3",
    rating: 5,
    text: "My son's social and academic growth has been remarkable since joining Little Learners Academy. I am grateful for the supportive and dedicated teachers.",
  },
  {
    name: "Sophia M",
    image: "https://i.pravatar.cc/100?img=4",
    rating: 5,
    text: "A truly wonderful experience! The staff goes above and beyond to make learning fun and engaging.",
  },
  {
    name: "James P",
    image: "https://i.pravatar.cc/100?img=5",
    rating: 5,
    text: "The perfect place for early education. Highly recommend to all parents.",
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const containerRef = useRef(null);
  const drag = useRef({
    isDragging: false,
    startX: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    animationId: 0,
  });

  // Update cardsPerView on resize
  useEffect(() => {
    function handleResize() {
      setCardsPerView(window.innerWidth >= 1024 ? 3 : 1);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= testimonials.length - cardsPerView ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [cardsPerView]);

  // Clamp index to keep in range
  const clampIndex = (index) => {
    if (index < 0) return testimonials.length - cardsPerView;
    if (index > testimonials.length - cardsPerView) return 0;
    return index;
  };

  // Drag handlers
  function touchStart(event) {
    drag.current.isDragging = true;
    drag.current.startX = getPositionX(event);
    drag.current.animationId = requestAnimationFrame(animation);
  }
  function touchMove(event) {
    if (!drag.current.isDragging) return;
    const currentPosition = getPositionX(event);
    drag.current.currentTranslate =
      drag.current.prevTranslate + currentPosition - drag.current.startX;
  }
  function touchEnd() {
    drag.current.isDragging = false;
    cancelAnimationFrame(drag.current.animationId);

    const movedBy = drag.current.currentTranslate - drag.current.prevTranslate;

    if (movedBy < -50) {
      setCurrentIndex((prev) => clampIndex(prev + 1));
    } else if (movedBy > 50) {
      setCurrentIndex((prev) => clampIndex(prev - 1));
    }

    drag.current.currentTranslate = 0;
    drag.current.prevTranslate = 0;
    setTranslate(0);
  }
  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }
  function animation() {
    setTranslate(drag.current.currentTranslate);
    if (drag.current.isDragging) {
      drag.current.animationId = requestAnimationFrame(animation);
    }
  }
  function setTranslate(translateX) {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(calc(-${
        (currentIndex * 100) / cardsPerView
      }% + ${translateX}px))`;
    }
  }

  // Reset translate and add transition when currentIndex changes (not dragging)
  useEffect(() => {
    if (!drag.current.isDragging && containerRef.current) {
      containerRef.current.style.transition = "transform 0.5s ease-in-out";
      containerRef.current.style.transform = `translateX(-${
        (currentIndex * 100) / cardsPerView
      }%)`;
      const transitionEnd = () => {
        if (containerRef.current) containerRef.current.style.transition = "";
      };
      containerRef.current.addEventListener("transitionend", transitionEnd, {
        once: true,
      });
    }
  }, [currentIndex, cardsPerView]);

  // Handlers for buttons
  const prevSlide = () => setCurrentIndex((prev) => clampIndex(prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => clampIndex(prev + 1));

  return (
    <div className="w-full py-16">
      <SectionHead
        chip="Their Happy Words 🤗"
        h2="Our Testimonials"
        p="Our testimonials are heartfelt reflections of the nurturing environment we provide, where children flourish both academically and emotionally."
      />

      <div className="flex justify-center items-center gap-6 ">
        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className=" bg-white shadow-lg rounded-full p-3 hover:bg-gray-100"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>

        {/* Slider Container */}
        <div
          className="flex justify-center items-center gap-10 overflow-hidden cursor-grab"
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
          onMouseDown={touchStart}
          onMouseMove={touchMove}
          onMouseUp={touchEnd}
          onMouseLeave={() => {
            if (drag.current.isDragging) touchEnd();
          }}
          style={{ width: "100%" }}
        >
          <div
            ref={containerRef}
            className="flex items-center gap-6 transition-transform bg-amber-500 h-auto"
            style={{ width: `${(testimonials.length * 100) / cardsPerView}%` }}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3 select-none flex items-center  justify-center"
                style={{ userSelect: "none" }}
              >
                <div className="card rounded-xl drop-shadow-xl shadow-2xl gap-4 bg-white border-2 border-info hover:skew-2 transition-transform duration-300 ease-in-ou1 pt-12 pr-5 pl-5 pb-7 flex flex-col items-center justify-between flex-grow">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                    draggable={false}
                  />
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <div className="flex justify-center my-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FaStar key={i} className="text-orange-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-center">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className=" bg-white shadow-lg rounded-full p-3 hover:bg-gray-100"
          aria-label="Next testimonial"
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
