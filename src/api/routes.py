from flask import Blueprint, request, jsonify
from api.models import db, User, FavoriteCharacter
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# CREATE NEW USER [POST]
@api.route('/users', methods=['POST'])
def create_user():
    data = request.json
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'User with this email already exists'}), 400

    new_user = User(
        email=data['email'],
        password=data['password'],
        first_name=data.get('first_name'),
        last_name=data.get('last_name')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

# LIST all USERS [GET]
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

# LIST USER BY ID [GET]
@api.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    current_user = get_jwt_identity()
    if current_user != user_id:
        return jsonify({"msg": "Access forbidden: You can only access your own user data."}), 403

    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    user_data = user.serialize()
    return jsonify(user_data), 200

# UPDATE USER [PUT]
@api.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    current_user = get_jwt_identity()
    if current_user != user_id:
        return jsonify({"msg": "Access forbidden: You can only update your own user data."}), 403

    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    data = request.json
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    db.session.commit()
    return jsonify(user.serialize()), 200

# DELETE USER [DELETE]
@api.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user = get_jwt_identity()
    if current_user != user_id:
        return jsonify({"msg": "Access forbidden: You can only delete your own user data."}), 403

    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200

# SIGNUP [POST]
@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email', None)
    password = data.get('password', None)
    first_name = data.get('first_name', None)
    last_name = data.get('last_name', None)

    if not email or not password or not first_name or not last_name:
        return jsonify({"msg": "Missing email, password, first name, or last name"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

# LOGIN [POST]
@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email', None)
    password = data.get('password', None)
    
    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400
    
    user = User.query.filter_by(email=email, password=password).first()
    
    if not user:
        return jsonify({"msg": "Bad email or password"}), 401
    
    # Generate JWT token with the user's ID
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

# ADD A FAVORITE CHARACTER [POST]
@api.route('/favorites/characters', methods=['POST'])
@jwt_required()
def add_favorite_character():
    data = request.json
    current_user = get_jwt_identity()

    user = User.query.get(current_user)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    character_id = data.get('character_id')
    name = data.get('name')
    image = data.get('image')

    if not character_id or not name:
        return jsonify({"msg": "Missing character_id or name"}), 400

    new_favorite = FavoriteCharacter(
        user_id=user.id,
        character_id=character_id,
        name=name,
        image=image
    )

    db.session.add(new_favorite)
    db.session.commit()

    return jsonify(new_favorite.serialize()), 201

# GET FAVORITE CHARACTERS [GET]
@api.route('/favorites/characters', methods=['GET'])
@jwt_required()
def get_favorite_characters():
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    favorite_characters = user.favorite_characters
    return jsonify([fc.serialize() for fc in favorite_characters]), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
