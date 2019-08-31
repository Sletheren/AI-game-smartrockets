class DNA {
	constructor(dna) {
		if (dna) {
			this.genes = [...dna]
		} else {
			this.genes = [...Array(LIFE_SPAN)].map(() => p5.Vector.random2D())
		}
	}
	crossOver(partnerDNA) {
		const childDna = []
		const midPoint = floor(random(this.genes.length))
		for(var i=0; i<this.genes.length; i++) {
			childDna[i] = i > midPoint ? this.genes[i] : partnerDNA.genes[i]
		}
		return new DNA(childDna)
	}

	mutation() {
		for(var i=0; i<this.genes.length; i++) {
			if(random(1) < MUTATION_RATE) {
				 this.genes[i] = p5.Vector.random2D()
			}
		}
	}
}
