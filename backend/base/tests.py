import json
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Task

class TaskAPITests(TestCase):
    """
    Test cases for Task API.
    """
    def setUp(self):
        """
        Set up the test client.
        """
        self.client = APIClient()

    def test_retrieve_all_tasks(self):
        """
        Test retrieving the list of tasks.
        """
        url = reverse('task_operations')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_task_details(self):
        """
        Test retrieving details of a specific task.
        """
        task = Task.objects.create(body='Test Task')
        url = reverse('task_operation', args=[str(task.id)])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content)['body'], 'Test Task')

    def test_update_existing_task(self):
        """
        Test updating a task.
        """
        task = Task.objects.create(body='Test Task')
        url = reverse('task_operation', args=[str(task.id)])
        data = {'body': 'Updated Task'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Task.objects.get().body, 'Updated Task')

    def test_create_new_task(self):
        """
        Test creating a new task.
        """
        url = reverse('task_operations')
        data = {'body': 'Test Task'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get().body, 'Test Task')

    def test_delete_specified_task(self):
        """
        Test deleting a task.
        """
        task = Task.objects.create(body='Test Task')
        url = reverse('task_operation', args=[str(task.id)])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)

    def test_toggle_task_completion(self):
        """
        Test marking a task as completed.
        """
        task = Task.objects.create(body='Test Task')
        url = reverse('task_operation', args=[str(task.id)])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Task.objects.get().completed, True)

    def test_invalid_task_detail(self):
        """
        Test retrieving details of an invalid task.
        """
        invalid_id = 888
        url = reverse('task_operation', args=[str(invalid_id)])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


