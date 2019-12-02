const { puzzleInput } = require("./day2-input.js");

const readCode = puzzleInput => {
	var puzzle = puzzleInput;
	puzzle[1] = 12; // the 'noun'
	puzzle[2] = 2; // the 'verb'

	for (let idx = 0; idx < puzzle.length; idx += 4) {
		const firstElement = puzzle[idx + 1];
		const secondElement = puzzle[idx + 2];
		const targetElement = puzzle[idx + 3];

		switch (puzzle[idx]) {
			case 1: //add
				puzzle[targetElement] = puzzle[firstElement] + puzzle[secondElement];
				break;
			case 2: //multiply
				puzzle[targetElement] = puzzle[firstElement] * puzzle[secondElement];
				break;
			case 99:
				break;
			default:
				console.error("Code not recognized");
				break;
		}
	}

	console.log("puzzle position 0: ", puzzle[0]);
};

readCode(puzzleInput);
