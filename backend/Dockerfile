FROM python:3.8-alpine
RUN apk add --no-cache build-base
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
WORKDIR /backend
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .


