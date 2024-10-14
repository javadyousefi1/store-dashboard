import Accident from "./Accident";
import CircularAndAnnouncement from "./CircularAndAnnouncement";
import HomeSwiper from "./components/slider/HomeSlider";
import DailyNews from "./DailyNews";
import News from "./News";

const Home = () => {
  return (
    <div className="container mx-auto my-4">
      {/* slider */}
      <div className="mb-4">
        <HomeSwiper />
      </div>

      <div className="grid grid-cols-6 grid-rows-2 px-1 md:gap-x-6 gap-y-6 md:grid-rows-1">
        <div className="w-full col-span-6 row-span-1 md:col-span-4">
          <News />
        </div>
        <div className="w-full col-span-6 row-span-1 md:col-span-2">
          <DailyNews />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-6 px-1 mt-8 md:flex-row">
        <CircularAndAnnouncement />
        <Accident />
      </div>
    </div>
  );
};

export default Home;
