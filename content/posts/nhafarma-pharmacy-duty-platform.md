---
title: "Nhafarma: finding the pharmacy on duty in Cabo Verde"
date: "2025-08-20"
description: "Pharmacies take turns covering the night shift. Nhafarma helps people find the one on duty without waiting for a radio announcement or searching through online news."
tags: ["Case Study", "TypeScript", "Fastify", "Operations", "Prometheus", "Grafana"]
---

Pharmacies in Cabo Verde are spread across cities. At night, they take turns staying open according to a duty schedule. Knowing where a pharmacy is does not necessarily tell you whether it is the one on duty.

People rely on radio announcements at particular times and online news to find that schedule. If you miss an announcement, you have to look elsewhere. When you need a pharmacy at night, finding the information becomes another task.

Nhafarma gives people a direct way to look up the pharmacy on duty by island and city. The question behind the project is simple: which pharmacy can I go to tonight?

The web app is available at [nhafarma.cv](https://nhafarma.cv).

## From announcements to a lookup

The schedule already exists. The problem is making it available when someone needs it, in a form they can search for their location.

Nhafarma turns the monthly schedule into structured records: pharmacy names, locations, contact details, and duty dates. The lookup brings those details together so people can find the relevant pharmacy without piecing together announcements.

That purpose shapes the backend. Importing a document, interpreting a duty date, and keeping the service running all support the same thing: helping someone find the right pharmacy at the time they need it.

## Keeping the schedule updated

The schedule arrives by email, so the first version of the workflow could easily have become a manual upload screen. That would move the work to an administrator without removing it.

Instead, a dedicated worker checks the inbox for a recent message with the expected subject, identifies the schedule PDF, and saves the attachment for processing. A Python parser then extracts the pharmacy, location, date, and contact details into a normalized dataset before the database seed updates PostgreSQL.

![Excalidraw diagram of the monthly schedule pipeline, from the email attachment through parsing, PostgreSQL, and the Fastify API](/blog/case-studies/nhafarma-pipeline.excalidraw.svg)

*The monthly pipeline turns a document made for reading into records made for querying.*

The worker runs separately from the API. A slow mailbox or malformed PDF therefore does not compete with user requests, and a failed import can be retried without restarting the service people are using. The scheduled job also prevents overlap, so two imports cannot race to replace the same month.

There is still a manual command for running the monthly import. Automation should remove routine work, not remove the operator's way back in when an upstream delivery is late.

## Time is part of the domain

The phrase “on duty today” hides an important rule: the duty period changes at 08:00 in Cabo Verde, not at midnight and not according to the server's local clock. Before that handover, a caller should still see the outgoing pharmacy.

Nhafarma puts that rule behind one clock abstraction. Every schedule query derives its reference date in the `Atlantic/Cape_Verde` timezone, and tests can replace the real clock with a fixed instant. That makes the awkward cases explicit: just before 08:00, just after it, the end of a month, and a server deployed in a different timezone.

Centralizing the clock avoids a subtle class of disagreement. The endpoint for today's pharmacy and the endpoint for the rest of the month cannot each invent their own meaning of “now.”

## Preserve the data while changing the machinery

The backend moved from Express and Prisma to Fastify and Drizzle. The goal was not a rewrite for its own sake. It was to simplify the runtime and database layer while keeping the production contract intact.

The Drizzle schema deliberately mirrors the existing PostgreSQL tables, column names, foreign keys, and unique indexes. Existing identifiers remain valid; new records use application-generated IDs. The migration baseline describes what is already in production instead of pretending the database begins empty.

That constraint changed the character of the migration. Success meant the new code could read the old data and preserve its relationships, not merely compile against a fresh development database.

## Make the quiet system observable

Schedule data changes monthly, which means a broken pipeline can remain invisible for weeks. Nhafarma exposes Prometheus metrics for request volume, response duration, database state, query duration, and pharmacy searches. The metrics endpoint is protected separately from the public health check and API documentation.

![Nhafarma Grafana dashboard showing API availability, request traffic, response-time percentiles, status codes, routes, and pharmacy searches](/blog/nhafarma/grafana-dashboard.png)

*The production dashboard keeps availability, latency, traffic, errors, and real pharmacy searches visible in one place.*

In this capture, the API is up, the p95 response time is 95 milliseconds, and the service has recorded nine pharmacy searches. The routes panel also exposes the background noise of a public service: automated requests probing common `.env` filenames. Those requests show up as HTTP 401 responses, turning the dashboard into evidence that the protection is working—not merely a display of traffic.

Structured logs record each response with its route, status, duration, and timestamp. Rate limits protect authenticated API routes, while health and documentation endpoints remain usable for operations. Docker runs the API and monthly worker as separate services on the same deployment network.

These are not decorative production features. They answer practical questions:

- Is the API responding, or is only the container running?
- Did the monthly worker complete?
- Are searches failing for one location or everywhere?
- Did database latency change after a deployment?
- Is a client making more requests than expected?

Nhafarma started with a gap between a published schedule and the people who need it. Radio and online news share the information; a searchable tool makes it easier to find again when the need arises.

The backend work serves that purpose. For someone looking for a pharmacy at night, the useful result is a name, a location, and the right duty schedule.
