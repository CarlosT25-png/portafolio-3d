export const getBgColorByHour = (x: number) => {
  if (x < 5 || x >= 18) {
    return '#967E76' //NIGHT
  } else if (x >= 5 && x < 7) {
    return '#D7C0AE' //SUNRISE
  } else {
    return '#EEE3CB' // DAY
  }
}

export const getLightIntensityByHour = (x: number) => {
  if (x < 5 || x >= 18) {
    return 0.5 //NIGHT
  } else if (x >= 5 && x < 7) {
    return 0.7 //SUNRISE
  } else {
    return 0.8 // DAY
  }
}
