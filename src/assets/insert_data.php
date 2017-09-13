<?php
header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"));
$username = $data->name;
$useremail = $data->email;
$userpassword = $data->password;

// echo  'In PHP name '.$data->name;
// echo  'In PHP email'.$data->email;
// echo  'In PHP password '.$data->password;

//inserting into database

// Create connection
$conn = new mysqli('localhost', 'username', 'password', 'database_name');
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// echo "Connected successfully";

$sql2 = "SELECT `email` FROM `registered_members` WHERE `email` = '".$useremail."'";

$result2 = $conn->query($sql2);

if ($result2->num_rows > 0) {
    // output data of each row
    echo json_encode(array("data"=>'',"message"=>"error"));
}
else {
    $sql = "INSERT INTO `registered_members`(`name`, `email`, `password`) VALUES ('".$username."','".$useremail."','".$userpassword."')";
	// $result = $conn->query($sql);

	if ($conn->query($sql) === TRUE) {
		$last_id = $conn->insert_id;
	    // echo "Registration Successful. Your id is ".$last_id;
	    echo json_encode(array("data"=>'Registration Successful. Your id is '.$last_id,"message"=>"success"));
	} else {
	    echo json_encode(array("data"=>'',"message"=>"error"));
	}
}

$conn->close();

?>