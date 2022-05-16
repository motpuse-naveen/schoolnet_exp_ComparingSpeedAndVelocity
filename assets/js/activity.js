var secCount = 0;
var trailTickInterval = 40 / 2;
var origBallX, origBallY
var myVelocity1, myVelocity2;
var MaxWidth = $(".scaleContainer").width();

var tickInterval = null;
var tickvalX = 0;
var tickvalX2 = 0;

var moveScaleVariable = Math.min(Math.abs(Number($(".scaleContainer").width())) / 3.9009, 111);

var trailColorArray = ['A_01.svg','A_02.svg','A_03.svg','A_04.svg','A_05.svg']
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var SpeedVelocity = (function () {
    return {
        Launch: function () {
            origBallX = Number($(".trail").position().left);
            origBallY = Number($(".trail").position().top);
            MaxWidth = Math.abs(Number($(".scaleContainer").width()));
            moveScaleVariable = Math.min(Math.abs(Number($(".scaleContainer").width())) / 3.9009, 111);
            //alert(moveScaleVariable)
            secCount = 0;
            trailTickInterval = 40 / 2;
            newQuestion();
            var deviceType = ActivityShell.DeviceType();
            if (deviceType == "mobile") {
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
    //var mVelocity
    //var mRand
    var velc = GetInitialVelocity()

    myVelocity1 = velc.v1;
    myVelocity2 = velc.v2;
    //myVelocity1 = 10;
    //console.log(myVelocity1, myVelocity2)
    $(".trail").css({ "left": origBallX + "px" })
    $(".trail").css({ "top": origBallY + "px" })
    $(".trail").show();
    secCount = 0
    $("#next_btn").hide()
}

function GetInitialVelocity() {
    var velc = {
        v1: 0,
        v2: 0
    }
    while (true) {
        velc.v1 = Number(Math.random() * 5) + 5;
        velc.v2 = Number(Math.random() * 5) + 5;
        if (velc.v1 != velc.v2) {
            if (3 * velc.v1 > 2 * velc.v2) {
                break
            }
        }
    }
    if (Math.abs(velc.v1 - velc.v2) > 0.5) {
        return velc;
    }
    else {
        return GetInitialVelocity();
    }
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
    //console.log(tickvalX + ", " + tickvalX2)

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
    $(".contWraper").removeAttr("style");
    secCount = 0
    tickvalX = 0;
    tickvalX2 = 0;
    addTrailBack(0, 0, 1);
    StartTickInterval(myVelocity1, 1);
    $(this).hide();
});

$(document).on("click", "#next_btn", function (event) {
    $(".contWraper").removeAttr("style");
    var randInt = randomInteger(0,4);
    var trailImgName = trailColorArray[randInt];
    $(".trailImg").attr("src", "assets/images/" + trailImgName)
    newQuestion();
});

$(document).on("click", ".linkactivityTextMore", function () {
    $(".mobiledevice.less").hide();
    $(".mobiledevice.more").slideDown("slow", "linear", function () {

    });
})
$(document).on("click", ".linkactivityTextLess", function () {
    $(".mobiledevice.more").slideUp("slow", "linear", function () {
        $(".mobiledevice.less").fadeIn();
    });
})

function setScaleValue() {
    var graphPos = $(".graphWrapper").position();
    var wrapht = $(".exp_body_content").height();
    var wrapwdt = $(".exp_body_content").width();
    var graphHt = $(".rowGraphContainer .col").height()

    var elmSize = {
        width: wrapwdt,
        height: graphHt + graphHt + 40
    }
    var scale;
    var wrapperSize = {
        width: wrapwdt,
        height: wrapht - graphPos.top
    }
    scale = Math.min(
        wrapperSize.width / elmSize.width,
        wrapperSize.height / elmSize.height
    );
    if (scale < 1) {
        $(".rowGraphContainer").css({
            transform: "scale(" + scale + ")"
        });
    }
    else {
        scale = 1;
        $(".rowGraphContainer").css({
            "transform": "scale(" + scale + ")"
        });
    }
}