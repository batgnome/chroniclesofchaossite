
function Square(props) {
    let turn =  props.turn
    let value = ""
    function changeTurn(turn){
        if(turn =='X') {
            value = 'X'
        }
    }
    return (

        <button style={{width: 100,height: 100, background: '#693030ff'}} onClick={changeTurn}>
            <div>{props}</div>
        </button>
    )
}


function TicTacToe(){
    let turn = 'X'

    return (
        <div>
            <div>
                <Square {...turn}/>
                <Square />
                <Square />
            </div>
            <div>
                <Square />
                <Square />
                <Square />
            </div>
            <div>
                <Square />
                <Square />
                <Square />
            </div>
        </div>
    );
}
export default TicTacToe;
