$(document).ready(() => {
    $("#btnAlertMessage").click(() => {
        swal({
            title: "Alert Message title",
            text: "Here is the alert message information",
            icon: "success",
            showCancelButtonClass: "btn-primary",
            confirmButtonText: "Primary"

        });
    });
});