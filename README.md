# lemongrab

## setup

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

## run the server

```sh
# assumes python packages installed
$ ./run-server.sh             # starts the server listening on port 5000
$ ./run-server.sh --gunicorn  # starts the server using gunicorn (single worker, port 5000)
```

## run tests

To run the server unit tests:
```sh
$ ./run-tests.sh
```
