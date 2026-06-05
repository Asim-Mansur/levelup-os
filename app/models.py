from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    level = Column(Integer, default=1)
    total_xp = Column(Integer, default=0)
    current_xp = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    skills = relationship("Skill", back_populates="user")
    activities = relationship("ActivityLog")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    name = Column(String)
    level = Column(Integer, default=1)
    current_xp = Column(Integer, default=0)
    total_xp = Column(Integer, default=0)

    user = relationship("User", back_populates="skills")
    activities = relationship("ActivityLog")

class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    skill_id = Column(Integer, ForeignKey("skills.id"))

    description = Column(String)
    xp_earned = Column(Integer)

    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    skill = relationship("Skill")