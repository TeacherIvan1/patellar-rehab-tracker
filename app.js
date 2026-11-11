/* ==========================================================================
   Patellar Tendinitis Rehab Tracker — app.js
   Minimalist, Low-Noise Neutral Dark UI Engine
   Vanilla JavaScript State, LocalStorage, Web Audio Gym Timer, Chart.js,
   AI Evaluation Exporter & Dynamic JSON Workout Plan Importer
   ========================================================================== */

const STORAGE_KEYS = {
  LOGS: 'cf_patellar_rehab_logs_v1',
  SET_PROGRESS: 'cf_patellar_rehab_sets_v1',
  CUSTOM_PLAN: 'cf_patellar_rehab_custom_plan_v1',
  ACTIVE_PHASE: 'cf_patellar_rehab_active_phase_v1'
};

// Default Evidence-Based 4-Phase CrossFit Patellar Tendinopathy Protocol
const DEFAULT_PROTOCOL = {
  protocolName: 'CrossFit Patellar Tendinopathy Progressive Loading Protocol (Malliaras / Kongsgaard / Rio)',
  lastUpdated: '2026-11-11',
  phases: [
    {
      id: 1,
      shortName: 'Phase 1: Isometrics',
      title: 'Phase 1 — Isometric Loading & Pain Modulation',
      timeline: 'Daily / 2x daily • Pre-WOD warm-up',
      goal: 'Reduce cortical motor inhibition and calm reactive patellar tendon pain via sustained 45-second mid-range isometric holds without anterior knee shear.',
      progressionCriteria: [
        'Single-leg 25° decline squat morning pain stays <= 3/10 for 3 consecutive days.',
        '24-hour next-day pain returns to baseline after completing 5 x 45s holds at 70–80% MVC.',
        'CrossFit WOD Scaling: Pause box jumps, double-unders, running, and rebounding wall balls; substitute low-drag Concept2 Rower or Echo/Assault Bike.'
      ],
      clinicalCitation: {
        label: 'Rio et al. & Basas Spanish Squat Isometric Protocol',
        url: 'https://bookphysio.in/health-blog/patellar-tendinopathy-spanish-squat-isometric-heavy-slow-resistance-guide'
      },
      exercises: [
        {
          id: 'p1_spanish_squat',
          name: 'Rig-Anchored Spanish Squat Isometric Hold',
          equipment: ['Squat Rack Upright', 'Heavy Monster Band / Dual Straps', 'Optional Kettlebell / Goblet Load'],
          sets: 5,
          repsOrHold: '45 sec hold',
          tempo: 'Isometric Hold (70°–90° knee flexion, vertical tibia)',
          restSec: 120,
          defaultTimerMode: 'iso',
          defaultDurationSec: 45,
          loadGuidance: '70–80% effort (heavy enough to induce quad tremor by 35–45s; pain <= 3/10)',
          cues: 'Loop a thick monster band around the squat rack upright and behind upper calves just below knee joint line. Sit back against band tension so shins stay strictly vertical (90° to floor) while knees flex to 70°–90°.',
          svgType: 'spanish_squat',
          videoId: 'hgFxm5KIF7M',
          videoTitle: 'How to Set Up and Perform Spanish Squats Correctly — E3 Rehab',
          videoUrl: 'http://www.youtube.com/watch?v=hgFxm5KIF7M'
        },
        {
          id: 'p1_decline_iso',
          name: 'Single-Leg 25° Decline Board / Plate Isometric Hold',
          equipment: ['25° Slant Board or Stacked 15kg Bumper Plates', 'Squat Rack Upright (Fingertip Balance)'],
          sets: 5,
          repsOrHold: '45 sec hold / leg',
          tempo: 'Isometric Hold (45°–60° knee flexion, upright torso)',
          restSec: 90,
          defaultTimerMode: 'iso',
          defaultDurationSec: 45,
          loadGuidance: 'Bodyweight to +10–16kg Kettlebell held at chest (pain <= 3/10)',
          cues: 'Elevate heel on a 25° slant board or stacked bumper plate edge to bias load into the patellar tendon rather than the hip. Keep torso tall and hold steady at 45°–60° knee bend.',
          svgType: 'decline_squat',
          videoId: 'JBvdaCsU3_4',
          videoTitle: 'Single Leg Decline Squat — American Family Physician',
          videoUrl: 'http://www.youtube.com/watch?v=JBvdaCsU3_4'
        },
        {
          id: 'p1_banded_tke',
          name: 'Rig Banded Terminal Knee Extension (TKE) Hold',
          equipment: ['Squat Rack Upright', 'Medium/Heavy Resistance Band'],
          sets: 4,
          repsOrHold: '15 reps (3s isometric lock)',
          tempo: '2s Controlled Flexion • 3s Peak Quad Lockout',
          restSec: 60,
          defaultTimerMode: 'rest',
          defaultDurationSec: 60,
          loadGuidance: 'Medium-Heavy Band tension; zero tendon pain at terminal lockout',
          cues: 'Anchor band at knee height on the rig, step working leg inside behind the knee crease, keep heel planted flat on the gym floor, and drive the knee back into full terminal extension.',
          svgType: 'banded_tke',
          videoId: '4pE3c3sP1qE',
          videoTitle: 'Banded Terminal Knee Extension (TKE) Form',
          videoUrl: 'http://www.youtube.com/watch?v=4pE3c3sP1qE'
        }
      ]
    },
    {
      id: 2,
      shortName: 'Phase 2: Heavy Slow',
      title: 'Phase 2 — Heavy Slow Resistance (HSR)',
      timeline: '3x/week • 48h rest between sessions',
      goal: 'Stimulate collagen synthesis and tendon matrix remodeling using high mechanical strain at 6-second cadences (3s down / 3s up) without compression overload.',
      progressionCriteria: [
        'Complete all HSR sets with 24-hour next-day tendon pain <= 3/10.',
        'Morning single-leg decline squat stiffness returns to baseline before the next lifting session (48-hour recovery).',
        'CrossFit WOD Scaling: Maintain low-impact cardio; zero plyometrics or running; barbell power cleans permitted from hang if pain-free.'
      ],
      clinicalCitation: {
        label: 'Kongsgaard et al. HSR vs. Eccentric Protocol',
        url: 'https://medstarsportphysio.ca/journal/patellar-tendinopathy-heavy-slow-resistance'
      },
      exercises: [
        {
          id: 'p2_slant_hsr_squat',
          name: 'Slant Board / Plate-Elevated HSR Tempo Squat',
          equipment: ['25° Slant Board or Stacked Bumper Plates', 'Kettlebell / Barbell Load'],
          sets: 4,
          repsOrHold: '8 reps (6s/rep)',
          tempo: '3s Eccentric Down • 0s Pause • 3s Concentric Up',
          restSec: 150,
          defaultTimerMode: 'hsr',
          defaultDurationSec: 48,
          loadGuidance: '75–80% 1RM (8RM target load; pain <= 3/10 during and 24h after)',
          cues: 'Stand with heels elevated on slant board or bumper plates. Maintain an upright torso and lower slowly over 3 seconds to 90° knee flexion, then drive up smoothly over 3 seconds.',
          svgType: 'decline_squat',
          videoId: 'v1B7qGU461I',
          videoTitle: 'Slant Board / Elevated Heel Squats: Patella Tendon — Strength & Sport',
          videoUrl: 'http://www.youtube.com/watch?v=v1B7qGU461I'
        },
        {
          id: 'p2_barbell_hsr_squat',
          name: 'Barbell Heavy Slow Resistance Back Squat',
          equipment: ['Squat Rack', 'Barbell + Bumper Plates'],
          sets: 4,
          repsOrHold: '8 reps (6s/rep)',
          tempo: '3s Eccentric Down • 0s Pause • 3s Concentric Up',
          restSec: 180,
          defaultTimerMode: 'hsr',
          defaultDurationSec: 48,
          loadGuidance: '75–80% 1RM (heavy load; 3 minutes rest between sets for tendon recovery)',
          cues: 'Unrack from the rig, brace core tightly, descend slowly over 3 full seconds to parallel, and stand smoothly over 3 full seconds without bouncing or hitching.',
          svgType: 'barbell_squat',
          videoId: 'Y7sfQTTLOws',
          videoTitle: 'Patellar Tendonitis Part 3: Heavy Slow Resistance Training Programme — Sports Injury Physio',
          videoUrl: 'http://www.youtube.com/watch?v=Y7sfQTTLOws'
        },
        {
          id: 'p2_bulgarian_split',
          name: 'Slow-Tempo Dumbbell Bulgarian Split Squat',
          equipment: ['20" Plyo Box or Bench', 'Pair of Heavy Dumbbells / Kettlebells'],
          sets: 3,
          repsOrHold: '8 reps / leg',
          tempo: '3s Eccentric Down • 1s Pause • 3s Concentric Up',
          restSec: 90,
          defaultTimerMode: 'hsr',
          defaultDurationSec: 48,
          loadGuidance: 'Moderate-Heavy dumbbells (challenging 8RM load per leg)',
          cues: 'Place rear foot laces-down on the box. Keep front shin vertical to emphasize patellar load tolerance without excessive forward knee travel.',
          svgType: 'split_squat',
          videoId: 'uODWo4YqbT8',
          videoTitle: 'How to Bulgarian Split Squat | 3 Simple Steps — Davis Diley',
          videoUrl: 'http://www.youtube.com/watch?v=uODWo4YqbT8'
        }
      ]
    },
    {
      id: 3,
      shortName: 'Phase 3: Plyometrics',
      title: 'Phase 3 — Energy Storage & Plyometrics',
      timeline: '2–3x/week • 48h–72h recovery between sessions',
      goal: 'Retrain the patellar tendon stretch-shortening cycle (SSC) and elastic energy storage capacity required for dynamic jumping and landing.',
      progressionCriteria: [
        'Zero reactive flare-up (< 3/10 pain) at 24 hours following explosive jumping sessions.',
        'Symmetrical single-leg hop test power and landing confidence.',
        'CrossFit WOD Scaling: Reintroduce box jumps (step-down only), light kettlebell swings, and unbroken double-under intervals.'
      ],
      clinicalCitation: {
        label: 'Malliaras et al. Load Progression Algorithm',
        url: 'https://www.jospt.org/doi/10.2519/jospt.2015.5987'
      },
      exercises: [
        {
          id: 'p3_snap_downs',
          name: 'Athletic Snap-Down to Stick Landing',
          equipment: ['Open Gym Floor Space'],
          sets: 4,
          repsOrHold: '6 reps',
          tempo: 'Tall Reach -> Explosive Snap -> 2s Frozen Stick',
          restSec: 60,
          defaultTimerMode: 'rest',
          defaultDurationSec: 60,
          loadGuidance: 'Bodyweight (absorb force through stiff ankles, hips, and knees)',
          cues: 'Reach tall overhead onto balls of feet, then violently snap down into a rock-solid athletic landing position. Freeze for 2 seconds to dissipate kinetic landing force.',
          svgType: 'plyo_jump',
          videoId: 'uQ1m8Kz_T_w',
          videoTitle: 'Snap Downs: Learn How To Absorb Force — Overtime Athletes',
          videoUrl: 'http://www.youtube.com/watch?v=uQ1m8Kz_T_w'
        },
        {
          id: 'p3_pogo_hops',
          name: 'Elastic Low-Amplitude Pogo Hops',
          equipment: ['Gym Floor Space / Mat'],
          sets: 4,
          repsOrHold: '20 hops',
          tempo: 'Rhythmic Elastic Rebound (Stiff Ankle)',
          restSec: 60,
          defaultTimerMode: 'rest',
          defaultDurationSec: 60,
          loadGuidance: 'Bodyweight (use overhead rig band deload in Week 7 if needed)',
          cues: 'Keep knees minimally bent and bounce rhythmically off the balls of your feet like a stiff spring. Focus on fast, elastic ground contacts without sinking deep into knee flexion.',
          svgType: 'plyo_jump',
          videoId: 's_qM8NDHp1k',
          videoTitle: 'Tips for the Perfect Pogo — Health & High Performance',
          videoUrl: 'http://www.youtube.com/watch?v=s_qM8NDHp1k'
        },
        {
          id: 'p3_box_jump_step_down',
          name: 'CrossFit Plyo Box Jump with Mandatory Step-Down',
          equipment: ['16"–20" CrossFit Plyo Box'],
          sets: 4,
          repsOrHold: '5 reps',
          tempo: 'Explosive Concentric Jump • Soft Landing • Controlled Step-Down',
          restSec: 120,
          defaultTimerMode: 'rest',
          defaultDurationSec: 120,
          loadGuidance: 'Start at 16"–20" box height to limit excessive landing knee flexion',
          cues: 'Jump onto the plyo box landing softly in a quarter-squat with full foot contact, stand tall, and ALWAYS step down one foot at a time — never rebound off the box.',
          svgType: 'plyo_jump',
          videoId: 'W5QzqIbEWvk',
          videoTitle: 'Box Jump Step Down — OPEX Exercise Library',
          videoUrl: 'http://www.youtube.com/watch?v=W5QzqIbEWvk'
        }
      ]
    },
    {
      id: 4,
      shortName: 'Phase 4: WOD Return',
      title: 'Phase 4 — Return to CrossFit & High-Load Tendon Function',
      timeline: '2–3x/week • Gradual WOD return',
      goal: 'Gradually reintegrate metabolic fatigue + ballistic CrossFit movements (wall balls, double-unders, barbell cycling, box jumps) while preserving tendon capacity.',
      progressionCriteria: [
        'Structure training week into High-Load Days, Medium-Load Days, and Low-Load Days.',
        'Perform 3 x 45s Spanish Squat holds in your pre-WOD warm-up for immediate tendon analgesia.',
        'Maintain 2 sessions/week of Heavy Slow Resistance squats through Week 12+ so tendon stiffness does not detrain.'
      ],
      clinicalCitation: {
        label: 'Malliaras et al. Return-to-Sport Load Management (JOSPT)',
        url: 'https://www.jospt.org/doi/10.2519/jospt.2015.5987'
      },
      exercises: [
        {
          id: 'p4_wall_balls',
          name: 'Medicine Ball Wall Ball Volume Progression',
          equipment: ['14–20lb Medicine Ball', '9ft / 10ft Wall Target'],
          sets: 4,
          repsOrHold: '12–15 reps (Unbroken Controlled Set)',
          tempo: 'Controlled Squat Descent • Smooth Hip-to-Target Drive',
          restSec: 90,
          defaultTimerMode: 'rest',
          defaultDurationSec: 90,
          loadGuidance: '14lb / 20lb Med Ball; cap total WOD wall ball volume at 45–60 reps initially',
          cues: 'Absorb the medicine ball smoothly as you descend, prevent crashing into the bottom of the squat, and drive forcefully through the whole foot.',
          svgType: 'barbell_squat',
          videoId: '_KfCGKfP1_g',
          videoTitle: 'Wall Balls 101: Essential Tips for CrossFit Athletes — Misfit Athletics',
          videoUrl: 'http://www.youtube.com/watch?v=_KfCGKfP1_g'
        },
        {
          id: 'p4_double_unders',
          name: 'Double-Under Elastic Tendon Tolerance Intervals',
          equipment: ['CrossFit Speed Rope'],
          sets: 5,
          repsOrHold: '30 reps',
          tempo: 'Relaxed Midfoot Elastic Rebound',
          restSec: 60,
          defaultTimerMode: 'rest',
          defaultDurationSec: 60,
          loadGuidance: '150 total contacts (increase total session contacts by max 15–20% per week)',
          cues: 'Stay tall with elbows tucked, jumping with stiff ankles and relaxed knees rather than piking or donkey-kicking.',
          svgType: 'plyo_jump',
          videoId: '9FLc4h5mhrk',
          videoTitle: 'How to Learn Double Unders Step by Step — Paradiso CrossFit',
          videoUrl: 'http://www.youtube.com/watch?v=9FLc4h5mhrk'
        },
        {
          id: 'p4_spanish_maintenance',
          name: 'Pre-WOD Spanish Squat Primer + HSR Maintenance Squat',
          equipment: ['Squat Rack + Heavy Monster Band', 'Barbell + Bumper Plates'],
          sets: 3,
          repsOrHold: '45s Hold + 6 Heavy HSR Reps',
          tempo: '45s Iso Warm-Up • 3s Down / 3s Up Working Sets',
          restSec: 120,
          defaultTimerMode: 'iso',
          defaultDurationSec: 45,
          loadGuidance: 'Pre-WOD analgesic hold + 2x/wk heavy 6RM HSR maintenance',
          cues: 'Never drop heavy slow resistance entirely once symptoms resolve — continue 2x/week heavy slow loading through Week 12+ to prevent mid-season relapse.',
          svgType: 'spanish_squat',
          videoId: 'hgFxm5KIF7M',
          videoTitle: 'How to Set Up and Perform Spanish Squats Correctly — E3 Rehab',
          videoUrl: 'http://www.youtube.com/watch?v=hgFxm5KIF7M'
        }
      ]
    }
  ]
};

