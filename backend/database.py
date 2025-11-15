
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()  # takes .env
db_url =os.getenv("Db_url")

engine=create_engine(db_url)
sessionlocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)