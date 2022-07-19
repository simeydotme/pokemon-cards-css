import { readable } from "svelte/store";

var getRawOrientation = function(e) {
  return { alpha: e.alpha, beta: e.beta, gamma: e.gamma };
}

const getOrientationObject = (e) => {
  if ( !e ) {
    return {
      absolute: { alpha: 0, beta: 0, gamma: 0 },
      relative: { alpha: 0, beta: 0, gamma: 0 }
    }
  } else {
    return {
      absolute: getRawOrientation(e),
      relative: getRawOrientation(e)
    }
  }
}

export const orientation = readable( getOrientationObject(), function start( set ) {

  console.log("Starting Orientation Tracking");

  // https://developer.mozilla.org/en-US/docs/Web/API/Window/ondeviceorientation
  const handleOrientation = function(e) {
    set( getOrientationObject(e) );
  };

  window.addEventListener("deviceorientation", handleOrientation, true);

  return function stop() {
    window.removeEventListener("deviceorientation", handleOrientation, true);
    console.log("Stopping Orientation Tracking");
  }

});