// Baseline 7-Day Sample Rehab Logs
const INITIAL_SAMPLE_LOGS = [
  {
    date: '2026-11-05',
    phase: 1,
    painPre: 4,
    painPost: 2,
    pain24h: 3,
    painDecline: 4,
    exercises: 'Rig Spanish Squat (5x45s @ BW), Single-Leg 25° Decline Hold (5x45s @ BW)',
    notes: 'Spanish squats gave immediate analgesic relief before flush. Morning stiffness 3/10.'
  },
  {
    date: '2026-11-06',
    phase: 1,
    painPre: 3,
    painPost: 2,
    pain24h: 2,
    painDecline: 3,
    exercises: 'Rig Spanish Squat (5x45s @ +12kg KB), Concept2 Rower damper 3',
    notes: 'Subbed rowing for running in metcon. Knee felt warm and stable.'
  },
  {
    date: '2026-11-07',
    phase: 2,
    painPre: 2,
    painPost: 3,
    pain24h: 2,
    painDecline: 2,
    exercises: 'Slant Board HSR Squat (4x10 @ 50kg), Barbell HSR Back Squat (4x8 @ 70kg)',
    notes: 'First Phase 2 Heavy Slow Resistance session using 6-second tempo. Tendon pain 2/10.'
  },
  {
    date: '2026-11-08',
    phase: 2,
    painPre: 2,
    painPost: 1,
    pain24h: 2,
    painDecline: 2,
    exercises: 'Active Recovery: Rig Spanish Squat Primer (3x45s)',
    notes: '48h recovery window between HSR sessions. Morning single-leg decline test was 2/10.'
  },
  {
    date: '2026-11-09',
    phase: 2,
    painPre: 2,
    painPost: 3,
    pain24h: 3,
    painDecline: 2,
    exercises: 'Slant Board HSR Squat (4x10 @ 55kg), Barbell HSR Back Squat (4x8 @ 75kg)',
    notes: 'Added +5kg to barbell HSR squats. Kept strict 3s down / 3s up cadence.'
  },
  {
    date: '2026-11-10',
    phase: 2,
    painPre: 2,
    painPost: 1,
    pain24h: 1,
    painDecline: 2,
    exercises: 'Pre-WOD Spanish Squat (3x45s @ +16kg KB), SkiErg session',
    notes: 'Tendon settled down to 1/10 at 24 hours post-HSR session.'
  },
  {
    date: '2026-11-11',
    phase: 2,
    painPre: 1,
    painPost: 2,
    pain24h: 1,
    painDecline: 1,
    exercises: 'Slant Board HSR Squat (4x8 @ 60kg), Barbell HSR Back Squat (4x8 @ 80kg)',
    notes: 'Strong session. 24h pain <= 3/10 threshold maintained.'
  }
];

