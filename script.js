const gameBoard = (function(){
    const tile=(function(){
        let neighboars=[];
        let x,y;
        createTile= (xin,yin) =>{
            [x,y]=[xin,yin]

        };
        createCenter
        coordinates= () =>{
            return [x,y]
        };
        return {coordinates,createTile }
    })();

    board=[['11','12','13'],['21','22','23'],['31','32','33']]

    const modifyTile= (mark, x, y) => {board[x][y]=mark;};
    const calculateWin= () => {
        board.forEach( (row,x)=> {
                row.forEach((_,y) => {
                    console.log(board[x][y])
                    
                });
        });
        
    };
    return {modifyTile,calculateWin}
})();

gameBoard.calculateWin();