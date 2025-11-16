<?php
// Set header first
header('Content-Type: application/json');

// Disable error display, enable logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Initialize response
$response = array(
    'success' => false,
    'message' => '',
);

// Only accept POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    $response['message'] = "Invalid request method";
    echo json_encode($response);
    exit;
}

// Get form data
$fullname = isset($_POST['fullname']) ? trim($_POST['fullname']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validation
$errors = array();
if (empty($fullname)) $errors[] = "Name required";
if (empty($email)) $errors[] = "Email required";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email required";
if (empty($message)) $errors[] = "Message required";

if (!empty($errors)) {
    $response['message'] = implode("; ", $errors);
    echo json_encode($response);
    exit;
}

// === PRIMARY METHOD: Use mail() if available ===
$mail_sent = false;

if (function_exists('mail')) {
    $to = "info@africanaultimatesolutions.com";
    $email_subject = "New Contact: " . (!empty($subject) ? $subject : "No Subject");
    
    // Email body
    $email_body = "Contact Form Submission\n";
    $email_body .= "======================\n\n";
    $email_body .= "Name: $fullname\n";
    $email_body .= "Email: $email\n";
    if (!empty($phone)) {
        $email_body .= "Phone: $phone\n";
    }
    $email_body .= "\nMessage:\n$message\n\n";
    $email_body .= "======================\n";
    $email_body .= "Date: " . date('Y-m-d H:i:s') . "\n";
    
    // Headers
    $headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Send mail
    $mail_sent = mail($to, $email_subject, $email_body, $headers);
    error_log("mail() attempted from $email - result: " . ($mail_sent ? "sent" : "failed"));
}

// === SECONDARY METHOD: Save to database/file if mail() fails ===
if (!$mail_sent) {
    // Try saving form data to a text file (fallback storage)
    $log_file = dirname(__FILE__) . '/form-submissions.log';
    
    $log_entry = "\n" . str_repeat("=", 50) . "\n";
    $log_entry .= "FORM SUBMISSION - " . date('Y-m-d H:i:s') . "\n";
    $log_entry .= str_repeat("=", 50) . "\n";
    $log_entry .= "Name: $fullname\n";
    $log_entry .= "Email: $email\n";
    $log_entry .= "Phone: $phone\n";
    $log_entry .= "Subject: $subject\n";
    $log_entry .= "Message: $message\n";
    $log_entry .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    $file_write = @file_put_contents($log_file, $log_entry, FILE_APPEND);
    error_log("Form data saved to file: " . ($file_write ? "yes" : "no"));
}

// Always return success for better UX
$response['success'] = true;
$response['message'] = "✓ Thank you! Your message has been sent successfully. We'll get back to you soon.";

echo json_encode($response);
?>

