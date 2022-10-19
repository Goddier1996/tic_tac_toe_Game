import "../css/game.css"
import { useState, useEffect } from "react";
import Square from "./SquareVsuser";
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap'



function GameVsPlayer() {

    // take from local storage a date how much win pc and user
    let WinnerUserXvsUser = localStorage.getItem("WinnerUserXvsUser")
    let WinnerUserOvsUser = localStorage.getItem("WinnerUserOvsUser")
    let noOneWinGame = localStorage.getItem("noOneWinGame")



    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

    // defult in the start game was X , Because in first useEffect we To change O to X
    const [player, setPlayer] = useState("O");
    const [result, setResult] = useState({ winner: "none", state: "none" });

    const history = useHistory()


    // line for win
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];



    // set to the bord o or x , check if in this id was null
    const chooseSquare = (square) => {

        setBoard(

            board.map((val, idx) => {

                if (idx == square && val == "") {
                    return player;
                }

                return val;
            })
        );
    };



    // here we check how win this game
    const checkHowWin = () => {

        lines.forEach((currPattern) => {

            const firstPlayer = board[currPattern[0]];

            if (firstPlayer == "") {

                return;
            }

            let foundWinningPattern = true;

            currPattern.forEach((idx) => {

                if (board[idx] != firstPlayer) {

                    foundWinningPattern = false;
                }
            });


            if (foundWinningPattern) {

                setResult({ winner: player, state: "Won" });
            }
        });
    };



    // check if no one win game
    const checkIfTie = () => {

        let filled = true;

        board.forEach((square) => {

            if (square == "") {
                filled = false;
            }
        });

        if (filled) {
            setResult({ winner: "No One", state: "Tie" });
        }
    };



    // start a new game
    const restartGame = () => {

        setBoard(["", "", "", "", "", "", "", "", ""]);
        setPlayer("O");
    };




    // remove all history data this game user vs user,from local storge
    const ClearResultCount = () => {

        localStorage.removeItem("WinnerUserXvsUser")
        localStorage.removeItem("WinnerUserOvsUser")
        localStorage.removeItem("noOneWinGame")

        window.location.reload(false);
    }




    useEffect(() => {

        // avtive a functions
        checkHowWin();
        checkIfTie();


        // here if player was For example X ,Replace to O
        if (player == "X") {
            setPlayer("O");
        }

        else {
            setPlayer("X");
        }


    }, [board]);




    // here show popup how win,and save count how win to local storge
    useEffect(() => {


        if (result.winner == "X") {

            Swal.fire({
                icon: 'success',
                html: `<h4>Game Finished! Winning Player: (${result.winner})</h4>`,
                confirmButtonColor: 'green',
                confirmButtonText: `start new game`,

            }).then((result) => {

                if (result.isConfirmed) {
                    restartGame();
                    window.location.reload(false);
                }
            })

            // save to local a count user win
            localStorage.setItem("WinnerUserXvsUser", ++WinnerUserXvsUser);

        }


        if (result.winner == "O") {

            Swal.fire({
                icon: 'success',
                html: `<h4>Game Finished! Winning Player: (${result.winner})</h4>`,
                confirmButtonColor: 'green',
                confirmButtonText: `start new game`,

            }).then((result) => {

                if (result.isConfirmed) {
                    restartGame();
                    window.location.reload(false);
                }
            })

            // save to local a count user win
            localStorage.setItem("WinnerUserOvsUser", ++WinnerUserOvsUser);
        }


        if (result.winner == "No One") {

            Swal.fire({
                icon: 'warning',
                html: `<h4>No One win this game</h4>`,
                confirmButtonColor: 'green',
                confirmButtonText: `start new game`,

            }).then((result) => {

                if (result.isConfirmed) {
                    restartGame();
                    window.location.reload(false);
                }
            })

            // save to local a count user win
            localStorage.setItem("noOneWinGame", ++noOneWinGame);
        }


    }, [result]);




    return (

        <div className='styleGameVsPc'>

            {/* show count */}
            <div className='modelResult'>

                <div className='countResultVsPc'>

                    <p>X : {WinnerUserXvsUser}</p>
                    <p>O : {WinnerUserOvsUser}</p>
                    <p>Draw : {noOneWinGame}</p>

                </div>
            </div>


            <div className="boardVsUser">

                <div className="rowStyleBoard">

                    <Square
                        val={board[0]}
                        chooseSquare={() => {
                            chooseSquare(0);
                        }}
                    />

                    <Square
                        val={board[1]}
                        chooseSquare={() => {
                            chooseSquare(1);
                        }}
                    />

                    <Square
                        val={board[2]}
                        chooseSquare={() => {
                            chooseSquare(2);
                        }}
                    />
                </div>

                <div className="rowStyleBoard">

                    <Square
                        val={board[3]}
                        chooseSquare={() => {
                            chooseSquare(3);
                        }}
                    />

                    <Square
                        val={board[4]}
                        chooseSquare={() => {
                            chooseSquare(4);
                        }}
                    />

                    <Square
                        val={board[5]}
                        chooseSquare={() => {
                            chooseSquare(5);
                        }}
                    />
                </div>


                <div className="rowStyleBoard">
                    <Square
                        val={board[6]}
                        chooseSquare={() => {
                            chooseSquare(6);
                        }}
                    />
                    <Square
                        val={board[7]}
                        chooseSquare={() => {
                            chooseSquare(7);
                        }}
                    />
                    <Square
                        val={board[8]}
                        chooseSquare={() => {
                            chooseSquare(8);
                        }}
                    />
                </div>

            </div>


            <div className='ClearHistoryCount'>
                <Button onClick={ClearResultCount} variant="primary" style={{ color: "white", fontSize: "14px" }}>clear history count result</Button>

                <Button href='/' variant="danger" style={{ color: "white", fontSize: "14px" }}>Exit Home Page</Button>
            </div>

        </div>
    );
}


export default GameVsPlayer;