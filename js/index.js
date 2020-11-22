const divCreateMonster = document.querySelector("#create-monster")
const divMonsterContainer = document.querySelector("#monster-container")
const backBtn = document.querySelector("#back")
const fwdBtn = document.querySelector("#forward")
let pageCount = 1

function backBtnDisabled() {
		if (pageCount === 1) {
		backBtn.disabled = true
	} else if (pageCount > 1) {
		backBtn.disabled = false
	}
}

document.addEventListener("click", handleClick)

function handleClick(event) {
	if (event.target === backBtn) {
		pageCount--
		fetchFiftyMonsters(pageCount)
		backBtnDisabled()
		console.log(pageCount)
	} else if (event.target === fwdBtn) {
		pageCount++
		fetchFiftyMonsters(pageCount)
		backBtnDisabled()
		console.log(pageCount)
	}
}

function fetchFiftyMonsters(pageCount) {
	divMonsterContainer.innerHTML = ""
	fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCount}`)
		.then(response => response.json())
		.then(monstersArray => {
			console.log(monstersArray)
			renderAllMonsters(monstersArray)
		})
}

function handleFormSubmit(event) {
	event.preventDefault()
	const data = {
		name: event.target.name.value,
		age: event.target.age.value,
		description: event.target.description.value
	}

	fetch('http://localhost:3000/monsters', {
	  method: 'POST',
	  headers: {
			'Content-Type': 'application/json',
			Accept: "application/json"
	  },
	  body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(newMonsterObj => {
		  console.log('Success:', newMonsterObj);
	})
	event.target.reset()
}

function initialize() {
	renderForm()
	fetchFiftyMonsters()
	backBtnDisabled()
}

function renderForm() {
	divCreateMonster.innerHTML = `
		<form id="monster-form">
			<input id="name" placeholder="name...">
			<input id="age" placeholder="age...">
			<input id="description" placeholder="description...">
			<button>Create</button>
		</form>
	`
	const monsterForm = document.querySelector("#monster-form")
	monsterForm.addEventListener("submit", handleFormSubmit)
}

function renderAllMonsters(monstersArray) {
	monstersArray.forEach( monsterObj => renderOneMonster(monsterObj))
}

function renderOneMonster(monsterObj) {
	// const monsterName = document.createElement("h2")
	// const monsterAge = document.createElement("h4")
	// const monsterDesc = document.createElement("p")
	// monsterName.textContent = monsterObj.name
	// monsterAge.textContent = `Age: ${monsterObj.age}`
	// monsterDesc.textContent = `Bio: ${monsterObj.description}`
	// divMonsterContainer.append(monsterName, monsterAge, monsterDesc)
	const monsterDiv = document.createElement("div")
	monsterDiv.innerHTML = `
	<h2>${monsterObj.name}</h2>
	<h4>Age: ${monsterObj.age}</h4>
	<p>Bio: ${monsterObj.description}</p>
	`
	divMonsterContainer.append(monsterDiv)
}

initialize()