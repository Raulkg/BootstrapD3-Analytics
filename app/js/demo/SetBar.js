

var datum = JSON.parse(localStorage.getItem("json"));
var bardatum = {};
 var barkeys = Object.keys(datum.links);

  datum['links'].forEach(function (a, i) {

        bardatum['name'] = bardatum['name'] || [];


        bardatum['name'].push({'id':i,'text':a['source']+"->"+a['target'],'packets':a['packets'],'traffic':a['traffic']} );






    


});

console.log(bardatum);

var svg1 = d3.select("#chartActivity").append("svg")
          .attr("height",$('#chartActivity').parent().height()*0.6 )
          .attr("width",$('#chartActivity').parent().width());




$(window).resize(function(){
    y = $('#chartActivity').parent().height();
    x = $('#chartActivity').parent().width();

    svg1.attr("width", x).attr("height", y);
  });
var barnumber = 100;
var page = 1;
var lastPageNum =  bardatum['name'].length / barnumber;
var viewdata =  bardatum['name'].slice((page-1)*barnumber,page*barnumber);
 console.log(lastPageNum);
$('#next').click(function() {
    if (page < lastPageNum) {
        page++;
    }
    viewdata = bardatum['name'].slice((page-1)*barnumber,page*barnumber);
    redraw();
      $('#cloudcheck1').attr('checked',false);
});
$('#prev').click(function() {
    if (page > 1) {
        page--;
    }
    viewdata = bardatum['name'].slice((page-1)*barnumber,page*barnumber);
    redraw();
    $('#cloudcheck1').attr('checked',false);
});

$('#cloudcheck1').change(function() {
  if ($(this).is(':checked')) {
   Sortredredraw();
  } else {
   redraw() ;
  }
});



    var div = d3.select("body").append("div").attr("class", "toolTip");


 var rect = svg1.selectAll("g")
            .data(viewdata)
            .enter()
            .append("g");











rect.append("rect")
     .attr("class", "newbar")
          .attr("height", function(d, i) {return ((d.packets/50) * ($('#chartActivity').height()/60))})
          .attr("width",  "6")
          .attr("x", function(d, i) {return (i*7) })
          .attr("y", function(d, i) {return 200 - ((d.packets/50) * ($('#chartActivity').height()/60))});



    rect
            .on("mousemove", function(d){
                div.style("left", d3.event.pageX+10+"px");
                div.style("top", d3.event.pageY-25+"px");
                div.style("display", "inline-block");
                div.html("Packets: "+(d.packets)+"<br> Data:"+d.text+"<br> Traffic: "+d.traffic);
            });
    rect
            .on("mouseout", function(d){
                div.style("display", "none");
            });


$('#cloudcheck1').change(function() {
  if ($(this).is(':checked')) {
   Sortredredraw();
  } else {
   redraw() ;
  }
});


function Sortredredraw() {
 d3.selectAll("#chartActivity g").remove(); 

rect = svg1.selectAll("#chartActivity g")
            .data(_.sortBy(viewdata,['packets']))
            .enter()
            .append("g");


rect.append("rect")
     .attr("class", "newbar")

          .attr("height", function(d, i) {return ((d.packets/50) * ($('#chartActivity').height()/60))})
          .attr("width",  "6")
          .attr("x", function(d, i) {return (i*7) })
          .attr("y", function(d, i) {return 200 - ((d.packets/50) * ($('#chartActivity').height()/60))})
    


    rect
            .on("mousemove", function(d){
                div.style("left", d3.event.pageX+10+"px");
                div.style("top", d3.event.pageY-25+"px");
                div.style("display", "inline-block");
                div.html("Packets: "+(d.packets)+"<br> Data:"+d.text+"<br> Traffic: "+d.traffic);
            });
    rect
            .on("mouseout", function(d){
                div.style("display", "none");
            });

rect.exit().remove();
    
}




function redraw() {

   d3.selectAll("#chartActivity g").remove();

rect = svg1.selectAll("#chartActivity g")
            .data(viewdata)
            .enter()
            .append("g");



rect.append("rect")
     .attr("class", "newbar")

          .attr("height", function(d, i) {return ((d.packets/50) * ($('#chartActivity').height()/60))})
          .attr("width",  "6")
          .attr("x", function(d, i) {return (i*7) })
          .attr("y", function(d, i) {return 200 - ((d.packets/50) * ($('#chartActivity').height()/60))})
    


    rect
            .on("mousemove", function(d){
                div.style("left", d3.event.pageX+10+"px");
                div.style("top", d3.event.pageY-25+"px");
                div.style("display", "inline-block");
                div.html("Packets: "+(d.packets)+"<br> Data:"+d.text+"<br> Traffic: "+d.traffic);
            });
    rect
            .on("mouseout", function(d){
                div.style("display", "none");
            });

rect.exit().remove();
    
}

