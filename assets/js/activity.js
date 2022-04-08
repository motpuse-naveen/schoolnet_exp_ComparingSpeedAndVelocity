var secCount = 0;
var trailTickInterval = 40 / 2;
var origBallX, origBallY
var myVelocity1, myVelocity2;
var MaxWidth = $(".scaleContainer").width();
var SpeedVelocity = (function () {
    return {
        Launch: function () {
            origBallX = Number($(".trail").position().left);
            origBallY = Number($(".trail").position().top);
            MaxWidth = Math.abs(Number($(".scaleContainer").width()));
            secCount = 0;
            trailTickInterval = 40 / 2;
            newQuestion();
        }
    }
})();

function newQuestion() {
    $("#next_btn").hide()
    $("#btn_go").show();
    totalDist = 0
    SpeedVelocityChart.clearSeriesData();
    //myTrail.eraseAllTrailMCs()
    $(".trailback").remove();

    //randomizeBallColor()
    var mVelocity
    var mRand
    while (true) {
        myVelocity1 = Number(Math.random() * 5) + 5
        myVelocity2 = Number(Math.random() * 5) + 5
        if (myVelocity1 != myVelocity2) {
            if (3 * myVelocity1 > 2 * myVelocity2) {
                break
            }
        }
    }
    //alert(myVelocity1)
    $(".trail").css({ "left": origBallX + "px" })
    $(".trail").css({ "top": origBallY + "px" })
    $(".trail").show();
    secCount = 0
    $("#next_btn").hide()
}

function addTrailBack() {
    var currPos = $(".trail").position();
    var trailback = `
                  <div class="trailback new">
                    <div class="vline"></div>
                    <img class="trailImg" src="assets/images/object_02.svg">
                    <div class="vlinespan">`+ secCount + ` s</div>
                  </div>
                `
    $(".scaleContainer").append(trailback)
    $(".trailback.new").css({ "left": Math.abs(currPos.left), "top": currPos.top }).removeClass("new");
    SpeedVelocityChart.updateSpeedVsTime({ x: secCount, y: Math.abs(xVelocity()) });
    SpeedVelocityChart.updateVelocityVsTime({ x: secCount, y: xVelocity() });
    if (secCount == 3) {

    }
    //SpringOscillationChart.update({ x: 0, y: myAmplitude / divisionfactor * -1 })
    secCount++;
    if (secCount == 4) {
        $(".trail").stop();
        SpeedVelocityChart.updateSpeedVsTime({ x: 3, y: Math.abs(xVelocity()) });
        SpeedVelocityChart.updateVelocityVsTime({ x: 3, y: xVelocity() });

        var currLeft = Math.abs(Number($(".trail").position().left));
        //alert(currLeft)
        var initTravelDist = MaxWidth - origBallX;
        var leftPos = initTravelDist - currLeft;

        AnimateToLeft(-leftPos)
        //alert(leftPos)
    }
    if (secCount == 6) {
        $(".trail").stop();
        $("#btn_go").hide();
        $("#next_btn").show()
        clearInterval(tickInterval);
        tickInterval = 0;
    }
}
function xSpeed() {
    //console.log("xSpeed:" + Number(secCount * 100 + 0.000001) / 100);
    if (Number(secCount * 100 + 0.000001) / 100 < 4) {
        return myVelocity1
    }
    return myVelocity2
}
function xVelocity() {
    //console.log("xVelocity:" + Number(secCount * 100 + 0.000001) / 100);
    if (Number(secCount * 100 + 0.000001) / 100 < 4) {
        return myVelocity1
    }
    return -myVelocity2
}

function AnimateToRight(leftPos) {
    $(".trail").animate({
        left: leftPos
    }, {
        duration: myVelocity1 * 500,
        easing: 'linear',
        start: function () {
            //addTrailBack();
            //StartTickInterval();
        },
        step: function (now, fx) {
            //console.log(now);
        },
        complete: function () {
            $(this).hide();
            $("#next_btn").show()
            clearInterval(tickInterval);
            tickInterval = 0;
        }
    });
}
function AnimateToLeft(leftPos) {
    $(".trail").animate({
        left: leftPos
    }, {
        duration: myVelocity2 * 500,
        easing: 'linear',
        start: function () {
            //addTrailBack();
            //StartTickInterval();
        },
        step: function (now, fx) {

        },
        complete: function () {
            $(this).hide();
            $("#next_btn").show()
            clearInterval(tickInterval);
            tickInterval = 0;
        }
    });
}

var tickInterval = null;

function StartTickInterval() {
    tickInterval = setInterval(function () {
        addTrailBack();
    }, 600)
}

$(document).on("click", "#btn_go", function (event) {
    /*myMotion_xZero = 0
    myMotion_yZero = 0
    myMotion_vxZero = myVelocity1
    myMotion_vyZero = 0*/
    secCount = 0

    //$( ".block" ).animate({ "left": "+=1px" }, myVelocity1 );
    addTrailBack();
    StartTickInterval();
    AnimateToRight(MaxWidth);
    //var ff = 56/0;
    //myTrail.forceDropTrailImageAtXY("ballOutline_sym", ballAndTrack_mc.ball_mc._x, ballAndTrack_mc.ball_mc._y)
    //myMotion.startVelocityBasedMotion()
    $(this).hide();
});

$(document).on("click", "#next_btn", function (event) {
    newQuestion();
});