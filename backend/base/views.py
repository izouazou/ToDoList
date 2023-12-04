from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import (
    retrieve_all_tasks,
    retrieve_task_details,
    create_new_task,
    update_existing_task,
    delete_specified_task,
    toggle_task_completion,
)
# Create your views here.


@api_view(['GET'])
def index(request):
    return Response("Hello, world. You're at the ToDo List index.")




@api_view(['GET', 'POST'])
def task_operations(request):
    """
    API endpoint to handle GET (retrieve tasks) and POST (create task) requests.
    """
    if request.method == 'GET':
        return retrieve_all_tasks(request)
    elif request.method == 'POST':
        return create_new_task(request)


@api_view(['GET', 'PUT', 'DELETE', 'POST'])
def task_operation(request, pk):
    """
    API endpoint to handle GET (retrieve task), PUT (update task), DELETE (delete task),
    and POST (complete task) requests for a specific task identified by 'pk'.
    """
    if request.method == 'GET':
        return retrieve_task_details(request, pk)
    elif request.method == 'PUT':
        return update_existing_task(request, pk)
    elif request.method == 'DELETE':
        return delete_specified_task(request, pk)
    elif request.method == 'POST':
        return toggle_task_completion(request, pk)