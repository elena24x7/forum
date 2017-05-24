<?php
  require_once('./mysqli_connect.php');
  $table_users = DB_TABLE_USERS;

  $username = $_POST['user'];
  $password = $_POST['pass'];
  
  $query = "SELECT
              *
            FROM
              `$table_users` AS u
            WHERE
              u.username = '$username'
            AND
              u.password = '$password'";

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
