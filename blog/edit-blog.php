<?php
ob_start();
 require_once('header.php');

if(isset($_POST['submit'])){

	if($_FILES['file']['name']){
		$target_path = __dir__.'/blogimage/';  
		$fName= $_FILES['file']['name'];
		$target_path = $target_path.basename( $_FILES['file']['name']);   
	  
		if(move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {  
		    
		} else{  
		    
		}
	}else{
		$fName= $_POST['old_name'];
	}

	 


	 // Update data
	$sql = "UPDATE blog SET title='".$_POST['title']."',description='".$_POST['description']."',image='".$fName."',created_at='".date('Y-m-d H:i:s')."' WHERE id=".$_GET['id'];

	if ($conn->query($sql) === TRUE) {
	header("location:blog-list.php?success=4");
	} else {
	header("location:blog-list.php?success=2");
	} 

	}

	// Edit data from blog
	$sql1 = "SELECT * FROM blog where id=".$_GET['id'];
	$result1 = $conn->query($sql1); 
	$row = $result1->fetch_assoc();

	//echo '<pre>';print_r($row['title']);die;


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
					<input type="text" class="form-control" id="email" placeholder="Enter text" name="title" required="" value="<?=$row['title']?>">
					</div>

					<div class="form-group">
					<label for="text">Description</label>
					<textarea cols="80" rows="10" id="sample-editor" name="description"><?=$row['description']?></textarea>
					</div>

					<div class="form-group">
					<label for="text">Image</label>
					<input type="file" name="file" class="form-control">
					<input type="hidden" name="old_name" class="form-control" value="<?=$row['image']?>">
					<br>
					<img src="<?=SITEURL.$row['image']?>" style="width: 250px;
    border-radius: 10px;">
					</div>
					 
					<button type="submit" name="submit" class="btn btn-primary">Update</button>
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