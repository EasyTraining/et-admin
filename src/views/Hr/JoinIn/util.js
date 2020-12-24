import request from "@/utils/request";

export const fetchHrDict = async () => {
  const codeMap = {
    position: "EMPLOYEE_POSITION",
    nation: "NATION",
    sex: "SEX",
    marriage: "MARRIAGE",
    political_identity: "POLITICAL_IDENTITY",
    work_type: "WORK_TYPE",
    status: "EMPLOYEE_STATUS",
    invite_from: "INVITE_FROM",
    degree: "DEGREE",
    contact_type: "CONTACT_TYPE",
    contact_period: "CONTACT_PERIOD",
    sos_relation: "SOS_RELATION",
  };
  const codes = Object.values(codeMap);
  let dictMap;
  try {
    const res = await request({
      method: "GET",
      url: "/system/dict_util/multiple",
      params: { codes },
    });
  } catch (e) {
    // pass
  }
  return dictMap;
};
