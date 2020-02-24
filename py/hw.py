import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import asyncio
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())  # python-3.8.0a4
from tornado.options import define, options

define("port", default=8888, help="run on the given port", type=int)


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("table 1 2 3 4 5 ; price $350 $250 $400 $500 $1500 ;")


def main():
    tornado.options.parse_command_line()
    application = tornado.web.Application([(r"/", MainHandler)])
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()