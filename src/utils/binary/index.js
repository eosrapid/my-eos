export function arrayToHex(inputArray) {
  const hexStrArr = [];
  for(let i=0,l=inputArray.length;i<l;i++) {
    hexStrArr[i]=inputArray[i]>=0x10?inputArray[i].toString(16):("0"+inputArray[i].toString(16));
  }
  return hexStrArr.join("");
}