<?php
  require_once('./mysqli_connect.php');
  $table_messages = DB_TABLE_MESSAGES;

  $message_id = $_POST['message_id'];

  $query = "DELETE FROM
              `$table_messages`
            WHERE
              id = ?";

  $stmt = $dbc->prepare($query);
  $stmt->bind_param('i', $message_id);
  $stmt->execute();

  $data;
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