// Safe LocalStorage Wrapper
function safeGetStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

function safeSetStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    return false;
  }
}

function safeRemoveStorage(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    // Ignore storage removal errors
  }
}

// Application State
const appState = {
  activeTab: 'workout',
  activePhaseId: 2,
  protocol: JSON.parse(JSON.stringify(DEFAULT_PROTOCOL)),
  setProgress: {}, // keyed by date -> exerciseId -> { sets: [bool], load: string }
  logs: [],
  openVideoDraws: {}, // exerciseId -> boolean
  loadedYoutubeEmbeds: {}, // exerciseId -> boolean
  formState: {
    date: '2026-11-11',
    phase: 2,
    painPre: 1,
    painPost: 2,
    pain24h: 1,
    painDecline: 1
  },
  timer: {
    mode: 'iso', // 'iso' | 'rest' | 'hsr'
    running: false,
    muted: false,
    prepRemaining: 0,
    durationSec: 45,
    remainingSec: 45,
    contextLabel: 'Rig Spanish Squat — 45s Isometric Hold',
    hsrTargetReps: 8,
    hsrCurrentRep: 1,
    hsrSubPhase: 'ECCENTRIC DOWN',
    hsrSubSec: 3,
    intervalId: null
  },
  chartInstance: null,
  confirmAction: null
};

// Web Audio API Gym Buzzer
let audioCtx = null;
function playGymBeep(freq = 880, durationMs = 140, type = 'sine') {
  if (appState.timer.muted) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + durationMs / 1000);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + durationMs / 1000);
  } catch (e) {
    // Web Audio fallback silent
  }
}

// Toast Notification
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('app-toast');
  const text = document.getElementById('app-toast-text');
  if (!toast || !text) return;
  text.textContent = message;
  toast.classList.remove('hidden');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// In-Page Confirmation Modal
function openConfirmModal(title, bodyText, onConfirm) {
  const modal = document.getElementById('confirm-modal');
  const titleEl = document.getElementById('confirm-modal-title');
  const bodyEl = document.getElementById('confirm-modal-body');
  if (!modal || !titleEl || !bodyEl) return;
  titleEl.textContent = title;
  bodyEl.textContent = bodyText;
  appState.confirmAction = onConfirm;
  modal.classList.remove('hidden');
}

function closeConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  if (modal) modal.classList.add('hidden');
  appState.confirmAction = null;
}

function executeConfirmModal() {
  const fn = appState.confirmAction;
  closeConfirmModal();
  if (typeof fn === 'function') fn();
}

// SVG Biomechanical Form Guide Generator (Clean Muted Colors)
function getExerciseSvgMarkup(svgType) {
  if (svgType === 'spanish_squat') {
    return `
      <svg viewBox="0 0 280 150" class="w-full h-32 bg-[#111315] rounded-lg border border-[#2a2f37] p-2">
        <rect x="36" y="12" width="12" height="126" rx="2" fill="#334155" />
        <line x1="20" y1="138" x2="260" y2="138" stroke="#2a2f37" stroke-width="4" />
        <line x1="48" y1="88" x2="148" y2="88" stroke="#10b981" stroke-width="4" stroke-dasharray="6,3" />
        <text x="56" y="80" fill="#10b981" font-size="9" font-weight="600">Band Tension</text>
        <g class="svg-anim-iso">
          <circle cx="176" cy="34" r="10" fill="#94a3b8" />
          <line x1="176" y1="45" x2="188" y2="86" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" />
          <line x1="178" y1="54" x2="142" y2="62" stroke="#64748b" stroke-width="3" stroke-linecap="round" />
          <line x1="188" y1="86" x2="148" y2="88" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
          <circle cx="148" cy="88" r="4" fill="#10b981" />
        </g>
        <line x1="148" y1="88" x2="148" y2="136" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" />
        <text x="156" y="122" fill="#64748b" font-size="9">Vertical Tibia (90°)</text>
        <text x="165" y="22" fill="#94a3b8" font-size="9" font-weight="600">45s Isometric Hold</text>
      </svg>`;
  }
  if (svgType === 'decline_squat') {
    return `
      <svg viewBox="0 0 280 150" class="w-full h-32 bg-[#111315] rounded-lg border border-[#2a2f37] p-2">
        <line x1="20" y1="138" x2="260" y2="138" stroke="#2a2f37" stroke-width="4" />
        <polygon points="105,138 175,138 175,114" fill="#20242a" stroke="#2a2f37" />
        <text x="182" y="132" fill="#94a3b8" font-size="9" font-weight="600">25° Slant</text>
        <g class="svg-anim-hsr">
          <circle cx="142" cy="30" r="10" fill="#94a3b8" />
          <line x1="142" y1="41" x2="150" y2="82" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" />
          <line x1="150" y1="82" x2="122" y2="98" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
          <circle cx="122" cy="98" r="4" fill="#10b981" />
        </g>
        <line x1="122" y1="98" x2="152" y2="124" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" />
        <text x="28" y="28" fill="#94a3b8" font-size="9" font-weight="600">3s Down • 3s Up HSR</text>
      </svg>`;
  }
  if (svgType === 'banded_tke') {
    return `
      <svg viewBox="0 0 280 150" class="w-full h-32 bg-[#111315] rounded-lg border border-[#2a2f37] p-2">
        <rect x="40" y="14" width="12" height="124" rx="2" fill="#334155" />
        <line x1="20" y1="138" x2="260" y2="138" stroke="#2a2f37" stroke-width="4" />
        <line x1="52" y1="92" x2="148" y2="92" stroke="#94a3b8" stroke-width="3" stroke-dasharray="5,3" />
        <circle cx="152" cy="28" r="10" fill="#94a3b8" />
        <line x1="152" y1="39" x2="152" y2="80" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" />
        <line x1="152" y1="80" x2="148" y2="136" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
        <circle cx="150" cy="92" r="4" fill="#10b981" />
        <text x="64" y="82" fill="#94a3b8" font-size="9" font-weight="600">Band Pull</text>
        <text x="166" y="96" fill="#10b981" font-size="9" font-weight="600">Lockout</text>
      </svg>`;
  }
  if (svgType === 'split_squat') {
    return `
      <svg viewBox="0 0 280 150" class="w-full h-32 bg-[#111315] rounded-lg border border-[#2a2f37] p-2">
        <line x1="20" y1="138" x2="260" y2="138" stroke="#2a2f37" stroke-width="4" />
        <rect x="195" y="96" width="46" height="42" rx="3" fill="#20242a" stroke="#2a2f37" />
        <text x="204" y="120" fill="#64748b" font-size="8" font-weight="600">BOX</text>
        <g class="svg-anim-hsr">
          <circle cx="136" cy="30" r="10" fill="#94a3b8" />
          <line x1="136" y1="40" x2="142" y2="80" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" />
          <line x1="142" y1="80" x2="106" y2="92" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
          <line x1="142" y1="80" x2="168" y2="112" stroke="#64748b" stroke-width="4" stroke-linecap="round" />
          <line x1="168" y1="112" x2="205" y2="98" stroke="#64748b" stroke-width="4" stroke-linecap="round" />
          <circle cx="106" cy="92" r="4" fill="#10b981" />
        </g>
        <line x1="106" y1="92" x2="106" y2="136" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" />
        <text x="24" y="28" fill="#94a3b8" font-size="9" font-weight="600">Unilateral HSR (3s/3s)</text>
      </svg>`;
  }
  if (svgType === 'plyo_jump') {
    return `
      <svg viewBox="0 0 280 150" class="w-full h-32 bg-[#111315] rounded-lg border border-[#2a2f37] p-2">
        <line x1="20" y1="138" x2="260" y2="138" stroke="#2a2f37" stroke-width="4" />
        <rect x="186" y="88" width="58" height="50" rx="3" fill="#20242a" stroke="#2a2f37" />
        <text x="194" y="116" fill="#64748b" font-size="8" font-weight="600">PLYO BOX</text>
        <g class="svg-anim-plyo">
          <circle cx="114" cy="36" r="10" fill="#94a3b8" />
          <line x1="114" y1="46" x2="122" y2="82" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" />
          <line x1="122" y1="82" x2="104" y2="104" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
          <line x1="104" y1="104" x2="116" y2="132" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" />
        </g>
        <path d="M 134 70 Q 168 30 206 78" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4" />
        <text x="24" y="26" fill="#94a3b8" font-size="9" font-weight="600">Energy Storage & Stick</text>
      </svg>`;
  }
  // Default barbell_squat
  return `
    <svg viewBox="0 0 280 150" class="w-full h-32 bg-[#111315] rounded-lg border border-[#2a2f37] p-2">
      <line x1="20" y1="138" x2="260" y2="138" stroke="#2a2f37" stroke-width="4" />
      <g class="svg-anim-hsr">
        <circle cx="145" cy="32" r="10" fill="#94a3b8" />
        <circle cx="148" cy="48" r="11" fill="#334155" stroke="#475569" />
        <line x1="145" y1="42" x2="155" y2="84" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" />
        <line x1="155" y1="84" x2="120" y2="92" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
        <circle cx="120" cy="92" r="4" fill="#10b981" />
      </g>
      <line x1="120" y1="92" x2="134" y2="136" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round" />
      <text x="24" y="28" fill="#94a3b8" font-size="9" font-weight="600">Heavy Slow Resistance (3s/3s)</text>
    </svg>`;
}

