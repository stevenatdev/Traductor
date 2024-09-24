<?php
include 'config.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Methods: PUT,GET,POST,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header('ContentType:application/json; charset=utf-8');
$post = json_decode(file_get_contents('php://input'), true);
$respuesta = '';

if ($post['accion'] == 'login') {
    $sql = sprintf("SELECT * FROM admin WHERE cedula = '%s'", $post['cedula']);
    $result = mysqli_query($mysqli, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        if (password_verify($post['password'], $row['password'])) {
            $data[] = array(
                'idAdmin' => $row['id'],
                'nombre' => $row['nombre'] . ' ' . $row['apellido'],
            );
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Acceso exitoso', 'adminSession' => $data));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Contraseña incorrecta'));
        }
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No existe una admin registrada con esa cédula'));
    }

    echo $respuesta;
}

if ($post['accion'] == 'cambiarPassword') {
    $sql = sprintf("SELECT id FROM admin WHERE cedula = '%s' AND correo = '%s' AND telefono = '%s'", $post['cedula'], $post['correo'], $post['telefono']);
    $result = mysqli_query($mysqli, $sql);

    if (!$result) {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error en la consulta SQL'));
    } else {
        $row = mysqli_fetch_assoc($result);

        if ($row && isset($row['id'])) {
            // Encriptar la nueva contraseña
            $password_encriptada = password_hash($post['password'], PASSWORD_BCRYPT);

            // Actualizar la contraseña en la base de datos
            $sql_update = sprintf("UPDATE admin SET password = '%s' WHERE id = '%s'", $password_encriptada, $row['id']);
            $result_update = mysqli_query($mysqli, $sql_update);

            if ($result_update) {
                $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Contraseña cambiada correctamente'));
            } else {
                $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al cambiar Contraseña'));
            }
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No existen personas registradas'));
        }
    }

    echo $respuesta;
}

if ($post['accion'] == 'consultar') {
    $sql = sprintf("SELECT * FROM admin");
    $result = mysqli_query($mysqli, $sql);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = array(
                'id' => $row['id'],
                'cedula' => $row['cedula'],
                'nombre' => $row['nombre']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'admins' => $data));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No existen personas registradas'));
    }
    echo $respuesta;
}

if ($post['accion'] == 'totalAdmins') {
    $sql = sprintf("SELECT COUNT(*) AS total_admins FROM `admin`;");
    $result = mysqli_query($mysqli, $sql);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = array(
                'total_admins' => $row['total_admins']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'admins' => $data));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No existen personas registradas'));
    }
    echo $respuesta;
}

if ($post['accion'] == 'getAdmin') {
    $sql = sprintf("SELECT * FROM admin WHERE id = '%s'", $post['id']);
    $result = mysqli_query($mysqli, $sql);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data = array(
                'id' => $row['id'],
                'cedula' => $row['cedula'],
                'nombre' => $row['nombre'],
                'apellido' => $row['apellido'],
                'correo' => $row['correo'],
                'telefono' => $row['telefono'],
                'password' => $row['password']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'admin' => $data));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No existen personas registradas'));
    }
    echo $respuesta;
}

