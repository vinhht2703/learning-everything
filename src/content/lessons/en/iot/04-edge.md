---
id: edge
section: IOT FOUNDATIONS
title: Edge, gateway & cloud
summary: Where should work happen?
description: IoT processing can happen on the device, a nearby gateway, or cloud services.
goal: Place work according to latency, connectivity, privacy, and scale.
eyebrow: THE BIG IDEA
conceptTitle: Put each task where it fits
formula: DEVICE (FAST) → GATEWAY (COORDINATE) → CLOUD (SCALE)
takeaways:
  - label: Device / edge
    text: Respond locally with low delay.
  - label: Gateway
    text: Bridge devices and filter or aggregate data.
  - label: Cloud
    text: Retain history and analyze many devices.
widget: placement
widgetTitle: Place the processing step
widgetDescription: Choose a requirement and see a practical starting layer.
code:
  lang: python
  source: |-
    if smoke_sensor.detected():
        siren.turn_on()
        cloud.send_event("smoke_detected")
  output: Local alert works even if internet is unavailable.
  description: Read this small example, then change the input or threshold to predict what the device will do.
reflectionPrompt: Which action must work if internet access disappears?
order: 4
---

A device can make a fast local decision during an internet outage. A gateway can combine devices or filter traffic. Cloud systems can store history and analyze a fleet. Hybrid designs balance local response with centralized services.
