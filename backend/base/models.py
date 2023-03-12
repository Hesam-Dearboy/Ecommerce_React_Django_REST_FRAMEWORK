from django.db import models
from django.contrib.auth.models import User , AbstractUser
from colorfield.fields import ColorField

# Create your models here.

class CustomUser(AbstractUser):
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username




class Product(models.Model):
    user = models.ForeignKey(CustomUser ,on_delete=models.SET_NULL , null=True)
    name = models.CharField(max_length=200 , null=True , blank=True)
    color = ColorField(null=True , blank=True )
    image = models.ImageField(null=True , blank=True, default='/alexa')
    brand = models.CharField(max_length=200 , null=True , blank=True)
    category = models.CharField( max_length=200 , null=True , blank=True)
    description = models.TextField(null=True , blank=True)
    features = models.TextField(null=True , blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2  , null=True , blank=True  , default=5)
    numReviews = models.IntegerField(null=True , blank=True ,default=10)
    price = models.DecimalField(max_digits=200, decimal_places=2 , null=True , blank=True)
    countInStock = models.IntegerField(null=True , blank=True ,default=0) 
    createdAt = models.DateTimeField( auto_now_add=True )
    _id = models.AutoField(primary_key=True , editable=False)


    def __str__(self):
        return self.name



class Reviews(models.Model):
    product = models.ForeignKey(Product ,on_delete=models.SET_NULL , null=True)
    user = models.ForeignKey(CustomUser ,on_delete=models.SET_NULL , null=True)
    name = models.CharField(max_length=200 , null=True , blank=True)
    rating = models.IntegerField(null=True , blank=True ,default=0)
    title = models.TextField(max_length=100 , null=True , blank=True)
    comment = models.TextField(null=True , blank=True)
    createdAt = models.DateTimeField( auto_now_add=True )
    _id = models.AutoField(primary_key=True , editable=False)

    def __str__(self) :
        return str(self.rating)




class Order(models.Model):
    user = models.ForeignKey(CustomUser ,on_delete=models.SET_NULL , null=True)
    paymentMethod = models.CharField(max_length=200 , null=True , blank=True)
    taxPrice = models.DecimalField(max_digits=200, decimal_places=2  , null=True , blank=True)
    shippingPrice= models.DecimalField(max_digits=200, decimal_places=2  , null=True , blank=True)
    totalPrice = models.DecimalField(max_digits=200, decimal_places=2  , null=True , blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField( auto_now_add=False , null=True , blank=True )
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField( auto_now_add=False , null=True , blank=True )
    createdAt =  models.DateTimeField( auto_now_add=True)
    _id = models.AutoField(primary_key=True , editable=False)


    def __str__(self):
        return str(self.createdAt)



class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL , null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL , null=True)
    name = models.CharField(max_length=200 , null=True , blank=True)
    qty = models.IntegerField(null=True , blank=True ,default=0)
    price = models.DecimalField(max_digits=200, decimal_places=2  , null=True , blank=True)
    image = models.CharField(max_length=200 , null=True , blank=True)
    _id = models.AutoField(primary_key=True , editable=False)


    def __str__(self) :
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE , null=True , blank = True)
    address = models.CharField(max_length=200 , null=True , blank=True)
    city = models.CharField(max_length=200 , null=True , blank=True)
    postalCode = models.CharField(max_length=200 , null=True , blank=True)
    country = models.CharField(max_length=200 , null=True , blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2  , null=True , blank=True)
    _id = models.AutoField(primary_key=True , editable=False)

    def __str__(self):
        return str(self.address)


class Banner(models.Model):
    user = models.ForeignKey(CustomUser ,on_delete=models.SET_NULL , null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL , null=True , blank=True)
    firstHeader = models.CharField(max_length=200 , null=True , blank=True )
    secondHeader = models.CharField(max_length=200 , null=True , blank=True )
    image = models.ImageField(null=True , blank=True, default='/alexa' )

    def __str__(self) :
        return str(self.pk)


class OtpCode(models.Model):
    phone_number = models.CharField(max_length=11)
    code = models.PositiveSmallIntegerField()
    createdAt = models.DateTimeField( auto_now=True)

    def __str__(self):
        return f'{self.phone_number} - {self.code} - {self.createdAt}'



