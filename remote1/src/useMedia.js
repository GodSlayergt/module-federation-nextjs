import { useEffect, useState, useRef } from "react";

class Mql {
  constructor(device, query, listener) {
    this.listener = listener;
    this.device = device;
    this.mql = window.matchMedia(query);
    this.mql.addEventListener("change", this.listener);
  }

  cancel() {
    this.mql.removeEventListener("change", this.listener);
  }
}

const defaultConfig = {
  mobile: "(max-width: 599px)",
  tablet: "(min-width: 600px) and (max-width: 1199px)",
  desktop: "(min-width: 1200px)",
};

const useMedia = (config=defaultConfig) => {
  const mqlObjects = useRef([]);
  useEffect(() => {
    register();
    checkOnRender();
    return () => mqlObjects.current.forEach((mql) => mql.cancel());
  }, []);

  const checkOnRender = () => {
    const zeroState = { desktop: false, mobile: false, tablet: false };
    mqlObjects.current.forEach((val) => {
      if (val.mql.matches) {
        zeroState[val.device] = true;
        setDeviceScreen({ ...zeroState });
      }
    });
  };

  const getMatches = () => {
    const result = mqlObjects.current.reduce(
      (acc, val) => ({ ...acc, [val.device]: val.mql.matches }),
      {}
    );
    return result;
  };

  const register = () => {
    mqlObjects.current = Object.entries(config).map((tuple) => {
      return new Mql(tuple[0], tuple[1], () => {
        setDeviceScreen(getMatches());
      });
    });
  };

  const [deviceScreen, setDeviceScreen] = useState({
    desktop: false,
    mobile: false,
    tablet: false,
  });

  return deviceScreen;
};
export default useMedia;
