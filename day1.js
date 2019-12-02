const { once } = require("events");
const { createReadStream } = require("fs");
const { createInterface } = require("readline");

/*
 * 1. Fuel required to launch a given module is based on its mass. Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.
 * 2. However, that fuel also requires fuel, and that fuel requires fuel, and so on. Any mass that would require negative fuel should instead be treated as if it requires zero fuel;
 * So, for each module mass, calculate its fuel and add it to the total. Then, treat the fuel amount you just calculated as the input mass and repeat the process, continuing until a fuel requirement is zero or negative.
 */
const reducer = (accumulator, currentValue) => accumulator + currentValue;

(async function processLineByLine() {
	try {
		var lineByLine = [];

		const rl = createInterface({
			input: createReadStream("./day1_input.txt"),
			crlfDelay: Infinity
		});

		rl.on("line", line => {
			// go line by line - for each module mass
			lineByLine.push(parseInt(line.trim(), 10));
		});

		await once(rl, "close");

		let fuelTotal = calculateFuelTotal(lineByLine);
		console.log(
			"--------------------------------\nDay 1: Part 1 \n --------------------------------"
		);
		console.log(`\tTotal fuel required for all modules: ${fuelTotal.moduleFuelGrandTotal}`);

		let fuelMegaTotal = calculate_additional_fuel(fuelTotal.moduleFuelTotalsArray).reduce(
			reducer
		);

		console.log(
			"\n--------------------------------\nDay 1: Part 2 \n --------------------------------"
		);
		console.log(`\tTotal additional fuel for each module's fuel: ${fuelMegaTotal}`);
		const answer2 = fuelTotal.moduleFuelGrandTotal + fuelMegaTotal;

		console.log(`\tGrand Total Fuel Amount: ${answer2}`);
	} catch (err) {
		console.error(err);
	}
})();

//  Calculate Module Fuel
const calculate_fuel = moduleMass => {
	if (moduleMass) {
		return Math.floor(moduleMass / 3) - 2;
	} else {
		return 0;
	}
};

//  Calculate Module Fuel Total
const calculateFuelTotal = parsedInput => {
	const totalsArray = parsedInput.map(item => calculate_fuel(item));
	return {
		moduleFuelGrandTotal: totalsArray.reduce(reducer),
		moduleFuelTotalsArray: totalsArray
	};
};

const recursiveCalculate = value => {
	if (calculate_fuel(value) < 0) return 0;
	if (calculate_fuel(value) === 0) return 0;
	return calculate_fuel(value) + recursiveCalculate(calculate_fuel(value));
};

//  Calculate Additional Fuel Total
const calculate_additional_fuel = moduleFuelArray => {
	var out = [];

	for (var item in moduleFuelArray) {
		// call the recursive function
		if (moduleFuelArray[item] < 0) out.push(0);
		if (moduleFuelArray[item] === 0) out.push(0);
		else {
			let temp = recursiveCalculate(moduleFuelArray[item]);
			out.push(temp);
		}
	}
	return out;
};
