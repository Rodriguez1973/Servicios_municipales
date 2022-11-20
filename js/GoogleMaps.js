let mapa //Referencia del mapa.
let icono //Icono del mapa.
let latitud = 41.670141205551865 //Latitud de inicio de centrado del mapa.
let longitud = -3.689933230224045 //Longitud de inicio de centrado del mapa.
let marcadores = new Array()


//--------------------------------------------------------------------------------------------------
//Función de inicio. Representa el mapa en el contenedor de la interfaz.
function iniciaMapa() {
  mapa = new google.maps.Map(document.getElementById('map_canvas'), {
    // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
    center: new google.maps.LatLng(latitud, longitud), //El mapa se visualiza centrado en las coordenadas de latitud y longitud pasadas como argumento
    zoom: 17, //Zoom del mapa
    draggableCursor: 'auto', //El nombre o la URL del cursor que se muestra al desplazar el mouse sobre un mapa arrastrable.
    draggingCursor: 'crosshair', //El nombre o la URL del cursor que se muestra cuando se arrastra el mapa.
    mapTypeId: google.maps.MapTypeId.SATELLITE, //Tipo de mapa.
  })

  //------------------------------------------------------------------------------------------------
  //Referencia a un icono. Define sus propiedades.
  icono = {
    url: './images/Marcador_posicion.png', //Imagen del marcador de posición.
    scaledSize: new google.maps.Size(50, 50), //Tamaño escala.
    origin: new google.maps.Point(0, 0), //Origen imgen.
    anchor: new google.maps.Point(25, 50), //Punto de anclaje
  }
}


//--------------------------------------------------------------------------------------------------
//Función que muestra la una posicion en el mapa por sus coordenadas.
function mostrarPosicion(servicio) {
  borrarMarcadores()
  mapa.setCenter(new google.maps.LatLng(servicio.latitud, servicio.longitud))
  añadirMarcador(servicio)
}


//--------------------------------------------------------------------------------------------------
//Función que realiza el borrado de los marcadores. Para poder borrar los marcadores es necesario almacenarlos en un array.
function borrarMarcadores() {
  // Elimina los marcadores de una consulta anterior
  for (var i = 0; i < marcadores.length; i++) {
    marcadores[i].setMap(null)
  }
  marcadores = new Array() //Crea una nueva referancia.
}


//--------------------------------------------------------------------------------------------------
//Llamada a la función que inicia el mapa.
iniciaMapa() //Inicia el mapa.


//--------------------------------------------------------------------------------------------------
// Añadir un marcador al mapa.
function añadirMarcador(servicio) {
    let marcador = new google.maps.Marker({
      icon: icono,
      position: new google.maps.LatLng(servicio.latitud, servicio.longitud),
      map: mapa,
    })
    marcadores.push(marcador)
  }
