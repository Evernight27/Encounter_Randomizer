const BASE_URL = "https://api.open5e.com/monsters"

const crArray = []
const generate = document.querySelector('#generate')
const levelInput = document.querySelector('#numbers')
const charCreate = document.querySelector('.charCreate')
const partyList = document.querySelector('#partyList')
const CR = document.querySelector('#CR')
const encounter = document.querySelector('#encounter')
let crList = {}

charCreate.addEventListener('click', () => {
  createChar(levelInput.value)
  if (crArray.length > 3) {
    levelInput.remove()
    charCreate.remove()
  }
})

generate.addEventListener('click', async () => {
  if (CR.innerHTML === '') {
    encounter.textContent = 'Create a character first.'
  }
  else {
    const monsters = await getCR(CR.innerHTML)
    const monster = await randomMon(monsters)
    encounter.innerHTML = `
    Monster: ${monster.name}<br />
    Stats:
    ${monster.strength} str,
    ${monster.dexterity} dex,
    ${monster.constitution} con,
    ${monster.intelligence} int,
    ${monster.wisdom} wis,
    ${monster.charisma} cha<br />
    HP: ${monster.hit_points}<br />
    AC: ${monster.armor_class}<br />
    Size: ${monster.size}<br />
    Type: ${monster.type}<br />
    Alignment: ${monster.alignment}<br />
    Armor Type: ${monster.armor_desc}<br />`
  }
})

async function randomMon(monsters) {
  const monsterArray = Object.entries(monsters)
  const randomMonster = monsterArray[Math.floor(Math.random() * monsterArray.length)];
  return randomMonster[1];
}

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
  return crList.results
}