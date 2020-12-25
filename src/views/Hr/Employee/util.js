import request from "@/utils/request";

export const fetchMultipleDict = async () => {
  const codes = [
    "EMPLOYEE_POSITION",
    "NATION",
    "SEX",
    "MARRIAGE",
    "POLITICAL_IDENTITY",
    "WORK_TYPE",
    "EMPLOYEE_STATUS",
    "INVITE_FROM",
    "DEGREE",
    "CONTACT_TYPE",
    "CONTACT_PERIOD",
    "SOS_RELATION",
  ];
  let dictMap = {};
  try {
    const res = await request({
      method: "POST",
      url: "/system/dict_util/multiple",
      data: { codes },
    });
    if (res.code === 200) {
      dictMap = res.data;
    }
  } catch (e) {
    // pass
  }
  return dictMap;
};
