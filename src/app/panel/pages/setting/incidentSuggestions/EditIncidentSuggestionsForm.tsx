import React, { useCallback, useState } from "react";
import { updateIncidentSuggestions } from "@/api/setting";
import { deleteIncidentSuggestions } from "@/api/setting";
import { getAllIncidentSuggestions } from "@/api/setting";
import useFetch from "global/hooks/useFetch";
import { ServerResult } from "@/interfaces";
import { AccidentCauseObjectType } from "@/interfaces/setting";
import SettingCardOperationBox from "@/components/shared/SettingCardOperationBox";

const EditIncidentSuggestionsForm: React.FC = () => {
  const [incidentId, setIncidentId] = useState<number>(0);
  const [visible,setVisible] = useState(false);
  const [updateCard,setUpdateCard] = useState(false);

  const getAllIncidentAgain = useCallback(() => {
    return getAllIncidentSuggestions();
},[updateCard])

  const handleUpdateCard = () => setUpdateCard(prev => !prev)

  const { data, loading, error } = useFetch<Promise<ServerResult<AccidentCauseObjectType[]>>>(getAllIncidentAgain);

  return (
    <>
      <SettingCardOperationBox
        visible={visible}
        loading={loading}
        errorText="ویرایش پیشنهاد با خطا مواجه شد"
        editText = "ویرایش با موفقیت ثبت شد"
        deleteText = "حذف با موفقیت انجام شد"
        popConfirmText= "آیا از حذف این پیشنهاد اطمینان دارید؟"
        setVisible={setVisible}
        data={data?.data?.items}
        id={incidentId}
        setId={setIncidentId}
        refreshFunction={handleUpdateCard}
        updateFunction={updateIncidentSuggestions}
        deleteFunction={deleteIncidentSuggestions}
      />
    </>
  );
};
export default EditIncidentSuggestionsForm;
