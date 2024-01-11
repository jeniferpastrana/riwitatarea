
/// variables globales
let puntosEcologicos = [

    {
        piso: "3",
        no_aprovechables: 0,
        organicos: 0,
        aprovechables: 0

    },
    {
        piso: "4",
        no_aprovechables: 0,
        organicos: 0,
        aprovechables: 0

    },
    {
        piso: "5",
        no_aprovechables: 0,
        organicos: 0,
        aprovechables: 0

    }



]

let tipoCanecaAgregar;

///Selectores

const SelectPiso = document.getElementById("select_floor");
const canecas = document.querySelectorAll(".bowl")
const btnSubmit = document.getElementById("btnSubmit")



document.addEventListener("DOMContentLoaded", () => {
    const puntoCache =localStorage.getItem("puntosEcologicos")
    if(puntoCache){
        puntosEcologicos =JSON.parse(puntoCache)
    }
   pintarPuntoEcologico();
})

/// eventos y escuchadores de eventos
SelectPiso.addEventListener("input", () => {
    pintarPuntoEcologico();
})

btnSubmit.addEventListener("click", () => {
    const cantidad = document.getElementById("cantidad").value

    console.log(cantidad, SelectPiso.value, tipoCanecaAgregar)
    ///agregar la cantidad de desechos en su respestivo punto ecologicos
    //1// recorrear la  lista de puntos ecologicos

    puntosEcologicos.forEach(punto => {
        if (punto.piso === SelectPiso.value) {
            {
                punto[tipoCanecaAgregar] += parseInt(cantidad)
                pintarPuntoEcologico()

            }
        }
      
  

        

        //// cierro el modal 
        document.getElementById("btnCloseModal").click();


        /// limpiar el imput de cantidad////////////////////////////////
        document.getElementById("cantidad").value = "";






    })






})
canecas.forEach(caneca => {
    caneca.addEventListener("click", () => {

        /// abrrit elmodal
        document.getElementById("btnOpenModal").click()

        // obtener el atributo personalizado

        tipoCanecaAgregar = caneca.getAttribute("type-bowl")

    })
    console.log(puntosEcologicos)
})


/// funciones

function pintarPuntoEcologico() {


    const contadores = document.querySelectorAll(".bowl  span ")
    const cantidadAgregar = document.querySelector("#cantidad").value


    const cantiadaDeBasura = document.querySelectorAll(".mt-1")
    //1 RECORER LA LISTA DE PUNTO ECOLOGICOS

    puntosEcologicos.forEach(caneca => {
        if (caneca.piso === SelectPiso.value) {
            let cantidadDebasuraOrganico = document.querySelector("#organicos .body_top span")
            let cantidadDebasuraNoAprovechable = document.querySelector("#no_aprovechables .body_top span")
            let cantidadDebasuraAprovechable = document.querySelector("#aprovechables .body_top span")
            
            if (tipoCanecaAgregar == "aprovechables") {
                cantidadDebasuraAprovechable.innerHTML = `${caneca.aprovechables}/500`
            }

            if (tipoCanecaAgregar == "no_aprovechables") {
                cantidadDebasuraNoAprovechable.innerHTML = `${caneca.no_aprovechables}/500`
            } 
            
            if (tipoCanecaAgregar == "organicos") {
                cantidadDebasuraOrganico.innerHTML = `${caneca.organicos}/500`
            }

            ///  sacar el promedio del punto ecologico
            const suma = caneca.aprovechables + caneca.no_aprovechables + caneca.organicos;
                const promedio = (suma * 100) / 1500;

                if (promedio <= 25) {
                    document.body.style.background = "950101";

                } else if (promedio >= 25 && promedio < 50) {
                    document.body.style.background = " #fc4b08";
                }

        }


    })

    ///guardamos la informacion en el local storage
     localStorage.setItem("puntosEcologicos",JSON.stringify(puntosEcologicos))



}