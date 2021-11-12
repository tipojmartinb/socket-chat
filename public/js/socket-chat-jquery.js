var params = new URLSearchParams(window.location.search);

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//referencias de Jquery

var divUsuarios=$('#divUsuarios');
var formEnviar=$('#formEnviar');
var txtMensaje=$('#txtMensaje');
var divChatbox=$('#divChatbox');

//FUNCIONES PARA RENDERIZAR USUARIOS.

function renderizarUsuarios(personas){ //arreglo de objetos [{},{}]

    console.log(personas);

    var html='' ;
    html+='<li>';
    html+='<a href="javascript:void(0)" class="active"> Chat de <span>'+params.get('sala')+'</span></a>';
    html+='</li>';


    for (var i = 0;i<personas.length;i++){
        html+='<li>';
        html+='<a data-id="'+personas[i].id+'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+personas[i].nombre+'<small class="text-success">online</small></span></a>';
        html+='</li>';
    }

    divUsuarios.html(html);
}


function renderizarMensajes(mensaje,yo){
    let html = '';
    console.log(mensaje.fecha);
    var fecha = new Date(mensaje.fecha);
    var hora= fecha.getHours()+ ':' +fecha.getMinutes();

    var adminClass='info';

    if (mensaje.nombre==='Administrador'){
        adminClass='danger'
    }

    if (yo){ 
        html+='<li class="reverse">';
        html+='        <div class="chat-content">';
        html+='            <h5>'+mensaje.nombre+'</h5>';
        html+='            <div class="box bg-light-inverse">'+mensaje.mensaje+'</div>';
        html+='        </div>';
        html+='        <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html+='        <div class="chat-time">'+hora+'</div>';
        html+='</li>        ';
    
    }else{
        html+='<li class="animated FadeIn">';
        if (mensaje.nombre!=='Administrador'){
            html+='     <div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" /></div>';
        }
        html+='         <div class="chat-content">';
        html+='                 <h5>'+mensaje.nombre+'</h5>';
        html+='         <div class="box bg-light-'+adminClass+'">'+mensaje.mensaje+'</div>';
        html+='     </div>';
        html+='     <div class="chat-time">'+hora+'</div>';
        html+='</li>';
    }


    divChatbox.append(html);

}


//Listener de JQuery
divUsuarios.on('click','a',function(){
    id=$(this).data('id'); //el this hace referencia al elemto al que se detalla hacer click.
    console.log(id);
})

formEnviar.on('submit',function(e){ //e de Event 
    e.preventDefault();
    if (txtMensaje.val().trim().length===0){
        return;
    };
    //Enviar información
    socket.emit('crearMensaje', {
        nombre: params.get('nombre'),
        mensaje: txtMensaje.val(),
        }, function(mensaje) {
            txtMensaje.val('').focus();
            renderizarMensajes(mensaje,true);
            scrollBottom()
        });
})


$( document ).ready(function() {
    $('#chatRoomTitle').html(params.get('sala'));
    // Handler for .ready() called.
  });
