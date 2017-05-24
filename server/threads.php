<?php
  require_once('./mysqli_connect.php');

  $data;
  $query = 'SELECT
              threads.id AS id,
              threads.title AS title,
              threads.date_created AS dateCreated,
              users.username AS poster,
              users.id AS posterId
            FROM
              threads
            LEFT JOIN
              users
            ON
              threads.original_poster = users.id';
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
