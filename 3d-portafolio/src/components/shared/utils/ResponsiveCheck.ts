export const isMobile = ()=> {
  const regex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
};


export const isMobileOrTablet = () => {
  const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i;
  return regex.test(navigator.userAgent);
}

export enum BROWSERS {
  FIREFOX,
  CHROME,
  SAFARI,
  OPERA,
  EDGE,
  INTERNETEXPLORER,
  UKNOWN
}

export const getBrowser = () => {
  const userAgent = navigator.userAgent;
  
  if (userAgent.indexOf("Firefox") > -1) {
    return BROWSERS.FIREFOX;
  } else if (userAgent.indexOf("Chrome") > -1) {
    return BROWSERS.CHROME;
  } else if (userAgent.indexOf("Safari") > -1) {
    return BROWSERS.SAFARI;
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    return BROWSERS.OPERA;
  } else if (userAgent.indexOf("Edge") > -1) {
    return BROWSERS.EDGE;
  } else if (userAgent.indexOf("Trident") > -1) {
    return BROWSERS.INTERNETEXPLORER;
  } else {
    return BROWSERS.UKNOWN;
  }
}