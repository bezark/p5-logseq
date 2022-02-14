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

let bg;
var lines;
var counts;
var total;

let sketch = function(p) {
  p.setup = function(){
    p.noLoop()
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(0,0,0,50);
    // console.log(window.innerWidth, window.innerHeight);
    



  }
  p.draw = function(){
    p.background(0,0,0);
    for (var k in counts) {
      if (counts.hasOwnProperty(k)) {
        if (counts[k]/total > 0.0001) {
          p.fill(p.random(255), p.random(255), p.random(255));
          p.textSize((counts[k]/total) * 25000);
          p.text(k, p.random(p.width), p.random(p.height));
        }
      }
    }
    p.noLoop()
  }

   p.updateWordsToDraw = function(data){
    //  let pt
    //  try {
    //    if (data[0][`preBlock?`]) {
    //      const preBlock = data.shift()
    //      const [[, { title }]] = preBlock.body?.filter(
    //        it => (it[0] === 'Properties'))
    //      pt = title
    //    }
    //  } catch (e) {
    //    console.debug(e)
    //  }


    wordsToDraw = data
    console.log(data);

    var params = {
      ignoreStopWords: true,
      ignoreCase: true,
      ignorePunctuation: true
    };

    counts = RiTa.concordance(wordsToDraw.join(" "),
      params); 
    // total = totalValues(counts);
    total = p.totalValues(counts)

    console.log(counts) 
  }
  p.totalValues =  function(obj) {
    var total = 0;
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        total += obj[k];
      }
    }
    return total;
  }

};
let p = null
