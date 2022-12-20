from django.shortcuts import render, redirect
from django.http import HttpResponse
from . models import Usuario

# Create your views here.
def inicio(request):
    return render(request, 'inicio.html')

def acceder(request):
    if request.method == 'GET':
        return render(request, 'acceder.html')
    elif request.method == 'POST':
        usuario = request.POST.get('nombreUsuario').lower()
        contrasena = request.POST.get('contrasena')
        ingreso = Usuario.objects.filter(nombreUsuario = usuario, contrasena = contrasena)
        if len(ingreso) != 0:
            usuario_actual = ingreso[0]
            request.session['nombreUsuario'] = usuario_actual.nombreUsuario
            request.session['idUsuario'] = usuario_actual.id
            return redirect('menu')
        else:
            return 0

def registro(request):
    if request.method == 'GET':
        return render(request, 'registro.html')
    elif request.method == 'POST':
        usuario = request.POST.get('nombreUsuario')
        email = request.POST.get('email')
        contrasena = request.POST.get('contrasena')
        confirmContrasena = request.POST.get('confirmContrasena')
        if contrasena == confirmContrasena:
            registro = Usuario(
                nombreUsuario = usuario,
                emailUsuario = email,
                contrasena = contrasena
            )
            registro.save()
            return redirect('acceder')
        else:
            return redirect('registro')

def menu(request):
    return render(request, 'menu.html')