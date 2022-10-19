import { Button } from 'react-bootstrap'
import '../css/game.css';
import Square from "./Square";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';



function GameVsPC() {

    const history = useHistory()


    // take from local storage a date how much win pc and user
    let WinnerUserX = localStorage.getItem("WinnerUser")
    let WinnerPcO = localStorage.getItem("WinnerPc")
    let NoOneWin = localStorage.getItem("NoOneWin")


    // array where save all o and x
    const defaultSquares = () => (new Array(9)).fill(null);
    const [squares, setSquares] = useState(defaultSquares());


    const [winner, setWinner] = useState(null);


    // line for win
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];





    //user turn to play this game
    const PlayerTurn = (index) => {

        let newSquares = squares;

        // check if have a free place in the bord,if have free place add x
        for (let i = 0; i < squares.length; i++) {

            if (squares[index] != null) {

                return;
            }

            else {
                newSquares[index] = 'X';
                setSquares([...newSquares]);
            }
        }

    }




    // check if line good for to win this game
    const linesThatAre = (a, b, c) => {

        return lines.filter(squareIndexes => {
            const squareValues = squareIndexes.map(index => squares[index]);
            return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort());
        });
    };




    // check how win this game user or pc
    const checkHowWin = () => {


        let playerWon = linesThatAre('X', 'X', 'X').length > 0;
        let computerWon = linesThatAre('O', 'O', 'O').length > 0;


        // check if have any index empty
        let emptyIndexes = squares
            .map((square, index) => square === null ? index : null)
            .filter(val => val !== null);



        if (playerWon) {
            setWinner('X');
            return;
        }

        if (computerWon) {
            setWinner('O');
            return;
        }

        // if no one win this game
        if (!emptyIndexes.length) {
            setWinner('No One');
            return;
        }
    }




    // turn pc,pc play and put random place in the bord , check if this place free in bord,if free add
    const PcTurn = () => {


        const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1;


        let emptyIndexes = squares
            .map((square, index) => square === null ? index : null)
            .filter(val => val !== null);



        // add to array a position O
        const putComputerAt = (index) => {
            let newSquares = squares;
            newSquares[index] = 'O';
            setSquares([...newSquares]);
        };



        if (isComputerTurn) {


            // here in 3 if,we create not easy game in a tic toe
            let winingLines = linesThatAre('O', 'O', null);

            if (winingLines.length > 0) {

                const winIndex = winingLines[0].filter(index => squares[index] === null)[0];
                putComputerAt(winIndex);
                return;
            }


            let linesToBlock = linesThatAre('X', 'X', null);

            if (linesToBlock.length > 0) {

                const blockIndex = linesToBlock[0].filter(index => squares[index] === null)[0];
                putComputerAt(blockIndex);
                return;
            }


            let linesToContinue = linesThatAre('O', null, null);

            if (linesToContinue.length > 0) {

                putComputerAt(linesToContinue[0].filter(index => squares[index] === null)[0]);
                return;
            }


            // create random where put O in the bord array,send to a function a index
            let randomIndex = emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
            putComputerAt(randomIndex);
        }
    }




    // remove all history data this game vs pc,from local storge
    const ClearResultCount = () => {

        localStorage.removeItem("WinnerUser")
        localStorage.removeItem("WinnerPc")
        localStorage.removeItem("NoOneWin")

        window.location.reload(false);
    }




    useEffect(() => {

        // check how win,and show a popup how win,and save a count in local storage for show
        if (winner == 'X') {

            Swal.fire({
                icon: 'success',
                html: `<h4>The winner is the user (${winner})</h4>`,
                confirmButtonColor: 'green',
                confirmButtonText: `start new game`,

            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })

            // save to local a count user win
            localStorage.setItem("WinnerUser", ++WinnerUserX);

            return;
        }



        if (winner == 'O') {

            Swal.fire({
                icon: 'success',
                html: `<h4>The winner is the Computer (${winner})</h4>`,
                confirmButtonColor: 'green',
                confirmButtonText: `start new game`,

            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })

            // save to local a count PC win
            localStorage.setItem("WinnerPc", ++WinnerPcO);

            return;
        }



        if (winner == 'No One') {

            Swal.fire({
                icon: 'warning',
                html: `<h4>no one win</h4>`,
                confirmButtonColor: 'green',
                confirmButtonText: `start new game`,

            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })

            // save to local a count no one win
            localStorage.setItem("NoOneWin", ++NoOneWin);

            return;
        }


        // active function how win
        checkHowWin();


        // active function turn pc to play
        PcTurn();
    });



    return (

        <div className='styleGameVsPc'>


            {/* show count */}
            <div className='modelResult'>

                <div className='countResultVsPc'>

                    <p>X : {WinnerUserX}</p>
                    <p>O : {WinnerPcO}</p>
                    <p>Draw : {NoOneWin}</p>

                </div>
            </div>


            <div className="gamePC">

                <div className="boardVsPc">

                    {squares.map((square, index) =>
                        <Square
                            x={square === 'X' ? 1 : 0}
                            o={square === 'O' ? 1 : 0}

                            onClick={() => PlayerTurn(index)}
                        />
                    )}
                </div>
            </div>





            <div className='ClearHistoryCount'>

                <div className='colorButtonClear'>
                    <Button onClick={ClearResultCount} variant="primary" style={{ color: "white", fontSize: "14px" }}>clear history count result</Button>
                </div>

                <div className='colorButtoExit'>
                    <Button href='/' variant="danger" style={{ color: "white", fontSize: "14px" }}>Exit Home Page</Button>
                </div>

            </div>

        </div>
    );
}

export default GameVsPC;