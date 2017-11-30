//vanilla
var uihelp = document.getElementById('help-container');
var hand = document.getElementById('hand');
var helped = false;

//d3
//spatial varibles
var documentwidth = window.innerWidth;
var parent = document.getElementById('landing-graph');
var slider = document.getElementById('nRadius');
var phone = false;

//time varialbles
var duration = 2000;

//tipography variable
var textSize = 24;

var width = parent.offsetWidth,
    height = parent.offsetHeight;

var sliderw = parent.offsetWidth;


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
  //create the viz
  //create a timeline

    /*var xScale = d3.scaleLinear();
    xScale.domain([0, 50]).range([4, sliderw]);


    var timelineAxis = d3.axisBottom(xScale);

  var tml = d3.select('#timeline')
    .append('svg')
    .attr('width', sliderw)
    .attr('height', 36)
    .data(data)
    .append('g')
      .call(timelineAxis.ticks(50));*/


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

    svg.append('text')
      .attr('x', width/2 - 18 - width/12)
      .attr('y', height - height/3)
      .attr("font-family", "sans-serif")
      .attr("font-size", 16)
      .attr("fill", cSecond)
      .attr("font-weight","regular")
      .attr("id", "landings")
      .attr("text-anchor", "end")
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
 spacer = (width/12*2)/10;

 function update(nRadius) {

   //hide tutorial
   if(!helped && nRadius != 0) {
     uihelp.classList.add("ninja");
     helped = true;
   }

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
         .attr('x1', function(d,i){ return -300 + i*spacer})
         .attr('y1', -300)
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
         .attr('x1', function(d,i){ return width/12*5 + width/12/5 + i*spacer})
         .attr('y1', height - height/3)
         .attr('x2', function(d,i){ return width/12*5 + width/12/5  + i*spacer})
         .attr('y2', height - height/3);

     svg.select('#year')
       .text(selectedYear);
    svg.select('#landings')
      .text(d3.selectAll('line').size() + " " + "landings");
 }
 update(0);

      }
