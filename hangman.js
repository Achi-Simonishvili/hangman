const fruits = [
  "apple",
  "banana",
  "orange",
  "grape",
  "strawberry",
  "watermelon",
  "pineapple",
  "kiwi",
  "mango",
  "pear",
];

const animals = [
  "lion",
  "tiger",
  "elephant",
  "giraffe",
  "zebra",
  "monkey",
  "panda",
  "koala",
  "kangaroo",
  "cheetah",
];

const cities = [
  "New York",
  "Paris",
  "London",
  "Tokyo",
  "Rome",
  "Sydney",
  "Berlin",
  "Moscow",
  "Dubai",
  "Toronto",
];

const wordsArray = [...fruits, ...animals, ...cities];

// სიტყვას ვიღებთ array-დან Math.random-ის საშუალებით
function selectRandomWord() {
  return wordsArray[
    Math.floor(Math.random() * wordsArray.length)
  ].toLowerCase();
}

function hint(word) {
  if (fruits.includes(word)) {
    return "fruit";
  } else if (animals.includes(word)) {
    return "animal";
  } else {
    return "city";
  }
}

function startGame() {
  const wordToGuess = selectRandomWord();
  let remainingAttempts = 10;
  let guessedLetters = [];

  // სანამ გვაქვს ცდა დარჩენილი
  while (remainingAttempts > 0) {
    let displayWord = "";
    for (let letter of wordToGuess) {
      // ვამოწმებთ თუ არის მომხმარებლის მიერ არჩეული ასო გამოსაცნობ სიტყვაში
      displayWord += guessedLetters.includes(letter) ? letter : "_";
      // if (guessedLetters.includes(letter)) {
      //   // თუ არის ვწერთ ასოს
      //   displayWord += letter;
      // } else {
      //   // თუ არა ქვედა ტირეს
      //   displayWord += "_";
      // }
    }

    if (remainingAttempts <= 5) {
      console.log(
        `Hint: The word to guess is ${
          hint(wordToGuess) === "animal" ? "an" : "a"
        } ${hint(wordToGuess)}.`
      );
    } else {
      console.log(
        "Word to guess:",
        displayWord,
        `(Length: ${wordToGuess.length}) (${remainingAttempts} attempts left)`
      );
    }

    // მომხმარებელს ვეუბნებით რომ აირჩიოს ასო და ვაჩვენებთ დარჩენილი ცდების რაოდენობასა და დაშიფრულ სიტყვას
    let guess = prompt(
      `Guess a letter (Length: ${wordToGuess.length}) (${remainingAttempts} attempts left):\n${displayWord}`
    );
    // თუ მომხმარებელი აჭერს cancel-ს გამოვდივართ თამაშიდან
    if (guess === null) {
      alert("The game has been canceled. Please reload to start over");
      return;
    }

    guess = guess.trim().toLowerCase();
    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
      alert("Please enter a single letter.");
      continue;
    }

    if (guessedLetters.includes(guess)) {
      alert("You already guessed that letter.");
      continue;
    }

    guessedLetters.push(guess);

    if (!wordToGuess.includes(guess)) {
      remainingAttempts--;
      alert("Incorrect guess! Try again.");
    } else {
      alert("Correct guess!");
    }

    if (
      wordToGuess.split("").every((letter) => guessedLetters.includes(letter))
    ) {
      console.log("Congratulations! You guessed the word:", wordToGuess);
      break;
    }
  }

  if (remainingAttempts === 0) {
    console.log("Sorry, you ran out of attempts. The word was:", wordToGuess);
  }
}

startGame();
