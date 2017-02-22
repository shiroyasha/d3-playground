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
  .selectAll("rect")
  .data(DATA)
  .enter()
  .append("g")
  .attr("transform", (d, index) => `translate(${index * BAR_WIDTH}, 0)`)

var rects = bars
  .selectAll("rect")
  .data((d) => [[0, d.carbs], [d.carbs, d.proteins], [d.carbs + d.proteins, d.fats]])
  .enter()
  .append("rect")

rects
   .attr("class", "bar")
   .attr("width", BAR_WIDTH - 1)
   .attr("y", (d) => d[0]/20)
   .attr("height", (d) => d[0]/20 + d[1]/20)
   .attr("fill", (_, index) => colors(index))
