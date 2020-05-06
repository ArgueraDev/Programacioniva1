<?php

session_start();

include('../../Config/Config.php');
$consulta = new consulta($conexion);

$proceso = '';
if (isset($_GET['proceso']) && strlen($_GET['proceso']) > 0) {
    $proceso = $_GET['proceso'];
}
$consulta->$proceso($_GET['consulta']);
print_r(json_encode($consulta->respuesta));

class consulta
{
    private $datos = array(), $db;
    public $respuesta = ['msg' => 'correcto'];

    public function __construct($db)
    {
        $this->db = $db;
    }
    public function recibirDatos($consulta)
    {
        $this->datos = json_decode($consulta, true);
        $this->validar_datos();
    }
    private function validar_datos()
    {
        if (empty(trim($this->datos['consulta']))) {
            $this->respuesta['msg'] = 'Por favor ingrese la consulta';
        }
        $this->almacenar_consulta();
    }
    private function almacenar_consulta()
    {
        $correo = $_SESSION['correo'];
        $this->db->consultas('select * from login where correo="' . $correo . '" limit 1');
        $resultado = $this->db->obtener_datos();
        if ($this->datos['accion'] === 'nuevo') {
            $this->db->consultas('
                    INSERT INTO consultas (idLogin,consulta) VALUES(
                        "' . $resultado['idLogin'] . '",
                        "' . $this->datos['consulta'] . '"
                    )
                ');
            $this->respuesta['msg'] = 'Envio Exitoso';
        }
    }
    public function verConsultas($valor = '')
    {
        $this->db->consultas('
            select * from consultas where consulta like "%' . $valor . '%"
        ');
        return $this->respuesta = $this->db->obtener_datos();
    }

    public function verVariable($valor = '')
    {
        if (isset($_SESSION['correo'])) {
            $this->respuesta['msg'] = 'Bienvenido';
        } else {
            $this->respuesta['msg'] = 'Registrese';
        }
    }
    public function cerrar($valor = '')
    {
        session_destroy();
    }
}
