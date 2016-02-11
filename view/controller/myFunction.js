function generateApiChart1(orgUnitID, dataElementID, year) {
    if (configDeploy == PRODUCTION) {
        var quarterArr = ["Q1", "Q2", "Q3", "Q4"];
        var peGen = "";
        for (var i = 0; i < quarterArr.length; i++) {
            peGen += (year + quarterArr[i]);
            if (i < quarterArr.length - 1) peGen += ";";
        }
        apiChart1 = apiAnalyticTemplate + peGen + "&filter=ou:" + orgUnitID + ";OU_GROUP-lBQUJ9K4wQK&filter=dx:" + dataElementID + "&displayProperty=NAME&outputIdScheme=ID";
    } else {
    }
}

function generateApiChart2(orgUnitID, dataElementID, year) {
    if (configDeploy == PRODUCTION) {
        var quarterArr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        var peGen = "";
        for (var i = 0; i < quarterArr.length; i++) {
            peGen += (year + quarterArr[i]);
            if (i < quarterArr.length - 1) peGen += ";";
        }
        apiChart2 = apiAnalyticTemplate + peGen + "&filter=ou:" + orgUnitID + ";OU_GROUP-lBQUJ9K4wQK&filter=dx:" + dataElementID + "&displayProperty=NAME&outputIdScheme=ID";
    } else {
    }
}

function generateApiChart3(orgUnitID, dataElementID, year) {
    if (configDeploy == PRODUCTION) {
        var quarterArr = ["10", "11", "12"];
        var peGen = "";
        for (var i = 0; i < quarterArr.length; i++) {
            peGen += (year + quarterArr[i]) + ";";
        }
        for (var i = 0; i < quarterArr.length; i++) {
            peGen += ((Number(year) + 1) + quarterArr[i]);
            if (i < quarterArr.length - 1) peGen += ";";
        }
        apiChart3 = apiAnalyticTemplate + peGen + "&filter=ou:" + orgUnitID + ";OU_GROUP-lBQUJ9K4wQK&filter=dx:" + dataElementID + "&displayProperty=NAME&outputIdScheme=ID";
    } else {
    }
}

function autoGenerateChartHtml(numChartGroup) {
    $('#chartBody').html('');
    var count = 1;
    var chartGroupId = [];
    for (var i = 0; i < numChartGroup; i++) {
        chartGroupId.push([count++, count++, count++]);
    }
    for (var i = 0; i < numChartGroup; i++) {
        var chartBody = '<div class="container2"> ' +
            '<div class="container1"> ' +
            '<div class="col1"> ' +
            '<div id="chart' + chartGroupId[i][0] + '" style="min-width: 310px; height: 400px;" class="floating-box"></div>' +
            '</div>' +
            '<div class="col2">' +
            '<div id="chart' + chartGroupId[i][1] + '" style="min-width: 310px; height: 400px;" class="floating-box"></div>' +
            '</div> ' +
            '</div>' +
            '</div> ' +
            '<div class="footer">' +
            '<div id="chart' + chartGroupId[i][2] + '" style="min-width: 310px; height: 400px " class="floating-box"></div>' +
            '</div>';
        $('#chartBody').append(chartBody);
    }
    return chartGroupId;
}

