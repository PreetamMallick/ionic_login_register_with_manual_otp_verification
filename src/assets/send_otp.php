<?php
include('way2sms-api.php');
header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"));

$sendOtpTo = $data->sentOtp;
// echo  'In PHP Id'.$toUpdateId;
// echo  'In PHP Email'.$toUpdateEmail;

//generate random otp

function generatePIN($digits = 4){
    $i = 0; //counter
    $pin = ""; //our default pin is blank.
    while($i < $digits){
        //generate a random number between 0 and 9.
        $pin .= mt_rand(0, 9);
        $i++;
    }
    return $pin;
}

$pin = generatePIN();
// echo json_encode(array("otp_is"=>$pin,"otp_message"=>"this is the otp number"));

$res = sendWay2SMS('username_of_way2sms', 'password_of_way2sms', $sendOtpTo, $pin);
if (is_array($res))
    // echo $res[0]['result'] ? 'true' : 'false';
	echo json_encode(array("data"=>$res,"message"=>"message sent"));
else
    // echo $res;
	echo json_encode(array("data"=>$res,"message"=>"message not sent"));
exit;

?>