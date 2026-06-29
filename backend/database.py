from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy import create_engine

class Base(DeclarativeBase):
    pass


engine = create_engine("sqlite:///teamsheet.db")
SessionLocal = sessionmaker(bind=engine)

class Player(Base):
    __tablename__ = 'players'

    id = Column(Integer, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)
    tallies = Column(Integer, default=0)
    consecutive_clean_weeks = Column(Integer, default=0)

class GameSession(Base):
    __tablename__ = 'sessions'

    id = Column(Integer, primary_key=True)
    location = Column(String, nullable=True)
    pitch_cost = Column(Float, nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)

class RSVP(Base):
    __tablename__ = 'rsvp'

    id = Column(Integer, primary_key=True)
    player_id = Column(Integer, ForeignKey('players.id'))
    session_id = Column(Integer, ForeignKey('sessions.id'))
    is_coming = Column(Boolean, nullable=False)

class Arrival(Base):
    __tablename__ = 'arrivals'

    id = Column(Integer, primary_key=True)
    player_id = Column(Integer, ForeignKey('players.id'))
    session_id = Column(Integer, ForeignKey('sessions.id'))
    arrival_time = Column(String, nullable=False)
    is_late = Column(Boolean, default=False)


class Payment(Base):
    __tablename__ = 'payments'

    id = Column(Integer, primary_key=True)
    player_id = Column(Integer, ForeignKey('players.id'))
    session_id = Column(Integer, ForeignKey('sessions.id'))
    paid_at = Column(String, nullable=False)
    paid_late = Column(Boolean, default=False)


Base.metadata.create_all(engine)