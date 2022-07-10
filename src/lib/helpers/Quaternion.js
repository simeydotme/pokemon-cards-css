//
// THIS IS BORROWED FROM cannon.js
//


//#############################################################################
//
//               Vector: 
//
//#############################################################################
 
/**
 * 3-dimensional vector
 * @class Vec3
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @author schteppe
 * @example
 *     var v = new Vec3(1, 2, 3);
 *     console.log('x=' + v.x); // x=1
 */
 function Vec3(x,y,z){
  /**
   * @property x
   * @type {Number}
   */
  this.x = x||0.0;

  /**
   * @property y
   * @type {Number}
   */
  this.y = y||0.0;

  /**
   * @property z
   * @type {Number}
   */
  this.z = z||0.0;
}

/**
* @static
* @property {Vec3} ZERO
*/
Vec3.ZERO = new Vec3(0, 0, 0);

/**
* @static
* @property {Vec3} UNIT_X
*/
Vec3.UNIT_X = new Vec3(1, 0, 0);

/**
* @static
* @property {Vec3} UNIT_Y
*/
Vec3.UNIT_Y = new Vec3(0, 1, 0);

/**
* @static
* @property {Vec3} UNIT_Z
*/
Vec3.UNIT_Z = new Vec3(0, 0, 1);

/**
* Vector cross product
* @method cross
* @param {Vec3} v
* @param {Vec3} target Optional. Target to save in.
* @return {Vec3}
*/
Vec3.prototype.cross = function(v,target){
  var vx=v.x, vy=v.y, vz=v.z, x=this.x, y=this.y, z=this.z;
  target = target || new Vec3();

  target.x = (y * vz) - (z * vy);
  target.y = (z * vx) - (x * vz);
  target.z = (x * vy) - (y * vx);

  return target;
};

/**
* Set the vectors' 3 elements
* @method set
* @param {Number} x
* @param {Number} y
* @param {Number} z
* @return Vec3
*/
Vec3.prototype.set = function(x,y,z){
  this.x = x;
  this.y = y;
  this.z = z;
  return this;
};

/**
* Set all components of the vector to zero.
* @method setZero
*/
Vec3.prototype.setZero = function(){
  this.x = this.y = this.z = 0;
};

/**
* Vector addition
* @method vadd
* @param {Vec3} v
* @param {Vec3} target Optional.
* @return {Vec3}
*/
Vec3.prototype.vadd = function(v,target){
  if(target){
      target.x = v.x + this.x;
      target.y = v.y + this.y;
      target.z = v.z + this.z;
  } else {
      return new Vec3(this.x + v.x,
                             this.y + v.y,
                             this.z + v.z);
  }
};

/**
* Vector subtraction
* @method vsub
* @param {Vec3} v
* @param {Vec3} target Optional. Target to save in.
* @return {Vec3}
*/
Vec3.prototype.vsub = function(v,target){
  if(target){
      target.x = this.x - v.x;
      target.y = this.y - v.y;
      target.z = this.z - v.z;
  } else {
      return new Vec3(this.x-v.x,
                             this.y-v.y,
                             this.z-v.z);
  }
};

// *
//  * Get the cross product matrix a_cross from a vector, such that a x b = a_cross * b = c
//  * @method crossmat
//  * @see http://www8.cs.umu.se/kurser/TDBD24/VT06/lectures/Lecture6.pdf
//  * @return {Mat3}

// Vec3.prototype.crossmat = function(){
//     return new Mat3([     0,  -this.z,   this.y,
//                             this.z,        0,  -this.x,
//                            -this.y,   this.x,        0]);
// };

/**
* Normalize the vector. Note that this changes the values in the vector.
* @method normalize
* @return {Number} Returns the norm of the vector
*/
Vec3.prototype.normalize = function(){
  var x=this.x, y=this.y, z=this.z;
  var n = Math.sqrt(x*x + y*y + z*z);
  if(n>0.0){
      var invN = 1/n;
      this.x *= invN;
      this.y *= invN;
      this.z *= invN;
  } else {
      // Make something up
      this.x = 0;
      this.y = 0;
      this.z = 0;
  }
  return n;
};

/**
* Get the version of this vector that is of length 1.
* @method unit
* @param {Vec3} target Optional target to save in
* @return {Vec3} Returns the unit vector
*/
Vec3.prototype.unit = function(target){
  target = target || new Vec3();
  var x=this.x, y=this.y, z=this.z;
  var ninv = Math.sqrt(x*x + y*y + z*z);
  if(ninv>0.0){
      ninv = 1.0/ninv;
      target.x = x * ninv;
      target.y = y * ninv;
      target.z = z * ninv;
  } else {
      target.x = 1;
      target.y = 0;
      target.z = 0;
  }
  return target;
};

/**
* Get the length of the vector
* @method norm
* @return {Number}
* @deprecated Use .length() instead
*/
Vec3.prototype.norm = function(){
  var x=this.x, y=this.y, z=this.z;
  return Math.sqrt(x*x + y*y + z*z);
};

/**
* Get the length of the vector
* @method length
* @return {Number}
*/
Vec3.prototype.length = Vec3.prototype.norm;

/**
* Get the squared length of the vector
* @method norm2
* @return {Number}
* @deprecated Use .lengthSquared() instead.
*/
Vec3.prototype.norm2 = function(){
  return this.dot(this);
};

/**
* Get the squared length of the vector.
* @method lengthSquared
* @return {Number}
*/
Vec3.prototype.lengthSquared = Vec3.prototype.norm2;

/**
* Get distance from this point to another point
* @method distanceTo
* @param  {Vec3} p
* @return {Number}
*/
Vec3.prototype.distanceTo = function(p){
  var x=this.x, y=this.y, z=this.z;
  var px=p.x, py=p.y, pz=p.z;
  return Math.sqrt((px-x)*(px-x)+
                   (py-y)*(py-y)+
                   (pz-z)*(pz-z));
};

/**
* Get squared distance from this point to another point
* @method distanceSquared
* @param  {Vec3} p
* @return {Number}
*/
Vec3.prototype.distanceSquared = function(p){
  var x=this.x, y=this.y, z=this.z;
  var px=p.x, py=p.y, pz=p.z;
  return (px-x)*(px-x) + (py-y)*(py-y) + (pz-z)*(pz-z);
};

/**
* Multiply all the components of the vector with a scalar.
* @deprecated Use .scale instead
* @method mult
* @param {Number} scalar
* @param {Vec3} target The vector to save the result in.
* @return {Vec3}
* @deprecated Use .scale() instead
*/
Vec3.prototype.mult = function(scalar,target){
  target = target || new Vec3();
  var x = this.x,
      y = this.y,
      z = this.z;
  target.x = scalar * x;
  target.y = scalar * y;
  target.z = scalar * z;
  return target;
};

/**
* Multiply the vector with a scalar.
* @method scale
* @param {Number} scalar
* @param {Vec3} target
* @return {Vec3}
*/
Vec3.prototype.scale = Vec3.prototype.mult;

/**
* Calculate dot product
* @method dot
* @param {Vec3} v
* @return {Number}
*/
Vec3.prototype.dot = function(v){
  return this.x * v.x + this.y * v.y + this.z * v.z;
};

/**
* @method isZero
* @return bool
*/
Vec3.prototype.isZero = function(){
  return this.x===0 && this.y===0 && this.z===0;
};

/**
* Make the vector point in the opposite direction.
* @method negate
* @param {Vec3} target Optional target to save in
* @return {Vec3}
*/
Vec3.prototype.negate = function(target){
  target = target || new Vec3();
  target.x = -this.x;
  target.y = -this.y;
  target.z = -this.z;
  return target;
};

/**
* Compute two artificial tangents to the vector
* @method tangents
* @param {Vec3} t1 Vector object to save the first tangent in
* @param {Vec3} t2 Vector object to save the second tangent in
*/
var Vec3_tangents_n = new Vec3();
var Vec3_tangents_randVec = new Vec3();
Vec3.prototype.tangents = function(t1,t2){
  var norm = this.norm();
  if(norm>0.0){
      var n = Vec3_tangents_n;
      var inorm = 1/norm;
      n.set(this.x*inorm,this.y*inorm,this.z*inorm);
      var randVec = Vec3_tangents_randVec;
      if(Math.abs(n.x) < 0.9){
          randVec.set(1,0,0);
          n.cross(randVec,t1);
      } else {
          randVec.set(0,1,0);
          n.cross(randVec,t1);
      }
      n.cross(t1,t2);
  } else {
      // The normal length is zero, make something up
      t1.set(1, 0, 0);
      t2.set(0, 1, 0);
  }
};

/**
* Converts to a more readable format
* @method toString
* @return string
*/
Vec3.prototype.toString = function(){
  return this.x+","+this.y+","+this.z;
};

/**
* Converts to an array
* @method toArray
* @return Array
*/
Vec3.prototype.toArray = function(){
  return [this.x, this.y, this.z];
};

/**
* Copies value of source to this vector.
* @method copy
* @param {Vec3} source
* @return {Vec3} this
*/
Vec3.prototype.copy = function(source){
  this.x = source.x;
  this.y = source.y;
  this.z = source.z;
  return this;
};


/**
* Do a linear interpolation between two vectors
* @method lerp
* @param {Vec3} v
* @param {Number} t A number between 0 and 1. 0 will make this function return u, and 1 will make it return v. Numbers in between will generate a vector in between them.
* @param {Vec3} target
*/
Vec3.prototype.lerp = function(v,t,target){
  var x=this.x, y=this.y, z=this.z;
  target.x = x + (v.x-x)*t;
  target.y = y + (v.y-y)*t;
  target.z = z + (v.z-z)*t;
};

/**
* Check if a vector equals is almost equal to another one.
* @method almostEquals
* @param {Vec3} v
* @param {Number} precision
* @return bool
*/
Vec3.prototype.almostEquals = function(v,precision){
  if(precision===undefined){
      precision = 1e-6;
  }
  if( Math.abs(this.x-v.x)>precision ||
      Math.abs(this.y-v.y)>precision ||
      Math.abs(this.z-v.z)>precision){
      return false;
  }
  return true;
};

/**
* Check if a vector is almost zero
* @method almostZero
* @param {Number} precision
*/
Vec3.prototype.almostZero = function(precision){
  if(precision===undefined){
      precision = 1e-6;
  }
  if( Math.abs(this.x)>precision ||
      Math.abs(this.y)>precision ||
      Math.abs(this.z)>precision){
      return false;
  }
  return true;
};

var antip_neg = new Vec3();

/**
* Check if the vector is anti-parallel to another vector.
* @method isAntiparallelTo
* @param  {Vec3}  v
* @param  {Number}  precision Set to zero for exact comparisons
* @return {Boolean}
*/
Vec3.prototype.isAntiparallelTo = function(v,precision){
  this.negate(antip_neg);
  return antip_neg.almostEquals(v,precision);
};

/**
* Clone the vector
* @method clone
* @return {Vec3}
*/
Vec3.prototype.clone = function(){
  return new Vec3(this.x, this.y, this.z);
};
  

//#############################################################################
//
//               Quaternion: 
//
//#############################################################################

