
import click
from api.models import db, User, Role, Difficulty, Quest, Rarity, Reward, Ability

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")


    @app.cli.command("insert-test-data")
    def insert_test_data():
        ##  ROLES  ##
        print("Creating db roles")
        B = Role()
        B.name = "Barbarian"
        B.passive = 8
        db.session.add(B)
        db.session.commit()
        print("Barbarian created.")

        W = Role()
        W.name = "Wizard"
        W.passive = 2
        db.session.add(W)
        db.session.commit()
        print("Wizard created.")

        R = Role()
        R.name = "Rogue"
        R.passive = 20
        db.session.add(R)
        db.session.commit()
        print("Rogue created.")
        print("All roles created")


        ##  QUEST DIFFICULTY  ##
        print("Creating db quest difficulty")
        Easy = Difficulty()
        Easy.name = "Easy"
        Easy.experience_given = 7
        Easy.energy_given = 4
        db.session.add(Easy)
        db.session.commit()
        print("Easy created.")

        Medium = Difficulty()
        Medium.name = "Medium"
        Medium.experience_given = 13
        Medium.energy_given = 9
        db.session.add(Medium)
        db.session.commit()
        print("Medium created.")

        Hard = Difficulty()
        Hard.name = "Hard"
        Hard.experience_given = 20
        Hard.energy_given = 15
        db.session.add(Hard)
        db.session.commit()
        print("Hard created.")        
        print("All quests difficulties created")


        ##  REWARD RARITY  ##
        print("Creating db reward rarities")
        Common = Rarity()
        Common.name = "Common"
        Common.energy_required = 20
        db.session.add(Common)
        db.session.commit()
        print("Common created.")

        Rare = Rarity()
        Rare.name = "Rare"
        Rare.energy_required = 65
        db.session.add(Rare)
        db.session.commit()
        print("Rare created.")

        Legendary = Rarity()
        Legendary.name = "Legendary"
        Legendary.energy_required = 90  
        db.session.add(Legendary)
        db.session.commit()
        print("Legendary created.")        
        print("All reward rarities created")
        

        ##  ROLES ABILITIES  ##
        print("Creating db role abilities")
        BH1 = Ability()
        BH1.name = "Power Throw"
        BH1.role_id = 1   
        BH1.rarity_id = 1 
        db.session.add(BH1)
        db.session.commit()

        BH2 = Ability()
        BH2.name = "Skull Breaker"
        BH2.role_id = 1    
        BH2.rarity_id = 2
        db.session.add(BH2)
        db.session.commit()

        BH3 = Ability()
        BH3.name = "Battle Rage"
        BH3.role_id = 1    
        BH3.rarity_id = 3
        db.session.add(BH3)
        db.session.commit()
        print("Barbarian abilities created.")

        WH1 = Ability()
        WH1.name = "Fire Breath"
        WH1.role_id = 2   
        WH1.rarity_id = 1 
        db.session.add(WH1)
        db.session.commit()

        WH2 = Ability()
        WH2.name = "Wind Vortex"
        WH2.role_id = 2    
        WH2.rarity_id = 2
        db.session.add(WH2)
        db.session.commit()

        WH3 = Ability()
        WH3.name = "Lightning Blast"
        WH3.role_id = 2    
        WH3.rarity_id = 3
        db.session.add(WH3)
        db.session.commit()
        print("Wizard abilities created.")

        RH1 = Ability()
        RH1.name = "Distraction Crackers"
        RH1.role_id = 3   
        RH1.rarity_id = 1 
        db.session.add(RH1)
        db.session.commit()

        RH2 = Ability()
        RH2.name = "Swift and Easy"
        RH2.role_id = 3    
        RH2.rarity_id = 2
        db.session.add(RH2)
        db.session.commit()

        RH3 = Ability()
        RH3.name = "Table Heist"
        RH3.role_id = 3    
        RH3.rarity_id = 3
        db.session.add(RH3)
        db.session.commit()
        print("Rogue abilities created.")
        print("All abilities created.")