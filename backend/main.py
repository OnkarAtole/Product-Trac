from fastapi import FastAPI,Depends
from models import Product
from database import sessionlocal,engine
import database_models
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
app=FastAPI()


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000/"]
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("url")],  # No trailing slash
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods: GET, POST, PUT, DELETE
    allow_headers=["*"],  # Allow all headers
)

database_models.Base.metadata.create_all(bind=engine)



def get_db():
    db=sessionlocal()
    try:
        yield db
    finally:
        db.close()




@app.get("/")   
def greet():
    return "Welcome To Product trac" 

@app.get("/products/")
def getProduct(db:Session=Depends(get_db)):  

    db_product=db.query(database_models.Product).all()
    return db_product


@app.get("/products/{id}")
def getProductByID(id:int,db:Session=Depends(get_db)):
    dbproduct=db.query(database_models.Product).filter(database_models.Product.id==id).first()    
    if dbproduct:
        return dbproduct
    return "Product Not Found"


@app.post("/products")
def add_product(product:Product,db:Session=Depends(get_db)):
    db.add(database_models.Product(**product.model_dump()))
    db.commit()
    return product

@app.put("/products/{id}")
def update_product(id:int,product:Product,db:Session=Depends(get_db)):
    db_product=db.query(database_models.Product).filter(database_models.Product.id==id).first()
    if(db_product):
        db_product.id=product.id
        db_product.name=product.name
        db_product.description=product.description
        db_product.price=product.price
        db_product.quantity=product.quantity
        db.commit()
        return "Product Updated"
    else:
        return "Product not found!"


@app.delete("/products/{id}")
def delet_product(id:int,db:Session=Depends(get_db)):
    dbproduct=db.query(database_models.Product).filter(database_models.Product.id==id).first()
    if(dbproduct):
        db.delete(dbproduct)
        db.commit()
        return "Product is deleted"
    return "Product not found"

