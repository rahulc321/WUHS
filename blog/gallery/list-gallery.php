<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.11.2/css/jquery.dataTables.min.css"
<?php
ob_start();
 require_once('../header.php');

if(isset($_GET['delete'])){
	$sql = "DELETE FROM gallery WHERE id=".$_GET['delete'];

	if ($conn->query($sql) === TRUE) {
		header("location:list-gallery.php?success=3");
	} else {
		header("location:list-gallery.php?success=2");
	}
}

?>

  <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
            <?php if(@$_REQUEST['success']==1){ ?>
			<div class="alert alert-success">
			You have Successfully Added.. !!!
			</div>
			<?php }elseif(@$_REQUEST['success']==3){ ?>
			<div class="alert alert-danger">
			You have Successfully Deleted !!!
			</div>

			<?php }elseif(@$_REQUEST['success']==4){ ?>
			<div class="alert alert-success">
			You have Successfully Updated !!!
			</div>

			<?php }elseif(@$_REQUEST['success']==2){ ?>
			<div class="alert alert-warning">
			Please Try Again.. !!!
			</div>
			<?php } ?>


            <a href="<?=URL?>gallery/add-image.php" class="btn btn-success" style="float: right;">Add Image</a>
              <div class="card">
                
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table" id="table_id">
                      <thead class=" text-primary">
                         <th>Title</th>
                          
                         <th>Date</th>
                         <th>Action</th>
                      </thead>
                      <tbody>
                      <?php 
						$sql = "SELECT * FROM gallery";
						$result = $conn->query($sql);

						if ($result->num_rows > 0) {
						while($row = $result->fetch_assoc()) {
                      ?>
                        <tr>
                        <td><?=$row['title']?></td>
                      
                        <td><?=$row['created_at']?></td>
                        <td>
                        	<a class="btn btn-success" href="edit-image.php?id=<?=$row['id']?>">Edit</a>
                        	<a class="btn btn-warning" onclick="return confirm('Are you sure?')" href="?delete=<?=$row['id']?>">Delete</a>


                        </td>
                        </tr>
                        <?php }

                        }

                         ?>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

<?php require_once('../footer.php');?>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
<script>
    $(document).ready(function () {
		setTimeout(function() {
		$('.alert').fadeOut('fast');
		}, 3000); // <-- time in milliseconds


        $('#table_id').DataTable();
    });
</script>