function validateDashboard() {

    //orgUnit Related
    var orgUnitList = document.getElementById('dropdown');
    var tempOrgUnitUid = orgUnitList.options[orgUnitList.selectedIndex].value;

    // indicator related
    var tempDataElementList = document.getElementById('dataElementGroup');
    var tempDataElementListUid = tempDataElementList.options[tempDataElementList.selectedIndex].value;

    // indicator related
    var tempDataElement = document.getElementById('dataElements');
    var tempDataElementUid = tempDataElement.options[tempDataElement.selectedIndex].value;

    // month related
    var tempMonthList = document.getElementById('ddlMonth');
    var tempMonthUid = tempMonthList.options[tempMonthList.selectedIndex].value;

    // year related
    var tempYearList = document.getElementById('year');
    var tempYearUid = tempYearList.options[tempYearList.selectedIndex].value;

    if (tempOrgUnitUid == "base" || tempOrgUnitUid == undefined) {
        alert("Please select OrganisationUnit");
        return;
    }

    else if (tempDataElementListUid == "base" || tempDataElementListUid == undefined) {
        alert("Please select DataElement Group");
        return;
    }

    //else if (tempDataElementUid == "base" || tempDataElementUid == undefined) {
    //    alert("Please select DataElement");
    //    return;
    //}

    else if (tempMonthUid == "Select Month" || tempMonthUid == undefined) {
        alert("Please select Month");
        return;
    }

    else if (tempYearUid == "Select Year" || tempYearUid == undefined) {
        alert("Please select Year");
        return;
    }


    //generate html
    if (tempDataElementUid != "base" && tempDataElementUid != undefined) {
        numChartGroup = 1;
    }

    myFunction(numChartGroup, chartDataGroup, tempOrgUnitUid, tempDataElementUid, tempMonthUid, tempYearUid);

}

function myFunction(numChartGroup, chartDataGroup, tempOrgUnitUid, tempDataElementUid, tempMonthUid, tempYearUid) {
    var chartGroupId = autoGenerateChartHtml(numChartGroup);
    if (numChartGroup == 1) {
        generateApiChart1(tempOrgUnitUid, tempDataElementUid, tempYearUid);
        generateApiChart2(tempOrgUnitUid, tempDataElementUid, tempYearUid);
        generateApiChart3(tempOrgUnitUid, tempDataElementUid, tempYearUid);

        var titleDe='Chart';
        for(var i =0; i<chartDataGroup.length; i++){
            if(chartDataGroup[i].id==tempDataElementUid){
                titleDe = chartDataGroup[i].name;
            }
        }
        createChart1(chartInfo = {
            chartId: "chart1",
            title: titleDe
        }, tempOrgUnitUid, tempMonthUid, tempYearUid);
        createChart2(chartInfo = {
            chartId: "chart2",
            title: titleDe
        }, tempOrgUnitUid, tempMonthUid, tempYearUid);
        createChart3(chartInfo = {
            chartId: "chart3",
            title: titleDe
        }, tempOrgUnitUid, tempMonthUid, tempYearUid);
    } else {
        for (var i = 0; i < numChartGroup; i++) {

            generateApiChart1(tempOrgUnitUid, chartDataGroup[i].id, tempYearUid);
            generateApiChart2(tempOrgUnitUid, chartDataGroup[i].id, tempYearUid);
            generateApiChart3(tempOrgUnitUid, chartDataGroup[i].id, tempYearUid);

            createChart1({
                chartId: "chart" + chartGroupId[i][0],
                title: chartDataGroup[i].name
            }, tempOrgUnitUid, tempMonthUid, tempYearUid);
            createChart2({
                chartId: "chart" + chartGroupId[i][1],
                title: chartDataGroup[i].name
            }, tempOrgUnitUid, tempMonthUid, tempYearUid);
            createChart3({
                chartId: "chart" + chartGroupId[i][2],
                title: chartDataGroup[i].name
            }, tempOrgUnitUid, tempMonthUid, tempYearUid);

        }
    }
}

function createChart1(chartInfo, tempOrgUnitUid, tempMonthUid, tempYearUid) {
    var count = tempMonthUid;
    $.getJSON(apiChart1, function (jsonRes) {
        var json = standardlizeData(jsonRes);
        var chartData = preparingDataforChart(json, count);

        createBarCharts(chartInfo.chartId, chartInfo.title, "", chartData.xaxis, chartData.series);
    });
}

function createChart2(chartInfo, tempOrgUnitUid, tempMonthUid, tempYearUid) {

    var count = tempMonthUid * 3;
    $.getJSON(apiChart2, function (jsonRes) {
        var json = standardlizeData(jsonRes);
        var chartData = preparingDataforChart(json, count);

        createLineCharts(chartInfo.chartId, chartInfo.title, "", chartData.xaxis, chartData.series);
    });
}

