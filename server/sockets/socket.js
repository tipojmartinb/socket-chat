const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');    

const {crearMensaje} = require('../utils/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    //console.log('Usuario conectado',client.id);

    client.on('entrarChat', (usuario,funcCallback)=>{
        if (!usuario.nombre||!usuario.sala) {
            return funcCallback(
                {
                    error:true,
                    mensaje:'El nombre/sala es necesario',
                }
            )
        }  
        //Unir cliente a una sala
        client.join(usuario.sala);

        usuarios.agregarPersona(client.id,usuario.nombre,usuario.sala);

        client.broadcast.to(usuario.sala).emit('listaPersonas',usuarios.getPersonasPorSala(usuario.sala));
        client.broadcast.to(usuario.sala).emit('crearMensaje',crearMensaje('Administrador',`${usuario.nombre} entro`));

        funcCallback(usuarios.getPersonasPorSala(usuario.sala));
        //console.log('Usuario conectado',usuario,)
    });

    client.on ('crearMensaje',(data,funcCallBack)=>{
        let persona = usuarios.getPersona(client.id)
        let mensaje =crearMensaje(persona.nombre, data.mensaje);
        //console.log(mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje',mensaje);
        funcCallBack(mensaje);
    })

    client.on('disconnect',()=>{
        let personaBorrada=usuarios.borrarPersona(client.id);
        console.log('Usuario desconectado',usuarios.getPersonas());
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Administrador',`${personaBorrada.nombre} salio`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas',usuarios.getPersonasPorSala(personaBorrada.sala));
    })


    //Mensajes privados
    client.on('mensajePrivado',(data)=>{
        console.log(data.para);
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre, data.mensaje));

    })



});