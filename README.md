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
