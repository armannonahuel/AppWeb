// Validación de mails, cambio de paginas y envío de mail

$(document).ready(function(){
	
	$("#btn-amigo").click(function() {
		var checked = $('#respuesta').find ('input[name=elegir]:checked');
		var padre = $(checked).parent();
		var tituloDiv = $(padre).find('#titulo');
		var titulo = $(tituloDiv).find('h4').text();

		var imagen = $(padre).find('img').attr('src');

		var cajon = 'El Título del libro recomendado: '+ titulo + ', donde su portada se podrá ver desde la siguiente URL: '+ imagen;
		localStorage.setItem('recomendacion', cajon);
	
		location.href="Amigo.html"
	})

	$("#btn-compras").click(function() {
	 location.href="Compras.html"
	 
	})

	$("#btn-contacto").click(function() {
		 location.href="Contacto.html"
	})
	$("#btn-principal").click(function() {
		 location.href="Principal.html"
	})
	
	var completado = localStorage.getItem('recomendacion');
	$('#Mensaje').val(completado);


//Manejo de Chango
	var seleccionados = JSON.parse(localStorage.getItem('chango'));
	var recorrido = 0;
	var changoFinal = 0;
		$.each(seleccionados, function(i,value){
			muestra = seleccionados.shift();
			changoFinal = changoFinal + muestra[1];
			recorrido = recorrido + 1;
			
			$('#elementos').append('<div id = "obj"> <h2 >'+muestra[0]+'</h2><h3 >$'+ muestra[1]+'</h3><h5 > - '+ muestra[2]+'</h5><input type="button" class="boton" id="sacar'+recorrido+'" value="Eliminar"></div>');					
				
				$("#sacar"+recorrido+"").click(function() {
				$( "#obj" ).remove();

				changoFinal = changoFinal - muestra[1];		

						})

				})


		$("#btn-comprar").click(function(){
			var emptyTest = $('#elementos').is(':empty')
			if(emptyTest == false){
				alert("Felicitaciones, su compra fue realizada exitosamente");
				location.href="Principal.html"
				localStorage.clear();

			}

			else{
				alert("No ha realizado compras, se volverá a la Pagina Principal");
				location.href="Principal.html";
			}

				

					})


	
	

//Envio de mail
	$('#btn-enviarMail').click(function () {
		var destino = $("#Destino").val();
		var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


		if (destino == "" || !regex.test(destino)) {
			alert("Escriba un Mail Destino");
			return false
			}
		else{ 
		var completado = localStorage.getItem('recomendacion');
		var mail = $('#Destino').val();
		var nombre = $('#Nombre').val()+ " " + $('#Apellido').val();

		window.open('mailto:'+ mail + '?subject=Libro Recomendado&body= ' +  nombre + " " + completado);
	}
	})

})

