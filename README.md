# gistip

Simple script to determine the public IP and update a gist

# docker

    docker build . -t dynip
    docker run -d --init --restart always dynip