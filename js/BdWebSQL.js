//Definiciones para la creación de la base de datos.
const nombreBD = 'dbMunicipio' //Nombre de la base de datos.
const numVersion = "1.0" //Número de versión.
const descripcion = 'Venta de servicios municipales por pedido' //Descripción de la base de datos.
const tamaño = 7 * 1024 * 1024 //Tamaño máximo de la base de datos 7MB.

//El método openDatabase crea el objeto de base de datos utilizando una base de datos existente o creando una nueva.
let instanciaDB = openDatabase(nombreBD, numVersion, descripcion, tamaño)

//Comprueba si la base de datos ha sido creada o no.
if (!instanciaDB) {
  alert('La base de datos ' + nombreBD + ' no ha sido creada.')
} else {
  
  //El método transaction nos da la capacidad de controlar una transacción y realizar confirmaciones o reversiones según la situación.
  //Transacción que elimina la tabla si existe por si los datos son corruptos.
  instanciaDB.transaction(function (tran) {
    //El método executeSql se utiliza para ejecutar una consulta SQL real
    tran.executeSql('DROP TABLE IF EXISTS Servicios')
  })

  //Transacción que crea la tabla.
  instanciaDB.transaction(function (tran) {
    tran.executeSql(
      'CREATE TABLE IF NOT EXISTS Servicios (Id varchar(6), Descripcion varchar(60), Tipo int, Direccion varchar(15), Latitud varchar(15), Longitud varchar(15), Precio float, Duracion int, PRIMARY KEY(Id) );',
      [],
      manejadorDatosNulos,
      manejadorErrores,
    )
    //[] Valores que se insertan dinamicamente en la consulta y sustituiran a ?.
    //manejadorDatosNulos. Función que se ejecuta si no hay errores en caso de creación de tablas e inserción de registros.
    //manejadorErrores. Función que se ejecuta al producirse un error en la consulta.
  })

  //Inserción de los registros iniciales en la base de datos.
  insertarRegistros()
}

//--------------------------------------------------------------------------------------------------
//Función que inserta los registros iniciales de la base de datos.
function insertarRegistros() {
  instanciaDB.transaction(function (tran) {
    tran.executeSql(
      'INSERT INTO Servicios (id , Descripcion, Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (1, "Aguas","Calle Aguas",1,"41.67087166806011","-3.6769533013330147",45,2)',
    )

    tran.executeSql(
      'INSERT INTO Servicios (id , Descripcion, Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (2, "Recogida mobiliario","Calle Mobiliario",2,"41.67052086444117","-3.679426747753496",45,2)',
    )

    tran.executeSql(
      'INSERT INTO Servicios (id , Descripcion, Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (3, "Recogida Obras","Calle Obras",2,"41.67124906228226","-3.679426747753496",45,2)',
    )

    tran.executeSql(
      'INSERT INTO Servicios (id , Descripcion, Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (4, "Ayuda domicilio","Calle domicilio",3,"41.671313539774864","-3.6784396948360154",45,2)',
    )

    tran.executeSql(
      'INSERT INTO Servicios (id , Descripcion, Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (5, "Alimentos","Calle Alimentos",2,"41.671432670094696","-3.6775965439301217",45,2)',
    )

    tran.executeSql(
      'INSERT INTO Servicios (id , Descripcion, Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (6, "Servicio Ancianos","Calle Ancianos",2,"41.67156889859186","-3.6776823746185983",45,2)',
    )

    tran.executeSql(
      'INSERT INTO Servicios (id , Descripcion, Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (7, "Guardia Urbana","Calle Urbana",2,"41.67077768357397","-3.6779139818690965",45,2)',
    )
  })
}

//--------------------------------------------------------------------------------------------------
//Función que se ejecuta si no hay errores en caso de creación de tablas e inserción de registros.
function manejadorDatosNulos() {
  console.log('Consulta SQL exitosa.')
}

//--------------------------------------------------------------------------------------------------
//Función que se ejecuta si se ha producido un error en la transacción.
function manejadorErrores(transaction, error) {
  alert(
    'Error al ejecutar una transacción en la base de datos.\nCódigo de error: ' +
      error.code +
      '\n' +
      error.message,
  )
}