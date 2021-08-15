from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField("账号",max_length=32,unique=True)
    password = models.CharField("密码",max_length=128)
    email = models.EmailField("邮箱",unique=True)
    c_time=models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering=['c_time']
        verbose_name='用户'
        verbose_name_plural='用户'

    def __str__(self):
        return self.username