/**
* A Quaternion describes a rotation in 3D space. The Quaternion is mathematically defined as Q = x*i + y*j + z*k + w, where (i,j,k) are imaginary basis vectors. (x,y,z) can be seen as a vector related to the axis of rotation, while the real multiplier, w, is related to the amount of rotation.
* @class Quaternion
* @constructor
* @param {Number} x Multiplier of the imaginary basis vector i.
* @param {Number} y Multiplier of the imaginary basis vector j.
* @param {Number} z Multiplier of the imaginary basis vector k.
* @param {Number} w Multiplier of the real part.
* @see http://en.wikipedia.org/wiki/Quaternion
*/
function Quaternion(x,y,z,w){
  /**
   * @property {Number} x
   */
  this.x = x!==undefined ? x : 0;

  /**
   * @property {Number} y
   */
  this.y = y!==undefined ? y : 0;

  /**
   * @property {Number} z
   */
  this.z = z!==undefined ? z : 0;

  /**
   * The multiplier of the real quaternion basis vector.
   * @property {Number} w
   */
  this.w = w!==undefined ? w : 1;
}

/**
* Set the value of the quaternion.
* @method set
* @param {Number} x
* @param {Number} y
* @param {Number} z
* @param {Number} w
*/
Quaternion.prototype.set = function(x,y,z,w){
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;
};

/**
* Convert to a readable format
* @method toString
* @return string
*/
Quaternion.prototype.toString = function(){
  return this.x+","+this.y+","+this.z+","+this.w;
};

/**
* Convert to an Array
* @method toArray
* @return Array
*/
Quaternion.prototype.toArray = function(){
  return [this.x, this.y, this.z, this.w];
};

/**
* Set the quaternion components given an axis and an angle.
* @method setFromAxisAngle
* @param {Vec3} axis
* @param {Number} angle in radians
*/
Quaternion.prototype.setFromAxisAngle = function(axis,angle){
  var s = Math.sin(angle*0.5);
  this.x = axis.x * s;
  this.y = axis.y * s;
  this.z = axis.z * s;
  this.w = Math.cos(angle*0.5);
};

/**
* Converts the quaternion to axis/angle representation.
* @method toAxisAngle
* @param {Vec3} targetAxis Optional. A vector object to reuse for storing the axis.
* @return Array An array, first elemnt is the axis and the second is the angle in radians.
*/
Quaternion.prototype.toAxisAngle = function(targetAxis){
  targetAxis = targetAxis || new Vec3();
  this.normalize(); // if w>1 acos and sqrt will produce errors, this cant happen if quaternion is normalised
  var angle = 2 * Math.acos(this.w);
  var s = Math.sqrt(1-this.w*this.w); // assuming quaternion normalised then w is less than 1, so term always positive.
  if (s < 0.001) { // test to avoid divide by zero, s is always positive due to sqrt
      // if s close to zero then direction of axis not important
      targetAxis.x = this.x; // if it is important that axis is normalised then replace with x=1; y=z=0;
      targetAxis.y = this.y;
      targetAxis.z = this.z;
  } else {
      targetAxis.x = this.x / s; // normalise axis
      targetAxis.y = this.y / s;
      targetAxis.z = this.z / s;
  }
  return [targetAxis,angle];
};

var sfv_t1 = new Vec3(),
  sfv_t2 = new Vec3();

/**
* Set the quaternion value given two vectors. The resulting rotation will be the needed rotation to rotate u to v.
* @method setFromVectors
* @param {Vec3} u
* @param {Vec3} v
*/
Quaternion.prototype.setFromVectors = function(u,v){
  if(u.isAntiparallelTo(v)){
      var t1 = sfv_t1;
      var t2 = sfv_t2;

      u.tangents(t1,t2);
      this.setFromAxisAngle(t1,Math.PI);
  } else {
      var a = u.cross(v);
      this.x = a.x;
      this.y = a.y;
      this.z = a.z;
      this.w = Math.sqrt(Math.pow(u.norm(),2) * Math.pow(v.norm(),2)) + u.dot(v);
      this.normalize();
  }
};

