from fastapi import FastAPI
from crud import create_player, get_all_players 
from models import PlayerCreate 

app = FastAPI()

@app.get('/players') 
def get_players(): 
    return get_all_players()

@app.post('/players')
def add_player(player: PlayerCreate): 
    new_player = create_player(player)
    return new_player