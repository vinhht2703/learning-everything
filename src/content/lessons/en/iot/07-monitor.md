---
id: monitor
section: BUILD & SECURE
title: Monitor a smart room
summary: Simulate sensor telemetry
description: A good dashboard adds context to sensor data and highlights conditions needing attention.
goal: Interpret telemetry with units, timestamps, device identity, and thresholds.
eyebrow: THE BIG IDEA
conceptTitle: Turn a reading into an understandable signal
formula: VALUE + UNIT + TIME + DEVICE → CONTEXT
takeaways:
  - label: Telemetry
    text: Time-stamped observation from a device.
  - label: Sampling
    text: Choose a cadence suited to the use case.
  - label: Alert
    text: Notify a person when action may be needed.
widget: monitor
widgetTitle: Simulate a room sensor
widgetDescription: Move the temperature slider to update status and payload.
code:
  lang: python
  source: 'payload = {"device": "room-01", "temperature_c": 24.8}'
  output: room-01 · 24.8 °C · comfortable
  description: Read this small example, then change the input or threshold to predict what the device will do.
reflectionPrompt: What reading and alert would help someone make a decision?
order: 7
---

Telemetry is a time-stamped observation or device status. Include units and device identity. Sampling cadence affects responsiveness, energy, and bandwidth. Dashboards should show normal status clearly and reserve alerts for conditions that need attention.
