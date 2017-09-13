<?php
// header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"));

$toDeleteId = $data->id;

echo $toDeleteId;

//selecting perticular data from database

// Create connection
$conn = new mysqli('localhost', 'username', 'password', 'database_name');
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// echo "Connected successfully";
$sql = "DELETE FROM `registered_members` WHERE `id` = '".$toDeleteId."'";

if ($conn->query($sql) === TRUE) {
    echo "Account deleted successfully";
} else {
    echo "Error delete account: " . $conn->error;
}

$conn->close();

?>