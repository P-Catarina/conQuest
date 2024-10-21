"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Role, Difficulty, Quest, Rarity, Reward, Bestiary, Ability
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from random import randint
import hashlib
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

###################################################################################  ROLES ROUTES

@api.route("/roles", methods=['GET'])
def get_roles_list():
    roles= Role.query.all()
    all_roles= list(map(lambda x: x.serialize(), roles))
    return jsonify(all_roles), 200

###################################################################################  ABILITY ROUTES

@api.route("/ability",  methods=['GET'])
def get_all_abilities():
    ability= Ability.query.all()
    all_abilities= list(map(lambda x: x.serialize(), ability))
    return jsonify(all_abilities), 200


###################################################################################  QUEST DIFFICULTY ROUTES

@api.route("/difficulty",  methods=['GET'])
def get_difficulties():
    difficulties= Difficulty.query.all()
    all_difficulties= list(map(lambda x: x.serialize(), difficulties))
    all_difficulties.insert(0, None)
    return jsonify(all_difficulties), 200

###################################################################################  REWARD RARITY ROUTES

@api.route("/rarity",  methods=['GET'])
def get_rarities():
    rarity= Rarity.query.all()
    all_rarities= list(map(lambda x: x.serialize(), rarity))
    all_rarities.insert(0, None)
    return jsonify(all_rarities), 200

###################################################################################  USER ROUTES

@api.route('/login', methods=['POST'])
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    h = hashlib.new('SHA256')
    h.update(password.encode())
    password = h.hexdigest()

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Email or Password is Wrong!"}), 401
    
    jwt_token = create_access_token(identity=user.id)
    return jsonify({ "token": jwt_token, "user_id": user.id, "level": user.level })

@api.route("/users",  methods=['GET'])
def get_all_users():
    users= User.query.all()
    all_users= list(map(lambda x: x.serialize(), users))

    for x in all_users:
        role = Role.query.get(x["user_role"])
        x.update({"role": role.name})
        beasts = Bestiary.query.filter_by(user_id = x["id"])
        beasts = list(map(lambda x: x.serialize(), beasts))
        x.update({"bestiary": int(len(beasts))})

    return jsonify(all_users), 200

@api.route("/users",  methods=['POST'])
def create_user():
    new_user = request.get_json()

    if 'name' not in new_user:
        return "Name should be in New user Body", 400
    if 'password' not in new_user:
        return "password should be in New user Body", 400
    if 'email' not in new_user:
        return "email should be in New user Body", 400
    
    h = hashlib.new('SHA256')
    h.update(new_user['password'].encode())
    password = h.hexdigest()

    new_user = User(
        name = new_user['name'],
        password = password,
        email = new_user['email'],
        level= 1,
        experience = 0,
        energy = 0,
        encounter = 0,
        user_role = 1
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "New user is Created"}), 201

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):

    user = User.query.get(user_id)
    if user is None:
        return "No People with id: " + str(user_id), 400

    role = Role.query.get(user.user_role)

    ability = Ability.query.filter_by(role_id = user.user_role)
    role_abilities = list(map(lambda x: x.serialize(), ability))

    for x in role_abilities:
        rarity = Rarity.query.get(x["rarity_id"])
        x.update({"energy_required": rarity.energy_required})

    role_abilities.insert(0, None)

    one_user = user.serialize()
    one_user.update({"role": role.name})

    return jsonify(one_user, role_abilities), 200

@api.route('/password/<int:user_id>', methods=['PUT'])
def change_password(user_id):

    passwords = request.get_json()
    user = User.query.get(user_id)
    if user is None:
        return "No People with id: " + str(user_id), 400
    
    h = hashlib.new('SHA256')
    h.update(passwords['currentPassword'].encode())
    currentPassword = h.hexdigest()
    h = hashlib.new('SHA256')
    h.update(passwords['newPassword'].encode())
    newPassword = h.hexdigest()
    
    if currentPassword == user.password :
        user.password = newPassword
        db.session.commit()
        return jsonify({"msg": "Password is updated"}), 200
    else :
        return jsonify({"msg": "Could not change password"}), 400

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):

    new_updated_user = request.get_json()
    old_user_obj = User.query.get(user_id)

    if old_user_obj is None:
        return "No User with id: " + str(user_id), 400

    if 'name' in new_updated_user:
        old_user_obj.name = new_updated_user['name']

    if 'email' in new_updated_user:
        old_user_obj.email = new_updated_user['email']

    if 'user_role' in new_updated_user:
        old_user_obj.user_role = new_updated_user['user_role']

    if 'level' in new_updated_user:
        old_user_obj.level = new_updated_user['level']

    if 'energy' in new_updated_user:
        old_user_obj.energy = new_updated_user['energy']

    if 'experience' in new_updated_user:
        old_user_obj.experience = new_updated_user['experience']

    if 'encounter' in new_updated_user:
        old_user_obj.encounter = new_updated_user['encounter']

    db.session.commit()

    return jsonify({"msg": "User is Updated"}), 200

@api.route('/delete/<int:user_id>', methods=['PUT'])
def delete_user(user_id):

    deleting = request.get_json()
    user = User.query.get(user_id)

    if user is None:
        return "No User with id: " + str(user_id), 400

    if 'email' in deleting:
        user.email = deleting['email']

    if 'password' in deleting:
        user.password = deleting['password']

    db.session.commit()

    return jsonify({"msg": "User deleted."}), 200

###################################################################################  QUESTS ROUTES

