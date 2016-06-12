fruits=[
{
  "title": "tangerine",
  "img": "tangerine.jpg"
},
{
  "title": "lemon",
  "img": "lemon.jpg"
},
{
  "title": "grapes",
  "img": "grapes.jpg"
},
{
  "title": "pear",
  "img": "pear.jpg"
},
{
  "title": "thistle",
  "img": "thistle.jpg"
},
{
  "title": "vanilla",
  "img": "lilium.jpg"
}];
function startGame(fruits)
{
  shuffle(fruits);
  selectedFruit = 0;
  totalScore = 0;
  resetTimer();
  gameOn = true;
  populateFruit()
  var currentLetter = 0;
  $('#progress_all').text(fruits.length);
  $('#image-holder img,.word,#progress,#score,#time,footer').show();
  $(document).on('keydown', function(e)
  {
    if (gameOn)
    {
      if (String.fromCharCode(e.which) == word[currentLetter].toUpperCase())
      {
        $('.word div:nth-child(' + (currentLetter + 1) + ') > span').fadeIn();
        currentLetter++;
        if (currentLetter == word.length)
        {
          successGuess();
        }
      }
      else
      {
        if ((timeLeft - 3) >= 0)
        {
          timeLeft = timeLeft - 3;
          $('#time span').text(timeLeft);
        }
        else
        {
          $('#time span').text('0');
          gameOver();
        }
        if ((totalScore - 5) >= 0)
        {
          totalScore = totalScore - 5;
          $('#score span').text(totalScore);
        }
        $('.word div:nth-child(' + (currentLetter + 1) + ')').css("background-color", "#c99797");
      };
    }
  });
  timer = setInterval(function()
  {
    if (timeLeft != 0)
    {
      timeLeft--;
      $('#time span').text(timeLeft);
    }
    else
    {
      gameOver();
    }
  }, 1000);
  $('#popup').click(function()
  {
    location.reload();
  });

  function gameOver()
  {
    $('#totalScore').html(totalScore);
    $('#popup').fadeIn();
    gameOn = false;
    clearInterval(timer);
  }

  function increaseScoreBy(points)
  {
    totalScore = totalScore + points;
    $('#score span').text(totalScore);
  }

  function resetTimer()
  {
    timeLeft = 10;
  }

  function successGuess()
  {
    if (selectedFruit < fruits.length - 1)
    {
      $('.word div:nth-child(' + (currentLetter + 1) + ')').css("background-color", "#e8e8e8");
      increaseScoreBy(timeLeft + 10);
      resetTimer();
      currentLetter = 0;
      selectedFruit++;
      $('#progress_now').text(selectedFruit + 1)
      populateFruit();
    }
    else
    {
      increaseScoreBy(timeLeft + 10);
      clearInterval(timer);
      $('#totalScore').html(totalScore);
      $('#popup').fadeIn();
      gameOn = false;
    }
  }

  function populateFruit()
  {
    $('#image-holder img').attr('src', 'images/' + fruits[selectedFruit].img);
    word = fruits[selectedFruit].title.split("");
    allFruits = fruits.length;
    $('.word').html("");
    for (i = 0; i < word.length; i++)
    {
      $('.word').append("<div><span>" + word[i] + "</span></div>")
    }
  }
};

function shuffle(array)
{
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex)
  {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
setTimeout(function () {
    startGame(fruits);
}, 500);
