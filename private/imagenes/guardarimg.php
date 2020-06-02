<?php
if (isset($_FILES["archivo"])) {
    $file = $_FILES["archivo"];
    $nombre = $file["name"];
    $tipo = $file["type"];

    $carpeta = "fotos/";

    $src = $carpeta . rand() . $nombre;
    $foto = $carpeta . basename($src);

    if (!move_uploaded_file($_FILES['archivo']['tmp_name'], $foto)) {
        echo $foto;
    } else {
        echo $foto;
    }
}
?>