from fastapi import APIRouter, HTTPException, status, Depends
from pymongo import ReturnDocument
from bson import ObjectId
from datetime import datetime, timezone
from typing import List

from config.db import get_db
from models.note import NoteIn, NoteOut
from utils.auth import get_current_user  

router = APIRouter(prefix="/notes", tags=["notes"])

col = get_db()["notes"]
col.create_index([("createdAt", -1)])
col.create_index([("owner_id", 1)])  


def _doc_to_out(doc) -> NoteOut:
    return NoteOut(
        id=str(doc["_id"]),
        title=doc.get("title", ""),
        body=doc.get("body", ""),
        createdAt=int(doc.get("createdAt", 0)),
    )

def _now_ms() -> int:
    return int(datetime.now(timezone.utc).timestamp() * 1000)


@router.get("", response_model=List[NoteOut])
def list_notes(user=Depends(get_current_user)):
    docs = col.find({"owner_id": user["id"]}, sort=[("createdAt", -1)])
    return [_doc_to_out(d) for d in docs]


@router.post("", response_model=NoteOut, status_code=status.HTTP_201_CREATED)
def create_note(payload: NoteIn, user=Depends(get_current_user)):
    now = _now_ms()
    doc = {
        "title": payload.title,
        "body": payload.body,
        "createdAt": payload.createdAt or now,
        "owner_id": user["id"],
    }
    result = col.insert_one(doc)
    created = col.find_one({"_id": result.inserted_id})
    if not created:
        raise HTTPException(status_code=500, detail="Failed to create note")
    return _doc_to_out(created)

@router.get("/{note_id}", response_model=NoteOut)
def get_note(note_id: str, user=Depends(get_current_user)):
    if not ObjectId.is_valid(note_id):
        raise HTTPException(status_code=400, detail="Invalid id")

    doc = col.find_one({"_id": ObjectId(note_id), "owner_id": user["id"]})
    if not doc:
        raise HTTPException(status_code=404, detail="Not found")
    return _doc_to_out(doc)


@router.put("/{note_id}", response_model=NoteOut)
def update_note(note_id: str, payload: NoteIn, user=Depends(get_current_user)):
    if not ObjectId.is_valid(note_id):
        raise HTTPException(status_code=400, detail="Invalid id")

    update = {
        "$set": {
            "title": payload.title,
            "body": payload.body,
            "lastUpdate": _now_ms(),
        }
    }

    updated = col.find_one_and_update(
        {"_id": ObjectId(note_id), "owner_id": user["id"]},
        update,
        return_document=ReturnDocument.AFTER,
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Not found")
    return _doc_to_out(updated)

@router.delete("/{note_id}", status_code=status.HTTP_200_OK)
def delete_note(note_id: str, user=Depends(get_current_user)):
    if not ObjectId.is_valid(note_id):
        raise HTTPException(status_code=400, detail="Invalid id")

    res = col.delete_one({"_id": ObjectId(note_id), "owner_id": user["id"]})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return {"ok": True}