function createChart3(chartInfo, tempOrgUnitUid, tempMonthUid, tempYearUid) {
    var count = tempMonthUid;
    $.getJSON(apiChart3, function (jsonRes) {
        var json = standardlizeData(jsonRes);
        json = swapAlternativePe(json);
        count = json.metaData.pe;
        var chartData = preparingDataforChart(json, count);
        createBarCharts(chartInfo.chartId, chartInfo.title, "", chartData.xaxis, chartData.series);
    });
}

function createBarCharts(view, titleStr, subtitleStr, xAxisCategoriesArr, dataSeriesArrO) {
    $("#" + view).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: titleStr
        },
        subtitle: {
            text: subtitleStr
        },
        xAxis: {
            categories: xAxisCategoriesArr,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: dataSeriesArrO
    });
}

function createLineCharts(view, titleStr, subtitleStr, xAxisCategoriesArr, dataSeriesArrO) {
    $("#" + view).highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: titleStr
        },
        subtitle: {
            text: subtitleStr
        },
        xAxis: {
            categories: xAxisCategoriesArr,
            crosshair: true
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        series: dataSeriesArrO
    });
}

function standardlizeData(jsonRes) {
    var json = jsonRes;
    var datarows = json.rows;
    var peArr = json.metaData.pe;
    var facilityArr = json.metaData[facility];
    var dataResult = [];

    for (var i = 0; i < peArr.length; i++) {
        var pe = peArr[i];
        for (var j = 0; j < facilityArr.length; j++) {
            var fa = facilityArr[j];
            var search = false;
            for (var k = 0; k < datarows.length; k++) {
                if (datarows[k][0] == fa && datarows[k][1] == pe) {
                    search = true;
                    break;
                }
            }
            if (!search) {
                datarows.push([fa, pe, "0"]);
            }
        }
    }
    json.rows = datarows;
    json.metaData.pe = peArr;
    json.metaData[facility] = facilityArr;
    return json;
}

function sortDataRowsbyPeArr(json) {
    var datarows = json.rows;
    var peArr = json.metaData.pe;
    var facilityArr = json.metaData[facility];
    var dataResult = [];
    for (var i = 0; i < peArr.length; i++) {
        var minPe = peArr[i];
        for (var k = 0; k < facilityArr.length; k++) {
            var minF = facilityArr[k];
            for (var j = 0; j < datarows.length; j++) {
                if (datarows[j][0] == minF && datarows[j][1] == minPe) {
                    dataResult.push(datarows[j]);
                }
            }
        }
    }
    return dataResult;
}

function preparingDataforChart(json, count) {

    var peArr = json.metaData.pe;
    var facilityArr = json.metaData[facility];
    var dataResult = sortDataRowsbyPeArr(json);


    var xAxisCategoriesArr = [];
    for (var i = 0; i < peArr.length; i++) {
        xAxisCategoriesArr.push(json.metaData.names[peArr[i]])
        if (xAxisCategoriesArr.length >= count) break;
    }
    var dataSeriesArrO = [];

    for (var i = 0; i < facilityArr.length; i++) {
        var name = json.metaData.names[facilityArr[i]];
        var data = [];
        for (var j = 0; j < dataResult.length; j++) {
            if (dataResult[j][0] == facilityArr[i]) {
                data.push(Number(dataResult[j][2]));
                if (data.length >= count) break;
            }
        }
        var seriO = {
            name: name,
            data: data
        }
        dataSeriesArrO.push(seriO);
    }

    return {xaxis: xAxisCategoriesArr, series: dataSeriesArrO};
}

function swapAlternativePe(json) {
    var peArr = [];
    var mid = json.metaData.pe.length / 2;
    for (var i = 0; i < mid; i++) {
        peArr.push(json.metaData.pe[i], json.metaData.pe[i + mid]);
    }
    json.metaData.pe = peArr;
    return json;
}