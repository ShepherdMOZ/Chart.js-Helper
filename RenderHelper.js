var bgColorList= [
    'rgba(255, 99, 132, 0.9)',
    'rgba(54, 162, 235, 0.9)',
    'rgba(255, 206, 86, 0.9)',
    'rgba(75, 192, 192, 0.9)',
    'rgba(153, 102, 255, 0.9)',
    'rgba(255, 159, 64, 0.9)'
]

var borderColor= [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]

function addData(chart, label, data) {
    console.log(label, data)
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
        bgcolor = bgColorList[Math.floor(Math.random() * bgColorList.length)];
        dataset.backgroundColor.push(bgcolor);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}


function initChart(targetChart,chartType,chartTitle,CommData) {
    var myChart = new Chart(targetChart, {
        type: chartType,
        data: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [], 
            }]
        },
        options: {
            title: {
                display: true,
                text: chartTitle,
                fontSize: 18
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                    },
                }],
                yAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    loadChartData(myChart, CommData)
    console.log(myChart.data)
}

function loadChartData(chart, Commdata) {
    console.log(typeof chart)
    $.ajax({
        type: "POST",
        url: switchAggregateUrl(CommData.queryTypeId),
        data: CommData,
        success: function (data) {
            $.each(data, function (index, rec) {
                //console.log(rec.name, rec.count)
                addData(chart, rec.name, rec.count)
            })
        },
        error: function (xhr, type, exception) {
            // if ajax fails display error alert
            alert("ajax error response type " + type)
        }
    })
}