from fastapi.security import OAuth2PasswordRequestForm
from app.security import verify_password, create_access_token, decode_access_token
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.security import hash_password
from app import schemas, models
from fastapi import FastAPI
from .database import engine
from . import models
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
Base.metadata.create_all(bind=engine)
from app.services.xp_engine import calculate_xp, apply_xp
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
@app.get("/test-skills")
def test_skills():
    return [
        {"name": "Football", "level": 2},
        {"name": "Academics", "level": 1},
        {"name": "Finance", "level": 1},
        {"name": "Gym", "level": 1}
    ]
def root():
    return {"message": "LevelUp OS backend running"}
@app.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):

    hashed_pw = hash_password(user.password)

    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create default skills
    default_skills = ["Academics", "Football", "Finance", "Gym"]

    for skill_name in default_skills:
        skill = models.Skill(
            user_id=new_user.id,
            name=skill_name
        )
        db.add(skill)

    db.commit()

    return new_user
@app.post("/login", response_model=schemas.TokenResponse)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = db.query(models.User).filter(
        models.User.email == form_data.username
    ).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    return {"access_token": access_token, "token_type": "bearer"}
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    email = payload.get("sub")

    user = db.query(models.User).filter(
        models.User.email == email
    ).first()

    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return user


@app.get("/profile", response_model=schemas.UserOut)
def get_profile(current_user: models.User = Depends(get_current_user)):
    return current_user
@app.get("/skills")
def get_skills(current_user: models.User = Depends(get_current_user)):
    return current_user.skills
@app.post("/log-activity")
def log_activity(
    activity: schemas.ActivityCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Find skill
    skill = db.query(models.Skill).filter(
        models.Skill.user_id == current_user.id,
        models.Skill.name == activity.skill_name
    ).first()

    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    # Calculate XP
    xp_gained = calculate_xp(activity.value)

    # Process level-up
    apply_xp(skill, xp_gained)

    apply_xp(current_user, xp_gained)

        # Log activity
    log = models.ActivityLog(
        user_id=current_user.id,
        skill_id=skill.id,
        description=f"{activity.skill_name} activity",
        xp_earned=xp_gained
    )

    db.add(log)
    db.commit()

    return {
        "skill": skill.name,
        "skill_level": skill.level,
        "skill_current_xp": skill.current_xp,
        "xp_gained": xp_gained,
        "user_level": current_user.level,
        "user_current_xp": current_user.current_xp,
        "user_total_xp": current_user.total_xp
    }


@app.get("/activity-history")
def get_activity_history(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    activities = (
        db.query(models.ActivityLog)
        .filter(
            models.ActivityLog.user_id == current_user.id
        )
        .order_by(
            models.ActivityLog.timestamp.desc()
        )
        .limit(20)
        .all()
    )

    return [
        {
            "skill": activity.skill.name,
            "xp": activity.xp_earned,
            "description": activity.description,
            "timestamp": activity.timestamp,
        }
        for activity in activities
    ]