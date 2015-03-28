# lemongrab

## development setup

One time stuff:

1. Install or update `pip`: https://pip.pypa.io/en/latest/installing.html
2. Install `virtualenvwrapper`: https://virtualenvwrapper.readthedocs.org/en/latest/install.html
3. Add `virtualenvwrapper` to your startup scripts: https://virtualenvwrapper.readthedocs.org/en/latest/install.html#shell-startup-file
4. Create a virtual environment for this project: `$ mkvirtualenv lemongrab`
5. Clone the `lemongrab` repository.
6. Get to work.

Getting to work:
```sh
$ cd lemongrab
$ workon lemongrab                 # set the virtual environment
$ pip install -r requirements.txt  # install latest python dependencies
$ # ... make some changes
$ pip freeze > requirements.txt    # ensure dependencies are up to date
$ deactivate                       # un-set the virtual environment
```

### run the development server

```sh
$ ./run-server.sh             # starts the server listening on port 5000
```

### run tests

To run the server unit tests:
```sh
$ ./run-tests.sh
```

## deployment

One time stuff:

1. Install elastic beanstalk CLI, `eb`, with pip: http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-getting-set-up.html#eb_cli3-install-with-pip
2. Ensure you have IAM role keys in `~/.aws/credentials` (with elastic beanstalk permissions).
3. Run `eb init` and pull down `lemongrab` from `us-west-2 : US West (Oregon)`.

### deploying

```sh
$ ./deploy.sh
```

You can also use `eb deploy` to force deployment of the latest git commit of the current working branch.

### testing docker

It might be a good idea to test the containerized app before deploying. This can be done with `docker`. To install: https://docs.docker.com/installation/. Once installed, you can use `./run-dockerized-server.bash` to start a container that contains the running server.
