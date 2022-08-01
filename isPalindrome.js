function isPalindrome(input) {
  let reverseString = "";
  for (let char of input) {
    reverseString = char + reverseString;
  }
  return input === reverseString;
}

let inputArg = "A lot not new I saw as I went on to LA";
console.log(isPalindrome(inputArg));

