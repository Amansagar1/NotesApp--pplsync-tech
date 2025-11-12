from pydantic import BaseModel, Field
from typing import Optional

class NoteIn(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    body: str = Field(..., min_length=1)
    createdAt: Optional[int] = None 

class NoteOut(BaseModel):
    id: str
    title: str
    body: str
    createdAt: int  
