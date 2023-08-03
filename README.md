# [Encounter Randomizer](https://evernight27.github.io/Encounter_Randomizer/)

 Take a Dnd party and provide a CR appropriate monster for them to fight.

URL: https://evernight27.github.io/Encounter_Randomizer/
API: https://api.open5e.com/monsters

## Building and Testing Locally

1. Install [nodejs](https://nodejs.org)
2. Install dependencies:
    ```sh
    npm install
    ```
3. Run development server:
    ```sh
    npm run dev
    ```

## Development Info
API Snippet:
 ```fetch(`https://api.open5e.com/monsters/?challenge_rating=1`)
  .then(res => res.json())
  .then((json) => {
    console.log(json.results)
  })```
![wireframe](https://user-images.githubusercontent.com/42871019/215887213-4af8c788-124d-44bf-97ae-00175ce750b6.png)

MVP: There will be a button create a character and store and assign them a level. There will be a button to create additional characters and continue storing them. There will be buttons to remove characters from the party. There will be a tracker that shows you your combat rating based off of your party, and a button underneath to generate an encounter. Hitting the button will generate a monster with the appropriate CR to fight.

post-mvp: expand on the CR method to be based off of total xp and possibly return multiple enemies instead of just 1. Show images of the monster/s selected. track more party info.

![wireframe](https://user-images.githubusercontent.com/42871019/215887213-4af8c788-124d-44bf-97ae-00175ce750b6.png)

