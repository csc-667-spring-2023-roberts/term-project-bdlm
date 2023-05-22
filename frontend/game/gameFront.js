import io from 'socket.io-client';
import { getGameId } from "../util/game-id";
import { GAMES } from "../../constants/events";

const socket = io();

const betButton = document.getElementById('bet-btn')
if(betButton){
    betButton.addEventListener('keydown',(event)=>{
        if(event.key === 'Enter'){
            const bet = event.target.val
            action.innerHTML=''
            fetch(`/games/${gameID}/move`,{
                method:"post",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({bet})
            })
        }
    })
}