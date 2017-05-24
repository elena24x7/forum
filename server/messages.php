<?php
  require_once('./mysqli_connect.php');

  $data;
  $thread_id = $_GET['thread_id'];
  $query = "SELECT
              messages.id AS id,
              messages.body AS body,
              messages.date_posted AS datePosted,
              u1.id AS posterId,
              u1.username AS poster,
              u1.fullname AS posterName,
              u2.username AS replyToName
            FROM
              messages
            LEFT JOIN
              users AS u1
            ON
              u1.id = messages.poster
            LEFT JOIN
              users AS u2
            ON
              u2.id = messages.reply_to
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
