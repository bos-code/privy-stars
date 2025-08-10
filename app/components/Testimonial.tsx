// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
// import SectionHead from "./sectionHead";
// import gsap from "gsap";

// /* YOUR ORIGINAL testimonials array — you can expand this as you like. */
// const testimonials = [
//   {
//     name: "Jennifer B",
//     image: "https://i.pravatar.cc/100?img=1",
//     rating: 5,
//     text: "Little Learners Academy has been a second home for my child. The caring staff and engaging programs have made her excited to go to school every day!",
//   },
//   {
//     name: "David K",
//     image: "https://i.pravatar.cc/100?img=2",
//     rating: 5,
//     text: "Choosing Little Learners Academy for my daughter was the best decision. She has thrived in their nurturing and stimulating environment.",
//   },
//   {
//     name: "Emily L",
//     image: "https://i.pravatar.cc/100?img=3",
//     rating: 5,
//     text: "My son's social and academic growth has been remarkable since joining Little Learners Academy. I am grateful for the supportive and dedicated teachers.",
//   },
//   {
//     name: "Sophia M",
//     image: "https://i.pravatar.cc/100?img=4",
//     rating: 5,
//     text: "A truly wonderful experience! The staff goes above and beyond to make learning fun and engaging.",
//   },
//   {
//     name: "James P",
//     image: "https://i.pravatar.cc/100?img=5",
//     rating: 5,
//     text: "The perfect place for early education. Highly recommend to all parents.",
//   },
//   // ... add more if you want
// ];

// export default function Testimonial() {
//   // preserve your state variables (no style/class changes)
//   const [cardsPerView, setCardsPerView] = useState(1);

//   // refs: viewport (visible area) and strip (wide flex container)
//   const viewportRef = useRef(null);
//   const stripRef = useRef(null);

//   // gsap timeline ref & clones tracking
//   const tlRef = useRef(null);
//   const clonesRef = useRef([]);

//   // settings
//   const speedPxPerSec = 60; // change this for speed (px/sec)
//   const pauseOnHover = false; // set true if you want hover-to-pause

//   // Respect prefers-reduced-motion
//   const reducedMotion = useRef(false);
//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
//     reducedMotion.current = mq.matches;
//     const handler = () => (reducedMotion.current = mq.matches);
//     mq.addEventListener?.("change", handler);
//     return () => mq.removeEventListener?.("change", handler);
//   }, []);

//   // handle responsive breakpoints (keeps your original rule: >=1024 -> 3)
//   const handleResizeCardsPerView = useCallback(() => {
//     setCardsPerView(window.innerWidth >= 1024 ? 3 : 1);
//   }, []);
//   useEffect(() => {
//     handleResizeCardsPerView();
//     window.addEventListener("resize", handleResizeCardsPerView);
//     return () => window.removeEventListener("resize", handleResizeCardsPerView);
//   }, [handleResizeCardsPerView]);

//   // Utility: wait for all images inside strip to load so widths are accurate
//   const waitForImages = (rootEl) =>
//     new Promise((resolve) => {
//       if (!rootEl) return resolve();
//       const imgs = Array.from(rootEl.querySelectorAll("img"));
//       if (!imgs.length) return resolve();
//       let loaded = 0;
//       imgs.forEach((img) => {
//         if (img.complete) {
//           loaded++;
//           if (loaded === imgs.length) resolve();
//         } else {
//           img.addEventListener("load", () => {
//             loaded++;
//             if (loaded === imgs.length) resolve();
//           });
//           img.addEventListener("error", () => {
//             loaded++;
//             if (loaded === imgs.length) resolve();
//           });
//         }
//       });
//     });

//   // clear clones (remove appended clone DOM nodes)
//   const clearClones = () => {
//     clonesRef.current.forEach((n) => {
//       if (n && n.parentNode) n.parentNode.removeChild(n);
//     });
//     clonesRef.current = [];
//   };

//   // Build clones and start GSAP timeline
//   const buildCarousel = useCallback(async () => {
//     const vp = viewportRef.current;
//     const strip = stripRef.current;

//     if (!vp || !strip) return;

//     // cleanup any existing timeline/clones
//     if (tlRef.current) {
//       try {
//         tlRef.current.kill();
//       } catch (e) {}
//       tlRef.current = null;
//     }
//     clearClones();
//     gsap.set(strip, { x: 0 }); // reset

