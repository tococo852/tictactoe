function createPlayer(name,symbol){
    wins=0;
    ties=0;
    losses=0;
    const getName= () => {return name}
    const getSymbol= () => {return symbol}
    const increaseWins= () =>{wins++}
    const getWins= () => {return wins}
    const increaseTies= () =>{ties++}
    const getTies= () => {return ties}
    const increaseLosses= () =>{losses++}
    const getLosses= () => {return losses}
    const getTotalGames = () =>{return losses+wins+wins}
    return {increaseWins,getWins,increaseTies,getTies,increaseLosses,getLosses,getTotalGames,getName,getSymbol}
}

const gameBoard = (function(){
    //tiles have the owner player if any and its location in the array
    winningLine=[]
    function createTile(xin,yin){
        let playerOwn=NaN
        let playerIcon="?"


        setOwner=(player)=>{
            playerOwn=player.getName()
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
    const generateBoard= () =>{
        this.board=[]
        for (let i= 0; i < 3; i++) {
            board.push([]);
            for(let c=0; c<3; c++){
                board[i].push(createTile(i,c))
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
    return {getBoard,getTile,setTile,checkWin,displayGrid, generateBoard,getWinningLine}
})();

//next, make game object, should carry all game logic and interaction beetwen player and board
const game = (function (){
    gameBoard.generateBoard()
    let player1=createPlayer("player1", "O")
    let player2=createPlayer("player2", "X")
    let currentTurn=0;
    let currentPlayer=player1
    let gameState= true
    let tie= false
    const nextTurn = () =>{
        currentTurn++;
        if (currentPlayer==player1) {
            currentPlayer=player2
        }
        else{
            currentPlayer=player1
        }
    }
    
    const playTurn=()=>{
        console.log(`is turn ${currentTurn}, ${currentPlayer.getName()} time to pick a tile`)
        let x= parseInt( prompt("what is X"))
        let y= parseInt(prompt("what is Y"))
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
        gameBoard.displayGrid()
        nextTurn();
    }
    const newGame = () =>{
        gameState = true
        tie = false
        currentTurn=0
        currentPlayer=player1
    }
    const gameResult=()=>{
        if(tie){
            console.log(`game is a tie, no winners`)
            player1.increaseTies();
            player2.increaseTies();
        }
        else{
            console.log(`there is a winner! ${gameBoard.getWinningLine()[0].getOwner()}`)
            if(gameBoard.getWinningLine()[0].getOwner()=='player1'){
                player1.increaseWins()
                player2.increaseLosses()
            }
            else{
                player2.increaseWins()
                player1.increaseLosses()
            }
        }
    }
    const gameLoop=()=>{
        while (gameState){
            playTurn()
        }
        gameResult()

        
    }
    return {gameLoop, newGame}
})();

