<?php 
include('../../Config/Config.php');
$moderar = new moderar($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$moderar->$proceso( $_GET['moderar'] );
print_r(json_encode($moderar->respuesta));

class moderar{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];

    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($moderar){
        $this->datos = json_decode($moderar, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty(trim($this->datos['titulo'])) ){
            $this->respuesta['msg'] = 'por favor ingrese un titulo';
        } else if( empty(trim($this->datos['contenido'])) ){
            $this->respuesta['msg'] = 'por favor ingrese un contenido';
        } else if( empty(trim($this->datos['idLogin'])) ){
            $this->respuesta['msg'] = 'no hay ID';
        } else {
            $this->almacenar_registro();
        }
    }
    private function almacenar_registro(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO moderar (idLogin,titulo,contenido,fecha) VALUES(
                        "'. $this->datos['idLogin'] .'",
                        "'. $this->datos['titulo'] .'",
                        "'. $this->datos['contenido'] .'",
                        now()
                    )
                ');
                $this->respuesta['msg'] = 'Registro guardado correctamente';
            } 
        }
    }
    public function verContribucion(){
        $this->db->consultas('select login.nombre, moderar.titulo, moderar.contenido, moderar.fecha 
        from login, moderar where login.idLogin = moderar.idLogin');
        return $this->respuesta = $this->db->obtener_datos();
    }
    public function eliminarInformacion($idModerar=''){
        $this->db->consultas('
            delete moderar from moderar
            where moderar.idModerar = "'.$idModerar.'"
        ');
        $this->respuesta['msg'] = 'Registro eliminado correctamente';
    }
}
