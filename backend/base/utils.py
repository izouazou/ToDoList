from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from rest_framework import status


def retrieve_all_tasks(request):
    """
    Retrieve a list of tasks.
    """
    tasks = Task.objects.all().order_by('-updated')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

def retrieve_task_details(request, pk):
    """
    Retrieve details of a specific task identified by 'pk'.
    """
    try:
        task = Task.objects.get(id=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

def update_existing_task(request, pk):
    """
    Update details of a specific task identified by 'pk'.
    """
    try:
        task = Task.objects.get(id=pk)
        serializer = TaskSerializer(task, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response({'error': 'Invalid data provided'}, status=status.HTTP_400_BAD_REQUEST)

    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
        
def create_new_task(request):
    """
    Create a new task.
    """
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response({'error': 'Invalid data provided'}, status=status.HTTP_400_BAD_REQUEST)

def delete_specified_task(request, pk):
    """
    Delete a specific task identified by 'pk'.
    """
    try:
        task = Task.objects.get(id=pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

def toggle_task_completion(request, pk):
    """
    Mark a specific task identified by 'pk' as complete.
    """
    try:
        task = Task.objects.get(pk=pk)
        task.completed = not task.completed
        task.save()
        return Response({'message': 'Task marked as complete successfully'}, status=status.HTTP_200_OK)

    except Task.DoesNotExist:
        return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)