// Initialize State from LocalStorage
function initAppState() {
  const savedCustomPlan = safeGetStorage(STORAGE_KEYS.CUSTOM_PLAN, null);
  if (savedCustomPlan && Array.isArray(savedCustomPlan.phases) && savedCustomPlan.phases.length > 0) {
    appState.protocol = savedCustomPlan;
  } else {
    appState.protocol = JSON.parse(JSON.stringify(DEFAULT_PROTOCOL));
  }

  const savedPhase = safeGetStorage(STORAGE_KEYS.ACTIVE_PHASE, 2);
  appState.activePhaseId = Number(savedPhase) || 2;

  const savedSets = safeGetStorage(STORAGE_KEYS.SET_PROGRESS, {});
  appState.setProgress = savedSets && typeof savedSets === 'object' ? savedSets : {};

  const savedLogs = safeGetStorage(STORAGE_KEYS.LOGS, null);
  if (Array.isArray(savedLogs) && savedLogs.length > 0) {
    appState.logs = savedLogs;
  } else {
    appState.logs = JSON.parse(JSON.stringify(INITIAL_SAMPLE_LOGS));
    safeSetStorage(STORAGE_KEYS.LOGS, appState.logs);
  }

  const todayKey = appState.formState.date;
  if (!appState.setProgress[todayKey]) {
    appState.setProgress[todayKey] = {
      p2_slant_hsr_squat: { sets: [true, true, false, false], load: '60kg' },
      p2_barbell_hsr_squat: { sets: [false, false, false, false], load: '80kg' },
      p2_bulgarian_split: { sets: [false, false, false], load: '2x20kg DBs' }
    };
    safeSetStorage(STORAGE_KEYS.SET_PROGRESS, appState.setProgress);
  }
}

// Switch Main Navigation Tab (4 Clean Tabs)
function switchTab(tabName) {
  appState.activeTab = tabName;
  const tabs = ['workout', 'timer', 'tracker', 'ai'];
  tabs.forEach((t) => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const view = document.getElementById(`view-${t}`);
    if (btn) {
      if (t === tabName) btn.classList.add('active');
      else btn.classList.remove('active');
    }
    if (view) {
      if (t === tabName) view.classList.remove('hidden');
      else view.classList.add('hidden');
    }
  });

  if (tabName === 'tracker') {
    syncCompletedExercisesToTrackerForm();
    renderPainChart();
    renderLogHistory();
  } else if (tabName === 'ai') {
    generateAiExportReport(false);
  }
}

// Select Active Rehab Phase
function selectPhase(phaseId) {
  appState.activePhaseId = Number(phaseId);
  safeSetStorage(STORAGE_KEYS.ACTIVE_PHASE, appState.activePhaseId);
  renderHeaderStatus();
  renderWorkoutView();
}

// Render Top Header Readiness Badge
function renderHeaderStatus() {
  const pill = document.getElementById('header-readiness-pill');
  if (!pill) return;

  const sortedLogs = [...appState.logs].sort((a, b) => b.date.localeCompare(a.date));
  const latest = sortedLogs[0];
  if (!latest) {
    pill.textContent = '24h: -- • Ready';
    pill.className = 'px-2.5 py-0.5 rounded-full text-xs font-semibold border border-[#2a2f37] bg-[#20242a] text-[#94a3b8]';
    return;
  }

  const p24 = Number(latest.pain24h);
  if (p24 <= 3) {
    pill.textContent = `24h: ${p24}/10 • Ready`;
    pill.className = 'px-2.5 py-0.5 rounded-full text-xs font-semibold border border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981]';
  } else if (p24 <= 5) {
    pill.textContent = `24h: ${p24}/10 • Hold`;
    pill.className = 'px-2.5 py-0.5 rounded-full text-xs font-semibold border border-[#d97706]/30 bg-[#d97706]/10 text-[#d97706]';
  } else {
    pill.textContent = `24h: ${p24}/10 • Rest`;
    pill.className = 'px-2.5 py-0.5 rounded-full text-xs font-semibold border border-[#e11d48]/30 bg-[#e11d48]/10 text-[#e11d48]';
  }
}

