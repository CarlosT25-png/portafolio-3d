import { Dispatch, SetStateAction } from "react";
import MonthControl from "./subset/MonthControl";
import UniversalDateControl from "./subset/UniversalDateControl";
import { dateActions } from "@/store";
import * as THREE from "three";

const DateControlHandler = () => {
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
        timeDuration={30}
        position={new THREE.Vector3(-1.04, 1.915, 0.165  )}
      />
    </>
  );
};

export default DateControlHandler;
