<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>View Employee</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body>
  <div class="container my-5">
    <h2 class="mb-4">Employee Details</h2>

    <div class="card shadow-sm">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-sm-12 col-md-6 col-lg-3">
            <strong>Employee ID:</strong> 1
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">
            <strong>Employee Number:</strong> EMP1001
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">
            <strong>First Name:</strong> Maria
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">
            <strong>Last Name:</strong> Gonzalez
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">
            <strong>Department:</strong> IT
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">
            <strong>Position:</strong> Engineer
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">
            <strong>Salary:</strong> $72,000
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">
            <strong>Hire Date:</strong> 2022-06-15
          </div>
        </div>

        <div class="d-flex justify-content-between mt-4">
          <a href="list.html" class="btn btn-secondary">
            <i class="bi bi-arrow-left"></i> Back to List
          </a>
          <div>
            <a href="registration.html?id=1" class="btn btn-warning me-2">
              <i class="bi bi-pencil-fill"></i> Edit
            </a>
            <a href="delete.html?id=1" class="btn btn-danger">
              <i class="bi bi-trash-fill"></i> Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
