$(
    function () {
        CheckUnsupportedBrowser();
        CheckConnection();
        CheckNetCoreWeb();
    }
)

/**
 * Otevření popup okna
 * @param {any} element prvek nad kterým se má popup zobrazit
 * @param {any} position pozice popupu
 */
function showPopup(element, position) {
    var id = element.id;
    var popup = "#" + id + "_popUp";
    if (!position) {
        position = { my: "center", at: "center", of: window, collision: 'fit' };
    }
    $(popup).dialog({
        dialogClass: "no-titlebar",
        clickOutside: true,
        clickOutsideTrigger: "#" + id,
        position: position,
        draggable: false,
        resizable: false,
        show: {
            effect: "fade",
            duration: 100
        },
        hide: {
            effect: "fade",
            duration: 100
        }
    });
}
//Pro odstranění focusu na close button
$.ui.dialog.prototype._focusTabbable = $.noop;
//Doplněk pro zavírání jquery dialogu po kliknutí mimo něj
$.widget('ui.dialog', $.ui.dialog, {
    options: {
        clickOutside: false,
        clickOutsideTrigger: ''
    },
    open: function () {
        var clickOutsideTriggerEl = $(this.options.clickOutsideTrigger),
            that = this;
        if (this.options.clickOutside) {
            $(document).on('click.ui.dialogClickOutside' + that.eventNamespace, function (event) {
                var $target = $(event.target);
                if ($target.closest($(clickOutsideTriggerEl)).length === 0 &&
                    $target.closest($(that.uiDialog)).length === 0) {
                    that.close();
                }
            });
        }
        this._super();
    },
    close: function () {
        $(document).off('click.ui.dialogClickOutside' + this.eventNamespace);
        this._super();
    },
});

/**
 * Zobrazení panelu s obecným varováním pro uživatele
 * @param {any} message zpráva obsahu
 */
function ShowGeneralWarningPanel(message) {
    /**Panel pro obecné varování zobrazené v hlavním layoutu */
    var warningPanel = $("#generalWarning");
    warningPanel.addClass("visible"); //přidaná třída 'visible' kvůli selectoru v css
    warningPanel.empty();
    warningPanel.html(message);
    warningPanel.show();
}

/**Kontrola podporovaného prohlížeče kvůli ukončení podpory IE */
function CheckUnsupportedBrowser() {
    if (!(/(Chrome|Safari|Firefox)/.test(navigator.userAgent))) {
        ShowGeneralWarningPanel(unsupportedBrowserMsg);
    }
}

/**Detekce nezabezpečeného spojení */
function CheckConnection() {
    if (window.location.protocol == 'http:') {
        /**Testovací url pro https */
        var url = 'https://' + window.location.host + window.location.pathname;
        $.get(url)
            .done(function () {
                window.location.href.replace('http:', 'https:');
            })
            .fail(function () {
                ShowGeneralWarningPanel(unsecuredConnectionMsg);
            });
    }
}

/** Kontrola na běh NetCore webovky */
const CheckNetCoreWeb = () => {
    if (typeof isNetCoreRunning !== "undefined" && !isNetCoreRunning) {
        ShowGeneralWarningPanel(netCoreIsNotRunningMsg);
    }
}