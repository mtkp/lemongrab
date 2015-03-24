# models.py

# define list schema
schema = {
    'type': 'object',
    'properties': {
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
    'required': ['items'],
}

mock_list = {
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
