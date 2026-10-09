

const jokes = [
  {
    title: 'COMMITMENT ISSUES',
    joke: 'Why did the developer avoid relationships?',
    punchline: 'Too many unresolved dependencies.',
  },
  {
    title: 'THE REQUIREMENTS',
    joke: 'The client said the feature was simple.',
    punchline: 'Three weeks later, we discovered the simple part was the meeting.',
  },
  {
    title: 'VARIABLE IDENTITY',
    joke: 'What do you name a variable you cannot understand?',
    punchline: 'temporaryFinalFix_v7_REAL',
  },
  {
    title: 'SENIORITY UNLOCKED',
    joke: 'How do you know someone is a senior developer?',
    punchline: 'They know which bugs are safer to leave alone.',
  },
  {
    title: 'MERGE CONFLICT',
    joke: 'My branch and I have different opinions.',
    punchline: 'Git says we need to work on our communication.',
  },
  {
    title: 'THE STANDUP',
    joke: 'What did the developer say at stand-up?',
    punchline: 'Yesterday I debugged. Today I debug. Blocker: reality.',
  },
  {
    title: 'ESTIMATION EXPERT',
    joke: 'How long does a small change take?',
    punchline: 'Five minutes to code, two days to understand the side effects.',
  },
  {
    title: '404 MOTIVATION',
    joke: 'I searched everywhere for motivation.',
    punchline: '404: Motivation not found.',
  },
  {
    title: 'THE HOTFIX',
    joke: 'Why did the hotfix get promoted?',
    punchline: 'It arrived under pressure and somehow saved production.',
  },
  {
    title: 'TECHNICAL DEBT',
    joke: 'My code has technical debt.',
    punchline: 'At this point, it needs a financial advisor.',
  },
  {
    title: 'NULL FEELINGS',
    joke: 'How is a developer feeling today?',
    punchline: 'Emotion is undefined.',
  },
  {
    title: 'THE TODO',
    joke: 'What happened to the TODO comment?',
    punchline: 'It became part of the architecture.',
  },
  {
    title: 'STACK TRACE',
    joke: 'Why did the developer follow the stack trace?',
    punchline: 'It was the only thing in the project giving clear directions.',
  },
  {
    title: 'THE REFACTOR',
    joke: 'I refactored one function today.',
    punchline: 'Now I have 14 functions and the same bug.',
  },
  {
    title: 'WORK-LIFE BALANCE',
    joke: 'What is work-life balance for a developer?',
    punchline: 'When the production alert arrives during lunch instead of dinner.',
  },
  {
    title: 'SCOPE CREEP',
    joke: 'The feature started with one button.',
    punchline: 'Now it has a dashboard, an admin panel and a roadmap.',
  },
  {
    title: 'THE CODE REVIEW',
    joke: 'What is the most romantic code review comment?',
    punchline: '"Looks good to me."',
  },
  {
    title: 'RUBBER DUCK',
    joke: 'Why does the rubber duck never interrupt?',
    punchline: 'It understands that the bug will explain itself eventually.',
  },
  {
    title: 'DEPENDENCY HELL',
    joke: 'Why was the project feeling trapped?',
    punchline: 'It had dependencies that depended on dependencies.',
  },
  {
    title: 'THE RELEASE',
    joke: 'What is a release checklist?',
    punchline: 'A list of things you hope you remembered before clicking deploy.',
  },
  {
    title: 'CACHE ME OUTSIDE',
    joke: 'Why did the app show yesterday’s data?',
    punchline: 'It was emotionally attached to its cache.',
  },
  {
    title: 'API GHOSTING',
    joke: 'Why did the frontend stop texting the backend?',
    punchline: 'The backend kept responding with 500 excuses.',
  },
  {
    title: 'THE ENV FILE',
    joke: 'Where do developers keep their secrets?',
    punchline: 'In an environment file that should never reach Git.',
  },
  {
    title: 'PASSWORD RESET',
    joke: 'What is a developer’s least favourite puzzle?',
    punchline: 'Remembering which password they used to reset their password.',
  },
  {
    title: 'THE MONOLITH',
    joke: 'Why was the monolith afraid of change?',
    punchline: 'Every small edit introduced a new season of bugs.',
  },
  {
    title: 'MICROSERVICE DRAMA',
    joke: 'Why did the microservices break up?',
    punchline: 'They had too many communication issues.',
  },
  {
    title: 'LATENCY LOVER',
    joke: 'Why did the API take so long to reply?',
    punchline: 'It was carefully considering its response.',
  },
  {
    title: 'THE DATABASE',
    joke: 'Why did the database go to therapy?',
    punchline: 'It had too many unresolved relationships.',
  },
  {
    title: 'INDEX PLEASE',
    joke: 'Why was the SQL query exhausted?',
    punchline: 'It had been scanning its entire life.',
  },
  {
    title: 'TRANSACTIONAL LOVE',
    joke: 'What did one database transaction say to another?',
    punchline: '"I need commitment, consistency and a rollback plan."',
  },
  {
    title: 'FRONTEND FEELINGS',
    joke: 'Why was the frontend stressed?',
    punchline: 'Everyone judged it by its appearance.',
  },
  {
    title: 'BACKEND ENERGY',
    joke: 'Why does the backend stay humble?',
    punchline: 'It knows the frontend gets all the compliments.',
  },
  {
    title: 'CSS EXORCISM',
    joke: 'How do you fix a mysterious CSS bug?',
    punchline: 'Change one property, whisper a prayer and refresh.',
  },
  {
    title: 'FLEXBOX FEELINGS',
    joke: 'Why was Flexbox invited to every layout party?',
    punchline: 'It knew how to handle alignment issues.',
  },
  {
    title: 'GRID EXPECTATIONS',
    joke: 'Why did CSS Grid get the promotion?',
    punchline: 'It had everything in its place.',
  },
  {
    title: 'RESPONSIVE PANIC',
    joke: 'The page looked perfect on desktop.',
    punchline: 'Then the mobile screen entered the chat.',
  },
  {
    title: 'PIXEL PERFECTIONIST',
    joke: 'How many pixels does a frontend developer need?',
    punchline: 'Just one more adjustment.',
  },
  {
    title: 'THE COMPONENT',
    joke: 'Why did the component refuse to work alone?',
    punchline: 'It needed its props and emotional support.',
  },
  {
    title: 'PROP DRILLING',
    joke: 'Why did the data travel through five components?',
    punchline: 'Nobody told it about the elevator called state management.',
  },
  {
    title: 'STATE OF MIND',
    joke: 'Why was the component confused?',
    punchline: 'Its state changed more often than its plans.',
  },
  {
    title: 'VUE OF THE FUTURE',
    joke: 'Why did Vue look so organised?',
    punchline: 'It kept its template, logic and style in one component file.',
  },
  {
    title: 'REACT AND REPEAT',
    joke: 'Why did the UI render again?',
    punchline: 'Someone changed its mind. Technically, its state.',
  },
  {
    title: 'HOOKED AGAIN',
    joke: 'Why did the developer keep calling the hook?',
    punchline: 'They were emotionally invested in the dependency array.',
  },
  {
    title: 'THE EVENT LOOP',
    joke: 'Why was JavaScript always busy?',
    punchline: 'It had a queue of tasks and no concept of taking a break.',
  },
  {
    title: 'PROMISE ISSUES',
    joke: 'JavaScript made me a promise.',
    punchline: 'It said it would resolve later.',
  },
  {
    title: 'ASYNC EXISTENCE',
    joke: 'Why did the developer use async/await?',
    punchline: 'They were tired of waiting without knowing what was happening.',
  },
  {
    title: 'UNDEFINED PLANS',
    joke: 'What is a JavaScript developer’s life plan?',
    punchline: 'Currently undefined.',
  },
  {
    title: 'TYPE CONFUSION',
    joke: 'Why did TypeScript bring a notebook?',
    punchline: 'It wanted to document every type of problem.',
  },
  {
    title: 'SEMICOLON DRAMA',
    joke: 'Why did the semicolon get blamed?',
    punchline: 'It was always there at the scene of the crime.',
  },
  {
    title: 'THE CONSOLE',
    joke: 'What is a developer’s favourite debugging instrument?',
    punchline: 'console.log. Therapy is still in beta.',
  },
  {
    title: 'PYTHON ENERGY',
    joke: 'Why was Python invited to the party?',
    punchline: 'It brought readable code and no unnecessary indentation drama. Usually.',
  },
  {
    title: 'JAVA LIFE',
    joke: 'Why does Java need glasses?',
    punchline: 'Too many classes to keep track of.',
  },
  {
    title: 'GARBAGE COLLECTION',
    joke: 'Why was the developer so relaxed?',
    punchline: 'They finally let the garbage collector handle their old baggage.',
  },
  {
    title: 'MEMORY LEAK',
    joke: 'Why did the app forget to sleep?',
    punchline: 'It had too much memory to let go of.',
  },
  {
    title: 'THREAD THERAPY',
    joke: 'Why did the threads go to counselling?',
    punchline: 'They kept fighting over shared resources.',
  },
  {
    title: 'DEADLOCK DATE',
    joke: 'Two threads went on a date.',
    punchline: 'Neither would make the first move. Classic deadlock.',
  },
  {
    title: 'THE COMPILER',
    joke: 'Why did the compiler reject the developer’s excuse?',
    punchline: 'It could not parse the explanation.',
  },
  {
    title: 'THE BUILD',
    joke: 'Why was the build pipeline nervous?',
    punchline: 'It knew one missing dependency could ruin the whole day.',
  },
  {
    title: 'TESTING TIMES',
    joke: 'Why did the test pass on the second run?',
    punchline: 'The bug wanted to look professional in front of the team.',
  },
  {
    title: 'UNIT TEST ROMANCE',
    joke: 'Why did the unit test feel lonely?',
    punchline: 'It only ever saw one small part of the application.',
  },
  {
    title: 'MOCKING BIRD',
    joke: 'Why did the test mock the API?',
    punchline: 'The real API was unavailable. Again.',
  },
  {
    title: 'EDGE CASE',
    joke: 'Why did the developer forget the edge case?',
    punchline: 'They were busy celebrating the happy path.',
  },
  {
    title: 'BUG WHACK-A-MOLE',
    joke: 'Why is debugging like playing whack-a-mole?',
    punchline: 'Every fixed bug introduces a surprise guest.',
  },
  {
    title: 'REGRESSION',
    joke: 'What is a regression bug?',
    punchline: 'A feature reminding you that it was happier yesterday.',
  },
  {
    title: 'QA BESTIE',
    joke: 'What does QA say when a developer says it is fixed?',
    punchline: '"Interesting. Let me try something."',
  },
  {
    title: 'THE REPRODUCTION',
    joke: 'How do you reproduce a bug?',
    punchline: 'Ask it to appear during the demo.',
  },
  {
    title: 'PRODUCTION ONLY',
    joke: 'Why does the bug only happen in production?',
    punchline: 'It respects the staging environment’s boundaries.',
  },
  {
    title: 'THE LOG FILE',
    joke: 'Why did the developer read 10,000 lines of logs?',
    punchline: 'The answer was on line 10,001.',
  },
  {
    title: 'MONITORING ERA',
    joke: 'Why did the alert wake up the developer?',
    punchline: 'It wanted to share its feelings at 3 AM.',
  },
  {
    title: 'INCIDENT MANAGER',
    joke: 'What is the first rule of incident management?',
    punchline: 'Stay calm. The dashboard is already panicking enough.',
  },
  {
    title: 'ON-CALL CULTURE',
    joke: 'What does an on-call engineer dream about?',
    punchline: 'A night with zero notifications and eight uninterrupted hours.',
  },
  {
    title: 'THE DOCUMENTATION',
    joke: 'Why did the developer write documentation?',
    punchline: 'They wanted future them to stop sending passive-aggressive messages.',
  },
  {
    title: 'README ENERGY',
    joke: 'What does README mean to a developer?',
    punchline: 'A document they promise to update after the next release.',
  },
  {
    title: 'NAMING THINGS',
    joke: 'What is the hardest problem in computer science?',
    punchline: 'Naming things, cache invalidation and explaining why the variable is called x2_final.',
  },
  {
    title: 'THE ARCHITECTURE',
    joke: 'Why did the architect draw another diagram?',
    punchline: 'The first one raised more questions than the system itself.',
  },
  {
    title: 'DESIGN PATTERN',
    joke: 'Why did the developer use a design pattern?',
    punchline: 'They wanted the solution to look intentional.',
  },
  {
    title: 'OVERENGINEERING',
    joke: 'How do you know the solution is overengineered?',
    punchline: 'The fix needs its own onboarding session.',
  },
  {
    title: 'KISS PRINCIPLE',
    joke: 'Why did the senior delete half the code?',
    punchline: 'The simplest solution was hiding under all the cleverness.',
  },
  {
    title: 'THE REWRITE',
    joke: 'Why did the team rewrite the entire application?',
    punchline: 'The original code was too stable to be left alone.',
  },
  {
    title: 'FRAMEWORK HOPPING',
    joke: 'Why did the developer learn another framework?',
    punchline: 'The current one had a perfectly good tutorial they had not finished.',
  },
  {
    title: 'TUTORIAL HELL',
    joke: 'Why did the developer watch 40 tutorials?',
    punchline: 'To avoid the terrifying act of building the project.',
  },
  {
    title: 'SIDE PROJECT',
    joke: 'How many side projects does a developer finish?',
    punchline: 'One fewer than the number of ideas in their notes app.',
  },
  {
    title: 'THE PORTFOLIO',
    joke: 'Why is the developer’s portfolio always under construction?',
    punchline: 'The developer is busy upgrading the upgrade process.',
  },
  {
    title: 'GITHUB STREAK',
    joke: 'Why did the developer make a tiny commit at midnight?',
    punchline: 'Their green contribution graph needed emotional support.',
  },
  {
    title: 'OPEN SOURCE',
    joke: 'Why did the developer contribute to open source?',
    punchline: 'To fix one bug and discover twelve new interests.',
  },
  {
    title: 'THE PACKAGE MANAGER',
    joke: 'Why did installing one package take an hour?',
    punchline: 'The dependencies held a family reunion.',
  },
  {
    title: 'VERSION CONFLICT',
    joke: 'Why did the packages refuse to cooperate?',
    punchline: 'They were not on speaking terms with each other’s versions.',
  },
  {
    title: 'THE LOCKFILE',
    joke: 'Why was the lockfile so strict?',
    punchline: 'It had seen what happened when versions were allowed to roam free.',
  },
  {
    title: 'DOCKER LIFE',
    joke: 'Why did the developer put everything in a container?',
    punchline: 'The bugs needed a clearly defined living space.',
  },
  {
    title: 'KUBERNETES',
    joke: 'Why did the developer need a map for Kubernetes?',
    punchline: 'Even the containers were trying to find their place.',
  },
  {
    title: 'CLOUD NINE',
    joke: 'Why did the app move to the cloud?',
    punchline: 'Rent on the local machine was getting ridiculous.',
  },
  {
    title: 'CI/CD',
    joke: 'Why did the pipeline break up with manual deployment?',
    punchline: 'It wanted a relationship with continuous improvement.',
  },
  {
    title: 'MERGE FRIDAY',
    joke: 'Why did nobody want to merge on Friday afternoon?',
    punchline: 'Nobody wanted their weekend to become a retrospective.',
  },
  {
    title: 'SPRINT PLANNING',
    joke: 'Why did the sprint feel like a marathon?',
    punchline: 'The finish line kept moving into the next sprint.',
  },
  {
    title: 'AGILE LIFE',
    joke: 'What does agile mean in a chaotic project?',
    punchline: 'Changing priorities at the speed of a Slack notification.',
  },
  {
    title: 'THE BLOCKER',
    joke: 'What is a developer’s favourite blocker?',
    punchline: 'The one that gets resolved before the stand-up ends.',
  },
  {
    title: 'ESTIMATION POKER',
    joke: 'Why did the team estimate the task as 13 points?',
    punchline: 'The number 8 looked emotionally unrealistic.',
  },
  {
    title: 'MEETING THAT COULD BE EMAIL',
    joke: 'Why did the meeting last an hour?',
    punchline: 'The first 50 minutes were about deciding who should be in the meeting.',
  },
  {
    title: 'THE DEADLINE',
    joke: 'Why did the developer suddenly become productive?',
    punchline: 'The deadline stopped being a suggestion.',
  },
  {
    title: 'BURNOUT BUILD',
    joke: 'What happens when a developer skips every break?',
    punchline: 'Eventually, the human system throws a critical exception.',
  },
  {
    title: 'COFFEE-DRIVEN DEVELOPMENT',
    joke: 'What is the developer’s primary runtime dependency?',
    punchline: 'Coffee. The documentation is mostly vibes.',
  },
  {
    title: 'MONDAY MERGE',
    joke: 'What is a developer’s Monday morning ritual?',
    punchline: 'Open the laptop, read the alerts and reconsider every life choice.',
  },
  {
    title: 'FRIDAY FEELING',
    joke: 'Why did the developer close the laptop at 5 PM on Friday?',
    punchline: 'They were trying an experimental feature called work-life balance.',
  },
  {
    title: 'THE PROMOTION',
    joke: 'What did the developer get promoted for?',
    punchline: 'Explaining a legacy system without visibly crying.',
  },
  {
    title: 'TECHNICAL INTERVIEW',
    joke: 'What is a developer’s biggest fear in an interview?',
    punchline: 'Being asked to reverse a linked list after explaining distributed systems.',
  },
  {
    title: 'LIVE CODING',
    joke: 'Why did the code work perfectly before the interview?',
    punchline: 'It did not enjoy performing in front of an audience.',
  },
  {
    title: 'THE WHITEBOARD',
    joke: 'Why did the developer bring a marker to the interview?',
    punchline: 'To draw a system that would be much easier to build than explain.',
  },
  {
    title: 'DSA SURVIVOR',
    joke: 'Why did the developer practise 100 array problems?',
    punchline: 'To discover that the interview asked about graphs.',
  },
  {
    title: 'THE CAREER SWITCH',
    joke: 'Why did the developer update their resume?',
    punchline: 'Their current bugs were no longer challenging enough.',
  },
]

export default defineEventHandler(async () => {
  const index = Math.floor(Math.random() * jokes.length)

  return {
    success: true,
    ...jokes[index]!,
    generatedAt: new Date().toISOString(),
  }
})