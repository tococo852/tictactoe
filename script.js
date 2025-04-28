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
    const increseLosses= () =>{losses++}
    const getLosses= () => {return losses}
    const getTotalGames = () =>{return losses+wins+wins}
    return {increaseWins,getWins,increaseTies,getTies,increseLosses,getLosses,getTotalGames,getName,getSymbol}
}

const gameBoard = (function(){
    //tiles have the owner player if any and its location in the array
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
    (function(){
        for (let i= 0; i < 3; i++) {
            board.push([]);
            for(let c=0; c<3; c++){
                board[i].push(createTile(i,c))
            }  
        }
    })();


    const getTile= ( x, y) => {return board[x][y];};
    const setTile= (player,x,y) => {board[x][y].setOwner(player)}

    const displayGrid = () => {
        for (let index = 0; index < board.length; index++) {
            console.log(`|| ${board[index][0].getIcon()} || ${board[index][1].getIcon()} || ${board[index][2].getIcon()} ||`)

            
        }
    }
    const calculateWin= () => {
        board.forEach( (row,x)=> {
                row.forEach((_,y) => {
                    console.log(board[x][y])
                    
                });
        });
        
    };
    return {board,getTile,setTile,calculateWin,displayGrid}
})();

player1=createPlayer("Player1", "O")
player2=createPlayer("player2", "X")
gameBoard.setTile(player1,0,0)
gameBoard.setTile(player2,1,1)
gameBoard.setTile(player1,2,2)
console.log(player1.getSymbol())

console.log(gameBoard.board[0][0].getOwner())
gameBoard.displayGrid();
