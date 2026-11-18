---
id: system
section: IOT FOUNDATIONS
title: How IoT systems work
summary: Device → network → service
description: Connected devices sense the physical world, send data, and trigger useful responses.
goal: Trace a reading from a sensor to a person or an actuator.
eyebrow: THE BIG IDEA
conceptTitle: A loop between physical and digital systems
formula: SENSE → CONNECT → PROCESS → ACT
takeaways:
  - label: Device
    text: Reads sensors and may control outputs.
  - label: Network
    text: Moves data and commands.
  - label: Service
    text: Turns readings into history, alerts, or automation.
figure: iot-architecture
widget: flow
widgetTitle: Trace a greenhouse alert
widgetDescription: Explore the steps a temperature reading follows.
code:
  lang: python
  source: |-
    temperature_c = 31.2
    if temperature_c > 30:
        publish("greenhouse/alert", "too warm")
  output: greenhouse/alert → too warm
  description: Read this small example, then change the input or threshold to predict what the device will do.
reflectionPrompt: What real-world problem could this connected-device loop help solve?
order: 1
---

Most IoT solutions combine a device, a network, and a service. Sensors capture measurements; software processes them; dashboards or actuators turn them into outcomes. Plan power, reliability, privacy, and security along with the data flow.