//     // wait for images to load so measurements are correct
//     await waitForImages(strip);

//     // measure the width of the original set (sum of current children widths)
//     const children = Array.from(strip.children);
//     if (children.length === 0) return;
//     const setWidth = children.reduce(
//       (acc, n) => acc + n.getBoundingClientRect().width,
//       0
//     );

//     // If width is zero (maybe not rendered), bail
//     if (!setWidth) return;

//     // clone entire set until totalWidth >= viewportWidth * 2 (ensures seamless)
//     let totalWidth = setWidth;
//     while (totalWidth < vp.clientWidth * 2) {
//       const clones = children.map((n) => {
//         const clone = n.cloneNode(true);
//         strip.appendChild(clone);
//         return clone;
//       });
//       clonesRef.current.push(...clones);
//       totalWidth += setWidth;
//     }

//     // The amount to shift for one loop is 'setWidth' px
//     const shiftPx = setWidth;
//     // Duration based on speed
//     const duration = shiftPx / speedPxPerSec;

//     // If user prefers reduced motion, skip animating
//     if (reducedMotion.current) return;

//     // Create timeline: animate x from 0 to -shiftPx with ease none, repeat infinitely
//     const t = gsap.timeline({ repeat: -1, paused: false });

//     // We animate x to -shiftPx; onRepeat we immediately reset x to 0 (seamless because of clones)
//     t.to(strip, {
//       x: -shiftPx,
//       ease: "none",
//       duration,
//       modifiers: {
//         // ensure we're animating numeric pixel values (gsap handles this, but modifiers guard edge cases)
//         x: (x) => `${parseFloat(x)}px`,
//       },
//     });

//     // When it repeats, reset transform immediately to 0 (because we have the clones)
//     t.eventCallback("onRepeat", () => {
//       gsap.set(strip, { x: 0 });
//     });

//     tlRef.current = t;

//     // optional pause on hover
//     if (pauseOnHover) {
//       const enter = () => tlRef.current && tlRef.current.pause();
//       const leave = () => tlRef.current && tlRef.current.play();
//       vp.addEventListener("mouseenter", enter);
//       vp.addEventListener("mouseleave", leave);
//       // store for cleanup
//       tlRef.current._hover = { vp, enter, leave };
//     }
//   }, [speedPxPerSec, pauseOnHover]);

//   // Build on mount and rebuild on resize/cardsPerView change
//   useEffect(() => {
//     let resizeTimer = null;
//     const rebuild = () => {
//       if (tlRef.current) {
//         try {
//           tlRef.current.kill();
//         } catch (e) {}
//         tlRef.current = null;
//       }
//       clearClones();
//       buildCarousel();
//     };

//     // initial build
//     buildCarousel();

//     // debounce window resize rebuild
//     const onResize = () => {
//       clearTimeout(resizeTimer);
//       resizeTimer = setTimeout(rebuild, 120);
//     };
//     window.addEventListener("resize", onResize);

//     return () => {
//       window.removeEventListener("resize", onResize);
//       if (tlRef.current) {
//         try {
//           // remove hover listeners if attached
//           if (tlRef.current._hover) {
//             const { vp, enter, leave } = tlRef.current._hover;
//             vp.removeEventListener("mouseenter", enter);
//             vp.removeEventListener("mouseleave", leave);
//           }
//           tlRef.current.kill();
//         } catch (e) {}
//         tlRef.current = null;
//       }
//       clearClones();
//     };
//   }, [buildCarousel, cardsPerView]);

//   // Optional manual controls: pause/resume
//   const pause = () => tlRef.current && tlRef.current.pause();
//   const play = () => tlRef.current && tlRef.current.play();

