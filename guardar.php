<?php
header('Content-Type: application/json');

// Configuración (cambiar por tus datos reales)
$config = [
    'host' => 'localhost',
    'user' => 'usuario_db',
    'pass' => 'contraseña_db',
    'db'   => 'nombre_db'
];

try {
    $conn = new mysqli($config['host'], $config['user'], $config['pass'], $config['db']);
    
    if ($conn->connect_error) {
        throw new Exception("Error de conexión: " . $conn->connect_error);
    }

    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $conn->prepare("INSERT INTO consultas 
                           (nombre, fecha_nacimiento, sexo, motivo_consulta, historial_medico) 
                           VALUES (?, ?, ?, ?, ?)");
    
    $stmt->bind_param("sssss", 
        $data['nombre'],
        $data['fecha'],
        $data['sexo'],
        $data['motivo'],
        $data['historial']
    );

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Consulta guardada']);
    } else {
        throw new Exception("Error al guardar: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>