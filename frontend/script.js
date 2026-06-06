const API =
"/dinosaurios";

async function cargar(){

    const res = await fetch(API);
    const datos = await res.json();

    let html = "";

    datos.forEach(d => {

        html += `
        <div class="card">

        <h3>${d.nombre}</h3>

        <p>Especie:
        ${d.especie}</p>

        <p>Periodo:
        ${d.periodo}</p>

        <p>Dieta:
        ${d.dieta}</p>

        <button onclick="eliminar('${d._id}')">
        Eliminar
        </button>

        </div>
        `;
    });

    document.getElementById(
        "lista"
    ).innerHTML = html;
}

async function agregar(){

    const nombre =
    document.getElementById("nombre").value;

    const especie =
    document.getElementById("especie").value;

    const periodo =
    document.getElementById("periodo").value;

    const dieta =
    document.getElementById("dieta").value;

    await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":
            "application/json"
        },
        body:JSON.stringify({
            nombre,
            especie,
            periodo,
            dieta
        })
    });

    cargar();
}

async function eliminar(id){

    await fetch(API + "/" + id,{
        method:"DELETE"
    });

    cargar();
}

cargar();