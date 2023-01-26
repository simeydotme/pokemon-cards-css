import { readable } from "svelte/store";


const getRawOrientation = function(e) {
  if ( !e ) {
    return { alpha: 0, beta: 0, gamma: 0 };
  } else {
    return { alpha: e.alpha, beta: e.beta, gamma: e.gamma };
  }
}

const getOrientationObject = (e) => {
  const orientation = getRawOrientation(e);
  return {
    absolute: orientation,
    relative: { 
      alpha: orientation.alpha - baseOrientation.alpha, 
      beta: orientation.beta - baseOrientation.beta, 
      gamma: orientation.gamma - baseOrientation.gamma, 
    }
  }
}

let firstReading = true;
let baseOrientation = getRawOrientation();

export const resetBaseOrientation = () => {
  firstReading = true;
  baseOrientation = getRawOrientation();
}

export const orientation = readable( getOrientationObject(), function start( set ) {

  // https://developer.mozilla.org/en-US/docs/Web/API/Window/ondeviceorientation
  const handleOrientation = function(e) {

    if ( firstReading ) {
      firstReading = false;
      baseOrientation = getRawOrientation(e);
    }

    const o = getOrientationObject(e);
    set( o );
  };

  window.addEventListener("deviceorientation", handleOrientation, true);

  return function stop() {
    window.removeEventListener("deviceorientation", handleOrientation, true);
  }

});
