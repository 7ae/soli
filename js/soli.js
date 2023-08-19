//@date 2022

const dict = {
  "ㄱ": "g",
  "ㄴ": "n",
  "ㄷ": "d",
  "ㄹ": "l",
  "ㅁ": "m",
  "ㅂ": "b",
  "ㅅ": "s",
  "ㅇ": "ng",
  "ㅈ": "j",
  "ㅊ": "ch",
  "ㅋ": "k",
  "ㅌ": "t",
  "ㅍ": "p",
  "ㅎ": "h",
  "ㄲ": "k",
  "ㄸ": "tt",
  "ㅃ": "pp",
  "ㅆ": "s",
  "ㅉ": "jj",
  "ㄳ": "gs",
  "ㄵ": "nj",
  "ㄶ": "nh",
  "ㄺ": "lg",
  "ㄻ": "lm",
  "ㄼ": "lb",
  "ㄽ": "ls",
  "ㄾ": "lt",
  "ㄿ": "lp",
  "ㅀ": "lh",
  "ㅄ": "bs",
  "ㅏ": "a",
  "ㅑ": "ya",
  "ㅓ": "o",
  "ㅕ": "yo",
  "ㅗ": "o",
  "ㅛ": "yo",
  "ㅜ": "u",
  "ㅠ": "yu",
  "ㅡ": "u",
  "ㅣ": "i",
  "ㅐ": "e",
  "ㅔ": "e",
  "ㅒ": "ye",
  "ㅖ": "ye",
  "ㅘ": "wa",
  "ㅙ": "oe",
  "ㅚ": "oe",
  "ㅞ": "oe",
  "ㅝ": "wo",
  "ㅟ": "wi",
  "ㅢ": "ui"
};

const hangul_f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const hangul_m = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const hangul_e = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

function convert() {
  let input = document.getElementById("input").value.trim();
  let out = "";

  for (let i = 0; i < input.length; i++) {
    if (input[i].match(/[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g)) {
      const ga = 44032;
      let unicode = input[i].charCodeAt(0);
      unicode = unicode - ga;

      let fi = parseInt(unicode / 588);
      let mi = parseInt((unicode - (fi * 588)) / 28);
      let ei = parseInt(unicode % 28);

      if (hangul_f[fi] && hangul_f[fi] != "ㅇ") {
        out += dict[hangul_f[fi]];
      }

      if (hangul_m[mi]) {
        out += dict[hangul_m[mi]];
      }

      if (hangul_e[ei]) {
        out += dict[hangul_e[ei]];
      }
    } else {
      out += input[i];
    }
  }
  out = out.charAt(0).toUpperCase() + out.slice(1);

  for (var i = 0; i < out.length; i++) {
    if (["s", "j", "ch", "h"].includes(out[i])) {
      if (i + 1 < out.length && ["a", "e", "i", "o", "u", "y", "w"].includes(out[i + 1])) {
        continue;
      } else {
        out = out.substring(0, i) + "t" + out.substring(i + 1);
      }
    }
  }

  document.getElementById("out").value = out;
}

function clipboard() {
  // Retrieved from https://www.w3schools.com/howto/howto_js_copy_clipboard.asp on November 12, 2022
  var copyText = document.getElementById("out");

  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value);
  alert("Copied the text: " + copyText.value);
}
