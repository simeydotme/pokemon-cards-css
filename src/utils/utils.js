import * as starknet from "starknet";

const SHORT_STRING_MAX_CHARACTERS = 31;

// export function stringToFeltArray(longString) {
//   const res = [];

//   const numChunks = Math.ceil(longString.length / SHORT_STRING_MAX_CHARACTERS);
//   for (let i = 0, o = 0; i < numChunks; ++i, o += SHORT_STRING_MAX_CHARACTERS) {
//     const chunk = longString.substr(o, SHORT_STRING_MAX_CHARACTERS);
//     res.push(starknet.shortString.encodeShortString(chunk).toString());
//   }

//   return res;
// }

export function stringToFeltArray(str) {
  const size = Math.ceil(str.length / 31);
  const arr = Array(size);

  let offset = 0;
  for (let i = 0; i < size; i++) {
    const substr = str.substring(offset, offset + 31).split("");
    const ss = substr.reduce(
      (memo, c) => memo + c.charCodeAt(0).toString(16),
      ""
    );
    arr[i] = BigInt("0x" + ss);
    offset += 31;
  }
  return arr;
}