

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
