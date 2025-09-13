from cores.config import create_app
from routers import ping, equations, fitting

app = create_app()
app.include_router(ping.router)
app.include_router(equations.router)
app.include_router(fitting.router)
