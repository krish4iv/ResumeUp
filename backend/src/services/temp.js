// sde1-test-data.js
// Sample data for testing an AI response pipeline — SDE1 role
// Contains: jobDescription, resume, selfDescription

const jobDescription = `
Role: Software Development Engineer I (SDE1)
Location: Bengaluru, India (Hybrid)
Experience: 0–2 years

About the Role
We're looking for an SDE1 to join our backend engineering team. You'll work
closely with senior engineers to design, build, and ship features used by
millions of users, while developing strong fundamentals in software
engineering practices.

Responsibilities
- Write clean, efficient, and well-tested code in Java/Python/Go
- Implement features end-to-end based on design specs, with guidance from senior engineers
- Debug and fix production issues; participate in on-call rotations
- Write unit and integration tests; maintain code quality standards
- Participate in code reviews and incorporate feedback
- Collaborate with product managers, designers, and QA to deliver features
- Document technical designs and decisions

Requirements
- Bachelor's degree in CS/IT or equivalent practical experience
- Strong fundamentals in Data Structures & Algorithms
- Proficiency in at least one programming language (Java, Python, C++, or Go)
- Understanding of OOP concepts, basic system design, and databases (SQL/NoSQL)
- Familiarity with Git, REST APIs, and basic CI/CD concepts
- Good communication skills and willingness to learn

Nice to Have
- Experience with cloud platforms (AWS/GCP/Azure)
- Exposure to microservices or distributed systems
- Personal projects, open-source contributions, or hackathon experience
`;

const resume = `
ARJUN MEHTA
SDE1 Candidate | Bengaluru, India
arjun.mehta.dev@email.com | +91-98XXXXXXXX | linkedin.com/in/arjunmehta | github.com/arjunmehta

SUMMARY
Computer Science graduate with strong fundamentals in Data Structures &
Algorithms and hands-on experience building full-stack web applications.
Solved 400+ problems on LeetCode/Codeforces. Seeking an SDE1 role to
contribute to scalable, production-grade systems.

TECHNICAL SKILLS
- Languages: Java, Python, JavaScript, SQL
- Web/Backend: Spring Boot, Node.js, REST APIs, Express.js
- Frontend: React.js, HTML/CSS
- Databases: MySQL, MongoDB
- Tools: Git, Docker, Postman, JIRA
- Cloud: AWS (EC2, S3, basic Lambda)

PROJECTS

Real-Time Chat Application — Personal Project
- Built a full-stack chat app using React, Node.js, and Socket.io supporting
  1000+ concurrent connections in load testing
- Implemented JWT-based authentication and message persistence with MongoDB
- Deployed on AWS EC2 with Nginx reverse proxy

Expense Tracker API — Personal Project
- Designed REST APIs using Spring Boot and MySQL for a personal finance
  tracking app
- Implemented role-based access control and pagination for large datasets
- Wrote unit tests achieving 85% code coverage with JUnit

EXPERIENCE

Software Engineering Intern — TechNova Solutions, Bengaluru
Jan 2026 – May 2026 (5 months)
- Contributed to a microservice handling order processing for an e-commerce
  platform; fixed 15+ bugs and added 3 new API endpoints
- Wrote integration tests that reduced regression issues in the module by ~20%
- Collaborated with a team of 5 engineers using Agile/Scrum methodology

EDUCATION
B.Tech in Computer Science Engineering
XYZ Institute of Technology — 2022–2026 | CGPA: 8.4/10

ACHIEVEMENTS
- Solved 400+ DSA problems across LeetCode and Codeforces
- 2nd place, Inter-college Hackathon 2025
- Completed AWS Cloud Practitioner certification
`;

const selfDescription = `
Hi, I'm Arjun, a Computer Science graduate with a strong interest in backend
development and building scalable systems. During my degree, I focused
heavily on strengthening my fundamentals in data structures and algorithms,
and I've solved over 400 problems on platforms like LeetCode.

I recently completed a 5-month internship at TechNova Solutions, where I
worked on a microservice handling order processing for their e-commerce
platform — that gave me hands-on exposure to working in a real production
codebase, writing tests, and collaborating with a team using Agile practices.

Outside of work, I like building side projects to learn new technologies — I
built a real-time chat application using React and Socket.io, and a REST API
for expense tracking using Spring Boot. I'm someone who enjoys understanding
systems deeply rather than just getting things to work, and I'm looking for
an SDE1 role where I can keep learning from experienced engineers while
contributing to meaningful products.
`;

module.exports = { jobDescription, resume, selfDescription };

// If you need ES module syntax instead, replace the line above with:
// export { jobDescription, resume, selfDescription };