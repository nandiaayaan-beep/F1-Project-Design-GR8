<?php

$name = $_POST['name'];
$email = $_POST['email'];
$feedback = $_POST['feedback'];

$url = "https://tdoiwxffaoxexompcqmp.supabase.co/rest/v1/feedback";
$apiKey = "sb_publishable_YBxg6PdcA9I9_b5efyupmg_FbUI3fqg";

// Data to send
$data = [
  "name" => $name,
  "email" => $email,
  "feedback" => $feedback
];

// Setup request
$options = [
  "http" => [
    "header"  => "Content-Type: application/json\r\n" .
                 "apikey: $apiKey\r\n" .
                 "Authorization: Bearer $apiKey\r\n" .
                 "Prefer: return=minimal",
    "method"  => "POST",
    "content" => json_encode($data),
  ]
];

// Send request
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

// Response
if ($result === FALSE) {
    echo "Error saving data";
} else {
    echo "Feedback saved!";
}
?>