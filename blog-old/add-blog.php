<?php
ob_start();
 require_once('header.php');

if(isset($_POST['submit'])){
	$target_path = __dir__.'/blogimage/';  
	$target_path = $target_path.basename( $_FILES['file']['name']);   
  
	if(move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {  
	    
	} else{  
	    
	}

	$sql = "INSERT INTO blog (title, description, image,created_at)
	VALUES ('".$_POST['title']."', '".$_POST['description']."', '".$_FILES['file']['name']."','".date('Y-m-d H:i:s')."')";

	if ($conn->query($sql) === TRUE) {
	header("location:blog-list.php?success=1");
	} else {
	header("location:blog-list.php?success=2");
	}  
}

?>


  <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
             
              <div class="card">
                
                <div class="card-body">
					<form action="" method="post" enctype="multipart/form-data">
					<div class="form-group">
					<label for="text">Title</label>
					<input type="text" class="form-control" id="email" placeholder="Enter text" name="title" required="">
					</div>

					<div class="form-group">
					<label for="text">Description</label>
					<textarea cols="80" rows="10" id="sample-editor" name="description"></textarea>
					</div>

					<div class="form-group">
					<label for="text">Image</label>
					<input type="file" name="file" class="form-control">
					</div>
					 
					<button type="submit" name="submit" class="btn btn-primary">Submit</button>
					</form>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
<style type="text/css">
	.form-group input[type=file] {
    opacity: 7 !important;
    position: initial !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
} 
</style>
<?php require_once('footer.php');?>

 <script src="https://cdn.ckeditor.com/4.15.1/standard/ckeditor.js"></script>
  <script>
  

    CKEDITOR.replace('sample-editor');
  </script>