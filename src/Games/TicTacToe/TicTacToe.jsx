import { useState } from "react"

function Square(props) {
    let turn =  props.turn
    let value = ""
    function changeTurn(turn){
        if(turn =='X') {
            value = 'X'
        }
    }
    console.log(props)
    return (

        <button style={{width: 100,height: 100, background: '#693030ff'}} onClick={changeTurn}>
            <div>{turn}</div>
        </button>
    )
}


function TicTacToe(props){
    const [turn, setTurn] = useState('X');
    const[board, setBoard] =useState( [
        ['X','X','X'],
        [' ',' ',' '],
        [' ',' ',' ']
    ]);
    function handleOnChange(row,col){
         if(turn == 'X'){
            setTurn('O')
         }else{
            setTurn('X')
         }
         return(turn)
    }
    return (
        <div>
           {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                    <Square turn={board[rowIndex][colIndex]} onchange={handleOnChange}/>
                ))}
            </div>
           ))}
        </div>
    );
}
export default TicTacToe;
