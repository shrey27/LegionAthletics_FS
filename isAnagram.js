let inputString = "eleven plus two";
let secondString = "twelve plus one";

function isAnagram(stringToCompareWith, stringToCompare) {
  let charMap = {},
    newMap = {};
  for (let char of stringToCompareWith) {
    if (char !== " ") {
      if (charMap[char]) {
        charMap[char] += 1;
      } else {
        charMap[char] = 1;
      }
    }
  }

  for (let char of stringToCompare) {
    if (char !== " ") {
      if (newMap[char]) {
        newMap[char] += 1;
      } else {
        newMap[char] = 1;
      }
    }
  }

  if (charMap.length !== newMap.length) return false;
  else {
    for (let key of Object.keys(charMap)) {
      if (!newMap[key] || newMap[key] !== charMap[key]) return false;
    }
  }
  return true;
}

console.log(isAnagram(inputString, secondString));
