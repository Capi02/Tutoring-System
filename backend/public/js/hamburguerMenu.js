
const links = document.querySelectorAll(".list_items");
const menu_button = document.querySelector(".menu_button");


function hamburguer_menu() {
    const menu = document.querySelector(".cellphone_menu");
    menu.classList.toggle("show_menu")

    if (menu.classList.contains("show_menu")) {
        menu_button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
            `;

    } else {
        menu_button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
             <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
        </svg>
        `;
    }
}

menu_button.addEventListener("click", hamburguer_menu)
links.forEach(link => {
    link.addEventListener("click", hamburguer_menu)
})
