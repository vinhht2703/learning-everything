---
id: mqtt
section: BUILD & SECURE
title: MQTT messaging
summary: Topics, publish, subscribe
description: MQTT uses publish/subscribe messaging to move small IoT messages through a broker.
goal: Create a topic and explain how publishers and subscribers communicate.
eyebrow: THE BIG IDEA
conceptTitle: Publish once; interested clients subscribe
formula: PUBLISHER → TOPIC → BROKER → SUBSCRIBER
takeaways:
  - label: Publisher
    text: Sends a message to a topic.
  - label: Broker
    text: Routes messages to interested clients.
  - label: Subscriber
    text: Listens to one or more topic patterns.
widget: topic
widgetTitle: Build an MQTT topic
widgetDescription: Choose a room and reading to preview a topic.
code:
  lang: python
  source: client.publish("home/kitchen/temperature", "23.6")
  output: home/kitchen/temperature · 23.6
  description: Read this small example, then change the input or threshold to predict what the device will do.
reflectionPrompt: Which device publishes this message, and which service subscribes?
order: 5
---

A device publishes to a topic such as home/kitchen/temperature. A broker routes the message to subscribers. Devices need not connect directly to every consumer. Choose clear topics, useful payloads, and suitable delivery settings.
