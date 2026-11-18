---
id: project
section: BUILD & SECURE
title: "Mini project: smart greenhouse"
summary: Design a complete system
description: Design a monitor that measures conditions and safely controls a greenhouse fan.
goal: Specify sensors, communication, security, and failure behavior.
eyebrow: THE BIG IDEA
conceptTitle: Design the system before wiring it
formula: NEED → SENSOR → DECISION → NETWORK → ACTION
takeaways:
  - label: Define the need
    text: Name who benefits and which decision the data supports.
  - label: Plan failures
    text: Describe behavior when parts stop working.
  - label: Prototype
    text: Test one sensor and one safe action before expanding.
widget: project
widgetTitle: Configure your prototype
widgetDescription: Choose a sensor and link to preview a system sketch.
code:
  lang: python
  source: |-
    if soil_moisture < 35:
        irrigation_valve.open_for(seconds=5)
        publish("greenhouse/irrigation", "started")
  output: Short irrigation pulse · event recorded
  description: Read this small example, then change the input or threshold to predict what the device will do.
reflectionPrompt: What is your first safe prototype test, and how will you know it worked?
order: 8
---

Start with a user need: keep plants in a suitable environment and notice problems early. Measure temperature and soil moisture, use local control for a fan, and send readings to a dashboard. Include a manual override and clear behavior if a sensor, network, or actuator fails.
