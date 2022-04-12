var secCount = 0;
var trailTickInterval = 40 / 2;
var origBallX, origBallY
var myVelocity1, myVelocity2;
var MaxWidth = $(".scaleContainer").width();

var tickInterval = null;
var tickvalX = 0;
var tickvalX2 = 0;

var moveScaleVariable = Math.min(Math.abs(Number($(".scaleContainer").width()))/3.9009, 111);


var SpeedVelocity = (function () {
    return {
        Launch: function () {
            origBallX = Number($(".trail").position().left);
            origBallY = Number($(".trail").position().top);
            MaxWidth = Math.abs(Number($(".scaleContainer").width()));
            moveScaleVariable = Math.min(Math.abs(Number($(".scaleContainer").width()))/3.9009, 111);
            //alert(moveScaleVariable)
            secCount = 0;
            trailTickInterval = 40 / 2;
            newQuestion();
            var deviceType = ActivityShell.DeviceType();
            if(deviceType=="mobile"){
                if (window.matchMedia("(orientation: portrait)").matches) {
                    setScaleValue()
                }
            }
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
    //myVelocity1 = Number(myVelocity1.toFixed(2))
    //myVelocity2 =  Number(myVelocity2.toFixed(2))
    //myVelocity1 = 10;
    
    $(".trail").css({ "left": origBallX + "px" })
    $(".trail").css({ "top": origBallY + "px" })
    $(".trail").show();
    secCount = 0
    $("#next_btn").hide()
}


function xVelocity() {
    if (Number(secCount * 100 + 0.000001) / 100 < 4) {
        return myVelocity1
    }
    return -myVelocity2
}

var GlobalSpeed = 0
function StartTickInterval(myspeed, moveback) {
    GlobalSpeed = myspeed;
    tickInterval = setInterval(function () {
        var varTickValX = (GlobalSpeed / 1000);
        var varTickValX2Int = (10 / 1000);
        addTrailBack(varTickValX, varTickValX2Int, moveback);
    }, 10)
}

function addTrailBack(paramTickValX, paramTickValX2Int, parammoveback) {
    paramTickValX2Int = Number(Number(paramTickValX2Int).toFixed(4));
    tickvalX = tickvalX + paramTickValX;
    tickvalX2 = tickvalX2 + paramTickValX2Int;
    tickvalX2 = Number(tickvalX2.toFixed(2));
    console.log(tickvalX + ", " + tickvalX2)
    
    var posleft = $(".trail").position().left;
    //console.log(paramtickvalXInt)
    if (parammoveback > 0) {
        $(".trail").css({ "left": posleft + (paramTickValX * moveScaleVariable) })
    }
    else {
        $(".trail").css({ "left": posleft - (paramTickValX * moveScaleVariable) })
    }
    //console.log(tickvalX);
    if (tickvalX2 == 0 || tickvalX2 == 1 || tickvalX2 == 2 ||
        tickvalX2 == 3 || tickvalX2 == 4 || tickvalX2 == 5) {
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
        secCount++;
    }
    SpeedVelocityChart.updateSpeedVsTime({ x: tickvalX2, y: Math.abs(xVelocity()) });
    SpeedVelocityChart.updateVelocityVsTime({ x: tickvalX2, y: xVelocity() });


    if (tickvalX2 == 3) {
        SpeedVelocityChart.updateSpeedVsTime({ x: 3, y: Math.abs(xVelocity()) });
        SpeedVelocityChart.updateVelocityVsTime({ x: 3, y: xVelocity() });

        clearInterval(tickInterval);
        tickInterval = 0;
        StartTickInterval(myVelocity2, -1)
    }
    if (tickvalX2 > 5) {
        $(".trail").hide();
        $("#btn_go").hide();
        $("#next_btn").show()
        clearInterval(tickInterval);
        tickInterval = 0;
    }
}

$(document).on("click", "#btn_go", function (event) {
    secCount = 0
    tickvalX = 0;
    tickvalX2 = 0;
    addTrailBack(0, 0, 1);
    StartTickInterval(myVelocity1, 1);
    $(this).hide();
});

$(document).on("click", "#next_btn", function (event) {
    newQuestion();
});

$(document).on("click", ".linkactivityTextMore", function(){
    $(".mobiledevice.less").hide();
    $(".mobiledevice.more").slideDown("slow","linear", function(){

    });
})
$(document).on("click", ".linkactivityTextLess", function(){
    $(".mobiledevice.more").slideUp("slow","linear", function(){
        $(".mobiledevice.less").fadeIn();
    });
})

function setScaleValue(){
    var graphPos = $(".graphWrapper").position();
    var wrapht = $(".exp_body_content").height();
    var wrapwdt = $(".exp_body_content").width();
    var graphHt = $(".rowGraphContainer .col").height()

    var elmSize = {
        width: wrapwdt,
        height: graphHt + graphHt + 30
    }
    var scale;
    var wrapperSize = {
        width: wrapwdt,
        height: wrapht - graphPos.top
    }
    scale = Math.min(
        wrapperSize.width/elmSize.width,
        wrapperSize.height/elmSize.height
    );
    if (scale < 1) {
        $(".rowGraphContainer").css({
            transform: "scale(" + scale + ")"
        });
    }
    else{
        scale = 1;
        $(".rowGraphContainer").css({
            "transform": "scale(" + scale + ")"
        });
    }
}