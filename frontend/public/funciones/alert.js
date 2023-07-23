
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