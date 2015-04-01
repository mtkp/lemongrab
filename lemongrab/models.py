# models.py

# define list schema
schema = {
    'type': 'object',
    'properties': {
        'description': {'type': 'string'},
        'items': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'description': {'type': 'string'},
                    'completed': {'type': 'boolean'},
                },
                'required': ['description', 'completed'],
            },
        },
    },
    'required': ['description', 'items'],
}

def default_list():
    return {
        'description': '',
        'items': [],
    }

mock_list = {
    'description': 'Stuff to do for dinner',
    'items': [
        {
            'description': 'pick recipe',
            'completed': True,
        },
        {
            'description': 'get the groceries',
            'completed': True,
        },
        {
            'description': 'cook dinner',
            'completed': False,
        },
        {
            'description': 'eat dinner',
            'completed': False,
        },
    ]
}
