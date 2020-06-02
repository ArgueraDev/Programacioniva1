<?php
include('../../Config/Config.php');
$moderar = new moderar($conexion);

$proceso = '';
if (isset($_GET['proceso']) && strlen($_GET['proceso']) > 0) {
    $proceso = $_GET['proceso'];
}
$moderar->$proceso($_GET['moderar']);
print_r(json_encode($moderar->respuesta));

class moderar
{
    private $datos = array(), $db;
    public $respuesta = ['msg' => 'correcto'];

    public function __construct($db)
    {
        $this->db = $db;
    }
    public function recibirDatos($moderar)
    {
        $this->datos = json_decode($moderar, true);
        $this->validar_datos();
    }
    private function validar_datos()
    {
        if (empty(trim($this->datos['titulo']))) {
            $this->respuesta['msg'] = 'por favor ingrese un titulo';
        } else if (empty(trim($this->datos['contenido']))) {
            $this->respuesta['msg'] = 'por favor ingrese un contenido';
        } else if (empty($this->datos['tipo'])) {
            $this->respuesta['msg'] = 'seleccione el tipo de información';
        } else {
            $this->almacenar_registro();
        }
    }
    private function almacenar_registro()
    {
        if ($this->respuesta['msg'] === 'correcto') {
            if ($this->datos['accion'] === 'nuevo') {
                $this->db->consultas('
                    INSERT INTO moderar (idLogin,titulo,contenido,tipo,imagen,fecha) VALUES(
                        "' . $this->datos['idLogin'] . '",
                        "' . $this->datos['titulo'] . '",
                        "' . $this->datos['contenido'] . '",
                        "' . $this->datos['tipo']['label'] . '",
                        "' . $this->datos['imagen'] . '",
                        now()
                    )
                ');
                $this->respuesta['msg'] = 'Gracias por su aporte';
            }
        }
    }
    public function verContribucion()
    {
        $this->db->consultas('select login.idLogin, moderar.idModerar, login.nombre, moderar.titulo, moderar.contenido, moderar.tipo,
        moderar.imagen, moderar.fecha 
        from login, moderar where login.idLogin = moderar.idLogin');
        return $this->respuesta = $this->db->obtener_datos();
    }

    public function Eliminar($idModerar = 0)
    {
        $this->db->consultas('delete moderar from moderar where idModerar ="' . $idModerar . '"');
        $this->respuesta['msg'] = "Registro eliminado ";
    }
}
?>