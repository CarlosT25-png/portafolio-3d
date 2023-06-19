import { UAParser } from 'ua-parser-js'

const parser = new UAParser()

export const isMobile = () => {
  if(parser.getDevice().type === UAParser.DEVICE.MOBILE) {
    return true;
  } else return false
}

export const isTablet = () => {
  return parser.getDevice().type === UAParser.DEVICE.TABLET;
};

export const isMobileOrTablet = () => {
  if(parser.getDevice().type === UAParser.DEVICE.MOBILE  || parser.getDevice().type === UAParser.DEVICE.TABLET) {
    return true;
  } else return false
}

export enum BROWSERS {
  FIREFOX,
  CHROME,
  SAFARI,
  OPERA,
  EDGE,
  INTERNETEXPLORER,
  UKNOWN,
}

export const getBrowser = () => {
  return parser.getBrowser().name;
}
