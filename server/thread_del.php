<?php
  require_once('./mysqli_connect.php');
  $table_threads = DB_TABLE_THREADS;

  $thread_id = $_POST['thread_id'];

  $query = "DELETE FROM
              `$table_threads`
            WHERE
              id = ?";

  $stmt = $dbc->prepare($query);
  $stmt->bind_param('i', $thread_id);
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
