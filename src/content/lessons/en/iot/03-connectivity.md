---
id: connectivity
section: IOT FOUNDATIONS
title: Connectivity choices
summary: Wi-Fi, BLE, cellular, LoRaWAN
description: Choose a network based on range, power, data rate, coverage, and cost.
goal: Match a wireless link to a device scenario.
eyebrow: THE BIG IDEA
conceptTitle: There is no single best wireless link
formula: RANGE · POWER · DATA RATE · COVERAGE · COST
takeaways:
  - label: Wi-Fi
    text: Useful for throughput and available power.
  - label: BLE
    text: Useful for nearby, low-power connections.
  - label: Cellular / LoRaWAN
    text: Consider coverage, payload, and operating cost.
widget: network
widgetTitle: Match a link to a device
widgetDescription: Select a scenario and compare a sensible connection.
code:
  lang: python
  source: |-
    device = "battery soil sensor"
    link = "LoRaWAN"
    print(device, "uses", link)
  output: battery soil sensor uses LoRaWAN
  description: Read this small example, then change the input or threshold to predict what the device will do.
reflectionPrompt: "Which matters most for your device: battery life, coverage, speed, or cost?"
order: 3
---

Wi-Fi offers throughput when power and local infrastructure are available. Bluetooth Low Energy suits nearby low-power devices. Cellular offers wide-area coverage with service costs. LoRaWAN sends small messages over long distances at low data rates. Gateways can bridge technologies.
