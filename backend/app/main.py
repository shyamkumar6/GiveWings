from fastapi import FastAPI

app = FastAPI(title="Surplus to Impact API")

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}