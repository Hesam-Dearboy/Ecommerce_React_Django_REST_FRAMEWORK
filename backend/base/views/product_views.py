from django.shortcuts import render
from rest_framework.decorators import api_view ,permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from ..models import Product , Reviews ,Banner
from django.core.paginator import Paginator , EmptyPage , PageNotAnInteger 
from ..serializers import ProductSerializer , BannerSerializer
from rest_framework import status




@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    queryBrand = request.query_params.get('brandName')
    queryCategory = request.query_params.get('categoryName')



    print('query:' , query)
    print('queryBrand:' , queryBrand)
    print('queryCategory:' , queryCategory)

    if query == None : 
        query = ''

    if queryBrand == None : 
        query = ''
    
    if queryCategory == None : 
        query = ''


    if (queryBrand != '' and queryCategory != '') :
        products = Product.objects.filter(name__icontains=query) and Product.objects.filter(category=queryCategory) and Product.objects.filter(brand=queryBrand)
    elif( queryBrand != '' and queryCategory == '' ) :
        products = Product.objects.filter(name__icontains=query) and Product.objects.filter(brand=queryBrand)
    elif (queryBrand == '' and queryCategory != '') :
        products = Product.objects.filter(name__icontains=query) and Product.objects.filter(category=queryCategory)
    else:
        products = Product.objects.filter(name__icontains=query)

    


    page  = request.query_params.get('page')

    paginator = Paginator(products , 12)

    try :
        products = paginator.page(page)
    except PageNotAnInteger :
        products = paginator.page(1)
    except EmptyPage : 
        products = paginator.page(paginator.num_pages)
    
    if page == None :
        page = 1
    
    page = int(page)

    serializer = ProductSerializer(products , many=True)
    return Response({'products' : serializer.data , 'page' : page , 'pages' :  paginator.num_pages })




@api_view(['GET'])
def getProductsByBrand(request):
    query = request.query_params.get('brandName')

    print('query:' , query)
    if query == None : 
        query = ''

    productsBrand = Product.objects.filter(brand__icontains=query)

    print('productsBrand: ', productsBrand)

    page  = request.query_params.get('page')

    paginator = Paginator(productsBrand , 10)

    try :
        productsBrand = paginator.page(page)
    except PageNotAnInteger :
        productsBrand = paginator.page(1)
    except EmptyPage : 
        productsBrand = paginator.page(paginator.num_pages)
    
    if page == None :
        page = 1
    
    page = int(page)

    serializer = ProductSerializer(productsBrand , many=True)
    return Response({'productsBrand' : serializer.data , 'page' : page , 'pages' :  paginator.num_pages })


@api_view(['GET'])
def getProductsByCategory(request):
    query = request.query_params.get('categoryName')

    print('query:' , query)
    if query == None : 
        query = ''

    productsCategory = Product.objects.filter(category=query)

    print('productsCategory: ', productsCategory)

    page  = request.query_params.get('page')

    paginator = Paginator(productsCategory , 10)

    try :
        productsCategory = paginator.page(page)
    except PageNotAnInteger :
        productsCategory = paginator.page(1)
    except EmptyPage : 
        productsCategory = paginator.page(paginator.num_pages)
    
    if page == None :
        page = 1
    
    page = int(page)

    serializer = ProductSerializer(productsCategory , many=True)
    return Response({'productsCategory' : serializer.data , 'page' : page , 'pages' :  paginator.num_pages })




@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request , pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product , many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        color = '#000000',
        countInStock=0,
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request , pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.color = data['color']
    product.category = data['category']
    product.description = data['description']


    product.save()


    serializer = ProductSerializer(product , many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.reviews_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['selectedRate'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Reviews.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['selectedRate'],
        )

        reviews = product.reviews_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')



@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')


@api_view(['GET'])
def getBanners(request):
    banners = Banner.objects.all()
    serializer = BannerSerializer(banners , many=True)
    return Response(serializer.data)