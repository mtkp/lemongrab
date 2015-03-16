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
