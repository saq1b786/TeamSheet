from database import * 
from models import * 

def create_player(player: PlayerCreate) -> str: 
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

def create_session(game_session: SessionCreate)->str: 
    session = SessionLocal()

    new_game_session = GameSession(location=game_session.location, pitch_cost=game_session.pitch_cost, date=game_session.date, time=game_session.time)
    session.add(new_game_session)
    session.commit()
    session.close()

    return f'{new_game_session} has been added!'

def get_all_sessions():
    session = SessionLocal()

    all_sessions = session.query(GameSession).all()
    session.close()

    return all_sessions

def create_rsvp(rsvp: RSVPCreate):
    session = SessionLocal()

    player_response = RSVP(player_id = rsvp.player_id, session_id = rsvp.session_id, is_coming = rsvp.is_coming)
    
    session.add(player_response)
    session.commit()
    session.close()
    return player_response

