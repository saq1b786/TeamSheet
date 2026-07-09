from fastapi import FastAPI
from crud import create_player, get_all_players, create_session, get_all_sessions, create_rsvp, create_arrival, create_payment, get_flagged_players, get_tallied_players, get_session_details, close_session, login_player
from models import PlayerCreate, SessionCreate, RSVPCreate, ArrivalCreate, PaymentCreate, LoginRequest
from auth import *
app = FastAPI()

@app.get('/players') 
def get_players(current_player: dict = Depends(get_current_player)): 
    return get_all_players()

@app.post('/players')
def add_player(player: PlayerCreate): 
    new_player = create_player(player)
    return new_player

@app.post('/sessions')
def add_session(game_session: SessionCreate, current_player: dict = Depends(get_current_player)):
    if not current_player["is_admin"]:
        raise HTTPException(status_code=403, detail="Admin access only")
    new_session = create_session(game_session)
    return new_session

@app.get('/sessions')
def get_session(current_player: dict = Depends(get_current_player)):
    return get_all_sessions()

@app.post('/rsvps')
def add_rsvp(rsvp: RSVPCreate, current_player: dict = Depends(get_current_player)):
    player_response = create_rsvp(rsvp)
    return player_response

@app.post('/arrivals')
def log_arrival(arrival: ArrivalCreate, current_player: dict = Depends(get_current_player)):
    logged_arrival = create_arrival(arrival)
    return logged_arrival

@app.post('/payments')
def log_payments(payment:PaymentCreate, current_player: dict = Depends(get_current_player)):
    player_pay = create_payment(payment)
    return player_pay

@app.get('/players/flagged')
def flagged_players(current_player: dict = Depends(get_current_player)):
    if not current_player["is_admin"]:
        raise HTTPException(status_code=403, detail="Admin access only")
    flagged = get_flagged_players()
    return flagged

@app.get('/players/tallied')
def tallied_players(current_player: dict = Depends(get_current_player)):
    if not current_player["is_admin"]:
        raise HTTPException(status_code=403, detail="Admin access only")
    tallies = get_tallied_players()
    return tallies

@app.get('/sessions/{session_id}')
def session_details(session_id: int, current_player: dict = Depends(get_current_player)):
    return get_session_details(session_id)


@app.post('/sessions/{session_id}/close')
def close_game_session(session_id: int, current_player: dict = Depends(get_current_player)):
    if not current_player["is_admin"]:
        raise HTTPException(status_code=403, detail="Admin access only")
    return close_session(session_id)

@app.post('/login')
def login(log_info: LoginRequest): 
    return login_player(log_info.phone_number, log_info.password)