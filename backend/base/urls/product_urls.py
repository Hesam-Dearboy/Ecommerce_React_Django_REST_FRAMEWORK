from base.views import product_views
from django.urls import path 



urlpatterns = [
    path('' , product_views.getProducts , name='products')  ,

    path('brand/' , product_views.getProductsByBrand , name='products-by-brand')  ,
    path('category/' , product_views.getProductsByCategory , name='products-by-category')  ,


    
    path('create/' , product_views.createProduct , name='create-product')  ,
    path('upload/' , product_views.uploadImage , name='image-upload')  ,
    path('banners/' , product_views.getBanners , name='image-upload')  ,


    
    path('<str:pk>/reviews/' , product_views.createProductReview , name='product-review')  ,
    path('top/' , product_views.getTopProducts ,name='top-products' ) , 
    path('<str:pk>/' , product_views.getProduct , name='product')  ,

    path('update/<str:pk>/' , product_views.updateProduct , name='update-product')  ,

    path('delete/<str:pk>/' , product_views.deleteProduct , name='delete-product')  ,


]