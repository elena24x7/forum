<?php
  require_once('./mysqli_connect.php');
  $table_messages = DB_TABLE_MESSAGES;
  $table_users = DB_TABLE_USERS;

  $thread_id = $_GET['thread_id'];

  $query = "SELECT
              m1.id AS id,
              m1.body AS body,
              m1.date_posted AS datePosted,
              u.id AS posterId,
              u.username AS poster,
              u.fullname AS posterName,
              m2.id AS replyTo
            FROM
              `$table_messages` AS m1
            LEFT JOIN
              `$table_users` AS u
            ON
              u.id = m1.poster
            LEFT JOIN
              `$table_messages` AS m2
            ON
              m2.id = m1.reply_to
            WHERE
              m1.thread_id = '$thread_id'";

  $response = $dbc->query($query);

  $data; $index = 0;
  if ($response->num_rows > 0) {
    while ($row = $response->fetch_assoc()) {
      $data[$index++] = $row;
    }
  } else {
    $data = $dbc->error;
  }

  function buildTree(array $messages, $reply_to = null) {
    $branch = array();

    foreach ($messages as $message) {
      if ($message['replyTo'] == $reply_to) {
        $children = buildTree($messages, $message['id']);
        if ($children) {
          $message['replies'] = $children;
        }
        $branch[$message['id']] = $message;
        unset($message);
      }
    }

    return $branch;
  }

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  echo json_encode(buildTree($data));

  $dbc->close();
?>
