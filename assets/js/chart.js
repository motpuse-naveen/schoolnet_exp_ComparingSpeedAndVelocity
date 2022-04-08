var SpeedVelocityChart = (function () {
    var ctx = null;
    var chartSpeedVsTime = null;
    var chartVelocityVsTime = null;
    return {
        initSpeedVsTime: function (pdata, pwidth, pheight) {
            chartSpeedVsTime = Highcharts.chart('graphSpeedVsTime', {
                chart: {
                    type: 'line',
                    width: pwidth,
                    height: pheight,
                    animation: false,
                    backgroundColor: 'transparent'
                },
                plotOptions: {
                    series: {
                        enableMouseTracking: false,
                        lineWidth: 2
                    }
                },
                xAxis: {
                    title: {
                        text: 'Time (Sec)',
                        enabled: true,
                        style: {
                            color: "#4D4D4D",
                            fontSize: '14px',
                            fontWeight: 'bold',
                            margin: -10,
                            fill: "#4D4D4D"
                        }
                    },
                    labels: {
                        enabled: true
                    },
                    min: 0,
                    max: 5,
                    tickInterval: 1,
                    gridLineWidth: 1,
                    lineWidth: 0,
                    minorTickLength: 0,
                    tickLength: 0,
                    gridLineColor: '#D2D7DA',
                    minorGridLineWidth: 1,
                    minorTickInterval: 0.5,
                    minorGridLineColor: '#D2D7DA',
                },
                title: false,
                subtitle: false,
                yAxis: {
                    title: {
                        text: 'Speed (cm/sec)',
                        enabled: true,
                        style: {
                            color: "#4D4D4D",
                            fontSize: '14px',
                            fontWeight: 'bold',
                            margin: -10,
                            fill: "#4D4D4D"
                        }
                    },
                    labels: {
                        style: {
                            color: "#545454",
                            fontFamily: "Montserrat-SemiBold"
                        }
                    },
                    min: 0,
                    max: 10,
                    tickInterval: 2,
                    gridLineWidth: 1,
                    minorGridLineWidth: 1,
                    minorTickInterval: 1,
                    minorGridLineColor: '#D2D7DA',
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: "",
                    color: "#CD5052",
                    marker: {
                        enabled: false
                    },
                    data: []
                }]
            });

            //$("text.highcharts-axis-title").attr("x",35);
            var yaxishtml = '<div class="yAxisLine"><img class="y-axis-arrow" src="assets/images/arrow-y-axis_1arrow.svg"></div>'
            var xaxishtml = '<div class="xAxisLine"><img class="x-axis-arrow" src="assets/images/arrow-x-axis.svg"></div>'
            $("#graphSpeedVsTime").append(yaxishtml)
            $("#graphSpeedVsTime").append(xaxishtml)
            //NM: Add custom axis Lines
            var yaxispath = $("g.highcharts-axis.highcharts-yaxis path.highcharts-axis-line").attr("d")
            var axisLeft = yaxispath.split(" ")[1];

            $("#graphSpeedVsTime .yAxisLine").css({ "left": (Number(axisLeft) - 8) + "px" });
            $("#graphSpeedVsTime .xAxisLine").css({ "left": (Number(axisLeft) - 1) + "px" });
            //$(".highcharts-background").attr({"fill":"transparent"});
        },
        initVelocityVsTime: function (pdata, pwidth, pheight) {
            chartVelocityVsTime = Highcharts.chart('graphVelocityVsTime', {
                chart: {
                    type: 'line',
                    width: pwidth,
                    height: pheight,
                    animation: false,
                    backgroundColor: 'transparent'
                },
                plotOptions: {
                    series: {
                        enableMouseTracking: false,
                        lineWidth: 2
                    }
                },
                xAxis: {
                    title: {
                        text: 'Time (Sec)',
                        enabled: true,
                        style: {
                            color: "#4D4D4D",
                            fontSize: '14px',
                            fontWeight: 'bold',
                            margin: -10,
                            fill: "#4D4D4D"
                        }
                    },
                    labels: {
                        enabled: true
                    },
                    min: 0,
                    max: 5,
                    tickInterval: 1,
                    gridLineWidth: 1,
                    lineWidth: 0,
                    minorTickLength: 0,
                    tickLength: 0,
                    gridLineColor: '#D2D7DA',
                    minorGridLineWidth: 1,
                    minorTickInterval: 0.5,
                    minorGridLineColor: '#D2D7DA',
                },
                title: false,
                subtitle: false,
                yAxis: {
                    title: {
                        text: 'Velocity (cm/sec)',
                        enabled: true,
                        style: {
                            color: "#4D4D4D",
                            fontSize: '14px',
                            fontWeight: 'bold',
                            margin: -10,
                            fill: "#4D4D4D"
                        }
                    },
                    labels: {
                        style: {
                            color: "#545454",
                            fontFamily: "Montserrat-SemiBold"
                        }
                    },
                    min: -10,
                    max: 10,
                    tickInterval: 2,
                    gridLineWidth: 1,
                    minorGridLineWidth: 1,
                    minorTickInterval: 2,
                    minorGridLineColor: '#D2D7DA',
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: "",
                    color: "#CD5052",
                    marker: {
                        enabled: false
                    },
                    data: []
                }]
            });

            //$("text.highcharts-axis-title").attr("x",35);
            var yaxishtml = '<div class="yAxisLine"><img class="y-axis-arrow" src="assets/images/arrow-y-axis.svg"></div>'
            var xaxishtml = '<div class="xAxisLine"><img class="x-axis-arrow" src="assets/images/arrow-x-axis.svg"></div>'
            $("#graphVelocityVsTime").append(yaxishtml)
            $("#graphVelocityVsTime").append(xaxishtml)

            //NM: Add custom axis Lines
            var yaxispath = $("g.highcharts-axis.highcharts-yaxis path.highcharts-axis-line").attr("d")
            var axisLeft = yaxispath.split(" ")[1];
            $("#graphVelocityVsTime .yAxisLine").css({ "left": (Number(axisLeft) - 5) + "px" });
            $("#graphVelocityVsTime .xAxisLine").css({ "left": (Number(axisLeft) + 2) + "px" });
            //$(".highcharts-background").attr({"fill":"transparent"});
            //$(".highcharts-axis-labels.highcharts-xaxis-labels text:")
        },
        updateSpeedVsTime: function (datapoint) {
            //chart.series[0].addPoint([datapoint.x, datapoint.y], true);
            chartSpeedVsTime.series[0].addPoint(datapoint, true, false);
            //chart.redraw();
            //$("text.highcharts-axis-title").attr("x", 35);
        },
        updateVelocityVsTime: function (datapoint) {
            //chart.series[0].addPoint([datapoint.x, datapoint.y], true);
            chartVelocityVsTime.series[0].addPoint(datapoint, true, false);
            //chart.redraw();
            //$("text.highcharts-axis-title").attr("x", 35);
        },
        clearSeriesData: function () {
            chartSpeedVsTime.series[0].setData([]);
            chartVelocityVsTime.series[0].setData([]);
            //$("text.highcharts-axis-title").attr("x", 35);
        }
    }
})();