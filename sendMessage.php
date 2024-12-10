<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $token = "6607991168:AAGbA9DHsz6_dbuGLaG7L9mFhjU5WOkg7gY";
    $chat_id = "-1002150380466";
    $text = "Ім'я: $name\nТелефон: $phone\nПошта: $email\nПовідомлення: $message";

    $url = "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&text=" . urlencode($text);

    $response = file_get_contents($url);

    if ($response) {
        echo json_encode(["status" => "success", "message" => "Повідомлення успішно надіслано!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Помилка відправки повідомлення."]);
    }
}
?>
