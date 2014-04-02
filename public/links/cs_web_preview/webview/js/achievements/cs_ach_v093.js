achData.achievements.push
(		
	new Achievement({
		name: "Self-Help Addict",
		desc: "Beat your own local high score in any mode _X times",
		level: 2,
		lvlCount: 5,
		lvlReqs: [3, 10, 50, 100, 300],
		lvlProgress: 2
			}),
	new Achievement({
		name: "Drunken Master",
		desc: "Make your way to difficulty _X in Psychout Mode",
		level: 3,
		lvlCount: 5,
		lvlReqs: [2, 3, 4, 6, 8],
		lvlProgress: 3
					}),
	new Achievement({
		name: "Dropping Quarters",
		desc: "Play in Arcade Mode _X times",
		level: 4,
		lvlCount: 5,
		lvlReqs: [10, 20, 30, 40,50],
		lvlProgress: 5
			}),
			
	new Achievement({
		name: "Fool Me Once...",
		desc: "Successfully hit Psychout blocks _X times in Psychout Mode",
		level: 4,
		lvlCount: 5,
		lvlReqs: [10, 100, 250, 500, 1000],
		lvlProgress: 5
			}),
			
	new Achievement({
		name: "High Achiever",
		desc: "Complete all levels for each achievement",
		level: 0,
		lvlCount: 5,
		lvlReqs: [0, 0, 0, 0, 0],
		lvlProgress: 0
			})
);

achData.achArt = [null, null, null, 'fool_me_once.png'];