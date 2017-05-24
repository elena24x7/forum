<?php
  require_once('./mysqli_connect.php');
  $table_messages = DB_TABLE_MESSAGES;

  $body = $_POST['body'];
  $poster = $_POST['poster'];
  $thread_id = $_POST['thread_id'];
  $reply_to = $_POST['reply_to'];
  $null_var = null;

  $query = "INSERT INTO
              `$table_messages`
            Values(?, ?, ?, ?, ?, ?)";

  $stmt = $dbc->prepare($query);
  $stmt->bind_param('isiiii', $null_var, $body, $null_var, $poster, $thread_id, $reply_to);
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
