import Learn from "public/learn";
import SectionHead from "./sectionHead";
import  CrownIcon from "public/crown";
import  NoseIcon from "public/nose";
import  FlagIcon from "public/flag";
import BallIcon from "public/ball";
import { PeopleIcon } from "public/people";

const benefits = [
  {
    title: "Holistic Learning Approach",
    icon: <Learn />,
    description:
      "Our curriculum focuses on nurturing cognitive, social, emotional, and physical development, ensuring a well-rounded education.",
  },

  {
    title: "Experienced Educators",
    description:
      "Our passionate and qualified teachers create a supportive and stimulating learning environment.",
    icon: <CrownIcon />,
  },
  {
    title: "Nurturing Environment",
    description:
      "We prioritize safety and provide a warm and caring atmosphere for every child.",
    icon: <NoseIcon/>,
  },
  {
    title: "Play-Based Learning",
    description:
      "We believe in the power of play to foster creativity, problem-solving skills, and imagination.",
    icon: <FlagIcon/>,
  },
  {
    title: "Individualized Attention",
    description:
      "Our small class sizes enable personalized attention, catering to each child's unique needs.",
    icon: <BallIcon/>,
  },
  {
    title: "Parent Involvement",
    description:
      "We foster a strong parent-school partnership to ensure seamless communication and collaboration.",
    icon: <PeopleIcon/>,
  },
];

function Benefit() {
  return (
    <div className="flex flex-col gap-12">
      <SectionHead
        chip="Children Deserve Bright Future"
        h2="Our Benefits"
        p="With a dedicated team of experienced educators, state-of-the-art facilities, and a comprehensive curriculum, we aim to lay a strong foundation for your child's future."
      />

      <div className="content grid md:grid-cols-2 lg:grid-cols-3 gap-20">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="card rounded-xl shadow-[4px_4px_0px_1px_#1E1E1E] gap-4 bg-white border-2 border-info pt-12 pr-5 pl-5 pb-7"
          >
            <div className="icon border-2 border-info bg-warning p-4 rounded-lg absolute top-0 transform -translate-y-1/2 self-start">
              {benefit.icon}
            </div>
            <h3 className="font-bold font-raleway text-xl">{benefit.title}</h3>
            <p className="text-base font-medium text-[#4c4c4c]">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Benefit;
