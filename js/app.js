


    // Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.seriesX = [-150, 600]; 
    this.optionY = [60, 140, 220]; 
    this.speedSeries = [150, 600]; 
    this.sprite = 'images/enemy-bug.png';
    this.reset();
}

Enemy.prototype.reset = function(){
    var startingPosition = this.seriesX[0];

    this.x = startingPosition;
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var lastPosition = this.seriesX[1];
    this.x += this.speed * dt;
    if(this.x > lastPosition){
        this.reset();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.getRandomY = function(){
    return this.optionY[Math.floor(Math.random() * this.optionY.length)];
} 

Enemy.prototype.getRandomSpeed = function(){
    var minimumSpeed = this.speedSeries[0];
        maximumSpeed = this.speedSeries[1];
    return Math.floor(Math.random() * (maximumSpeed - minimumSpeed)) + minimumSpeed;
}


// this is my player class

var Player = function(){
    this.seriesX = [-2, 402];
    this.seriesY = [-20, 380];
    this.sprite = 'images/char-boy.png'; 
    this.reset();
}

Player.prototype.collisionCheck = function(){
    if (this.y === -20){ //this will check to see if the player has made it to the water, winning the round.
        this.reset(); // the successful participant returns to the beginning. 
    } else if (this.y >= 50 && this.y <= 250){
        var reflex = this;

        allEnemies.forEach(function(enemy){
            if(enemy.y === reflex.y){
                if(enemy.x >= player.x - 30 && enemy.x <= player.x + 30){
                    reflex.reset();
                }
            }
        });
    }
}
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(){
    this.collisionCheck();
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(key){
    if(key === 'left'){
        this.x -= (this.x - 101 < this.seriesX[0]) ? 0 : 101;
    } else if (key === 'right'){
        this.x += (this.x + 101 > this.seriesX[1]) ? 0 : 101;
    } else if (key === 'up'){
        this.y -= (this.y - 80 < this.seriesY[0] ? 0 : 80);
    } else if (key === 'down'){
        this.y += (this.y + 80 > this.seriesY[1]) ? 0 :80;
    }
}

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var uno = new Enemy();
var dos = new Enemy();
var tres = new Enemy();
var allEnemies = [uno, dos, tres];Player
var player = new Player();





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}); 
