const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

// console.log(canvas)

canvas.width = innerWidth
canvas.height = innerHeight

class Boundary {
    static width = 40
    static height = 40
    constructor({ position }) {
        this.position = position
        this.width = 40
        this.height = 40
    }

    draw() {
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Player {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }

    draw() {
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = 'yellow'
        context.fill()
        context.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}



const boundaries = []
const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const map = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', ' ', '-', ' ', '-'],
    ['-', ' ', '-', ' ', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-', '-']
]

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        }
                    })
                )
                break;

            default:
                break;
        }
    })
})

function collidesReactangle({ circle, rectangle }) {
    return (
        circle.position.y - circle.radius <= rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius >= rectangle.position.x &&
        circle.position.y + circle.radius >= rectangle.position.y &&
        circle.position.x - circle.radius <= rectangle.position.x + rectangle.width
    )
}

function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    boundaries.forEach(boundary => {
        boundary.draw()
    })

    player.update()

}

animate()

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (collidesReactangle({
                    circle: {
                        ...player, velocity: {
                            x: 0,
                            y: -5
                        }
                    },
                    rectangle: boundary
                })
                ) {
                    player.velocity.y = 0
                    break
                } else {
                    player.velocity.y = -5
                }
            }

            console.log('W')
            break
        case 's':
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (collidesReactangle({
                    circle: {
                        ...player, velocity: {
                            x: 0,
                            y: 5
                        }
                    },
                    rectangle: boundary
                })
                ) {
                    player.velocity.y = 0
                    break
                } else {
                    player.velocity.y = 5
                }
            }
            console.log('S')
            break
        case 'a':
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (collidesReactangle({
                    circle: {
                        ...player, velocity: {
                            x: -5,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
                ) {
                    player.velocity.x = 0
                    break
                } else {
                    player.velocity.x = -5
                }
            }
            console.log('A')
            break
        case 'd':
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (collidesReactangle({
                    circle: {
                        ...player, velocity: {
                            x: 5,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
                ) {
                    player.velocity.x = 0
                    break
                } else {
                    player.velocity.x = 5
                }
            }
            console.log('D')
            break
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            player.velocity.y = 0
            console.log('W')
            break
        case 's':
            player.velocity.y = 0
            console.log('S')
            break
        case 'a':
            player.velocity.x = 0
            console.log('A')
            break
        case 'd':
            player.velocity.x = 0
            console.log('D')
            break
    }
})