// Render Workout View (4 Clean Pills, Phase Banner, Minimalist Exercise Cards)
function renderWorkoutView() {
  const phaseGrid = document.getElementById('phase-selector-grid');
  const activePhase = appState.protocol.phases.find((p) => p.id === appState.activePhaseId) || appState.protocol.phases[0];

  const phaseLabels = {
    1: '1. Isometrics',
    2: '2. Heavy Slow',
    3: '3. Plyometrics',
    4: '4. WOD Return'
  };

  if (phaseGrid) {
    phaseGrid.innerHTML = appState.protocol.phases.map((p) => {
      const isActive = p.id === activePhase.id;
      return `
        <button type="button" onclick="selectPhase(${p.id})" class="phase-pill tap-target ${isActive ? 'active' : ''}">
          ${phaseLabels[p.id] || p.title}
        </button>
      `;
    }).join('');
  }

  const titleEl = document.getElementById('phase-banner-title');
  const subEl = document.getElementById('phase-banner-subtitle');

  const scheduleSummaries = {
    1: 'Daily / 2x daily • Pre-WOD warm-up',
    2: '3x/week • 48h rest between sessions',
    3: '2–3x/week • 48h–72h recovery between sessions',
    4: '2–3x/week • Gradual WOD return'
  };

  if (titleEl) titleEl.textContent = activePhase.title;
  if (subEl) subEl.textContent = scheduleSummaries[activePhase.id] || activePhase.timeline || '3x/week • 48h rest between sessions';

  // Calculate today's set completion for active phase
  const todayKey = appState.formState.date;
  const dayRecord = appState.setProgress[todayKey] || {};
  let totalSets = 0;
  let completedSets = 0;

  activePhase.exercises.forEach((ex) => {
    const count = Number(ex.sets) || 3;
    totalSets += count;
    const exRec = dayRecord[ex.id];
    if (exRec && Array.isArray(exRec.sets)) {
      for (let i = 0; i < count; i++) {
        if (exRec.sets[i]) completedSets++;
      }
    }
  });

  const pct = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
  const barEl = document.getElementById('workout-completion-bar');
  const textEl = document.getElementById('workout-completion-text');
  if (barEl) barEl.style.width = `${pct}%`;
  if (textEl) textEl.textContent = `${completedSets} / ${totalSets} sets`;

  const cardsContainer = document.getElementById('exercise-cards-container');
  if (!cardsContainer) return;

  cardsContainer.innerHTML = activePhase.exercises.map((ex) => {
    const numSets = Number(ex.sets) || 3;
    const exState = (dayRecord[ex.id]) || { sets: Array(numSets).fill(false), load: '' };
    const isDrawerOpen = Boolean(appState.openVideoDraws[ex.id]);
    const isEmbedLoaded = Boolean(appState.loadedYoutubeEmbeds[ex.id]);

    const setButtonsHtml = Array.from({ length: numSets }, (_, sIdx) => {
      const done = Boolean(exState.sets && exState.sets[sIdx]);
      return `
        <button
          type="button"
          onclick="toggleExerciseSet('${ex.id}', ${sIdx}, ${numSets}, ${ex.restSec})"
          class="set-btn tap-target ${done ? 'completed' : ''}"
          style="min-width: 38px; min-height: 38px; width: 38px; height: 38px; padding: 0; font-size: 0.85rem;"
        >
          ${done ? '✓' : (sIdx + 1)}
        </button>
      `;
    }).join('');

    return `
      <article class="bg-[#181b1f] border border-[#2a2f37] rounded-xl p-4">
        <div>
          <h3 class="text-sm sm:text-base font-semibold text-[#f1f5f9]">${ex.name}</h3>
          <p class="text-xs text-[#94a3b8] mt-0.5">${ex.sets} × ${ex.repsOrHold} • ${ex.tempo} • ${ex.restSec}s rest</p>
        </div>

        <div class="flex items-center gap-2 mt-3 flex-wrap">
          <div class="flex items-center gap-1.5 flex-wrap">
            ${setButtonsHtml}
          </div>
          <input
            type="text"
            placeholder="Load"
            value="${(exState.load || '').replace(/"/g, '&quot;')}"
            onchange="updateExerciseLoad('${ex.id}', this.value, ${numSets})"
            class="w-20 sm:w-24 px-2.5 py-1.5 rounded-lg bg-[#20242a] border border-[#2a2f37] text-xs text-[#f1f5f9] text-center focus:outline-none focus:border-[#475569] placeholder:text-[#64748b]"
          />
        </div>

        <div class="flex items-center gap-2 mt-3 pt-2.5 border-t border-[#2a2f37]/60">
          <button
            type="button"
            onclick="launchExerciseTimer('${ex.id}', '${ex.defaultTimerMode || 'rest'}', ${ex.defaultDurationSec || 45}, '${ex.name.replace(/'/g, "\\'")}')"
            class="px-3 py-1.5 rounded-lg bg-[#20242a] hover:bg-[#2a2f37] border border-[#2a2f37] text-[#f1f5f9] font-medium text-xs transition-colors"
          >
            Start Timer
          </button>
          <button
            type="button"
            onclick="toggleFormDrawer('${ex.id}')"
            class="px-3 py-1.5 rounded-lg bg-[#20242a] hover:bg-[#2a2f37] border border-[#2a2f37] text-[#94a3b8] hover:text-[#f1f5f9] font-medium text-xs transition-colors"
          >
            Form Demo
          </button>
        </div>

        <div class="${isDrawerOpen ? 'block' : 'hidden'} mt-3 p-3 rounded-lg bg-[#111315] border border-[#2a2f37] space-y-2.5 text-xs text-[#94a3b8]">
          <div><span class="text-[#f1f5f9] font-medium">Cues:</span> ${ex.cues}</div>
          ${ex.equipment && ex.equipment.length ? `<div><span class="text-[#f1f5f9] font-medium">Equipment:</span> ${ex.equipment.join(', ')}</div>` : ''}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#2a2f37]/60 items-center">
            <div>${getExerciseSvgMarkup(ex.svgType)}</div>
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="font-medium text-[#f1f5f9]">Video Demo</span>
                <a href="${ex.videoUrl}" target="_blank" rel="noopener noreferrer" class="text-xs text-[#94a3b8] hover:text-[#f1f5f9] underline">YouTube ↗</a>
              </div>
              ${isEmbedLoaded ? `
                <div class="relative w-full h-36 rounded-lg overflow-hidden border border-[#2a2f37] bg-black">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/${ex.videoId}?rel=0"
                    title="${ex.videoTitle.replace(/"/g, '&quot;')}"
                    class="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              ` : `
                <button
                  type="button"
                  onclick="loadYoutubeEmbed('${ex.id}')"
                  class="w-full py-5 rounded-lg bg-[#181b1f] hover:bg-[#20242a] border border-[#2a2f37] text-xs text-[#94a3b8] hover:text-[#f1f5f9] font-medium transition-colors"
                >
                  Load Video
                </button>
              `}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Toggle a Single Set Completion Button
function toggleExerciseSet(exId, setIndex, totalSets, restSec) {
  const todayKey = appState.formState.date;
  if (!appState.setProgress[todayKey]) appState.setProgress[todayKey] = {};
  if (!appState.setProgress[todayKey][exId]) {
    appState.setProgress[todayKey][exId] = {
      sets: Array(totalSets).fill(false),
      load: ''
    };
  }
  const currentArr = appState.setProgress[todayKey][exId].sets;
  while (currentArr.length < totalSets) currentArr.push(false);
  const nextVal = !currentArr[setIndex];
  currentArr[setIndex] = nextVal;
  safeSetStorage(STORAGE_KEYS.SET_PROGRESS, appState.setProgress);
  renderWorkoutView();

  if (nextVal) {
    playGymBeep(660, 110, 'triangle');
    configureTimer('rest', restSec || 90, `Rest ${restSec || 90}s`, false);
    showToast(`Set ${setIndex + 1} logged.`);
  }
}

// Update Exercise Load String
function updateExerciseLoad(exId, loadValue, totalSets) {
  const todayKey = appState.formState.date;
  if (!appState.setProgress[todayKey]) appState.setProgress[todayKey] = {};
  if (!appState.setProgress[todayKey][exId]) {
    appState.setProgress[todayKey][exId] = {
      sets: Array(totalSets).fill(false),
      load: ''
    };
  }
  appState.setProgress[todayKey][exId].load = loadValue.trim();
  safeSetStorage(STORAGE_KEYS.SET_PROGRESS, appState.setProgress);
  showToast('Load saved.');
}

// Reset Today's Checked Sets
function resetTodaySets() {
  openConfirmModal(
    'Reset Today\'s Sets?',
    'This clears the checkmarks on today\'s sets so you can start fresh.',
    () => {
      const todayKey = appState.formState.date;
      appState.setProgress[todayKey] = {};
      safeSetStorage(STORAGE_KEYS.SET_PROGRESS, appState.setProgress);
      renderWorkoutView();
      showToast('Today\'s sets reset.');
    }
  );
}

// Toggle Form Guide / Video Drawer
function toggleFormDrawer(exId) {
  appState.openVideoDraws[exId] = !appState.openVideoDraws[exId];
  renderWorkoutView();
}

function loadYoutubeEmbed(exId) {
  appState.loadedYoutubeEmbeds[exId] = true;
  renderWorkoutView();
}

// ==========================================================================
// Built-In Gym Timer & HSR 3s/3s Tempo Metronome Engine
// ==========================================================================

function stopTimerInterval() {
  if (appState.timer.intervalId) {
    clearInterval(appState.timer.intervalId);
    appState.timer.intervalId = null;
  }
  appState.timer.running = false;
}

function setTimerMode(mode) {
  stopTimerInterval();
  if (mode === 'iso') {
    configureTimer('iso', 45, 'Hold (45s)', false);
  } else if (mode === 'rest') {
    configureTimer('rest', 90, 'Rest (90s)', false);
  } else if (mode === 'hsr') {
    const repsInput = document.getElementById('hsr-target-reps-input');
    const reps = repsInput ? Math.max(1, Math.min(25, Number(repsInput.value) || 8)) : 8;
    appState.timer.hsrTargetReps = reps;
    configureTimer('hsr', reps * 6, `Tempo (${reps} Reps)`, false);
  }
}

function configureTimer(mode, durationSec, label, autoStart = false) {
  stopTimerInterval();
  appState.timer.mode = mode;
  appState.timer.durationSec = Math.max(5, Number(durationSec) || 45);
  appState.timer.remainingSec = appState.timer.durationSec;
  appState.timer.prepRemaining = mode === 'iso' ? 5 : 0;
  appState.timer.contextLabel = label || 'Timer';
  appState.timer.hsrCurrentRep = 1;
  appState.timer.hsrSubPhase = 'ECCENTRIC DOWN';
  appState.timer.hsrSubSec = 3;

  renderTimerUI();
  if (autoStart) {
    toggleTimerStartPause();
  }
}

function launchExerciseTimer(exId, mode, durationSec, label) {
  configureTimer(mode, durationSec, label, true);
  showToast(`Timer started: ${label}`);
}

function setTimerPreset(seconds) {
  const mode = appState.timer.mode === 'hsr' ? 'rest' : appState.timer.mode;
  configureTimer(mode, seconds, `${mode === 'iso' ? 'Hold' : 'Rest'} (${seconds}s)`, false);
}

function adjustTimerSeconds(delta) {
  appState.timer.durationSec = Math.max(5, appState.timer.durationSec + delta);
  appState.timer.remainingSec = Math.max(1, appState.timer.remainingSec + delta);
  renderTimerUI();
}

function updateHsrTargetReps(val) {
  const reps = Math.max(1, Math.min(25, Number(val) || 8));
  appState.timer.hsrTargetReps = reps;
  if (appState.timer.mode === 'hsr') {
    configureTimer('hsr', reps * 6, `Tempo (${reps} Reps)`, false);
  }
}

function toggleTimerMute() {
  appState.timer.muted = !appState.timer.muted;
  renderTimerUI();
  showToast(appState.timer.muted ? 'Timer muted' : 'Timer unmuted');
}

function resetTimer() {
  configureTimer(appState.timer.mode, appState.timer.durationSec, appState.timer.contextLabel, false);
}

function toggleTimerStartPause() {
  if (appState.timer.running) {
    stopTimerInterval();
    renderTimerUI();
    return;
  }

  if (appState.timer.remainingSec <= 0) {
    appState.timer.remainingSec = appState.timer.durationSec;
    appState.timer.prepRemaining = appState.timer.mode === 'iso' ? 5 : 0;
    appState.timer.hsrCurrentRep = 1;
    appState.timer.hsrSubPhase = 'ECCENTRIC DOWN';
    appState.timer.hsrSubSec = 3;
  }

  appState.timer.running = true;
  playGymBeep(660, 120, 'sine');
  renderTimerUI();

  appState.timer.intervalId = setInterval(() => {
    tickTimer();
  }, 1000);
}

function tickTimer() {
  const t = appState.timer;

  if (t.prepRemaining > 0) {
    t.prepRemaining -= 1;
    if (t.prepRemaining > 0) {
      playGymBeep(440, 90, 'sine');
    } else {
      playGymBeep(880, 260, 'triangle');
    }
    renderTimerUI();
    return;
  }

  if (t.mode === 'hsr') {
    t.remainingSec = Math.max(0, t.remainingSec - 1);
    t.hsrSubSec -= 1;

    if (t.hsrSubSec <= 0) {
      if (t.hsrSubPhase === 'ECCENTRIC DOWN') {
        t.hsrSubPhase = 'CONCENTRIC UP';
        t.hsrSubSec = 3;
        playGymBeep(740, 140, 'triangle');
      } else {
        if (t.hsrCurrentRep >= t.hsrTargetReps || t.remainingSec <= 0) {
          t.remainingSec = 0;
          stopTimerInterval();
          playGymBeep(988, 380, 'square');
          showToast('Tempo set complete.');
          renderTimerUI();
          return;
        }
        t.hsrCurrentRep += 1;
        t.hsrSubPhase = 'ECCENTRIC DOWN';
        t.hsrSubSec = 3;
        playGymBeep(587, 140, 'sine');
      }
    } else {
      playGymBeep(380, 60, 'sine');
    }

    renderTimerUI();
    return;
  }

  t.remainingSec = Math.max(0, t.remainingSec - 1);
  if (t.remainingSec <= 3 && t.remainingSec > 0) {
    playGymBeep(520, 100, 'sine');
  } else if (t.remainingSec === 0) {
    stopTimerInterval();
    playGymBeep(988, 400, 'square');
    showToast(`${t.contextLabel} done.`);
  }
  renderTimerUI();
}

function formatClock(sec) {
  const s = Math.max(0, Math.floor(sec));
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

function renderTimerUI() {
  const t = appState.timer;

  // Mode tab styles
  ['iso', 'rest', 'hsr'].forEach((m) => {
    const btn = document.getElementById(`timer-mode-${m}`);
    if (btn) {
      if (t.mode === m) {
        btn.className = 'tap-target py-2 rounded-lg font-semibold text-xs sm:text-sm bg-[#e2e8f0] text-[#0f172a]';
      } else {
        btn.className = 'tap-target py-2 rounded-lg font-medium text-xs sm:text-sm bg-[#20242a] text-[#94a3b8] border border-[#2a2f37]';
      }
    }
  });

  const audioBtn = document.getElementById('timer-audio-toggle');
  if (audioBtn) {
    audioBtn.textContent = t.muted ? 'Buzzer Muted' : 'Buzzer Active';
  }

  const contextEl = document.getElementById('timer-context-label');
  if (contextEl) contextEl.textContent = t.contextLabel;

  const mainClock = document.getElementById('timer-display-main');
  const badgeEl = document.getElementById('timer-phase-badge');
  const repEl = document.getElementById('timer-hsr-rep-counter');
  const ringEl = document.getElementById('timer-ring-progress');

  if (mainClock) {
    if (t.prepRemaining > 0 && t.running) {
      mainClock.textContent = `00:0${t.prepRemaining}`;
    } else if (t.mode === 'hsr') {
      mainClock.textContent = `00:0${t.hsrSubSec}`;
    } else {
      mainClock.textContent = formatClock(t.remainingSec);
    }
  }

  if (badgeEl) {
    if (t.remainingSec === 0) {
      badgeEl.textContent = 'COMPLETE';
      badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 mb-1';
    } else if (t.prepRemaining > 0 && t.running) {
      badgeEl.textContent = `PREP (${t.prepRemaining}s)`;
      badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#d97706]/15 text-[#d97706] border border-[#d97706]/30 mb-1';
    } else if (t.mode === 'hsr') {
      badgeEl.textContent = `${t.hsrSubPhase} (${t.hsrSubSec}s)`;
      badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#20242a] text-[#94a3b8] border border-[#2a2f37] mb-1';
    } else if (t.mode === 'iso') {
      badgeEl.textContent = t.running ? 'HOLDING' : 'READY';
      badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#20242a] text-[#94a3b8] border border-[#2a2f37] mb-1';
    } else {
      badgeEl.textContent = t.running ? 'RESTING' : 'READY';
      badgeEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#20242a] text-[#94a3b8] border border-[#2a2f37] mb-1';
    }
  }

  if (repEl) {
    if (t.mode === 'hsr') {
      repEl.textContent = `Rep ${t.hsrCurrentRep} of ${t.hsrTargetReps}`;
      repEl.classList.remove('hidden');
    } else {
      repEl.classList.add('hidden');
    }
  }

  if (ringEl) {
    const circumference = 603.18;
    const frac = t.durationSec > 0 ? Math.max(0, Math.min(1, t.remainingSec / t.durationSec)) : 0;
    const offset = circumference * (1 - frac);
    ringEl.style.strokeDashoffset = String(offset);
    ringEl.style.stroke = '#10b981';
  }

  const startBtn = document.getElementById('btn-timer-start');
  if (startBtn) {
    startBtn.textContent = t.running ? 'Pause' : 'Start';
  }

  // Update persistent floating bar
  const floatBar = document.getElementById('floating-timer-bar');
  const floatLabel = document.getElementById('floating-timer-label');
  const floatClock = document.getElementById('floating-timer-clock');
  const floatToggle = document.getElementById('btn-floating-toggle');

  if (floatBar && floatLabel && floatClock && floatToggle) {
    floatLabel.textContent = t.prepRemaining > 0 && t.running
      ? `Prep: ${t.contextLabel}`
      : t.mode === 'hsr' && t.running
        ? `${t.hsrSubPhase} (Rep ${t.hsrCurrentRep}/${t.hsrTargetReps})`
        : t.contextLabel;
    floatClock.textContent = t.prepRemaining > 0 && t.running
      ? `00:0${t.prepRemaining}`
      : formatClock(t.remainingSec);
    floatToggle.textContent = t.running ? 'Pause' : 'Start';
  }
}

// ==========================================================================
// Daily Check-In & Pain Trend Tracker (0-10 NRS + Chart.js)
// ==========================================================================

function renderPainScaleButtons() {
  const fields = [
    { key: 'painPre', containerId: 'pain-grid-pre', valId: 'val-pain-pre' },
    { key: 'painPost', containerId: 'pain-grid-post', valId: 'val-pain-post' },
    { key: 'pain24h', containerId: 'pain-grid-24h', valId: 'val-pain-24h' },
    { key: 'painDecline', containerId: 'pain-grid-decline', valId: 'val-pain-decline' }
  ];

  fields.forEach(({ key, containerId, valId }) => {
    const container = document.getElementById(containerId);
    const valEl = document.getElementById(valId);
    const currentVal = Number(appState.formState[key]);

    if (valEl) {
      valEl.textContent = `${currentVal} / 10`;
    }

    if (container) {
      container.innerHTML = Array.from({ length: 11 }, (_, num) => {
        let selClass = '';
        if (num === currentVal) {
          if (num <= 3) selClass = 'selected-green';
          else if (num <= 5) selClass = 'selected-amber';
          else selClass = 'selected-red';
        }
        return `
          <button
            type="button"
            onclick="selectPainScore('${key}', ${num})"
            class="pain-btn ${selClass}"
          >
            ${num}
          </button>
        `;
      }).join('');
    }
  });

  renderClinicalDecisionFeedback();
}

function selectPainScore(fieldKey, score) {
  appState.formState[fieldKey] = Number(score);
  renderPainScaleButtons();
}

function renderClinicalDecisionFeedback() {
  const box = document.getElementById('clinical-decision-box');
  if (!box) return;

  const p24 = Number(appState.formState.pain24h);
  const pDec = Number(appState.formState.painDecline);
  const worst = Math.max(p24, pDec);

  if (worst <= 3) {
    box.className = 'p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981] text-xs font-medium';
    box.textContent = 'Load tolerated — maintain or progress weight next session.';
  } else if (worst <= 5) {
    box.className = 'p-3 rounded-lg bg-[#d97706]/10 border border-[#d97706]/25 text-[#d97706] text-xs font-medium';
    box.textContent = 'Elevated response — hold weight and reduce volume by 1–2 sets.';
  } else {
    box.className = 'p-3 rounded-lg bg-[#e11d48]/10 border border-[#e11d48]/25 text-[#e11d48] text-xs font-medium';
    box.textContent = 'Tendon flare — pause heavy loading and use Phase 1 holds for 48h.';
  }
}

function syncCompletedExercisesToTrackerForm() {
  const dateInput = document.getElementById('log-date-input');
  const selectedDate = dateInput ? dateInput.value : appState.formState.date;
  appState.formState.date = selectedDate;

  const exInput = document.getElementById('log-exercises-summary');
  if (!exInput) return;

  const existingLog = appState.logs.find((l) => l.date === selectedDate);
  const daySets = appState.setProgress[selectedDate] || {};
  const compiled = [];

  appState.protocol.phases.forEach((p) => {
    p.exercises.forEach((ex) => {
      const rec = daySets[ex.id];
      if (rec && Array.isArray(rec.sets)) {
        const doneCount = rec.sets.filter(Boolean).length;
        if (doneCount > 0) {
          compiled.push(`${ex.name} (${doneCount}/${ex.sets} sets${rec.load ? ` @ ${rec.load}` : ''})`);
        }
      }
    });
  });

  if (compiled.length > 0) {
    exInput.value = compiled.join(', ');
  } else if (existingLog && existingLog.exercises) {
    exInput.value = existingLog.exercises;
  }
}

function handleLogDateChange(newDate) {
  if (!newDate) return;
  appState.formState.date = newDate;
  const existing = appState.logs.find((l) => l.date === newDate);
  const phaseSelect = document.getElementById('log-phase-select');
  const exInput = document.getElementById('log-exercises-summary');
  const notesInput = document.getElementById('log-notes-input');

  if (existing) {
    appState.formState.phase = existing.phase;
    appState.formState.painPre = existing.painPre;
    appState.formState.painPost = existing.painPost;
    appState.formState.pain24h = existing.pain24h;
    appState.formState.painDecline = existing.painDecline ?? existing.pain24h;
    if (phaseSelect) phaseSelect.value = String(existing.phase);
    if (exInput) exInput.value = existing.exercises || '';
    if (notesInput) notesInput.value = existing.notes || '';
  } else {
    syncCompletedExercisesToTrackerForm();
    if (notesInput) notesInput.value = '';
  }
  renderPainScaleButtons();
  renderWorkoutView();
}

function saveDailyLog() {
  const dateEl = document.getElementById('log-date-input');
  const phaseEl = document.getElementById('log-phase-select');
  const exEl = document.getElementById('log-exercises-summary');
  const notesEl = document.getElementById('log-notes-input');

  const dateVal = (dateEl && dateEl.value) ? dateEl.value : appState.formState.date;
  const phaseVal = phaseEl ? Number(phaseEl.value) : appState.activePhaseId;
  const exercisesVal = exEl && exEl.value.trim()
    ? exEl.value.trim()
    : 'Phase ' + phaseVal + ' Session';
  const notesVal = notesEl ? notesEl.value.trim() : '';

  const entry = {
    date: dateVal,
    phase: phaseVal,
    painPre: Number(appState.formState.painPre),
    painPost: Number(appState.formState.painPost),
    pain24h: Number(appState.formState.pain24h),
    painDecline: Number(appState.formState.painDecline),
    exercises: exercisesVal,
    notes: notesVal || 'Session completed.'
  };

  const existingIndex = appState.logs.findIndex((l) => l.date === dateVal);
  if (existingIndex >= 0) {
    appState.logs[existingIndex] = entry;
  } else {
    appState.logs.push(entry);
  }

  appState.logs.sort((a, b) => a.date.localeCompare(b.date));
  safeSetStorage(STORAGE_KEYS.LOGS, appState.logs);

  renderHeaderStatus();
  renderPainChart();
  renderLogHistory();
  showToast(`Saved check-in for ${dateVal}`);
}

function clearLogForm() {
  appState.formState.painPre = 2;
  appState.formState.painPost = 2;
  appState.formState.pain24h = 2;
  appState.formState.painDecline = 2;
  const exEl = document.getElementById('log-exercises-summary');
  const notesEl = document.getElementById('log-notes-input');
  if (exEl) exEl.value = '';
  if (notesEl) notesEl.value = '';
  renderPainScaleButtons();
  showToast('Form cleared.');
}

function seedSampleLogs() {
  appState.logs = JSON.parse(JSON.stringify(INITIAL_SAMPLE_LOGS));
  safeSetStorage(STORAGE_KEYS.LOGS, appState.logs);
  renderHeaderStatus();
  renderPainChart();
  renderLogHistory();
  showToast('Restored sample logs.');
}

function editLogEntry(dateStr) {
  const dateEl = document.getElementById('log-date-input');
  if (dateEl) dateEl.value = dateStr;
  handleLogDateChange(dateStr);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast(`Editing ${dateStr}`);
}

function deleteLogEntry(dateStr) {
  openConfirmModal(
    `Delete ${dateStr}?`,
    `This will remove the entry for ${dateStr} from storage.`,
    () => {
      appState.logs = appState.logs.filter((l) => l.date !== dateStr);
      safeSetStorage(STORAGE_KEYS.LOGS, appState.logs);
      renderHeaderStatus();
      renderPainChart();
      renderLogHistory();
      showToast(`Deleted ${dateStr}`);
    }
  );
}

// Render Chart.js Pain Trend Graph (Neutral Dark Styling)
function renderPainChart() {
  const sorted = [...appState.logs].sort((a, b) => a.date.localeCompare(b.date));

  const canvas = document.getElementById('pain-trend-chart');
  if (!canvas || typeof window.Chart === 'undefined') return;

  const labels = sorted.map((l) => l.date.slice(5)); // MM-DD
  const preSeries = sorted.map((l) => Number(l.painPre));
  const postSeries = sorted.map((l) => Number(l.painPost));
  const next24Series = sorted.map((l) => Number(l.pain24h));
  const thresholdSeries = sorted.map(() => 3);

  if (appState.chartInstance) {
    appState.chartInstance.destroy();
    appState.chartInstance = null;
  }

  const ctx = canvas.getContext('2d');
  appState.chartInstance = new window.Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: '24h Next-Day',
          data: next24Series,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: '#10b981',
          tension: 0.25,
          fill: true
        },
        {
          label: 'Pre-Workout',
          data: preSeries,
          borderColor: '#94a3b8',
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          pointRadius: 3,
          pointBackgroundColor: '#94a3b8',
          tension: 0.25
        },
        {
          label: 'Post-Workout',
          data: postSeries,
          borderColor: '#64748b',
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderDash: [4, 4],
          pointRadius: 3,
          pointBackgroundColor: '#64748b',
          tension: 0.25
        },
        {
          label: 'Safe Ceiling (3/10)',
          data: thresholdSeries,
          borderColor: '#d97706',
          borderWidth: 1,
          borderDash: [4, 4],
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          labels: {
            color: '#94a3b8',
            font: { size: 11, weight: '500' },
            boxWidth: 12
          }
        },
        tooltip: {
          backgroundColor: '#181b1f',
          titleColor: '#f1f5f9',
          bodyColor: '#94a3b8',
          borderColor: '#2a2f37',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 1,
            color: '#64748b'
          },
          grid: {
            color: '#2a2f37'
          },
          title: {
            display: false
          }
        },
        x: {
          ticks: {
            color: '#64748b'
          },
          grid: {
            color: '#2a2f37'
          }
        }
      }
    }
  });
}

// Render Saved Daily Log History
function renderLogHistory() {
  const container = document.getElementById('log-history-container');
  if (!container) return;

  const sorted = [...appState.logs].sort((a, b) => b.date.localeCompare(a.date));
  if (sorted.length === 0) {
    container.innerHTML = `<div class="p-4 text-center text-[#94a3b8] text-xs bg-[#181b1f] rounded-xl border border-[#2a2f37]">No daily check-ins logged yet.</div>`;
    return;
  }

  container.innerHTML = sorted.map((item) => {
    const p24 = Number(item.pain24h);
    const badgeColor = p24 <= 3
      ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30'
      : p24 <= 5
        ? 'bg-[#d97706]/10 text-[#d97706] border-[#d97706]/30'
        : 'bg-[#e11d48]/10 text-[#e11d48] border-[#e11d48]/30';

    return `
      <div class="p-3.5 rounded-xl bg-[#181b1f] border border-[#2a2f37] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-bold text-[#f1f5f9]">${item.date}</span>
            <span class="px-2 py-0.5 rounded bg-[#20242a] text-[#94a3b8] text-[11px] font-medium">Phase ${item.phase}</span>
            <span class="px-2 py-0.5 rounded-full border text-[11px] font-semibold ${badgeColor}">
              24h: ${item.pain24h}/10
            </span>
            <span class="text-[11px] text-[#64748b]">
              Pre: ${item.painPre} • Post: ${item.painPost} • Test: ${item.painDecline ?? item.pain24h}
            </span>
          </div>
          ${item.exercises ? `<div class="text-xs text-[#94a3b8]">${item.exercises}</div>` : ''}
          ${item.notes ? `<div class="text-xs text-[#64748b]">${item.notes}</div>` : ''}
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onclick="editLogEntry('${item.date}')"
            class="px-2.5 py-1 rounded-lg bg-[#20242a] hover:bg-[#2a2f37] text-[#94a3b8] hover:text-[#f1f5f9] border border-[#2a2f37] text-xs font-medium transition-colors"
          >
            Edit
          </button>
          <button
            type="button"
            onclick="deleteLogEntry('${item.date}')"
            class="px-2.5 py-1 rounded-lg bg-[#20242a] hover:bg-[#e11d48]/20 text-[#94a3b8] hover:text-[#e11d48] border border-[#2a2f37] text-xs font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// AI Evaluation Export & Dynamic JSON Workout Adjustment Importer
// ==========================================================================

function generateAiExportReport(notify = true) {
  const sorted = [...appState.logs].sort((a, b) => a.date.localeCompare(b.date));
  const last7 = sorted.slice(-7);
  const activePhase = appState.protocol.phases.find((p) => p.id === appState.activePhaseId) || appState.protocol.phases[0];

  const avgPre = last7.length
    ? (last7.reduce((s, r) => s + Number(r.painPre || 0), 0) / last7.length).toFixed(1)
    : 'N/A';
  const avgPost = last7.length
    ? (last7.reduce((s, r) => s + Number(r.painPost || 0), 0) / last7.length).toFixed(1)
    : 'N/A';
  const avg24 = last7.length
    ? (last7.reduce((s, r) => s + Number(r.pain24h || 0), 0) / last7.length).toFixed(1)
    : 'N/A';
  const flares = last7.filter((r) => Number(r.pain24h) > 3).length;

  const logLines = last7.map((r) => (
    `- ${r.date} (Phase ${r.phase}): Pre=${r.painPre}/10 | Post=${r.painPost}/10 | 24h=${r.pain24h}/10 | DeclineTest=${r.painDecline ?? r.pain24h}/10\n` +
    `  Exercises: ${r.exercises}\n` +
    `  Notes: ${r.notes}`
  )).join('\n');

  const currentPhaseJson = JSON.stringify({
    activePhaseId: activePhase.id,
    phaseTitle: activePhase.title,
    exercises: activePhase.exercises.map((e) => ({
      id: e.id,
      name: e.name,
      sets: e.sets,
      repsOrHold: e.repsOrHold,
      tempo: e.tempo,
      restSec: e.restSec,
      loadGuidance: e.loadGuidance,
      videoId: e.videoId,
      videoUrl: e.videoUrl
    }))
  }, null, 2);

  const report = [
    '=== PATELLAR TENDINITIS REHAB — 7-DAY AI PROGRESS EXPORT ===',
    `Export Date: ${appState.formState.date}`,
    `Current Phase: Phase ${activePhase.id} (${activePhase.shortName})`,
    `7-Day Metrics: Avg Pre=${avgPre}/10 | Avg Post=${avgPost}/10 | Avg 24h=${avg24}/10 | Flares (>3/10)=${flares}`,
    '',
    '--- LAST 7 DAYS SESSIONS ---',
    logLines || 'No sessions logged yet.',
    '',
    '--- CURRENT ACTIVE PHASE PRESCRIPTION ---',
    currentPhaseJson,
    '',
    '--- AI COACHING REQUEST ---',
    'Based on the last 7 days of Pre-Workout, Post-Workout, and 24-Hour Next-Day pain scores above (using the Silbernagel <= 3/10 rule), please:',
    '1. Evaluate load tolerance and recommend whether to progress, hold, or regress.',
    '2. Provide an updated JSON workout object compatible with the "Import Plan JSON" feature.'
  ].join('\n');

  const outEl = document.getElementById('ai-export-textarea');
  if (outEl) outEl.value = report;
  if (notify) showToast('Generated 7-day report.');
}

function copyTextWithFallback(text, successMsg) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackExecCopy(text, successMsg);
    });
  } else {
    fallbackExecCopy(text, successMsg);
  }
}

