from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models

# DÒNG NÀY LÀ NGUYÊN NHÂN GÂY LỖI NẾU BỊ THIẾU:
router = APIRouter()

@router.post("/upload")
async def upload_prescription(file: bytes = File(...), user_id: int = 1):
    # Tạm thời trả về mock data để test luồng API chạy thành công
    return {
        "status": "success",
        "message": "Đã nhận file và bóc tách thành công!",
        "data": {
            "diagnosis": "Viêm phế quản cấp",
            "medications": ["Augmentin 1g"]
        }
    }