if ($post['accion'] == 'registrar') {
    // Verificamos si la cédula es válida
    if (!validarCedula($post['cedula'])) {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Cédula no válida'));
        echo $respuesta;
        exit;
    }

    // Verificamos si la cédula ya existe en la base de datos
    $consultar_cedula = sprintf("SELECT * FROM admin WHERE cedula = '%s'", $post['cedula']);
    $result_cedula = mysqli_query($mysqli, $consultar_cedula);

    if (mysqli_num_rows($result_cedula) > 0) {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'La cédula ya existe'));
    } else {
        // Verificamos si el correo ya existe en la base de datos
        $consultar_correo = sprintf("SELECT * FROM admin WHERE correo = '%s'", $post['correo']);
        $result_correo = mysqli_query($mysqli, $consultar_correo);

        if (mysqli_num_rows($result_correo) > 0) {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'El correo ya existe'));
        } else {
            // Verificamos si el teléfono ya existe en la base de datos
            $consultar_telefono = sprintf("SELECT * FROM admin WHERE telefono = '%s'", $post['telefono']);
            $result_telefono = mysqli_query($mysqli, $consultar_telefono);

            if (mysqli_num_rows($result_telefono) > 0) {
                $respuesta = json_encode(array('estado' => false, 'mensaje' => 'El teléfono ya existe'));
            } else {
                // Encriptamos la contraseña
                $password_encriptada = password_hash($post['password'], PASSWORD_BCRYPT);

                $sql = sprintf(
                    "INSERT INTO admin (cedula, nombre, apellido, password, correo, telefono) VALUES ('%s','%s','%s', '%s', '%s', '%s')",
                    $post['cedula'],
                    $post['nombre'],
                    $post['apellido'],
                    $password_encriptada, // Aquí usamos la contraseña encriptada
                    $post['correo'],
                    $post['telefono']
                );

                $result = mysqli_query($mysqli, $sql);
                if ($result) {
                    $respuesta = json_encode(array('estado' => true, 'mensaje' => 'El usuario ha sido registrado correctamente'));
                } else {
                    $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al registrar usuario'));
                }
            }
        }
    }

    echo $respuesta;
}

if ($post['accion'] == 'actualizar') {
    $password_encriptada = password_hash($post['password'], PASSWORD_BCRYPT);
    $sql = sprintf(
        "UPDATE admin SET cedula = '%s', nombre = '%s', apellido = '%s', password = '%s', correo = '%s', telefono = '%s' WHERE id = '%s'",
        $post['cedula'],
        $post['nombre'],
        $post['apellido'],
        $password_encriptada,
        $post['correo'],
        $post['telefono'],
        $post['id']
    );
    $result = mysqli_query($mysqli, $sql);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'El usuario se actualizo correctamente'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar usuario'));
    }
    echo $respuesta;
}

if ($post['accion'] == 'eliminar') {
    $sql = sprintf("DELETE FROM admin WHERE id = '%s'", $post['id']);
    $result = mysqli_query($mysqli, $sql);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Usuario eliminado correctamente'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar usuario'));
    }
    echo $respuesta;
}

// Función para validar la cédula ecuatoriana
function validarCedula($cedula)
{
    if (strlen($cedula) != 10) {
        return false;
    }

    $digito_region = substr($cedula, 0, 2);
    if ($digito_region < 1 || $digito_region > 24) {
        return false;
    }

    $ultimo_digito = substr($cedula, -1);
    $pares = 0;
    $impares = 0;

    for ($i = 0; $i < 9; $i++) {
        if ($i % 2 == 0) {
            $impar = (int)substr($cedula, $i, 1) * 2;
            if ($impar > 9) {
                $impar -= 9;
            }
            $impares += $impar;
        } else {
            $pares += (int)substr($cedula, $i, 1);
        }
    }

    $suma_total = $pares + $impares;
    $decena_superior = (ceil($suma_total / 10)) * 10;
    $digito_validador = $decena_superior - $suma_total;

    if ($digito_validador == 10) {
        $digito_validador = 0;
    }

    return $digito_validador == $ultimo_digito;
}

if ($post['accion'] == 'reportes_participaciones') {
    $sql = "SELECT puntajes.id AS id, users.nombre AS usuario, puntaje, desafio, fecha FROM `puntajes` INNER JOIN users ON users.id = puntajes.usuario_id GROUP BY users.nombre";
    $result = mysqli_query($mysqli, $sql);
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = array(
            'id' => $row['id'],
            'usuario' => $row['usuario'],
            'puntaje' => $row['puntaje'],
            'desafio' => $row['desafio'],
            'fecha' => $row['fecha']
        );
    }
    $respuesta = json_encode(array('estado' => true, 'reportes' => $data));
    echo $respuesta;
}

