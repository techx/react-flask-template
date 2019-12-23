from urllib.parse import quote
from flask_restful import Resource, reqparse
from server.controllers.authentication import authenticate_firsttime
from server.api.v1 import return_failure, return_success

LOGIN_PARSER = reqparse.RequestParser(bundle_errors=True)
LOGIN_PARSER.add_argument('email', help='email', required=True)
LOGIN_PARSER.add_argument('token', help='token', required=True)
LOGIN_PARSER.add_argument('uid', help="uid", required=True)


class ClientLogin(Resource):
    def post(self):
        """
        Login into reddlinks with dopeauth
        Return success if token and uid are created
        """
        data = LOGIN_PARSER.parse_args()
        email = data['email']
        uid = data['uid']
        token = data['token']
        client = authenticate_firsttime(email, uid, token)
        if (client is None):
            # Unauthenticated
            return return_failure("login credentials invalid")

        return return_success({"email": email, "token": client.token, "uid": client.uid})
