let c = "#9c9484";
let bg = ["#f2e1bf"];
var rabbits = []   //所有球的資料內容
var rabbit 
class rabbit_class{
  constructor(args){  //基本資料
    this.p =args.p || {x:width/2,y:height/2};
    this.w =args.w ||random(50,120);
    this.h =args.h ||random(50,120);
    this.d =args.d ||random(50,120);
    this.v = args.v || {x:random(-2,2),y:random(-2,2)}  //圓的框線
    this.a = args.a || {x:0,y:random(0.7,1.2)}
    this.mode = random(["happy","bad"])
  }
  draw(){ //畫圖
    push();
    translate(this.p.x + this.w / 2, this.p.y + this.h / 2);

    //  ミミ
    strokeWeight(this.d / 3.4);
    stroke("#665a41");
    noFill();

    if (random(100) < 50) {
      //arc(0, this.d / 4, this.d, this.d, random(150, 210), random(330, 390));
    } else {
     push();
      rotate(180);
      arc(0, this.d / 1.8, this.d * 0.8, this.d * 0.8, random(150, 210), random(330, 390));
      pop();

      if(this.mode=="happy"){
       //  メ
    fill("#463f3a");
    circle(-this.d / 6, -this.d / 50, this.d / 20);
    circle(this.d / 6, -this.d / 50, this.d / 20);   
      }
      else{
        //  メ
    fill("#463f3a");
    circle(-this.d / 6, -this.d / 50, this.d / 7);
    circle(this.d / 6, -this.d / 50, this.d / 7); 
      }
    }

    //  カオ
    noStroke();
    fill(c);
    ellipse(0, 0, this.d, this.d / 1.12);

    //  メ
    fill("#463f3a");
    circle(-this.d / 6, -this.d / 50, this.d / 7);
    circle(this.d / 6, -this.d / 50, this.d / 7);

    //  クチ
    fill(bg);
    circle(this.d / 9, this.d / 7.5, this.d / 3.5);
    circle(-this.d / 9, this.d / 7.5, this.d / 3.5);

    //  ハナ
    fill(c);
    ellipse(0, this.d / 11, this.d / 5, this.d / 7);

    pop();
  }

  update(){ //移動
    if(this.mode == "happy"){
      this.p.y = this.p.y + sin(frameCount/10+this.r) *(this.r/10)
    }
    else{
      this.p.x = this.p.x + this.v.x  //x軸
      this.p.y = this.p.y + this.v.y  //y軸  
    }
    
    //this.v.y = this.v.y + this.a.y      //把往下的速度，每次加一個a值
    //a值值為正，this.v.y碰到地時，如果兩數相加，this.v.y就會慢慢變慢
    //發現越跳越高，使用*0.99產生一個摩擦力
    // this.v.x = this.v.x * 0.99
    // this.v.y = this.v.y * 0.99
    if(this.p.x<0){
      this.v.x = -this.v.x
    }
    if(this.p.x>width){
      this.v.x = -this.v.x
    }
    if(this.p.y<0){
      this.v.y = -this.v.y
    }
    if(this.p.y>height){
      this.v.y = -this.v.y
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(bg);
  for(i=0;i<20;i=i+1){  //產生多個球資料
    rabbit = new rabbit_class({   //傳一串參數直到class內  
      v:{x:random(-2,2),y:random(-2,2)},
      p:{x:random(0,width),y:random(0,height)},
      a:{x:0,y:0}
     })
    rabbits.push(rabbit)
    print(rabbits)
   }
}
  


function draw() {
  background(bg);
  for(j=0;j<rabbits.length;j=j+1){
   rabbit = rabbits[j]
   rabbit.draw()   //繪出球的位子
   rabbit.update()
  }
 }


 function mousePressed(){
  rabbit = new rabbit_class({   //傳一串參數直到class內 
    v:{x:random(-2,2),y:random(-2,2)},
    p:{x:mouseX,y:mouseY},
    a:{x:0,y:0}
   })
   rabbits.push(rabbit)
   }