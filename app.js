/* ==========================================================================
   CrossFit Patellar Tendinitis (Jumper's Knee) Rehab Tracker — app.js
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
      shortName: 'Phase 1: Isometric Analgesia',
      title: 'Phase 1 — Isometric Loading & Pain Modulation',
      timeline: 'Weeks 1–2 (Daily or 2x/Day) & Pre-WOD Analgesic Warm-Up',
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
          cues: 'Loop a thick CrossFit monster band around the squat rack upright and behind your upper calves just below the knee joint line. Sit back against band tension so shins stay strictly vertical (90° to floor) while knees flex to 70°–90°.',
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
          videoId: 'xdKm8PSX438',
          videoTitle: 'Banded Terminal Knee Extension — E3 Rehab Exercise Library',
          videoUrl: 'http://www.youtube.com/watch?v=xdKm8PSX438'
        }
      ]
    },
    {
      id: 2,
      shortName: 'Phase 2: Heavy Slow Resistance',
      title: 'Phase 2 — Heavy Slow Resistance (HSR) & Eccentric Remodeling',
      timeline: 'Weeks 3–6 (3 Sessions/Week — Mandatory 48h Recovery Between Sessions)',
      goal: 'Stimulate collagen synthesis, fibril alignment, and mechanical tendon stiffness using the Kongsgaard 6-second tempo protocol (3s eccentric down / 3s concentric up).',
      progressionCriteria: [
        'Progress load weekly across the 12-week HSR continuum: Week 3 (4x12RM), Week 4 (4x10RM), Week 5 (4x8RM), Week 6+ (4x6RM).',
        'Strictly enforce 3 seconds down + 3 seconds up using the built-in HSR Tempo Metronome — fast reps bounce off the tendon rather than remodeling it.',
        'Pain up to 3/10 during sets is acceptable ONLY if next-morning single-leg decline squat stiffness returns to baseline within 24 hours.'
      ],
      clinicalCitation: {
        label: 'Kongsgaard et al. Heavy Slow Resistance Protocol',
        url: 'https://medstarsportphysio.ca/journal/patellar-tendinopathy-heavy-slow-resistance'
      },
      exercises: [
        {
          id: 'p2_slant_hsr_squat',
          name: 'Slant Board / Plate-Elevated HSR Tempo Squat',
          equipment: ['25° Slant Board or 5kg Change Plates Under Heels', 'Barbell or Heavy Goblet Kettlebell'],
          sets: 4,
          repsOrHold: '10 reps (6s/rep)',
          tempo: '3s Eccentric Down • 0s Pause • 3s Concentric Up',
          restSec: 120,
          defaultTimerMode: 'hsr',
          defaultDurationSec: 60,
          loadGuidance: 'RPE 7.5–8.5 (progress from 12RM down to 6RM over 4–6 weeks)',
          cues: 'Elevate heels on a 25° slant board or pair of 5kg plates. Descend for a strict 3-second count allowing knees to track cleanly over toes with an upright torso, then drive up for 3 seconds.',
          svgType: 'decline_squat',
          videoId: 'v1B7qGU461I',
          videoTitle: 'Slant Board / Elevated Heel Squats: Patella Tendon — Strength & Sport',
          videoUrl: 'http://www.youtube.com/watch?v=v1B7qGU461I'
        },
        {
          id: 'p2_barbell_hsr_squat',
          name: 'Barbell Heavy Slow Resistance Back or Front Squat',
          equipment: ['Squat Rack', 'Barbell + Bumper Plates'],
          sets: 4,
          repsOrHold: '8 reps (6s/rep)',
          tempo: '3s Eccentric Down • 0s Pause • 3s Concentric Up',
          restSec: 150,
          defaultTimerMode: 'hsr',
          defaultDurationSec: 48,
          loadGuidance: '70–85% 1RM adjusted for strict 6-second tempo; pain <= 3/10',
          cues: 'Unrack barbell in the squat rack. Use the HSR Tempo Pacer to maintain constant tension from top to parallel/just below parallel without bouncing out of the hole.',
          svgType: 'barbell_squat',
          videoId: 'Y7sfQTTLOws',
          videoTitle: 'Patellar Tendonitis Part 3: Heavy Slow Resistance Training Programme — Sports Injury Physio',
          videoUrl: 'http://www.youtube.com/watch?v=Y7sfQTTLOws'
        },
        {
          id: 'p2_bulgarian_split',
          name: 'Slow-Tempo Dumbbell / Barbell Bulgarian Split Squat',
          equipment: ['20" Plyo Box or Bench', 'Pair of Dumbbells / Kettlebells'],
          sets: 3,
          repsOrHold: '8 reps / leg',
          tempo: '3s Eccentric Down • 1s Bottom Control • 3s Concentric Up',
          restSec: 90,
          defaultTimerMode: 'hsr',
          defaultDurationSec: 48,
          loadGuidance: 'Moderate-Heavy Dumbbells; unilateral knee extensor + hip stability',
          cues: 'Place rear laces on a 20" plyo box or bench. Keep torso slightly upright to bias the lead quadriceps and patellar tendon, lowering slowly over 3 full seconds.',
          svgType: 'split_squat',
          videoId: 'uODWo4YqbT8',
          videoTitle: 'How to Bulgarian Split Squat | 3 Simple Steps — Davis Diley',
          videoUrl: 'http://www.youtube.com/watch?v=uODWo4YqbT8'
        }
      ]
    },
    {
      id: 3,
      shortName: 'Phase 3: Energy Storage & Plyos',
      title: 'Phase 3 — Energy Storage & Progressive Plyometrics',
      timeline: 'Weeks 7–9 (2–3 Sessions/Week — Minimum 48–72h Between Jump Exposures)',
      goal: 'Reintroduce rapid stretch-shortening cycle (SSC) energy storage and release while maintaining 2x/week Heavy Slow Resistance strength work.',
      progressionCriteria: [
        'Must complete Phase 2 with near-equal bilateral strength and <= 2/10 pain on single-leg decline squat before starting plyometrics.',
        'Never perform high-load energy-storage plyometrics on consecutive days (strictly follow High-Low-Medium tendon load day spacing).',
        'Keep ground contacts crisp and quiet; stop immediately if sharp localized inferior pole patellar pain > 3/10 occurs.'
      ],
      clinicalCitation: {
        label: 'Rehabilitation of Patellar Tendinopathy Stage 3 Progression (PMC7716685)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7716685/'
      },
      exercises: [
        {
          id: 'p3_snap_downs',
          name: 'Tall-to-Short Athletic Snap-Downs (2-Leg to 1-Leg)',
          equipment: ['Gym Floor', 'Optional Rig Band or Bumper Plate Target'],
          sets: 4,
          repsOrHold: '8 reps (2s freeze)',
          tempo: 'Rapid Drop From Tiploes • 2s Frozen Athletic Landing',
          restSec: 90,
          defaultTimerMode: 'rest',
          defaultDurationSec: 90,
          loadGuidance: 'Bodyweight — progress from bilateral snap-down to single-leg landing stick',
          cues: 'Rise onto toes with arms overhead, then rapidly snap arms down and drop hips into a quarter-squat athletic landing, absorbing force softly through hips, knees, and ankles.',
          svgType: 'plyo_jump',
          videoId: 'bbvKE-3Iiys',
          videoTitle: 'Snap Down Progressions — Rehab 2 Perform',
          videoUrl: 'http://www.youtube.com/watch?v=bbvKE-3Iiys'
        },
        {
          id: 'p3_pogo_hops',
          name: 'Stiff-Ankle / Low-Knee-Flexion Pogo Jumps',
          equipment: ['Gym Floor', 'Optional Overhead Rig Monster Band (Assisted Pogo)'],
          sets: 4,
          repsOrHold: '20 contacts',
          tempo: 'Elastic Rebound (<0.25s ground contact)',
          restSec: 90,
          defaultTimerMode: 'rest',
          defaultDurationSec: 90,
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
      shortName: 'Phase 4: Return to CrossFit WODs',
      title: 'Phase 4 — Return to CrossFit & High-Load WOD Integration',
      timeline: 'Weeks 10–12+ (High / Low / Medium Tendon Load Day Cycling)',
      goal: 'Gradually reintegrate metabolic fatigue + ballistic CrossFit movements (wall balls, double-unders, barbell cycling, box jumps) while preserving tendon capacity.',
      progressionCriteria: [
        'Structure training week into High-Load Days (WODs with jumping/squatting, max 2–3x/week), Medium-Load Days (HSR lifting, rowing, gymnastics), and Low-Load Days (isometrics, swimming/biking).',
        'Perform 3 x 45s Spanish Squat holds in your pre-WOD warm-up for immediate tendon analgesia and motor recruitment.',
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

// Baseline 7-Day Sample Rehab Logs so the chart & AI export work out of the box
const INITIAL_SAMPLE_LOGS = [
  {
    date: '2026-11-05',
    phase: 1,
    painPre: 4,
    painPost: 2,
    pain24h: 3,
    painDecline: 4,
    exercises: 'Rig Spanish Squat (5x45s @ BW), Single-Leg 25° Decline Hold (5x45s @ BW), Banded TKE (4x15)',
    notes: 'Spanish squats gave immediate analgesic relief before BikeErg flush. Next-morning stiffness stayed at 3/10.'
  },
  {
    date: '2026-11-06',
    phase: 1,
    painPre: 3,
    painPost: 2,
    pain24h: 2,
    painDecline: 3,
    exercises: 'Rig Spanish Squat (5x45s @ +12kg KB), Concept2 Rower 20m damper 3, Banded TKE (4x15)',
    notes: 'Subbed rowing for running in CrossFit metcon. Knee felt warm and stable.'
  },
  {
    date: '2026-11-07',
    phase: 2,
    painPre: 2,
    painPost: 3,
    pain24h: 2,
    painDecline: 2,
    exercises: 'Slant Board HSR Squat (4x10 @ 50kg, 3s/3s), Barbell HSR Back Squat (4x8 @ 70kg), Bulgarian Split Squat (3x8 @ 16kg DBs)',
    notes: 'First Phase 2 Heavy Slow Resistance session using 6-second tempo metronome. Good quad burn, tendon pain 2/10.'
  },
  {
    date: '2026-11-08',
    phase: 2,
    painPre: 2,
    painPost: 1,
    pain24h: 2,
    painDecline: 2,
    exercises: 'Active Recovery Day: Rig Spanish Squat Primer (3x45s), Banded TKE (3x15)',
    notes: 'Mandatory 48h recovery window between HSR sessions. Morning single-leg decline squat test was 2/10.'
  },
  {
    date: '2026-11-09',
    phase: 2,
    painPre: 2,
    painPost: 3,
    pain24h: 3,
    painDecline: 2,
    exercises: 'Slant Board HSR Squat (4x10 @ 55kg, 3s/3s), Barbell HSR Back Squat (4x8 @ 75kg), Bulgarian Split Squat (3x8 @ 18kg DBs)',
    notes: 'Added +5kg to barbell HSR squats. Kept strict 3s eccentric / 3s concentric cadence.'
  },
  {
    date: '2026-11-10',
    phase: 2,
    painPre: 2,
    painPost: 1,
    pain24h: 1,
    painDecline: 2,
    exercises: 'Pre-WOD Spanish Squat (3x45s @ +16kg KB), Upper Body Gymnastics & SkiErg WOD',
    notes: 'Tendon settled down to 1/10 at 24 hours post-HSR session.'
  },
  {
    date: '2026-11-11',
    phase: 2,
    painPre: 1,
    painPost: 2,
    pain24h: 1,
    painDecline: 1,
    exercises: 'Slant Board HSR Squat (4x8 @ 60kg, 3s/3s), Barbell HSR Back Squat (4x8 @ 80kg), Bulgarian Split Squat (3x8 @ 20kg DBs)',
    notes: 'Strongest session yet. Ready for AI review to progress load toward 6RM or introduce Phase 3 Snap-Downs next week.'
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
    // Ignore storage removal errors in restricted iframes
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
    hsrSubPhase: 'ECCENTRIC DOWN', // 'ECCENTRIC DOWN' | 'CONCENTRIC UP'
    hsrSubSec: 3,
    intervalId: null
  },
  chartInstance: null,
  confirmAction: null
};

// Web Audio API Synthesized Gym Buzzer
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
    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + durationMs / 1000);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + durationMs / 1000);
  } catch (e) {
    // Web Audio fallback silent
  }
}

// Toast Notification Helper
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
  }, 3200);
}

// Custom In-Page Confirmation Modal
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

// SVG Biomechanical Form Guide Generator
function getExerciseSvgMarkup(svgType) {
  if (svgType === 'spanish_squat') {
    return `
      <svg viewBox="0 0 280 150" class="w-full h-36 bg-slate-950/80 rounded-xl border border-slate-800 p-2">
        <!-- Squat Rack Upright -->
        <rect x="36" y="12" width="12" height="126" rx="2" fill="#475569" />
        <line x1="20" y1="138" x2="260" y2="138" stroke="#334155" stroke-width="4" />
        <!-- Monster Band Anchor -->
        <line x1="48" y1="88" x2="148" y2="88" stroke="#a3e635" stroke-width="5" stroke-dasharray="6,3" />
        <text x="56" y="80" fill="#a3e635" font-size="10" font-weight="bold">Monster Band Tension</text>
        <!-- Athlete Figure (Vertical Tibia + 80° Knee Flexion) -->
        <g class="svg-anim-iso">
          <circle cx="176" cy="34" r="11" fill="#38bdf8" />
          <!-- Upright Torso -->
          <line x1="176" y1="45" x2="188" y2="86" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
          <!-- Arms Counterbalance -->
          <line x1="178" y1="54" x2="142" y2="62" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
          <!-- Horizontal Femur -->
          <line x1="188" y1="86" x2="148" y2="88" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
          <!-- Knee Joint Callout -->
          <circle cx="148" cy="88" r="5" fill="#a3e635" />
        </g>
        <!-- Strictly Vertical Tibia -->
        <line x1="148" y1="88" x2="148" y2="136" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
        <text x="158" y="122" fill="#cbd5e1" font-size="10">Vertical Tibia (90°)</text>
        <text x="165" y="22" fill="#38bdf8" font-size="10" font-weight="bold">45s Isometric Hold</text>
      </svg>`;
  }
  if (svgType === 'decline_squat') {
    return `
      <svg viewBox="0 0 280 150" class="w-full h-36 bg-slate-950/80 rounded-xl border border-slate-800 p-2">
        <line x1="20" y1="138" x2="260" y2="138" stroke="#334155" stroke-width="4" />
        <!-- 25-Degree Slant Board / Bumper Wedge -->
        <polygon points="105,138 175,138 175,114" fill="#f59e0b" opacity="0.85" />
        <text x="182" y="132" fill="#fbbf24" font-size="10" font-weight="bold">25° Slant / Plate</text>
        <g class="svg-anim-hsr">
          <circle cx="142" cy="30" r="11" fill="#38bdf8" />
          <line x1="142" y1="41" x2="150" y2="82" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
          <line x1="150" y1="82" x2="122" y2="98" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
          <circle cx="122" cy="98" r="5" fill="#a3e635" />
        </g>
        <line x1="122" y1="98" x2="152" y2="124" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
        <text x="28" y="28" fill="#a3e635" font-size="10" font-weight="bold">3s Down • 3s Up HSR</text>
        <text x="28" y="44" fill="#cbd5e1" font-size="10">Targets Patellar Tendon</text>
      </svg>`;
  }
  if (svgType === 'banded_tke') {
    return `
      <svg viewBox="0 0 280 150" class="w-full h-36 bg-slate-950/80 rounded-xl border border-slate-800 p-2">
        <rect x="40" y="14" width="12" height="124" rx="2" fill="#475569" />
        <line x1="20" y1="138" x2="260" y2="138" stroke="#334155" stroke-width="4" />
        <line x1="52" y1="92" x2="148" y2="92" stroke="#38bdf8" stroke-width="4" stroke-dasharray="5,3" />
        <circle cx="152" cy="28" r="11" fill="#a3e635" />
        <line x1="152" y1="39" x2="152" y2="80" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
        <line x1="152" y1="80" x2="148" y2="136" stroke="#a3e635" stroke-width="6" stroke-linecap="round" />
        <circle cx="150" cy="92" r="5" fill="#38bdf8" />
        <text x="64" y="82" fill="#38bdf8" font-size="10" font-weight="bold">Band Pull</text>
        <text x="166" y="96" fill="#a3e635" font-size="10" font-weight="bold">3s VMO Lockout</text>
      </svg>`;
  }
  if (svgType === 'split_squat') {
    return `
      <svg viewBox="0 0 280 150" class="w-full h-36 bg-slate-950/80 rounded-xl border border-slate-800 p-2">
        <line x1="20" y1="138" x2="260" y2="138" stroke="#334155" stroke-width="4" />
        <!-- 20" Plyo Box -->
        <rect x="195" y="96" width="46" height="42" rx="4" fill="#475569" />
        <text x="202" y="120" fill="#f8fafc" font-size="9" font-weight="bold">20" BOX</text>
        <g class="svg-anim-hsr">
          <circle cx="136" cy="30" r="10" fill="#38bdf8" />
          <line x1="136" y1="40" x2="142" y2="80" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
          <!-- Front Thigh -->
          <line x1="142" y1="80" x2="106" y2="92" stroke="#a3e635" stroke-width="6" stroke-linecap="round" />
          <!-- Rear Leg on Box -->
          <line x1="142" y1="80" x2="168" y2="112" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
          <line x1="168" y1="112" x2="205" y2="98" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" />
          <circle cx="106" cy="92" r="5" fill="#38bdf8" />
        </g>
        <line x1="106" y1="92" x2="106" y2="136" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
        <text x="24" y="28" fill="#a3e635" font-size="10" font-weight="bold">Unilateral HSR (3s/3s)</text>
      </svg>`;
  }
  if (svgType === 'plyo_jump') {
    return `
      <svg viewBox="0 0 280 150" class="w-full h-36 bg-slate-950/80 rounded-xl border border-slate-800 p-2">
        <line x1="20" y1="138" x2="260" y2="138" stroke="#334155" stroke-width="4" />
        <rect x="186" y="88" width="58" height="50" rx="4" fill="#334155" stroke="#a3e635" stroke-width="2" />
        <text x="194" y="116" fill="#a3e635" font-size="9" font-weight="bold">PLYO BOX</text>
        <g class="svg-anim-plyo">
          <circle cx="114" cy="36" r="10" fill="#a3e635" />
          <line x1="114" y1="46" x2="122" y2="82" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
          <line x1="122" y1="82" x2="104" y2="104" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
          <line x1="104" y1="104" x2="116" y2="132" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
        </g>
        <path d="M 134 70 Q 168 30 206 78" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="4,4" />
        <text x="24" y="26" fill="#38bdf8" font-size="10" font-weight="bold">Energy Storage & Stick</text>
        <text x="24" y="42" fill="#cbd5e1" font-size="10">Step Down Each Rep</text>
      </svg>`;
  }
  // Default barbell_squat
  return `
    <svg viewBox="0 0 280 150" class="w-full h-36 bg-slate-950/80 rounded-xl border border-slate-800 p-2">
      <line x1="20" y1="138" x2="260" y2="138" stroke="#334155" stroke-width="4" />
      <g class="svg-anim-hsr">
        <circle cx="145" cy="32" r="10" fill="#38bdf8" />
        <!-- Barbell Plate & Bar -->
        <circle cx="148" cy="48" r="12" fill="#a3e635" opacity="0.85" />
        <line x1="145" y1="42" x2="155" y2="84" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
        <line x1="155" y1="84" x2="120" y2="92" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" />
        <circle cx="120" cy="92" r="5" fill="#a3e635" />
      </g>
      <line x1="120" y1="92" x2="134" y2="136" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" />
      <text x="24" y="28" fill="#a3e635" font-size="10" font-weight="bold">Heavy Slow Resistance</text>
      <text x="24" y="44" fill="#cbd5e1" font-size="10">3s Eccentric • 3s Concentric</text>
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

  // Ensure today's date has pre-checked sets for preview richness if empty
  const todayKey = appState.formState.date;
  if (!appState.setProgress[todayKey]) {
    appState.setProgress[todayKey] = {
      p2_slant_hsr_squat: { sets: [true, true, false, false], load: '60kg (Slant Board)' },
      p2_barbell_hsr_squat: { sets: [false, false, false, false], load: '80kg Barbell' },
      p2_bulgarian_split: { sets: [false, false, false], load: '2x20kg DBs' }
    };
    safeSetStorage(STORAGE_KEYS.SET_PROGRESS, appState.setProgress);
  }
}

// Switch Main Navigation Tab
function switchTab(tabName) {
  appState.activeTab = tabName;
  const tabs = ['workout', 'timer', 'tracker', 'ai', 'github'];
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
  } else if (tabName === 'github') {
    renderGithubCodePreview();
  }
}

// Select Active Rehab Phase
function selectPhase(phaseId) {
  appState.activePhaseId = Number(phaseId);
  safeSetStorage(STORAGE_KEYS.ACTIVE_PHASE, appState.activePhaseId);
  renderHeaderStatus();
  renderWorkoutView();
}

// Render Top Header Readiness & Phase Status
function renderHeaderStatus() {
  const phase = appState.protocol.phases.find((p) => p.id === appState.activePhaseId) || appState.protocol.phases[0];
  const badge = document.getElementById('header-phase-badge');
  if (badge && phase) {
    badge.textContent = phase.shortName;
  }

  const pill = document.getElementById('header-readiness-pill');
  if (!pill) return;

  const sortedLogs = [...appState.logs].sort((a, b) => b.date.localeCompare(a.date));
  const latest = sortedLogs[0];
  if (!latest) {
    pill.textContent = 'No Check-In Yet • Log Pain Scores';
    pill.className = 'px-3 py-1 rounded-full text-xs font-bold border border-slate-700 bg-slate-800 text-slate-300';
    return;
  }

  const p24 = Number(latest.pain24h);
  if (p24 <= 3) {
    pill.textContent = `24h Pain: ${p24}/10 • Green: Load Approved`;
    pill.className = 'px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/50 bg-emerald-500/15 text-emerald-300';
  } else if (p24 <= 5) {
    pill.textContent = `24h Pain: ${p24}/10 • Amber: Hold Load / -20% Vol`;
    pill.className = 'px-3 py-1 rounded-full text-xs font-bold border border-amber-500/50 bg-amber-500/15 text-amber-300';
  } else {
    pill.textContent = `24h Pain: ${p24}/10 • Red: Regress to Phase 1 Iso`;
    pill.className = 'px-3 py-1 rounded-full text-xs font-bold border border-rose-500/50 bg-rose-500/15 text-rose-300';
  }
}

// Render Workout View (Phases, Banner, and Exercise Cards)
function renderWorkoutView() {
  const phaseGrid = document.getElementById('phase-selector-grid');
  const activePhase = appState.protocol.phases.find((p) => p.id === appState.activePhaseId) || appState.protocol.phases[0];

  if (phaseGrid) {
    phaseGrid.innerHTML = appState.protocol.phases.map((p) => {
      const isActive = p.id === activePhase.id;
      return `
        <button type="button" onclick="selectPhase(${p.id})" class="phase-pill tap-target ${isActive ? 'active' : ''}">
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold uppercase tracking-wider ${isActive ? 'text-lime-400' : 'text-slate-400'}">Phase ${p.id}</span>
            ${isActive ? '<span class="text-[11px] font-bold px-2 py-0.5 rounded bg-lime-400/20 text-lime-300">ACTIVE</span>' : ''}
          </div>
          <div class="text-sm font-bold text-slate-100 mt-0.5">${p.shortName.replace(/^Phase \d:\s*/, '')}</div>
        </button>
      `;
    }).join('');
  }

  const titleEl = document.getElementById('phase-banner-title');
  const subEl = document.getElementById('phase-banner-subtitle');
  const goalEl = document.getElementById('phase-banner-goal');
  const rulesEl = document.getElementById('phase-progression-rules');

  if (titleEl) titleEl.textContent = activePhase.title;
  if (subEl) subEl.textContent = activePhase.timeline;
  if (goalEl) {
    const cit = activePhase.clinicalCitation;
    goalEl.innerHTML = `${activePhase.goal} ${cit ? `<a href="${cit.url}" target="_blank" rel="noopener noreferrer" class="text-sky-400 underline hover:text-sky-300 ml-1">(${cit.label} ↗)</a>` : ''}`;
  }
  if (rulesEl) {
    rulesEl.innerHTML = activePhase.progressionCriteria.map((rule) => `
      <li class="flex items-start gap-2 text-xs text-slate-300">
        <span class="text-lime-400 font-bold mt-0.5">✓</span>
        <span>${rule}</span>
      </li>
    `).join('');
  }

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
  if (textEl) textEl.textContent = `${completedSets} / ${totalSets} Sets Completed (${pct}%)`;

  const cardsContainer = document.getElementById('exercise-cards-container');
  if (!cardsContainer) return;

  cardsContainer.innerHTML = activePhase.exercises.map((ex, idx) => {
    const numSets = Number(ex.sets) || 3;
    const exState = (dayRecord[ex.id]) || { sets: Array(numSets).fill(false), load: '' };
    const isDrawerOpen = Boolean(appState.openVideoDraws[ex.id]);
    const isEmbedLoaded = Boolean(appState.loadedYoutubeEmbeds[ex.id]);

    const setButtonsHtml = Array.from({ length: numSets }, (_, sIdx) => {
      const done = Boolean(exState.sets && exState.sets[sIdx]);
      return `
        <button type="button" onclick="toggleExerciseSet('${ex.id}', ${sIdx}, ${numSets}, ${ex.restSec})" class="set-btn tap-target ${done ? 'completed' : ''}">
          <span class="text-xs uppercase opacity-80">Set ${sIdx + 1}</span>
          <span class="text-sm font-extrabold">${done ? '✓ DONE' : 'TAP'}</span>
        </button>
      `;
    }).join('');

    const equipBadges = (ex.equipment || []).map((eq) => `
      <span class="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-semibold text-sky-300">${eq}</span>
    `).join('');

    return `
      <article class="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-lime-400/15 text-lime-400 text-xs font-extrabold">EX ${idx + 1}</span>
              <h3 class="text-base sm:text-lg font-extrabold text-white">${ex.name}</h3>
            </div>
            <div class="flex flex-wrap gap-1.5 mt-2">
              ${equipBadges}
            </div>
          </div>
          <div class="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 mt-2 sm:mt-0">
            <span class="px-3 py-1 rounded-lg bg-lime-400/15 border border-lime-400/40 text-lime-300 text-xs font-extrabold">
              ${ex.sets} Sets × ${ex.repsOrHold}
            </span>
            <span class="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold">
              Rest: ${ex.restSec}s
            </span>
          </div>
        </div>

        <!-- Tempo & Load Prescription Bar -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/90">
          <div>
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Prescribed Tempo</div>
            <div class="text-xs sm:text-sm font-bold text-amber-300 mt-0.5">⏱ ${ex.tempo}</div>
          </div>
          <div>
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Target Load / Intensity</div>
            <div class="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">${ex.loadGuidance}</div>
          </div>
        </div>

        <p class="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
          <strong class="text-slate-100">Gym Setup & Cues:</strong> ${ex.cues}
        </p>

        <!-- Sweaty-Hands Set Tracker Grid -->
        <div class="mt-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Tap Set When Completed (Auto-Queues Timer)</span>
            <input
              type="text"
              placeholder="Load used (e.g. 60kg / Heavy Band)"
              value="${(exState.load || '').replace(/"/g, '&quot;')}"
              onchange="updateExerciseLoad('${ex.id}', this.value, ${numSets})"
              class="w-48 sm:w-56 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-400"
            />
          </div>
          <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
            ${setButtonsHtml}
          </div>
        </div>

        <!-- Action Bar: Launch Timer & Toggle Video/SVG Form Guide -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80">
          <button
            type="button"
            onclick="launchExerciseTimer('${ex.id}', '${ex.defaultTimerMode || 'rest'}', ${ex.defaultDurationSec || 45}, '${ex.name.replace(/'/g, "\\'")}')"
            class="tap-target px-3 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5"
          >
            <span>⏱ Start ${ex.defaultTimerMode === 'iso' ? `${ex.defaultDurationSec}s Iso Hold` : ex.defaultTimerMode === 'hsr' ? '3s/3s HSR Pacer' : `${ex.restSec}s Rest`}</span>
          </button>

          <button
            type="button"
            onclick="launchExerciseTimer('${ex.id}', 'rest', ${ex.restSec || 90}, '${ex.name.replace(/'/g, "\\'")} — Rest')"
            class="tap-target px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5"
          >
            <span>⏳ Start ${ex.restSec}s Rest Timer</span>
          </button>

          <button
            type="button"
            onclick="toggleFormDrawer('${ex.id}')"
            class="tap-target px-3 py-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/40 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5"
          >
            <span>🎥 ${isDrawerOpen ? 'Hide Form & Video Guide' : 'Form Guide & YouTube Demo'}</span>
          </button>
        </div>

        <!-- Collapsible SVG + YouTube Video Demonstration Drawer -->
        <div class="${isDrawerOpen ? 'block' : 'hidden'} mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xs font-extrabold uppercase tracking-wider text-lime-400">Animated SVG Biomechanical Guide (Offline Ready)</span>
              </div>
              ${getExerciseSvgMarkup(ex.svgType)}
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xs font-extrabold uppercase tracking-wider text-sky-400">YouTube Instructional Demonstration</span>
                <a href="${ex.videoUrl}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-lime-400 underline hover:text-lime-300">
                  Open on YouTube ↗
                </a>
              </div>
              ${isEmbedLoaded ? `
                <div class="relative w-full h-40 rounded-xl overflow-hidden border border-slate-800 bg-black">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/${ex.videoId}?rel=0"
                    title="${ex.videoTitle.replace(/"/g, '&quot;')}"
                    class="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              ` : `
                <div class="w-full h-36 rounded-xl bg-slate-900 border border-slate-800 p-3 flex flex-col items-center justify-center text-center">
                  <p class="text-xs font-bold text-slate-200 mb-1">${ex.videoTitle}</p>
                  <p class="text-[11px] text-slate-400 mb-2.5">Load embedded player below or open directly in the YouTube app.</p>
                  <div class="flex flex-wrap justify-center gap-2">
                    <button
                      type="button"
                      onclick="loadYoutubeEmbed('${ex.id}')"
                      class="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold"
                    >
                      ▶ Load Embedded Video
                    </button>
                    <a
                      href="${ex.videoUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-xs font-bold"
                    >
                      Watch on YouTube ↗
                    </a>
                  </div>
                </div>
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
    configureTimer('rest', restSec || 90, `Set ${setIndex + 1} Complete — Rest ${restSec || 90}s`, false);
    showToast(`Set ${setIndex + 1} logged! ${restSec || 90}s rest queued in timer bar.`);
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
  showToast('Exercise load saved for today.');
}

// Reset Today's Checked Sets
function resetTodaySets() {
  openConfirmModal(
    'Reset Today\'s Checked Sets?',
    'This clears the green checkmarks on today\'s workout sets so you can start a fresh session.',
    () => {
      const todayKey = appState.formState.date;
      appState.setProgress[todayKey] = {};
      safeSetStorage(STORAGE_KEYS.SET_PROGRESS, appState.setProgress);
      renderWorkoutView();
      showToast('Today\'s set checkmarks cleared.');
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
    configureTimer('iso', 45, 'Isometric Hold (45s + 5s Prep)', false);
  } else if (mode === 'rest') {
    configureTimer('rest', 90, 'Rest Between Sets (90s)', false);
  } else if (mode === 'hsr') {
    const repsInput = document.getElementById('hsr-target-reps-input');
    const reps = repsInput ? Math.max(1, Math.min(25, Number(repsInput.value) || 8)) : 8;
    appState.timer.hsrTargetReps = reps;
    configureTimer('hsr', reps * 6, `HSR Tempo Metronome (${reps} Reps × 3s Down / 3s Up)`, false);
  }
}

function configureTimer(mode, durationSec, label, autoStart = false) {
  stopTimerInterval();
  appState.timer.mode = mode;
  appState.timer.durationSec = Math.max(5, Number(durationSec) || 45);
  appState.timer.remainingSec = appState.timer.durationSec;
  appState.timer.prepRemaining = mode === 'iso' ? 5 : 0;
  appState.timer.contextLabel = label || 'Gym Rehab Timer';
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
  configureTimer(mode, seconds, `${mode === 'iso' ? 'Isometric Hold' : 'Rest Timer'} (${seconds}s)`, false);
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
    configureTimer('hsr', reps * 6, `HSR Tempo Metronome (${reps} Reps × 3s Down / 3s Up)`, false);
  }
}

function toggleTimerMute() {
  appState.timer.muted = !appState.timer.muted;
  renderTimerUI();
  showToast(appState.timer.muted ? 'Timer audio muted' : 'Timer audio unmuted');
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

  // If already at 0, reset first
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

  // Handle 5-second prep countdown for isometric holds
  if (t.prepRemaining > 0) {
    t.prepRemaining -= 1;
    if (t.prepRemaining > 0) {
      playGymBeep(440, 90, 'sine');
    } else {
      playGymBeep(880, 260, 'triangle'); // Hold starts now!
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
        playGymBeep(740, 140, 'triangle'); // Bottom turnaround cue
      } else {
        if (t.hsrCurrentRep >= t.hsrTargetReps || t.remainingSec <= 0) {
          t.remainingSec = 0;
          stopTimerInterval();
          playGymBeep(988, 380, 'square');
          showToast('HSR Tempo Set Complete! Great tendon loading.');
          renderTimerUI();
          return;
        }
        t.hsrCurrentRep += 1;
        t.hsrSubPhase = 'ECCENTRIC DOWN';
        t.hsrSubSec = 3;
        playGymBeep(587, 140, 'sine'); // Top of rep cue
      }
    } else {
      playGymBeep(380, 60, 'sine');
    }

    renderTimerUI();
    return;
  }

  // Standard Isometric or Rest Countdown
  t.remainingSec = Math.max(0, t.remainingSec - 1);
  if (t.remainingSec <= 3 && t.remainingSec > 0) {
    playGymBeep(520, 100, 'sine');
  } else if (t.remainingSec === 0) {
    stopTimerInterval();
    playGymBeep(988, 400, 'square');
    showToast(`${t.contextLabel} finished!`);
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
        btn.className = 'tap-target rounded-xl font-extrabold text-xs sm:text-sm bg-lime-400 text-slate-950 shadow';
      } else {
        btn.className = 'tap-target rounded-xl font-bold text-xs sm:text-sm bg-slate-800 text-slate-300 border border-slate-700';
      }
    }
  });

  const audioBtn = document.getElementById('timer-audio-toggle');
  if (audioBtn) {
    audioBtn.textContent = t.muted ? '🔇 Buzzer Muted' : '🔊 Buzzer Active';
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
      badgeEl.textContent = '✓ COMPLETE';
      badgeEl.className = 'px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
    } else if (t.prepRemaining > 0 && t.running) {
      badgeEl.textContent = `GET IN RIG POSITION (${t.prepRemaining}s)`;
      badgeEl.className = 'px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40';
    } else if (t.mode === 'hsr') {
      const isDown = t.hsrSubPhase === 'ECCENTRIC DOWN';
      badgeEl.textContent = `${t.hsrSubPhase} (${t.hsrSubSec}s)`;
      badgeEl.className = isDown
        ? 'px-3 py-1 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-500/40'
        : 'px-3 py-1 rounded-full text-xs font-extrabold bg-lime-400/20 text-lime-300 border border-lime-400/40';
    } else if (t.mode === 'iso') {
      badgeEl.textContent = t.running ? 'HOLDING ISOMETRIC TENSION' : 'READY FOR 45s HOLD';
      badgeEl.className = 'px-3 py-1 rounded-full text-xs font-extrabold bg-lime-400/20 text-lime-300 border border-lime-400/40';
    } else {
      badgeEl.textContent = t.running ? 'RESTING BETWEEN SETS' : 'REST INTERVAL READY';
      badgeEl.className = 'px-3 py-1 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-300 border border-sky-500/40';
    }
  }

  if (repEl) {
    if (t.mode === 'hsr') {
      repEl.textContent = `Rep ${t.hsrCurrentRep} of ${t.hsrTargetReps} • Total Remaining: ${formatClock(t.remainingSec)}`;
      repEl.classList.remove('hidden');
    } else {
      repEl.classList.add('hidden');
    }
  }

  // Radial SVG Progress (circumference = 2 * pi * 96 ≈ 603.18)
  if (ringEl) {
    const circumference = 603.18;
    const frac = t.durationSec > 0 ? Math.max(0, Math.min(1, t.remainingSec / t.durationSec)) : 0;
    const offset = circumference * (1 - frac);
    ringEl.style.strokeDashoffset = String(offset);
    ringEl.style.stroke = t.mode === 'rest' ? '#38bdf8' : '#a3e635';
  }

  const startBtn = document.getElementById('btn-timer-start');
  if (startBtn) {
    startBtn.textContent = t.running ? '⏸ PAUSE TIMER' : '▶ START TIMER';
  }

  // Update persistent floating bar
  const floatBar = document.getElementById('floating-timer-bar');
  const floatLabel = document.getElementById('floating-timer-label');
  const floatClock = document.getElementById('floating-timer-clock');
  const floatToggle = document.getElementById('btn-floating-toggle');

  if (floatBar && floatLabel && floatClock && floatToggle) {
    floatLabel.textContent = t.prepRemaining > 0 && t.running
      ? `PREP: ${t.contextLabel}`
      : t.mode === 'hsr' && t.running
        ? `${t.hsrSubPhase} (Rep ${t.hsrCurrentRep}/${t.hsrTargetReps})`
        : t.contextLabel;
    floatClock.textContent = t.prepRemaining > 0 && t.running
      ? `00:0${t.prepRemaining}`
      : formatClock(t.remainingSec);
    floatToggle.textContent = t.running ? '⏸ Pause' : '▶ Start';
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
    box.className = 'p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm';
    box.innerHTML = `
      <div class="font-extrabold text-emerald-300 mb-1">🟢 GREEN LIGHT — Load Tolerance Approved (24h Pain: ${p24}/10, Decline Squat: ${pDec}/10)</div>
      <p>Your tendon response is within the <a href="https://medstarsportphysio.ca/journal/patellar-tendinopathy-heavy-slow-resistance" target="_blank" rel="noopener noreferrer" class="underline font-bold">Silbernagel <= 3/10 acceptable threshold ↗</a>. Maintain or progress your prescribed HSR barbell/kettlebell load by 2.5–5kg on your next session (after 48h rest).</p>
    `;
  } else if (worst <= 5) {
    box.className = 'p-4 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-200 text-xs sm:text-sm';
    box.innerHTML = `
      <div class="font-extrabold text-amber-300 mb-1">🟡 AMBER CAUTION — Tendon Overload Warning (24h Pain: ${p24}/10, Decline Squat: ${pDec}/10)</div>
      <p>Your 24-hour tendon irritability exceeded 3/10. Do NOT increase weight on your next session: reduce working sets by 1–2 sets, strip jumping/plyometrics from CrossFit WODs for 48 hours, and use Phase 1 Spanish Squats (5 × 45s) for analgesia.</p>
    `;
  } else {
    box.className = 'p-4 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs sm:text-sm';
    box.innerHTML = `
      <div class="font-extrabold text-rose-300 mb-1">🔴 RED FLARE-UP — Regress to Phase 1 Analgesic Isometrics (24h Pain: ${p24}/10, Decline Squat: ${pDec}/10)</div>
      <p>Significant reactive tendon flare detected. Pause Phase 2–4 heavy compressive and plyometric loading for 48–72 hours. Perform only Phase 1 Rig Spanish Squat isometric holds (5 × 45s at 70°–90° flexion) until morning decline squat pain settles back to <= 3/10.</p>
    `;
  }
}

function syncCompletedExercisesToTrackerForm() {
  const dateInput = document.getElementById('log-date-input');
  const selectedDate = dateInput ? dateInput.value : appState.formState.date;
  appState.formState.date = selectedDate;

  const exInput = document.getElementById('log-exercises-summary');
  if (!exInput) return;

  // Check if there is an existing log for this date
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
    : 'Phase ' + phaseVal + ' Prescribed Rehab Session';
  const notesVal = notesEl ? notesEl.value.trim() : '';

  const entry = {
    date: dateVal,
    phase: phaseVal,
    painPre: Number(appState.formState.painPre),
    painPost: Number(appState.formState.painPost),
    pain24h: Number(appState.formState.pain24h),
    painDecline: Number(appState.formState.painDecline),
    exercises: exercisesVal,
    notes: notesVal || 'Completed prescribed sets within acceptable <= 3/10 tendon response.'
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
  showToast(`Saved daily rehab check-in for ${dateVal}`);
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
  showToast('Check-in form reset.');
}

function seedSampleLogs() {
  appState.logs = JSON.parse(JSON.stringify(INITIAL_SAMPLE_LOGS));
  safeSetStorage(STORAGE_KEYS.LOGS, appState.logs);
  renderHeaderStatus();
  renderPainChart();
  renderLogHistory();
  showToast('Restored 7-day sample rehab progression logs.');
}

function editLogEntry(dateStr) {
  const dateEl = document.getElementById('log-date-input');
  if (dateEl) dateEl.value = dateStr;
  handleLogDateChange(dateStr);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast(`Loaded ${dateStr} into form for editing.`);
}

function deleteLogEntry(dateStr) {
  openConfirmModal(
    `Delete Check-In for ${dateStr}?`,
    `This will permanently remove the pain scores and notes recorded for ${dateStr} from browser storage.`,
    () => {
      appState.logs = appState.logs.filter((l) => l.date !== dateStr);
      safeSetStorage(STORAGE_KEYS.LOGS, appState.logs);
      renderHeaderStatus();
      renderPainChart();
      renderLogHistory();
      showToast(`Deleted check-in for ${dateStr}.`);
    }
  );
}

// Render Summary KPIs & Chart.js Pain Trend Graph
function renderPainChart() {
  const sorted = [...appState.logs].sort((a, b) => a.date.localeCompare(b.date));
  const recent7 = sorted.slice(-7);

  // Update KPI Cards
  const avg24El = document.getElementById('kpi-avg-24h');
  const avgPreEl = document.getElementById('kpi-avg-pre');
  const countEl = document.getElementById('kpi-sessions-count');
  const flareEl = document.getElementById('kpi-flare-count');

  if (recent7.length > 0) {
    const avg24 = (recent7.reduce((acc, r) => acc + Number(r.pain24h || 0), 0) / recent7.length).toFixed(1);
    const avgPre = (recent7.reduce((acc, r) => acc + Number(r.painPre || 0), 0) / recent7.length).toFixed(1);
    const flares = recent7.filter((r) => Number(r.pain24h) > 3).length;

    if (avg24El) avg24El.textContent = `${avg24} / 10`;
    if (avgPreEl) avgPreEl.textContent = `${avgPre} / 10`;
    if (countEl) countEl.textContent = `${recent7.length} days`;
    if (flareEl) flareEl.textContent = `${flares}`;
  } else {
    if (avg24El) avg24El.textContent = '0.0 / 10';
    if (avgPreEl) avgPreEl.textContent = '0.0 / 10';
    if (countEl) countEl.textContent = '0 days';
    if (flareEl) flareEl.textContent = '0';
  }

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
          label: '24h Next-Day Pain (Primary Clinical Signal)',
          data: next24Series,
          borderColor: '#a3e635',
          backgroundColor: 'rgba(163, 230, 53, 0.15)',
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: '#a3e635',
          tension: 0.25,
          fill: true
        },
        {
          label: 'Pre-Workout Pain',
          data: preSeries,
          borderColor: '#38bdf8',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: '#38bdf8',
          tension: 0.25
        },
        {
          label: 'Post-Workout Pain (Analgesic Effect)',
          data: postSeries,
          borderColor: '#c084fc',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [4, 4],
          pointRadius: 4,
          pointBackgroundColor: '#c084fc',
          tension: 0.25
        },
        {
          label: 'Silbernagel Safe Load Ceiling (3/10)',
          data: thresholdSeries,
          borderColor: 'rgba(245, 158, 11, 0.75)',
          borderWidth: 1.5,
          borderDash: [6, 4],
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
            color: '#cbd5e1',
            font: { size: 11, weight: '600' },
            boxWidth: 14
          }
        },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#f8fafc',
          bodyColor: '#e2e8f0',
          borderColor: '#334155',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 1,
            color: '#94a3b8'
          },
          grid: {
            color: 'rgba(51, 65, 85, 0.45)'
          },
          title: {
            display: true,
            text: 'Pain Score (0–10 NRS)',
            color: '#94a3b8',
            font: { size: 11, weight: 'bold' }
          }
        },
        x: {
          ticks: {
            color: '#94a3b8'
          },
          grid: {
            color: 'rgba(51, 65, 85, 0.25)'
          }
        }
      }
    }
  });
}

// Render Saved Daily Log Cards
function renderLogHistory() {
  const container = document.getElementById('log-history-container');
  if (!container) return;

  const sorted = [...appState.logs].sort((a, b) => b.date.localeCompare(a.date));
  if (sorted.length === 0) {
    container.innerHTML = `<div class="p-6 text-center text-slate-400 text-sm bg-slate-900 rounded-xl border border-slate-800">No daily check-ins logged yet. Use the form above to record your first session.</div>`;
    return;
  }

  container.innerHTML = sorted.map((item) => {
    const p24 = Number(item.pain24h);
    const badgeColor = p24 <= 3
      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
      : p24 <= 5
        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        : 'bg-rose-500/20 text-rose-300 border-rose-500/40';

    return `
      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm font-extrabold text-white">${item.date}</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-sky-300 text-xs font-bold">Phase ${item.phase}</span>
            <span class="px-2.5 py-0.5 rounded-full border text-xs font-extrabold ${badgeColor}">
              24h Response: ${item.pain24h}/10
            </span>
            <span class="text-xs text-slate-400 font-semibold">
              Pre: ${item.painPre}/10 • Post: ${item.painPost}/10 • Decline Test: ${item.painDecline ?? item.pain24h}/10
            </span>
          </div>
          <div class="text-xs font-semibold text-lime-300">${item.exercises}</div>
          <div class="text-xs text-slate-300">${item.notes}</div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onclick="editLogEntry('${item.date}')"
            class="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-xs font-bold"
          >
            Edit / 24h Update
          </button>
          <button
            type="button"
            onclick="deleteLogEntry('${item.date}')"
            class="px-3 py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/70 text-rose-300 border border-rose-800/60 text-xs font-bold"
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
    '=== CROSSFIT PATELLAR TENDINITIS REHAB — 7-DAY AI PROGRESS EXPORT ===',
    `Export Date: ${appState.formState.date}`,
    `Current Active Phase: Phase ${activePhase.id} (${activePhase.shortName})`,
    `7-Day Summary Metrics: Avg Pre-Workout Pain=${avgPre}/10 | Avg Post-Workout Pain=${avgPost}/10 | Avg 24h Next-Day Pain=${avg24}/10 | Flare-Up Days (>3/10)=${flares}`,
    '',
    '--- LAST 7 DAYS LOGGED SESSIONS & 24-HOUR TENDON RESPONSE ---',
    logLines || 'No sessions logged yet.',
    '',
    '--- CURRENT ACTIVE PHASE PRESCRIPTION (JSON) ---',
    currentPhaseJson,
    '',
    '--- AI COACHING REQUEST ---',
    'Based on my last 7 days of Pre-Workout, Post-Workout, and 24-Hour Next-Day pain scores above (using the Silbernagel <= 3/10 24-hour tendon tolerance rule and Kongsgaard HSR progression), please:',
    '1. Evaluate whether I should hold load, increase HSR barbell/slant-board load, regress to Phase 1 isometrics, or advance to the next rehab phase.',
    '2. Provide an updated JSON workout object compatible with my app\'s "Import Updated Plan" feature (containing either a full `phases` array or an updated `phaseId` + `exercises` array with `id`, `name`, `equipment`, `sets`, `repsOrHold`, `tempo`, `restSec`, `loadGuidance`, `cues`, `svgType`, `videoId`, `videoTitle`, and `videoUrl`).'
  ].join('\n');

  const outEl = document.getElementById('ai-export-textarea');
  if (outEl) outEl.value = report;
  if (notify) showToast('Compiled last 7 days of rehab data for AI evaluation!');
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
    showToast('Select the text box manually to copy.');
  }
  document.body.removeChild(temp);
}

