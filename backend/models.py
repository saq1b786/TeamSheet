from pydantic import BaseModel 

class PlayerCreate(BaseModel):
    first_name : str 
    last_name : str 
    phone_number : str 


class SessionCreate(BaseModel):
    location : str
    pitch_cost : float 
    date : str
    time : str


class RSVPCreate(BaseModel):
    player_id : int
    session_id : int
    is_coming : bool 

class ArrivalCreate(BaseModel):
    player_id : int
    session_id : int

class PaymentCreate(BaseModel): 
    player_id : int 
    session_id : int 

