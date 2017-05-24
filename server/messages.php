<?php
  require_once('./mysqli_connect.php');
  $table_messages = DB_TABLE_MESSAGES;
  $table_users = DB_TABLE_USERS;

  $thread_id = $_GET['thread_id'];
  
  $query = "SELECT
              m.id AS id,
              m.body AS body,
              m.date_posted AS datePosted,
              u1.id AS posterId,
              u1.username AS poster,
              u1.fullname AS posterName,
              u2.username AS replyToName
            FROM
              `$table_messages` AS m
            LEFT JOIN
              `$table_users` AS u1
            ON
              u1.id = m.poster
            LEFT JOIN
              `$table_users` AS u2
            ON
              u2.id = m.reply_to
            WHERE
              m.thread_id = '$thread_id'";

  $response = $dbc->query($query);

  $data; $index = 0;
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
