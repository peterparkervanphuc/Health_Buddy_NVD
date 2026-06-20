from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models

router = APIRouter()

@router.get("/{user_id}")
async def get_patient_dashboard(user_id: int, db: Session = Depends(get_db)):
    # 1. Lấy đơn thuốc mới nhất của người dùng
    prescription = db.query(models.Prescription).filter(
        models.Prescription.user_id == user_id
    ).order_by(models.Prescription.created_at.desc()).first()

    if not prescription:
        return {
            "status": "empty",
            "message": "Chưa có đơn thuốc. Hãy quét mã QR hoặc chụp đơn thuốc để bắt đầu.",
            "data": None
        }

    # 2. Lấy danh sách thuốc
    medications = db.query(models.Medication).filter(
        models.Medication.prescription_id == prescription.id
    ).all()

    # 3. Cấu trúc lại dữ liệu cho giao diện "Zero-UI"
    # Chia thuốc theo buổi (Sáng, Trưa, Tối) dựa trên bóc tách từ VNPT SmartBot
    return {
        "status": "active",
        "diagnosis_card": {
            "title": "Chẩn đoán của bạn",
            "content": prescription.diagnosis,  # Giải thích bình dân [cite: 48]
            "hospital": prescription.hospital_name
        },
        "medication_schedule": [
            {
                "id": med.id,
                "name": med.name,
                "dosage": med.dosage,
                "frequency": med.frequency,
                "instructions": med.instructions, # Lời khuyên từ AI [cite: 49]
                "is_taken": med.is_taken
            } for med in medications
        ],
        "suggested_questions": [
            "Thuốc này có tác dụng phụ gì không?",
            "Tôi cần kiêng ăn gì khi uống thuốc này?",
            "Nếu quên một liều thì phải làm sao?"
        ] # Predictive Q&A [cite: 240, 298]
    }