function copyAiExportToClipboard() {
  const outEl = document.getElementById('ai-export-textarea');
  if (!outEl || !outEl.value) {
    generateAiExportReport(false);
  }
  const text = outEl ? outEl.value : '';
  copyTextWithFallback(text, 'Copied 7-day AI Rehab Report to clipboard!');
}

function loadSampleAiAdjustmentJson() {
  const sampleAdjustment = {
    updateNote: 'Week 5 AI Progression: 24h pain averaged 1.9/10 (<3/10 ceiling). Progressing Phase 2 HSR from 10RM down to 8RM/6RM heavier loading and adding a 4th set on Bulgarian Split Squats.',
    phaseId: 2,
    title: 'Phase 2 — Heavy Slow Resistance (Week 5 Heavy 6–8RM Progression)',
    timeline: 'Weeks 5–6 (3 Sessions/Week — 48h Recovery Spacing)',
    exercises: [
      {
        id: 'p2_slant_hsr_squat',
        name: 'Slant Board / Plate-Elevated HSR Tempo Squat (Week 5 Heavy)',
        equipment: ['25° Slant Board or Bumper Plates', 'Barbell / Heavy Goblet KB'],
        sets: 4,
        repsOrHold: '6–8 reps (6s/rep)',
        tempo: '3s Eccentric Down • 0s Pause • 3s Concentric Up',
        restSec: 150,
        defaultTimerMode: 'hsr',
        defaultDurationSec: 48,
        loadGuidance: 'Increase load +5kg from last week (target 65kg @ RPE 8–8.5; pain <= 3/10)',
        cues: 'Keep strict 3s down / 3s up cadence on the 25° slant board. Do not rush the bottom transition.',
        svgType: 'decline_squat',
        videoId: 'v1B7qGU461I',
        videoTitle: 'Slant Board / Elevated Heel Squats: Patella Tendon — Strength & Sport',
        videoUrl: 'http://www.youtube.com/watch?v=v1B7qGU461I'
      },
      {
        id: 'p2_barbell_hsr_squat',
        name: 'Barbell Heavy Slow Resistance Back Squat (6RM Target)',
        equipment: ['Squat Rack', 'Barbell + Bumper Plates'],
        sets: 4,
        repsOrHold: '6 reps (6s/rep)',
        tempo: '3s Eccentric Down • 0s Pause • 3s Concentric Up',
        restSec: 180,
        defaultTimerMode: 'hsr',
        defaultDurationSec: 36,
        loadGuidance: 'Target 82.5–85kg Barbell (80–85% 1RM); 3 minutes rest between sets',
        cues: 'Drive smoothly out of the hole over 3 seconds to maximize mechanical tendon strain and collagen cross-linking.',
        svgType: 'barbell_squat',
        videoId: 'Y7sfQTTLOws',
        videoTitle: 'Patellar Tendonitis Part 3: Heavy Slow Resistance Training Programme — Sports Injury Physio',
        videoUrl: 'http://www.youtube.com/watch?v=Y7sfQTTLOws'
      },
      {
        id: 'p2_bulgarian_split',
        name: 'Slow-Tempo Dumbbell Bulgarian Split Squat (4 Sets)',
        equipment: ['20" Plyo Box', 'Pair of Heavy Dumbbells'],
        sets: 4,
        repsOrHold: '8 reps / leg',
        tempo: '3s Eccentric Down • 1s Pause • 3s Concentric Up',
        restSec: 90,
        defaultTimerMode: 'hsr',
        defaultDurationSec: 48,
        loadGuidance: 'Upgraded to 4 working sets @ 22.5kg Dumbbells',
        cues: 'Maintain vertical shin bias and upright chest; pause 1 second at the bottom of each rep.',
        svgType: 'split_squat',
        videoId: 'uODWo4YqbT8',
        videoTitle: 'How to Bulgarian Split Squat | 3 Simple Steps — Davis Diley',
        videoUrl: 'http://www.youtube.com/watch?v=uODWo4YqbT8'
      }
    ]
  };

  const inEl = document.getElementById('ai-import-textarea');
  if (inEl) {
    inEl.value = JSON.stringify(sampleAdjustment, null, 2);
  }
  showToast('Loaded sample AI Week-5 HSR progression JSON.');
}

