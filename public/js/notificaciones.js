/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file notificaciones.js -> sirve para el uso de la API de Notificaciones.
 */



/**
 * Compruebo que el navegador soporte la API de Notificaciones
 */
if (!window.Notification) {
    window.Notification = (() => window.Notification || window.webkitNotication || window.mozNotification || window.oNotification || window.msNotification)()
}
/**
 * verificamos el permiso asignado
 * @param permission default -> preguntar al usuario, granted -> Otorgado el permiso, denied -> NO hay permiso
 */
switch (window.Notification.permission) {
    case 'default':
        window.Notification.requestPermission((permission) => {
            console.log("Permiso: ", permission);
        });
        break;
    case 'granted':
        console.log("Puedo enviarte notificaciones...");
        break;
    case 'denied':
        console.log('NO me permitistes enviarte las notificaciones.');
        break;
}
/**
 * @callback crea una apli de notificacion, par amostrar notificaciones.
 * @param {object} $ framework de jQuery.
 */
(($) => {
    /**
     * comprobamos si el navegador soporta notificaciones
     */
    if (!window.Notification) {
        alert("Por favor actualizate o pasata a chrome, Notificaciones NO soportadas");
        return;
    }
    /**
     * @function notificacion extiende de la APi de notificaciones, para mostrar notificaciones
     * @param {string} titulo titulo de la notificacion a mostrar
     * @param {string} msg cuerpo o mensaje de la notificacion
     * @param {string} image icono a mostrar en la notificacion
     * @returns objeto de notificacion.
     */
    $.notification = (titulo, msg, image) => {
        var notification = new Notification(titulo, {
            body: msg,
            icon: image,
            iconUrl: image
        });
        return notification;
    }
})(jQuery);