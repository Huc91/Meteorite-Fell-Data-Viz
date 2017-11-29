//d3
//spatial varibles
var documentwidth = window.innerWidth;
var parent = document.getElementById('landing-graph');
var phone = false;

//time varialbles
var duration = 2000;

//tipography variable
var textSize = 24;

var width = parent.offsetWidth,
    height = parent.offsetHeight;


//smaller screen
if (documentwidth < 1200){
}
//smartphone variables
if (documentwidth < 900){
    phone = true;
}

if (documentwidth < 500){

}

if (documentwidth < 400){

}

//color variables
var cMain = '#311B92', //astral purple
    cSecond = '#FFF8E7', //cosmic latte
    cThird = '#00BCD4';

jsonData = 'data/meteoriti_arr.json';


d3.json(jsonData, function(error, data) {
    console.log('data loaded');
    console.log(data);
    draw(data);
  });

function draw(data){
  var svg = d3.select('#landing-graph')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

  //append earth
  svg.append('circle')
    .attr('cx', width/2)
    .attr('cy', height - height/3)
    .attr('r', width/12)
    .attr('fill', cThird )
    .attr('id', 'earth');

  //append year holder
  svg.append('text')
    .attr('x', width/2 + 18 + width/12)
    .attr('y', height - height/3)
    .attr("font-family", "sans-serif")
    .attr("font-size", textSize)
    .attr("fill", cSecond)
    .attr("font-weight","regular")
    .attr("id", "year")
    .text('');

  d3.select("#nRadius").on("input", function() {
   update(this.value);
   console.log(this.value);
 });
var currentyear = 2017;
var startingyear = 2017-50;

//where the stuff happens on earth
//margin  | w/12*5 +         | w/12*2 |             + w/12*5 |
// earth size = width/12*2
//spacer = earth size / number
//start of where stuff happen = w/12*5 +
 // update the elements
 spacer = (width/12*2)/6;

 function update(nRadius) {
   var selyear = startingyear+Number(nRadius);
   var selectedYear = selyear.toString();
   // update the viz
      svg.selectAll('line')
        .remove();

       svg.selectAll('line')
         .data(data.filter(

            function(d){
              //console.log(d.year + ' | ' + selectedYear );
              return d.year === selectedYear;
            }))
         .enter()
         .append('line')
         .transition()
         .duration(0)
         .attr('x1', function(d,i){ return -100 + i*spacer})
         .attr('y1', -100)
         .attr('x2', function(d,i){ return 0 + i*spacer})
         .attr('y2', 0)
         .attr('stroke-width', 3)
         .attr('stroke', cSecond )
         .transition()
         .on('end', function() { // use to be .each('end', function(){})
           return this.remove();
         })
         .ease(d3.easeExpOut)
         .duration(duration)
         .delay(function(d,i){
           return i*50;
         })
         .attr('x1', function(d,i){ return width/12*5 + i*spacer})
         .attr('y1', height - height/3)
         .attr('x2', function(d,i){ return width/12*5  + i*spacer})
         .attr('y2', height - height/3);

     svg.select('#year')
       .text(selectedYear);
 }
 update(0);

      }
