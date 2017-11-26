import * as d3 from 'd3';

const square = d3.selectAll('rect');
square.style('fill', 'orange');

const svg = d3.select('#barchart')
    .append('svg')
    .attr('width', 300)
    .attr('height', 150);

const margin = {top:20, right:20, bottom: 30, left: 40};
const width = svg.attr('width') - margin.left - margin.right;
const height = svg.attr('height') - margin.top - margin.bottom;

const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
const y = d3.scaleLinear().rangeRound([height, 0]);

let g = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.tsv('data.tsv', function(d){
     d.frequency = d.frequency;
     return d;
   }, function(error, data){
    if(error){
        throw error;
    }

    x.domain(data.map(function(d){return d.letter}));
    y.domain([0, d3.max(data, function(d){return d.frequency})]);

    g.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    g.append('g')
        .attr('class', 'axis axis-y')
        .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency');

    g.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
          .attr('class', 'bar')
          .attr('x', function(d){ return x(d.letter)})
          .attr('y', function(d){ return y(d.frequency)})
          .attr('width', x.bandwidth())
          .attr('height', function(d) {return height - y(d.frequency)})
  }
);
