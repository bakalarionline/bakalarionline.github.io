$(function () {
    if (screen.width < 640) {
        var element = $('#bkViewport');
        element.attr('content', 'width=500');
    }

    ls_capslock.init({
        element: '#password',
        message: 'Máte zapnutý Caps Lock',
        position: 'bottom'
    });
});

/** 
 *  Volá se při odeslání formu přihlášení. Zamění text v přihlašovacím tlačítku za loading a znepřístupní ho,
 * dohledá tlačítka pro LiveId a MS a případně je nastaví na disabled. 
 * */
function makeDisable() {
    $("#loginButton .btn-login-text").hide();
    $("#loginButton .btn-login-loader").show();
    document.getElementById("loginButton").disabled = true;
    const liveIdBtn = document.getElementById("liveidButton");
    if (liveIdBtn) {
        liveIdBtn.disabled = true;
    }
    const msLoginBtn = document.getElementById("loginMSButton");
    if (msLoginBtn) {
        msLoginBtn.disabled = true;
    }
}

/**
 * Akce po stisknutí klávesy enter
 * @param {any} event Informace o události
 */
function onEnterSubmit(event) {
    if (event.keyCode == 13) {
        $("#loginButton").click();
    }
}
