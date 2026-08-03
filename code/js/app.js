const partidas = [
    {
        juego: "League of Legends",
        equipo1: "Dragons FC",
        equipo2: "Shadow Wolves",
        image: "https://logos-world.net/wp-content/uploads/2023/02/LoL-Symbol.png"
    },
    {
        juego: "Valorant",
        equipo1: "Cyber Ninjas",
        equipo2: "Pixel Titans",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version_%28cropped%29.png"
    },
    {
        juego: "Counter-Strike: Global Offensive",
        equipo1: "Omega Team",
        equipo2: "Dark Bots",
        image: "https://www.freepnglogos.com/uploads/counter-strike-png-logo/counter-strike-global-offensive-logo-png-0.png"
    }
];


let puntosActuales = 1000;
let historial = [];
let temaActual = 'default';
const maxCompra = 5000;


function cargarPuntos() {
    const puntosGuardados = localStorage.getItem('puntosArenaBet');
    if (puntosGuardados) {
        puntosActuales = parseInt(puntosGuardados);
    }
    document.getElementById('puntosActuales').textContent = puntosActuales;
    actualizarNivel();
}

function guardarPuntos() {
    localStorage.setItem('puntosArenaBet', puntosActuales);
}

function cargarHistorial() {
    const historialGuardado = localStorage.getItem('historialArenaBet');
    if (historialGuardado) {
        historial = JSON.parse(historialGuardado);
    }
}

function guardarHistorial() {
    localStorage.setItem('historialArenaBet', JSON.stringify(historial));
}

