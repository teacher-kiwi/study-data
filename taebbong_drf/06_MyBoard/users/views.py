from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from .serializers import RegisterSerializer, LoginSerializer, ProfileSerializer
from .models import Profile
from .permissions import CustomReadOnly

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer

class LoginView(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    token = serializer.validated_data
    return Response({"token": token.key}, status=status.HTTP_200_OK)

class ProfileView(generics.RetrieveUpdateAPIView):
  queryset = Profile.objects.all()
  serializer_class = ProfileSerializer
  permission_classes = [CustomReadOnly]

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def check_user(request):
  return Response({"id": str(request.user.id), "username": str(request.user)})