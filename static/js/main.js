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
                    alert('okiDoki');
                }
            }
        });
        // $('#formAcceder').submit();
    }
}