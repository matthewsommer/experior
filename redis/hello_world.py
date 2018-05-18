#!/usr/bin/env python3

import redis

redis_host = "localhost"
redis_port = 6379
redis_password = ""


def hello_redis():
    try:
        r = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password, decode_responses=True)
        r.set("hello", "Hello, World!")
        msg = r.get("hello")
        print(msg)
    
    except Exception as e:
        print(e)

if __name__ == '__main__':
    hello_redis()