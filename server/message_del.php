<?php
  require_once('./mysqli_connect.php');

  $query = "DELETE FROM messages WHERE id = ?";
  $stmt = $dbc->prepare($query);
  $stmt->bind_param('i', $_POST['message_id']);
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
