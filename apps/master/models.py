from django.db import models

# Create your models here.

class Usuario(models.Model):
    emailUsuario = models.CharField(max_length=100)
    nombreUsuario = models.CharField(max_length=15)
    contrasena = models.CharField(max_length=80)
    fechaCreacion = models.DateTimeField(auto_now_add=True)
    def ___list___ (self):
        return self.id, self.nombreUsuario

class TipoMascota(models.Model):
    nombreTipo = models.CharField(max_length=50)
    def __str__(self):
        return self.nombreTipo

class Mascota(models.Model):
    nombreMascota = models.CharField(max_length=20)
    nivelMascota = models.IntegerField()
    vidaMascota = models.IntegerField()
    cuidadoMascota = models.IntegerField()
    felicidadMascota = models.IntegerField()
    idUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    tipoMascota = models.ForeignKey(TipoMascota, on_delete=models.CASCADE)
    fechaCreacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombreMascota
