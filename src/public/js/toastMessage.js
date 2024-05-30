function toast(options, delay) {
    const main = document.querySelector(".toast-block")
    if(main) {
        var toastMessage = document.createElement("div")
        toastMessage.classList.add("toast-message", options.type)
        const icons = {
            success: `<i class="fa-solid fa-check"></i>`,
            error: `<i class="fa-solid fa-triangle-exclamation"></i>`,
            warning: `<i class="fa-solid fa-exclamation"></i>`,
            info: `<i class="fa-solid fa-info"></i>`
        }
        var icon = icons[options.type]
        toastMessage.innerHTML = `
        <div class="toast-icon">
            ${icon}
        </div>
        <div class="toast-body">
            <div class="toast-header">${options.name}</div>
            <div class="toast-description">${options.message}</div>
        </div>
        <div class="toast-more">
            <i class="fa-solid fa-xmark"></i>
        </div>
        `
        main.appendChild(toastMessage)
        toastMessage.style.animation = `showInRight ease .5s, hideMessage linear 1s ${delay / 1000}s forwards`

        //ẩn toastMessage bị động
        var hideMessage = setTimeout(function() {
            main.removeChild(toastMessage)
        }, delay + 1000)


        //khi ấn tắt thông báo chủ động
        main.onclick = function(e) {
            if(`<i class="fa-solid fa-xmark"></i>`) {        
                main.appendChild(toastMessage)
                main.removeChild(toastMessage)
                clearTimeout(hideMessage)
            }
        }
    }
}