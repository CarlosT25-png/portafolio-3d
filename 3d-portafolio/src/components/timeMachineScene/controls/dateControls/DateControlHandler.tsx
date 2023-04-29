import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MonthControl from "./subset/MonthControl";
import UniversalDateControl from "./subset/UniversalDateControl";
import { RootState, dateActions } from "@/store";
import * as THREE from "three";
import { useSelector } from "react-redux";

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}


const DateControlHandler = () => {
  const month = useSelector<RootState>( state => state.date.month) as string;
  const [ daysDuration, setDaysDuration ] = useState(30);
  
  useEffect(() => {
    let newMonth = (parseInt(month) - 1)
    console.log(daysDuration)
    setDaysDuration(getDaysInMonth(newMonth, 2005))
  }, [month])

  return (
    <>
      {/* <MonthControl  /> */}
      <UniversalDateControl
        dispatchFn={dateActions.setMonth}
        timeDuration={12}
        position={new THREE.Vector3(-1.25, 1.915, 0)}
      />
      {/* Day Control */}
      <UniversalDateControl
        dispatchFn={dateActions.setDay}
        timeDuration={ daysDuration }
        position={new THREE.Vector3(-1.04, 1.915, 0.168  )}
      />
      {/* Year Control */}
      <UniversalDateControl 
        dispatchFn={dateActions.setYear}
        timeDuration={4}
        position={new THREE.Vector3(-0.848, 1.915, 0.33  )}
      />
    </>
  );
};

export default DateControlHandler;
