from django.urls import path
from .views import HelloAPI, booksAPI, bookAPI, BooksAPI, BookAPI, BooksAPIMixins, BookAPIMixins, BookAPIGenerincs, BooksAPIGenerics, BookViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register("viewset/books", BookViewSet)

urlpatterns = [
    path('', HelloAPI),
    path("fbv/books/", booksAPI),
    path("fbv/book/<int:bid>", bookAPI),
    path("cbv/books/", BooksAPI.as_view()),
    path("cbv/book/<int:bid>", BookAPI.as_view()),
    path("mixin/books/", BooksAPIMixins.as_view()),
    path("mixin/book/<int:bid>/", BookAPIMixins.as_view()),
    path("generic/books/", BooksAPIGenerics.as_view()),
    path("generic/book/<int:bid>/", BookAPIGenerincs.as_view()),
    *router.urls,
]
