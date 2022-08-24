$(document).ready(() => {
    $('#btnUpdate').hide();
    $('#DivIsActive').hide();
    bindDataTable();
    
});

const loadData = () => {
    var transactions = [];

    $.ajax({
        type: "post",
        async: false,
        url: "transaction/List",
        data: {},
        success(data) {
            if (data != null) {
                $.each(data, function (key, value) {
                    var editButton = "<a onclick='functionEdit('" + value.Id + "') style='cursor:pointer;color:#1da1f2;'><i class='fas fa-pencil fa-sm'></i></a>"
                    var deleteButton = "<a style='cursor:pointer;' onclick='functionDelete(this)' class='text-danger'><i class='fas fa-trash fa-sm' aria-hidden='true'></i></a>"
                    var hidden = "<input type='hidden' id='hdncode' value='" + value.id + "' />";
                    //var action = hidden + editButton + ' | ' + deleteButton;
                    var action = editButton + ' | ' + deleteButton;
                    transactions.push([

                        value.accNumber,
                        value.bankName,
                        value.benfName,
                        value.swiftCode,
                        value.amount,
                        value.phoneNumber,
                        action
                    ]);
                });
            }
        },
        error(err) { }
    });
}

const bindDataTable = () => {
    var table = $("#trTable").DataTable();
    var i = 1;
    table.destroy();
    $("#trTable").DataTable({
        "ordering": true,
        buttons: ['csv', 'copy', 'excel', 'print'],
        "ajax": {
            type: "get",
            url: "/transaction/LoadData",
            datatype: "json",
            dataSrc: "",
            data: { id: "0" },
            
        },

        columns: [
            {
                "render": function (data, type, full, meta) { return i++; }
            },
            
            { data: "accountNumber", autoWidth: true },
            { data: "bankName", autoWidth: true },
            { data: "beneficiaryName", autoWidth: true },
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
    $("#Id").val(Id);
    $.ajax({
        url: "/transaction/Edit/" + Id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: (data) => {
            $("#accountNumber").val(data.accountNumber);
            $("#bankName").val(data.bankName);
            $("#beneficiaryName").val(data.beneficiaryName);
            $("#swiftCode").val(data.swiftCode);
            $("#amount").val(data.amount);
            $("#phoneNumber").val(data.phoneNumber);
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },

        error: (err) => {
            console.log(err);
        }

    });

    return false;
}

/*
$(document).ready(() => {
    loadData();
});

const createNew = () => {
    clearAll();
    $("#btnModel").trigger("click");
};





const functionEdit = () => {
   console.log("WORKING")
}


const functionDelete = () => {
    console.log("DELETED");
}



const clearAll = () => {
    $("#AccountNumber").val('');
    $("#BeneficiaryName").val('');
    $("#SwiftCode").val('');
    $("#BankName").val('');
    $("#Amount").val('');
    $("#PhoneNumber").val('');
}


const loadData = () => {
    var transactions = [];

    $.ajax({
        type: "post",
        async: false,
        url: "transaction/GetTransactions",
        data: {},
        success(data) {
            if (data != null) {
                $.each(data, function (key, value) {
                    var editButton = "<a onclick='functionEdit('"+ value.Id +"') style='cursor:pointer;color:#1da1f2;'><i class='fas fa-pencil fa-sm'></i></a>"
                    var deleteButton = "<a style='cursor:pointer;' onclick='functionDelete(this)' class='text-danger'><i class='fas fa-trash fa-sm' aria-hidden='true'></i></a>"
                    var hidden = "<input type='hidden' id='hdncode' value='" + value.id + "' />";
                    //var action = hidden + editButton + ' | ' + deleteButton;
                    var action = editButton + ' | ' + deleteButton;
                    transactions.push([
                        
                        value.accNumber,
                        value.bankName,
                        value.benfName,
                        value.swiftCode,
                        value.amount,
                        value.phoneNumber,
                        action
                    ]);
                });
            }
        },
        error(err) { }
    });


    function bindDatatable() {

    }

    $("#transactionTable").DataTable({
       *//* "ajax": {
            type: "GET",
            async: false,
            url: "transaction/GetTransactions",
            datatype: "json",
            data: {},
            success(data) {
                //
            }, error(err) { }
        },*//*
        destroy: true,
        data: transactions,
       *//* "columns": [
            {data: "#"},
            { data: "AccountNumber" },
            { data: "Bank Name" },
            { data: "Beneficiary Name" },
            { data: "Swift Code" },
            { data: "Amount" },
            { data: "Phone Number" },
        ],*//*
        "language": {
            "emptyTable": "No data found,please click on Add New Button"
        },
        pageLength: 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 25, 50]],
        columnDefs: [{
            "defaultContent": "-",
            "targets": "_all"
        }]
    });
}

const saveForm = () => {
    var isProcessed = true;
    if (isProcessed) {
        var transactions = {
            accNumber: $("#AccountNumber").val(),
            benfName: $("#BeneficiaryName").val(),
            swiftCode: $("#SwiftCode").val(),
            bankName: $("#BankName").val(),
            amount: $("#Amount").val(),
            phoneNumber: $("#PhoneNumber").val()
        }

        console.log(transactions);

        $.ajax({
            type: "post",
            url: "transaction/save",
            data: transactions,
            success(data) {
                if (data.success) {
                    clearAll();
                    loadData();
                    toastr.success(data.message, "Success Alert", { timeout: 3000, closeButton: true });
                    
                } else {
                    toastr.info("Info", "Information Alert", { timeout: 3000, closeButton: true });
                    console.log(data);
                }
            },
            error(err) {
                toastr.error("Error", "Error Alert", { timeout: 3000, closeButton: true });
                console.log(err);
            }
        });
    }
}

//var hidden = "<input id='hdncode' value='" + value.id + "' />";
//var editButton = "<a href='#' onclick='functionEdit(this)' class='btn btn-info'><i class='fas fa-pencil'></i></a>"
//var deleteButton = "<a href='#' onclick='functionEdit(this)' class='text-danger'><i class='fas fa-trash' aria-hidden='true'></i></a>"*/