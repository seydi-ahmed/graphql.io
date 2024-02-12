export function barGraph(userXps) {
    google.charts.load("current", { packages: ["corechart"] });

    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ["Project", "XP", { role: "style" }],
            userXps[0],
            userXps[1],
            userXps[2],
            userXps[3],
            userXps[4],
            userXps[5],
            userXps[6],
            userXps[7],
            userXps[8],
            userXps[9]
        ]);

        var options = {
            title: "Your last ten projects with the most XP",
            width: 900,
            height: 400,
            bar: { groupWidth: "55%" },
            legend: { position: "none" },
        };

        var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));

        chart.draw(data, options);
    }

    const chartElement = document.createElement('div');

    chartElement.id = "barchart_values";

    chartElement.style.width = '900px';

    chartElement.style.height = '300px';
}
