arr = [];

function fillTriangle(x1, y1, x2, y2, x3, y3) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.closePath();
  context.fill();
}

function fill6(x,y,r){
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
    fillTriangle(
      x,
      y,
      x + Math.cos(a) * r,
      y + Math.sin(a) * r,
      x + Math.cos(a+Math.PI / 3) * r,
      y + Math.sin(a+Math.PI / 3) * r
    );
  }
}

class six {
  r = 33.5;
  type = 0;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    if(this.type == 0){
      context.strokeStyle = "green"
      context.fillStyle = "green"
    }
    if(this.type == 1){
      context.strokeStyle = "blue"
      context.fillStyle = "blue"
    }
    fill6(this.x,this.y,this.r);
  }
  update(){
    if(isKeyPressed[32]){
      if(Math.sqrt(Math.pow(this.x-mouseX,2) + Math.pow(this.y-mouseY,2)) < this.r*0.84){
        this.type = 1
      }
    }
  }
}

for (let i = 0; i < 8; i++) {
  arr.push([])
  for(let j = 0; j < 20; j++) {
    if(j %2 == 0){
      arr[i].push(new six(i*100 + 100,j*29 + 100))
    }else{
      arr[i].push(new six(i*100 + 150,j*29 + 100))
    }
  }
}

function draw() {
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr[i].length; j++) {
      arr[i][j].draw();
    }
  }
}

function update() {
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr[i].length; j++) {
      arr[i][j].update();
    }
  }
}
