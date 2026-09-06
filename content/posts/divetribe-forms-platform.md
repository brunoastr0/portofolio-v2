---
title: "DiveTribe: replacing the clipboard at a dive shop"
date: "2026-07-10"
description: "How an underspecified request to digitize a branching paper-form process became a production workflow for divers and dive-centre staff."
tags: ["Case Study", "Architecture", "Next.js", "Laravel"]
---

A diver visiting DiveTribe completes between two and four forms, depending on the activity. Some follow official SSI formats and collect information used to determine whether the person is fit to dive; others collect details DiveTribe needs for its own operations.

On a busy day, that can become a large pile of paper—forms the staff must distribute, review, organise, and retrieve. DiveTribe wanted a simple web application where divers could complete the process on their phones, receive copies by email, and staff could review every submission in one place.

The initial brief sounded simple: put the forms online. But there was no detailed specification, and the client did not yet know every feature the product would need. Before writing the system, I worked with DiveTribe to understand its existing process, identify constraints such as preserving the official SSI formats, and turn the idea into a dependable workflow for divers and staff.

This case study is about two connected challenges: discovering the product before building it, and evolving its architecture when the first implementation began to show its limits.

## Turning categories into a workflow

Requirements analysis revealed that this was not one long form. It was a branching workflow built around three types of participant. Everyone had to complete DiveTribe's registration form first; their category then determined which forms followed.

| Participant | Required sequence |
| --- | --- |
| Certified diver | DiveTribe registration → medical form → waiver → Responsible Diver Code |
| Beginner taking a Try Dive | DiveTribe registration → Try Dive form |
| Snorkelling participant | DiveTribe registration → snorkelling form |

The sequence was part of the business rules, not simply a visual preference. The application needed to guide each participant through the correct path in order, collect a signature on the relevant forms, and preserve the official SSI format where required.

The staff workflow mattered just as much. DiveTribe needed to identify each participant, inspect what they had submitted, and download every completed form as its corresponding PDF. The product therefore had to connect a mobile-friendly experience for divers with a clear operational record for the people running the dive centre.

## One product, two systems

DiveTribe is deliberately split into two independently deployed systems: a TypeScript frontend built on Next.js with Tailwind and an accessible component library, and a PHP backend built on Laravel, running in containers, exposed as a versioned REST API.

The boundary is a contract, not a convenience. The frontend knows nothing about what forms exist or what rules govern them; the backend has no opinion about how anything looks. That separation cost some duplicated type definitions, and it was still the right trade: content and design changes ship from the frontend's hosting platform in minutes, while the API — the part that touches medical data — moves at a slower, more deliberate pace. Two risk profiles, two release cadences, one contract.

## Forms are data, not screens

The foundational decision: **form definitions live in the database, not in the interface.** A form is a record; its fields, their types, their ordering, and their translations are records too. The frontend contains exactly one form screen — an engine that renders whatever the API describes.

This is the classic flexibility-versus-queryability trade, and DiveTribe took flexibility with open eyes:

- **Won:** the dive shop can add a seasonal waiver, reorder questions, or retire a form without anyone deploying software.
- **Won:** four languages (English, German, French, Portuguese) hang off the same definitions — even field labels are translated data.
- **Paid:** reporting queries get uglier, and the admin dashboard absorbs that complexity so users never see it.

The sequence itself is enforced, not suggested. Registration is an ordered flow with progress always visible, and skipping ahead by editing the address bar simply lands you back at the next incomplete step.

## The life of a submission

The whole platform funnels into a single pipeline with one job: turn a completed sequence into documents in the participant's inbox.

![Excalidraw diagram of a submission moving through the form sequence, API storage, completion check, PDF generation, and secure email delivery](/blog/case-studies/divetribe-submission.excalidraw.svg)

*The submission pipeline: participants loop through the form sequence; completion triggers document generation and delivery.*

Two decisions in this flow carry most of the weight. First, participants are recognized by email across trips, so returning divers never become duplicate records — the admin view stays trustworthy. Second, the "everything is complete" check runs strictly *after* the data is safely stored, never entangled with it, because delivery and storage fail in different ways and must be allowed to fail separately.

The PDFs themselves are generated against the shop's real paper templates, down to a handwriting-style font for signatures. That was a design decision disguised as a technical one: the output had to look like the document the dive industry already trusts.

## Privacy as an architectural constraint

Participants upload identity documents. The rule adopted for them was absolute: **the storage location is never exposed.** Files live in a private bucket, and the only way to see one is through an authenticated admin endpoint that streams the bytes itself. Links in emails are signed and expire on a clock; a forwarded email goes stale instead of becoming a leak.

This is more machinery than handing out storage links — and it concentrates the entire access policy in one enforceable, revocable place. Rate limiting, request logging, and IP blocking sit underneath as quiet defense-in-depth.

## Designed for a boat deck

The design brief was environmental, not aesthetic. Forms get filled in bright sunlight, on wet phones, by people in a hurry:

1. One question group in view at a time — no walls of inputs.
2. Touch targets sized for thumbs, including the signature pad.
3. Progress always visible, because abandonment is the enemy of paperless.
4. Language switching available mid-flow, since a dive boat is a multilingual place.

The lesson DiveTribe left me with: the strongest architecture decisions were all *removals of coupling* — screens from definitions, storage from delivery, policy from links. Everything the product does well traces back to one of those separations.
