<?php
  DEFINE('DB_USER', 'root');
  DEFINE('DB_PASS', 'root');
  DEFINE('DB_HOST', 'db');
  DEFINE('DB_NAME', 'forum');

  $json = file_get_contents("./config.json");
  $config = json_decode($json, true);

  DEFINE('DB_TABLE_MESSAGES', $config['table']['messages']);
  DEFINE('DB_TABLE_THREADS', $config['table']['threads']);
  DEFINE('DB_TABLE_USERS', $config['table']['users']);

  $dbc = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

  if ($dbc->connect_error) {
    die("Couldn't connect: " . $dbc->connect_error);
  };

  $dbc->set_charset("utf8");
?>
