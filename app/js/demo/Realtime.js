var svg2 = d3.select("#RealTimeActivity").append("svg")
          .attr("height",$('#RealTimeActivity').parent().height()*0.6 )
          .attr("width",$('#RealTimeActivity').parent().width());
             var limit = 60 * 1,
            duration = 750,
            now = new Date(Date.now() - duration)

        var width = 500,
            height = 200
            var globalX = 0;
            var step = 10;

     var x = 
      d3.scaleTime()
            .domain([now - (limit - 2), now - duration])
            .range([0, width])

        var y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0])

        var line = d3.line()
      
            .x(function(d, i) {
                return x(now - (limit - 1 - i) * duration)
            })
            .y(function(d) {
                return y(d)
            })  .curve(d3.curveBasis);


     
var datum = JSON.parse(localStorage.getItem("json"));
var bardatum = {};
 var barkeys = Object.keys(datum.links);

  datum['links'].forEach(function (a, i) {

        bardatum['name'] = bardatum['name'] || [];


        bardatum['name'].push({'id':i,'text':a['source']+"->"+a['target'],'packets':a['packets'],'traffic':a['traffic']} );});


        var svg3 = d3.select("#RealTimeActivity > svg")
            .attr('class', 'chart')
            .attr('width', width)
            .attr('height', height + 50)

        var axis = svg3.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(x.axis = d3.axisBottom().scale(x))
var dati = d3.range(limit).map(function() {
                    return 0
                });
var dati1 = d3.range(limit).map(function() {
                    return 0
                });
        var paths = svg3.append('g')


                var group= paths.append('path')
                .data(dati)
                .attr('class', 'line')
                .style('stroke', 'orange');

                var group1= paths.append('path')
                .data(dati1)
                .attr('class', 'line')
                .style('stroke', 'green');



var smoothLine = line;      

function tick() {
        now = new Date()
        var data;
        $.ajax({url:"/traffic_status"
                }).done(function(response) {
            data = response ;   
            obj1 = {};
       data['data'].forEach(function (a, i) {  
        obj1[a['srcObj']] = obj1[a['srcObj']]  || [];
        obj1[a['srcObj']] .push({ 'myid':i,'target': a['destObj'] , 'packets':a['packets'],'traffic':a['traffic']});
});
  keys = Object.keys(obj1);
  //iterate over all the values in the obj1 array     
  dati.push(obj1[keys[0]][0].packets*10/100);
    dati1.push(obj1[keys[0]][1].packets*10/100);
}).fail(function(jqXHR, textStatus, errorThrown) {})
        


                // //group.data.push(group.value) // Real values arrive at irregular intervals
        
     

 group.datum(dati)
   .attr('class', 'line')
    .attr('d', smoothLine);
 group1.datum(dati1)
   .attr('class', 'line')
    .attr('d', smoothLine);
     

            // Shift domain
            x.domain([now - (limit - 2) * duration, now - duration])

            // Slide x-axis left
            axis.transition()
                .duration(duration)
         .ease(d3.easeLinear)
                .call(x.axis)

            // Slide paths left
            paths.attr('transform', null)
                .transition()
                .duration(duration)
               .ease(d3.easeLinear)
                .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
                .on('end', tick)

            // Remove oldest data point from each group
           dati.shift();
             dati1.shift();
        
               
      
        }


tick()