function fallbackExecCopy(text, successMsg) {
  const temp = document.createElement('textarea');
  temp.value = text;
  temp.style.position = 'fixed';
  temp.style.opacity = '0';
  document.body.appendChild(temp);
  temp.focus();
  temp.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (err) {
    showToast('Select text manually to copy.');
  }
  document.body.removeChild(temp);
}

function copyAiExportToClipboard() {
  const outEl = document.getElementById('ai-export-textarea');
  if (!outEl || !outEl.value) {
    generateAiExportReport(false);
  }
  const text = outEl ? outEl.value : '';
  copyTextWithFallback(text, 'Copied 7-day report to clipboard.');
}

function loadSampleAiAdjustmentJson() {
  const sampleAdjustment = {
    updateNote: 'Week 5 Progression: 24h pain averaged 1.9/10 (<3/10 ceiling). Progressing HSR loads and adding a set.',
    phaseId: 2,
    title: 'Phase 2 — Heavy Slow Resistance (Week 5 Progression)',
    timeline: 'Weeks 5–6 (3 Sessions/Week — 48h Recovery Spacing)',
    exercises: [
      {
        id: 'p2_slant_hsr_squat',
        name: 'Slant Board HSR Tempo Squat (Heavy)',
        equipment: ['25° Slant Board', 'Barbell / Goblet KB'],
        sets: 4,
        repsOrHold: '6–8 reps',
        tempo: '3s Eccentric • 0s Pause • 3s Concentric',
        restSec: 150,
        defaultTimerMode: 'hsr',
        defaultDurationSec: 48,
        loadGuidance: '+5kg from last week (target 65kg; pain <= 3/10)',
        cues: 'Strict 3s down / 3s up cadence on slant board.',
        svgType: 'decline_squat',
        videoId: 'v1B7qGU461I',
        videoTitle: 'Slant Board Squats — Strength & Sport',
        videoUrl: 'http://www.youtube.com/watch?v=v1B7qGU461I'
      },
      {
        id: 'p2_barbell_hsr_squat',
        name: 'Barbell Heavy Slow Resistance Back Squat',
        equipment: ['Squat Rack', 'Barbell + Bumper Plates'],
        sets: 4,
        repsOrHold: '6 reps',
        tempo: '3s Eccentric • 0s Pause • 3s Concentric',
        restSec: 180,
        defaultTimerMode: 'hsr',
        defaultDurationSec: 36,
        loadGuidance: '82.5–85kg Barbell; 3m rest between sets',
        cues: 'Drive smoothly over 3 seconds to maximize mechanical tendon strain.',
        svgType: 'barbell_squat',
        videoId: 'Y7sfQTTLOws',
        videoTitle: 'HSR Training Programme — Sports Injury Physio',
        videoUrl: 'http://www.youtube.com/watch?v=Y7sfQTTLOws'
      },
      {
        id: 'p2_bulgarian_split',
        name: 'Slow-Tempo Dumbbell Bulgarian Split Squat',
        equipment: ['20" Plyo Box', 'Pair of Heavy Dumbbells'],
        sets: 4,
        repsOrHold: '8 reps / leg',
        tempo: '3s Eccentric • 1s Pause • 3s Concentric',
        restSec: 90,
        defaultTimerMode: 'hsr',
        defaultDurationSec: 48,
        loadGuidance: '4 working sets @ 22.5kg DBs',
        cues: 'Maintain vertical shin bias and upright chest.',
        svgType: 'split_squat',
        videoId: 'uODWo4YqbT8',
        videoTitle: 'Bulgarian Split Squat — Davis Diley',
        videoUrl: 'http://www.youtube.com/watch?v=uODWo4YqbT8'
      }
    ]
  };

  const inEl = document.getElementById('ai-import-textarea');
  if (inEl) {
    inEl.value = JSON.stringify(sampleAdjustment, null, 2);
  }
  showToast('Loaded sample progression JSON.');
}

