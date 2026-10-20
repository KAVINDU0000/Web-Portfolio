# Riyona Driving School

**Status:** In Development (not launched). Do not describe as live or launched.
**Contribution:** Jointly developed by both GENMEDIA founders.
**Live URL:** None yet.

<!-- VERIFY BEFORE PUBLISHING: every feature below must be confirmed as working in the actual Riyona codebase. Items marked [VERIFY] are not yet confirmed. -->

## Short description (cards and listings)

A website and management system for Riyona Driving School, a driving school in Sri Lanka. It covers car, van, motorbike and three-wheeler licence training, online package booking, student and instructor portals, and free study tools including road signs, road rules and practice papers.

<!-- REMOVED: "government-approved". Not confirmed. Add back only with written proof of approval. -->

## Full description

Riyona Driving School trains drivers for car, van, motorbike and three-wheeler licence classes in Sri Lanka. Lessons run on dual-control vehicles, with safety as the first priority. The project is a public website that presents the school's courses, plus a management system for students, lessons and payments.

<!-- CHECK: "Lessons run on dual-control vehicles" and "safety as the first priority" are marketing claims. Confirm with the school before publishing. -->

### Public website

- Home page with calls to action to apply, view packages and see vehicles.
- About page covering how training is structured, the vehicle categories taught and how to apply.
- Packages in four categories: regular training, official driving trial preparation, additional vehicle training and daily individual training. Each package has its own page. A category with no online offer shows a "not offered online" note.
- Vehicles page with the fleet and its categories.
- Road Signs & Road Rules: official and drawn sign pictures, Sinhala sign names, and numbered rules with icons.
- Practice Papers: three timed quizzes, one per book, in English or Sinhala. Each has a one-hour timer, one question at a time, question flagging and a mark out of 40. A watermarked past paper can be viewed on the page.
- Cash discount, contact details and a WhatsApp help widget with a message box.

### Student portal

- Sign up, email confirmation and password reset.
- Registration and enrolment, with medical and exam records.
- Appointments and lesson schedule, with attendance tracking.
- Payments, payment slip upload and payment history.
- Lesson feedback, profile and settings.

### Instructor portal

- Lesson management and schedule of assigned students.
- Availability and profile management.
- Student progress tracking.

### Admin portal

- Registration review and approval.
- Student and instructor management.
- Vehicle fleet management with an audit log.
- Package and pricing management, with price and item change history.
- Payment review.

### Technologies

Next.js 16, React 19, TypeScript, Tailwind CSS, PostgreSQL with Prisma ORM, Argon2 password hashing, Docker for deployment, pnpm.

<!-- VERIFY: Vitest unit tests and Playwright end-to-end tests exist and pass. Do not state this until they have been run. -->

### Languages

English and Sinhala, including Sinhala sign names and Sinhala quiz versions.

<!-- VERIFY: which portal and public features are actually working. Mark unfinished features as planned, not completed. -->
