---
title: "Building a school platform from a sketch"
date: "2026-07-08"
description: "The architecture of a school management API — a deliberately boring stack, uploads the server never touches, and one owner for every hard rule."
tags: ["Architecture", "API Design", "Laravel", "S3"]
---

The platform manages the moving parts of a school: years, cohorts, courses, subjects, announcements — and the documents that professors, students, and staff share under real access rules. It grew into a two-hundred-commit API, but the decisions that shaped it were made before any code existed.

## Start with a sketch, not a scaffold

The first version was a page of notes: a table linking classes to courses, a role matrix — admin, professor, collaborator, student — and a sequence diagram. Then came a deliberately disposable prototype with just three concepts, built only to see where the domain model would strain.

It strained quickly, and that was the point. The production system kept the lessons and discarded the code: the final domain — school years, cohorts, courses, subjects, documents — came out of watching the prototype's seams, not out of a requirements document.

> Prototype to find the seams. Then let the prototype die.

An evening of sketching and a throwaway prototype cost almost nothing. A rewrite after six months of building on the wrong model would have cost the project.

## A deliberately boring stack

Every technology choice favored the well-worn path:

- **Laravel** as the framework — conventions over invention, and a mature testing story that thirteen feature-test suites lean on.
- **Token-based auth and an off-the-shelf permission package** for the role matrix — access control is exactly the wrong place to be original.
- **Redis** for caching, **S3-compatible object storage** for files, and **generated interactive API docs** so the contract is browsable rather than tribal.

Boring is a feature here. The project's novelty budget was spent where it actually earns a return: the upload architecture and the visibility rules.

## Files that never touch the server

The signature decision: the API orchestrates uploads but never carries file bytes. Intake happens in three phases.

![Excalidraw sequence diagram of the client declaring files, uploading them directly to object storage, and the API verifying the result](/blog/case-studies/school-upload.excalidraw.svg)

*Three-phase intake: declare, upload directly to storage, verify. The API stays a coordinator, never a courier.*

The consequences are all architectural. The API never needs to scale with file sizes or volume. The first phase is all-or-nothing — if permissions can't be issued for every declared file, nothing is recorded. The final phase is deliberately *not* all-or-nothing: a partial upload leaves an inspectable trail of which files made it, instead of vanishing without explanation.

Two supporting policies keep the design honest. Storage paths are treated as a permanent contract, because existing files already live at them. And when no storage bucket is configured — a laptop, a CI runner — nothing hard-fails; the system degrades gracefully instead of demanding cloud credentials to run a test.

## One owner per hard rule

The question "who may see this document?" sounds simple and is not. The answer depends on role, authorship, sharing status, and the viewer's relationship to the subject — and it must be answered in two places that can silently drift apart: when someone opens a single document, and when a list decides what to include.

If those two answers disagree, the system either leaks or lies: a list shows titles a user can't open, or hides documents they legitimately could.

The rule is simple: **every hard invariant has exactly one owner.** The entire visibility matrix lives in one service; the upload lifecycle lives in another; HTTP controllers are thin adapters that authorize and delegate. Where a list is intentionally broader than the single-document check — a teaching professor seeing their own subject's unshared documents — the exception is written down and pinned by tests, so it reads as a decision rather than a bug.

## Write the language down

The repository carries a domain glossary with a line I now copy into every project: *terms match the code — when the code and this file disagree, one of them is a bug.* It defines what intake, sharing, and visibility mean, in prose, beside the system that implements them.

That file is the cheapest piece of architecture in the project, and possibly the most valuable: six months from now it's the difference between extending the visibility rules and re-deriving them from scratch.