function importUpdatedPlanJson() {
  const inEl = document.getElementById('ai-import-textarea');
  const statusEl = document.getElementById('import-status-banner');
  if (!inEl || !inEl.value.trim()) {
    showToast('Paste JSON plan or click "Sample JSON" first.');
    return;
  }

  try {
    const parsed = JSON.parse(inEl.value.trim());

    if (Array.isArray(parsed.phases) && parsed.phases.length > 0) {
      appState.protocol = parsed;
      safeSetStorage(STORAGE_KEYS.CUSTOM_PLAN, appState.protocol);
      renderHeaderStatus();
      renderWorkoutView();
      if (statusEl) {
        statusEl.className = 'mt-3 p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-xs font-medium';
        statusEl.textContent = `✓ Imported multi-phase plan (${parsed.phases.length} phases).`;
        statusEl.classList.remove('hidden');
      }
      showToast('Plan imported and applied.');
      return;
    }

    const targetPhaseId = Number(parsed.phaseId || parsed.activePhaseId || appState.activePhaseId);
    if (Array.isArray(parsed.exercises) && parsed.exercises.length > 0) {
      const targetIdx = appState.protocol.phases.findIndex((p) => p.id === targetPhaseId);
      if (targetIdx >= 0) {
        const existingPhase = appState.protocol.phases[targetIdx];
        if (parsed.title) existingPhase.title = parsed.title;
        if (parsed.timeline) existingPhase.timeline = parsed.timeline;
        if (parsed.goal) existingPhase.goal = parsed.goal;
        existingPhase.exercises = parsed.exercises.map((ex, idx) => ({
          id: ex.id || `custom_p${targetPhaseId}_${idx}`,
          name: ex.name || `Exercise ${idx + 1}`,
          equipment: Array.isArray(ex.equipment) ? ex.equipment : ['Gym Equipment'],
          sets: Number(ex.sets) || 3,
          repsOrHold: ex.repsOrHold || ex.reps || '8 reps',
          tempo: ex.tempo || '3s Eccentric / 3s Concentric',
          restSec: Number(ex.restSec) || 90,
          defaultTimerMode: ex.defaultTimerMode || 'hsr',
          defaultDurationSec: Number(ex.defaultDurationSec) || 48,
          loadGuidance: ex.loadGuidance || 'Progressive load with <= 3/10 pain',
          cues: ex.cues || 'Maintain controlled tempo.',
          svgType: ex.svgType || 'barbell_squat',
          videoId: ex.videoId || 'Y7sfQTTLOws',
          videoTitle: ex.videoTitle || ex.name || 'Demo',
          videoUrl: ex.videoUrl || `http://www.youtube.com/watch?v=${ex.videoId || 'Y7sfQTTLOws'}`
        }));

        appState.activePhaseId = targetPhaseId;
        safeSetStorage(STORAGE_KEYS.CUSTOM_PLAN, appState.protocol);
        safeSetStorage(STORAGE_KEYS.ACTIVE_PHASE, appState.activePhaseId);
        renderHeaderStatus();
        renderWorkoutView();

        if (statusEl) {
          statusEl.className = 'mt-3 p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-xs font-medium';
          statusEl.textContent = `✓ Applied adjustments to Phase ${targetPhaseId} (${existingPhase.exercises.length} exercises updated).`;
          statusEl.classList.remove('hidden');
        }
        showToast(`Phase ${targetPhaseId} plan updated.`);
        return;
      }
    }

    throw new Error('JSON must contain a "phases" array or "phaseId" with an "exercises" array.');
  } catch (err) {
    if (statusEl) {
      statusEl.className = 'mt-3 p-3 rounded-lg bg-[#e11d48]/10 border border-[#e11d48]/30 text-[#e11d48] text-xs font-medium';
      statusEl.textContent = `Invalid JSON: ${err.message}`;
      statusEl.classList.remove('hidden');
    }
    showToast('JSON validation failed.');
  }
}

