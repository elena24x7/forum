<?php
  require_once('./mysqli_connect.php');

  $data;
  $username = $_POST['user'];
  $password = $_POST['pass'];
  $query = "SELECT
              *
            FROM
              users
            WHERE
              users.username = '$username'
            AND
              users.password = '$password'";

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
