import { 
  ShieldCheck, 
  Lock, 
  MessageSquare, 
  Briefcase, 
  Headphones, 
  Award, 
  TrendingUp, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  Trophy,
  Star,
  Zap,
  Clock
} from 'lucide-react';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  points: number;
  badge: string;
}

export const TRAINING_MODULES: Module[] = [
  {
    id: 'workplace-safety',
    title: 'Workplace Safety',
    description: 'Essential safety protocols and emergency procedures for a secure work environment.',
    icon: ShieldCheck,
    color: 'from-orange-500 to-red-500',
    points: 150,
    badge: 'Safety First',
    lessons: [
      {
        id: 'ws-1',
        title: 'Introduction to Safety',
        duration: '5 min',
        content: 'Workplace safety is the responsibility of everyone. It involves identifying hazards, following protocols, and ensuring a healthy environment for all employees. Key areas include fire safety, ergonomic workstations, and proper equipment handling.'
      },
      {
        id: 'ws-2',
        title: 'Emergency Procedures',
        duration: '8 min',
        content: 'In case of an emergency, stay calm. Know your exit routes and assembly points. Always report incidents immediately to your supervisor. Regular drills are conducted to ensure everyone knows their role during a crisis.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the first step in case of a fire emergency?',
        options: ['Finish your email', 'Stay calm and follow exit signs', 'Hide under your desk', 'Call your friends'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'Who is responsible for workplace safety?',
        options: ['Only the manager', 'Only the janitor', 'Every employee', 'The local fire department'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Awareness',
    description: 'Protecting company data and identifying common digital threats and phishing attempts.',
    icon: Lock,
    color: 'from-blue-500 to-indigo-600',
    points: 200,
    badge: 'Cyber Guardian',
    lessons: [
      {
        id: 'cs-1',
        title: 'Password Security',
        duration: '6 min',
        content: 'Strong passwords are your first line of defense. Use a mix of uppercase, lowercase, numbers, and symbols. Never share your credentials and use Multi-Factor Authentication (MFA) whenever possible.'
      },
      {
        id: 'cs-2',
        title: 'Phishing Detection',
        duration: '10 min',
        content: 'Phishing is a common attack where hackers impersonate trusted sources. Look for suspicious sender addresses, urgent language, and unexpected attachments. When in doubt, report the email to IT.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which of these makes a password strong?',
        options: ['Your birthday', 'Password123', 'A mix of characters and symbols', 'Your pet\'s name'],
        correctAnswer: 2
      },
      {
        id: 'q2',
        question: 'What should you do if you receive a suspicious email?',
        options: ['Click the link to see if it\'s real', 'Reply and ask who they are', 'Report it to IT and delete it', 'Forward it to your team'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'communication',
    title: 'Communication Skills',
    description: 'Mastering effective verbal and written communication in a professional setting.',
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-600',
    points: 120,
    badge: 'Master Communicator',
    lessons: [
      {
        id: 'com-1',
        title: 'Active Listening',
        duration: '7 min',
        content: 'Active listening involves fully concentrating on what is being said rather than just passively hearing the message. It requires eye contact, nodding, and asking clarifying questions to ensure understanding.'
      },
      {
        id: 'com-2',
        title: 'Professional Email Etiquette',
        duration: '5 min',
        content: 'Emails should be clear, concise, and professional. Use descriptive subject lines, appropriate greetings, and proofread for tone and clarity before hitting send.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is a key component of active listening?',
        options: ['Checking your phone', 'Interrupting to share your view', 'Making eye contact and nodding', 'Thinking about your lunch'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Fundamentals of planning, executing, and closing successful business projects.',
    icon: Briefcase,
    color: 'from-purple-500 to-pink-600',
    points: 180,
    badge: 'Project Pro',
    lessons: [
      {
        id: 'pm-1',
        title: 'The Project Lifecycle',
        duration: '12 min',
        content: 'Every project goes through four main phases: Initiation, Planning, Execution, and Closure. Understanding these stages helps in managing resources and timelines effectively.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the first phase of a project?',
        options: ['Execution', 'Planning', 'Initiation', 'Closure'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'customer-service',
    title: 'Customer Service',
    description: 'Delivering exceptional support and building lasting relationships with clients.',
    icon: Headphones,
    color: 'from-cyan-500 to-blue-600',
    points: 140,
    badge: 'Service Star',
    lessons: [
      {
        id: 'cust-1',
        title: 'Empathy in Service',
        duration: '8 min',
        content: 'Empathy is the ability to understand and share the feelings of another. In customer service, it means putting yourself in the customer\'s shoes to provide better support.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Why is empathy important in customer service?',
        options: ['It makes calls shorter', 'It helps build trust and rapport', 'It allows you to ignore rules', 'It is not important'],
        correctAnswer: 1
      }
    ]
  }
];

export const LEADERBOARD_DATA = [
  { name: 'Sarah Jenkins', points: 1250, completed: 8, avatar: 'https://picsum.photos/seed/sarah/100/100' },
  { name: 'Michael Chen', points: 1180, completed: 7, avatar: 'https://picsum.photos/seed/michael/100/100' },
  { name: 'Elena Rodriguez', points: 1050, completed: 6, avatar: 'https://picsum.photos/seed/elena/100/100' },
  { name: 'David Smith', points: 980, completed: 6, avatar: 'https://picsum.photos/seed/david/100/100' },
  { name: 'Aisha Khan', points: 920, completed: 5, avatar: 'https://picsum.photos/seed/aisha/100/100' },
];
