class Rocket {
	constructor(dna) {
		this.width = 30
		this.height = 5
		this.fitness = 0
		this.complete = false
		this.crashed = false
		this.dna = dna || new DNA()
		this.pos = createVector(floor(WIDTH/2), HEIGHT)
		this.vel = createVector()
		this.acc  = createVector()
	}

	applyForce(force) {
		this.acc.add(force)
	}

	update() {
		// See if the rocket hits the target
		const targetDistance = dist(this.pos.x, this.pos.y, TARGET.x, TARGET.y)
		this.complete = targetDistance < 10
		// kill the rocket if its out of the screen
		if (this.pos.x > WIDTH || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > HEIGHT + 50) {
			this.crashed = true
		}
		// Only move the rockets who didnt hit the target.
		if(!this.complete && !this.crashed) {
			this.applyForce(this.dna.genes[dnaCount])
			this.vel.add(this.acc)
			this.pos.add(this.vel)
			this.acc.mult(0)
		}
	}

	show() {
		push()
		translate(this.pos.x, this.pos.y)
		rotate(this.vel.heading())
		rectMode(CENTER)
		fill(255, 100)
		noStroke()
		rect(0, 0, this.width, this.height)
		pop()
	}

	calculateFitness() {
		var d = dist(this.pos.x, this.pos.y, TARGET.x, TARGET .y)
		this.fitness = 1/d
		if (this.complete) {
			this.fitness *= 10
		}
		if (this.crashed) {
			this.fitness /= 10
		}
		return this.fitness
	}
}
