---
id: sensors
section: IOT FOUNDATIONS
title: Sensors & actuators
summary: Measure, decide, act
description: Sensors measure physical conditions; actuators turn a command into physical change.
goal: Distinguish inputs from outputs and create a threshold rule.
eyebrow: THE BIG IDEA
conceptTitle: Measure, decide, act
formula: SENSOR → RULE → ACTUATOR
takeaways:
  - label: Sensor
    text: Measures a physical property.
  - label: Actuator
    text: Performs an action such as opening a vent.
  - label: Control rule
    text: Maps readings to actions within safe limits.
widget: threshold
widgetTitle: Tune a greenhouse fan
widgetDescription: Adjust temperature and the fan threshold.
code:
  lang: python
  source: |-
    temperature_c = 29.4
    fan_on = temperature_c >= 28.0
    print("fan on" if fan_on else "fan off")
  output: fan on
  description: Read this small example, then change the input or threshold to predict what the device will do.
reflectionPrompt: Which sensor and actuator would you combine in a useful device?
order: 2
---

A temperature sensor provides an input. Software compares the value with a threshold and may switch a fan relay. Real sensors can be noisy or fail, so use safe limits, calibration, and manual overrides when appropriate.
