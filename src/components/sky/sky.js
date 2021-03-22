import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { GlobalStateContext } from "../../context/GlobalContextProvider"

export default function Sky({ timeOfDay }) {

  const { colors } = useContext(GlobalStateContext);

  return (
    <Fragment>
      <defs>
        <linearGradient id="daySky" gradientTransform="rotate(90)">
          <stop offset="5%"  stopColor={ colors.day.skyTop } />
          <stop offset="95%" stopColor={ colors.day.skyBottom } />
        </linearGradient>
        <linearGradient id="nightSky" gradientTransform="rotate(90)">
          <stop offset="5%"  stopColor={ colors.night.skyTop } />
          <stop offset="95%" stopColor={ colors.night.skyBottom } />
        </linearGradient>
      </defs>
      <rect fill="url(#daySky)" height="100%" width="100%"/>
      { timeOfDay === 'night' && 
        <rect fill="url(#nightSky)" height="100%" width="100%"/> 
        }
    </Fragment>
  )
}

Sky.propTypes = {
  timeOfDay: PropTypes.string
}
