# Encounter_Randomizer

App Title: Combat Creator

App Description: take a Dnd party and provide a CR appropriate combat

API: https://api.open5e.com/monsters

API Snippet: const BASE_URL = 'https://www.dnd5eapi.co'
 fetch(`https://api.open5e.com/monsters/?challenge_rating=1`)
  .then(res => res.json())
  .then((json) => {
    console.log(json.results)
  })
![wireframe](https://user-images.githubusercontent.com/42871019/215887213-4af8c788-124d-44bf-97ae-00175ce750b6.png)

MVP: There will be a button create a character and store and assign them a level. There will be a button to create additional characters and continue storing them. There will be buttons to remove characters from the party. There will be a tracker that shows you your combat rating based off of your party, and a button underneath to generate an encounter. Hitting the button will generate a monster with the appropriate CR to fight.

post-mvp: expand on the CR method to be based off of total xp and possibly return multiple enemies instead of just 1. Show images of the monster/s selected. track more party info. 

![wireframe](https://user-images.githubusercontent.com/42871019/215887213-4af8c788-124d-44bf-97ae-00175ce750b6.png)

Goals: wed: pseud![Uploading graph.png…]()
ocoding/design thurs: HTML fri: CSS sat: JavaScript sun: Testing

Timeframes: pseudocoding/design 2 hours, HTML: 1 hour 30 minutes, CSS: 3 hours, JavaScript: 5 hours,
Testing: 45 minutes
