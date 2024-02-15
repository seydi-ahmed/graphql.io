export function donutGraph(auditDone, auditReceived) {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Done', auditDone],
            ['Received', auditReceived]
        ]);

        var options = {
            title: 'Your audits ratios' + auditReceived/auditDone,
            pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
    }
}
{/* <div id="donutchart" style="width: 900px; height: 500px;"></div> */}

