from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from users.models import Profile
from .models import Post, Comment
from .permissions import CustomReadOnly
from .serializers import PostSerializer, PostCreateSerializer, CommentSerializer, CommentCreateSerializer

from django.shortcuts import render

class PostViewSet(viewsets.ModelViewSet):
  queryset= Post.objects.all().order_by("-pk")
  permission_classes = [CustomReadOnly]
  filterset_fields = ["author", "likes"]

  def get_serializer_class(self):
    if self.action == "list" or "retrieve":
      return PostSerializer
    return PostCreateSerializer

  def perform_create(self, serializer):
    profile = Profile.objects.get(user=self.request.user)
    serializer.save(author=self.request.user, profile=profile)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def like_post(request, pk):
  post = get_object_or_404(Post, pk=pk)
  if request.user in post.likes.all():
    post.likes.remove(request.user)
  else:
    post.likes.add(request.user)

  return Response({"status": "ok", "count": len(post.likes.all())})

class CommentViewSet(viewsets.ModelViewSet):
  queryset = Comment.objects.all()
  permission_classes = [CustomReadOnly]

  def get_serializer_class(self):
    if self.action == "list" or "retrieve":
      return CommentSerializer
    return CommentCreateSerializer

  def perform_create(self, serializer):
    profile = Profile.objects.get(user=self.request.user)
    serializer.save(author=self.request.user, profile=profile)

def index(request):
  return render(request, "posts/index.html")