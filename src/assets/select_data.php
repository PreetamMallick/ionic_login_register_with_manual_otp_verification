<?php
header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"));
$selectedEmail = $data->email;
$selectedPassword = $data->password;

// echo  'In PHP '.$selectedData;

//selecting perticular data from database

// Create connection
$conn = new mysqli('localhost', 'username', 'password', 'database_name');
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// echo "Connected successfully";
$sql = "SELECT `id`, `name`, `email`, `password` FROM `registered_members` WHERE `email` = '".$selectedEmail."' AND  `password` = '".$selectedPassword."'";

$result = $conn->query($sql);

$arr = [];

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        // echo $row["id"]." ".$row["name"]." ".$row["email"];

        //getting data in json encode format
        // $arr[] = $row;
        echo json_encode(array("data"=>$row,"message"=>"success"));
    }
}
else {
    echo json_encode(array("data"=>'',"message"=>"error"));
}

$conn->close();

?>