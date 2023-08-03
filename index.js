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

    const ac = monster.armor_desc ? `<h3 class="sameline">Armor Class: </h3><p class="sameline">${monster.armor_class} (${monster.armor_desc})</p><br />` : `<h3 class="sameline">Armor Class: </h3><p class="sameline">${monster.armor_class}</p><br />`;
    const monsterType = monster.alignment ? `${monster.size} ${monster.type}, ${monster.alignment}` : `${monster.size} ${monster.type}`;
    const vulnerabilities = monster.damage_vulnerabilities ? `<h4 class="sameline">Damage Vulnerabilities: </h4><p class="sameline">${monster.damage_vulnerabilities}</p><br />` : '';
    const resistances = monster.damage_resistances ? `<h4 class="sameline">Damage Resistances: </h4><p class="sameline">${monster.damage_resistances}</p><br />` : '';
    const immunities = monster.damage_immunities ? `<h4 class="sameline">Damage Immunities: </h4><p class="sameline">${monster.damage_immunities}</p><br />` : '';

    const monsterAbilities = monster.special_abilities;
    const specialAbilities = monsterAbilities.map((ability) => `<h4 class="sameline specialAbilities">${ability.name}: </h4><p class="sameline">${ability.desc}</p><br />`).join(' ');

    encounter.innerHTML = `
    <div class="monsterBlock">
    <h2 class="sameline">${monster.name}</h2>
    <br />
    <em property="italic class="sameline">${monsterType}</em><br />
    <hr />
    ${ac}
    <h3 class="sameline">Hit Points: </h3><p class="sameline">${monster.hit_points}</p><br />
    <h3 class="sameline">Speed: </h3><p class="sameline">${monster.speed.walk} ft.</p><br />
    <hr />
    <div style="overflow-x: auto;">
      <table>
        <thead>
          <tr>
            <th align="center">STR</th>
            <th align="center">DEX</th>
            <th align="center">CON</th>
            <th align="center">INT</th>
            <th align="center">WIS</th>
            <th align="center">CHA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="center">${monster.strength}</td>
            <td align="center">${monster.dexterity}</td>
            <td align="center">${monster.constitution}</td>
            <td align="center">${monster.intelligence}</td>
            <td align="center">${monster.wisdom}</td>
            <td align="center">${monster.charisma}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    ${vulnerabilities}
    ${resistances}
    ${immunities}
    <h4 class="sameline" >Senses: </h4 ><p class="sameline">${monster.senses}</p><br />
    <h4 class="sameline" >Languages: </h4 ><p class="sameline">${monster.languages || '---'}</p><br />
    <hr />
    ${specialAbilities}
    </div>`;
  }
});
