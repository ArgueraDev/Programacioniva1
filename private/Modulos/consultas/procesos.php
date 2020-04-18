<?php 
include('../../Config/Config.php');
$consulta = new consulta($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$consulta->$proceso( $_GET['consulta'] );
print_r(json_encode($consulta->respuesta));

class consulta{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];

    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($consulta){
        $this->datos = json_decode($consulta, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'por favor ingrese su nombre';
        }
        if( empty($this->datos['consulta']) ){
            $this->respuesta['msg'] = 'por favor ingrese la consulta';
        }
        $this->almacenar_consulta();
    }
    private function almacenar_consulta(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO consultas (nombre,consulta) VALUES(
                        "'. $this->datos['nombre'] .'",
                        "'. $this->datos['consulta'] .'"
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            } 
        }
    }
    public function verConsultas($valor=''){
        $this->db->consultas('
            select * from consultas where nombre like "%'.$valor.'%" or consulta like "%'.$valor.'%"
        ');
        return $this->respuesta = $this->db->obtener_datos();
    }
}
?>