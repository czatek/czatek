#!/bin/sh

confd -onetime -backend env

# Starting nginx
nginx -g "daemon off;"
