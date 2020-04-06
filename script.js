function get_random_food() {
    let valid = false
    let x,y
    while(!valid){
        x = Math.round(Math.random() * (W - cs) / cs)
        y = Math.round(Math.random() * (H - cs) / cs)
        let fault=false
        for(let i=0;i<snake.cells.length;i++){
            if(snake.cells[i].x==x && snake.cells[i].y==y){
                console.log("Invalid Food")
                fault=true
                break
            }
        }
        if(!fault){
            valid=true
        }
    }

    var food = {
        x: x,
        y: y,
        color: 'red'
    }
    return food
}

function init() {
    canvas = document.getElementById("mycanvas")
    W = H = canvas.width = canvas.height = 1000
    pen = canvas.getContext("2d")
    cs = 66
    game_over = false
    score = 0;
    food_img = new Image();
    food_img.src = "Assets/apple.png";
    trophy = new Image();
    trophy.src = "Assets/trophy.png";

    snake = {
        init_length: 5,
        color: 'blue',
        cells: [],
        direction: 'right',
        create_snake: function () {
            for (let i = this.init_length; i > 0; i--) {
                this.cells.push({x: i, y: 0})
            }
        },
        draw_snake: function () {
            for (let i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 3, cs - 3)
            }
        },
        update_snake: function () {
            let headX = this.cells[0].x
            let headY = this.cells[0].y
            if (headX == food.x && headY == food.y) {
                console.log("Food eaten")
                score++
                food = get_random_food()
            } else {
                this.cells.pop()

            }
            let nextX, nextY
            if (this.direction == 'right') {
                nextX = headX + 1
                nextY = headY
            } else if (this.direction == 'left') {
                nextX = headX - 1
                nextY = headY
            } else if (this.direction == 'up') {
                nextY = headY - 1
                nextX = headX
            } else {
                nextX = headX
                nextY = headY + 1
            }
            this.cells.unshift({x: nextX, y: nextY})
            let lastX = Math.round(W / cs)
            let lastY = Math.round(H / cs)
            if (this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY) {
                game_over = true
            }
            for(let i=1;i<this.cells.length;i++){
                if(this.cells[i].x==nextX && this.cells[i].y==nextY){
                    game_over=true
                    break
                }
            }
        }
    }
    food = get_random_food()
    snake.create_snake()

    function key_pressed(e) {
        //Conditional Statments
        if (e.key == "ArrowRight" && snake.direction != "left") {
            snake.direction = "right";
        } else if (e.key == "ArrowLeft" && snake.direction != "right") {
            snake.direction = "left";
        } else if (e.key == "ArrowDown" && snake.direction != "up") {
            snake.direction = "down";
        } else if (e.key == "ArrowUp" && snake.direction != "down") {
            snake.direction = "up";
        } else {
            console.log("Invalid")
        }
        console.log(snake.direction);
    }

    document.addEventListener("keydown", key_pressed)
}

function draw() {
    pen.clearRect(0, 0, W, H)
    snake.draw_snake()
    pen.fillStyle = food.color
    pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs)
    pen.drawImage(trophy, 18, 20, cs, cs)
    pen.fillStyle = "blue"
    pen.font = "80px"
    pen.fillText(score, 50, 50)
}

function update() {
    snake.update_snake()
}

function gameloop() {
    if (game_over) {
        clearInterval(f)
        alert("Game Over. Score: " +score.toString())
        return
    }
    draw()
    update()
}
function game(){
    init()
    f = setInterval(gameloop, 200)
}
game()