/**
* Quaternion multiplication
* @method mult
* @param {Quaternion} q
* @param {Quaternion} target Optional.
* @return {Quaternion}
*/
var Quaternion_mult_va = new Vec3();
var Quaternion_mult_vb = new Vec3();
var Quaternion_mult_vaxvb = new Vec3();
Quaternion.prototype.mult = function(q,target){
  target = target || new Quaternion();
  var w = this.w,
      va = Quaternion_mult_va,
      vb = Quaternion_mult_vb,
      vaxvb = Quaternion_mult_vaxvb;

  va.set(this.x,this.y,this.z);
  vb.set(q.x,q.y,q.z);
  target.w = w*q.w - va.dot(vb);
  va.cross(vb,vaxvb);

  target.x = w * vb.x + q.w*va.x + vaxvb.x;
  target.y = w * vb.y + q.w*va.y + vaxvb.y;
  target.z = w * vb.z + q.w*va.z + vaxvb.z;

  return target;
};

/**
* Get the inverse quaternion rotation.
* @method inverse
* @param {Quaternion} target
* @return {Quaternion}
*/
Quaternion.prototype.inverse = function(target){
  var x = this.x, y = this.y, z = this.z, w = this.w;
  target = target || new Quaternion();

  this.conjugate(target);
  var inorm2 = 1/(x*x + y*y + z*z + w*w);
  target.x *= inorm2;
  target.y *= inorm2;
  target.z *= inorm2;
  target.w *= inorm2;

  return target;
};

/**
* Get the quaternion conjugate
* @method conjugate
* @param {Quaternion} target
* @return {Quaternion}
*/
Quaternion.prototype.conjugate = function(target){
  target = target || new Quaternion();

  target.x = -this.x;
  target.y = -this.y;
  target.z = -this.z;
  target.w = this.w;

  return target;
};

/**
* Normalize the quaternion. Note that this changes the values of the quaternion.
* @method normalize
*/
Quaternion.prototype.normalize = function(){
  var l = Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);
  if ( l === 0 ) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 0;
  } else {
      l = 1 / l;
      this.x *= l;
      this.y *= l;
      this.z *= l;
      this.w *= l;
  }
};

/**
* Approximation of quaternion normalization. Works best when quat is already almost-normalized.
* @method normalizeFast
* @see http://jsperf.com/fast-quaternion-normalization
* @author unphased, https://github.com/unphased
*/
Quaternion.prototype.normalizeFast = function () {
  var f = (3.0-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2.0;
  if ( f === 0 ) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 0;
  } else {
      this.x *= f;
      this.y *= f;
      this.z *= f;
      this.w *= f;
  }
};

/**
* Multiply the quaternion by a vector
* @method vmult
* @param {Vec3} v
* @param {Vec3} target Optional
* @return {Vec3}
*/
Quaternion.prototype.vmult = function(v,target){
  target = target || new Vec3();

  var x = v.x,
      y = v.y,
      z = v.z;

  var qx = this.x,
      qy = this.y,
      qz = this.z,
      qw = this.w;

  // q*v
  var ix =  qw * x + qy * z - qz * y,
  iy =  qw * y + qz * x - qx * z,
  iz =  qw * z + qx * y - qy * x,
  iw = -qx * x - qy * y - qz * z;

  target.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  target.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  target.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

  return target;
};

/**
* Copies value of source to this quaternion.
* @method copy
* @param {Quaternion} source
* @return {Quaternion} this
*/
Quaternion.prototype.copy = function(source){
  this.x = source.x;
  this.y = source.y;
  this.z = source.z;
  this.w = source.w;
  return this;
};

