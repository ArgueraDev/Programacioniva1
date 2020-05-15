<?php
include('../../Config/Config.php');
$informacion = new informacion($conexion);

$proceso = '';
if (isset($_GET['proceso']) && strlen($_GET['proceso']) > 0) {
    $proceso = $_GET['proceso'];
}
$informacion->$proceso($_GET['informacion']);
print_r(json_encode($informacion->respuesta));

class informacion
{
    private $datos = array(), $db;
    public $respuesta = ['msg' => 'correcto'];

    public function __construct($db)
    {
        $this->db = $db;
    }
    public function Agregar($idModerar)
    {
        $this->db->consultas('select * from moderar where idModerar="' . $idModerar . '"');
        $this->respuesta = $this->db->obtener_datos();
        $Da = $this->respuesta;
        $this->db->consultas('
                    INSERT INTO informacion (titulo,contenido,tipo,imagen) VALUES(
                        "' . $Da[0]['titulo'] . '",
                        "' . $Da[0]['contenido'] . '",
                        "' . $Da[0]['tipo'] . '",
                        "' . $Da[0]['imagen'] . '"
                    )
                ');
        $this->respuesta['msg'] = 'Registro guardado correctamente';
    }
    private function validar_datos()
    {
        if (empty(trim($this->datos['titulo']))) {
            $this->respuesta['msg'] = 'por favor ingrese un titulo';
        } else if (empty(trim($this->datos['contenido']))) {
            $this->respuesta['msg'] = 'por favor ingrese un contenido';
        }
        $this->almacenar_registro();
    }
    private function almacenar_registro()
    {
        if ($this->respuesta['msg'] === 'correcto') {
            if ($this->datos['accion'] === 'nuevo') {
                $this->db->consultas('
                    INSERT INTO informacion (titulo,contenido,tipo,imagen) VALUES(
                        "' . $this->datos['titulo'] . '",
                        "' . $this->datos['contenido'] . '",
                        "' . $this->datos['tipo'] . '",
                        "' . $this->datos['imagen'] . '"
                    )
                ');
                $this->respuesta['msg'] = 'Registro guardado correctamente';
            }
        }
    }
    public function buscarInformacion($valor = '')
    {
        $this->respuesta = [];
        $this->db->consultas('select * from informacion where tipo like "%Información General%" and  titulo like "%' . $valor . '%" or contenido like "%' . $valor . '%"
        ORDER BY idInformacion DESC');
        return $this->respuesta = $this->db->obtener_datos();
    }
    public function buscarbancaria($valor = '')
    {
        $this->respuesta = [];
        $this->db->consultas('select * from informacion where tipo like "%Información Bancaria%" and titulo like "%' . $valor . '%" or contenido like "%' . $valor . '%"
        ORDER BY idInformacion DESC');
        return $this->respuesta = $this->db->obtener_datos();
    }
    public function buscardiccionario($valor = '')
    {
        $this->respuesta = [];
        $this->db->consultas('select * from informacion where tipo like "%conceptos básicos%" and titulo like "%' . $valor . '%" or contenido like "%' . $valor . '%"
        ORDER BY idInformacion DESC');
        return $this->respuesta = $this->db->obtener_datos();
    }
}
