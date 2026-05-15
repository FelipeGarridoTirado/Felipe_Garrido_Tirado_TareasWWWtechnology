<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Delete Employee</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body>
  <div class="container my-5">
    <h2 class="mb-4 text-danger">Confirm Delete</h2>

    <div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">Are you sure?</h4>
      <p>You are about to delete the following employee:</p>
    </div>

    <div class="row mb-4">
      <div class="col-sm-12 col-md-6 col-lg-3"><strong>ID:</strong> 1</div>
      <div class="col-sm-12 col-md-6 col-lg-3"><strong>Name:</strong> Maria Gonzalez</div>
      <div class="col-sm-12 col-md-6 col-lg-3"><strong>Department:</strong> IT</div>
      <div class="col-sm-12 col-md-6 col-lg-3"><strong>Position:</strong> Engineer</div>
    </div>

    <div class="d-flex justify-content-between">
      <a href="list.html" class="btn btn-secondary">
        <i class="bi bi-arrow-left"></i> Back to List
      </a>
      <form action="delete.html" method="POST" class="d-inline">
        <input type="hidden" name="id" value="1">
        <button type="submit" class="btn btn-danger">
          <i class="bi bi-trash-fill"></i> Confirm Delete
        </button>
      </form>
    </div>
  </div>
</body>
</html>