@api.route("/quests",  methods=['GET'])
def get_quests():
    quests= Quest.query.all()
    all_quests= list(map(lambda x: x.serialize(), quests))
    return jsonify(all_quests), 200

@api.route('/questsDone', methods=['GET'])
def get_all_quest_done_onboard():
    quests = Quest.query.filter_by(done = True, onboard = True)
    quest_list = list(map(lambda x: x.serialize(), quests))

    return jsonify(quest_list), 200

@api.route("/quests",  methods=['POST'])
def create_quest():
    new_quest = request.get_json()

    if 'label' not in new_quest:
        return "label should be in New quest Body", 400
    if 'user_id' not in new_quest:
        return "user_id should be in New quest Body", 400
    if 'quest_difficulty_id' not in new_quest:
        return "quest_difficulty_id should be in New quest Body", 400

    new_quest = Quest(
        label = new_quest['label'],
        user_id = new_quest['user_id'],
        quest_difficulty_id = new_quest['quest_difficulty_id'],
        done = False,
        onboard = True

        )

    db.session.add(new_quest)
    db.session.commit()

    return jsonify({"msg": "New quest is Created"}), 201


@api.route('/quests/<int:the_user_id>', methods=['GET'])
def get_quest_list(the_user_id):

    quests = Quest.query.filter_by(user_id = the_user_id, onboard = True)
    if quests is None:
        return "No quests from user: " + str(the_user_id), 400
    
    quest_list = list(map(lambda x: x.serialize(), quests))

    return jsonify(quest_list), 200

@api.route('/quests/<int:quest_id>', methods=['PUT'])
def update_quest(quest_id):

    new_updated_quest = request.get_json()
    old_quest_obj = Quest.query.get(quest_id)

    if old_quest_obj is None:
        return "No quest with id: " + str(quest_id), 400

    if 'label' in new_updated_quest:
        old_quest_obj.label = new_updated_quest['label']
    
    if 'quest_difficulty_id' in new_updated_quest:
        old_quest_obj.quest_difficulty_id = new_updated_quest['quest_difficulty_id']
    
    if 'done' in new_updated_quest:
        old_quest_obj.done = new_updated_quest['done']

    if 'done' in new_updated_quest:
        old_quest_obj.done = new_updated_quest['done']

    if 'onboard' in new_updated_quest:
        old_quest_obj.onboard = new_updated_quest['onboard']


    db.session.commit()

    return jsonify({"msg": "quest is Updated"}), 200

###################################################################################  REWARD ROUTES

@api.route("/rewards",  methods=['GET'])
def get_rewards():
    rewards= Reward.query.all()
    all_rewards= list(map(lambda x: x.serialize(), rewards))
    return jsonify(all_rewards), 200


@api.route("/rewards",  methods=['POST'])
def create_reward():
    new_reward = request.get_json()

    if 'label' not in new_reward:
        return "label should be in New quest Body", 400
    if 'user_id' not in new_reward:
        return "user_id should be in New quest Body", 400
    if 'rarity_id' not in new_reward:
        return "rarity_id should be in New quest Body", 400
    
  
    new_reward = Reward(
        label = new_reward['label'],
        user_id = new_reward['user_id'],
        rarity_id = new_reward['rarity_id'],
        done = False
        )

    db.session.add(new_reward)
    db.session.commit()

    return jsonify({"msg": "New reward is Created"}), 201

@api.route('/rewards/<int:the_user_id>', methods=['GET'])
def get_reward_list(the_user_id):

    reward = Reward.query.filter_by(user_id = the_user_id, done = False)
    if reward is None:
        return "No rewards from user: " + str(the_user_id), 400
    
    reward_list = list(map(lambda x: x.serialize(), reward))

    return jsonify(reward_list), 200

@api.route('/rewards/<int:reward_id>', methods=['PUT'])
def update_reward(reward_id):

    new_updated_reward = request.get_json()
    old_reward_obj = Reward.query.get(reward_id)

    if old_reward_obj is None:
        return "No reward with id: " + str(reward_id), 400

    if 'label' in new_updated_reward:
        old_reward_obj.label = new_updated_reward['label']
    
    if 'rarity_id' in new_updated_reward:
        old_reward_obj.rarity_id = new_updated_reward['rarity_id']

    if 'done' in new_updated_reward:
        old_reward_obj.done = new_updated_reward['done']


    db.session.commit()

    return jsonify({"msg": "reward is Updated"}), 200

###################################################################################  BESTIARY ROUTES

@api.route("/bestiary",  methods=['GET'])
def get_bestiary():
    bestiary= Bestiary.query.all()
    bestiary_list = list(map(lambda x: x.serialize(), bestiary))
    return jsonify(bestiary_list), 200

@api.route("/bestiary",  methods=['POST'])
def add_to_bestiary():
    new_creature = request.get_json()

    if 'name' not in new_creature:
        return "name should be in New creature Body", 400
    if 'user_id' not in new_creature:
        return "user_id should be in New creature Body", 400
   
    new_creature = Bestiary(
        name = new_creature['name'],
        type = new_creature['type'],
        api = new_creature['api'],
        user_id = new_creature['user_id'] 
        )

    db.session.add(new_creature)
    db.session.commit()

    return jsonify({"msg": "Added new entry to the bestiary"}), 201

@api.route('/bestiary/<int:the_user_id>', methods=['GET'])
def get_user_bestiary(the_user_id):

    creature = Bestiary.query.filter_by(user_id = the_user_id)
    if creature is None:
        return "No creature from user: " + str(the_user_id), 400
    
    user_bestiary = list(map(lambda x: x.serialize(), creature))

    return jsonify(user_bestiary), 200

