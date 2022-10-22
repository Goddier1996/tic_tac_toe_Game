import React from 'react'
import '../components/css/game.css';
import { Button } from 'react-bootstrap'
import "../components/css/game.css"


// here was Home Page,user chiose Game vs pc or user vs user
function Home() {


    return (

        <div className='homePage' >

            <div className='logo'>
                <img src='https://i.postimg.cc/fLnv2sgX/my-image1.png'></img>
            </div>


            <div className='info'>
                <p>
                    * can play against User vs Computer.
                    <br />
                    * can play against User vs User.
                    <br />
                    <br />
                    Please chioose your Game vs Pc or vs User :
                </p>
            </div>



            <div className='chooiseOptions'>

                <div className='colorButtonVsPc'>
                    <Button href='/GameVsPC' variant="" style={{ color: "white" }}>User vs PC</Button>
                </div>

                <div className='colorButtonVsUser'>
                    <Button href='/GameVsPlayer' variant="" style={{ color: "white" }}>User vs User</Button>
                </div>

            </div>
        </div>
    )
}


export default Home;