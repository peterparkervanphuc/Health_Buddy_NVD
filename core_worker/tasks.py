from celery import Celery
from app.db.database import SessionLocal
from app.db import models
from app.services.zns_notifier import zns_service
import asyncio

celery_app = Celery("tasks", broker="redis://localhost:6379/0")

@celery_app.task
def check_and_send_reminders():
    db = SessionLocal()
    # Logic: Tìm các medication có lịch uống trùng với giờ hiện tại
    # và chưa được đánh dấu là 'is_taken' [cite: 304, 349]
    upcoming_meds = db.query(models.Medication).filter(models.Medication.is_taken == False).all()
    
    for med in upcoming_meds:
        # Lấy zalo_id của User để gửi tin nhắn [cite: 51]
        user = db.query(models.User).filter(models.User.id == med.prescription.user_id).first()
        if user and user.zalo_id:
            asyncio.run(zns_service.send_medication_reminder(
                user.zalo_id, 
                med.name, 
                med.instructions
            ))
    db.close()