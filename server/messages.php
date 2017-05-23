<?php
  require_once('./mysqli_connect.php');

  $data;
  $thread_id = $_GET['thread_id'];
  $query = "SELECT
              messages.id AS id,
              messages.body AS body,
              messages.poster AS poster,
              messages.reply_to AS replyTo
            FROM
              messages
            LEFT JOIN
              users
            ON
              users.id = messages.reply_to
            WHERE
              messages.thread_id = '$thread_id'";
  $response = $dbc->query($query);

  $index = 0;
  if ($response->num_rows > 0) {
    while ($row = $response->fetch_assoc()) {
      $data[$index++] = $row;
    }
  } else {
    $data = $dbc->error;
  }

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  echo json_encode($data);

  $dbc->close();
?>
