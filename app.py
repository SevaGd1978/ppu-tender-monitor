"""Сервер статики для дашборда тендеров ППУ (сборка Vite лежит в dist/).

Работает в любом окружении Amvera: stdlib-only, порт из PORT (по умолчанию 8000).
Если конфигурация Amvera — Python (app.py), этот файл поднимает готовую сборку.
Если используется amvera.yml/Dockerfile — поднимается nginx, этот файл не нужен.
"""
import http.server
import os
import socketserver

PORT = int(os.environ.get("PORT", "8000"))
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")


class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        # Fallback для SPA-роутинга: нет файла -> отдаём index.html
        path = self.translate_path(self.path)
        if not os.path.exists(path) and not path.startswith(os.path.join(ROOT, "assets")):
            self.path = "/index.html"
        return super().send_head()

    def log_message(self, fmt, *args):
        print(fmt % args, flush=True)


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    print(f"Serving dist/ on 0.0.0.0:{PORT}", flush=True)
    with Server(("0.0.0.0", PORT), SPAHandler) as httpd:
        httpd.serve_forever()
