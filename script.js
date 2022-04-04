window.addEventListener('load', function () {
 var startP = new window.URLSearchParams(window.location.search).get('prices[]');
 
 
 
 var mPos = { x: -1, y: -1 };
 varia = parseFloat($("#Pfilter .bar").attr("vMax"))-parseFloat($(".bar").attr("vMin"));
 pixValue =  varia / $("#Pfilter .bar").width();
 pixunValue = $("#Pfilter .bar").width() / varia;
 if(startP){
     startP = startP.split(",");
         if(startP[0] > parseInt($("#Pfilter .bar").attr("vMin"))){
             minw = pixunValue * (startP[0]-parseFloat($("#Pfilter .bar").attr("vMin")));
             $("#Pfilter .min").width(minw);
             $("#Pfilter .PriceMin").text("R$ "+startP[0]);
         }
         if(startP[1] < parseInt($("#Pfilter .bar").attr("vMax"))){
             maxw = pixunValue * parseInt((parseFloat($("#Pfilter .bar").attr("vMax"))-startP[1]));
             $("#Pfilter .max").width(maxw);
             $("#Pfilter .PriceMax").text("R$ "+startP[1]);
         }
 }
 $(document).on("mousemove touchmove ready", "html", function(e) {
     
     if($(".moving").length){
         mPos.x = e.pageX;
         if(e.originalEvent.touches){
             mPos.x = e.originalEvent.touches[0].pageX;   
         }
         pl = (parseFloat($(".bar").attr("vMin"))+(pixValue*$("#Pfilter .rangeBar.min").width())).toFixed(2);
         pm = (parseFloat($(".bar").attr("vMax"))-(pixValue*$("#Pfilter .rangeBar.max").width())).toFixed(2);
         $("#Pfilter .PriceMin").text("R$ "+pl);
         $("#Pfilter .PriceMax").text("R$ "+pm);
         $("#PfilterInput").val(pl+","+pm);
         if(mPos.x > $("#Pfilter .bar").offset().left && mPos.x < $("#Pfilter .bar").offset().left+$("#Pfilter .bar").width()){
             if($(".min.moving").length && mPos.x < $("#Pfilter .rangeBar.max").offset().left-5){   
                 p = mPos.x  - $("#Pfilter .bar").offset().left;
                 $(".min.moving").width(p);
             } else if($(".max.moving").length && mPos.x > $("#Pfilter .rangeBar.min").offset().left+$("#Pfilter .rangeBar.min").width()+5) { 
                 p = $("#Pfilter .bar").offset().left+$("#Pfilter .bar").width() - mPos.x;
                 $(".max.moving").width(p);
             }
         }
     }
 });
$(document).on("mousedown touchstart", ".rangeBar", function(e){
 $(this).addClass("moving");
 
});
$(document).on("mouseup touchend", function(e){
 $("#Pfilter .moving").removeClass("moving");
});
});