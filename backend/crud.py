from database import * 
from models import * 
import datetime

def create_player(player: PlayerCreate) -> str: 
    session = SessionLocal()

    existing_player = session.query(Player).filter_by(phone_number = player.phone_number).first()
    if existing_player:
        session.close()
        return {'message': 'Phone number already exists. You need to register using a new phone number.'}

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

def create_arrival(arrival: ArrivalCreate):
    session = SessionLocal()
    game = session.query(GameSession).filter_by(id= arrival.session_id).first()
    arrival_time = datetime.now().strftime("%H:%M")
    new_arrival = Arrival(player_id = arrival.player_id, session_id = arrival.session_id, arrival_time = arrival_time, is_late = False)

    session.add(new_arrival)
    
    if arrival_time > game.time:
        new_arrival.is_late = True
        player = session.query(Player).filter_by(id= arrival.player_id).first()
        player.tallies += 1

    session.commit()
    session.close()
    return new_arrival 

def create_payment(payment: PaymentCreate):
    session = SessionLocal()

    game = session.query(GameSession).filter_by(id= payment.session_id).first()
    paid_at = datetime.now().strftime("%H:%M")
    new_payment = Payment(player_id = payment.player_id, session_id = payment.session_id, paid_at = paid_at, paid_late = False)

    session.add(new_payment)

    if paid_at > game.time:
        new_payment.paid_late = True
        player = session.query(Player).filter_by(id= payment.player_id).first()
        player.tallies += 1
    
    session.commit()
    session.close()
    return new_payment


def get_flagged_players(): 
    session = SessionLocal()
    flagged_players = session.query(Player).filter(Player.tallies >= 3).all()

    session.close()
    return flagged_players


def get_tallied_players():
    session = SessionLocal()
    tallied = session.query(Player).filter(Player.tallies >= 1).all()
    session.close()
    return tallied


def get_session_details(session_id: int): 
    session = SessionLocal()

    specific_game = session.query(GameSession).filter_by(id= session_id).first()
    rsvp = session.query(RSVP).filter_by(session_id= session_id).all()
    arrivals = session.query(Arrival).filter_by(session_id= session_id).all()
    all_payments = session.query(Payment).filter_by(session_id= session_id).all()

    session.close()

    return {
        "session" : specific_game, 
        "rsvps" : rsvp, 
        "arrivals" : arrivals, 
        "payments" : all_payments
    }


def close_session(session_id: int):
    session = SessionLocal()

    find_players_for_session = session.query(RSVP).filter_by(session_id=session_id, is_coming=True).all()

    for player in find_players_for_session: 
        arrival_record = session.query(Arrival).filter_by(player_id = player.player_id, session_id = player.session_id).first()
        payment_record = session.query(Payment).filter_by(player_id = player.player_id, session_id = player.session_id).first()
        specific_player = session.query(Player).filter_by(id = player.player_id).first()

        if not arrival_record.is_late and not payment_record.paid_late: 
            specific_player.consecutive_clean_weeks += 1
            if specific_player.consecutive_clean_weeks >=8:
                specific_player.consecutive_clean_weeks =0 
                specific_player.tallies = 0 
        else: 
            specific_player.consecutive_clean_weeks = 0 

    session.commit()
    session.close()

    return {'message: Session closed and player records updated!'}









