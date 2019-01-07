FROM       golang:alpine as builder

RUN apk --no-cache add curl git make perl
RUN curl -s https://glide.sh/get | sh
COPY . /go/src/github.com/dcu/mongodb_exporter
RUN cd /go/src/github.com/dcu/mongodb_exporter && make release

FROM       alpine:3.4

EXPOSE     9001

RUN apk add --update ca-certificates
COPY --from=builder /go/src/github.com/dcu/mongodb_exporter/release/mongodb_exporter-linux-amd64 /usr/local/bin/mongodb_exporter

ENTRYPOINT [ "mongodb_exporter", "-logtostderr", "-mongodb.uri", "mongodb://35.184.220.103:30665/flightplan", "-groups.enabled", "asserts,durability,background_flusshing,connections,extra_info,global_lock,index_counters,network,op_counters,op_counters_repl,memory,locks,metrics" ]
