<?php
  DEFINE('DB_USER', 'root');
  DEFINE('DB_PASS', 'root');
  DEFINE('DB_HOST', 'db');
  DEFINE('DB_NAME', 'forum');

  $dbc = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

  if ($dbc->connect_error) {
    die("Couldn't connect: " . $dbc->connect_error);
  };

  $dbc->set_charset("utf8");
?>
