let deckId = ''

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

// // Function to save deckId to local storage
// function saveDeckIdToLocalStorage(deckId) {
//     localStorage.setItem('warCardDeckId', deckId);
//   }
  
//   // Function to retrieve deckId from local storage
//   function retrieveDeckIdFromLocalStorage() {
//     return localStorage.getItem('warCardDeckId');
//   }
  
//   let deckId = retrieveDeckIdFromLocalStorage(); // Attempt to retrieve deckId from local storage
  
//   // If deckId is not available in local storage, fetch it from the API
//   if (!deckId) {
//     fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//         deckId = data.deck_id;
//         saveDeckIdToLocalStorage(deckId); // Save the deckId to local storage
//       })
//       .catch(err => {
//         console.log(`error ${err}`);
//       });
//   }

document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
  .then(res => res.json()) // parse response as JSON        
  .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)
        if(player1Val > player2Val){
            document.querySelector('h3').innerText = 'Player 1 Wins'
        }else if(player1Val < player2Val){
            document.querySelector('h3').innerText = 'Player 2 wins'
        }else{
            document.querySelector('h3').innerText = 'Time for War!'
            resolveWar();
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function convertToNum(val){
    if(val === 'ACE'){
        return 14
    }else if(val === 'KING'){
        return 13
    }else if(val === 'QUEEN'){
        return 12
    }else if(val === 'JACK'){
        return 11
    }else{
        return Number(val)
    }
}

// Function to handle the "war" situation
function resolveWar() {
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
  
        // Get the fourth cards of each player for the war
        let player1WarCardVal = convertToNum(data.cards[3].value);
        let player2WarCardVal = convertToNum(data.cards[7].value);
  
        if (player1WarCardVal > player2WarCardVal) {
          document.querySelector('h3').innerText = 'Player 1 Wins the War!';
        } else if (player1WarCardVal < player2WarCardVal) {
          document.querySelector('h3').innerText = 'Player 2 wins the War!';
        } else {
          // If there's another tie, continue resolving the war recursively
          document.querySelector('h3').innerText = 'Another War!';
          resolveWar();
        }
      })
      .catch(err => {
        console.log(`error ${err}`);
      });
  }