# conQuest
conQuest is a gamified To-Do List, role playishly inspired by D&D. Feel free to [check it out](https://www.conquest.website), we hope you enjoy it!

## Table of Contents
1. [Context](#Context)
2. [Overview](#Overview)
3. [Technologies](#Technologies)
4. [Authors](#Authors)
5. [Roadmap](#Roadmap)

## Context
Inspired by all things geek and prompted by a final project to our Full Stack Developer Course, we came across the idea to gamify a not so fun aspect of life such as we had seen happen with the [Walk to Mordor](https://www.cnet.com/culture/this-lord-of-the-rings-app-is-the-only-thing-getting-me-to-exercise/) app and others that followed.

"Gamification" is proving to be a great tool to help people be consistent and on top of daily life, which can be extra tricky for neurodivergent people, per example someone living with executive dysfunction or a PDA profile. With that said, we are under no circumstances claiming to have any type of research to back up this app or the choices we made through it's development in that regard, even if that is something we wish could be the case.

[Goblin Tools](https://goblin.tools/) has a great set of small yet more specialized tools for that matter and is highly regarded by the community so definitely check it out if you struggle with it.

## Overview
Amongst it's modern-retro videogame UI feel, conQuest can be summarized into these key features:

* #### Role Selection
Think of it as in Pokémon. As soon as you signup into a new account you have to choose one between these three roles (currently) - Barbarian, Wizard or Rogue. Each role comes with a unique advantage over the others in how you play conQuest. If you're curious, you can check each role ability here*

* #### Leveling Up
By doing a quest(task) the user receives two types of points, the first one being experience points which brings them closer to leveling up. The second type is energy points which will be explained further below. Each quest(task) has a tier of difficulty set by the user ranging from easy, medium or hard. This tier determines how many points the user receives.

* #### Battle Creatures
Each time the user levels up it triggers a battle with a creature. This creature is selected randomly from a pool where it's range is based on the user level and it's pulled from an external [D&D API](https://www.dnd5eapi.co/).

* #### Creature Collection
Battling a creature comes up to rolling a 6D. The user needs a higher roll in order to defeat the creature and collect it in their bestiary.

* #### Achieve Rewards
Parallel and given equal importance as the quest list (task list), there's a reward list. This list is also populated by the users themselves and just like quests, rewards have tiers as well - common, rare or legendary. To claim a reward the user needs to have enough energy points, again, determined by it's tier.

* #### Role play features
conQuest looks like a game but we wanted as much as possible to make it's experience feel like one. Here is a summary of the features that help that vision:
	
* role selection
* completing a quest brings forward a NPC
* each reward tier is unlocked using a role's attack
* user chooses the battle's location from a map
* each creature's type determines a battle scenario message
* battle with dice rolls
*  a top 10 scoreboard

## Technologies
We used React as our frontend framework with JavaScript while the backend was built using a ORM framework Flask SQLAlchemy with Python. As explained above, this project was developed in the context of the Full Stack Developer Course at [4Geeks Academy](https://4geeksacademy.com/us/index) which provided the template here used. You can check it out and it's documentation [here](https://4geeks.com/docs/start/templates-boilerplates-intro).

## Authors
Please reach out we'd love to hear your feedback! Here are our LinkedIn.
* [P Catarina](https://www.linkedin.com/in/p-catarina/)
* [Elio Aloise](https://www.linkedin.com/in/elio-aloise-427a042a7/)

## Roadmap
There won't be any more development of this project in the near future. However there is a lot of room for improvement and additional features. Aside from obvious one's such as more roles to choose from, some could be:

* The map would have regions locked according to user level. Ideally, creatures would be assigned to certain regions, having different probability to show up throughout the map.
* The bestiary with search and filters features.
* There could be guilds and who knows if you could delegate a quest to someone else. A mercenary of some sort or maybe a trade.
* A status page complemented with badges from achievements of consistency.