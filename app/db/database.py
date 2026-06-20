from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Thông số khớp với docker-compose bạn vừa chạy
SQLALCHEMY_DATABASE_URL = "postgresql://healthbuddy:password123@localhost:5432/healthbuddy_db"

# Đã sửa thành create_engine ở đây:
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency để lấy DB session trong các API endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()