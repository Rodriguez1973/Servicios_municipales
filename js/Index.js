let serviciosMunicipales //Array que almacena los servicios municipales disponibles.
let serviciosContratados //Array que almacena los servicios contratados.


//--------------------------------------------------------------------------------------------------
//Creación de las referencias de los objetos del formulario.
const sFamiliaSeleccionada = document.getElementById('FamiliaSeleccionada')
const iFechaDesde = document.getElementById('fechaDesde')
const iContacto = document.getElementById('contacto')
const iTelefono = document.getElementById('telefono')
const iEmail = document.getElementById('email')
const lupa = document.getElementById('lupa')
const cuerpoServicios = document.getElementById('cuerpoServicios')
const cuerpoPedido = document.getElementById('cuerpoPedido')
const iTotal = document.getElementById('total')


//--------------------------------------------------------------------------------------------------
//Definición de eventos de los objetos.
lupa.addEventListener('click', leerServicios, false) //Evento click al pulsar sobre la lupa.
sFamiliaSeleccionada.addEventListener('change', mostrarServicios, false) //Evento change al cambiar la familia seleccionada.


//--------------------------------------------------------------------------------------------------
//Clase se los Servicios Municipales.
class ServicioMunicipal {
  //Constructor de objetos de la clase ServicioMunicipal.
  constructor(
    id, //Identificador.
    descripcion, //Descripción.
    tipo, //Tipo.
    direccion, //Dirección.
    latitud, //Latitud.
    longitud, //Longitud.
    precio, //Precio.
    duracion, //Duración.
  ) {
    this.id = id
    this.descripcion = descripcion
    this.tipo = tipo
    this.direccion = direccion
    this.latitud = latitud
    this.longitud = longitud
    this.precio = precio
    this.duracion = duracion
  }
}

//--------------------------------------------------------------------------------------------------
//Clase de los Servicios Contratados.
class ServicioContratado {
  //Constructor de objetos de la clase ServicioMunicipal.
  constructor(
    id, //Identificador.
    descripcion, //Descripción.
    precio, //Precio.
  ) {
    this.id = id
    this.descripcion = descripcion
    this.precio = precio
    this.cantidad = 0
    this.importe = 0
  }
}


//--------------------------------------------------------------------------------------------------
//Función que lee los registros de la base de datos.
function leerServicios() {
  serviciosMunicipales = new Array() //Iniciliza el array de serviciosMunicipales.
  serviciosContratados = new Array() //Iniciliza el array de serviciosContratados.
  //Nueva transacción soble la base de datos.
  instanciaDB.transaction(function (tran) {
    //Realiza la consulta con todos los campos de la tabla servicios.
    tran.executeSql('Select * from Servicios', [], function (tran, resultados) {
      //Bucle que recorre todos los registros leídos.
      for (let indice = 0; indice < resultados.rows.length; indice++) {
        //Crea un servicio municipal por cada registro.
        let servicio = new ServicioMunicipal(
          resultados.rows[indice].Id,
          resultados.rows[indice].Descripcion,
          resultados.rows[indice].Tipo,
          resultados.rows[indice].Direccion,
          resultados.rows[indice].Latitud,
          resultados.rows[indice].Longitud,
          resultados.rows[indice].Precio,
          resultados.rows[indice].Duracion,
        )
        serviciosMunicipales.push(servicio)
      }
      mostrarServicios() //Muestra los servicios municipales en la tabla.
      cuerpoPedido.innerHTML = '' //Borra el contenido de la tabla servicios contratados.
    })
  })
}


//--------------------------------------------------------------------------------------------------
//Función que muestra los servicios municipales en la tabla servicios municipales disponibles.
function mostrarServicios() {
  cuerpoServicios.innerHTML = ''
  //Recorre todos los servicios municipales.
  for (const servicio of serviciosMunicipales) {
    let fila = document.createElement('tr') //Crea una fila.
    cuerpoServicios.appendChild(fila) //Añade la fila al cuerpo de la tabla de los servicios municipales disponibles.
    //Celda Id.
    let celda = document.createElement('td') //Crea la celda.
    cuerpoServicios.appendChild(celda) //Añade la celda a la fila.
    let input = document.createElement('input') //Crea elemento input
    input.type = 'button' //Define el tipo del input a button.
    celda.appendChild(input) //Añade el botón a la celda.
    input.value = servicio.id //Añade el identificador.
    input.addEventListener('click', copiarDatos, false) //Añade el evento click al botón.
    //Celda Descripción.
    celda = document.createElement('td') //Crea la celda.
    cuerpoServicios.appendChild(celda) //Añade una celda a la fila.
    celda.innerText = servicio.descripcion //Añade la descripción.
    //Celda Precio.
    celda = document.createElement('td') //Crea la celda.
    cuerpoServicios.appendChild(celda) //Añade una celda a la fila.
    celda.innerText = servicio.precio //Añade la descripción.
    //Celda Duración.
    celda = document.createElement('td') //Crea la celda.
    cuerpoServicios.appendChild(celda) //Añade una celda a la fila.
    celda.innerText = servicio.duracion //Añade la duración.
    //Celda Dirección.
    celda = document.createElement('td') //Crea la celda.
    cuerpoServicios.appendChild(celda) //Añade una celda a la fila.
    celda.innerText = servicio.direccion //Añade la direccion.
  }
}


