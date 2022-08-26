$(document).ready(() => {
    $('#btnUpdate').hide();
    $('#DivIsActive').hide();
    

    $(".show-modal").click(function () {
        $("#myModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    
    clearAll();
    bindDataTable();
    
});

const Cancel = () => {
    clearAll();
    $('#btnUpdate').hide();
    $('#btnAdd').show();
}

const clearAll = () => {
    $("#id").val("");
    $("#bankName").val("");
    $("#swiftCode").val("");
    $("#amount").val("");
    $("#phoneNumber").val("");
}

const btnSave = () => {
    isProcesseed = true;

    if (isProcesseed) {
        var transaction = {
            id: $("#id").val(),
            bankName:$("#bankName").val(),
            swiftCode:$("#swiftCode").val(),
            amount:$("#amount").val(),
            phoneNumber:$("#phoneNumber").val()
        }

        $.ajax({
            type: "post",
            url: "/transaction/CreateEdit",
            datatype: "json",
            data: transaction,
            success(data) {
                if (data) {
                    console.log(data);
                    clearAll();
                    $("#myModal").modal("hide");
                    bindDataTable();
                    toastr.success(data.message, "Success Alert", { timeout: 3000, closeButton: true });
                } else {
                    console.log("Error information")
                    toastr.info(data.message, "Info Alert", { timeout: 3000, closeButton: true });
                }
            }, error(err) {
                console.log(err);
            }
        })
    }
}


const bindDataTable = () => {
    var table = $("#trTable").DataTable();
    table.destroy();
    var i = 1;
    
    $("#trTable").DataTable({
        "ordering": true,
        /*"destroy": true,
        "searching": true,*/
        buttons: ['csv', 'copy', 'excel', 'print'],
        "ajax": {
            type: "get",
            url: "transaction/LoadData",
            datatype: "json",
            dataSrc: "",
            async: false,
            data: { id: "0" },
            
        },

        columns: [
            {
                "render": function (data, type, full, meta) { return i++; }
            },
            
            
            { data: "bankName", autoWidth: true },
            { data: "swiftCode", autoWidth: true },
            { data: "amount", autoWidth: true },
            { data: "phoneNumber", autoWidth: true },
            {
                data: "id",
                "render": function (data, type, row) {
                    return "<div class='action-btn '><a style='cursor:pointer' onclick='getbyID(" + row.id + ")' ><i class='fas fa-pencil fa-sm'></i></a>|<a style='cursor:pointer' onclick='Delete(" + row.id + ")' ><i class='fas fa-trash fa-sm'></i></a></div> "
                }
            },
        ]
    });
}


const getbyID = (Id) => {
    $("#id").val(Id);
    $.ajax({
        url: "/transaction/Edit/" + Id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: (data) => {
            if (data != null) {
                $("#id").val(data.id);
                $("#bankName").val(data.bankName);
                $("#swiftCode").val(data.swiftCode);
                $("#amount").val(data.amount);
                $("#phoneNumber").val(data.phoneNumber);
                $('#myModal').modal('show');
                $('#btnUpdate').hide();
                $('#btnAdd').show();

                console.log(data);
            }
        },

        error: (err) => {
            console.log(err);
        }

    });

    return false;
}

const Delete = (ID) => {

    swal({
        text: "Are you sure you wan to delete",
        icon: 'error',
        closeOnClickOutside: false,
        buttons: true,
        showCancelButton: true,
        dangerMode: true
    }).then((result) => {
        if (result) {
            $.ajax({
                url: "transaction/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    bindDataTable();
                    swal({
                        icon: "success",
                        text: "Deleted successfully"
                   
                    });
                },
                error: function () {
                    toastr.error("An error has occured", "Error Alert", { timeout: 3000, closeButton: true });
                }
            });
        }
    })

}



