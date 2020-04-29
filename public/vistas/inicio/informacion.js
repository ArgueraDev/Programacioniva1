var appInformacion = new Vue({
    el:'#frm-informacion',
    data:{
        informacion:{
            idInformacion  : 0,
            accion    : 'nuevo',
            titulo    : '',
            contenido : '',
            msg       : ''
        }
    },
    methods:{
        guardarInformacion(){
            fetch(`private/Modulos/informacion/procesos.php?proceso=recibirDatos&informacion=${JSON.stringify(this.informacion)}`).then( resp=>resp.json() ).then(resp=>{
                this.informacion.msg = resp.msg;
            });
        },
        LimpiarDatos(){
            this.informacion.idInformacion = 0;
            this.informacion.titulo = '';
            this.informacion.contenido = '';
            this.informacion.accion = 'nuevo';
            this.informacion.msg = "";
        }
    }
});