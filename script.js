function createPlayer(name,symbol,symbolSVG){
    let wins=0;
    let ties=0;
    let losses=0;
    const getName= () => {return name}
    const getSymbol= () => {return symbol}
    const getSymbolSVG= () => {return symbolSVG}
    const increaseWins= () =>{wins++}
    const getWins= () => {return wins}
    const increaseTies= () =>{ties++}
    const getTies= () => {return ties}
    const increaseLosses= () =>{losses++}
    const getLosses= () => {return losses}
    const getTotalGames = () =>{return losses+wins+wins}
    return {increaseWins,getWins,increaseTies,getTies,increaseLosses,getLosses,getTotalGames,getName,getSymbol,getSymbolSVG}
}

const gameBoard = (function(){
    //tiles have the owner player if any and its location in the array

    function createTile(xin,yin){
        let playerOwn=NaN
        let playerIcon="?"


        setOwner=(player)=>{
            playerOwn=player
            playerIcon=player.getSymbol()
        }
        getLocation= () =>{
            return [xin,yin]
        };
        getOwner = () =>{ return playerOwn}
        getIcon= () =>{ return playerIcon}
        return {getLocation,setOwner,getOwner, getIcon}
    };
    //below fuctions makes the array board and fills it
    let board=[];
    let winningLine=[]

    const generateBoard= () =>{
        board=[]
        winningLine=[]
        for (let i= 0; i < 3; i++) {
            board.push([]);
            for(let c=0; c<3; c++){
                board[i].push(createTile(i.toString(),c.toString()))
            }  
        }
    };
    const getBoard= ()=> {return board}
    const getTile= ( x, y) => {return board[x][y];};
    const setTile= (player,x,y) => {board[x][y].setOwner(player)}
    const displayGrid = () => {
        for (let index = 0; index < board.length; index++) {
            console.log(`|| ${board[index][0].getIcon()} || ${board[index][1].getIcon()} || ${board[index][2].getIcon()} ||`)

            
        }
    }
    const checkWin= () => {
        //check horizontal lines
        for (let i = 0; i < 3; i++) {
            if(getTile(i,0).getOwner()==getTile(i,1).getOwner() && getTile(i,1).getOwner()==getTile(i,2).getOwner()){
                winningLine=[getTile(i,0), getTile(i,1), getTile(i,2)]
                return true
            }      
        }
        // check vertical lines
        for (let i = 0; i < 3; i++) {
            if(getTile(0,i).getOwner()==getTile(1,i).getOwner() && getTile(1,i).getOwner()==getTile(2,i).getOwner()){
                winningLine=[getTile(0,i), getTile(1,i), getTile(2,i)]
                return true
            }      
        }
        //check diagonals
        if (getTile(0,0).getOwner()==getTile(1,1).getOwner() && getTile(1,1).getOwner()==getTile(2,2).getOwner()){ 
            winningLine=[getTile(0,0),getTile(1,1),getTile(2,2)]
            return true}
        if (getTile(0,2).getOwner()==getTile(1,1).getOwner() && getTile(1,1).getOwner()==getTile(2,0).getOwner()){ 
            winningLine=[getTile(0,2),getTile(1,1),getTile(2,0)]
            return true}
        return false
        
    };
    const getWinningLine= () =>{return winningLine}

    const renderBoard=()=> {
        
        board.forEach((val)=>{val.forEach((tile)=>{
            tileCard=document.getElementById(tile.getLocation()[0]+tile.getLocation()[1])
            //console.log(tile.getIcon())
            if(tile.getIcon()!='?'){
                tileCard.innerHTML=tile.getOwner().getSymbolSVG()
            }
            else{
                tileCard.innerHTML=''
            }
        })})
    }
    return {renderBoard,getBoard,getTile,setTile,checkWin,displayGrid, generateBoard,getWinningLine}


})();

//next, make game object, should carry all game logic and interaction beetwen player and board
const game = (function (){
    gameBoard.generateBoard()
    let cross = `<svg fill="#4141db" width="6rem" height="8rem" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd"/></svg>`
    let circle=`<svg width="8rem" height="8rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#db4141" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    let player1=createPlayer("player1", "O",circle)
    let player2=createPlayer("player2", "X",cross)
    let currentTurn=0;
    let currentPlayer=player1
    let gameState= true
    let tie= false
    let gameReady=true


    const nextTurn = () =>{
        currentTurn++;
        if (currentPlayer==player1) {
            currentPlayer=player2
        }
        else{
            currentPlayer=player1
        }
    }
    
    const playTurn=(x,y)=>{
        gameBoard.setTile(currentPlayer, x, y)
        if (currentTurn>3){
            if(gameBoard.checkWin()){
                gameState=false
            }
            if(currentTurn>=8 && !gameBoard.checkWin()){
                gameState=false
                tie=true
            }
        }
        gameBoard.renderBoard()
        nextTurn();
    }
    const newGame = () =>{
        gameState = true
        tie = false
        gameReady=false
        currentTurn=0
        currentPlayer=player1
        gameBoard.generateBoard()
        gameBoard.renderBoard()
    }
    const gameResult=(annBox)=>{
        if(tie){
            annBox.textContent=(`game is a tie, no winners`)
            player1.increaseTies();
            player2.increaseTies();
        }
        else{
            annBox.textContent=(`there is a winner! ${gameBoard.getWinningLine()[0].getOwner().getName()}`)
            if(gameBoard.getWinningLine()[0].getOwner().getName()=='player1'){
                player1.increaseWins()
                player2.increaseLosses()
            }
            else{
                player2.increaseWins()
                player1.increaseLosses()
            }
        }
    }

    const renderScores=()=>{
        let p1Score=document.querySelector('.p1Score')
        let p2Score=document.querySelector('.p2Score')
        p1Score.textContent=player1.getWins()
        //console.log('p1 wins', player1.getWins())
        p2Score.textContent=player2.getWins()

    }
    const renderTurn=(annBox)=>{
        if(!gameState){
            gameResult(annBox)
        }
        else{
            annBox.textContent=`Is ${currentPlayer.getName()} Turn`
        }
    }

    window.onload = init;
    function init(){
        gameContainer=document.querySelector('.gameArea')
        let box=document.querySelector('.announcementBox')

        gameContainer.addEventListener('click',(e)=>{
            let currId =e.target.id
            if(!gameState){
               // renderTurn(box)
                newGame()
                renderScores()
                }
            if(currId!='' && gameState && gameReady){
                //renderTurn(box)
                coordinates=currId.split('')
                game.playTurn(coordinates[0],coordinates[1])

            }
            renderTurn(box)
            gameReady=true
            
        })

    }

    return {newGame,playTurn}
})();


  
