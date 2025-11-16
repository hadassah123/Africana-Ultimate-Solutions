<?php
// Simple test to check if mail() works on your server
header('Content-Type: text/html');

echo "<h2>Mail Configuration Test</h2>";
echo "<p>Testing if mail() function works on your QServer...</p>";

// Test 1: Check if function exists
if (function_exists('mail')) {
    echo "<p style='color: green;'>✓ mail() function is available</p>";
} else {
    echo "<p style='color: red;'>✗ mail() function is NOT available</p>";
    exit;
}

// Test 2: Try to send a test email
$to = "info@africanaultimatesolutions.com";
$subject = "Test Email from QServer - " . date('Y-m-d H:i:s');
$body = "This is a test email to verify mail() is working.\n\nTime: " . date('Y-m-d H:i:s');
$headers = "From: test@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$result = mail($to, $subject, $body, $headers);

if ($result) {
    echo "<p style='color: green;'>✓ Test email sent successfully to: $to</p>";
    echo "<p>Subject: $subject</p>";
    echo "<p>Check your inbox or spam folder at: $to</p>";
} else {
    echo "<p style='color: red;'>✗ Failed to send test email</p>";
}

// Test 3: Check PHP version
echo "<p><strong>Server Info:</strong></p>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>Server: " . $_SERVER['HTTP_HOST'] . "</p>";
echo "<p>Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "</p>";

// Test 4: Check sendmail path
if (ini_get('sendmail_path')) {
    echo "<p>Sendmail Path: " . ini_get('sendmail_path') . "</p>";
}
?>
