<?php
/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 */

/**
 * obtiene los datos de la iamgen a guardar
 */
if (isset($_FILES["archivo"])) {
    $file = $_FILES["archivo"];
    $nombre = $file["name"];
    $tipo = $file["type"];

    $carpeta = "fotos/";

    $src = $carpeta . rand() . $nombre;
    $foto = $carpeta . basename($src);
    /**
     * Guardar la imagen en los archivos de la app
     */
    if (!move_uploaded_file($_FILES['archivo']['tmp_name'], $foto)) {
        echo $foto;
    } else {
        echo $foto;
    }
}
?>