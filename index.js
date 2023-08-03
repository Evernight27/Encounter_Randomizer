const BASE_URL = 'https://api.open5e.com/monsters';

const crArray = [];
const generate = document.querySelector('#generate');
const levelInput = document.querySelector('#numbers');
const charCreate = document.querySelector('.charCreate');
const partyList = document.querySelector('#partyList');
const createInfo = document.querySelector('#createInfo');
const CR = document.querySelector('#CR');
const encounter = document.querySelector('#encounter');
let crList = {};
// set default to nothing
CR.innerHTML = 'N/A';

async function randomMon(monsters) {
  const monsterArray = Object.entries(monsters);
  const randomMonster = monsterArray[Math.floor(Math.random() * monsterArray.length)];
  return randomMonster[1];
}

async function createChar(element) {
  const p = document.createElement('p');
  p.textContent = element;
  crArray.push(element);
  partyList.append(p);
  const crNums = crArray.map((i) => Number(i));
  const totalNums = crNums.reduce((a, b) => a + b);
  const total = Math.round(totalNums / crArray.length);
  CR.innerHTML = total;
}

async function getCR(cr) {
  const res = await fetch(`${BASE_URL}/?cr=${cr}`);
  crList = await res.json();
  return crList.results;
}

charCreate.addEventListener('click', () => {
  if (crArray.length > 3) {
    if (!document.getElementById('partyWarning')) {
      createInfo.appendChild(document.createElement('br'));
      const partyWarning = '<p id="partyWarning">You can only have up to 4 players in your party.</p>';
      document.getElementById('createInfo').insertAdjacentHTML('beforeend', partyWarning);
    }
  } else {
    createChar(levelInput.value);
  }
});

generate.addEventListener('click', async () => {
  if (CR.innerHTML === 'N/A') {
    encounter.textContent = "Your party doesn't have a CR rating yet. Try adding a character first!";
  } else {
    const monsters = await getCR(CR.innerHTML);
    const monster = await randomMon(monsters);
    encounter.innerHTML = `
    <h2 class="sameline">Monster: </h2><p class="sameline">${monster.name}</p><br />
    <h3 class="sameline">Stats: </h3><p class="sameline">
    ${monster.strength} Str,
    ${monster.dexterity} Dex,
    ${monster.constitution} Con,
    ${monster.intelligence} Int,
    ${monster.wisdom} Wis,
    ${monster.charisma} Cha</p><br />
    <h3 class="sameline">HP: </h3><p class="sameline">${monster.hit_points}</p><br />
    <h3 class="sameline">AC: </h3><p class="sameline">${monster.armor_class}</p><br />
    <h3 class="sameline">Size: </h3><p class="sameline">${monster.size}</p><br />
    <h3 class="sameline">Type: </h3><p class="sameline">${monster.type}</p><br />
    <h3 class="sameline">Alignment: </h3><p class="sameline">${monster.alignment}</p><br />
    <h3 class="sameline">Armor Type: </h3><p class="sameline">${monster.armor_desc || 'N/A'}</p><br />`;
  }
});