function resetDefaultProtocol() {
  openConfirmModal(
    'Reset to Default Protocol?',
    'This restores all 4 phases back to the baseline clinical protocol.',
    () => {
      safeRemoveStorage(STORAGE_KEYS.CUSTOM_PLAN);
      appState.protocol = JSON.parse(JSON.stringify(DEFAULT_PROTOCOL));
      renderHeaderStatus();
      renderWorkoutView();
      const statusEl = document.getElementById('import-status-banner');
      if (statusEl) statusEl.classList.add('hidden');
      showToast('Restored default protocol.');
    }
  );
}

// Expose all handlers on window for inline onclick compatibility
Object.assign(window, {
  switchTab,
  selectPhase,
  toggleExerciseSet,
  updateExerciseLoad,
  resetTodaySets,
  toggleFormDrawer,
  loadYoutubeEmbed,
  setTimerMode,
  launchExerciseTimer,
  setTimerPreset,
  adjustTimerSeconds,
  updateHsrTargetReps,
  toggleTimerMute,
  resetTimer,
  toggleTimerStartPause,
  selectPainScore,
  handleLogDateChange,
  saveDailyLog,
  clearLogForm,
  seedSampleLogs,
  editLogEntry,
  deleteLogEntry,
  generateAiExportReport,
  copyAiExportToClipboard,
  loadSampleAiAdjustmentJson,
  importUpdatedPlanJson,
  resetDefaultProtocol,
  closeConfirmModal,
  executeConfirmModal
});

// Boot Application on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  initAppState();
  renderHeaderStatus();
  renderWorkoutView();
  renderTimerUI();
  renderPainScaleButtons();
  syncCompletedExercisesToTrackerForm();
  renderPainChart();
  renderLogHistory();
  generateAiExportReport(false);
});