//--------------------------------------------------------------------------------------------------
//Función que copia los datos a la tabla servicios contratados.
function copiarDatos(evt) {
  evt.target.disabled = true
  //Recupera el objeto correspondiente del array de serviciosMunicipales.
  let servicio = serviciosMunicipales[evt.target.value - 1]
  //Crea un nuevo servicio contratado.
  let servicioCont = new ServicioContratado(
    servicio.id,
    servicio.descripcion,
    servicio.precio,
  )
  serviciosContratados.push(servicioCont) //Lo añade al array.
  serviciosContratados.sort((a, b) => {
    //Ordena el array por el el id.
    return a.id - b.id
  })
  mostrarPosicion(servicio) //Muestra la posición del servicio contratado en el mapa.
  crearTablaContratados() //Crea la tabla de servicios contratados.
}

//--------------------------------------------------------------------------------------------------
//Function que crea la tabla de servicios contratados.
function crearTablaContratados() {
  cuerpoPedido.innerHTML=""
  //Por cada servicio contratado
  for (contratado of serviciosContratados) {
    let fila = document.createElement('tr') //Crea una fila.
    cuerpoPedido.appendChild(fila) //Añade la fila al cuerpo de la tabla de los servicios contratados.
    let celda = document.createElement('td') //Crea una celda.
    fila.appendChild(celda) //Añade la celda a la fila.
    celda.innerText = contratado.id //Añade el identificador.
    celda = document.createElement('td') //Crea una celda.
    fila.appendChild(celda) //Añade la celda a la fila.
    celda.innerText = contratado.descripcion //Añade la descripción.
    celda = document.createElement('td') //Crea una celda.
    fila.appendChild(celda) //Añade la celda a la fila.
    celda.innerText = contratado.precio //Añade el precio.
    celda = document.createElement('td') //Crea una celda.
    let cantidad = document.createElement('input') //Añade un input a la celda.
    cantidad.type = 'number' //Define el input de tipo number.
    cantidad.min = 0 //Define el valor mínimo para el input de tipo number.
    cantidad.idContratado=contratado.id //Crea atributo para poder referenciarlo en el array.
    cantidad.addEventListener('change', calcularImporte, false) //Añade el evento change al input.
    cantidad.addEventListener('keyup', calcularImporte, false) //Añade el evento keyup al input.
    cantidad.addEventListener('focus', seleccionarContenido, false) //Añade el evento focus al input.
    cantidad.value = contratado.cantidad //Establece el valor inicial de la cantidad.
    celda.appendChild(cantidad) //Añade el input a la celda.
    fila.appendChild(celda) //Añade la celda a la fila.
    celda = document.createElement('td') //Crea una celda.
    celda.id="importe"+contratado.id  //Identificador para poder referenciar el elemento.
    fila.appendChild(celda) //Añade la celda a la fila.
    celda.innerText = contratado.importe  //Importe.
  }
}


//--------------------------------------------------------------------------------------------------
//Función para que calcula el importe.
function calcularImporte(evt) {
  //Si el evento es de tipo 'keyup' o 'change' en el input type number de cantidad.
  if (evt.type === 'keyup' || evt.type === 'change') {
    let indice=serviciosContratados.findIndex(contratado=>contratado.id===evt.target.idContratado) //Busca el indice del servicio contratado en el array serviciosContratados.
    let contratado=serviciosContratados[indice] //Onbtiene el servicio contratado.
    let cantidad = evt.target.value //Lee el valor del input de la cantidad.
    contratado.cantidad=cantidad  //Actualiza la cantidad.
    let celda = document.getElementById('importe' + contratado.id) //Obtiene la celda del importe.
    let importeAnterior = celda.innerText //Recopila el importe anterior.
    let importeActual = cantidad * contratado.precio //Importe de la cantidad del servicio contratado.
    contratado.importe=importeActual //Actualiza el importe.
    calcularTotal(importeAnterior, importeActual) //Actualiza el total.
    celda.innerText = importeActual //Actualiza el importe.
    serviciosContratados[indice]=contratado //Asigna el objeto en el indice del array una vez actualizado.
  }
}


//--------------------------------------------------------------------------------------------------
//Función que calcula el precio total.
function calcularTotal(importeAnterior, importeActual) {
  iTotal.value = iTotal.value - importeAnterior + importeActual
}

//--------------------------------------------------------------------------------------------------
//Función que selecciona el contenido de la celda cantidad al hacer focus sobre ella.
function seleccionarContenido(evt) {
  evt.target.select()
}