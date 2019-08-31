const WIDTH = 400,
			HEIGHT = 400,
			MUTATION_RATE = 0.01,
			POPULATION_SIZE = 200,
			TARGET_RADIUS = 40,
			LIFE_SPAN = 80;
let rocket,
		population,
		dnaCount = 0,
		generationCount = 0,
		TARGET, MAX_FITNESS = 0;

function setup() {
	createCanvas(WIDTH, HEIGHT)
	population = new Population(POPULATION_SIZE)
	TARGET = createVector(WIDTH/2, 50)
}

function draw() {
	background(0)
	// Target
	fill(255, 0 , 0)
	noStroke()
	ellipse(TARGET.x, TARGET.y, TARGET_RADIUS, TARGET_RADIUS)
	// Population of Rockets
	population.run()
	// Text display
	textSize(15);
	fill(255);
	text(`Generation: ${generationCount}`, 5, 15);
	text(`Max fitness: ${MAX_FITNESS.toFixed(4)}`, 5, 35);
	// Dna count increments every frame
	dnaCount++
	// Initialization
	if (dnaCount >= LIFE_SPAN) {
		population.evaluate()
		population.selection()
		generationCount++
		dnaCount = 0
	}
}
 