function importUpdatedPlanJson() {
  const inEl = document.getElementById('ai-import-textarea');
  const statusEl = document.getElementById('import-status-banner');
  if (!inEl || !inEl.value.trim()) {
    showToast('Paste an updated JSON plan or click "Load Sample AI JSON" first.');
    return;
  }

  try {
    const parsed = JSON.parse(inEl.value.trim());

    // Case 1: Full protocol object with `phases` array
    if (Array.isArray(parsed.phases) && parsed.phases.length > 0) {
      appState.protocol = parsed;
      safeSetStorage(STORAGE_KEYS.CUSTOM_PLAN, appState.protocol);
      renderHeaderStatus();
      renderWorkoutView();
      if (statusEl) {
        statusEl.className = 'mt-3 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs';
        statusEl.textContent = `✓ Imported complete multi-phase rehab plan (${parsed.phases.length} phases).`;
        statusEl.classList.remove('hidden');
      }
      showToast('Full updated workout plan imported and applied!');
      return;
    }

    // Case 2: Single phase adjustment object (`phaseId` + `exercises`)
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
          name: ex.name || `Prescribed Exercise ${idx + 1}`,
          equipment: Array.isArray(ex.equipment) ? ex.equipment : ['CrossFit Gym Equipment'],
          sets: Number(ex.sets) || 3,
          repsOrHold: ex.repsOrHold || ex.reps || '8 reps',
          tempo: ex.tempo || '3s Eccentric / 3s Concentric',
          restSec: Number(ex.restSec) || 90,
          defaultTimerMode: ex.defaultTimerMode || 'hsr',
          defaultDurationSec: Number(ex.defaultDurationSec) || 48,
          loadGuidance: ex.loadGuidance || 'Progressive load with <= 3/10 pain',
          cues: ex.cues || 'Maintain controlled tempo and knee alignment.',
          svgType: ex.svgType || 'barbell_squat',
          videoId: ex.videoId || 'Y7sfQTTLOws',
          videoTitle: ex.videoTitle || ex.name || 'Instructional Demo',
          videoUrl: ex.videoUrl || `http://www.youtube.com/watch?v=${ex.videoId || 'Y7sfQTTLOws'}`
        }));

        appState.activePhaseId = targetPhaseId;
        safeSetStorage(STORAGE_KEYS.CUSTOM_PLAN, appState.protocol);
        safeSetStorage(STORAGE_KEYS.ACTIVE_PHASE, appState.activePhaseId);
        renderHeaderStatus();
        renderWorkoutView();

        if (statusEl) {
          statusEl.className = 'mt-3 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs';
          statusEl.textContent = `✓ Applied AI workout adjustments to Phase ${targetPhaseId} (${existingPhase.exercises.length} exercises updated). ${parsed.updateNote || ''}`;
          statusEl.classList.remove('hidden');
        }
        showToast(`Phase ${targetPhaseId} plan updated! Switch to Workout tab to view.`);
        return;
      }
    }

    throw new Error('JSON must contain either a "phases" array or a "phaseId" with an "exercises" array.');
  } catch (err) {
    if (statusEl) {
      statusEl.className = 'mt-3 p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs';
      statusEl.textContent = `Invalid JSON format: ${err.message}`;
      statusEl.classList.remove('hidden');
    }
    showToast('JSON validation failed — check syntax in import box.');
  }
}

