<?php

/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 */

session_start();

include('../../Config/Config.php');
$consulta = new consulta($conexion);

$proceso = '';
if (isset($_GET['proceso']) && strlen($_GET['proceso']) > 0) {
    $proceso = $_GET['proceso'];
}
$consulta->$proceso($_GET['consulta']);
print_r(json_encode($consulta->respuesta));
/**
 * @class consulta
 */
class consulta
{
    private $datos = array(), $db;
    public $respuesta = ['msg' => 'correcto'];

    public function __construct($db)
    {
        $this->db = $db;
    }
     /**
     * @function recibirDatos recibe los datos de las consultas
     * @param object $consulta representa los datos en si
     */
    public function recibirDatos($consulta)
    {
        $this->datos = json_decode($consulta, true);
        $this->validar_datos();
    }
    /**
     * @function validar_datos los datos recibidos pasan a ser validados
     */
    private function validar_datos()
    {
        if (empty(trim($this->datos['consulta']))) {
            $this->respuesta['msg'] = 'Por favor ingrese la consulta';
        } else if (empty(trim($this->datos['idLogin']))) {
            $this->respuesta['msg'] = 'Falta ID';
        }
        $this->almacenar_consulta();
    }
    /**
     * @function almacenar_datos guardamos los datos en la base de datos
     */
    private function almacenar_consulta()
    {
        if ($this->datos['accion'] === 'nuevo') {
            $this->db->consultas('
                    INSERT INTO consultas (idLogin,consulta,fecha) VALUES(
                        "' . $this->datos['idLogin'] . '",
                        "' . $this->datos['consulta'] . '",
                        now()
                    )
                ');
            $this->respuesta['msg'] = 'Envio Exitoso';
        }
    }
    /**
     * @function verConsultas muestra todas las consultas o peticiones que lo usuarios han realizado
     */
    public function verConsultas($valor = '')
    {
        $this->db->consultas('
            select login.nombre, consultas.consulta, consultas.fecha from consultas, login 
            where login.idLogin=consultas.idLogin ORDER BY idConsulta DESC
        ');
        return $this->respuesta = $this->db->obtener_datos();
    }
    /**
     * @function verVariable examina si el usuario esta activo o no
     */
    public function verVariable($valor = '')
    {
        if (isset($_SESSION['idLogin'])) {
            $this->respuesta['msg'] = 'Bienvenido';
        } else {
            $this->respuesta['msg'] = 'Registrese';
        }
    }
    /**
     * @function cerrar Cierra sesion del usuario
     */
    public function cerrar($valor = '')
    {
        session_destroy();
    }
    /**
     * @function idLogin obtenemos el id del usuario activo
     */
    public function idLogin($valor = '')
    {
        $this->db->consultas('select * from login where idLogin ="' . $_SESSION['idLogin'] . '"');
        $this->respuesta = $this->db->obtener_datos();
    }
}
?>
