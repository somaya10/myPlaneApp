# myPlaneApp

This application lets you perform simple CRUD Operations on a Flight planning system.

The app is protected with Basic Auth and has the following apis exposed:

1. GET /v1/flights : Returns all flights
2. GET /v1/flights/:flight_id : Returns flight details of the mentioned flight id
3. POST /v1/flights: Adds a flight to the plan, if and only if it has one of the three aircrafts [DHC-8-400, Boeing B737, Boeing B737] and a valid dat in ISO Format (ex: 2019-01-06T17:01:48.301Z)
4. DELETE /v1/flights/:flight_id: Deletes the flight with the give id

The app is connected to a MongoDB database. Prometheus is used to get app and database metrics, and then displayed using grafana.

All of the above are hosted on a kubernetes cluster on Google Cloud API.
