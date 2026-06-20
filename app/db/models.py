from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from app.db.database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String, unique=True, index=True) # Thay zalo_id bằng phone_number
    hashed_password = Column(String) # Thêm password để đăng nhập
    full_name = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    prescriptions = relationship("Prescription", back_populates="owner")

class Prescription(Base):
    __tablename__ = "prescriptions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    diagnosis = Column(Text)  # Chẩn đoán bóc tách bởi VNPT SmartReader [cite: 358]
    raw_ocr_text = Column(Text) # Lưu text thô để AI đối soát khi cần [cite: 393]
    hospital_name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    owner = relationship("User", back_populates="prescriptions")
    medications = relationship("Medication", back_populates="prescription")

class Medication(Base):
    __tablename__ = "medications"
    id = Column(Integer, primary_key=True, index=True)
    prescription_id = Column(Integer, ForeignKey("prescriptions.id"))
    name = Column(String)  # Tên thuốc (ví dụ: Augmentin) [cite: 126]
    dosage = Column(String)  # Liều lượng (ví dụ: 1g) [cite: 126]
    frequency = Column(String)  # Tần suất (ví dụ: 2x1 - sau ăn) [cite: 126]
    instructions = Column(Text) # Giải thích bình dân từ VNPT SmartBot [cite: 358]
    is_taken = Column(Boolean, default=False) # Log trạng thái uống thuốc [cite: 104]
    
    prescription = relationship("Prescription", back_populates="medications")