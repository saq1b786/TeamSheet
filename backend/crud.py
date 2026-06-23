from database import * 
from models import * 

def create_player(player: PlayerCreate): 
    session = SessionLocal()
    new_player = Player(first_name = player.first_name, last_name = player.last_name, phone_number = player.phone_number)
    session.add(new_player)

    session.commit()
    session.close()
    return f'{player} has been added to the database!'


def get_all_players(): 
    session = SessionLocal()

    all_players = session.query(Player).all()
    session.close()

    return all_players