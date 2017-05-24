<?php
  $json = file_get_contents("./config.json");
  $config = json_decode($json, true);

  DEFINE('DB_USER', $config['db']['user']);
  DEFINE('DB_PASS', $config['db']['pass']);
  DEFINE('DB_HOST', $config['db']['host']);
  DEFINE('DB_NAME', $config['db']['name']);
  DEFINE('DB_TABLE_MESSAGES', $config['table']['messages']);
  DEFINE('DB_TABLE_THREADS', $config['table']['threads']);
  DEFINE('DB_TABLE_USERS', $config['table']['users']);

  $dbc = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

  if ($dbc->connect_error) {
    die("Couldn't connect: " . $dbc->connect_error);
  };

  $dbc->set_charset("utf8");
?>
