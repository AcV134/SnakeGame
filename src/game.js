let current = [
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 10) + 1
];

let current_row = '.r' + current[0];
let current_col = '.c' + current[1];

let apple_row = '.r' + (Math.floor(Math.random() * 10) + 1);
let apple_col = '.c' + (Math.floor(Math.random() * 10) + 1);

let next_value ={
    'ArrowUp': [0,-1],
    'ArrowDown': [0,1],
    'ArrowLeft': [-1,0],
    'ArrowRight': [1,0]
}

let values = [0,0];

// to control speed of snake
let control = 700;

// start flag for snake
let start = 1;

// for some reason to work the autotimer
let timer = null;

// snake length
let snake_length = 1;

// snake array
let snake = [];

// sound directory
let audio = {
    'game-over': './sound/game-over.mp3',
    'music': './sound/music-for-game.mp3',
    'apple': './sound/apple.mp3',
    'countdown': './sound/game-countdown.mp3'
}

let music = new Audio(audio['music']);
let countdown = new Audio(audio['countdown']);
let apple = new Audio(audio['apple']);
let over = new Audio(audio['game-over']);

// snake starting point
$(current_row + current_col).children('.contain').addClass('snake');
$(current_row + current_col).children('.contain').addClass('head');

// apple starting point
$(apple_row + apple_col).children('.contain').addClass('apple');

$(document).ready(()=>{

    // on pressing arrows
    $(document).on('keydown', (e)=>{
        
        // only work for arrow keys
        if (e.key in next_value){
            values = next_value[e.key];
            $('.instructions').remove();

            // snake starts moving
            if(start){
                autoNext();
                musicPlay();
                start = 0;
            }
        }
    })
})

// updating current head values to next
function nextCurrent(){

    // remove head for previous element
    $(current_row + current_col).children('.contain').removeClass('head');

    // updating current head value
    current[0] = current[0]+values[0];
    current[1] = current[1]+values[1];

    // if snake head go beyond box gameOver
    if (current[0]>10 || current[0]<1 || current[1]>10 || current[1]<1){
        gameOver();
    }
    nextTile();
}

// changing current head to next tile
function nextTile(){
    current_row = '.r' + current[0];
    current_col = '.c' + current[1];

    // if snake head hits itself
    if ($(current_row + current_col).children('.contain').hasClass('snake')){
        gameOver();
    }

    // add head to new tile
    $(current_row + current_col).children('.contain').addClass('snake');
    $(current_row + current_col).children('.contain').addClass('head');
}

// auto move snake
function autoNext(){
    timer = setInterval(()=>{
        addSnake();
        nextCurrent();
    }, control);
} 


// add to snake array
function addSnake(){

    // check if current head is in apple
    let ch_row = '.r' + (current[0]+values[0]);
    let ch_col = '.c' + (current[1]+values[1]);
    if($(ch_row + ch_col).children('.contain').hasClass('apple')){
        snake_length++;
        $(ch_row + ch_col).children('.contain').removeClass('apple');
        apple.play();
        appleSpawn();
    };

    if (snake_length > snake.length){
        snake.push([current[0], current[1]]);
    }
    else{
        removeCurrent(snake.shift());
        snake.push([current[0], current[1]]);
    }
}

// remove current snake
function removeCurrent(value){
    let r = '.r' + value[0];
    let c = '.c' + value[1];
    $(r+c).children('.contain').removeClass('snake');
}

// game over...self explanatory
function gameOver(){
    clearInterval(timer);
    over.play();
    music.pause();
    $('main').empty();
    $('main').removeClass('grid');
    $('main').append('<h1 class="title">Game Over</h1>');
    $('main').append('<h2>Score: ' + snake_length + '</h2>');
    $('main').append('<button onclick=buttonClick()>Play Again</button>');

}

// on clicking button
function buttonClick(){
    let audio = new Audio("../sound/game-start.mp3");
    audio.play();
    let heading = $('.title');
    heading.css('animation','none');
    heading.text('Game is starting...');
    setTimeout(()=>{
        window.location.href = 'game.html';
    },2010);
}

// spawn apples in random places
function appleSpawn(){
    apple_row = '.r' + (Math.floor(Math.random() * 10) + 1);
    apple_col = '.c' + (Math.floor(Math.random() * 10) + 1);

    if ($(apple_row + apple_col).children('.contain').hasClass('snake')){
        appleSpawn();
    }
    else{
        $(apple_row + apple_col).children('.contain').addClass('apple');
    }
}

function musicPlay(){
    music.loop = true;
    music.play();
}