import '../App.css';
import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import {Link} from 'react-router-dom';

// 백엔드 테스트 용 function
const getUserdata = () =>{
    // console.log("Clicked");
}

function home() {
    return(
    <FullPage controls>
        <Slide>
            <div className="App">
                <div className="mainIMG"></div>

                <div className="id" style={{ marginTop: 200, width: "100%" }} onClick={getUserdata()}>
                        Caverjs Test button
                        <button
                            onClick={getUserdata()}
                        > submit </button>
                </div>

                <div className="login">
                    <div className="id">개인키 QR코드?</div>
                </div>
            </div>
        </Slide>
        <Slide>
            <div>2page</div>
        </Slide>
        <Slide>
            <div>3page</div>
        </Slide>
        <Slide>
            <div>4page</div>
            <div className="ask">문의</div>
            <footer>
            <div class="foot_div">
                footer
            </div>
            </footer>
        </Slide>
      </FullPage>
    )
}

export default home;