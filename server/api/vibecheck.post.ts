
type MoodId =
  | 'delulu'
  | 'overthinking'
  | 'locked-in'
  | 'soft-life'
  | 'chaotic'

type StyleId = 'bestie' | 'honest' | 'professional'

const responses: Record<MoodId, Record<StyleId, string[]>> = {
  delulu: {
    bestie: [
      'Bestie, the plot is plotting. We are choosing optimism today, with just a tiny sprinkle of reality.',
      'Main character energy detected. Let the universe cook, but please read the instructions too.',
    ],
    honest: [
      'Manifestation is cute, but a plan would look even better on you. Make one move today.',
      'The vision is giving. The evidence is pending. Let’s work on the evidence.',
    ],
    professional: [
      'Initial assessment: ambitious expectations detected. Validate assumptions before committing resources.',
      'Outlook is optimistic. Confidence interval remains questionable. Proceed with measured enthusiasm.',
    ],
  },

  overthinking: {
    bestie: [
      'Hey, breathe. You do not need to solve every possible future tonight. One tiny next step is enough.',
      'Your brain is trying to protect you by rehearsing everything. Thank it, then give it a little break.',
    ],
    honest: [
      'You have analysed the situation from 19 angles. Now try doing one thing about it.',
      'Thinking about the task is not the same as doing the task. Pick the smallest possible action. Go.',
    ],
    professional: [
      'Analysis paralysis identified. Reduce the decision scope, define one actionable step, and reassess after execution.',
      'Current cognitive load exceeds useful processing capacity. Prioritise and temporarily reduce hypothetical scenarios.',
    ],
  },

  'locked-in': {
    bestie: [
      'THAT’S THE ENERGY. One task, one playlist, one tiny win at a time. You have got this.',
      'Focus mode is ON. Hydrate, stretch, mute the noise, and go collect that little win.',
    ],
    honest: [
      'Less announcing the comeback. More building it. Close the distractions and start.',
      'You do not need the perfect setup. You need the first 20 minutes of actual work.',
    ],
    professional: [
      'Execution mode activated. Define the deliverable, time-box the work, and review measurable progress.',
      'Prioritise high-impact work, minimise context switching, and track completion.',
    ],
  },

  'soft-life': {
    bestie: [
      'Rest is not a reward you have to earn. You are allowed to exist without being productive every second.',
      'Protect your peace like it is a production database. Boundaries up, unnecessary alerts off.',
    ],
    honest: [
      'You cannot pour from an empty cup. Take the break before your body schedules one for you.',
      'Not every invitation needs a yes. Not every problem needs to become your problem.',
    ],
    professional: [
      'Sustainable performance requires recovery. Take a short break and review your workload.',
      'Preventive maintenance is preferable to an emergency outage. Schedule recovery time accordingly.',
    ],
  },

  chaotic: {
    bestie: [
      'The vibes are unsupervised, but we move with kindness. Please eat something and check your calendar.',
      'A little chaos builds character. Too much chaos requires a notes app and a glass of water.',
    ],
    honest: [
      'Respectfully, what is the plan? If the answer is “we will see,” we need a second plan.',
      'Pick one thing and handle it. Your future self deserves at least a little organisation.',
    ],
    professional: [
      'Operational randomness detected. Establish a minimum viable plan and identify the next controllable variable.',
      'Current workflow appears event-driven rather than strategy-driven. Add at least one intentional decision.',
    ],
  },
}

const validMoods: MoodId[] = [
  'delulu',
  'overthinking',
  'locked-in',
  'soft-life',
  'chaotic',
]

const validStyles: StyleId[] = [
  'bestie',
  'honest',
  'professional',
]

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    mood?: string
    style?: string
    situation?: string
  }>(event)

  const mood = body?.mood
  const style = body?.style
  const situation =
    typeof body?.situation === 'string'
      ? body.situation.trim()
      : ''

  if (!situation) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Situation is required',
    })
  }

  if (situation.length > 500) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Situation must be 500 characters or fewer',
    })
  }

  if (!validMoods.includes(mood as MoodId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid mood selected',
    })
  }

  if (!validStyles.includes(style as StyleId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid response style selected',
    })
  }

  const selectedMood = mood as MoodId
  const selectedStyle = style as StyleId
  const options = responses[selectedMood][selectedStyle]
  const response = options[Math.floor(Math.random() * options.length)]!

  return {
    success: true,
    mood: selectedMood,
    style: selectedStyle,
    situation,
    response,
    generatedAt: new Date().toISOString(),
  }
})