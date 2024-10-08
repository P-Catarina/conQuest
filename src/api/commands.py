
import click
from api.models import db, User, Role, Difficulty, Task, Rarity, Reward, Ability

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
        B.description = "Battle Rage is merciless and extremely powerful. This means a greater chance at defeating your enemies and achieve victory."
        B.passive = 8
        db.session.add(B)
        db.session.commit()
        print("Barbarian created.")

        W = Role()
        W.name = "Wizard"
        W.description = "Being a master at conjuring comes with it's own perks. Your Arcana abilities enable you to summon a second encounter."
        W.passive = 2
        db.session.add(W)
        db.session.commit()
        print("Wizard created.")

        R = Role()
        R.name = "Rogue"
        R.description = "Sneaky little bastard ain't we? How come you never get caught stealling extra experience from the master vault?"
        R.passive = 20
        db.session.add(R)
        db.session.commit()
        print("Rogue created.")
        print("All roles created")


        ##  TASK DIFFICULTY  ##
        print("Creating db task difficulty")
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
        print("All tasks difficulties created")


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


        ##  TEST USER  ##
        print("Creating test user")
        user = User()
        user.name = "user"
        user.email = "user@test"
        user.password = "user"
        user.user_role = 2
        user.level = 1
        user.experience = 78
        user.energy = 23
        user.encounter = 0
        db.session.add(user)
        db.session.commit()
        print("Test user created.")
        print("email: user@test   password: user")


        ##  TASKS  ##
        print("Creating db dummy tasks")
        task1 = Task()
        task1.label = "fill in taxes form"
        task1.user_id = 1
        task1.task_difficulty_id = 3
        task1.done = False    
        task1.onboard = True 
        db.session.add(task1)
        db.session.commit()

        task2 = Task()
        task2.label = "call mom"
        task2.user_id = 1
        task2.task_difficulty_id = 1  
        task2.done = False    
        task2.onboard = True  
        db.session.add(task2)
        db.session.commit()

        task3 = Task()
        task3.label = "return book to library"
        task3.user_id = 1
        task3.task_difficulty_id = 2  
        task3.done = False       
        task3.onboard = True 
        db.session.add(task3)
        db.session.commit()

        task4 = Task()
        task4.label = "break up with Linda, it's not her it's me..."
        task4.user_id = 1
        task4.task_difficulty_id = 3
        task4.done = False 
        task4.onboard = True 
        db.session.add(task4)
        db.session.commit()
        print("4 tasks created.")


        ##  REWARDS  ##
        print("Creating db dummy rewards")
        reward1 = Reward()
        reward1.label = "new limited edition oreo icecream"
        reward1.user_id = 1
        reward1.rarity_id = 1 
        reward1.done = False         
        db.session.add(reward1)
        db.session.commit()

        reward2 = Reward()
        reward2.label = "camping trip"
        reward2.user_id = 1
        reward2.rarity_id = 3  
        reward2.done = False       
        db.session.add(reward2)
        db.session.commit()

        reward3 = Reward()
        reward3.label = "taco tuesday"
        reward3.user_id = 1
        reward3.rarity_id = 2    
        reward3.done = False     
        db.session.add(reward3)
        db.session.commit()

        reward4 = Reward()
        reward4.label = "realize I'm worthy of love too and win Linda back!!!"
        reward4.user_id = 1
        reward4.rarity_id = 3
        reward4.done = False 
        db.session.add(reward4)
        db.session.commit()
        print("4 rewards created.")