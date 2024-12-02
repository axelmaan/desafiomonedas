// script.js

document.getElementById('convertir').addEventListener('click', function() {
    const cantidad = document.getElementById('cantidad').value;
    const moneda = document.getElementById('moneda').value;
    
    if (cantidad === '') {
        alert('Por favor, ingresa una cantidad.');
        return;
    }

    fetch(`https://mindicador.cl/api/${moneda}`)
        .then(response => response.json())
        .then(data => {
            const valor = data.serie[0].valor;
            const conversion = (cantidad / valor).toFixed(2);
            document.getElementById('resultado').innerText = `Resultado: ${conversion} ${moneda === 'dolar' ? 'USD' : moneda === 'euro' ? 'EUR' : 'GBP'}`;
            mostrarGrafico(data.serie);
        })
        .catch(error => console.error('Error al obtener los datos:', error));
});

function mostrarGrafico(serie) {
    const ctx = document.getElementById('grafico').getContext('2d');
    const labels = serie.slice(0, 10).map(item => item.fecha.split('T')[0]).reverse();
    const data = serie.slice(0, 10).map(item => item.valor).reverse();

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valor de la moneda en los últimos 10 días',
                data: data,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Fecha'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Valor'
                    }
                }
            }
        }
    });
}
