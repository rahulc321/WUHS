<?php
$servername = "localhost";
$username = "root";
$password = "rahul";
$dbname = "blog";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

define("SITEURL", "http://localhost/wuhsphp/blog/blogimage/");
define("URL", "http://localhost/wuhsphp/blog/");
define("GALLERY", "http://localhost/wuhsphp/blog/gallery/gimage/");

?>