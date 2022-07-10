import { readable } from "svelte/store";
import { Quaternion, Vec3 } from "../helpers/Quaternion.js";

// Storage for the starting quaternion rotation we compare against.
var _qstart = null;

var getRawOrientation = function(e) {
  return { alpha: e.alpha, beta: e.beta, gamma: e.gamma };
}

var getEulerDiff = function(target) {
    const dx = rad2deg(target.x);
    const dy = rad2deg(target.y);
    const dz = rad2deg(target.z);
    return { dx, dy, dz }
}

var deg2rad = function(deg) {
    return deg*(Math.PI/180);
}

var rad2deg = function(rad) {
    return rad*(180/Math.PI);
}

var getQuaternion = function(e) {

    var qcurrent = new Quaternion(0,0,0,0);
    
    // Step: HERE WE GO FROM EULER TO QUATERNION:
    // ====================================================================
    
    var order = 'XYZ';

    // TODO: Check that the order is correct. I think it is but not sure.
    qcurrent.setFromEuler(deg2rad(e.alpha), deg2rad(e.beta), deg2rad(e.gamma), order);
    qcurrent.normalize();

    // Save if we don't have a starting position yet
    if (_qstart == null) {
        _qstart = qcurrent
    }

    // Step: CALCULATE ROTATION FROM OLD TO NEW ORIENTATION
    // ====================================================================
    var qinv = qcurrent.inverse();
    var qdiff = _qstart.mult(qinv);

    var eulerdiff = new Vec3();
    qdiff.toEuler(eulerdiff, 'YZX');
    var rotation = getEulerDiff(eulerdiff);

    // Step: Alternative: Calculate the dot product to get angle
    // ====================================================================
    var qdot = 0;
    qdot += qcurrent.x * _qstart.x;
    qdot += qcurrent.y * _qstart.y;
    qdot += qcurrent.z * _qstart.z;
    qdot += qcurrent.w * _qstart.w;

    var angle = rad2deg(2*Math.acos(qdot));

    return { ...rotation, angle }

}



const getOrientationObject = (e) => {
  if ( !e ) {
    return {
      absolute: { alpha: 0, beta: 0, gamma: 0 },
      relative: { dx: 0, dy: 0, dz: 0, a: 0 }
    }
  } else {
    return {
      absolute: getRawOrientation(e),
      relative: getQuaternion(e)
    }
  }
}



export const orientation = readable( getOrientationObject(), function start( set ) {

  console.log("Starting Orientation Tracking");

  _qstart = null;

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
