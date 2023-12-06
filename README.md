# To-Do List Web Application: Setup Guide

![GitHub Logo](https://github.com/izouazou/ToDoList/blob/main/Architecture.PNG)

## Prerequisites
Before setting up the To-Do List Web Application, ensure that you have the following software installed on your system:
- [Python 3.11](https://www.python.org/downloads/)  or newer
- [Node.js 20.9.0 LTS ](https://nodejs.org/en/download/) or newer
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/products/docker-desktop/)

Open your terminal or command prompt.    
Create a directory named "dev" and navigate to it:  

    
    mkdir dev
    cd dev
    
    
Clone the To-Do List repository from GitHub:

    
    git clone https://github.com/izouazou/ToDoList/
    cd ToDoList
    
## Environment Setup

Set up a Python virtual environment:  

    
    c:/python311/python.exe -m venv env
    env\Scripts\activate
    

Install required packages and tools: we use rav. Open rav.yaml to see the various commands available if you prefer to not use rav.

    
    python -m pip install pip pip-tools rav --upgrade
    rav run installs
    
## Running the Application


With the configuration and installation steps completed, use the following commands to run the To-Do List Web Application:  

    
    rav run migrate
    rav run build
    rav run docker-dev
    

Simply enter http://127.0.0.1/ in your browser to interact with the application.


## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/izouazou/ToDoList/blob/main/LICENSE) file for details.




