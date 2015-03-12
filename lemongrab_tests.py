#lemongrab_tests.py
from functools import partial
import json
import os
import unittest
from collections import defaultdict

import lemongrab

class LemongrabTestCase(unittest.TestCase):

    def setUp(self):
        lemongrab.app.config['TESTING'] = True
        self.app = lemongrab.app.test_client()

    def tearDown(self):
        # reset the "data_store"
        lemongrab.data_store = defaultdict(list)

    def test_load_app(self):
        resp = self.app.get('/')
        self.assertEqual('text/html', resp.mimetype)
        self.assertEqual(200, resp.status_code)

    def test_load_app_via_list_resource(self):
        resp = self.app.get('/list/test-list')
        self.assertEqual('text/html', resp.mimetype)
        self.assertEqual(200, resp.status_code)

    def test_get_list_that_is_not_yet_saved(self):
        resp = self.app.get('/api/v1/list/test-list')
        self.assertEqual('application/json', resp.mimetype)
        self.assertEqual(200, resp.status_code)

    def test_put_new_list(self):
        data = json.dumps(
            {'items': [{'description': 'put_test', 'completed': True}]}
        )
        resp = self.app.put(
            path='/api/v1/list/test-list',
            content_type='application/json',
            data=data
        )
        self.assertEqual(200, resp.status_code)
        self.assertEqual('Saved "test-list"',resp.data)

    def test_put_then_get_list(self):
        path = '/api/v1/list/test-list'
        expect = {'items': [
            {'description': 'get_test_1', 'completed': False},
            {'description': 'get_test_2', 'completed': True},
        ]}
        self.app.put(
            path=path,
            content_type='application/json',
            data=json.dumps(expect)
        )
        resp = self.app.get(path)
        actual = json.loads(resp.data)
        self.assertEqual(expect, actual)

    def test_put_empty_list(self):
        resp = self.app.put(
            path='/api/v1/list/test-list',
            content_type='application/json',
            data=json.dumps({'items': []})
        )
        self.assertEqual(200, resp.status_code)
        self.assertEqual('Saved "test-list"',resp.data)

    def test_put_with_bad_json_schema(self):
        put = partial(
            self.app.put,
            path='/api/v1/list/test-list',
            content_type='application/json',
        )

        resp = put(data='{}')
        self.assertEqual(403, resp.status_code)
        resp = put(data='{"item": []}')
        self.assertEqual(403, resp.status_code)
        resp = put(data='{"items": [{"description":"test"}]}')
        self.assertEqual(403, resp.status_code)

if __name__ == '__main__':
    unittest.main()
