const cnp = "5020826014664"
const def = "279146358279"

const s = cnp[0];
const aa = cnp[1] + cnp[2];
const ll = cnp[3] + cnp[4];
const zz = cnp[5] + cnp[6];
const jj = cnp[7] + cnp[8];
const nnn = cnp[9] + cnp[10] + cnp[11];
const c = cnp[12];

var totalAdunat = 0;
for(var i = 0; i < 12; i++) {
  totalAdunat = totalAdunat + cnp[i] * def[i];
}

var verc = totalAdunat % 11;
console.log(verc);