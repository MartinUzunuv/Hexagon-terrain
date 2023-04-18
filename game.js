arr = [];

function fillTriangle(x1, y1, x2, y2, x3, y3) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.closePath();
  context.fill();
}

function fill6(x, y, r) {
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
    fillTriangle(
      x,
      y,
      x + Math.cos(a) * r,
      y + Math.sin(a) * r,
      x + Math.cos(a + Math.PI / 3) * r,
      y + Math.sin(a + Math.PI / 3) * r
    );
  }
}

hero = { ax: 1, ay: 2 };
aim = { ax: 5, ay: 5 };

cooldown = 0;

class six {
  r = 33.5;
  type = 0;
  constructor(x, y, ax, ay) {
    this.x = x;
    this.y = y;
    this.ax = ax;
    this.ay = ay;
  }
  draw() {
    if (this.type == 0) {
      context.strokeStyle = "green";
      context.fillStyle = "green";
    }
    if (this.type == 1) {
      context.strokeStyle = "blue";
      context.fillStyle = "blue";
    }
    if (this.type == 2) {
      context.strokeStyle = "black";
      context.fillStyle = "black";
    }
    fill6(this.x, this.y, this.r);
  }
  update() {
    if (isKeyPressed[32]) {
      if (
        Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2)) <
        this.r * 0.84
      ) {
        this.type = 1;
      }
    }
    if (isKeyPressed[49]) {
      if (
        Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2)) <
        this.r * 0.84
      ) {
        hero.ax = this.ax;
        hero.ay = this.ay;
        console.log(hero.ax, hero.ay);
      }
    }
    if (isKeyPressed[50]) {
      if (
        Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2)) <
        this.r * 0.84
      ) {
        aim.ax = this.ax;
        aim.ay = this.ay;
        console.log(aim.ax, aim.ay);
      }
    }
  }
}

for (let i = 0; i < 8; i++) {
  arr.push([]);
  for (let j = 0; j < 20; j++) {
    if (j % 2 == 0) {
      arr[i].push(new six(i * 100 + 100, j * 29 + 100, i, j));
    } else {
      arr[i].push(new six(i * 100 + 150, j * 29 + 100, i, j));
    }
    if (i == 0 && j % 2 == 0) {
      arr[i][j].type = 1;
    }
    if (j == 0 || j == 1) {
      arr[i][j].type = 1;
    }
    if (i == 7 && j % 2 != 0) {
      arr[i][j].type = 1;
    }
    if (j == 19 || j == 18) {
      arr[i][j].type = 1;
    }
  }
}

function draw() {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j].draw();
    }
  }

  context.fillStyle = "red";
  context.strokeStyle = "red";
  fill6(arr[aim.ax][aim.ay].x, arr[aim.ax][aim.ay].y, 28);

  context.fillStyle = "brown";
  context.strokeStyle = "brown";
  fill6(arr[hero.ax][hero.ay].x, arr[hero.ax][hero.ay].y, 25);
}

