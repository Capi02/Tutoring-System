
export function showAlert(message) {
    const alertaActual = document.querySelector(".alert_error")

    if (alertaActual) {
        return
    } else {
        const formContainer = document.querySelector(".field")
        const divAlert = document.createElement("DIV");
        divAlert.textContent = message;
        divAlert.classList.add("alert_error")

        document.querySelector(".form_card").insertBefore(divAlert, formContainer)

        setTimeout(() => {
            divAlert.remove();
        }, 2000);
    }
}

export function addUserAlert(message, type) {

    const alertaActual = document.querySelector(".alert_error")

    if (alertaActual) {
        return;
    } else {
        const divAlert = document.createElement("DIV");
        divAlert.textContent = message;
        divAlert.classList.add("alert_error");

        const form = document.querySelector(`#register_${type}_form`); // #register_${type}_form
        const formContainer = form.querySelector(".register_buttons_container");
        if (formContainer) {
            form.insertBefore(divAlert, formContainer);
        } else {
            // If there's no formContainer, add the alert as the first child of the form
            form.insertBefore(divAlert, form.firstChild);
        }

        // document.querySelector(`#register_${type}_form`).insertBefore(divAlert, document.querySelector(".register_buttons_container"))
        setTimeout(() => {
            divAlert.remove();
        }, 2000);
    }
}
