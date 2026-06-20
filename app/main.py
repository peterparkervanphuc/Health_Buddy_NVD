from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine, Base
from app.api.v1.router import api_router
from app.db import models

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HealthBuddy API",
    description="Backend services for HealthBuddy Zalo Mini App, powered by VNPT AI.",
    version="1.0.0"
)

app.include_router(api_router, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to HealthBuddy API System"}