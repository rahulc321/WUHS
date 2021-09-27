<?php
$servername = "localhost";
$username = "elefaw8a_elefaw8";
$password = "elefaw8a_blog";
$dbname = "elefaw8a_blog";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

define("SITEURL", "http://elevensoft.in/wuhsphp/blog/blogimage/");
define("URL", "http://elevensoft.in/wuhsphp/blog/");

?>