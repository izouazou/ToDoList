from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


@api_view(['GET'])
def index(request):
    return Response("Hello, world. You're at the ToDo List index.")