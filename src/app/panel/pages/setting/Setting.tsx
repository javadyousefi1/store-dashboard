// components
import AccidentCaused from "./accidentCaused/AccidentCaused";
import IncidentSuggestions from "./incidentSuggestions/IncidentSuggestions";
import AddInviteToWorkSetting from "./inviteToWork/InviteToWork";
import SliderSetting from "./sliderSetting/SliderSetting";
import PageHeader from "global/shared/PageHeader";
import SurveySettingCard from "./survey/Survey";
import PageTitle from "global/shared/PageTitle";
import { modules } from "@/enums/modules";

const Setting: React.FC = () => {
  const querys = window.location.pathname.split("/")[2]
  const setting = switchSetting();

  function switchSetting() {
    switch (querys) {
      // just show in accident
      case modules.ACCIDENT:
        return (
          <>
            <AccidentCaused />
            <IncidentSuggestions />
          </>
        );
      case modules.MAIN:
        return (
          <>
            <SliderSetting />
            <AddInviteToWorkSetting />
            <SurveySettingCard />
          </>
        );
      default:
        return [];
    }
  }

  return (
    <section>
      <PageTitle title="تنظیمات" />
      <PageHeader title="تنظیمات سامانه" />
      <div className="grid grid-cols-1 gap-4 my-8 md:grid-cols-2 lg:grid-cols-3">
        {setting}
      </div>
    </section>
  );
};
export default Setting;
