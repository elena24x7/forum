<?php
  require_once('./mysqli_connect.php');

  $query = "INSERT INTO threads Values(?, ?, ?, ?)";
  $stmt = $dbc->prepare($query);
  $null_var = null;
  $stmt->bind_param('isii', $null_var,
                            $_POST['title'],
                            $_POST['original_poster'],
                            $null_var);
  $stmt->execute();
  if ($stmt->affected_rows == 1) {
    $data['status'] = 'ok';
  } else {
    $data = $dbc->error;
  }

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  echo json_encode($data);

  $stmt->close();
  $dbc->close();
?>
