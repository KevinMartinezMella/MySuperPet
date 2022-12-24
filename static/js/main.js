const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
var toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

$(document).ready(function(){
    $('.imgPrincipal').fadeIn("slow");

    $('#btnAcceder').click(function(){
        validarCampos();
    });

    $('#btnRegistro').click(function(){
        validarRegistro();
    })

});

function validarCampos(){
    var campousuario = $('#nombreUsuario');
    var campocontrasena = $('#contrasena');
    if(campousuario.val() == '' && campocontrasena.val() == '') {
        campousuario.css('border','1px solid red');
        campocontrasena.css('border','1px solid red');
        toastMixin.fire({
            animation: true,
            title: 'Debes llenar los campos',
            icon: 'error'
        });
    } else if(campousuario.val() == '' && campocontrasena.val() != '') {
        campousuario.css('border','1px solid red');
        campocontrasena.css('border','1px solid green');
        toastMixin.fire({
            animation: true,
            title: 'Debes escribir un nombre de usuario',
            icon: 'error'
        });
    } else if(campousuario.val() != '' && campocontrasena.val() == '') {
        campousuario.css('border','1px solid green');
        campocontrasena.css('border','1px solid red');
        toastMixin.fire({
            animation: true,
            title: 'Debes escribir una contraseña',
            icon: 'error'
        });
    } else {
        $.ajax({
            headers: {'X-CSRFToken': csrftoken},
            url : "/acceder",
            type : 'POST',
            data : {
                'nombreUsuario' : campousuario.val(), 
                'contrasena':campocontrasena.val()
            },
            success: function(data){
                if(data == 0){
                    toastMixin.fire({
                        animation: true,
                        title: 'Credenciales Incorrectas',
                        icon: 'error'
                    });
                } else {
                    window.location.href="/menu"
                }
            },
        });
    }
}


function validarRegistro(){
    var campousuario = $('#nombreUsuario_r');
    var campoemail = $('#email_r');
    var campocontrasena = $('#contrasena_r');
    var campoconfirm = $('#confirmContrasena_r');
    if(campousuario.val() == '' && campoemail.val() == '' && campocontrasena.val() == '' && campoconfirm.val() == '') {
        campousuario.css('border','1px solid red');
        campoemail.css('border','1px solid red');
        campoconfirm.css('border','1px solid red');
        campocontrasena.css('border','1px solid red');
        toastMixin.fire({
            animation: true,
            title: 'Debes llenar los campos',
            icon: 'error'
        });
    } else if(campousuario.val() != '' && campoemail.val() == '' && campocontrasena.val() == '' && campoconfirm.val() == '') {
        campousuario.css('border','1px solid green');
        campoemail.css('border','1px solid red');
        campoconfirm.css('border','1px solid red');
        campocontrasena.css('border','1px solid red');
        toastMixin.fire({
            animation: true,
            title: 'Debes llenar los campos',
            icon: 'error'
        });
    } else if(campousuario.val() == '' && campoemail.val() != '' && campocontrasena.val() == '' && campoconfirm.val() == '') {
        campousuario.css('border','1px solid red');
        campoemail.css('border','1px solid green');
        campoconfirm.css('border','1px solid red');
        campocontrasena.css('border','1px solid red');
        toastMixin.fire({
            animation: true,
            title: 'Debes llenar los campos',
            icon: 'error'
        });
    } else if(campousuario.val() == '' && campoemail.val() == '' && campocontrasena.val() != '' && campoconfirm.val() == '') {
        campousuario.css('border','1px solid red');
        campoemail.css('border','1px solid red');
        campoconfirm.css('border','1px solid green');
        campocontrasena.css('border','1px solid red');
        toastMixin.fire({
            animation: true,
            title: 'Debes llenar los campos',
            icon: 'error'
        });
    } else if(campousuario.val() == '' && campoemail.val() == '' && campocontrasena.val() == '' && campoconfirm.val() != '') {
        campousuario.css('border','1px solid red');
        campoemail.css('border','1px solid red');
        campoconfirm.css('border','1px solid red');
        campocontrasena.css('border','1px solid green');
        toastMixin.fire({
            animation: true,
            title: 'Debes llenar los campos',
            icon: 'error'
        });
    } else {
        if(campocontrasena.val() != campoconfirm.val()){
            toastMixin.fire({
                animation: true,
                title: 'Las contraseñas no coinciden',
                icon: 'error'
            });
        } else {
            $.ajax({
                headers: {'X-CSRFToken': csrftoken},
                url : "/registro",
                type : 'POST',
                data : {
                    'nombreUsuario' : campousuario.val(), 
                    'email' : campoemail.val(), 
                    'contrasena':campocontrasena.val(),
                    'confirmContrasena':campoconfirm.val()
                },
                success: function(data){
                    if(data == 1){
                        campoconfirm.css('border','1px solid red');
                        campocontrasena.css('border','1px solid red');
                        toastMixin.fire({
                            animation: true,
                            title: 'Las contraseñas no coinciden',
                            icon: 'error'
                        });
                    } else if(data == 2) {
                        toastMixin.fire({
                            animation: true,
                            title: 'Usuario Registrado con éxito !',
                            icon: 'success'
                        });
                        setTimeout(function() { 
                            window.location.href="/acceder"
                        }, 2000);
                    } else {
                        toastMixin.fire({
                            animation: true,
                            title: 'No se ha podido registrar',
                            icon: 'error'
                        });
                    }
                },
            });
        }
    }
}