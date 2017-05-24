<?php
  require_once('./mysqli_connect.php');
  $table_threads = DB_TABLE_THREADS;

  $title = $_POST['title'];
  $original_poster = $_POST['original_poster'];
  $null_var = null;

  $query = "INSERT INTO
              `$table_threads`
            Values(?, ?, ?, ?)";


  $stmt = $dbc->prepare($query);
  $stmt->bind_param('isii', $null_var, $title, $original_poster, $null_var);
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
