
const gameBoard = (function(){
    function createTile(xin,yin){
        let playerOwn=""


        setOwner=(player)=>{
            playerOwn=player}
        getLocation= () =>{
            return [xin,yin]
        };
        getOwner = () =>{return playerOwn}
        return {getLocation,setOwner}
    };
    let board=[];
    (function(){
        for (let i= 0; i < 3; i++) {
            board.push([]);
            for(let c=0; c<3; c++){
                board[i].push(createTile(i,c))
            }  
        }
    })();


    const modifyTile= (mark, x, y) => {board[x][y]=mark;};
    const calculateWin= () => {
        board.forEach( (row,x)=> {
                row.forEach((_,y) => {
                    console.log(board[x][y])
                    
                });
        });
        
    };
    return {modifyTile,calculateWin,createTile,board}
})();

gameBoard.calculateWin();