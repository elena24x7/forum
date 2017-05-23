<?php
  require_once('./mysqli_connect.php');

  $query = "INSERT INTO messages Values(?, ?, ?, ?, ?, ?)";
  $stmt = $dbc->prepare($query);
  $null_var = null;
  $stmt->bind_param('isiiii', $null_var,
                            $_POST['body'],
                            $null_var,
                            $_POST['poster'],
                            $_POST['thread_id'],
                            $_POST['reply_to']);
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
