FROM python:3.9.16-alpine3.18
RUN apk --update add build-base mysql-dev bash
RUN pip install --no-cache-dir "Django<2.1" mysqlclient 

WORKDIR /app
COPY . .

EXPOSE 80
CMD ["bash", "-c", "python app.py migrate && python app.py runserver 0.0.0.0:80"]