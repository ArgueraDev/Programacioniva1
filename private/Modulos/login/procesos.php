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
        $this->db->consultas('select * from login where correo="' . $this->datos['correo'] . '" limit 1');
        $this->respuesta = $this->db->obtener_datos();
        if (empty(trim($this->datos['nombre']))) {
            $this->respuesta['msg'] = 'Por favor ingrese su nombre';
        } else if (empty(trim($this->datos['correo']))) {
            $this->respuesta['msg'] = 'Por favor ingrese un correo';
        } else if (strpos(trim($this->datos['correo']), '@') === false || strpos(trim($this->datos['correo']), '.') === false) {
            $this->respuesta['msg'] = 'Correo no Valido';
        } else if (!empty($this->respuesta)) {
            $this->respuesta['msg'] = 'Este Correo ya existe';
        } else if (empty(trim($this->datos['contraseña']))) {
            $this->respuesta['msg'] = 'Por favor ingrese una contraseña';
        } else {
            $this->almacenar_registro();
        }
    }
    private function almacenar_registro()
    {
        if ($this->datos['accion'] === 'nuevo') {
            $this->db->consultas('
                    INSERT INTO login (nombre,correo,contraseña,tipo,imagen) VALUES(
                        "' . $this->datos['nombre'] . '",
                        "' . $this->datos['correo'] . '",
                        "' . $this->datos['contraseña'] . '",
                        "usuario",
                        "' . $this->datos['imagen'] . '"
                    )
                ');
            $this->respuesta['msg'] = 'Registro insertado correctamente';
        }
    }
    public function recibirUsuario($login)
    {
        $this->datos = json_decode($login, true);
        $this->validar_Us();
    }
    private function validar_Us()
    {
        if (empty(trim($this->datos['correo']))) {
            $this->respuesta['msg'] = 'Ingrese su Correo';
        } else if (strpos(trim($this->datos['correo']), '@') === false || strpos(trim($this->datos['correo']), '.') === false) {
            $this->respuesta['msg'] = 'Correo no Valido';
        } else if (empty(trim($this->datos['contraseña']))) {
            $this->respuesta['msg'] = 'Ingrese su Contraseña';
        } else {
            $this->db->consultas('select * from login where correo="' . $this->datos['correo'] . '" and contraseña="' . $this->datos['contraseña'] . '" limit 1');
            $this->respuesta = $this->db->obtener_datos();
            if (empty($this->respuesta)) {
                $this->respuesta['msg'] = 'Correo y Contraseña no coinciden';
            } else {
                $_SESSION['correo'] = $this->datos['correo'];
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
        $this->db->consultas('select * from login where correo="' . $this->datos['correo'] . '" limit 1');
        $this->respuesta = $this->db->obtener_datos();
        if (empty(trim($this->datos['correo']))) {
            $this->respuesta['msg'] = 'por favor ingrese el correo';
        } else if (strpos(trim($this->datos['correo']), '@') === false || strpos(trim($this->datos['correo']), '.') === false) {
            $this->respuesta['msg'] = 'Correo no Valido';
        } else if (empty($this->respuesta)) {
            $this->respuesta['msg'] = 'Este Correo no existe';
        } else if (empty(trim($this->datos['contraseña']))) {
            $this->respuesta['msg'] = 'por favor ingrese la nueva contraseña';
        } else {
            $this->actualizar_contraseña();
        }
    }
    private function actualizar_contraseña()
    {
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

    public function verVariable($valor = '')
    {
        if (!isset($_SESSION['correo'])) {
            $this->respuesta['msg'] = 'Bienvenido';
        } else {
            $this->respuesta['msg'] = 'regrese';
        }
    }
    public function cerrar($valor = '')
    {
        session_destroy();
    }

    public function Modificar($login)
    {
        $this->datos = json_decode($login, true);
        $this->validar_modificacion();
    }
    private function validar_modificacion()
    {
        if (empty(trim($this->datos['nombre']))) {
            $this->respuesta['msg'] = 'por favor ingrese su Nombre';
        } else if (empty(trim($this->datos['contraseña']))) {
            $this->respuesta['msg'] = 'por favor ingrese la nueva contraseña';
        } else {
            $this->actualizar_usuario();
        }
    }

    private function actualizar_usuario()
    {
        $this->db->consultas('
                    UPDATE login SET
                        nombre      = "' . $this->datos['nombre'] . '",
                        contraseña  = "' . $this->datos['contraseña'] . '",
                        imagen      = "' . $this->datos['imagen'] . '"
                    WHERE idLogin   = "' . $this->datos['idLogin'] . '"
                ');
        $this->respuesta['msg'] = 'Usuario Actualizado';
    }
}
