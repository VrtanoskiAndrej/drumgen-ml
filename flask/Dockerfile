FROM python:3.7.4-stretch

WORKDIR /api
ADD . /api

RUN export CC=gcc

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

CMD ["uwsgi", "app.ini"]
