FROM ubuntu

# install python and pip
RUN apt-get update
RUN apt-get install -y python python-dev python-distribute python-pip python-tk

# move app into place
ADD . /app
WORKDIR /app

# install server dependencies
RUN pip install -r requirements.txt

# run tests
RUN ./run-tests.bash

# start server
EXPOSE 5000
CMD ./run-server.bash --gunicorn
