import timeZoneCityToCountry from "./data/tz-cities-to-countries.json";

export const getUserTimeZoneInfo = () => {
  let userRegion: any;
  let userCity: any;
  let userCountry: any;
  let userTimeZone;

  const timeZoneCity = timeZoneCityToCountry as any;

  if (Intl) {
    console.log(Intl.DateTimeFormat().resolvedOptions());
    userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzArr = userTimeZone.split("/");
    userRegion = tzArr[0];
    userCity = tzArr[tzArr.length - 1];
    userCountry = timeZoneCity[userCity];
  }

  const timezone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || "";

  const date = new Date();
  const timezoneOffset = date?.getTimezoneOffset()?.toString() || "";

  return {
    timezone,
    timezoneOffset,
  };
};
