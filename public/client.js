$(function() {
  var TILE = 20;
  var WIDTH = 40;
  var HEIGHT = 40;
  var TIMER_START = 100;
  
  var canvas = document.getElementById('canvas');
  TILE = parseInt(Math.min(TILE, (document.documentElement.clientHeight - 50) / HEIGHT));
  
  canvas.width = TILE * WIDTH;
  canvas.height = TILE * HEIGHT;
  var ctx = canvas.getContext("2d");

  var Point = function (x, y) {
    this.x = x;
    this.y = y;
  };
  
  var Wall = function (n1, n2, o, vert) {
    this.n1 = n1;
    this.n2 = n2;
    this.o = o;
    this.vert = vert;
  };
  
  Wall.prototype.draw = function (ctx) {
    for(var n = this.n1; n <= this.n2; n++) {
      var x = this.vert ? this.o : n;
      var y = this.vert ? n : this.o;
      
      ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
    }
  };
  
  Wall.prototype.contains = function (pt) {
    return this.vert ?
      pt.x == this.o && pt.y >= this.n1 && pt.y <= this.n2 :
      pt.y == this.o && pt.x >= this.n1 && pt.x <= this.n2;
  };
  
  var colors = [
    {
      appleColor: "#2D882D",
      bgColor: "#FFAAAA",
      snakeColor: '#D46A6A',
      timerColor: "#AA3939",
      wallColor: "#550000",
    },
    {
      appleColor: "#226666",
      bgColor: "#FFD1AA",
      snakeColor: '#D49A6A',
      timerColor: "#AA6C39",
      wallColor: "#552700",
    },
    {
      appleColor: "#2D4471",
      bgColor: "#FFE2AA",
      snakeColor: '#D4B06A',
      timerColor: "#AA8339",
      wallColor: "#553800",
    },
    {
      appleColor: "#4B2D73",
      bgColor: "#FFF7AA",
      snakeColor: '#D4CB6A',
      timerColor: "#AAA039",
      wallColor: "#554D00",
    },
    {
      appleColor: "#90305A",
      bgColor: "#C9EA9C",
      snakeColor: '#9AC361',
      timerColor: "#4C7513",
      wallColor: "#2D4E00",
    },
    {
      appleColor: "#D4A76A",
      bgColor: "#718EA4",
      snakeColor: '#29506D',
      timerColor: "#123652",
      wallColor: "#042037",
    },
    {
      appleColor: "#AA9239",
      bgColor: "#847EB1",
      snakeColor: '#3A3276',
      timerColor: "#201858",
      wallColor: "#0E083B",
    },
    {
      appleColor: "#91A437",
      bgColor: "#A66FA6",
      snakeColor: '#6F256F',
      timerColor: "#530E53",
      wallColor: "#370037",
    },
  ];
  
  var maps = [
    [],
    [new Wall(10, 30, 20, false)],
    [new Wall(10, 30, 20, false),
        new Wall(10, 30, 20, true)],
    [new Wall(10, 30, 10, true),
        new Wall(10, 30, 10, false), 
        new Wall(10, 30, 20, false),
        new Wall(10, 30, 30, false)],
    [new Wall(10, 30, 20, false),
        new Wall(10, 30, 10, true), 
        new Wall(10, 30, 20, true),
        new Wall(10, 30, 30, true)],
    [new Wall(10, 19, 10, false),
        new Wall(22, 30, 10, false), 
        new Wall(10, 30, 10, true),
        new Wall(10, 30, 30, true),
        new Wall(10, 30, 30, false)],
    [new Wall(10, 30, 10, true),
        new Wall(10, 30, 30, true), 
        new Wall(10, 25, 20, false),
        new Wall(15, 30, 10, false),
        new Wall(15, 30, 30, false)],
    [new Wall(0, 18, 19, false),
        new Wall(21, 39, 20, false),],
    [new Wall(10, 30, 5, true),
        new Wall(10, 30, 10, true),
        new Wall(10, 30, 15, true),
        new Wall(10, 30, 20, true),
        new Wall(10, 30, 25, true),
        new Wall(10, 30, 30, true),
        new Wall(10, 30, 35, true),],
    [new Wall(10, 30, 10, true),
        new Wall(10, 30, 30, true), 
        new Wall(10, 25, 10, false),
        new Wall(10, 25, 20, false),
        new Wall(10, 25, 30, false),
        new Wall(15, 30, 15, false),
        new Wall(15, 30, 25, false)],
    [new Wall(10, 30, 10, false),
        new Wall(10, 30, 30, false), 
        new Wall(10, 30, 20, true),
        new Wall(10, 18, 10, true),
        new Wall(10, 18, 30, true),
        new Wall(21, 30, 30, true),
        new Wall(21, 30, 10, true),
        ],
    [new Wall(10, 30, 10, false),
        new Wall(10, 30, 30, false), 
        new Wall(10, 19, 10, true),
        new Wall(10, 19, 30, true),
        new Wall(21, 30, 30, true),
        new Wall(21, 30, 10, true),
        new Wall(18, 22, 20, true),
        ],
    [new Wall(7, 13, 7, true),
        new Wall(7, 13, 13, false),
        new Wall(13, 19, 7, false),
        new Wall(7, 13, 19, true),
        new Wall(19, 25, 13, false),
        new Wall(25, 31, 7, false),
        new Wall(7, 19, 31, true),
        new Wall(25, 31, 19, false),
        new Wall(7, 13, 19, false),
        new Wall(19, 25, 13, true),
        new Wall(7, 13, 25, false),
        new Wall(25, 31, 7, true),
        new Wall(13, 25, 31, false),
        new Wall(19, 25, 19, true),
        new Wall(19, 31, 25, false),
        new Wall(25, 31, 31, true),
        ],
    [new Wall(0, 17, 19, false),
        new Wall(0, 8, 17, true),
        new Wall(11, 19, 17, true),
        new Wall(22, 39, 20, false),
        new Wall(20, 28, 22, true),
        new Wall(31, 39, 22, true),
        ],
    [new Wall(0, 16, 19, false),
        new Wall(22, 39, 19, false),
        new Wall(0, 16, 19, true),
        new Wall(22, 39, 19, true),
        ],
    [new Wall(0, 17, 17, false),
        new Wall(22, 39, 22, false),
        new Wall(0, 17, 22, true),
        new Wall(22, 39, 17, true),
        ],
    [new Wall(0, 9, 19, false),
        new Wall(11, 29, 19, false),
        new Wall(31, 39, 19, false),
        new Wall(0, 9, 19, true),
        new Wall(11, 29, 19, true),
        new Wall(31, 39, 19, true),
        ],
    [new Wall(5, 18, 5, false),
        new Wall(21, 34, 5, false),
        new Wall(5, 18, 34, false),
        new Wall(21, 34, 34, false),
        new Wall(5, 18, 5, true),
        new Wall(21, 34, 5, true),
        new Wall(5, 18, 34, true),
        new Wall(21, 34, 34, true),
        new Wall(10, 18, 10, false),
        new Wall(21, 29, 10, false),
        new Wall(10, 18, 29, false),
        new Wall(21, 29, 29, false),
        new Wall(10, 18, 10, true),
        new Wall(21, 29, 10, true),
        new Wall(10, 18, 29, true),
        new Wall(21, 29, 29, true),
        ],
    [new Wall(5, 10, 5, false),
        new Wall(5, 10, 10, true),
        new Wall(15, 25, 5, false),
        new Wall(5, 10, 25, true),
        new Wall(30, 35, 5, false),
        new Wall(30, 35, 10, false),
        new Wall(30, 35, 15, false),
        new Wall(5, 10, 30, true),
        new Wall(10, 20, 35, true),
        new Wall(15, 20, 10, false),
        new Wall(10, 15, 20, true),
        new Wall(10, 20, 5, true),
        new Wall(25, 35, 5, true),
        new Wall(10, 15, 15, false),
        new Wall(10, 15, 25, false),
        new Wall(15, 25, 10, true),
        new Wall(15, 30, 20, false),
        new Wall(15, 20, 25, true),
        new Wall(20, 30, 25, false),
        new Wall(20, 30, 30, false),
        new Wall(30, 35, 30, true),
        new Wall(30, 35, 35, false),
        new Wall(25, 30, 35, true),
        new Wall(30, 35, 10, true),
        new Wall(30, 35, 15, true),
        new Wall(15, 25, 35, false),
        ],
    [new Wall(5, 18, 5, false),
        new Wall(21, 34, 5, false),
        new Wall(5, 18, 34, false),
        new Wall(21, 34, 34, false),
        new Wall(5, 34, 5, true),
        new Wall(5, 34, 34, true),
        new Wall(10, 29, 10, false),
        new Wall(10, 29, 29, false),
        new Wall(10, 29, 10, true),
        new Wall(10, 18, 29, true),
        new Wall(21, 29, 29, true),
        ],
    [new Wall(13, 27, 10, false),
        new Wall(13, 27, 30, false),
        new Wall(13, 27, 10, true),
        new Wall(13, 27, 30, true),
        new Wall(10, 17, 20, false),
        new Wall(23, 30, 20, false),
        new Wall(10, 17, 20, true),
        new Wall(23, 30, 20, true),
        ],
    [new Wall(0, 8, 18, true),
        new Wall(11, 39, 18, true),
        new Wall(0, 28, 21, true),
        new Wall(31, 39, 21, true),
        ],
    [new Wall(5, 18, 6, false),
        new Wall(21, 35, 6, false),
        new Wall(5, 18, 11, false),
        new Wall(21, 35, 11, false),
        new Wall(5, 18, 16, false),
        new Wall(21, 35, 16, false),
        new Wall(5, 18, 23, false),
        new Wall(21, 35, 23, false),
        new Wall(5, 18, 28, false),
        new Wall(21, 35, 28, false),
        new Wall(5, 18, 33, false),
        new Wall(21, 35, 33, false),
        new Wall(16, 23, 18, true),
        new Wall(16, 23, 21, true),
        ],
    [new Wall(3, 36, 6, false),
        new Wall(9, 33, 3, true),
        new Wall(6, 33, 6, true),
        new Wall(9, 36, 9, false),
        new Wall(9, 33, 9, true),
        new Wall(12, 36, 12, false),
        new Wall(12, 33, 12, true),
        new Wall(15, 36, 15, false),
        new Wall(15, 33, 15, true),
        new Wall(18, 36, 18, false),
        new Wall(18, 33, 18, true),
        new Wall(21, 36, 21, false),
        new Wall(21, 33, 21, true),
        new Wall(24, 36, 24, false),
        new Wall(24, 33, 24, true),
        new Wall(27, 36, 27, false),
        new Wall(27, 33, 27, true),
        new Wall(30, 36, 30, false),
        new Wall(30, 33, 30, true),
        new Wall(33, 36, 33, false),
        ],
  ];

  // Returns a random integer between min (included) and max (excluded)
  // Using Math.round() will give you a non-uniform distribution!
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  var lives = 2;
  var level = 0;
  var numApples;
  var apples = [];
  var walls;
  var gate = new Wall(19, 21, 0, false);
  var diedThisLevel;
  var paused = false;
  var timer = 100;
  var popupTimer = 0;
  var popupMessages = [];
  
  // this var is called snake because it's easier than tetris
  var snake = {
    tail: [],
    length: 12,
    isDead: false
  };
  
  var keyBuffer = [];
  var dx;
  var dy;
  var score = 0;
  setInterval(onTimerTick, 100);
  
  function getColors() {
    return colors[level % colors.length];
  }
  
  function getMap() {
    return maps[level % maps.length];
  }
  
  function makeApple() {
    var apple;
    function appleInWall (wall) { return wall.contains(apple); }
    function appleAtPt (pt) { return pt.x == apple.x && pt.y == apple.y; }
    
    while (true) {
      apple = new Point(getRandomInt(1, WIDTH - 1), getRandomInt(1, HEIGHT - 1));
      if (!walls.some(appleInWall) && !snake.tail.some(appleAtPt) && !apples.some(appleAtPt))
        break;
    }
    
    apples.push(apple);
  }
  
  function startLevel() {
    walls = [
      gate,
      new Wall(0, 18, 0, false),
      new Wall(22, 39, 0, false),
      new Wall(0, 39, 39, false),
      new Wall(0, 39, 0, true),
      new Wall(0, 39, 39, true),
    ];
    
    Array.prototype.push.apply(walls, getMap());
    
    snake.tail = [ new Point(WIDTH / 2, HEIGHT - 2) ];
    snake.length = 12;
    dx = 0;
    dy = -1;
    
    timer = TIMER_START;
    numApples = 10;
    if (apples.length === 0)
      makeApple();
      
    showMessage('Level ' + (level + 1));
  }
  
  function onKeyDown(e) {
    if (paused) {
      paused = false;
    }
    else if (e.which === 27 || e.which === 32) {
      //  Escape or spacebar
      paused = true;
    }
    
    keyBuffer.push(e.which);
  }
  
  function handleKey(key) {
    switch(key) {
      case 37: // left
        if (dx === 1)
          return;
        dx = -1;
        dy = 0;
        break;
      case 38: // up
        if (dy === 1)
          return;
        dx = 0;
        dy = -1;
        break;
      case 39: // right
        if (dx === -1)
          return;
        dx = 1;
        dy = 0;
        break;
      case 40: // down
        if (dy === -1)
          return;
        dx = 0;
        dy = 1;
        break;
    }
  }
  
  //End the game and show the high scores display
  function crashSnake() {
    diedThisLevel = true;
    
    if (lives > 0) {
      lives--;
      startLevel();
    }
    else {
      snake.isDead = true;
      window.location = "highscore?score=" + score + "&level=" + (level + 1);
    }
  }
  
  function scr(n) {
    return TILE * n;
  }
  
  function drawWalls() {
    var bgColor = getColors().bgColor;
    ctx.fillStyle = bgColor;
    ctx.strokeStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    walls.forEach(function (wall) {
      ctx.fillStyle = getColors().wallColor;
      wall.draw(ctx);
    });
  }
  
  function setSideToNotDraw(obj, pos, other) {
    if (other.x != pos.x && other.y != other.y) {
      console.error("Invalid points for setSideToNotDraw");
    }
    
    if (other.x > pos.x) {
      obj.right = false;
    } else if (other.x < pos.x) {
      obj.left = false;
    } else if (other.y > pos.y) {
      obj.bottom = false;
    } else if (other.y < pos.y) {
      obj.top = false;
    }
  }
  
  function drawSides(index) {
    var obj = {
      left: true,
      right: true,
      top: true,
      bottom: true,
    };
    
    var current = snake.tail[index];
    if (index > 0) {
      setSideToNotDraw(obj, current, snake.tail[index - 1]);
    }
    if (index < snake.tail.length - 1) {
      setSideToNotDraw(obj, current, snake.tail[index + 1]);
    }
    
    ctx.beginPath();
    ctx.strokeStyle = "#F6E8CD";
    
    if (obj.left) {
      ctx.moveTo(scr(current.x), scr(current.y));
      ctx.lineTo(scr(current.x), scr(current.y + 1));
    }
    if (obj.right) {
      ctx.moveTo(scr(current.x + 1), scr(current.y));
      ctx.lineTo(scr(current.x + 1), scr(current.y +1));
    }
    if (obj.top) {
      ctx.moveTo(scr(current.x), scr(current.y));
      ctx.lineTo(scr(current.x + 1), scr(current.y));
    }
    if (obj.bottom) {
      ctx.moveTo(scr(current.x), scr(current.y + 1));
      ctx.lineTo(scr(current.x + 1), scr(current.y + 1));
    }
    
    ctx.stroke();
  }
  
  function drawSnake() {
    for(var i = 0; i < snake.tail.length; i++) {
      var pt = snake.tail[i];
      var x = pt.x * TILE;
      var y = pt.y * TILE;
      
      ctx.fillStyle = getColors().snakeColor;
      ctx.fillRect(x, y, TILE, TILE);
      
      drawSides(i);
    }
  }
  
  function moveSnake() {
    var newPt = new Point(snake.tail[0].x + dx, snake.tail[0].y + dy);
    if (newPt.x < 0 || newPt.x >= WIDTH || newPt.y < 0 || newPt.y >= HEIGHT || 
        snake.tail.some(function (pt) { return pt.x == newPt.x && pt.y == newPt.y; }) ||
        walls.some(function (wall) { return wall.contains(newPt); })) {
      crashSnake();
      return;
    }
    
    apples.forEach(function (apple) {
      if (apple.x == newPt.x && apple.y == newPt.y) {
        snake.length += 10;
        score += 10 * (level + 1);
        numApples--;
        apples.splice(apples.indexOf(apple), 1);
        timer = TIMER_START;
        
        if (apples.length == 0) {
          if (numApples == 0) {
            apple = new Point(-1, -1);
            walls.shift();
          }
          else makeApple();
        }
      }
    })
    
    snake.tail.unshift(newPt);
    snake.tail = snake.tail.slice(0, snake.length);
  }

  function drawApples() {
    ctx.fillStyle = getColors().appleColor;
    
    apples.forEach(function (apple) {
      ctx.beginPath();
      ctx.arc(apple.x*TILE + TILE / 2.0, apple.y*TILE + TILE/2.0,TILE/2.0, 0,2*Math.PI);
      ctx.fill();
    });
  }
  
  function drawTimer() {
    ctx.fillStyle = getColors().timerColor;
    var height = ((TIMER_START - timer) / 4);
    ctx.fillRect(0 * TILE, (26 - height) * TILE, TILE, TILE * height);
    ctx.fillRect(39 * TILE, (26 - height) * TILE, TILE, TILE * height);
  }
  
  function showPopup(text) {
    popupTimer = 20;
    var colors = getColors();
    $('.levelname').text(text);
    $('.popup')
      .css('background-color', colors.bgColor)
      .css('border-color', colors.wallColor)
      .css('top', ((TILE * HEIGHT - $('.popup').outerHeight()) / 2) + 'px')
      .css('left', ((TILE * WIDTH - $('.popup').outerWidth()) / 2) + 'px')
      .show();
  }
  
  function handlePopupsTick() {
    if (popupTimer < 1)
      return false;
      
    popupTimer--;
    if (popupTimer === 0) {
      popupMessages.shift();
      if (popupMessages.length > 0) {
        showPopup(popupMessages[0]);
      }
      else {
        $('.popup').hide();
        keyBuffer = [];
      }
    }
      
    drawWalls();
    return true;
  }
  
  function showMessage(text) {
    popupMessages.push(text);
    
    if (popupMessages.length === 1)
      showPopup(text);
  }

  function onTimerTick() {
    if (paused)
      return;
      
    if (handlePopupsTick())
      return;
    
    if (snake.isDead) {
      return;
    }
    
    if (keyBuffer.length > 0)
      handleKey(keyBuffer.shift());
    
    moveSnake();
    drawWalls();
    drawSnake();
    drawApples();
    drawTimer();
    
    updateStats();
    
    if (apples.length > 0) {
      timer--;
      if (timer === 0) {
        numApples += 3;
        makeApple();
        makeApple();
        makeApple();
        timer = TIMER_START;
      }
    }
    
    if (numApples === 0 && !snake.isDead && snake.tail[0].y === 0) {
      level++;
      lives++;
      
      if (!diedThisLevel) {
        var bonus = 20 * level;
        score += bonus;
        showMessage("Bonus: " + bonus + "pts");
      }
      
      diedThisLevel = false;
      startLevel();
    }
  }
  
  function updateStats() {
    var scoreCanvas = document.getElementById("score");
    var context = scoreCanvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    context.fillStyle = "blue";
    context.font = "bold 16px Arial";
    context.fillText("Level: " + (level + 1), 20, 20);
    context.fillText("Apples Left: " + numApples, 20, 40);
    context.fillText("Apples Left: " + numApples, 20, 40);
    context.fillText("Score: " + score, 20, 60);
    context.fillText("Lives: " + lives, 20, 80);
  }
  
  function onBlur() {
    paused = true;
  }
  
  
startLevel();
window.addEventListener("keydown", onKeyDown, true);
window.addEventListener("blur", onBlur, true);

});
