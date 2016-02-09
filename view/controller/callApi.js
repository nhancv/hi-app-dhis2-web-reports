/**
 * Created by nhancao on 2/9/16.
 */

function callAjax(apiUrl, username, password, callback) {
    var form_data = {
        url: apiUrl,
        u: username,
        p: password
    };
    $.ajax({
        type: 'POST',
        url: "http://localhost/Phplibrary/mbasic_au.php",
        crossDomain: true,
        dataType: 'json',
        data: form_data,
        cache: false
    })
        .done(callback);
}

