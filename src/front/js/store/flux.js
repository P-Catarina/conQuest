import { IMAGES } from "../../img/all_images";
import { TEXT } from "../../content_text/all_messages";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [],
			quests: [],
			rewards: [],
     		bestiary: [],
 			roles: [],
			difficulties: [],
			rarities: [],
			abilities: [],
			scoreboard: [],
			npc: [],
			encounterPool: [],
			creatureInfo:[],
			inputs: {},
			loading: true,
			loadingQuests: true,
			loadingRewards: true,
			loadingBestiary: true,

		},
		actions: {
			////////////////////////////////////////////////////////////////////////////////////////// FORMS

			getInput: (event) => {
				const name = event.target.name;
				const value = event.target.value;
				setStore({...getStore,
						  inputs: {...getStore().inputs, [name]: value}})
			},

			resetInput: () => {
				setStore({...getStore,inputs: {}})
			},

			seePassword: () => {
				let passwordInput = document.getElementById("password")
				let confirmPasswordInput = document.getElementById("confirmPassword")
				if (passwordInput.type === "password"){passwordInput.type = "text", confirmPasswordInput.type = "text"}
				else {passwordInput.type = "password", confirmPasswordInput.type = "password"}
			},

			////////////////////////////////////////////////////////////////////////////////////////// CONDITIONAL RENDERING

			randomNPC: () => {
				let npc = Math.floor(Math.random() * 8)
				localStorage.setItem('randomNPC', npc)
			},

			alertPin: () => {
				if (getStore().user.energy >= 85
				|| getStore().user.encounter > 0
				|| getStore().user.role === undefined) return "fa-solid fa-circle fa-beat txt-red"
				else return null
			},
			
			tierColor: (view, tier, done) => {
				let tierColor="";

				if (view === "rewards" || view === "quests" && done === true) {
					switch(tier){
						case 1:
							tierColor = "bg-yellow"
							break;
						case 2:
							tierColor = "bg-green"
							break;
						case 3:
							tierColor = "bg-purple"
							break;
						default:
							tierColor = null
							break;
					}
				} else tierColor = null
		
				return tierColor
			},

			tierIcon: (view, tier) => {
				let tierIcon="";
				
				if (view === "quests") {
					switch(tier){
						case 1:
							tierIcon = "fa-regular fa-circle"
							break;
						case 2:
							tierIcon = "fa-solid fa-circle-half-stroke"
							break;
						case 3:
							tierIcon = "fa-solid fa-circle"
							break;
						default:
							tierIcon = "fa-solid fa-question"
							break;
					}
				} else if (view === "rewards") {
					switch(tier){
						case 1:
							tierIcon = "fa-regular fa-star"
							
							break;
						case 2:
							tierIcon = "fa-solid fa-star-half-stroke"
							break;
						case 3:
							tierIcon = "fa-solid fa-star"
							break;
						default:
							tierIcon = "fa-solid fa-question"
							break;
					}}

				return tierIcon
			},
			
			getActionIcon: (view, done) => {
				let actionIcon=""

				if (view === "rewards") actionIcon = "fa-solid fa-crosshairs" 
				else if(view === "quests") {
					switch(done){
						case true:
							actionIcon = "fa-solid fa-check"
							break;
						default:
							actionIcon = "fa-solid fa-crosshairs"
							break;
					}
				} else actionIcon = "fa-solid fa-question"
				return actionIcon
			},

			getDashboardModalAction: (view, modalId) => {
				if (view === "quests" && typeof modalId === "number") getActions().updateQuest(modalId)
				if (view === "quests" && typeof modalId === "string") getActions().createQuest()
				if (view === "rewards" && typeof modalId === "number") getActions().updateReward(modalId)
				if (view === "rewards" && typeof modalId === "string") getActions().createReward()					
			},

			getRoleImage: (role) => {
				let roleImg = ""
				if ( role === 1) roleImg = IMAGES.barbarian
				if (role === 2) roleImg = IMAGES.wizard
				if (role === 3) roleImg = IMAGES.rogue
				return roleImg
			},

			getRoleDescription : (role) => {
				let description = ""
				if ( role === 1) description = TEXT.barbarian
				if (role === 2) description = TEXT.wizard
				if (role === 3) description = TEXT.rogue
				return description
			},

			getAbilityImage: (ability_rarity) => {
				let role = getStore().user.role
				let abilityImg = ""

				if ( role === "Barbarian"){
					if (ability_rarity === 1) abilityImg = IMAGES.barbarian1
					if (ability_rarity === 2) abilityImg = IMAGES.barbarian2
					if (ability_rarity === 3) abilityImg = IMAGES.barbarian3
				}
				if (role === "Wizard"){
					if (ability_rarity === 1) abilityImg = IMAGES.wizard1
					if (ability_rarity === 2) abilityImg = IMAGES.wizard2
					if (ability_rarity === 3) abilityImg = IMAGES.wizard3
				}
				if (role === "Rogue"){
					if (ability_rarity === 1) abilityImg = IMAGES.rogue1
					if (ability_rarity === 2) abilityImg = IMAGES.rogue2
					if (ability_rarity === 3) abilityImg = IMAGES.rogue3
				}
				return abilityImg
			},

			getBackgroundColor: (color) => {
				switch(color){
					case "none":
						document.querySelector("body").setAttribute("class", "")
						break;
					case "yellow":
						document.querySelector("body").setAttribute("class", "bg-yellow")
						break;
					case "red":
						document.querySelector("body").setAttribute("class", "bg-red")
						break;
					case "purple":
						document.querySelector("body").setAttribute("class", "bg-purple")
						break;
					case "green":
						document.querySelector("body").setAttribute("class", "bg-green")
						break;
					default:
						document.querySelector("body").setAttribute("class", "")
						break;
				}
			},

			encounterText: () => {
				const creature = getStore().creatureInfo

				if (creature.type == "aberration") return TEXT.aberration
				if (creature.type == "beast") return TEXT.beast
				if (creature.type == "celestial") return TEXT.celestial
				if (creature.type == "construct") return TEXT.construct
				if (creature.type == "dragon") return TEXT.dragon
				if (creature.type == "elemental") return TEXT.elemental
				if (creature.type == "fey") return TEXT.fey
				if (creature.type == "fiend") return TEXT.fiend
				if (creature.type == "giant") return TEXT.giant
				if (creature.type == "humanoid") return TEXT.humanoid
				if (creature.type == "monstrosity") return TEXT.monstrosity
				if (creature.type == "ooze") return TEXT.ooze
				if (creature.type == "plant") return TEXT.plant
				if (creature.type == "undead") return TEXT.undead
			},

			dice: () => {
				setStore({...getStore, dice: [0, IMAGES.dice1, IMAGES.dice2, IMAGES.dice3, IMAGES.dice4, IMAGES.dice5, IMAGES.dice6, IMAGES.dice7, IMAGES.dice8]})
			},

			////////////////////////////////////////////////////////////////////////////////////////// DB DATA 

			getRoles: async () => {
				fetch(process.env.BACKEND_URL + "api/roles", {
					method: 'GET',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					if(response.ok) return response.json()
					throw Error(response.status)
				}).then((rolesData) => {
					setStore({...getStore, roles: rolesData})
				}).catch((err) => {
					console.log('Couldnt get classes from API', err)
				})
			},
			
			getDifficulties: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/difficulty")
					const data = await resp.json()
					setStore({...getStore, difficulties: data})
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading difficulty table", error)
				}
			},
			
			getRarities: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/rarity")
					const data = await resp.json()
					setStore({...getStore, rarities: data})
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading rarity table", error)
				}
			},

			setNPCs: () => {
				setStore({...getStore, npc: [
					{ image: IMAGES.thug, title: TEXT.thugTitle, response: TEXT.thugResponse },
					{ image: IMAGES.bard, title: TEXT.bardTitle, response: TEXT.bardResponse },
					{ image: IMAGES.gandalf, title: TEXT.gandalfTitle, response: TEXT.gandalfResponse },
					{ image: IMAGES.knight, title: TEXT.knightTitle, response: TEXT.knightResponse },
					{ image: IMAGES.mage, title: TEXT.mageTitle, response: TEXT.mageResponse },
					{ image: IMAGES.queen, title: TEXT.queenTitle, response: TEXT.queenResponse },
					{ image: IMAGES.sea_merchant, title: TEXT.seaMerchantTitle, response: TEXT.seaMerchantResponse },
					{ image: IMAGES.villager, title: TEXT.villagerTitle, response: TEXT.villagerResponse },
					{ image: IMAGES.war_goddess, title: TEXT.warGoddessTitle, response: TEXT.warGoddessResponse },
				]})
			},

			////////////////////////////////////////////////////////////////////////////////////////// AUTHENTICATION

			demo: async () => {
				fetch(process.env.BACKEND_URL + "api/demo", {
					method: 'GET',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					getActions().resetInput();
					if(response.ok) return response.json();
					throw Error(response.status)
				}).then((loginData) => {
					localStorage.setItem('jwt-token', loginData.token)
					localStorage.setItem('user', loginData.user_id)
					localStorage.setItem('userLevel', loginData.level)
					getActions().getUserDataAndAbilities()
					getActions().getQuestList()
					getActions().getRewardList()
				}).catch((err) => {
					console.error('Something Wrong when calling API', err)
				})
			},
			
			singUp: async () => {
				const input = getStore().inputs				
				
				const newUser ={
					"name": input.name,
					"email": input.email,
					"password": input.password
				}

				fetch(process.env.BACKEND_URL + "api/users", {
					method: "POST",
					body: JSON.stringify(newUser),
				   	headers: {"Content-Type": "application/json"}
				   }).then((response) => {
					if(response.ok) return response.json()
					}).then(() => {
						getActions().Login()	
					}).catch(error => {
					   console.log(error);
				   });
			},

			login: async () => {
				const input = getStore().inputs

				fetch(process.env.BACKEND_URL + "api/login", {
					method: 'POST',
					body: JSON.stringify({
						'email': input.email,
						'password': input.password
					}),
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					getActions().resetInput();
					if(response.ok) return response.json();
					throw Error(response.status)
				}).then((loginData) => {
					localStorage.setItem('jwt-token', loginData.token)
					localStorage.setItem('user', loginData.user_id)
					localStorage.setItem('userLevel', loginData.level)
					getActions().getUserDataAndAbilities()
					getActions().getQuestList()
					getActions().getRewardList()
				}).catch((err) => {
					console.error('Something Wrong when calling API', err)
				})
			},

			logout: () => {
				localStorage.removeItem('jwt-token')
				localStorage.removeItem('user')
				getActions().resetInput()
				setStore({...getStore, user:[], quests:[], rewards:[], bestiary:[], abilities:[]})
			},

			////////////////////////////////////////////////////////////////////////////////////////// USER 
			
			getUserDataAndAbilities: async () => {
				const user = localStorage.getItem('user')

				fetch(process.env.BACKEND_URL + "api/user/" + user, {
					method: 'GET',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					if(response.ok) return response.json()
						console.log(response.json);
					throw Error(response.status)
				}).then((userData) => {
					setStore({...getStore, user: userData[0], abilities: userData[1]})
				}).catch((err) => {
					console.log("Couldnt get user from API", err)
				});
			},

			userRole: async (role) => {
				setStore({...getStore, inputs: {"role" : role}})
				getActions().updateUser()
			},

			getPassive: () => {
				const userRole = getStore().user.user_role				
				const roles = getStore().roles
				let passive = 0

				for (let role of roles) {(role.id === userRole) ? passive = role.passive : null }
				return passive
			},

			deleteUser: async () => {
				const user = localStorage.getItem('user')
				const deletingUser = {
					"email": "",
					"password": ""
				}

				fetch(process.env.BACKEND_URL + "api/delete/" + user, {
					method: "PUT",
					body: JSON.stringify(deletingUser),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
						if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().logout()
				   }).catch(error => {
					   console.log(error);
				   });
			},

			updateUser: async () => {
				const user = localStorage.getItem('user')
				const input = getStore().inputs

				const updatedUser = {
					"name": input.name,
					"email": input.email,
					"user_role": input.role,
					"level": input.level,
					"experience": input.experience,
					"energy": input.energy,
					"encounter": input.encounter,
					"bestiary": input.bestiary
				}
				
				fetch(process.env.BACKEND_URL + "api/user/" + user, {
					method: "PUT",
					body: JSON.stringify(updatedUser),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getUserDataAndAbilities()
					getActions().resetInput()
				   }).catch(error => {
					   console.log(error);
				   });
			},

			changePassword: async () => {
				const user = localStorage.getItem('user')
				const input = getStore().inputs

				const passwords = {
					"currentPassword": input.currentPassword,
					"newPassword": input.newPassword
				}

				fetch(process.env.BACKEND_URL + "api/password/" + user, {
					method: "PUT",
					body: JSON.stringify(passwords),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					console.log(response);
					   if(response.ok) return response.json()
						throw Error(response.status)
					}).then(() => {
						getActions().getUserDataAndAbilities()
						getActions().resetInput()
					}).catch(error => {
						alert("Could not change password.")
						getActions().resetInput()
						console.log(error);
				   });
			},

			forgotPassword: async () => {
				const input = getStore().inputs
				const recoveryMail = {
					"email": input.email
				}			
				
				fetch(process.env.BACKEND_URL + "api/passwordreset", {
					method: "PUT",
					body: JSON.stringify(recoveryMail),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().resetInput()
				   }).catch(error => {
					   console.log(error);
				   });
			},


			resetUserEncounter: async () => {
				const user = localStorage.getItem('user')
				const updatedUser = {
					"encounter": false
				}

				fetch(process.env.BACKEND_URL + "api/user/" + user, {
					method: "PUT",
					body: JSON.stringify(updatedUser),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getUserDataAndAbilities()
					getActions().resetInput()
				   }).catch(error => {
					   console.log(error);
				   });
			},		

			
			getScoreboard: async () => {
				fetch(process.env.BACKEND_URL + "api/users", {
					method: "GET",
				   	headers: {"Content-Type": "application/json"}
				}).then(response => {
	  				if(response.ok) return response.json()
					throw Error(response.status)
				}).then((data) => setStore({...getStore, scoreboard: data})
				).catch(error => {
				   console.log(error);
				});
			},


			////////////////////////////////////////////////////////////////////////////////////////// QUESTS 

			getQuestList: async () => {
				const user = localStorage.getItem('user')

				fetch(process.env.BACKEND_URL + "api/quests/" + user, {
					method: 'GET',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					if(response.ok) return response.json()
					throw Error(response.status)
				}).then((questList) => {
					setStore({...getStore, quests: questList})
					questList.length === 0
					? setStore({loadingQuests: TEXT.zeroQuests})
					: setStore({loadingQuests: false})
				}).catch((err) => {
					console.log('Couldnt get classes from API', err)
				})
			},

			createQuest: async () => {
				const user = localStorage.getItem('user')
				const input = getStore().inputs

				const quest ={
					"label": input.label,
					"user_id": user,
					"quest_difficulty_id": input.tier
				}

				fetch(process.env.BACKEND_URL + "api/quests", {
					method: "POST",
					body: JSON.stringify(quest),
				   	headers: {"Content-Type": "application/json"}
				   }).then((response) => {
					if(response.ok) return response.json()
				   }).then(() => {
					   getActions().getQuestList()
					   getActions().resetInput()
				   }).catch(error => {
					   console.log(error);
				   });
			},

			updateQuest: async (questId) => {
				const input = getStore().inputs
				const updatedQuest ={
					"label": input.label,
					"quest_difficulty_id": input.tier,
					"done": input.done,
					"onboard": input.onboard
				}
				
				fetch(process.env.BACKEND_URL + "api/quests/" + questId, {
					method: "PUT",
					body: JSON.stringify(updatedQuest),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getQuestList()
					getActions().resetInput() 
				   }).catch(error => {
					   console.log(error);
				   });
			},

			doQuest: async (tier, questId) => {
				const userRole = getStore().user.role
				let userLevel = getStore().user.level
				let userEncounter = getStore().user.encounter
				const passiveWizard = getActions().getPassive()

				const gainedExperience = getActions().experienceCalculator(tier)
				const gainedEnergy = getActions().energyCalculator(tier)

				if (gainedExperience < 100) {
					setStore({...getStore, inputs: {"experience" : gainedExperience}})
				} else {
					setStore({...getStore, inputs: {"experience" : gainedExperience -100, "level" : ++userLevel}})

					if (userRole === 'Wizard') setStore({...getStore, inputs: {"encounter" : userEncounter + passiveWizard, ...getStore().inputs}})
					else setStore({...getStore, inputs: {"encounter" : ++userEncounter, ...getStore().inputs}})
				}
				
				if (gainedEnergy < 100) setStore({...getStore, inputs: {"energy" : gainedEnergy, ...getStore().inputs}})
				else setStore({...getStore, inputs: {"energy" : 100, ...getStore().inputs}})

				getActions().updateUser()				
				setStore({...getStore, inputs: {"done": true}})
				getActions().updateQuest(questId)
				getActions().randomNPC()
			},

			experienceCalculator: (tier) => {
				const currentExperience = getStore().user.experience
				const questExperience = getStore().difficulties[tier].experience_given
				const totalExperience = currentExperience + questExperience

				const userRole = getStore().user.role
				const passive = getActions().getPassive()
				const passiveRogue = Math.round(questExperience * passive / 100)				

				if (userRole === "Rogue") return totalExperience + passiveRogue
				return totalExperience
			},

			energyCalculator: (tier) => {
				const currentEnergy = getStore().user.energy
				const questEnergy = getStore().difficulties[tier].energy_given
				const totalEnergy = currentEnergy + questEnergy

				const userRole = getStore().user.role
				const passive = getActions().getPassive()
				const passiveRogue = Math.round(questEnergy * passive / 100)

				if (userRole === "Rogue") return totalEnergy + passiveRogue
				return totalEnergy
			},

			cleanDashboard: async () => {
				let offBoard = getStore().quests.filter(item => item.done === true)
				for (let quest of offBoard){
					setStore({...getStore, inputs: {"onboard": false}})
					getActions().updateQuest(quest.id)
				}
			},

			////////////////////////////////////////////////////////////////////////////////////////// REWARDS

			getRewardList: async () => {
				const user = localStorage.getItem('user')		

				fetch(process.env.BACKEND_URL + "api/rewards/" + user, {
					method: 'GET',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					if(response.ok) return response.json()
					throw Error(response.status)
				}).then((rewardList) => {
					setStore({rewards: rewardList })
					rewardList.length === 0
					? setStore({loadingRewards: TEXT.zeroRewards})
					: setStore({loadingRewards: false})
				}).catch((err) => {
					console.log('Couldnt get rewards from API', err)
				})
			},

			createReward: async () => {
				const user = localStorage.getItem('user')
				const input = getStore().inputs
				const reward = {
					"label": input.label,
					"user_id": user,
					"rarity_id": input.tier
				}

				fetch(process.env.BACKEND_URL + "api/rewards", {
					method: "POST",
					body: JSON.stringify(reward),
				   	headers: {"Content-Type": "application/json"}
				   }).then((response) => {
					if(response.ok) return response.json()
				   }).then(() => {
					   getActions().getRewardList()
					   getActions().resetInput()
				   }).catch(error => {
					   console.log(error);
				   });
			},

			updateReward: async (rewardId) => {
				const input = getStore().inputs
				const updatedReward ={
					"label": input.label,
					"rarity_id": input.tier
				}
				
				fetch(process.env.BACKEND_URL + "api/rewards/" + rewardId, {
					method: "PUT",
					body: JSON.stringify(updatedReward),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getRewardList()
					getActions().resetInput() 
				   }).catch(error => {
					   console.log(error);
				   });
			},

			checkEnoughEnergy: (tier) => {
				const currentEnergy = getStore().user.energy
				const rewardEnergy = getStore().rarities[tier].energy_required

				if (currentEnergy - rewardEnergy >= 0) return true
				else return false
			},

			getReward: async (tier, rewardId) => {
				const currentEnergy = getStore().user.energy
				const rewardEnergy = getStore().rarities[tier].energy_required

				setStore({...getStore, inputs: {
						...getStore().inputs, "energy" : currentEnergy - rewardEnergy}})

				getActions().updateUser()
				getActions().deleteReward(rewardId)
			},

			deleteReward: async (rewardId) => {				
				const updatedReward = {"done": true}
				
				fetch(process.env.BACKEND_URL + "api/rewards/" + rewardId, {
					method: "PUT",
					body: JSON.stringify(updatedReward),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getRewardList()
					getActions().resetInput() 
				   }).catch(error => {
					   console.log(error);
				   });
			},

			////////////////////////////////////////////////////////////////////////////////////////// BESTIARY			

			getBestiary: async () => {
				const user = localStorage.getItem('user')

				try{
					const resp = await fetch(process.env.BACKEND_URL + "api/bestiary/" + user)
					const data = await resp.json()
					setStore({ bestiary: data})
					data.length === 0
					? setStore({loadingCreatures: TEXT.zeroCreatures})
					: setStore({loadingCreatures: false})
					return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getCreature: (api) => {
				const myHeaders = new Headers();
				myHeaders.append("Accept", "application/json");
				const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow"
				}

				fetch("https://www.dnd5eapi.co" + api, requestOptions)
				.then((response) => response.json())
				.then((info) =>{setStore({creatureInfo: info},)})
				.catch((error) => console.error(error));
			},

			addToBestiary: () => {				
				const creature = getStore().creatureInfo.name
				const type = getStore().creatureInfo.type
				const api = getStore().creatureInfo.url
				const user = localStorage.getItem("user")

				const bestiaryEntry = {
					name : creature,
					type : type,
					api : api,
					user_id: user
				}
				
				fetch(process.env.BACKEND_URL + "api/bestiary", {
					method: "POST",
					body: JSON.stringify(bestiaryEntry),
				   	headers: {"Content-Type": "application/json"}
				   }).then(resp => resp.json())
				   .catch(error => {
					   console.log(error)
				   });
			},
			
			getCreatureImage: (creature) => {
				if (creature.image){return `https://www.dnd5eapi.co${creature.image}`}
				if (creature.type == "aberration") return IMAGES.aberration
				if (creature.type == "beast") return IMAGES.beast
				if (creature.type == "celestial") return IMAGES.celestial
				if (creature.type == "construct") return IMAGES.construct
				if (creature.type == "dragon") return IMAGES.dragon
				if (creature.type == "elemental") return IMAGES.elemental
				if (creature.type == "fey") return IMAGES.fey
				if (creature.type == "fiend") return IMAGES.fiend
				if (creature.type == "giant") return IMAGES.giant
				if (creature.type == "humanoid") return IMAGES.humanoid
				if (creature.type == "monstrosity") return IMAGES.monstrosity
				if (creature.type == "ooze") return IMAGES.ooze
				if (creature.type == "plant") return IMAGES.plant
				if (creature.type == "undead") return IMAGES.undead
				else return IMAGES.creature
			},

			////////////////////////////////////////////////////////////////////////////////////////// BATTLE

			getEcounter: async () => {
				const userLevel = localStorage.getItem("userLevel")
				//challenge rating goes like this 0, 0.125, 0.250, 0.500 and then from 1 to 24 - 18 is empty
				const challengeRatings = [0,0.125,0.250,0.500,1,2,3,4,5,6,7,8,9,10,[11,12,13,14],[15,16,17,19,20,21,22,23,24]]
				
				let count = 1
				for (let i = 25; i <= userLevel; i += 20){++count}			
				const battleRatings = challengeRatings.slice(0, count)

				const myHeaders = new Headers();
				myHeaders.append("Accept", "application/json")
				const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow"
				};

				fetch(`https://www.dnd5eapi.co/api/monsters?challenge_rating=${battleRatings}`, requestOptions)
				.then(response => response.json())
				.then(result => setStore({encounterPool: result.results}))
				.then(getActions().encounterCreature())
				.catch((error) => console.error(error))
			},
      
			encounterCreature: () => {
				const encounterPool = getStore().encounterPool?.map((item)=>{return item.url})
				const bestiary = getStore().bestiary?.map((item)=>{return item.api})
				const creaturePool = encounterPool.filter(val => !bestiary.includes(val))
				const opponentCreature = creaturePool[Math.floor(Math.random() * creaturePool.length)]
				localStorage.setItem("opponentCreature", opponentCreature)
			},

			encounterBattle: () => {
				const opponentCreature = localStorage.getItem("opponentCreature")
				getActions().getCreature(opponentCreature)

				const store=getStore()
				const passiveBarbarian = getActions().getPassive()

				const barbarianRoll = Math.ceil(Math.random() * passiveBarbarian)
				const creatureRoll = Math.ceil(Math.random() * 4)
				const randomRoll = Math.ceil(Math.random() * 6)
				let userRoll = 1				

				setStore({creatureRoll: creatureRoll})
				if(store.user.role === "Barbarian"){setStore({userRoll: barbarianRoll})}
				else{setStore({userRoll: randomRoll})}
			},

			battleResult: () => {
				const store = getStore()
				if(store.userRoll > store.creatureRoll) {
					getActions().addToBestiary()
					let userBestiary = getStore().user.bestiary
					setStore({...getStore, inputs:{"bestiary" : ++userBestiary}})
					getActions().updateUser()
				}

				let userEncounter = getStore().user.encounter
				setStore({...getStore, inputs:{"encounter" : --userEncounter}})
				getActions().updateUser()
			},

			battleResponse: () => {
				const store = getStore()
				if(store.userRoll > store.creatureRoll) return {title: TEXT.victoryTitle, response: TEXT.victory}
				else return {title: TEXT.defeatTitle, response: TEXT.defeat}
			},
		}
	};
};

export default getState;