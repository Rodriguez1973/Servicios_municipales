# Servicios municipales.
Se trata de crear una aplicación desde la que los vecinos pueden contratar/solicitar los servicios que ofrece el ayuntamiento.<br>
<br>
Los datos de los servicios hay que crearlos en una base de datos WebSql .<br>
<br>
Base de datos.<br>
var myDBInstance = openDatabase('dbMunicipio', '1.0', 'Venta de servicios municipales por pedido', 7 * 1024 * 1024);<br>
<br>
Tabla.<br>
tran.executeSql('create table if not exists servicios (id  varchar(6), Descripcion varchar(60),Tipo int, Direccion varchar(15),Latitud varchar(15),Longitud varchar(15),Precio float,Duracion int,   PRIMARY KEY(Id) );', [], nullDataHandler, errorHandler);<br>
<br>
Registros.<br>
tran.executeSql('INSERT INTO  servicios (id , Descripcion, Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (1, "Aguas","Calle Aguas",1,"41.67087166806011","-3.6769533013330147",45,2)');<br>
tran.executeSql('INSERT INTO  servicios (id , Descripcion,  Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (2, "Recogida mobiliario","Calle Mobiliario",2,"41.67052086444117","-3.679426747753496",45,2)');<br>
tran.executeSql('INSERT INTO  servicios (id , Descripcion,  Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (3, "Recogida Obras","Calle Obras",2,"41.67124906228226","-3.679426747753496",45,2)');<br>
tran.executeSql('INSERT INTO  servicios (id , Descripcion,  Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (4, "Ayuda domicilio","Calle domicilio",3,"41.671313539774864","3.6784396948360154",45,2)');<br>
tran.executeSql('INSERT INTO  servicios (id , Descripcion,  Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (5, "Alimentos","Calle Alimentos",2,"41.671432670094696","-3.6775965439301217",45,2)');<br>
tran.executeSql('INSERT INTO  servicios (id , Descripcion, Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (6, "Servicio Ancianos","Calle Ancianos",2,"41.67156889859186","-3.6776823746185983",45,2)');<br>
tran.executeSql('INSERT INTO  servicios (id , Descripcion,  Direccion ,Tipo,Latitud ,Longitud ,Precio,Duracion ) values (7, "Guardia Urbana","Calle Urbana",2,"41.67077768357397","-3.6779139818690965",45,2)');<br>
<br>
Proceso.<br>
Al picar en la lupa cargar los Servicios Municipales disponibles (los registros de la tabla servicios).<br>
Al hacer clic en el botón Id de uno de los servicios, copiar sus datos a la tabla Servicios Contratados.<br>
En la tabla se podrá añadir la cantidad solicitada del servicio, calcular el importe , añadir al total del pedido.<br>

En el DIV del GoogleMaps<br>
&lt;div class="map_canvas" id="map_canvas"&gt;&lt;/div&gt;<br>
Visualizar la calle de la oficina del servicio a partir de los datos de latitud y longitud leídos en el registro de la base de datos correspondiente al servicio.<br>
<br>
Mas adelante se añadirá una segunda parte en la que se grabará la petición del servicio con los datos de la cabecera y el total del pedido en la tabla cabeceraPedido y en otra tabla  lineasPedido, se guardarán los detalles de los servicios contratados.<br>