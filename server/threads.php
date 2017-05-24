<?php
  require_once('./mysqli_connect.php');
  $table_threads = DB_TABLE_THREADS;
  $table_users = DB_TABLE_USERS;

  $query = "SELECT
              threads.id AS id,
              threads.title AS title,
              threads.date_created AS dateCreated,
              users.username AS poster,
              users.id AS posterId
            FROM
              `$table_threads` AS threads
            LEFT JOIN
              `$table_users` AS users
            ON
              threads.original_poster = users.id";

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
