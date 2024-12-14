document.addEventListener('DOMContentLoaded', () => {
    const data1 = {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [{
            label: 'Consommation hebdomadaire (Wh)',
            data: [120, 150, 180, 200, 170, 90, 100],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const data2 = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
        datasets: [{
            label: 'Consommation mensuelle (kWh)',
            data: [300, 400, 500, 350, 450, 380],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    const ctx1 = document.getElementById('consumption-chart-1').getContext('2d');
    const ctx2 = document.getElementById('consumption-chart-2').getContext('2d');

    let chart1 = createChart(ctx1, 'bar', data1);
    let chart2 = createChart(ctx2, 'bar', data2);

    function createChart(ctx, type, data) {
        return new Chart(ctx, {
            type: type,
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    document.getElementById('graphique1').addEventListener('change', (event) => {
        const newType = event.target.value;
        chart1.destroy();
        chart1 = createChart(ctx1, newType, data1);
    });

    document.getElementById('graphique2').addEventListener('change', (event) => {
        const newType = event.target.value;
        chart2.destroy();
        chart2 = createChart(ctx2, newType, data2);
    });

    document.getElementById('consumption-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const object = document.getElementById('object').value;
        const consumption = Number(document.getElementById('consumption').value);

        if (date && object && consumption) {
            data1.labels.push(object);
            data1.datasets[0].data.push(consumption);

            chart1.update();

            const totalConsumption = data1.datasets[0].data.reduce((a, b) => a + b, 0);
            const averageConsumption = (totalConsumption / data1.datasets[0].data.length).toFixed(2);

            document.getElementById('total-consommation').textContent = totalConsumption;
            document.getElementById('cons-moyenne-quotidienne').textContent = averageConsumption;

            event.target.reset();
        }
    });
});