function resetDefaultProtocol() {
  openConfirmModal(
    'Reset to Default Clinical Protocol?',
    'This restores all 4 phases and exercise prescriptions back to the baseline Malliaras/Kongsgaard/Rio CrossFit clinical protocol.',
    () => {
      safeRemoveStorage(STORAGE_KEYS.CUSTOM_PLAN);
      appState.protocol = JSON.parse(JSON.stringify(DEFAULT_PROTOCOL));
      renderHeaderStatus();
      renderWorkoutView();
      const statusEl = document.getElementById('import-status-banner');
      if (statusEl) statusEl.classList.add('hidden');
      showToast('Restored default 4-phase clinical rehab protocol.');
    }
  );
}

// ==========================================================================
// GitHub Pages Standalone Source Files Exporter & Viewer
// ==========================================================================

function getRepositoryFilesMap() {
  const readmeText = [
    '# CrossFit Patellar Tendinitis (Jumper\'s Knee) Rehab Tracker',
    '',
    'A mobile-optimized, single-page web application (`index.html`, `style.css`, `app.js`) built for **GitHub Pages** to manage Patellar Tendinopathy rehabilitation using CrossFit gym equipment.',
    '',
    '## Step-by-Step GitHub Pages Deployment Instructions',
    '1. Create a new Public repository on GitHub (e.g., `patellar-rehab-tracker`) per the official [GitHub Pages Quickstart](https://docs.github.com/en/pages/quickstart).',
    '2. Push or upload `index.html`, `style.css`, `app.js`, and `README.md` to the `main` branch root:',
    '   ```bash',
    '   git init',
    '   git add index.html style.css app.js README.md',
    '   git commit -m "Deploy CrossFit Patellar Tendinitis Rehab Web App"',
    '   git branch -M main',
    '   git remote add origin https://github.com/<YOUR-USERNAME>/patellar-rehab-tracker.git',
    '   git push -u origin main',
    '   ```',
    '3. Go to **Settings → Pages** in your GitHub repository (see [Creating a GitHub Pages Site](https://docs.github.com/articles/creating-project-pages-manually)).',
    '4. Under **Build and deployment → Source**, choose **Deploy from a branch**, select **`main`** and **`/ (root)`**, and click **Save**.',
    '5. Open `https://<YOUR-USERNAME>.github.io/patellar-rehab-tracker/` on your phone at the gym and add it to your Home Screen.'
  ].join('\n');

  const styleSheetEl = document.getElementById('embedded-style-block');
  const cssText = styleSheetEl ? styleSheetEl.textContent.trim() : '/* See style.css in project archive */';

  const scriptEl = document.getElementById('embedded-app-script');
  const jsText = scriptEl ? scriptEl.textContent.trim() : '// See app.js in project archive';

  const openTag = '<';
  const closeScript = openTag + '/script>';
  const styleTag = openTag + 'link rel="stylesheet" ' + 'href="style' + '.css" />';
  const appScriptTag = openTag + 'script ' + 'src="app' + '.js">' + closeScript;
  const mainEl = document.querySelector('main');
  const headerEl = document.querySelector('header');
  const cleanBody = (headerEl ? headerEl.outerHTML : '') + '\n' + (mainEl ? mainEl.outerHTML : '');
  const cleanIndexHtml = [
    '<!DOCTYPE html>',
    '<html lang="en" class="dark">',
    '<head>',
    '  <meta charset="UTF-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />',
    '  <title>CrossFit Patellar Tendinitis Rehab Tracker</title>',
    '  ' + openTag + 'script src="https://cdn.tailwindcss.com/3.4.17">' + closeScript,
    '  ' + openTag + 'script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js">' + closeScript,
    '  ' + styleTag,
    '</head>',
    '<body class="bg-slate-950 text-slate-100 min-h-screen pb-28">',
    cleanBody,
    '  ' + appScriptTag,
    '</body>',
    '</html>'
  ].join('\n');

  return {
    'README.md': readmeText,
    'index.html': cleanIndexHtml,
    'style.css': cssText,
    'app.js': jsText
  };
}

function renderGithubCodePreview() {
  const sel = document.getElementById('code-preview-select');
  const pre = document.getElementById('github-code-preview');
  if (!sel || !pre) return;
  const files = getRepositoryFilesMap();
  const target = sel.value || 'README.md';
  pre.textContent = files[target] || '';
}

function copyRepoFile(fileName) {
  const files = getRepositoryFilesMap();
  const content = files[fileName] || '';
  copyTextWithFallback(content, `Copied ${fileName} to clipboard!`);
}

function copyActivePreviewFile() {
  const sel = document.getElementById('code-preview-select');
  const fileName = sel ? sel.value : 'README.md';
  copyRepoFile(fileName);
}

function downloadRepoFile(fileName) {
  const files = getRepositoryFilesMap();
  const content = files[fileName] || '';
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(`Downloaded ${fileName}`);
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
  renderGithubCodePreview,
  copyRepoFile,
  copyActivePreviewFile,
  downloadRepoFile,
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
  renderGithubCodePreview();
});
