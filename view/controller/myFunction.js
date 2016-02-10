function generateApiChart1(orgUnitID, year) {
    if (configDeploy == PRODUCTION) {
        var quarterArr = ["Q1", "Q2", "Q3", "Q4"];
        var peGen = "";
        for (var i = 0; i < quarterArr.length; i++) {
            peGen += (year + quarterArr[i]);
            if (i < quarterArr.length - 1) peGen += ";";
        }
        apiChart1 = apiAnalyticTemplate + peGen + "&filter=ou:" + orgUnitID + ";OU_GROUP-lBQUJ9K4wQK&filter=dx:nlyO8gj4uHd&displayProperty=NAME&outputIdScheme=ID";
    } else {
    }
}

function generateApiChart2(orgUnitID, year) {
    if (configDeploy == PRODUCTION) {
        var quarterArr = ["01", "02", "03", "04","05","06","07","08","09","10","11","12"];
        var peGen = "";
        for (var i = 0; i < quarterArr.length; i++) {
            peGen += (year + quarterArr[i]);
            if (i < quarterArr.length - 1) peGen += ";";
        }
        apiChart2 = apiAnalyticTemplate + peGen + "&filter=ou:" + orgUnitID + ";OU_GROUP-lBQUJ9K4wQK&filter=dx:nlyO8gj4uHd&displayProperty=NAME&outputIdScheme=ID";
    } else {
    }
}

function generateApiChart3(orgUnitID, year) {
    if (configDeploy == PRODUCTION) {
        var quarterArr = ["10","11","12"];
        var peGen = "";
        for (var i = 0; i < quarterArr.length; i++) {
            peGen += (year + quarterArr[i])+ ";";
        }
        for (var i = 0; i < quarterArr.length; i++) {
            peGen += ((Number(year)+1) + quarterArr[i]);
            if (i < quarterArr.length - 1) peGen += ";";
        }
        apiChart3 = apiAnalyticTemplate + peGen + "&filter=ou:" + orgUnitID + ";OU_GROUP-lBQUJ9K4wQK&filter=dx:nlyO8gj4uHd&displayProperty=NAME&outputIdScheme=ID";
    } else {
    }
}

function validateDashboard() {

    //orgUnit Related
    var orgUnitList = document.getElementById('dropdown');
    var tempOrgUnitUid = orgUnitList.options[orgUnitList.selectedIndex].value;

    // indicator related
    var tempIndicatorList = document.getElementById('indicator');
    var tempIndicatorUid = tempIndicatorList.options[tempIndicatorList.selectedIndex].value;

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

    //else if (tempIndicatorUid == "base" || tempIndicatorUid == undefined) {
    //    alert("Please select Indicator");
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
    generateApiChart1(tempOrgUnitUid, tempYearUid);
    generateApiChart2(tempOrgUnitUid, tempYearUid);
    generateApiChart3(tempOrgUnitUid, tempYearUid);
    myFunction(tempOrgUnitUid, tempMonthUid, tempYearUid);
}

function myFunction(tempOrgUnitUid, tempMonthUid, tempYearUid) {
    createChart1(tempOrgUnitUid, tempMonthUid, tempYearUid);
    createChart2(tempOrgUnitUid, tempMonthUid, tempYearUid);
    createChart3(tempOrgUnitUid, tempMonthUid, tempYearUid);
}

function createChart1(tempOrgUnitUid, tempMonthUid, tempYearUid) {
    var count = tempMonthUid;
    $.getJSON(apiChart1, function (jsonRes) {
        var json = standardlizeData(jsonRes);
        var chartData = preparingDataforChart(json, count);

        createBarCharts("chart1", "chart1", "", chartData.xaxis, chartData.series);
    });
}

function createChart2(tempOrgUnitUid, tempMonthUid, tempYearUid) {

    var count = tempMonthUid * 3;
    $.getJSON(apiChart2, function (jsonRes) {
        var json = standardlizeData(jsonRes);
        var chartData = preparingDataforChart(json, count);

        createLineCharts("chart2", "char2", "", chartData.xaxis, chartData.series);
    });
}

function createChart3(tempOrgUnitUid, tempMonthUid, tempYearUid) {
    var count = tempMonthUid;
    $.getJSON(apiChart3, function (jsonRes) {
        var json = standardlizeData(jsonRes);
        json = swapAlternativePe(json);
        count = json.metaData.pe;
        var chartData = preparingDataforChart(json, count);
        createBarCharts("chart3", "chart3", "", chartData.xaxis, chartData.series);
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
                borderWidth: 0
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