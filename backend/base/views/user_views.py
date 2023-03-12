from django.shortcuts import render
from django.contrib.auth.models import User
from ..utils import send_otp_code
from ..models import OtpCode , CustomUser
from rest_framework.decorators import api_view ,permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from ..serializers import UserSerializer , UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
import random





class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k , v in serializer.items():
            data[k] = v

        return data



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['POST'])
def registerUser(request):
    data = request.data
    random_code = random.randint(1000 , 9999)
    print(data)
    try:
        user = CustomUser.objects.create(
            first_name = data['name'],
            username=data['phoneNumber'],  
            password=make_password(data['password']), 
        )
        send_otp_code(data['phoneNumber'] , random_code)
        OtpCode.objects.filter(phone_number = data['phoneNumber']).all().delete()
        OtpCode.objects.create(phone_number = data['phoneNumber'] ,  code = random_code )
        
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this Phone Number already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def resendCode(request): 
    user = request.user
    random_code = random.randint(1000 , 9999)
    print(user)

    send_otp_code( user , random_code)
    OtpCode.objects.filter(phone_number = user).all().delete()
    OtpCode.objects.create(phone_number = user ,  code = random_code )

    serializer = UserSerializerWithToken(user  , many=False)
    return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def verifyCode(request):
    data = request.data
    user = request.user
    print(data['code'])
    print(user)
    serializer = UserSerializerWithToken(user  , many=False)
    code_instance = OtpCode.objects.get(phone_number = user )
    if code_instance.code == int(data['code']) :
        user.verified = True

        user.save()

        code_instance.delete()

        return Response(serializer.data)
    else : 
        message = {'detail': 'code is not correct'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

 

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user  , many=False)

    data = request.data

    user.first_name = data['name']
    user.username = data['phoenNumber']
    user.email = data['email']
    
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user  , many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users , many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request , pk):
    users = CustomUser.objects.get(id = pk)
    serializer = UserSerializer(users , many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = CustomUser.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)





@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request , pk) :
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was Deleted')