//   // You asked "make sure nothing is missing" — below I keep your Prev/Next buttons visible (classes unchanged).
//   // For minimal intrusion, Prev/Next here simply pause the loop momentarily and nudge one card width.
//   // (This is optional — you can remove their handlers if you prefer pure infinite motion.)
//   const manualSlide = async (dir = 1) => {
//     // dir: 1 => next (leftwards), -1 => prev (rightwards)
//     const vp = viewportRef.current;
//     const strip = stripRef.current;
//     if (!strip || !vp) return;
//     // stop timeline
//     if (tlRef.current) tlRef.current.pause();
//     // ensure images loaded
//     await waitForImages(strip);
//     // compute one setWidth (sum of the original children BEFORE clones)
//     // To find the original set width, we assume the first N children correspond to the original set.
//     // Easiest robust approach: measure width of all children and divide by number of original items
//     const currentChildren = Array.from(strip.children);
//     if (currentChildren.length === 0) return;
//     // assume original count = testimonials.length
//     const originalCount = testimonials.length;
//     let firstSetWidth = 0;
//     for (let i = 0; i < Math.min(originalCount, currentChildren.length); i++) {
//       firstSetWidth += currentChildren[i].getBoundingClientRect().width;
//     }
//     const cardShift =
//       firstSetWidth / Math.max(1, originalCount / (cardsPerView || 1)); // fallback
//     // get current x
//     const currentX = gsap.getProperty(strip, "x") || 0;
//     const targetX = currentX - dir * (cardShift || 200); // fallback value
//     // animate to targetX
//     await gsap
//       .to(strip, { x: targetX, duration: 0.45, ease: "power2.out" })
//       .then();
//     // after move, resume the infinite timeline by rebuilding (to keep seamless)
//     // kill and rebuild carousel to re-sync clones + animation
//     if (tlRef.current) {
//       try {
//         tlRef.current.kill();
//       } catch (e) {}
//       tlRef.current = null;
//     }
//     clearClones();
//     // small delay then rebuild
//     setTimeout(() => buildCarousel(), 50);
//   };

//   // Render — I left your structure and classes exactly as you provided
//   return (
//     <div className="flex flex-col items-center gap-12 xl:gap-20">
//       <SectionHead
//         chip="Their Happy Words 🤗"
//         h2="Our Testimonials"
//         p="Our testimonials are heartfelt reflections of the nurturing environment we provide, where children flourish both academically and emotionally."
//       />

//       <div className="flex justify-center items-center gap-6">
//         {/* Prev Button (classes intact) */}
//         <button
//           onClick={() => manualSlide(-1)}
//           className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100"
//           aria-label="Previous testimonial"
//         >
//           <FaChevronLeft className="text-gray-600" />
//         </button>

//         {/* Slider Container — I added ref only (no classes/styles changed) */}
//         <div
//           ref={viewportRef}
//           className="flex justify-center items-center gap-10 overflow-hidden cursor-grab"
//           onMouseEnter={() => {
//             if (pauseOnHover && tlRef.current) tlRef.current.pause();
//           }}
//           onMouseLeave={() => {
//             if (pauseOnHover && tlRef.current) tlRef.current.play();
//           }}
//           style={{ width: "100%" }}
//         >
//           <div
//             ref={stripRef}
//             onTransitionEnd={() => {
//               // keep your original handler idea; no op here
//             }}
//             className="flex items-center gap-6 h-auto"
//             style={{ width: `${(testimonials.length * 100) / cardsPerView}%` }}
//           >
//             {testimonials.map((t, index) => (
//               <div
//                 key={index}
//                 className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3 select-none flex items-center justify-center"
//               >
//                 <div className="card rounded-xl drop-shadow-xl shadow-2xl gap-4 bg-white border-2 border-info hover:skew-2 transition-transform duration-300 ease-in-ou1 pt-12 pr-5 pl-5 pb-7 flex flex-col items-center justify-between flex-grow">
//                   <img
//                     src={t.image}
//                     alt={t.name}
//                     className="w-16 h-16 rounded-full mx-auto mb-4"
//                     draggable={false}
//                   />
//                   <h3 className="text-lg font-semibold">{t.name}</h3>
//                   <div className="flex justify-center my-3">
//                     {Array.from({ length: t.rating }).map((_, i) => (
//                       <FaStar key={i} className="text-orange-500" />
//                     ))}
//                   </div>
//                   <p className="text-gray-600 text-center">{t.text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Next Button (classes intact) */}
//         <button
//           onClick={() => manualSlide(1)}
//           className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100"
//           aria-label="Next testimonial"
//         >
//           <FaChevronRight className="text-gray-600" />
//         </button>
//       </div>
//     </div>
//   );
// }
