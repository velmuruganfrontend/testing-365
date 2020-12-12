//GRADUALLY CHANGE BACKGROUND COLOR WHILE SCROLLING

//function parameters:
    //ElemId: targeted element
    //r1,g1,b1: starting color
    //r2,g2,b2: finishing color
    //scrollFromTop (in px): how much scrollTop until complete color change. can element height value too.

    function changeColor(ElemId, r1, g1, b1, r2, g2, b2, scrollFromTop) {
    
        //get scroll length till complete color change
        //this specifically makes colors change completely when you scroll to the bottom.
        //Instead, you could make scrollFromTop pixel-specific, by deleting this below,
        //and directly adding the wanted argument to the funtion's scrollFromTop parameter.
        // var pageHeight = document.getElementById(ElemId).scrollHeight;
        // var windowHeight = window.innerHeight;
        // var scrollFromTop = pageHeight - windowHeight;
        
        
        //get difference between two colors
        function diff(a, b) {
            return Math.abs(a - b);
        }
        var redDiff = diff(r1, r2);
        var greenDiff = diff(g1, g2);
        var blueDiff = diff(b1, b2);
    
        //get unit (shade) by which the color will change by one scroll
        var redUnit = redDiff / scrollFromTop;
        var greenUnit = greenDiff / scrollFromTop;
        var blueUnit = blueDiff / scrollFromTop;
    
    
        $(document).scroll(function () {
            //get value of scrollTop each time you scroll
            var scrollTopVal = $(document).scrollTop();
          //add or subtract r,g,b shades when scrolling. Example:
            //subtract if going from rgb(255,255,255) to rgb(0,0,0)
            //add if going the other way
            function direction(x, y, Unit) {
                if (x < y) {
                    return Math.round(x + (Unit * scrollTopVal));
                } else {
                    return Math.round(x - (Unit * scrollTopVal));
                }
            }
    
            //IF makes sure new target color stays after certain point
            //ELSE changes color shades step by step using the "direction" function as we scroll
            if (scrollTopVal > scrollFromTop) {
                //rgb string
                var rgb = "rgb(" + r2 + ", " + g2 + ", " + b2 + ")";
                $("#" + ElemId).css("background", rgb);
            } else {
                var newRed = direction(r1, r2, redUnit);
                var newGreen = direction(g1, g2, greenUnit);
                var newBlue = direction(b1, b2, blueUnit);
    
                var rgb = "rgb(" + newRed + ", " + newGreen + ", " + newBlue + ")";
                $("#" + ElemId).css("background", rgb);
            }
        });

    }
    
    