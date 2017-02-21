(function () {
    function DataFetcher(urlFactory, delay) {
        var self = this;

        self.repeat = false;
        self.delay = delay;
        self.timer = null;
        self.requestObj = null;

        function getNext() {
            self.requestObj = $.ajax({
                    url: urlFactory()
                }).done(function(response) {
                    $(self).trigger("stateFetchingSuccess", {
                        result: response
                    });
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    $(self).trigger("stateFetchingFailure", {
                        error: textStatus
                    });
                }).always(function() {
                    if (self.repeat && _.isNumber(self.delay)) {
                        self.timer = setTimeout(getNext, self.delay);
                    }
                });
        }

        self.start = function(shouldRepeat) {
            self.repeat = shouldRepeat;
            getNext();
        };

        self.stop = function() {
            self.repeat = false;
            clearTimeout(self.timer);
        };

        self.repeatOnce = function() {
            getNext();
        };

        self.setDelay = function(newDelay) {
            this.delay = newDelay;
        };
    }

    function addNewEntry($container, contentHTML) {
        var $innerSpan = $("<p/>").text(contentHTML),
            $newEntry = $("<li/>").append($innerSpan);

        $container.append($newEntry);
    }

    var $trafficStatusList = $("#mockTrafficStat"),
        df2 = new DataFetcher(function() {
            return "/traffic_status";
        });

    $(df2).on({
        "stateFetchingSuccess": function(event, data) {

           



  keys = Object.keys(data['result']['data'][0]);
  obj = {};



  data['result']['data'].forEach(function (a, i) {

        obj['links'] = obj['links'] || [];
        obj['nodes'] = obj['nodes'] || [];
        obj['links'].push({ 'myid':i,'source': a['srcObj'] ,'target': a['destObj'] , 'packets':a['packets'],'traffic':a['traffic']});
        obj['nodes'].push({'id': a['srcObj'] , 'type':a['srcType']});
         obj['nodes'].push({'id': a['destObj'] , 'type':a['destType']});

});

//storing in local
  localStorage.setItem("json", JSON.stringify(obj));
 
obj['nodes'] = _.uniqWith(obj['nodes'], _.isEqual);

  var w = 1000;
    var h = 600;
 

 var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(320))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));


 svg.append("svg:defs").selectAll("marker")
    .data(["suit"])
  .enter().append("svg:marker")
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -0.8)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");




   var path = svg.append("svg:g").selectAll("path")
  .data(obj.links)
  .enter().append("svg:path")
  .attr("class", "link")
  .attr("id", function (d) { return "path"+d.myid; })
  .style("stroke", "#ccc")    
  .attr("marker-end", "url(#suit)");
    
   var pathtext = svg.append("svg:g").selectAll("path")
  .data(obj.links)
  .enter().append("text")
   .append("textPath") 
    .attr("xlink:href", function (d) { return "#path"+d.myid; }) 
    .style("text-anchor","middle") 
    .attr("startOffset", "50%") 
    .style("display","none")    
    .text(function (d) { return "packets: "+d.packets+ "- traffic:"+d.traffic; }); 

  


var node = svg.selectAll(".node")
.data(obj.nodes)
.enter().append("g").call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));;

node.append("circle")
.attr("class", "node")
.attr("r", 6)
.style("fill", function (d) { return color(d.group); });


node.on('mouseover', function(d) {
  path.style('stroke-width', function(l) {
    if (d === l.source || d === l.target)
      return 2;
    else
      return 0.2;
    });
   path.style('stroke', function(l) {
    if (d === l.source || d === l.target)
      return "#999";
    else
      return "#ccc";
    });


   pathtext.style('display', function(l) {
    if ((d === l.source || d === l.target) && $("#cloudcheck").is(":checked"))
      return "block";
    else
      return "none";
    });


});
node.on('mouseout', function() {
  path.style('stroke-width', 1);
  path.style("stroke", "#ccc");  
    pathtext.style("display", "none"); 
  
});





   node.append("svg:text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.id }); 











  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(obj.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(obj.links);



$(window).resize(function(){
    x = w.innerWidth ;
    y = w.innerHeight;

    svg.attr("width", x).attr("height", y);


});

var maxPackets = {source:0,target:0,packets:0}  ;
var maxTraffic = {source:0,target:0,traffic:0} ;
$.each(obj.links, function (i, item) {

if(item.packets > maxPackets.packets)
      { maxPackets.packets = item.packets; maxPackets.source =item.source;maxPackets.target=item.target;}

if(item.traffic > maxTraffic.traffic)
      { maxTraffic = item; maxTraffic.source =item.source;maxTraffic.target=item.target;}





});

$('#chartPreferences').append( "<p class='category'>Highest Traffic :"+maxTraffic.traffic+"<br/> From: "+maxTraffic.source.id+" -> To: "+ maxTraffic.target.id+"</p><br/>");
$('#chartPreferences').append( "<p class='category'>Highest Packets :"+maxPackets.packets+"<br/> From: "+maxPackets.source.id+" -> To: "+ maxPackets.target.id +"</p>");
$('#chartPreferences').append( "<br/><p class='category'>Time Frame: "+data.result.header.time_range.start+" - "+data.result.header.time_range.end+":</p>");

  function ticked() {


   node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
path.attr("d", function(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
});



  }

  function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}




            // data.result.data.forEach(function(dataEntry) {
            //     addNewEntry($trafficStatusList, JSON.stringify(dataEntry));
            // });
        },
        "stateFetchingFailure": function(event, data) {
            addNewEntry($trafficStatusList, JSON.stringify(data.error));
            addNewEntry($trafficStatusList, "Hit a snag. Retry after 1 sec...");
            setTimeout(function() {
                $trafficStatusList.html("");
                df2.repeatOnce();
            }, 1000);
        }
    });

    df2.start();
})();