import React, { useCallback, useState } from "react";
import { updateCauseAccident } from "@/api/setting";
import { removeCauseAccidents } from "@/api/setting";
import { getAllCauseAccidents } from "@/api/setting";
import useFetch from "global/hooks/useFetch";
import { ServerResult } from "@/interfaces";
import { AccidentCauseObjectType } from "@/interfaces/setting";
import SettingCardOperationBox from "@/components/shared/SettingCardOperationBox";

const EditAccidentCausedForm: React.FC = () => {
  const [accidentId, setAccidentId] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const [updateCard, setUpdateCard] = useState(false);

  const getAllAccidentCausedAgain = useCallback(() => {
    return getAllCauseAccidents();
  }, [updateCard]);

  const handleUpdateCard = () => setUpdateCard((prev) => !prev);

  const { data, loading, error } = useFetch<Promise<ServerResult<AccidentCauseObjectType[]>>>(getAllAccidentCausedAgain);

  return (
    <SettingCardOperationBox
      visible={visible}
      errorText="ویرایش علت حادثه با خطا مواجه شد"
      editText="ویرایش با موفقیت ثبت شد"
      deleteText="حذف با موفقیت انجام شد"
      popConfirmText="آیا از حذف این علت اطمینان دارید؟"
      setVisible={setVisible}
      data={data?.data?.items}
      id={accidentId}
      loading={loading}
      setId={setAccidentId}
      refreshFunction={handleUpdateCard}
      updateFunction={updateCauseAccident}
      deleteFunction={removeCauseAccidents}
    />
  );
};
export default EditAccidentCausedForm;