/**
* Convert the quaternion to euler angle representation. Order: YZX, as this page describes: http://www.euclideanspace.com/maths/standards/index.htm
* @method toEuler
* @param {Vec3} target
* @param string order Three-character string e.g. "YZX", which also is default.
*/
Quaternion.prototype.toEuler = function(target,order){
  order = order || "YZX";

  var heading, attitude, bank;
  var x = this.x, y = this.y, z = this.z, w = this.w;

  switch(order){
  case "YZX":
      var test = x*y + z*w;
      if (test > 0.499) { // singularity at north pole
          heading = 2 * Math.atan2(x,w);
          attitude = Math.PI/2;
          bank = 0;
      }
      if (test < -0.499) { // singularity at south pole
          heading = -2 * Math.atan2(x,w);
          attitude = - Math.PI/2;
          bank = 0;
      }
      if(isNaN(heading)){
          var sqx = x*x;
          var sqy = y*y;
          var sqz = z*z;
          heading = Math.atan2(2*y*w - 2*x*z , 1 - 2*sqy - 2*sqz); // Heading
          attitude = Math.asin(2*test); // attitude
          bank = Math.atan2(2*x*w - 2*y*z , 1 - 2*sqx - 2*sqz); // bank
      }
      break;
  default:
      throw new Error("Euler order "+order+" not supported yet.");
  }

  target.y = heading;
  target.z = attitude;
  target.x = bank;
};

/**
* See http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m
* @method setFromEuler
* @param {Number} x
* @param {Number} y
* @param {Number} z
* @param {String} order The order to apply angles: 'XYZ' or 'YXZ' or any other combination
*/
Quaternion.prototype.setFromEuler = function ( x, y, z, order ) {
  order = order || "XYZ";

  var c1 = Math.cos( x / 2 );
  var c2 = Math.cos( y / 2 );
  var c3 = Math.cos( z / 2 );
  var s1 = Math.sin( x / 2 );
  var s2 = Math.sin( y / 2 );
  var s3 = Math.sin( z / 2 );

  if ( order === 'XYZ' ) {

      this.x = s1 * c2 * c3 + c1 * s2 * s3;
      this.y = c1 * s2 * c3 - s1 * c2 * s3;
      this.z = c1 * c2 * s3 + s1 * s2 * c3;
      this.w = c1 * c2 * c3 - s1 * s2 * s3;

  } else if ( order === 'YXZ' ) {

      this.x = s1 * c2 * c3 + c1 * s2 * s3;
      this.y = c1 * s2 * c3 - s1 * c2 * s3;
      this.z = c1 * c2 * s3 - s1 * s2 * c3;
      this.w = c1 * c2 * c3 + s1 * s2 * s3;

  } else if ( order === 'ZXY' ) {

      this.x = s1 * c2 * c3 - c1 * s2 * s3;
      this.y = c1 * s2 * c3 + s1 * c2 * s3;
      this.z = c1 * c2 * s3 + s1 * s2 * c3;
      this.w = c1 * c2 * c3 - s1 * s2 * s3;

  } else if ( order === 'ZYX' ) {

      this.x = s1 * c2 * c3 - c1 * s2 * s3;
      this.y = c1 * s2 * c3 + s1 * c2 * s3;
      this.z = c1 * c2 * s3 - s1 * s2 * c3;
      this.w = c1 * c2 * c3 + s1 * s2 * s3;

  } else if ( order === 'YZX' ) {

      this.x = s1 * c2 * c3 + c1 * s2 * s3;
      this.y = c1 * s2 * c3 + s1 * c2 * s3;
      this.z = c1 * c2 * s3 - s1 * s2 * c3;
      this.w = c1 * c2 * c3 - s1 * s2 * s3;

  } else if ( order === 'XZY' ) {

      this.x = s1 * c2 * c3 - c1 * s2 * s3;
      this.y = c1 * s2 * c3 - s1 * c2 * s3;
      this.z = c1 * c2 * s3 + s1 * s2 * c3;
      this.w = c1 * c2 * c3 + s1 * s2 * s3;

  }

  return this;

};

Quaternion.prototype.clone = function(){
  return new Quaternion(this.x, this.y, this.z, this.w);
};



export { Quaternion, Vec3 }