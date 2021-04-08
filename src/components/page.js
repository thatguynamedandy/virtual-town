import React, { useContext, useState, useEffect } from "react";
import classnames from "classnames";
import upperFirst from "lodash.upperfirst";
import Loadable from "@loadable/component";
import About from "./about/about";

import { GlobalStateContext } from "../context/GlobalContextProvider";

import * as styles from "./page.module.css";

const halfHour = 1800000;
const Header = Loadable(() => import("./header/header"));

export default function Page() {

  const context = useContext(GlobalStateContext);
  const now = new Date();
  const sunrise = new Date(Date.parse(context.sunrise));
  const sunset = new Date(Date.parse(context.sunset));
  const time = new Date(now) - now.setHours(0,0,0,0);
  const msToSunrise = new Date(sunrise) - sunrise.setHours(0,0,0,0);
  const msToSunset = new Date(sunset) - sunset.setHours(0,0,0,0);

  const [timeOfDay, setTimeOfDay] = useState("day", msToSunrise,  msToSunset, time);

  useEffect(() => {
    if((time > msToSunrise - halfHour) &&
      (time < msToSunrise + halfHour)) {
      return setTimeOfDay("day"/*'sunrise'*/);
    }

    if((time > msToSunset - halfHour) &&
      (time < msToSunset + halfHour)) {
      return setTimeOfDay("day"/*'sunset'*/);
    }

    if((time > msToSunset + halfHour) ||
      (time < msToSunrise - halfHour)) {
      return setTimeOfDay("night");
    }

    return setTimeOfDay("day");
  }, [msToSunrise, msToSunset, time]);

  const classes = classnames(
    styles.page,
    styles[`page${upperFirst(timeOfDay)}`]
  );

  return (
    <div className={ classes }>
      <Header timeOfDay={ timeOfDay } />

      <About />
    </div>
  );
}