function update() {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j].update();
    }
  }

  cooldown++;
  if (cooldown > 50) {
    cooldown = 0;
    let tempArr = [];
    for (let i = 0; i < arr.length; i++) {
      tempArr.push([]);
      for (let j = 0; j < arr[i].length; j++) {
        tempArr[i].push({ type: arr[i][j].type }); //(-2 y),( -1 y), (+1 x -1 y), (+1 y), (+2 y),( +1 x +1 y)
      }
    }

    if (hero.ay % 2 != 0) {
      if (
        tempArr[hero.ax][hero.ay - 2].type != 1 &&
        tempArr[hero.ax][hero.ay - 2].parent == undefined
      ) {
        tempArr[hero.ax][hero.ay - 2].parent = { x: hero.ax, y: hero.ay - 2 };
        // arr[hero.ax][hero.ay - 2].type = 2
      }
      if (
        tempArr[hero.ax][hero.ay - 1].type != 1 &&
        tempArr[hero.ax][hero.ay - 1].parent == undefined
      ) {
        tempArr[hero.ax][hero.ay - 1].parent = { x: hero.ax, y: hero.ay - 1 };
        // arr[hero.ax][hero.ay - 1].type = 2
      }
      if (
        tempArr[hero.ax + 1][hero.ay - 1].type != 1 &&
        tempArr[hero.ax + 1][hero.ay - 1].parent == undefined
      ) {
        tempArr[hero.ax + 1][hero.ay - 1].parent = {
          x: hero.ax + 1,
          y: hero.ay - 1,
        };
        // arr[hero.ax + 1][hero.ay - 1].type = 2
      }
      if (
        tempArr[hero.ax][hero.ay + 1].type != 1 &&
        tempArr[hero.ax][hero.ay + 1].parent == undefined
      ) {
        tempArr[hero.ax][hero.ay + 1].parent = { x: hero.ax, y: hero.ay + 1 };
        // arr[hero.ax][hero.ay + 1].type = 2
      }
      if (
        tempArr[hero.ax][hero.ay + 2].type != 1 &&
        tempArr[hero.ax][hero.ay + 2].parent == undefined
      ) {
        tempArr[hero.ax][hero.ay + 2].parent = { x: hero.ax, y: hero.ay + 2 };
        // arr[hero.ax][hero.ay + 2].type = 2
      }
      if (
        tempArr[hero.ax + 1][hero.ay + 1].type != 1 &&
        tempArr[hero.ax + 1][hero.ay + 1].parent == undefined
      ) {
        tempArr[hero.ax + 1][hero.ay + 1].parent = {
          x: hero.ax + 1,
          y: hero.ay + 1,
        };
        // arr[hero.ax + 1][hero.ay + 1].type = 2
      }
    } else {
      if (
        tempArr[hero.ax][hero.ay - 2].type != 1 &&
        tempArr[hero.ax][hero.ay - 2].parent == undefined
      ) {
        tempArr[hero.ax][hero.ay - 2].parent = { x: hero.ax, y: hero.ay - 2 };
        // arr[hero.ax][hero.ay - 2].type = 2
      }
      if (
        tempArr[hero.ax][hero.ay - 1].type != 1 &&
        tempArr[hero.ax][hero.ay - 1].parent == undefined
      ) {
        tempArr[hero.ax][hero.ay - 1].parent = { x: hero.ax, y: hero.ay - 1 };
        // arr[hero.ax][hero.ay - 1].type = 2
      }
      if (
        tempArr[hero.ax - 1][hero.ay - 1].type != 1 &&
        tempArr[hero.ax - 1][hero.ay - 1].parent == undefined
      ) {
        tempArr[hero.ax - 1][hero.ay - 1].parent = {
          x: hero.ax - 1,
          y: hero.ay - 1,
        };
        // arr[hero.ax - 1][hero.ay - 1].type = 2
      }
      if (
        tempArr[hero.ax][hero.ay + 1].type != 1 &&
        tempArr[hero.ax][hero.ay + 1].parent == undefined
      ) {
        tempArr[hero.ax][hero.ay + 1].parent = { x: hero.ax, y: hero.ay + 1 };
        // arr[hero.ax][hero.ay + 1].type = 2
      }
      if (
        tempArr[hero.ax][hero.ay + 2].type != 1 &&
        tempArr[hero.ax][hero.ay + 2].parent == undefined
      ) {
        tempArr[hero.ax][hero.ay + 2].parent = { x: hero.ax, y: hero.ay + 2 };
        // arr[hero.ax][hero.ay + 2].type = 2
      }
      if (
        tempArr[hero.ax - 1][hero.ay + 1].type != 1 &&
        tempArr[hero.ax - 1][hero.ay + 1].parent == undefined
      ) {
        tempArr[hero.ax - 1][hero.ay + 1].parent = {
          x: hero.ax - 1,
          y: hero.ay + 1,
        };
        // arr[hero.ax - 1][hero.ay + 1].type = 2
      }
    }

    for (let iter = 0; iter < 30; iter++) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          if (tempArr[i][j].parent != undefined) {
            try {
              if (j % 2 != 0) {
                if (
                  tempArr[i][j - 2].type != 1 &&
                  tempArr[i][j - 2].parent == undefined
                ) {
                  tempArr[i][j - 2].parent = tempArr[i][j].parent;
                }
                if (
                  tempArr[i][j - 1].type != 1 &&
                  tempArr[i][j - 1].parent == undefined
                ) {
                  tempArr[i][j - 1].parent = tempArr[i][j].parent;
                }
                if (
                  tempArr[i + 1][j - 1].type != 1 &&
                  tempArr[i + 1][j - 1].parent == undefined
                ) {
                  tempArr[i + 1][j - 1].parent = tempArr[i][j].parent;
                }
                if (
                  tempArr[i][j + 1].type != 1 &&
                  tempArr[i][j + 1].parent == undefined
                ) {
                  tempArr[i][j + 1].parent = tempArr[i][j].parent;
                }
                if (
                  tempArr[i][j + 2].type != 1 &&
                  tempArr[i][j + 2].parent == undefined
                ) {
                  tempArr[i][j + 2].parent = tempArr[i][j].parent;
                }
                if (
                  tempArr[i + 1][j + 1].type != 1 &&
                  tempArr[i + 1][j + 1].parent == undefined
                ) {
                  tempArr[i + 1][j + 1].parent = tempArr[i][j].parent;
                }
              } else {
                if (
                  tempArr[i][j - 2].type != 1 &&
                  tempArr[i][j - 2].parent == undefined
                ) {
                  tempArr[i][j - 2].parent = tempArr[i][j].parent;
                }
                if (
                  tempArr[i][j - 1].type != 1 &&
                  tempArr[i][j - 1].parent == undefined
                ) {
                  tempArr[i][j - 1].parent = tempArr[i][j].parent;
                }
                if (
                  tempArr[i - 1][j - 1].type != 1 &&
                  tempArr[i - 1][j - 1].parent == undefined
                ) {
                  tempArr[i - 1][j - 1].parent = tempArr[i][j].parent;
                }
                if (
                  tempArr[i][j + 1].type != 1 &&
                  tempArr[i][j + 1].parent == undefined
                ) {
                  tempArr[i][j + 1].parent = tempArr[i][j].parent;
                }
                if (
                  tempArr[i][j + 2].type != 1 &&
                  tempArr[i][j + 2].parent == undefined
                ) {
                  tempArr[i][j + 2].parent = tempArr[i][j].parent;
                }
                if (
                  tempArr[i - 1][j + 1].type != 1 &&
                  tempArr[i - 1][j + 1].parent == undefined
                ) {
                  tempArr[i - 1][j + 1].parent = tempArr[i][j].parent;
                }
              }
            } catch (e) {}
          }
        }
      }
    }

    if (!(aim.ax == hero.ax && aim.ay == hero.ay)) {
      if (tempArr[aim.ax][aim.ay].parent != undefined) {
        hero.ax = tempArr[aim.ax][aim.ay].parent.x;
        hero.ay = tempArr[aim.ax][aim.ay].parent.y;
      }
    }
  }
}
