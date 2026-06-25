from fastapi import FastAPI
from crud import create_player, get_all_players, create_session, get_all_sessions, create_rsvp
from models import PlayerCreate, SessionCreate, RSVPCreate 

app = FastAPI()

@app.get('/players') 
def get_players(): 
    return get_all_players()

@app.post('/players')
def add_player(player: PlayerCreate): 
    new_player = create_player(player)
    return new_player

@app.post('/sessions')
def add_session(game_session: SessionCreate):
    new_session = create_session(game_session)
    return new_session

@app.get('/sessions')
def get_session():
    return get_all_sessions()

@app.post('/rsvps')
def add_rsvp(rsvp:RSVPCreate):
    player_response = create_rsvp(rsvp)
    return player_response