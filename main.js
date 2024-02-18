function enviarCorreoConQR() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName('Asistencia a nuestro casamiento');
    var lastRow = sheet.getLastRow();
    var range = sheet.getRange('A2:C' + lastRow); // Suponiendo que los datos están en las columnas A, B y C

    // Recorrer cada fila de la hoja de cálculo
    var data = range.getValues();
    data.forEach(function (row) {
        var nombre = row[0];
        var correo = row[1];
        var envioQR = row[2].toLowerCase(); // Columna C: 'si' para enviar el correo con QR, 'no' para no enviarlo

        if (envioQR === 'si') {
            // Modificar la información para el código QR según tus necesidades
            var qrText = encodeURIComponent('¡Bienvenido/a, ' + nombre + '! \nGracias por registrarte en nuestro casamiento.');

            // Generar el enlace para el código QR con la información modificada
            var qrLink = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=';
            var qrCodeUrl = qrLink + qrText;

            // Enviar correo electrónico con el enlace al código QR
            var cuerpoHtml = '<p>Estimado/a ' + nombre + ',</p>' +
                '<p>Aquí tienes tu código QR personalizado para el evento:</p>' +
                '<img src="' + qrCodeUrl + '" alt="Código QR">';

            MailApp.sendEmail(correo, 'Casaniento A&M', '', { htmlBody: cuerpoHtml });
        } else if (envioQR === 'no') {
            // Enviar otro tipo de correo electrónico
            var cuerpoHtml = '<p>Estimado/a ' + nombre + ',</p>' +
                '<p>Lamentamos que no puedas asistir a nuestro casamiento.</p>';

            MailApp.sendEmail(correo, 'Registro en el evento', '', { htmlBody: cuerpoHtml });
        } else {
            // Si el valor en la columna no es ni 'si' ni 'no', muestra un mensaje de error
            Logger.log('Error: Valor no válido en la columna C para ' + nombre);
        }
    });
}
