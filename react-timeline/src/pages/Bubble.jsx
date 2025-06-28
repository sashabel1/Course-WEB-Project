import React, { useState, useEffect ,useMemo} from "react";
import { useNavigate } from "react-router-dom";
import topicsData from "../data/topics.json";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";


/**
 * BubblePage Component
 *
 * This component displays interactive topic bubbles that users can filter and select.
 * Each bubble represents a topic with customizable color or image, randomly positioned
 * with animation delays for a dynamic visual effect.
 *
 * Features:
 * - Shows a list of topics loaded from a JSON file
 * - Allows filtering topics by categories: All, Year, Events, and Country
 * - Randomly positions bubbles on the page with animated appearance delays
 * - Saves the selected topic and type to localStorage upon bubble click
 * - Navigates the user to the timeline page after topic selection
 *
 * Hooks used:
 * - useState: Manages the current filter type state
 * - useMemo: Efficiently filters topics based on the selected filter type
 * - useEffect: Updates CSS variables for bubble positioning and animation after render
 * - useNavigate: Handles navigation to the timeline page on bubble selection
 */


const FILTER_OPTIONS = ["All", "Year", "Events", "Country"];

const generateRandomPosition = () => ({
  x: Math.random() * 90,
  y: Math.random() * 70,
  delay: Math.random() * 5,
});

const BubblePage = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("All");

  const filteredTopics = useMemo(() => {
    return topicsData.filter((topic) => {
      switch (filterType) {
        case "Year":
          return topic.type === "Year";
        case "Events":
          return topic.type === "Type of Event";
        case "Country":
          return topic.type === "Country";
        default:
          return true;
      }
    });
  }, [filterType]);

  useEffect(() => {
    const bubbles = document.querySelectorAll(".bubble");
    bubbles.forEach((bubble) => {
      const x = bubble.getAttribute("data-x");
      const y = bubble.getAttribute("data-y");
      const delay = bubble.getAttribute("data-delay");

      bubble.style.setProperty("--x", x);
      bubble.style.setProperty("--y", y);
      bubble.style.setProperty("--delay", delay);
    });
  }, [filteredTopics]);

  const handleBubbleClick = (topicName, topicType) => {
    localStorage.setItem("selectedTopic", topicName);
    localStorage.setItem("selectedType", topicType);
    navigate("/timeline");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F2EFE7] dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <div className="flex gap-4 items-center mb-4">
        <h1 className="text-3xl font-bold text-[#006A71] dark:text-gray-100">Bubble Timeline</h1>
        <button
          onClick={() => {
            localStorage.removeItem("selectedTopic");
            localStorage.removeItem("selectedType");
            navigate("/");
          }}
          className="px-5 py-2 text-white bg-[#006A71] dark:bg-blue-600 rounded font-semibold text-base cursor-pointer transition hover:bg-[#10b2bd] dark:hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md"
        >
          Reset
        </button>
      </div>
      <div className="flex justify-center my-5 gap-2">
        {FILTER_OPTIONS.map((type) => (
          <button
            key={type}
            type="button"
            className="px-5 py-2 text-white bg-[#006A71] dark:bg-blue-600 rounded font-semibold text-base cursor-pointer transition hover:bg-[#10b2bd] dark:hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => setFilterType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="relative w-full h-screen mx-auto rounded-2xl p-8 flex-1 bg-[#F2EFE7] dark:bg-gray-900">
        {filteredTopics.map((topic, idx) => {
          const { x, y, delay } = generateRandomPosition();

          return (
            <button
              key={idx}
              type="button"
              className="absolute w-20 h-20 rounded-full p-0 flex items-center justify-center shadow-md transition-transform duration-300 ease-in-out animate-float hover:scale-110"
              data-x={x}
              data-y={y}
              data-delay={delay}
              onClick={() => handleBubbleClick(topic.name, topic.type)}
              style={{
                backgroundColor: topic.image ? "transparent" : topic.color,
                backgroundImage: topic.image ? `url(${topic.image})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                left: `calc(${x}vw)`,
                top: `calc(${y}vh)`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default BubblePage;
