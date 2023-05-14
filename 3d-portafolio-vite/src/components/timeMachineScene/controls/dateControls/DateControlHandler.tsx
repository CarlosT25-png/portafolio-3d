import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MonthControl from "./subset/DayControl";
import UniversalDateControl from "./subset/UniversalDateControl";
import { RootState, dateActions } from "@/store";
import * as THREE from "three";
import { useSelector } from "react-redux";
import DayControl from "./subset/DayControl";

const DateControlHandler = () => {
  const availableDays = useSelector<RootState>( state => state.date.availableDays) as string;

  return (
    <>
      {/* <MonthControl  /> */}
      <UniversalDateControl
        dispatchFn={dateActions.setMonth}
        timeDuration={12}
        position={new THREE.Vector3(-1.25, 1.915, 0)}
      />
      {/* Day Control */}
      <DayControl
        dispatchFn={dateActions.setDay}
        // timeDuration={ +availableDays }
        position={new THREE.Vector3(-1.04, 1.915, 0.168  )}
      />
      {/* Year Control */}
      <UniversalDateControl 
        dispatchFn={dateActions.setYear}
        timeDuration={4}
        position={new THREE.Vector3(-0.84, 1.915, 0.325  )}
      />
      {/* Hour Control */}
      <UniversalDateControl 
        dispatchFn={dateActions.setHour}
        timeDuration={ 24 }
        position={new THREE.Vector3(-0.573, 1.915, 0.54  )}
      />
      {/* Minute Control */}
      <UniversalDateControl 
        dispatchFn={dateActions.setMinute}
        timeDuration={ 60 }
        position={new THREE.Vector3(-0.377, 1.915, 0.7  )}
      />
    </>
  );
};

export default DateControlHandler;
