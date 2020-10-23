$(document).ready(()=>{
    
     

    $.getJSON('datos.json', (data)=> {
        let clientes = data;

        $('#formulario').submit((e)=>{
            e.preventDefault();
            const busqueda = $('#busqueda_rut').val();

            $('#mensaje').removeClass('mensaje').addClass('hidden');
            $('#datos_cliente').text('');

            const resultado = clientes.filter((item)=>{
                return (item.rut === busqueda);
            });

            if (Object.keys(resultado).length>=1){
                $('#datos_cliente').text(resultado[0].nombres + ' ' + resultado[0].apellidos);

                $.each(resultado, (index, item)=>{
                    const productos = item.productos;

                    let salida = '';

                    $.each(productos, (index, item)=>{

                        $('tr#creado').remove();
                        
                        salida += `
                            <tr id="creado">
                                <td class="col-1">${item.nombre}</td>
                                <td class="col-2">${item.linea_aprobada}</td>
                                <td class="col-3">${item.linea_disponible}</td>
                                <td class="col-4"><input type="text"></td>
                            </tr>
                            `
                    })

                    $('#tabla1').after(salida);
                })

            }else{
                $('#mensaje').removeClass('hidden').addClass('mensaje');
            }
        });

    }).fail(()=> {
        console.log('Error al leer archivo JSON');
    });
})