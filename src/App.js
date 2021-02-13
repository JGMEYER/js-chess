/* Chess pieces */
/* ♔♕♖♗♘♙ */
/* ♚♛♜♝♞♟ */
import React from 'react';

import ChessBoard from './Components/ChessBoard/ChessBoard'
import Pawn from './Components/Pawn/Pawn';

class App extends React.Component {
    render() {
        return (
            <div className="App" >
                <ChessBoard />
                <Pawn row={6} col={0} color="white" />
                <Pawn row={6} col={1} color="white" />
                <Pawn row={6} col={2} color="white" />
                <Pawn row={6} col={3} color="white" />
                <Pawn row={6} col={4} color="white" />
                <Pawn row={6} col={5} color="white" />
                <Pawn row={6} col={6} color="white" />
                <Pawn row={6} col={7} color="white" />
                <Pawn row={1} col={0} color="black" />
                <Pawn row={1} col={1} color="black" />
                <Pawn row={1} col={2} color="black" />
                <Pawn row={1} col={3} color="black" />
                <Pawn row={1} col={4} color="black" />
                <Pawn row={1} col={5} color="black" />
                <Pawn row={1} col={6} color="black" />
                <Pawn row={1} col={7} color="black" />
            </div>
        );
    }
}

export default App;
