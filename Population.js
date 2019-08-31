class Population {
	constructor(size = 1) {
		this.popSize = size;
		this.rockets = [...Array(size)].map((i) => new Rocket());
		this.matingPool = []
	}

	run() {
		for(let i=0; i<this.rockets.length; i++) {
			this.rockets[i].update()
			this.rockets[i].show()
		}
	}

	evaluate() {
		for(let i=0; i<this.rockets.length; i++) {
			const rocketFit = this.rockets[i].calculateFitness()
			if(this.rockets[i].fitness > MAX_FITNESS) {
				MAX_FITNESS = rocketFit
			}
		}
		for(let i=0; i<this.rockets.length; i++) {
			this.rockets[i].fitness /= MAX_FITNESS
		}
		this.matingPool = []
		for(let i=0; i<this.rockets.length; i++) {
			var n = this.rockets[i].fitness * 100
			for(let j=0; j<n; j++) {
				this.matingPool.push(this.rockets[i])
			}
		}
	}

	selection() {
		const newRockets = []
		for(let i=0; i<this.rockets.length; i++) {
			const parent1DNA = random(this.matingPool).dna
			const parent2DNA = random(this.matingPool).dna
			const childDna = parent1DNA.crossOver(parent2DNA)
			childDna.mutation()
			newRockets[i] = new Rocket(childDna)
		}
		this.rockets = newRockets;
	}
}
