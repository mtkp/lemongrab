# lemongrab

## setup

One time stuff:
- Install or update `pip`: https://pip.pypa.io/en/latest/installing.html
- Install `virtualenvwrapper` (including adding to your startup script): https://virtualenvwrapper.readthedocs.org/en/latest/install.html
- Create a virtual environment for this project: `$ mkvirtualenv lemongrab`
- Clone the `lemongrab` repository.

Getting to work:
```sh
$ cd lemongrab
$ workon lemongrab                 # set the virtual environment
$ pip install -r requirements.txt  # install latest python dependencies
$ # ... make some changes
$ pip freeze > requirements.txt    # ensure dependencies are up to date
$ deactivate                       # un-set the virtual environment
```