if ($post['accion'] == 'promedio_por_desafio') {
    $sql = "SELECT desafio, AVG(puntaje) AS promedio_puntaje FROM puntajes GROUP BY desafio";
    $result = mysqli_query($mysqli, $sql);
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = array(
            'desafio' => $row['desafio'],
            'promedio_puntaje' => $row['promedio_puntaje']
        );
    }
    $respuesta = json_encode(array('estado' => true, 'promedios' => $data));
    echo $respuesta;
}


if ($post['accion'] == 'total_participaciones') {
    $sql = "SELECT desafio, COUNT(*) AS total_participaciones FROM puntajes GROUP BY desafio";
    $result = mysqli_query($mysqli, $sql);
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = array(
            'desafio' => $row['desafio'],
            'total_participaciones' => $row['total_participaciones']
        );
    }
    $respuesta = json_encode(array('estado' => true, 'participaciones' => $data));
    echo $respuesta;
}

if ($post['accion'] == 'participaciones') {
    $sql = "SELECT COUNT(*) AS total_participaciones FROM puntajes";
    $result = mysqli_query($mysqli, $sql);
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = array(
            'participaciones' => $row['total_participaciones']
        );
    }
    $respuesta = json_encode(array('estado' => true, 'participacion' => $data));
    echo $respuesta;
}

if ($post['accion'] == 'distribucion_puntajes') {
    $sql = "SELECT puntaje, COUNT(*) AS cantidad FROM puntajes GROUP BY puntaje ORDER BY puntaje ASC";
    $result = mysqli_query($mysqli, $sql);
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = array(
            'puntaje' => $row['puntaje'],
            'cantidad' => $row['cantidad']
        );
    }
    $respuesta = json_encode(array('estado' => true, 'distribucion' => $data));
    echo $respuesta;
}

if ($post['accion'] == 'mejores_puntajes') {
    $sql = "SELECT desafio, MAX(puntaje) AS max_puntaje FROM puntajes GROUP BY desafio";
    $result = mysqli_query($mysqli, $sql);
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = array(
            'desafio' => $row['desafio'],
            'max_puntaje' => $row['max_puntaje']
        );
    }
    $respuesta = json_encode(array('estado' => true, 'mejores' => $data));
    echo $respuesta;
}

if ($post['accion'] == 'puntajes_resumen') {
    $sql = "SELECT desafio, MIN(puntaje) AS puntaje_minimo, MAX(puntaje) AS puntaje_maximo, AVG(puntaje) AS puntaje_promedio FROM puntajes GROUP BY desafio";
    $result = mysqli_query($mysqli, $sql);
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = array(
            'desafio' => $row['desafio'],
            'puntaje_minimo' => $row['puntaje_minimo'],
            'puntaje_maximo' => $row['puntaje_maximo'],
            'puntaje_promedio' => $row['puntaje_promedio']
        );
    }
    $respuesta = json_encode(array('estado' => true, 'resumen' => $data));
    echo $respuesta;
}

if ($post['accion'] == 'total_y_puntaje_general') {
    $sql = "SELECT COUNT(*) AS total_participaciones, SUM(puntaje) AS puntaje_total FROM puntajes";
    $result = mysqli_query($mysqli, $sql);
    $data = mysqli_fetch_assoc($result);
    $respuesta = json_encode(array('estado' => true, 'total_participaciones' => $data['total_participaciones'], 'puntaje_total' => $data['puntaje_total']));
    echo $respuesta;
}

if ($post['accion'] == 'participaciones_por_dia') {
    $sql = "SELECT DATE(fecha) AS dia, COUNT(*) AS participaciones FROM puntajes GROUP BY DATE(fecha) ORDER BY dia ASC";
    $result = mysqli_query($mysqli, $sql);
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = array(
            'dia' => $row['dia'],
            'participaciones' => $row['participaciones']
        );
    }
    $respuesta = json_encode(array('estado' => true, 'participaciones' => $data));
    echo $respuesta;
}
