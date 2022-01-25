$(document).ready(function () {

    load_data();

});

$('#submit').click(function(){

    var name = $("#name").val();
    var address = $("#address").val();
    var email = $("#email").val();
    var phoneNo = $("#phoneNo").val();

    let formData = {
        name:name,
        address:address,
        email:email,
        phoneNo:phoneNo
    }

//    console.log(formData)

     if (name == "") {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Please Fill The Name!',
        })
      } else if (address == "") {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Please Fill The Address!',
        })
      } else if (email == "") {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Please Fill The Email!',
        })
      } else if (phoneNo == "") {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Please Fill The Phone Number!',
        })
      } else{
        $.ajax({
          url: 'http://localhost:8080/addUser',
          method: 'POST',
          contentType: "application/json",
          data: JSON.stringify(formData),
          dataType: 'json',
          cache: false,
          success: function (msg) {
            if(msg){
//                    console.log(msg)
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'User has been saved',
                  showConfirmButton: false,
                  timer: 2000
                })

                $('#form')[0].reset();
                load_data();
            }

          },
          error: function (request, error) {
            console.log("Request " + JSON.stringify(error));
          }
        });
        load_data();
      }

})

function load_data(){

    var appendData = "";

    $('#table_data').html("");

    $.ajax({
          url: 'http://localhost:8080/user',
          method: 'GET',
          contentType: "application/json",
          cache: false,
          success: function (response) {

            if(response){

                response.forEach(function (row) {
                    appendData += '<tr>';
                    appendData +=
                        '<td hidden>' + row.id + '</td>';
                         appendData +='<td>' + row.name + '</td>';
                         appendData +='<td>' + row.address + '</td>';
                         appendData +='<td>' + row.email + '</td>';
                         appendData +='<td>' + row.phoneNo + '</td>';
                         appendData +='<td>' +
                         "<input value='Update' type='submit' style='color:white;' class='btn btn-warning' data-toggle='modal' data-target='#exampleModal' id = "+row.id+" onclick='update(this.id, \""+row.name+"\", \""+row.address+"\", \""+row.email+"\", \""+row.phoneNo+"\");' >"+
                          "<input value='Delete' type='submit' class='btn btn-danger ml-3' id = "+row.id+" onclick='deleteUser(this.id);' >"+
                         '</td>';
                        appendData += '</tr>'
                    });

            }
            $('#table_data').html(appendData);
          },
          error: function (request, error) {
            console.log("Request " + JSON.stringify(error));
          }
        });

}

function update(id,name,address,email,phoneNo){

    //console.log(email)

    $("#updateId").val(id);
    $("#updateName").val(name);
    $("#updateAddress").val(address);
    $("#updateEmail").val(email);
    $("#updatePhoneNo").val(phoneNo);

}

$('#updateSubmit').click(function(){

    var id = $("#updateId").val();
    var name = $("#updateName").val();
    var address = $("#updateAddress").val();
    var email = $("#updateEmail").val();
    var phoneNo = $("#updatePhoneNo").val();

    let formData = {
        id:id,
        name:name,
        address:address,
        email:email,
        phoneNo:phoneNo
    }
//    console.log(formData)

     if (name == "") {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Please Fill The Name!',
        })
      } else if (address == "") {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Please Fill The Address!',
        })
      } else if (email == "") {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Please Fill The Email!',
        })
      } else if (phoneNo == "") {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Please Fill The Phone Number!',
        })
      } else{
        $.ajax({
          url: 'http://localhost:8080/updateUser/'+id,
          method: 'PUT',
          contentType: "application/json",
          data: JSON.stringify(formData),
          dataType: 'json',
          cache: false,
          success: function (msg) {
            if(msg){
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User has been Updated',
                    showConfirmButton: false,
                    timer: 2000
                })
                    load_data();
                    $('#exampleModal').hide();
                    $('.modal-backdrop').hide();
                }

              },
              error: function (request, error) {
                console.log("Request " + JSON.stringify(error));
              }
            });
      }
})

function deleteUser(id){

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to delete this User!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete User!'
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            url: 'http://localhost:8080/deleteUser/'+id,
            method: 'DELETE',
            contentType: "application/json",
            cache: false,
            success: function (msg) {
              if(msg){
                Swal.fire(
                  'Deleted!',
                  'User has been deleted.',
                  'success'
                )
                load_data();
              }
            },
            error: function (request, error) {
              console.log("Request " + error +request);
            }
          })
        }
      })

}
