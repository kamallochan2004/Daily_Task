import { TimeBlock } from '../types';

export const scheduleData: TimeBlock[] = [
  {
    title: "Morning (Before Classes)",
    duration: "1 Hour",
    tasks: [
      "Aptitude Practice (30 min): Solve 10-15 questions",
      "Core Concepts Review (30 min): DBMS/OS/CN/OOPs"
    ]
  },
  {
    title: "Post Classes",
    duration: "3 Hours",
    tasks: [
      "DSA Practice (2 hours)",
      "Core Subjects Deep Dive (1 hour)"
    ]
  },
  {
    title: "Evening Break",
    duration: "30 min",
    tasks: [
      "Update resume",
      "Review interview questions"
    ]
  },
  {
    title: "Night Session",
    duration: "2 Hours",
    tasks: [
      "Academic Exam Preparation (1.5 hours)",
      "Mock Practice/Interview Prep (30 min)"
    ]
  },
  {
    title: "Late Night (Optional)",
    duration: "30-60 min",
    tasks: [
      "DSA concept revision",
      "Watch interview experiences"
    ]
  }
];