<?php
session_start();

/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 */

include('../../Config/Config.php');
$login = new login($conexion);

$proceso = '';
if (isset($_GET['proceso']) && strlen($_GET['proceso']) > 0) {
    $proceso = $_GET['proceso'];
}
$login->$proceso($_GET['login']);
print_r(json_encode($login->respuesta));

/**
 * @class login 
 */
class login
{
    private $datos = array(), $db;
    public $respuesta = ['msg' => 'correcto'];

    public function __construct($db)
    {
        $this->db = $db;
    }
    /**
     * @function recibirDatos recibe los datos del registro
     * @param object $login representa los datos en si
     */
    public function recibirDatos($login)
    {
        $this->datos = json_decode($login, true);
        $this->validar_datos();
    }
    /**
     * @function validar_datos valida los datos recibidos para verificar si son correctos
     */
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
    /**
     * @function almacenar_registro guardar los datos del nuevo usuario
     */
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
    /**
     * @function recibirUsuario recibe los datos para verificar sesion
     * @param object $login representa los datos en si
     */
    public function recibirUsuario($login)
    {
        $this->datos = json_decode($login, true);
        $this->validar_Us();
    }
    /**
     * @function validar_Us compruba que el correo y contraseña coinsidan para iniciar sesion
     */
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
                return $this->respuesta['msg'] = 'Correo y Contraseña no coinciden';
            } else {
                $_SESSION['idLogin'] = $this->respuesta[0]['idLogin'];
                return $this->respuesta['msg'] = 'Bienvenido';
            }
        }
    }
    /**
     * @function recibirCorreo recibe los datos para restablecer contraseña
     * @param mixed $correo representa el correo
     */
    public function recibirCorreo($correo)
    {
        $this->datos = json_decode($correo, true);
        $this->validar_correo();
    }
    /**
     * @function validar_correo valida el correo si coinside para proceder a guardar la nueva contraseña
     */
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
    /**
     * @function actualizar_contraseña cambia la contraseña del usuario
     */
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
    /**
     * @function verVariable controla que el usuario no se salte el inicio de sesion
     */
    public function verVariable($valor = '')
    {
        if (!isset($_SESSION['idLogin'])) {
            $this->respuesta['msg'] = 'Bienvenido';
        } else {
            $this->respuesta['msg'] = 'regrese';
        }
    }
    /**
     * @function cerrar cierra el inicio de sesion
     */
    public function cerrar($valor = '')
    {
        session_destroy();
    }
    /**
     * @function Modificar recibe los datos para modificar los datos del usuario
     * @param mixed $login representa el correo
     */
    public function Modificar($login)
    {
        $this->datos = json_decode($login, true);
        $this->validar_modificacion();
    }
    /**
     * @function validar_modificacion valida los datos ingresados
     */
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
    /**
     * @function aztualizar_usuario actualiza los datos ingresados del usuario
     */
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
    /**
     * @function usuario muestra todos los usuarios registrados
     */
    public function usuarios()
    {
        $this->db->consultas('select * from login');
        return $this->respuesta = $this->db->obtener_datos();
    }
}
?>