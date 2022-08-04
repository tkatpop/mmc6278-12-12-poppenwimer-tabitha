const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }
 ///////////////////////////////////////////
  // implement the guessLetter function:
  guessLetter(letter) {
    console.log(letter)
    console.log(this.word)
    console.log(this.word.indexOf(letter))
    //Check if letter is in the word
    if (this.word.indexOf(letter) > -1){ //Letter is in word, value > -1
      
      //updated word
      var updated_word = []

      //Check each letter to see if it matches the keyed letter
      for (let i = 0; i < this.word.length; i++) {
        
        //If letter in word matches letter
        if (this.word[i] == letter){ //Current letter matches guessed letter

          //Add guessed letter
          updated_word.push(letter)
        } else { //Current letter is NOT guessed letter

          //Add this.displayword letter
          updated_word.push(this.displayWord[i])
        }
        
      }
      
      //update displayWord
      this.displayWord = updated_word.join("")
      console.log(this.displayWord)

      //Add to correct letter []
      this.correctLetters.push(letter)
      console.log(this.correctLetters)


    }else { //Letter is NOT in word
      console.log("NOT in word")
    }
    // if (letter = true ) {
    //   this.displayWord
    //   this.correctLetters
    // } else {
    //   this.incorrectLetters
    //   (this.remainingGuesses - 1)
    // }
  }

  // implement the updateScreen function:
  updateScreen() {

    //retrieved Elements by Ids
    const remainingGuessesEl = document.getElementById("remaining-guesses")
    const incorrectLettersEl = document.getElementById("incorrect-letters")
    const displayWordEl = document.getElementById("word-to-guess")

    //Assigned values to innerHTML
    remainingGuessesEl.innerHTML = this.remainingGuesses
    incorrectLettersEl.innerHTML = this.incorrectLetters
    displayWordEl.innerHTML = this.displayWord
  }

  // // implement the isGameOver function:
  // isGameOver() {
  //   if (this.remainingGuesses.value <= 0 | word == this.displayWord) {
  //     true
  //   } else {
  //     false
  //   }
  // }

  // // implement the getWinOrLoss function:
  // getWinOrLoss() {
  //   if (word == this.displayWord & this.remainingGuesses.value > 0){
  //     "win"
  //   } else (this.displayWord != word & this.remainingGuesses <= 0) {
  //     "loss"
  //   } return null 
  // }
  ///////////////////////////////////////////////////

}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  console.log("duck")
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()