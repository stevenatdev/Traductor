<?php
include 'config.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Methods: PUT,GET,POST,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header('ContentType:application/json; charset=utf-8');
$post = json_decode(file_get_contents('php://input'), true);
$respuesta = '';

if ($post['accion'] == 'cambiarClave') {
    $sql = sprintf("SELECT id FROM admin WHERE cedula = '%s' AND correo = '%s'", $post['cedula'], $post['correo']);
    $result = mysqli_query($mysqli, $sql);
    $row = mysqli_fetch_assoc($result);
    if ($row['id']) {
        $sql = sprintf("UPDATE admin SET password = '%s' WHERE id = '%s'", $post['password'], $row['id']);
        $result = mysqli_query($mysqli, $sql);
        if ($result) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'password cambiada correctamente'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al cambiar password'));
        }
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No existen personas registradas'));
    }
    echo $respuesta;
}

// Iniciar Sesión
if ($post['accion'] == 'login') {
    $sql = sprintf("SELECT * FROM admin WHERE cedula = '%s'", $post['cedula']);
    $result = mysqli_query($mysqli, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        if (password_verify($post['password'], $row['password'])) {
            $data[] = array(
                'id' => $row['id'],
                'nombre' => $row['nombre'] . ' ' . $row['apellido'],
            );
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Acceso exitoso', 'userSession' => $data));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Contraseña incorrecta'));
        }
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No existe una admin registrada con esa cédula'));
    }

    echo $respuesta;
}

// Registrar usuarios
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

if ($post['accion'] == 'actualizar') {
    $password_encriptada = password_hash($post['password'], PASSWORD_BCRYPT);
    $sql = sprintf(
        "UPDATE admin SET cedula = '%s', nombre = '%s', apellido = '%s', password = '%s', correo = '%s' WHERE id = '%s'",
        $post['cedula'],
        $post['nombre'],
        $post['apellido'],
        $password_encriptada,
        $post['correo'],
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

// Recuperar Contraseñas
if ($post['accion'] == 'cambiarPassword') {
    $sql = sprintf("SELECT id FROM admin WHERE cedula = '%s' AND correo = '%s' AND telefono = '%s'", $post['cedula'], $post['correo'], $post['telefono']);
    $result = mysqli_query($mysqli, $sql);
    $row = mysqli_fetch_assoc($result);
    if ($row['id']) {
        $password_encriptada = password_hash($post['password'], PASSWORD_BCRYPT);
        $sql = sprintf("UPDATE admin SET password = '%s' WHERE id = '%s'", $password_encriptada, $row['id']);
        $result = mysqli_query($mysqli, $sql);
        if ($result) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Contraseña cambiada correctamente'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al cambiar contraseña'));
        }
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No existen personas registradas'));
    }
    echo $respuesta;
}

// Traductor
if ($post['accion'] == 'translate') {
    $text = $post['text'];
    $from = $post['from'];

    if ($from === 'shuar') {
        // Buscar la traducción de Shuar a Español
        $sql = sprintf("SELECT espanol FROM translations WHERE shuar = '%s'", mysqli_real_escape_string($mysqli, $text));
        $result = mysqli_query($mysqli, $sql);
        if ($result) {
            $row = mysqli_fetch_assoc($result);
            if ($row) {
                $respuesta = array('estado' => true, 'translation' => $row['espanol']);
            } else {
                $respuesta = array('estado' => false, 'mensaje' => 'No se encontró la traducción.');
            }
        } else {
            $respuesta = array('estado' => false, 'mensaje' => 'Error en la consulta.');
        }
    } else if ($from === 'espanol') {
        // Buscar la traducción de Español a Shuar
        $sql = sprintf("SELECT shuar FROM translations WHERE espanol = '%s'", mysqli_real_escape_string($mysqli, $text));
        $result = mysqli_query($mysqli, $sql);
        if ($result) {
            $row = mysqli_fetch_assoc($result);
            if ($row) {
                $respuesta = array('estado' => true, 'translation' => $row['shuar']);
            } else {
                $respuesta = array('estado' => false, 'mensaje' => 'No se encontró la traducción.');
            }
        } else {
            $respuesta = array('estado' => false, 'mensaje' => 'Error en la consulta.');
        }
    } else {
        $respuesta = array('estado' => false, 'mensaje' => 'Idioma no válido.');
    }

    echo json_encode($respuesta);
} else {
    echo json_encode(array('estado' => false, 'mensaje' => 'Acción no válida.'));
}

// Incompleto seguir viendo la clase
if ($post['accion'] == 'consultar') {
    $sql = sprintf("SELECT * FROM admin");
    $result = mysqli_query($mysqli, $sql);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = array(
                'id' => $row['id'],
                'cedula' => $row['cedula'],
                'nombre' => $row['nombre'],
                'apellido' => $row['apellido']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'admin' => $data));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No existen personas registradas'));
    }
    echo $respuesta;
}

if ($post['accion'] == 'datosPersona') {
    $sql = sprintf("SELECT * FROM admin WHERE id = '%s'", $post['id']);
    $result = mysqli_query($mysqli, $sql);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = array(
                'id' => $row['id'],
                'cedula' => $row['cedula'],
                'nombre' => $row['nombre'],
                'apellido' => $row['apellido'],
                'correo' => $row['correo'],
                'password' => $row['password']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'user' => $data));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No existen personas registradas'));
    }
    echo $respuesta;
}
