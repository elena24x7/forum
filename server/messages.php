<?php
  require_once('./mysqli_connect.php');

  $data;
  $query = 'SELECT * FROM messages';
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
