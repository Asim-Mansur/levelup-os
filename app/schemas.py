from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str

    level: int
    current_xp: int
    total_xp: int

    
        

    class Config:
        orm_mode = True
class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
class ActivityCreate(BaseModel):
    skill_name: str
    value: int