// Manejo de página principal, filtrados y últimas búsquedas por localSorage

	$(document).ready(function(){
		var lista = [];
		var unidades = [];
		function agregar(item) {
			if (lista.length >= 5) {
				lista.shift();
			}
			lista.push(item);
			localStorage.setItem("guardar",JSON.stringify(lista));
		}

		function sumado(item,i) {
			unidades.push(item);
			localStorage.setItem("chango",JSON.stringify(unidades));
		}



		$("#btn-buscar").click(function(){
			
			$('#respuesta').empty();

			var categoria = $("#categoria").val();
			var autor = $("#autor").val();
			var nombre = $("#nombre").val();
			var carrito = $("#carrito").val();

				
			if(categoria!=""){

				$.getJSON( 'http://www.etnassoft.com/api/v1/get/?category='+categoria+'&num_items=15&callback=?', function ( results ) {
					var arreglo = results;
					var vuelta = 0;
					var sumatoria = 0;
					
					
					
					$.each(arreglo, function(i,value){
						var agregado = 0;
						var precio = Math.floor((Math.random() * 100) + 1);
						vuelta = vuelta+1;						
						$('#respuesta').append ('<div id ="item"><div id = "titulo" ><h4>'+ value.title+'</h4></div><img src = ' + value.thumbnail + '> <input type="radio" name="elegir"> Recomendar<br><h3 >$'+ precio +'</h3><input type="button" class="boton" id="botton'+vuelta+'" value="Comprar"> <input type="button" class="boton" id="borrar'+vuelta+'" value="Eliminar"></div>');
							
							$("#botton"+vuelta+"").click(function() {
								var almacenar = [];

								almacenar.push(value.title);
								almacenar.push(precio);
								almacenar.push(value.content_short);
								
								sumado(almacenar);			
								agregado = agregado + 1;
								sumatoria = sumatoria + precio;
								$("#carrito").html("<h4>$"+sumatoria+"</h4>");
								alert("Libro Agregado'"+value.title+"'");
								

								
								

						})
							$("#borrar"+vuelta+"").click(function() {
								if (agregado>0) {
									agregado = agregado - 1;
									sumatoria = sumatoria - precio;
									$("#carrito").html("<h4>$"+sumatoria+"</h4>");
									alert("Libro Eliminado '"+value.title+"'");
								}
								else{
									alert("El Libro '"+value.title+"' no se encuentra en el carrito")
								};
							})


					})
					
					agregar(categoria);
					pegarGuardado();
					$("#categoria").val('');
					


				});
			}
			if(autor != ""){
					$.getJSON( 'http://www.etnassoft.com/api/v1/get/?book_author='+autor+'&num_items=15&callback=?', function ( results ) {
					var arreglo = results;
					var vuelta = 0;
					var sumatoria = 0;
					$.each(arreglo, function(i,value){
						var agregado = 0;
						var precio = Math.floor((Math.random() * 100) + 1);
						vuelta = vuelta+1;	
						
						$('#respuesta').append ('<div id ="item"><div id = "titulo" ><h4>'+ value.title+'</h4></div><img src = ' + value.thumbnail + '> <input type="radio" name="elegir"> Recomendar<br><h3 >$'+ precio +'</h3><input type="button" class="boton" id="botton'+vuelta+'" value="Comprar"> <input type="button" class="boton" id="borrar'+vuelta+'" value="Eliminar"></div>');
						$("#botton"+vuelta+"").click(function() {
								var almacenar = [];

								almacenar.push(value.title);
								almacenar.push(precio);
								almacenar.push(value.content_short);
								
								sumado(almacenar);
								agregado = agregado + 1;
								sumatoria = sumatoria + precio;
								$("#carrito").html("<h4>$"+sumatoria+"</h4>");
								alert("Libro Agregado'"+value.title+"'");
							})
						$("#borrar"+vuelta+"").click(function() {
							if (agregado>0) {
								agregado = agregado - 1;
								sumatoria = sumatoria - precio;
								$("#carrito").html("<h4>$"+sumatoria+"</h4>");
								alert("Libro Eliminado '"+value.title+"'");
							}
							else{
								alert("El Libro '"+value.title+"' no se encuentra en el carrito")
								};
							})
						})
					agregar(autor);
					pegarGuardado();
					$("#autor").val('');
					});

			}
			if(nombre!=""){
						$.getJSON( 'http://www.etnassoft.com/api/v1/get/?book_title='+nombre+'&num_items=15&callback=?', function ( results ) {
						var arreglo = results;
						var vuelta = 0;
						var sumatoria = 0;
						$.each(arreglo, function(i,value){
							var agregado = 0;
							var precio = Math.floor((Math.random() * 100) + 1);
							vuelta = vuelta+1;
						$('#respuesta').append ('<div id ="item"><div id = "titulo" ><h4>'+ value.title+'</h4></div><img src = ' + value.thumbnail + '> <input type="radio" name="elegir"> Recomendar<br><h3 >$'+ precio +'</h3><input type="button" class="boton" id="botton'+vuelta+'" value="Comprar"> <input type="button" class="boton" id="borrar'+vuelta+'" value="Eliminar"></div>');
							$("#botton"+vuelta+"").click(function() {
								var almacenar = [];

								almacenar.push(value.title);
								almacenar.push(precio);
								almacenar.push(value.content_short);
								
								sumado(almacenar);
								agregado = agregado + 1;
								sumatoria = sumatoria + precio;
								$("#carrito").html("<h4>$"+sumatoria+"</h4>");
								alert("Libro Agregado'"+value.title+"'");
							})
							$("#borrar"+vuelta+"").click(function() {
								if (agregado>0) {
									agregado = agregado - 1;
									sumatoria = sumatoria - precio;
									$("#carrito").html("<h4>$"+sumatoria+"</h4>");
									alert("Libro Eliminado '"+value.title+"'");
								}
								else{
								alert("El Libro '"+value.title+"' no se encuentra en el carrito")
									};
								})

							})
							agregar(nombre);
							pegarGuardado();
							$("#nombre").val('');
						});
			}

			if(categoria == "" && nombre == "" && autor ==""){
				alert("Seleccione un filtro");
			}

			

			function pegarGuardado() {
				var i;
				var filtros = JSON.parse(localStorage.getItem ("guardar"));
				$('#guardado').empty();
				$('#guardado').append('<h3> Última Búsqueda');
				for (i in filtros) {
					$('#guardado').append('<div class = filtros> '+filtros[i]+'</div>');
				}
			}
						
			

		})

	});

//API GOOGLE

$(document).ready(function(){

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var lat = -34.923089;
    var lon = -57.956411;
    var latlon = new google.maps.LatLng(lat, lon);
    var mapa = document.getElementById('mapa')
    

    var myOptions = {
    center:latlon,zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }
    
    var map = new google.maps.Map(document.getElementById("mapa"), myOptions);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

getLocation();

	



});
    



	
