<?php

session_start();

include('../../Config/Config.php');
$login = new login($conexion);

$proceso = '';
if (isset($_GET['proceso']) && strlen($_GET['proceso']) > 0) {
    $proceso = $_GET['proceso'];
}
$login->$proceso($_GET['login']);
print_r(json_encode($login->respuesta));

class login
{
    private $datos = array(), $db;
    public $respuesta = ['msg' => 'correcto'];

    public function __construct($db)
    {
        $this->db = $db;
    }
    public function recibirDatos($login)
    {
        $this->datos = json_decode($login, true);
        $this->validar_datos();
    }
    private function validar_datos()
    {
        if (empty($this->datos['nombre'])) {
            $this->respuesta['msg'] = 'por favor ingrese el nombre';
        }
        if (empty($this->datos['correo'])) {
            $this->respuesta['msg'] = 'por favor ingrese el correo';
        }
        if (empty($this->datos['contraseña'])) {
            $this->respuesta['msg'] = 'por favor ingrese la contraseña';
        }
        $this->almacenar_registro();
    }
    private function almacenar_registro()
    {
        if ($this->respuesta['msg'] === 'correcto') {
            if ($this->datos['accion'] === 'nuevo') {
                $this->db->consultas('
                    INSERT INTO login (nombre,correo,contraseña) VALUES(
                        "' . $this->datos['nombre'] . '",
                        "' . $this->datos['correo'] . '",
                        "' . $this->datos['contraseña'] . '"
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            }
        }
    }
    public function recibirUsuario($login)
    {
        $this->datos = json_decode($login, true);
        $this->validar_Us();
    }
    private function validar_Us()
    {
        if (empty($this->datos['correo']) || empty($this->datos['contraseña'])) {
            $this->respuesta['msg'] = 'ingrese correo y contraseña';
        } else {

            $this->db->consultas('select * from login where correo="' . $this->datos['correo'] . '" and contraseña="' . $this->datos['contraseña'] . '" limit 1');
            $this->respuesta = $this->db->obtener_datos();
            if (empty($this->respuesta)) {
                $this->respuesta['msg'] = 'correo o contraseña incorrecto ';
            } else {
                $_SESSION['correo']= $this->datos['correo'];
                $this->respuesta['msg'] = 'Bienvenido';
            }
        }
    }

    public function recibirCorreo($correo)
    {
        $this->datos = json_decode($correo, true);
        $this->validar_correo();
    }
    private function validar_correo()
    {
        if (empty($this->datos['correo'])) {
            $this->respuesta['msg'] = 'por favor ingrese el correo';
        }
        if (empty($this->datos['contraseña'])) {
            $this->respuesta['msg'] = 'por favor ingrese la contraseña';
        }
        $this->actualizar_contraseña();
    }
    private function actualizar_contraseña()
    {
        if ($this->respuesta['msg'] === 'correcto') {
            if ($this->datos['accion'] === 'modificar') {
                $this->db->consultas('
                   UPDATE login SET
                        contraseña  = "' . $this->datos['contraseña'] . '",
                        correo   = "' . $this->datos['correo'] . '"
                    WHERE correo = "' . $this->datos['correo'] . '"
                ');
                $this->respuesta['msg'] = 'Contraseña Restablecida';
            }
        }
    }
}
