const BASE_URL = "https://api.open5e.com/monsters"

const crArray = []
const generate = document.querySelector('#generate')
const levelInput = document.querySelector('#numbers')
const charCreate = document.querySelector('.charCreate')
const partyList = document.querySelector('#partyList')
const CR = document.querySelector('#CR')
const encounter = document.querySelector('#encounter')
let crList = []

charCreate.addEventListener('click', () => {
  createChar(levelInput.value)
  if (crArray.length > 3) {
    levelInput.remove()
    charCreate.remove()
  }
})

generate.addEventListener('click', async () => {
  getCR(CR.innerHTML)
  const monster = await randomMon(crList.results)
  console.log(monster.name);
  encounter.textContent = monster.name
})

async function randomMon(array) {
  const randomElement = array[Math.floor(Math.random() * array.length)];
  // console.log(randomElement);
  return randomElement;
}

//TODO 


async function createChar(element) {
  const p = document.createElement('p')
  p.textContent = element
  crArray.push(element)
  partyList.append(p)
  let crNums = crArray.map(i => Number(i))
  let total = crNums.reduce(function (a, b) {
    return a + b;
  })
  total = Math.round(total / crArray.length)
  CR.innerHTML = total
}

async function getCR(cr) {
  const res = await fetch(`${BASE_URL}/?challenge_rating=${cr}`)
  crList = await res.json()
  console.log(crList.results);
}
// getCR(8)
// console.log(crList);