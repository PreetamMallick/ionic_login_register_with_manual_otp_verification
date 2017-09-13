<?php
header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"));

$toUpdateId = $data->id;
$toUpdateEmail = $data->email;
// echo  'In PHP Id'.$toUpdateId;
// echo  'In PHP Email'.$toUpdateEmail;

//selecting perticular data from database

// Create connection
$conn = new mysqli('localhost', 'username', 'password', 'database_name');
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// echo "Connected successfully";
$sql = "UPDATE `registered_members` SET `email`='".$toUpdateEmail."'  WHERE `id` = '".$toUpdateId."'";

if ($conn->query($sql) === TRUE) {
    echo "Email updated successfully";
} else {
    echo "Error updating email: " . $conn->error;
}

$conn->close();

?>