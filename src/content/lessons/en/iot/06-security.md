---
id: security
section: BUILD & SECURE
title: Secure device design
summary: Identity, updates, least access
description: Connected devices need protection from setup through updates and retirement.
goal: Identify baseline controls for an IoT prototype.
eyebrow: THE BIG IDEA
conceptTitle: Security belongs in the whole lifecycle
formula: IDENTITY · ENCRYPTION · LEAST PRIVILEGE · UPDATES
takeaways:
  - label: Unique identity
    text: Avoid fleet-wide shared credentials.
  - label: Protected transport
    text: Encrypt connections and verify server identity.
  - label: Lifecycle
    text: Plan setup, updates, response, and retirement.
widget: security
widgetTitle: Review a device checklist
widgetDescription: Select safeguards you would require before deployment.
code:
  lang: python
  source: |-
    client.connect(tls=True, certificate=device_cert)
    client.publish(topic, payload, qos=1)
  output: Encrypted connection · device-specific identity
  description: Read this small example, then change the input or threshold to predict what the device will do.
reflectionPrompt: Which safeguard would you verify before connecting a device to a real network?
order: 6
---

Give devices distinct credentials, encrypt connections, remove shared defaults, and grant only needed access. Validate signed updates, protect secrets, and plan patching and retirement. Minimize collected data and consider physical access.
