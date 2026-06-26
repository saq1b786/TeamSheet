from fastapi import FastAPI
from crud import create_player, get_all_players, create_session, get_all_sessions, create_rsvp, create_arrival, create_payment, get_flagged_players, get_tallied_players
from models import PlayerCreate, SessionCreate, RSVPCreate, ArrivalCreate, PaymentCreate

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

@app.post('/arrivals')
def log_arrival(arrival: ArrivalCreate):
    logged_arrival = create_arrival(arrival)
    return logged_arrival

@app.post('/payments')
def log_payments(payment:PaymentCreate):
    player_pay = create_payment(payment)
    return player_pay

@app.get('/players/flagged')
def flagged_players():
    flagged = get_flagged_players()
    return flagged

@app.get('/players/tallied')
def tallied_players():
    tallies = get_tallied_players()
    return tallies