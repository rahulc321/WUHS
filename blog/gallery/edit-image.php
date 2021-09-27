<?php
ob_start();
 require_once('../header.php');


 if(isset($_GET['deleteImage'])){
 	$ex= explode('-',$_GET['deleteImage']);
 	 
 	$sql = "DELETE FROM galery_images WHERE id=".$ex[0];
 	 
	if ($conn->query($sql) === TRUE) {
		header("location:edit-image.php?id=".$ex[1]);
	} else {
		header("location:edit-image.php?id=".$ex[1]);
	}
 }

if(isset($_POST['submit'])){


	 // Update data
	$sql = "UPDATE gallery SET title='".$_POST['title']."',created_at='".date('Y-m-d H:i:s')."' WHERE id=".$_GET['id'];

	if ($conn->query($sql) === TRUE) {
		if(!empty($_FILES['file']['name'])){
			for ($i=0; $i < count($_FILES['file']['name']) ; $i++) { 
				$target_path = __dir__.'/gimage/';  
				$target_path = $target_path.basename($_FILES['file']['name'][$i]);    
				move_uploaded_file($_FILES['file']['tmp_name'][$i], $target_path);

				$sql1 = "INSERT INTO galery_images (image_id,image,created_at)
				VALUES ('".$_GET['id']."','".$_FILES['file']['name'][$i]."','".date('Y-m-d H:i:s')."')";

				if ($conn->query($sql1) === TRUE) {
					//echo 'Success'; echo '<br>';
				}

			}
		}



	header("location:list-gallery.php?success=4");
	} else {
	header("location:list-gallery.php?success=2");
	} 



	}

	// Edit data from blog
	$sql1 = "SELECT * FROM gallery where id=".$_GET['id'];
	$result1 = $conn->query($sql1); 
	$row = $result1->fetch_assoc();


	$sql2 = "SELECT * FROM galery_images where image_id=".$row['id'];
	$result2 = $conn->query($sql2); 
	 

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
					<label for="text">Image</label>
					<input type="file" name="file[]" class="form-control" multiple>
					 
					<br>
					<br>
					
					<?php while($row2 = $result2->fetch_assoc()) { ?>
					<img src="<?=GALLERY.$row2['image']?>" style="width: 289px;
    border-radius: 10px;padding: 9px;">
    				<a href="?deleteImage=<?=$row2['id'].'-'.$row['id']?>" onclick="return confirm('Are you sure you want to delete this image?')" class="btn btn-danger">X</a>

    				<?php } ?>
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
a.btn.btn-danger {
    margin-left: -79px;
    margin-top: -106px;
    width: 67px;
}
</style>
 
<?php require_once('../footer.php');?>

 