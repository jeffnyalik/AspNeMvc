$(document).ready(() => {
    $("#btnSubmitForm").click(() => {
        saveContactForm();
    });

    const saveContactForm = () => {
        var firstName = $("#FirstName").val();
        var lastName = $("#LastName").val();
        var emailAddress = $("#EmailAddress").val();

        var objContactViewModel =
        {
            firstName,
            lastName,
            emailAddress
        }

        $.ajax({
            async: true,
            type: "POST",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(objContactViewModel),
            url: '/contact/index',
            success: (response) => {
                if (response.success === true) {
                    toastr.success(response.message, "Success Alert", { timeout: 3000, "closeButton": true });
                } else {
                    toastr.info(response.message, "Information Alert", { timeout: 3000, "closeButton": true });
                }
            }, error: () => {
                toastr.error("An error has occured", "Error Alert", { timeout: 3000, "closeButton": true });
            }
        })
    }
 })