function renderizarPartidas() {
    const container = document.getElementById('partidasContainer');
    container.innerHTML = '';
    const filtro = document.getElementById('filtroJuego').value;
    const partidasFiltradas = filtro ? partidas.filter(p => p.juego === filtro) : partidas;

    partidasFiltradas.forEach((partida, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${partida.juego}</h5>
                    <p class="card-text">${partida.equipo1} vs ${partida.equipo2}</p>
                    <img src="${partida.image || 'https://via.placeholder.com/150'}" class="card-img-top mb-3" alt="${partida.juego}">
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    const filtroSelect = document.getElementById('filtroJuego');
    filtroSelect.innerHTML = '<option value="">Todos los Juegos</option>';
    const juegosUnicos = [...new Set(partidas.map(p => p.juego))];
    juegosUnicos.forEach(juego => {
        const option = document.createElement('option');
        option.value = juego;
        option.textContent = juego;
        filtroSelect.appendChild(option);
    });

    const partidaSelect = document.getElementById('partidaSelect');
    partidaSelect.innerHTML = '<option value="">Seleccionar Partida</option>';
    partidas.forEach((partida, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${partida.juego}: ${partida.equipo1} vs ${partida.equipo2}`;
        partidaSelect.appendChild(option);
    });
}


function actualizarNivel() {
    let nivel = 'Bronce';
    let progreso = 0;
    if (puntosActuales >= 4000) {
        nivel = 'Diamante';
        progreso = 100;
    } else if (puntosActuales >= 2500) {
        nivel = 'Oro';
        progreso = ((puntosActuales - 2500) / 1500) * 100;
    } else if (puntosActuales >= 1500) {
        nivel = 'Plata';
        progreso = ((puntosActuales - 1500) / 1000) * 100;
    } else {
        progreso = (puntosActuales / 1500) * 100;
    }
    document.getElementById('nivelActual').textContent = nivel;
    document.getElementById('barraProgreso').style.width = `${progreso}%`;
}


function validarApuesta(jugador, partidaIndex, equipo, puntos) {
    if (!jugador.trim()) return 'Nombre obligatorio';
    if (partidaIndex === '') return 'Seleccionar partida';
    if (equipo === '') return 'Seleccionar equipo';
    if (puntos <= 0) return 'Puntos deben ser mayores a 0';
    if (puntos > puntosActuales) return 'No tienes suficientes puntos';
    return null;
}


function simularGanador(partida) {
    return Math.random() < 0.5 ? partida.equipo1 : partida.equipo2;
}


function calcularResultado(equipoElegido, ganadorReal, puntosApostados) {

    let resultadoFinal;

    if (equipoElegido === ganadorReal) {
        resultadoFinal = {
            resultado: 'Ganó',
            ganancia: puntosApostados,
            tipo: 'win'
        };
    } else {
        resultadoFinal = {
            resultado: 'Perdió',
            ganancia: -puntosApostados,
            tipo: 'lose'
        };
    }

    return resultadoFinal;
}


function realizarApuesta(jugador, partidaIndex, equipo, puntos) {
    const error = validarApuesta(jugador, partidaIndex, equipo, puntos);
    if (error) {
        mostrarToast(error, 'danger');
        return;
    }

    const partida = partidas[partidaIndex];
    const ganadorReal = simularGanador(partida);
    const { resultado, ganancia } = calcularResultado(equipo, ganadorReal, puntos);

    puntosActuales += ganancia;
    if (puntosActuales < 0) puntosActuales = 0;
    verificarSinPuntos();
    guardarPuntos();

    const apuesta = {
        jugador,
        juego: partida.juego,
        partida: `${partida.equipo1} vs ${partida.equipo2}`,
        equipoElegido: equipo,
        ganadorReal,
        puntosApostados: puntos,
        resultado,
        ganancia,
        fecha: new Date().toLocaleString()
    };

    historial.push(apuesta);
    guardarHistorial();

    mostrarModalResultado(apuesta);
    renderizarHistorial();
    calcularRanking();
    actualizarNivel();
    document.getElementById('puntosActuales').textContent = puntosActuales;
}


// function mostrarModalResultado(apuesta) {
//     const texto = `Jugador: ${apuesta.jugador}<br> Juego: ${apuesta.juego}<br> Partida: ${apuesta.partida}<br> Equipo Elegido: ${apuesta.equipoElegido}<br>
//                    Ganador Real: ${apuesta.ganadorReal}<br> Resultado: ${apuesta.resultado}<br> Ganancia/Pérdida: ${apuesta.ganancia > 0 ? '+' : ''}${apuesta.ganancia} puntos`;
//     document.getElementById('resultadoTexto').innerHTML = texto;
//     const modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
//     modal.show();
// }


function mostrarModalResultado(apuesta) {

    const modalElement = document.getElementById('resultadoModal');
    const modalContent = document.querySelector('#resultadoModal .modal-content');
    const resultadoTexto = document.getElementById('resultadoTexto');

    modalContent.classList.remove('win-effect');
    modalContent.classList.remove('lose-effect');

    let mensajeCorto;

    if (apuesta.resultado === 'Ganó') {

        modalContent.classList.add('win-effect');

        mensajeCorto = `
            <div class="text-center">
                <h2 class="text-success">HAS GANADO</h2>
                <p>Equipo ganador: <strong>${apuesta.ganadorReal}</strong></p>
                <p>Puntos ganados: <strong>+${apuesta.puntosApostados}</strong></p>
            </div>
        `;

    } else {

        modalContent.classList.add('lose-effect');

        mensajeCorto = `
            <div class="text-center">
                <h2 class="text-danger">HAS PERDIDO</h2>
                <p>Equipo ganador: <strong>${apuesta.ganadorReal}</strong></p>
                <p>Puntos perdidos: <strong>${apuesta.ganancia}</strong></p>
            </div>
        `;
    }

    resultadoTexto.innerHTML = mensajeCorto;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
}

function mostrarToast(mensaje) {
    alert(mensaje);
}


function renderizarHistorial() {
    const body = document.getElementById('historialBody');
    body.innerHTML = '';
    const filtroResultado = document.getElementById('filtroResultado').value;
    const buscarJugador = document.getElementById('buscarJugador').value.toLowerCase();
    const ordenar = document.getElementById('ordenarGanancia').value;

    let historialFiltrado = historial.filter(a => {
        if (filtroResultado && a.resultado !== filtroResultado) return false;
        if (buscarJugador && !a.jugador.toLowerCase().includes(buscarJugador)) return false;
        return true;
    });

    if (ordenar === 'asc') {
        historialFiltrado.sort((a, b) => a.ganancia - b.ganancia);
    } else if (ordenar === 'desc') {
        historialFiltrado.sort((a, b) => b.ganancia - a.ganancia);
    }

    historialFiltrado.forEach(apuesta => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${apuesta.jugador}</td>
            <td>${apuesta.juego}</td>
            <td>${apuesta.partida}</td>
            <td>${apuesta.equipoElegido}</td>
            <td>${apuesta.ganadorReal}</td>
            <td>${apuesta.puntosApostados}</td>
            <td class="${apuesta.resultado === 'Ganó' ? 'text-success' : 'text-danger'}">${apuesta.resultado}</td>
            <td class="${apuesta.ganancia >= 0 ? 'text-success' : 'text-danger'}">${apuesta.ganancia > 0 ? '+' : ''}${apuesta.ganancia}</td>
            <td>${apuesta.fecha}</td>
        `;
        body.appendChild(row);
    });
}


function filtrarHistorial() {
    renderizarHistorial();
}


function calcularRanking() {
    const ranking = {};
    historial.forEach(apuesta => {
        if (!ranking[apuesta.jugador]) {
            ranking[apuesta.jugador] = { puntos: 0, apuestas: 0 };
        }
        ranking[apuesta.jugador].puntos += apuesta.ganancia;
        ranking[apuesta.jugador].apuestas += 1;
    });

    const rankingArray = Object.entries(ranking).map(([jugador, data]) => ({
        jugador,
        puntos: data.puntos,
        apuestas: data.apuestas
    })).sort((a, b) => b.puntos - a.puntos);

    renderizarRanking(rankingArray);
}


function renderizarRanking(ranking) {
    const list = document.getElementById('rankingList');
    list.innerHTML = '';
    ranking.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<strong>${index + 1}. ${item.jugador}</strong><br>   - Puntos: ${item.puntos}<br>    - Apuestas: ${item.apuestas}`;
        list.appendChild(li);
    });
}


function reiniciarJuego() {
    if (confirm('¿Estás seguro de reiniciar el juego? Se perderán todos los datos.')) {
        puntosActuales = 1000;
        historial = [];
        guardarPuntos();
        guardarHistorial();
        cargarPuntos();
        renderizarHistorial();
        calcularRanking();
        mostrarToast('Juego reiniciado', 'success');
    }
}

function cambiarTema() {
    const body = document.body;
    if (temaActual === 'default') {
        body.classList.add('tema-alternativo');
        temaActual = 'alternativo';
    } else {
        body.classList.remove('tema-alternativo');
        temaActual = 'default';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarPuntos();
    cargarHistorial();
    renderizarPartidas();
    renderizarHistorial();
    calcularRanking();
    verificarSinPuntos();

    document.getElementById('apuestaForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const jugador = document.getElementById('jugadorNombre').value;
        const partidaIndex = document.getElementById('partidaSelect').value;
        const equipo = document.getElementById('equipoSelect').value;
        const puntos = parseInt(document.getElementById('puntosApostar').value);
        realizarApuesta(jugador, partidaIndex, equipo, puntos);
    });

    document.getElementById('partidaSelect').addEventListener('change', () => {
        const partidaIndex = document.getElementById('partidaSelect').value;
        const equipoSelect = document.getElementById('equipoSelect');
        equipoSelect.innerHTML = '<option value="">Seleccionar Equipo</option>';
        if (partidaIndex !== '') {
            const partida = partidas[partidaIndex];
            const option1 = document.createElement('option');
            option1.value = partida.equipo1;
            option1.textContent = partida.equipo1;
            equipoSelect.appendChild(option1);
            const option2 = document.createElement('option');
            option2.value = partida.equipo2;
            option2.textContent = partida.equipo2;
            equipoSelect.appendChild(option2);
        }
    });

    document.getElementById('filtroJuego').addEventListener('change', renderizarPartidas);
    document.getElementById('filtroResultado').addEventListener('input', filtrarHistorial);
    document.getElementById('buscarJugador').addEventListener('input', filtrarHistorial);
    document.getElementById('ordenarGanancia').addEventListener('change', filtrarHistorial);
    document.getElementById('reiniciarBtn').addEventListener('click', reiniciarJuego);
    document.getElementById('temaBtn').addEventListener('click', cambiarTema);

    document.getElementById('numTarjeta').addEventListener('input', function (e) {
        let valor = e.target.value.replace(/\D/g, '');
        valor = valor.substring(0, 16);
        valor = valor.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = valor;
    });

    document.getElementById('fechaVencimiento').addEventListener('input', function (e) {
        let valor = e.target.value.replace(/\D/g, '');
        valor = valor.substring(0, 4);

        if (valor.length >= 3) {
            valor = valor.substring(0, 2) + '/' + valor.substring(2);
        }

        e.target.value = valor;
    });

    document.getElementById('cvv').addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
});

function validarTarjeta() {
    const numero = document.getElementById('numTarjeta').value.replace(/\s/g, '');
    const nombre = document.getElementById('nombreTitular').value.trim();
    const fecha = document.getElementById('fechaVencimiento').value;
    const cvv = document.getElementById('cvv').value;

    if (numero.length !== 16) {
        alert("Número de tarjeta inválido");
        return false;
    }

    if (nombre.length < 3) {
        alert("Nombre del titular inválido");
        return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(fecha)) {
        alert("Fecha inválida (MM/AA)");
        return false;
    }

    if (cvv.length < 3) {
        alert("CVV inválido");
        return false;
    }

    return true;
}

// function maspuntos() {

//     if (!validarTarjeta()) return;
//     const input = document.getElementById('cantidadPuntosComprar');
//     let cantidad = parseInt(input.value);

//     if (isNaN(cantidad) || cantidad <= 0) {
//         alert("Ingresa una cantidad válida de puntos");
//         return;
//     }

//     if (cantidad > maxCompra) {
//         alert("Superaste el máximo permitido de 5000 puntos por compra");
//         return;
//     }

//     puntosActuales += cantidad;

//     guardarPuntos();
//     actualizarNivel();
//     document.getElementById('puntosActuales').textContent = puntosActuales;

//     alert("Compra realizada con éxito. Has adquirido " + cantidad + " puntos.");

//     input.value = "";
//     ocultarAlertaSinPuntos();
// }

// function comprarPlan() {

//     if (!validarTarjeta()) return;

//     puntosActuales += carrito.puntos;

//     guardarPuntos();

//     actualizarNivel();

//     document.getElementById('puntosActuales').textContent = puntosActuales;

//     alert(
//         "Compra realizada con éxito.\n\n" +
//         "Has comprado " + carrito.puntos +
//         " puntos por $" + carrito.precio + " USD"
//     );

//     carrito = {
//         puntos: 0,
//         precio: 0
//     };

//     document.getElementById('carritoTexto').innerHTML =
//         'No has seleccionado ningún paquete';

//     document.getElementById('formCompra')
//         .classList.add('d-none');

//     ocultarAlertaSinPuntos();
// }


function maspuntos() {

    if (!validarTarjeta()) return;

    let totalPuntos = 0;

    carrito.forEach(item => {
        totalPuntos += item.puntos;
    });

    if (totalPuntos <= 0) {

        alert("No hay planes en el carrito");

        return;
    }

    puntosActuales += totalPuntos;

    guardarPuntos();

    actualizarNivel();

    document.getElementById('puntosActuales').textContent = puntosActuales;

    alert("Compra realizada con éxito");

    carrito = [];

    renderizarCarrito();

    ocultarAlertaSinPuntos();

    document.getElementById('formCompra').classList.add('d-none');

    document.getElementById('numTarjeta').value = "";
    document.getElementById('nombreTitular').value = "";
    document.getElementById('fechaVencimiento').value = "";
    document.getElementById('cvv').value = "";
}

function verificarSinPuntos() {
    const alerta = document.getElementById('alertaSinPuntos');

    if (puntosActuales <= 0) {
        alerta.classList.remove('d-none');
    } else {
        alerta.classList.add('d-none');
    }
}

function ocultarAlertaSinPuntos() {
    document.getElementById('alertaSinPuntos').classList.add('d-none');
}

function scrollToCarrito() {
    document.getElementById('carritoPuntos').scrollIntoView({
        behavior: "smooth"
    });
}

let carrito = [];

function agregarAlCarrito(plan, puntos, precio) {

    carrito.push({
        plan,
        puntos,
        precio
    });

    renderizarCarrito();

    mostrarToast(plan + " agregado al carrito");
}

function renderizarCarrito() {

    const lista = document.getElementById('carritoLista');

    lista.innerHTML = "";

    let totalPuntos = 0;
    let totalPrecio = 0;

    carrito.forEach((item, index) => {

        totalPuntos += item.puntos;
        totalPrecio += item.precio;

        lista.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">

                <div>
                    <strong>${item.plan}</strong><br>
                    ${item.puntos} puntos
                </div>

                <div>
                    $${item.precio}
                    <button
                        class="btn btn-sm btn-danger ms-2"
                        onclick="eliminarDelCarrito(${index})">
                        X
                    </button>
                </div>

            </div>
        `;
    });

    document.getElementById('totalPuntos').textContent = totalPuntos;
    document.getElementById('totalPrecio').textContent = totalPrecio;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    renderizarCarrito();
}

function mostrarFormularioCompra() {

    if (carrito.length === 0) {
        mostrarToast("El carrito está vacío");
        return;
    }

    document
        .getElementById('formCompra')
        .classList.remove('d-none');

    document
        .getElementById('formCompra')
        .scrollIntoView({
            behavior: 'smooth'
        });
}