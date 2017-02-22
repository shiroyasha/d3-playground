function randomInt(from, to) {
  return Math.floor(Math.random() * (to - from) + from);
}

function generateRandomCalorieData() {
  var result = [];

  for(let i = 0; i < 30; i++) {
    var total = randomInt(2000, 3000);

    result.push({
      carbs: total * 0.4, proteins: total * 0.4,
      fats: total * 0.2,
      total: total
    });
  }

  return result;
}

const BAR_WIDTH = 20;

var DATA = generateRandomCalorieData();
var svg = d3.select("#chart");
var colors = d3.scaleOrdinal().range(["#89b399", "#e39b7d", "#e8d3a9"]);

var bars = svg
 .selectAll(".bar")
 .data(d3.stack().keys(["carbs", "proteins", "fats"])(DATA))
 .enter().append("g")
   .attr("fill", function(d) { console.log(colors(d.key)); return colors(d.key); })

bars
 .selectAll("rect")
 .data(function(d) { return d; })
 .enter().append("rect")
   .attr("class", "bar")
   .attr("x", function(d, index) { return index * BAR_WIDTH; })
   .attr("y", function(d) { return 300 - d[1]/20; })
   .attr("width", function(d) { console.log(d); return BAR_WIDTH - 1; })
   .attr("height", function(d) { return d[1]/20 - d[0]/20; })
