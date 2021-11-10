class Usuarios {

    constructor(){
        this.personas = [];
    }

    agregarPersona(id,nombre,sala){
        let persona ={id,nombre,sala};

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id){
        //EL FILTER DEVUELVE UN ARREGLO CON LOS ITEMS QUE CUMPLAN CON LA CONDICION. YO SOLO REQUIERO EL PRIMERO.
        /*let persona = this.personas.filter(persona=>{
            return persona.id===id;
        })[0];*/

        //MAS OPTIMO
        let persona = this.personas.filter(perso=>perso.id ===id)[0];

        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala(sala){
        //-----
        let personasSala = this.personas.filter((perso)=>{
            return perso.sala === sala

        })

        return personasSala;

    }

    borrarPersona(id){
        //console.log('id',id);
        //console.log('personas',this.personas);
        let personaBorrada = this.getPersona(id);
        this.personas=this.personas.filter(pers =>{
            return pers.id !=id
        });
        //console.log('personas2',this.personas);
        return personaBorrada;
    }

}

module.exports={Usuarios}