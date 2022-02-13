// let canny
// function setup(){
//
//  background(200);
//  noLoop();
// }
//
// function draw(){
//   // console.log("hii");
// }
// let x=0;
// let y=0

wordsToDraw = null



let sketch = function(p) {
  p.setup = function(){
    p.noLoop()
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(100,0,0,100);
    console.log(window.innerWidth, window.innerHeight);
  }
  p.draw = function(){
  //   x += p.random(-5, 5)
  //   y += p.random(-5, 5)
  // // console.log(window.innerWidth, window.innerHeight);
  // p.ellipse(x,y, 100)

  }

   p.updateWordsToDraw = function(data){
     let pt
     try {
       if (data[0][`preBlock?`]) {
         const preBlock = data.shift()
         const [[, { title }]] = preBlock.body?.filter(
           it => (it[0] === 'Properties'))
         pt = title
       }
     } catch (e) {
       console.debug(e)
     }


    wordsToDraw = data
    console.log(pt);
  }
};
let p = null
