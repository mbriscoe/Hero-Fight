// get references for html elements
const heroNameElement = document.querySelector('#heroName');
const villainNameElement = document.querySelector('#villainName');
const heroHealthElement = document.querySelector('#heroHealth');
const villainHealthElement = document.querySelector('#villainHealth');
const heroLastAttackElement = document.querySelector('#heroLastAttack');
const villainLastAttackElement = document.querySelector('#villainLastAttack');
const heroButtonElement = document.querySelector('#heroButton');
const villainButtonElement = document.querySelector('#villainButton');
const resultElement = document.querySelector('#result');

// add event lsiteners to the buttons
heroButtonElement.addEventListener('click', () => attack(hero));
villainButtonElement.addEventListener('click', () => attack(villain));

// define hero
let hero = {
    name: 'Spider-man',
    health: 100,
    isAlive: true,
    attacks: [
        ['web shooters', 10],
        ['punch', 2],
        ['swing kick', 5],
    ],
    attack() {
        let rand = Math.floor(Math.random() * this.attacks.length);
        return this.attacks[rand];
    },
};

// define villain
let villain = {
    name: 'Doctor Octopus',
    health: 100,
    isAlive: true,
    attacks: [
        ['leg strike', 8],
        ['punch', 2],
        ['leg choke', 3],
    ],
    attack() {
        let rand = Math.floor(Math.random() * this.attacks.length);
        return this.attacks[rand];
    },
};

// set names and health on page
heroNameElement.textContent = hero.name;
villainNameElement.textContent = villain.name;
heroHealthElement.textContent = `Health: ${hero.health}`;
villainHealthElement.textContent = `Health: ${villain.health}`;

// flip a coin to see who starts and enable/disable buttons accordingly
let coin = Math.floor(Math.random() * 2);
if (coin === 1) {
    heroButtonElement.disabled = true;
    villainButtonElement.disabled = false;
} else {
    heroButtonElement.disabled = false;
    villainButtonElement.disabled = true;
}

// main game logic
function attack(character) {
    // call character object attack function and display result
    let attackResult = character.attack();
    resultElement.innerHTML += `${character.name} attacked with ${attackResult[0]} for ${attackResult[1]} damage!\n`;

    // ensure textarea is scrolled to the bottom
    resultElement.scrollTop = resultElement.scrollHeight;

    // process the attack
    if (character === hero) {
        heroButtonElement.disabled = true;
        villainButtonElement.disabled = false;
        villain.health -= attackResult[1];
        heroLastAttackElement.textContent = `Last attack: ${attackResult[0]} for ${attackResult[1]}`;
        villainHealthElement.textContent = `Health: ${villain.health}`;
    } else {
        villainButtonElement.disabled = true;
        heroButtonElement.disabled = false;
        hero.health -= attackResult[1];
        villainLastAttackElement.textContent = `Last attack: ${attackResult[0]} for ${attackResult[1]}`;
        heroHealthElement.textContent = `Health: ${hero.health}`;
    }

    // check for game over condition anddisplay result
    if (hero.health <= 0) {
        heroButtonElement.disabled = true;
        villainButtonElement.disabled = true;
        hero.isAlive = false;
        resultElement.textContent = `${hero.name} has been defeated!`;
    }
    if (villain.health <= 0) {
        villain.isAlive = false;
        resultElement.textContent = `${villain.name} has been defeated!`;
    }
}
