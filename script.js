
const gameBoard = (function(){
    //tiles have the owner player if any and its location in the array
    function createTile(xin,yin){
        let playerOwn=NaN


        setOwner=(playerName)=>{
            playerOwn=playerName}
        getLocation= () =>{
            return [xin,yin]
        };
        getOwner = () =>{return playerOwn}
        return {getLocation,setOwner,getOwner}
    };
    //below fuctions makes the array
    let board=[];
    (function(){
        for (let i= 0; i < 3; i++) {
            board.push([]);
            for(let c=0; c<3; c++){
                board[i].push(createTile(i,c))
            }  
        }
    })();


    const modifyTile= (player, x, y) => {board[x][y].setPlayer(player);};

    const calculateWin= () => {
        board.forEach( (row,x)=> {
                row.forEach((_,y) => {
                    console.log(board[x][y])
                    
                });
        });
        
    };
    return {modifyTile,calculateWin,createTile,board}
})();

function CreatePlayer(name){
    wins=0;
    ties=0;
    losses=0;
    const increaseWins= () =>{wins++}
    const getWins= () => {wins}
    const increaseTies= () =>{ties++}
    const getTies= () => {ties}
    const increseLosses= () =>{losses++}
    const getLosses= () => {losses}
    const getTotalGames = () =>{losses+wins+wins}
    return {name,increaseWins,getWins,increaseTies,getTies,increseLosses,getLosses,getTotalGames}
}
gameBoard.calculateWin();