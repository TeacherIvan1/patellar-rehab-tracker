// =========================================================================
    // 1. MARCAS 1RM Y DICCIONARIO DE VIDEOS DE YOUTUBE POR EJERCICIO
    // =========================================================================
    const STORAGE_KEY = 'teacher_ivan_simple_v4';

    const DEFAULT_1RM = {
      bench: 140,
      backSquat: 170,
      frontSquat: 155,
      snatch: 90,
      cleanJerk: 120,
      strictPress: 95
    };

    const LIFT_NAMES = {
      bench: { short: 'Banca', name: 'Press de Banca' },
      backSquat: { short: 'BSQ', name: 'Sentadilla Trasera' },
      frontSquat: { short: 'FSQ', name: 'Sentadilla Frontal' },
      snatch: { short: 'Snatch', name: 'Snatch' },
      cleanJerk: { short: 'C&J', name: 'Clean & Jerk' },
      strictPress: { short: 'Press', name: 'Press Estricto' }
    };

    // Enlaces reales de YouTube verificados para cada ejercicio
    const YT_VIDEOS = {
      slds: '0UTyP00Ua1M',          // Single-Leg Decline Squat
      spanishSquat: '1CJ3hteGxo4',  // Sentadilla Española Isométrica
      isoExt: 'xbJRBJQ2UzE',        // Extensión de Rodilla Isométrica / Wall Sit
      snatch: 'BlcFcbfFo1k',        // Muscle Snatch / Power Snatch / Squat Snatch
      clean: 'kAGB8Ni-DEI',         // Hang Power Clean / Power Clean / Squat Clean
      pressJerk: 'rhJ-vEizDh0',     // Press Estricto / Push Press / Split Jerk / Thrusters
      rdlDeadlift: 'GZAKFRNtxLY',   // Peso Muerto Rumano (RDL) / Peso Muerto
      boxSquat: 'rMEPHwNhQfo',      // Sentadilla al Cajón / Back Squat / Front Squat HSR
      hipThrust: 'W86oVlnLqY4',     // Hip Thrust con Barra / Glúteo
      bench: 'hWbUlkb5Ms4',         // Press de Banca / Remo / Fondos
      splitSquat: 'qHDB5HkOrrs',    // Split Squat Tibia Vertical / Step-Down
      calfTib: 'a-x_NR-ibos',       // Elevación de Pantorrilla / Sóleo / Tibial
      muscleUp: 'Zrb_M0Kgwn0',      // Ring / Bar Muscle-Ups / Dominadas / HSPU / Handstand Walk
      toesToBar: 'FF6Doc2KKms',     // Toes-to-Bar / L-Sit / Core
      kbSwing: 'n1df4ASFeZU',       // Kettlebell Swings / DB Snatch
      skiEcho: 'B0lIgT5PHc8',       // SkiErg / Echo Bike
      rowErg: 'soveq2xBNpo',        // Remo Concept2 RowErg
      carryRope: 'VnEDpwggH60'      // Subida a la Cuerda / Farmers Carry / Sled Push
    };

    // Helper para redondear a 0.5 kg
    function calcKg(liftKey, pct) {
      if (!liftKey || !pct) return null;
      const base = Number(state.lifts1RM[liftKey] || 100);
      return Math.round((base * Number(pct)) / 100 * 2) / 2;
    }

    // =========================================================================
    // 2. LOS 24 ENTRENAMIENTOS ESTRUCTURADOS POR BLOQUES (CON REPS E INTENSIDAD EN WODS)
    // =========================================================================
    const WORKOUTS = [
      // ==================== SEMANA 1 (ENTRENAMIENTOS 1 AL 6: FASE 1) ====================
      {
        num: 1,
        phase: 'Semana 1 • Fase 1 (Analgesia Isométrica y Flexión <60°)',
        title: 'Muscle Snatch, Peso Muerto Rumano y AMRAP 16',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Activación e Isometría Analgésica',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española Isométrica (70°–90°)', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC (Esfuerzo Isométrico)', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Fuerza y Halterofilia Adaptada',
            type: 'strength',
            items: [
              { name: 'Muscle Snatch + OHS Parcial (<45°)', sets: 6, reps: '2 + 2 reps', liftKey: 'snatch', pct: 70, tempo: 'Sin rebote', rest: 'Desc 2:00', yt: YT_VIDEOS.snatch },
              { name: 'Peso Muerto Rumano con Barra (RDL)', sets: 4, reps: '8 reps', liftKey: 'backSquat', pct: 65, tempo: 'Tempo 3-1-1', rest: 'Desc 2:00', yt: YT_VIDEOS.rdlDeadlift }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 12 Min (4 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 12 MIN (4 Rondas)',
            wodIntensity: 'Intensidad: 85% (Calidad Técnica y Control)',
            rounds: 4,
            items: [
              { reps: 'Min 1: 3–5 reps', name: 'Ring Muscle-Ups Estrictos / Kipping Suave', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: 'Min 2: 12 reps/pierna', name: 'Elevación de Pantorrilla Unipodal con Mancuerna', load: 'Tempo 3-1-3 • 85% Int.', yt: YT_VIDEOS.calfTib },
              { reps: 'Min 3: 45 seg', name: 'Plancha Lateral con Abducción de Cadera', load: 'Isométrico • 80% Int.', yt: YT_VIDEOS.toesToBar }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — AMRAP 16 Minutos',
            type: 'wod',
            wodFormat: 'AMRAP 16 MINUTOS',
            wodIntensity: 'Intensidad: 85% (RPE 8/10 • Ritmo Aeróbico Sostenido, Impacto Cero)',
            rounds: 5,
            items: [
              { reps: '15 Calorías', name: 'SkiErg', load: 'Ritmo 85% • Sin salto', yt: YT_VIDEOS.skiEcho },
              { reps: '12 Reps', name: 'Peso Muerto Controlado (Sin rebotar)', liftKey: 'cleanJerk', pct: 85, loadSuffix: '85% Int.', yt: YT_VIDEOS.rdlDeadlift },
              { reps: '15 Reps', name: 'Toes-to-Bar (Pies a la Barra)', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.toesToBar },
              { reps: '15 Calorías', name: 'Echo Bike (Sillín a 25°–30°)', load: 'Ritmo 85% • Cero impacto', yt: YT_VIDEOS.skiEcho }
            ]
          }
        ]
      },
      {
        num: 2,
        phase: 'Semana 1 • Fase 1 (Analgesia Isométrica y Flexión <60°)',
        title: 'Press Estricto + Push Press, Hip Thrust y 5 RFT',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Activación e Isometría Analgésica',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Extensión de Rodilla Isométrica a 45°', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC (Esfuerzo Isométrico)', yt: YT_VIDEOS.isoExt }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Fuerza de Empuje y Dominancia de Cadera',
            type: 'strength',
            items: [
              { name: 'Press Estricto + Push Press (Dip Corto <25°)', sets: 5, reps: '3 + 3 reps', liftKey: 'strictPress', pct: 78, tempo: 'Controlado', rest: 'Desc 2:00', yt: YT_VIDEOS.pressJerk },
              { name: 'Hip Thrust con Barra (Pausa 2s arriba)', sets: 4, reps: '10 reps', liftKey: 'backSquat', pct: 80, tempo: 'Pausa 2s', rest: 'Desc 2:00', yt: YT_VIDEOS.hipThrust }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Gimnasia y Glúteo Medio (4 Rondas por Calidad)',
            type: 'wod',
            wodFormat: '4 RONDAS POR CALIDAD (16 Min)',
            wodIntensity: 'Intensidad: 80% (Control Neuromuscular)',
            rounds: 4,
            items: [
              { reps: '15 metros (o 8 reps)', name: 'Handstand Walk (o Strict HSPU)', load: 'Peso Corporal • 80% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '15 + 12 reps', name: 'Pasos Laterales con Banda + Hip Hikes', load: 'Banda Media • 80% Int.', yt: YT_VIDEOS.hipThrust },
              { reps: '10 reps', name: 'Glute-Ham Raises (GHR) o Curl Femoral', load: 'Tempo 3-0-1 • 85% Int.', yt: YT_VIDEOS.rdlDeadlift }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — 5 Rondas Por Tiempo (Cap 18 Min)',
            type: 'wod',
            wodFormat: '5 RONDAS POR TIEMPO (Time Cap: 18 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 9/10 • Alta Densidad Metabólica)',
            rounds: 5,
            items: [
              { reps: '20 Reps', name: 'Russian Kettlebell Swings (Bisagra pura)', load: '32 kg • 90% Intensidad', yt: YT_VIDEOS.kbSwing },
              { reps: '15 Reps', name: 'Dominadas Estrictas (Strict Pull-Ups)', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '15 Reps', name: 'Hand-Release Push-Ups (Flexiones)', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.bench },
              { reps: '30 Segundos', name: 'L-Sit Hold en Anillas o Paralelas', load: 'Isométrico • 85% Int.', yt: YT_VIDEOS.toesToBar }
            ]
          }
        ]
      },
      {
        num: 3,
        phase: 'Semana 1 • Fase 1 (Analgesia Isométrica y Flexión <60°)',
        title: 'Hang Power Clean (<60°), Peso Muerto Pausado y Sprints Echo Bike',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Activación e Isometría Analgésica',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española Isométrica (70°–90°)', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Halterofilia Recepción Alta y Cadena Posterior',
            type: 'strength',
            items: [
              { name: 'Hang Power Clean (Recepción <60°)', sets: 6, reps: '3 reps', liftKey: 'cleanJerk', pct: 75, tempo: 'Sin rebote', rest: 'Desc 2:00', yt: YT_VIDEOS.clean },
              { name: 'Peso Muerto Convencional (Pausa 2s al despegar)', sets: 4, reps: '5 reps', liftKey: 'backSquat', pct: 88, tempo: 'Pausa 2s', rest: 'Desc 2:00', yt: YT_VIDEOS.rdlDeadlift }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 15 Min (5 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 15 MIN (5 Rondas)',
            wodIntensity: 'Intensidad: 85% (Tracción y Sóleo Pesado)',
            rounds: 5,
            items: [
              { reps: 'Min 1: 1–2 subidas', name: 'Legless Rope Climbs (4.5m • Bajada controlada)', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.carryRope },
              { reps: 'Min 2: 15 reps', name: 'Elevación de Sóleo Sentado (Seated Calf Raise)', load: 'Pesado (3-1-3) • 85% Int.', yt: YT_VIDEOS.calfTib },
              { reps: 'Min 3: 10 reps/pierna', name: 'Peso Muerto Rumano Unipodal con Mancuernas', load: '2 × 22.5 kg • 80% Int.', yt: YT_VIDEOS.rdlDeadlift }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — 10 Intervalos Sprint en Echo Bike',
            type: 'wod',
            wodFormat: '10 RONDAS DE INTERVALOS (20 Min Total)',
            wodIntensity: 'Intensidad: 95% en Sprints (RPE 9.5/10 • Potencia Anaeróbica)',
            rounds: 10,
            items: [
              { reps: '30 Segundos', name: 'Sprint Sentado en Echo Bike (Sillín 25°–30°)', load: '95% Intensidad Máxima', yt: YT_VIDEOS.skiEcho },
              { reps: '90 Segundos', name: 'Pedaleo Suave de Recuperación', load: '60% Intensidad Suave', yt: YT_VIDEOS.skiEcho }
            ]
          }
        ]
      },
      {
        num: 4,
        phase: 'Semana 1 • Fase 1 (Analgesia Isométrica y Flexión <60°)',
        title: 'Press de Banca 5×5, Remo Pendlay y EMOM 20',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Activación e Isometría Analgésica',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Wall Sit Isométrico a 60° de Flexión', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.isoExt }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Fuerza de Tren Superior y Glúteo Unipodal',
            type: 'strength',
            items: [
              { name: 'Press de Banca con Barra (Bench Press)', sets: 5, reps: '5 reps', liftKey: 'bench', pct: 83, tempo: '2-1-1', rest: 'Desc 2:00', yt: YT_VIDEOS.bench },
              { name: 'Remo Pendlay Estricto con Barra', sets: 4, reps: '8 reps', liftKey: 'bench', pct: 65, tempo: 'Estricto', rest: 'Desc 90s', yt: YT_VIDEOS.bench }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Gimnasia Estricta y Tibial Anterior (4 Series)',
            type: 'wod',
            wodFormat: '4 SERIES POR CALIDAD (18 Min)',
            wodIntensity: 'Intensidad: 85% (Fuerza Estricta)',
            rounds: 4,
            items: [
              { reps: '8 Reps', name: 'Fondos Estrictos Lastrados en Anillas (Ring Dips)', load: 'Lastrado • 85% Int.', yt: YT_VIDEOS.bench },
              { reps: '10 Reps', name: 'Toes-to-Bar Estrictos', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.toesToBar },
              { reps: '25 Reps', name: 'Elevaciones de Tibial Anterior (Tibialis Raises)', load: 'Controlado • 85% Int.', yt: YT_VIDEOS.calfTib }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — EMOM 20 Minutos (4 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 20 MINUTOS (4 Rondas de 5 Min)',
            wodIntensity: 'Intensidad: 85% (RPE 8.5/10 • Constante)',
            rounds: 4,
            items: [
              { reps: 'Min 1: 15 Cal', name: 'SkiErg', load: '85% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: 'Min 2: 12 Reps', name: 'Dumbbell Snatches Alternos (Bisagra, rodilla <45°)', load: '22.5 kg • 85% Int.', yt: YT_VIDEOS.kbSwing },
              { reps: 'Min 3: 12 Reps', name: 'Burpees sin Salto (Extensión de cadera)', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.bench },
              { reps: 'Min 4: 15 Cal', name: 'Remo RowErg a 1/2 Carro (Flexión <60°)', load: '85% Intensidad', yt: YT_VIDEOS.rowErg }
            ]
          }
        ]
      },
      {
        num: 5,
        phase: 'Semana 1 • Fase 1 (Analgesia Isométrica y Flexión <60°)',
        title: 'Power Snatch desde Bloques, RDL Pesado y Chipper',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Activación e Isometría Analgésica',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española Isométrica (70°–90°)', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Halterofilia desde Bloques y Bisagra Pesada',
            type: 'strength',
            items: [
              { name: 'Power Snatch desde Bloques (Recepción <60°)', sets: 7, reps: '2 reps', liftKey: 'snatch', pct: 78, tempo: 'Sin rebote', rest: 'Desc 90s', yt: YT_VIDEOS.snatch },
              { name: 'Peso Muerto Rumano Pesado (RDL)', sets: 4, reps: '8 reps', liftKey: 'backSquat', pct: 68, tempo: 'Tempo 3-1-1', rest: 'Desc 2:00', yt: YT_VIDEOS.rdlDeadlift }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 12 Min (4 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 12 MIN (4 Rondas)',
            wodIntensity: 'Intensidad: 85% (Gimnasia Compleja)',
            rounds: 4,
            items: [
              { reps: 'Min 1: 4–6 reps', name: 'Bar Muscle-Ups (Bajada controlada)', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: 'Min 2: 15 reps/pierna', name: 'Elevación de Pantorrilla de Pie Unipodal', load: 'Pesado (3-1-3) • 85% Int.', yt: YT_VIDEOS.calfTib },
              { reps: 'Min 3: 12 reps/lado', name: 'Abducción de Cadera Tumbado con Banda', load: 'Banda Fuerte • 85% Int.', yt: YT_VIDEOS.hipThrust }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — Chipper Por Tiempo (Cap 20 Min)',
            type: 'wod',
            wodFormat: 'POR TIEMPO (Time Cap: 20 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 9/10 • Chipper de Alta Capacidad)',
            rounds: 1,
            items: [
              { reps: '50 Calorías', name: 'Echo Bike (Sillín a 25°–30°)', load: '90% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: '40 Reps', name: 'Kettlebell Swings', load: '24 kg • 90% Intensidad', yt: YT_VIDEOS.kbSwing },
              { reps: '30 Reps', name: 'Chest-to-Bar Pull-Ups (Pecho a la Barra)', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '20 Reps', name: 'Strict Handstand Push-Ups (HSPU Estrictos)', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '50 Calorías', name: 'SkiErg', load: '90% Intensidad Final', yt: YT_VIDEOS.skiEcho }
            ]
          }
        ]
      },
      {
        num: 6,
        phase: 'Semana 1 • Fase 1 (Analgesia Isométrica y Flexión <60°)',
        title: 'Push Press + Split Jerk Pausado, Trap-Bar Carry y AMRAP 22',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Activación e Isometría Analgésica',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Extensión de Rodilla Isométrica a 45°', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.isoExt }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Jerk con Pausa y Acarreo Pesado',
            type: 'strength',
            items: [
              { name: 'Push Press + Split Jerk (Pausa 2s en recepción)', sets: 6, reps: '1 + 2 reps', liftKey: 'cleanJerk', pct: 78, tempo: 'Tibia 90°', rest: 'Desc 2:00', yt: YT_VIDEOS.pressJerk },
              { name: 'Trap-Bar Farmers Walk (Caminata de Granjero)', sets: 5, reps: '30 metros', liftKey: 'backSquat', pct: 75, tempo: 'Paso firme', rest: 'Desc 90s', yt: YT_VIDEOS.carryRope }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Control de Core y Cadena Posterior (4 Series)',
            type: 'wod',
            wodFormat: '4 SERIES POR CALIDAD (15 Min)',
            wodIntensity: 'Intensidad: 80% (Estabilidad)',
            rounds: 4,
            items: [
              { reps: '45 Segundos', name: 'Práctica de Pino Libre (Freestanding Handstand)', load: 'Control • 80% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '15 Reps', name: 'Hip Extensions en GHD', load: 'Controlado • 85% Int.', yt: YT_VIDEOS.carryRope }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — AMRAP 22 Minutos',
            type: 'wod',
            wodFormat: 'AMRAP 22 MINUTOS',
            wodIntensity: 'Intensidad: 85% (RPE 8/10 • Resistencia Muscular)',
            rounds: 5,
            items: [
              { reps: '30 Calorías', name: 'SkiErg', load: '85% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: '20 Reps', name: 'Peso Muerto con Mancuernas', load: '2 × 22.5 kg • 85% Int.', yt: YT_VIDEOS.rdlDeadlift },
              { reps: '20 Reps', name: 'Toes-to-Bar', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.toesToBar },
              { reps: '100 Metros', name: 'Heavy Farmers Carry (Mancuernas / Kettlebells)', load: '2 × 32 kg • 85% Int.', yt: YT_VIDEOS.carryRope }
            ]
          }
        ]
      },

      // ==================== SEMANA 2 (ENTRENAMIENTOS 7 AL 12: FASE 2A HSR 15RM) ====================
      {
        num: 7,
        phase: 'Semana 2 • Fase 2A (HSR 15RM • Tempo 3-1-3)',
        title: 'HSR Sentadilla al Cajón 15RM, Split Squat y 21-15-9-9-15-21',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Biofeedback y Activación Pre-HSR',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española de Activación', sets: 2, reps: '30 seg', tempo: 'Descanso 90s', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Fuerza HSR Principal (4 × 15RM @ Tempo 3-1-3)',
            type: 'strength',
            items: [
              { name: 'Sentadilla al Cajón con Barra (60°–75°)', sets: 4, reps: '15 reps', liftKey: 'backSquat', pct: 55, tempo: 'Tempo 3-1-3', rest: 'Desc 2:00', yt: YT_VIDEOS.boxSquat },
              { name: 'Split Squat con Mancuernas (Tibia Vertical)', sets: 3, reps: '12 reps/pierna', liftKey: null, pct: 0, fixedLoad: '2 × 22.5 kg', tempo: 'Tempo 3-0-3', rest: 'Desc 90s', yt: YT_VIDEOS.splitSquat }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 12 Min (4 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 12 MIN (4 Rondas)',
            wodIntensity: 'Intensidad: 85% (Calidad Gimnástica)',
            rounds: 4,
            items: [
              { reps: 'Min 1: 4–6 reps', name: 'Ring Muscle-Ups', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: 'Min 2: 12 reps/pierna', name: 'Elevación de Pantorrilla Unipodal Pesada', load: 'Tempo 3-1-3 • 85% Int.', yt: YT_VIDEOS.calfTib },
              { reps: 'Min 3: 10 reps/lado', name: 'Hip Hikes + Abducción con Banda', load: 'Control • 80% Int.', yt: YT_VIDEOS.hipThrust }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — 21-15-9-9-15-21 Por Tiempo (Cap 16 Min)',
            type: 'wod',
            wodFormat: 'POR TIEMPO: 21-15-9-9-15-21 (Cap 16 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 9/10 • Sprint Aeróbico-Gimnástico)',
            rounds: 6,
            items: [
              { reps: '21-15-9-9-15-21', name: 'Calorías Echo Bike (Sillín 25°–30°)', load: '90% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: '21-15-9-9-15-21', name: 'Kettlebell Swings', load: '24 kg • 90% Intensidad', yt: YT_VIDEOS.kbSwing },
              { reps: '21-15-9-9-15-21', name: 'Chest-to-Bar Pull-Ups', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.muscleUp }
            ]
          }
        ]
      },
      {
        num: 8,
        phase: 'Semana 2 • Fase 2A (Día Isométrico + Halterofilia)',
        title: 'Power Snatch + Hang Power Snatch, RDL y AMRAP 18',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Auditoría 24h e Isometría PTLE',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española Isométrica', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Complejo de Arrancada y Cadena Posterior',
            type: 'strength',
            items: [
              { name: '1 Power Snatch + 2 Hang Power Snatches (<60°)', sets: 6, reps: '1 + 2 reps', liftKey: 'snatch', pct: 78, tempo: 'Sin rebote', rest: 'Desc 2:00', yt: YT_VIDEOS.snatch },
              { name: 'Peso Muerto Rumano Pesado (RDL)', sets: 4, reps: '8 reps', liftKey: 'backSquat', pct: 68, tempo: 'Tempo 3-1-1', rest: 'Desc 2:00', yt: YT_VIDEOS.rdlDeadlift }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Gimnasia Invertida y Hip Thrust (4 Series)',
            type: 'wod',
            wodFormat: '4 SERIES POR CALIDAD (16 Min)',
            wodIntensity: 'Intensidad: 85% (Fuerza y Control)',
            rounds: 4,
            items: [
              { reps: '10 Metros', name: 'Handstand Walk', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '10 Reps', name: 'Strict Handstand Push-Ups (HSPU)', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '10 Reps', name: 'Hip Thrust con Barra', liftKey: 'backSquat', pct: 82, loadSuffix: '85% Int.', yt: YT_VIDEOS.hipThrust }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — AMRAP 18 Minutos',
            type: 'wod',
            wodFormat: 'AMRAP 18 MINUTOS',
            wodIntensity: 'Intensidad: 85% (RPE 8.5/10 • Ritmo Constante)',
            rounds: 5,
            items: [
              { reps: '250 Metros', name: 'Remo RowErg (Flexión controlada ≤75°)', load: '85% Intensidad', yt: YT_VIDEOS.rowErg },
              { reps: '12 Reps', name: 'Hang Power Cleans (Recepción <60°)', liftKey: 'cleanJerk', pct: 50, loadSuffix: '85% Int.', yt: YT_VIDEOS.clean },
              { reps: '12 Reps', name: 'Burpees Controlados (Sin rebote profundo)', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.bench }
            ]
          }
        ]
      },
      {
        num: 9,
        phase: 'Semana 2 • Fase 2A (HSR 15RM • Tempo 3-0-3)',
        title: 'HSR Sentadilla Frontal al Cajón 15RM y 4 RFT',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Biofeedback y Activación Pre-HSR',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española de Activación', sets: 2, reps: '30 seg', tempo: 'Descanso 90s', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Fuerza HSR Frontal (4 × 15RM @ Tempo 3-0-3)',
            type: 'strength',
            items: [
              { name: 'Sentadilla Frontal al Cajón (75°–90°)', sets: 4, reps: '15 reps', liftKey: 'frontSquat', pct: 55, tempo: 'Tempo 3-0-3', rest: 'Desc 2:00', yt: YT_VIDEOS.boxSquat },
              { name: 'Extensión de Rodilla Unipodal (10°–60°)', sets: 3, reps: '12 reps/pierna', liftKey: null, pct: 0, fixedLoad: 'Carga Moderada', tempo: 'Tempo 3-0-3', rest: 'Desc 90s', yt: YT_VIDEOS.isoExt }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 15 Min (5 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 15 MIN (5 Rondas)',
            wodIntensity: 'Intensidad: 85% (Core y Cadena Distal)',
            rounds: 5,
            items: [
              { reps: 'Min 1: 15 reps', name: 'Toes-to-Bar', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.toesToBar },
              { reps: 'Min 2: 15 reps', name: 'Elevación de Sóleo Sentado Pesado', load: 'Tempo 3-1-3 • 85% Int.', yt: YT_VIDEOS.calfTib },
              { reps: 'Min 3: 10 reps/pierna', name: 'RDL Unipodal con Mancuernas', load: '2 × 22.5 kg • 85% Int.', yt: YT_VIDEOS.rdlDeadlift }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — 4 Rondas Por Tiempo (Cap 16 Min)',
            type: 'wod',
            wodFormat: '4 RONDAS POR TIEMPO (Time Cap: 16 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 8.5/10 • Potencia de Empuje y Tracción)',
            rounds: 4,
            items: [
              { reps: '20 Calorías', name: 'SkiErg', load: '90% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: '15 Reps', name: 'Push Press con Barra (Dip <30°)', liftKey: 'strictPress', pct: 55, loadSuffix: '90% Int.', yt: YT_VIDEOS.pressJerk },
              { reps: '2 Subidas', name: 'Rope Climbs (4.5m • Bajada controlada)', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.carryRope }
            ]
          }
        ]
      },
      {
        num: 10,
        phase: 'Semana 2 • Fase 2A (Día Isométrico + Halterofilia)',
        title: 'Power Clean & Split Jerk, Peso Muerto y EMOM 20',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Biofeedback e Isometría PTLE',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española Lastrada Isométrica', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Cargada y Envión + Peso Muerto Pesado',
            type: 'strength',
            items: [
              { name: '2 Power Cleans + 1 Split Jerk (Tibia Vertical)', sets: 7, reps: '2 + 1 reps', liftKey: 'cleanJerk', pct: 82, tempo: 'Pausa recepción', rest: 'Desc 2:00', yt: YT_VIDEOS.clean },
              { name: 'Peso Muerto Convencional (Sin rebotar)', sets: 4, reps: '5 reps', liftKey: 'backSquat', pct: 88, tempo: 'Controlado', rest: 'Desc 2:00', yt: YT_VIDEOS.rdlDeadlift }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Fuerza de Tren Superior y Tibial (4 Series)',
            type: 'strength',
            items: [
              { name: 'Press de Banca con Barra', sets: 4, reps: '8 reps', liftKey: 'bench', pct: 78, tempo: '2-1-1', rest: 'Desc 90s', yt: YT_VIDEOS.bench },
              { name: 'Dominadas Estrictas Lastradas + 25 Tibialis Raises', sets: 4, reps: '8 + 25 reps', liftKey: null, pct: 0, fixedLoad: 'Lastrado', tempo: 'Estricto', rest: 'Desc 90s', yt: YT_VIDEOS.muscleUp }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — EMOM 20 Minutos (5 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 20 MINUTOS (5 Rondas de 4 Min)',
            wodIntensity: 'Intensidad: 88% (RPE 8.5/10 • Alta Densidad)',
            rounds: 5,
            items: [
              { reps: 'Min 1: 16 Reps', name: 'Alternating Dumbbell Snatches', load: '25 kg • 88% Int.', yt: YT_VIDEOS.kbSwing },
              { reps: 'Min 2: 12 Reps', name: 'Ring Dips (o 5 Bar Muscle-Ups)', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: 'Min 3: 18 Cal', name: 'Echo Bike (Sillín 25°–30°)', load: '88% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: 'Min 4: Descanso', name: 'Minuto de Recuperación Completa', load: 'Recuperación', yt: YT_VIDEOS.skiEcho }
            ]
          }
        ]
      },
      {
        num: 11,
        phase: 'Semana 2 • Fase 2A (HSR 12–15RM • Tempo 3-1-3)',
        title: 'HSR Sentadilla Trasera Tempo 3-1-3 (90°) y WOD Aeróbico',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Biofeedback y Activación',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Wall Sit Isométrico a 60°', sets: 2, reps: '30 seg', tempo: 'Descanso 90s', intensity: '70% MVC', yt: YT_VIDEOS.isoExt }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Fuerza HSR Sentadilla Trasera (Tempo 3-1-3 hasta 90°)',
            type: 'strength',
            items: [
              { name: 'Sentadilla Trasera Libre Controlada (Hasta 90°)', sets: 4, reps: '12–15 reps', liftKey: 'backSquat', pct: 60, tempo: 'Tempo 3-1-3', rest: 'Desc 2:00', yt: YT_VIDEOS.boxSquat },
              { name: 'Step-Down Controlado desde Cajón Bajo', sets: 3, reps: '10 reps/pierna', liftKey: null, pct: 0, fixedLoad: 'Mancuernas', tempo: 'Tempo 3-0-3', rest: 'Desc 90s', yt: YT_VIDEOS.splitSquat }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 12 Min (4 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 12 MIN (4 Rondas)',
            wodIntensity: 'Intensidad: 85% (Calidad Estricta)',
            rounds: 4,
            items: [
              { reps: 'Min 1: 12 reps', name: 'Strict Handstand Push-Ups (HSPU)', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: 'Min 2: 12 reps', name: 'Glute-Ham Raises (GHR)', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.rdlDeadlift },
              { reps: 'Min 3: 15 reps/pierna', name: 'Elevación de Pantorrilla Unipodal', load: 'Tempo 3-1-3 • 85% Int.', yt: YT_VIDEOS.calfTib }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — Por Tiempo (Cap 18 Min)',
            type: 'wod',
            wodFormat: 'POR TIEMPO (Time Cap: 18 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 9/10 • Capacidad Aeróbica)',
            rounds: 1,
            items: [
              { reps: '1,000 Metros', name: 'Remo RowErg', load: '90% Intensidad', yt: YT_VIDEOS.rowErg },
              { reps: '50 Reps', name: 'Kettlebell Swings', load: '24 kg • 90% Intensidad', yt: YT_VIDEOS.kbSwing },
              { reps: '30 Reps', name: 'Dominadas Estrictas (Strict Pull-Ups)', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '1,000 Metros', name: 'BikeErg / Echo Bike (Sillín 25°–30°)', load: '90% Intensidad', yt: YT_VIDEOS.skiEcho }
            ]
          }
        ]
      },
      {
        num: 12,
        phase: 'Semana 2 • Fase 2A (Día Isométrico + Complejo Snatch)',
        title: 'Complejo Snatch + OHS 3-1-3, Hip Thrust y 3 RFT con Trineo',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Auditoría 24h e Isometría PTLE',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española Isométrica', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Complejo Técnico de Snatch y Glúteo Pesado',
            type: 'strength',
            items: [
              { name: '1 Power Snatch + 1 Hang PS + 1 OHS (Tempo 3-1-3)', sets: 6, reps: '1+1+1 reps', liftKey: 'snatch', pct: 70, tempo: 'Tempo 3-1-3', rest: 'Desc 2:00', yt: YT_VIDEOS.snatch },
              { name: 'Hip Thrust con Barra Pesado', sets: 4, reps: '8 reps', liftKey: 'backSquat', pct: 88, tempo: 'Pausa 2s', rest: 'Desc 2:00', yt: YT_VIDEOS.hipThrust }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Gimnasia Combinada y Trap-Bar Carry (3 Rondas)',
            type: 'wod',
            wodFormat: '3 RONDAS POR CALIDAD (15 Min)',
            wodIntensity: 'Intensidad: 85% (Fuerza de Agarre y Core)',
            rounds: 3,
            items: [
              { reps: '5 + 10 Reps', name: '5 Bar Muscle-Ups + 10 Toes-to-Bar', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '30 Metros', name: 'Trap-Bar Farmers Walk Pesado', load: 'Pesado • 85% Int.', yt: YT_VIDEOS.carryRope }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — 3 Rondas Por Tiempo (Cap 20 Min)',
            type: 'wod',
            wodFormat: '3 RONDAS POR TIEMPO (Time Cap: 20 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 9/10 • Potencia con Barra y Trineo)',
            rounds: 3,
            items: [
              { reps: '25 Calorías', name: 'SkiErg', load: '90% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: '15 Reps', name: 'Power Cleans (Recepción <60°)', liftKey: 'cleanJerk', pct: 50, loadSuffix: '90% Int.', yt: YT_VIDEOS.clean },
              { reps: '15 Reps', name: 'Push Press / Split Jerks', liftKey: 'cleanJerk', pct: 50, loadSuffix: '90% Int.', yt: YT_VIDEOS.pressJerk },
              { reps: '30 Metros', name: 'Empuje de Trineo Pesado (Sled Push a paso firme)', load: 'Pesado • 90% Int.', yt: YT_VIDEOS.carryRope }
            ]
          }
        ]
      },

      // ==================== SEMANA 3 (ENTRENAMIENTOS 13 AL 18: FASE 2B HSR 10RM–8RM) ====================
      {
        num: 13,
        phase: 'Semana 3 • Fase 2B (HSR 10RM • Rigidez Tendinosa)',
        title: 'HSR Sentadilla al Cajón 10RM (115.5 kg) y 21-15-9-9-15-21',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Biofeedback y Activación Pre-HSR',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española de Activación', sets: 2, reps: '30 seg', tempo: 'Descanso 90s', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Fuerza HSR 10RM (90° Flexión • Tempo 3-1-3)',
            type: 'strength',
            items: [
              { name: 'Sentadilla al Cajón a 90° con Barra', sets: 4, reps: '10 reps', liftKey: 'backSquat', pct: 68, tempo: 'Tempo 3-1-3', rest: 'Desc 2:00', yt: YT_VIDEOS.boxSquat },
              { name: 'Split Squat Tibia Vertical Pesado', sets: 3, reps: '10 reps/pierna', liftKey: null, pct: 0, fixedLoad: '2 × 27.5 kg', tempo: 'Tempo 3-0-3', rest: 'Desc 90s', yt: YT_VIDEOS.splitSquat }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 12 Min (4 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 12 MIN (4 Rondas)',
            wodIntensity: 'Intensidad: 88% (Calidad Gimnástica)',
            rounds: 4,
            items: [
              { reps: 'Min 1: 5 reps', name: 'Ring Muscle-Ups', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: 'Min 2: 12 reps/pierna', name: 'Elevación de Pantorrilla Unipodal Pesada', load: 'Tempo 3-1-3 • 88% Int.', yt: YT_VIDEOS.calfTib },
              { reps: 'Min 3: 10 reps/lado', name: 'Hip Hikes + Abducción con Banda', load: 'Control • 85% Int.', yt: YT_VIDEOS.hipThrust }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — 21-15-9-9-15-21 Por Tiempo (Cap 16 Min)',
            type: 'wod',
            wodFormat: 'POR TIEMPO: 21-15-9-9-15-21 (Cap 16 Min)',
            wodIntensity: 'Intensidad: 92% (RPE 9/10 • Alta Intensidad)',
            rounds: 6,
            items: [
              { reps: '21-15-9-9-15-21', name: 'Calorías Echo Bike (Sillín 25°–30°)', load: '92% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: '21-15-9-9-15-21', name: 'Russian Kettlebell Swings Pesados', load: '32 kg • 92% Intensidad', yt: YT_VIDEOS.kbSwing },
              { reps: '21-15-9-9-15-21', name: 'Chest-to-Bar Pull-Ups', load: 'Peso Corporal • 92% Int.', yt: YT_VIDEOS.muscleUp }
            ]
          }
        ]
      },
      {
        num: 14,
        phase: 'Semana 3 • Fase 2B (Día Isométrico + Fuerza Estricta)',
        title: 'Power Snatch (80%), Press Estricto (84%) y AMRAP 18',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Auditoría 24h e Isometría PTLE',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española Isométrica', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Arrancada de Potencia y Press Estricto Pesado',
            type: 'strength',
            items: [
              { name: '1 Power Snatch + 2 Hang Power Snatches (<60°)', sets: 6, reps: '1 + 2 reps', liftKey: 'snatch', pct: 80, tempo: 'Sin rebote', rest: 'Desc 2:00', yt: YT_VIDEOS.snatch },
              { name: 'Press Estricto con Barra (Strict Press)', sets: 5, reps: '4 reps', liftKey: 'strictPress', pct: 84, tempo: 'Estricto', rest: 'Desc 2:00', yt: YT_VIDEOS.pressJerk }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Handstand Walk y Hip Thrust Pesado (4 Series)',
            type: 'wod',
            wodFormat: '4 SERIES POR CALIDAD (16 Min)',
            wodIntensity: 'Intensidad: 88% (Fuerza de Extensión)',
            rounds: 4,
            items: [
              { reps: '15 Metros', name: 'Handstand Walk', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '10 Reps', name: 'Strict Handstand Push-Ups', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '10 Reps', name: 'Hip Thrust con Barra', liftKey: 'backSquat', pct: 90, loadSuffix: '88% Int.', yt: YT_VIDEOS.hipThrust }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — AMRAP 18 Minutos',
            type: 'wod',
            wodFormat: 'AMRAP 18 MINUTOS',
            wodIntensity: 'Intensidad: 88% (RPE 8.5/10 • Ritmo Sostenido)',
            rounds: 5,
            items: [
              { reps: '250 Metros', name: 'Remo RowErg', load: '88% Intensidad', yt: YT_VIDEOS.rowErg },
              { reps: '12 Reps', name: 'Hang Power Cleans', liftKey: 'cleanJerk', pct: 55, loadSuffix: '88% Int.', yt: YT_VIDEOS.clean },
              { reps: '12 Reps', name: 'Burpees Controlados', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.bench }
            ]
          }
        ]
      },
      {
        num: 15,
        phase: 'Semana 3 • Fase 2B (HSR 10RM • Tempo 3-0-3)',
        title: 'HSR Sentadilla Frontal 10RM (105.5 kg) y 4 RFT',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Biofeedback y Activación Pre-HSR',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española de Activación', sets: 2, reps: '30 seg', tempo: 'Descanso 90s', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Fuerza HSR Sentadilla Frontal (4 × 10RM @ Tempo 3-0-3)',
            type: 'strength',
            items: [
              { name: 'Sentadilla Frontal a 90° (Sin rebote)', sets: 4, reps: '10 reps', liftKey: 'frontSquat', pct: 68, tempo: 'Tempo 3-0-3', rest: 'Desc 2:00', yt: YT_VIDEOS.boxSquat },
              { name: 'Extensión de Rodilla Unipodal (10°–60°)', sets: 3, reps: '10 reps/pierna', liftKey: null, pct: 0, fixedLoad: 'Carga Alta', tempo: 'Tempo 3-0-3', rest: 'Desc 90s', yt: YT_VIDEOS.isoExt }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 15 Min (5 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 15 MIN (5 Rondas)',
            wodIntensity: 'Intensidad: 88% (Core y Sóleo)',
            rounds: 5,
            items: [
              { reps: 'Min 1: 15 reps', name: 'Toes-to-Bar', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.toesToBar },
              { reps: 'Min 2: 15 reps', name: 'Elevación de Sóleo Sentado Pesado', load: 'Tempo 3-1-3 • 88% Int.', yt: YT_VIDEOS.calfTib },
              { reps: 'Min 3: 10 reps/pierna', name: 'RDL Unipodal Pesado', load: '2 × 25 kg • 88% Int.', yt: YT_VIDEOS.rdlDeadlift }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — 4 Rondas Por Tiempo (Cap 16 Min)',
            type: 'wod',
            wodFormat: '4 RONDAS POR TIEMPO (Time Cap: 16 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 9/10 • Alta Intensidad)',
            rounds: 4,
            items: [
              { reps: '20 Calorías', name: 'SkiErg', load: '90% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: '15 Reps', name: 'Push Press con Barra (Dip <30°)', liftKey: 'strictPress', pct: 60, loadSuffix: '90% Int.', yt: YT_VIDEOS.pressJerk },
              { reps: '2 Subidas', name: 'Rope Climbs (4.5m)', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.carryRope }
            ]
          }
        ]
      },
      {
        num: 16,
        phase: 'Semana 3 • Fase 2B (Día Isométrico + Fuerza Pesada)',
        title: 'Power C&J (85%), Press de Banca 5×5 (85%) y EMOM 20',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Biofeedback e Isometría PTLE',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española Lastrada Isométrica', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Power Clean & Split Jerk + Press de Banca 5×5',
            type: 'strength',
            items: [
              { name: '2 Power Cleans + 1 Split Jerk (Tibia Vertical)', sets: 7, reps: '2 + 1 reps', liftKey: 'cleanJerk', pct: 85, tempo: 'Recepción firme', rest: 'Desc 2:00', yt: YT_VIDEOS.clean },
              { name: 'Press de Banca con Barra (5 × 5)', sets: 5, reps: '5 reps', liftKey: 'bench', pct: 85, tempo: '2-1-1', rest: 'Desc 2:00', yt: YT_VIDEOS.bench }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Tracción Estricta y Cadena Distal (4 Series)',
            type: 'wod',
            wodFormat: '4 SERIES POR CALIDAD (15 Min)',
            wodIntensity: 'Intensidad: 88% (Fuerza Estricta)',
            rounds: 4,
            items: [
              { reps: '8 Reps', name: 'Dominadas Estrictas Lastradas', load: 'Lastrado • 88% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '25 + 15 Reps', name: 'Elevaciones de Tibial Anterior + Pasos con Banda', load: 'Controlado • 85% Int.', yt: YT_VIDEOS.calfTib }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — EMOM 20 Minutos (5 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 20 MINUTOS (5 Rondas de 4 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 9/10 • Potencia)',
            rounds: 5,
            items: [
              { reps: 'Min 1: 16 Reps', name: 'Alternating Dumbbell Snatches', load: '25 kg • 90% Int.', yt: YT_VIDEOS.kbSwing },
              { reps: 'Min 2: 5 Reps', name: 'Bar Muscle-Ups', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: 'Min 3: 18 Cal', name: 'Echo Bike (Sillín 25°–30°)', load: '90% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: 'Min 4: Descanso', name: 'Minuto de Recuperación', load: 'Recuperación', yt: YT_VIDEOS.skiEcho }
            ]
          }
        ]
      },
      {
        num: 17,
        phase: 'Semana 3 • Fase 2B (HSR 8RM • Tempo 3-1-3)',
        title: 'HSR Sentadilla Trasera 8RM (126 kg) y WOD 1000m Row/Bike',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Biofeedback y Activación',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Wall Sit Isométrico a 60°', sets: 2, reps: '30 seg', tempo: 'Descanso 90s', intensity: '70% MVC', yt: YT_VIDEOS.isoExt }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Fuerza HSR Pesada (4 × 8RM @ Tempo 3-1-3)',
            type: 'strength',
            items: [
              { name: 'Sentadilla Trasera a 90° (Cero Rebote)', sets: 4, reps: '8 reps', liftKey: 'backSquat', pct: 74, tempo: 'Tempo 3-1-3', rest: 'Desc 2:00', yt: YT_VIDEOS.boxSquat },
              { name: 'Step-Down Controlado con Carga', sets: 3, reps: '8 reps/pierna', liftKey: null, pct: 0, fixedLoad: 'Mancuernas', tempo: 'Tempo 3-0-3', rest: 'Desc 90s', yt: YT_VIDEOS.splitSquat }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 12 Min (4 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 12 MIN (4 Rondas)',
            wodIntensity: 'Intensidad: 88% (Calidad Estricta)',
            rounds: 4,
            items: [
              { reps: 'Min 1: 12 reps', name: 'Strict Handstand Push-Ups', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: 'Min 2: 12 reps', name: 'Glute-Ham Raises (GHR)', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.rdlDeadlift },
              { reps: 'Min 3: 15 reps/pierna', name: 'Elevación de Pantorrilla Unipodal Pesada', load: 'Tempo 3-1-3 • 88% Int.', yt: YT_VIDEOS.calfTib }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — Por Tiempo (Cap 18 Min)',
            type: 'wod',
            wodFormat: 'POR TIEMPO (Time Cap: 18 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 9/10 • Resistencia Mixta)',
            rounds: 1,
            items: [
              { reps: '1,000 Metros', name: 'Remo RowErg', load: '90% Intensidad', yt: YT_VIDEOS.rowErg },
              { reps: '50 Reps', name: 'Kettlebell Swings', load: '24 kg • 90% Intensidad', yt: YT_VIDEOS.kbSwing },
              { reps: '30 Reps', name: 'Dominadas Estrictas', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '1,000 Metros', name: 'Echo Bike (Sillín 25°–30°)', load: '90% Intensidad', yt: YT_VIDEOS.skiEcho }
            ]
          }
        ]
      },
      {
        num: 18,
        phase: 'Semana 3 • Fase 2B (Día Isométrico + Complejo Snatch 75%)',
        title: 'Complejo Snatch + OHS 3-1-3 (67.5 kg), Hip Thrust y 3 RFT',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Auditoría 24h e Isometría PTLE',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española Isométrica', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Complejo Snatch a 90° y Hip Thrust Pesado',
            type: 'strength',
            items: [
              { name: '1 Power Snatch + 1 Hang PS + 1 OHS (3-1-3 a 90°)', sets: 6, reps: '1+1+1 reps', liftKey: 'snatch', pct: 75, tempo: 'Tempo 3-1-3', rest: 'Desc 2:00', yt: YT_VIDEOS.snatch },
              { name: 'Hip Thrust con Barra Pesado', sets: 4, reps: '8 reps', liftKey: 'backSquat', pct: 94, tempo: 'Pausa 2s', rest: 'Desc 2:00', yt: YT_VIDEOS.hipThrust }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Gimnasia y Acarreo Pesado (3 Rondas)',
            type: 'wod',
            wodFormat: '3 RONDAS POR CALIDAD (15 Min)',
            wodIntensity: 'Intensidad: 90% (Volumen Gimnástico)',
            rounds: 3,
            items: [
              { reps: '6 + 12 Reps', name: '6 Bar Muscle-Ups + 12 Toes-to-Bar', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '30 Metros', name: 'Trap-Bar Farmers Walk Pesado', load: 'Pesado • 90% Int.', yt: YT_VIDEOS.carryRope }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — 3 Rondas Por Tiempo (Cap 20 Min)',
            type: 'wod',
            wodFormat: '3 RONDAS POR TIEMPO (Time Cap: 20 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 9/10 • Potencia con Barra)',
            rounds: 3,
            items: [
              { reps: '25 Calorías', name: 'SkiErg', load: '90% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: '15 Reps', name: 'Power Cleans', liftKey: 'cleanJerk', pct: 55, loadSuffix: '90% Int.', yt: YT_VIDEOS.clean },
              { reps: '15 Reps', name: 'Split Jerks', liftKey: 'cleanJerk', pct: 55, loadSuffix: '90% Int.', yt: YT_VIDEOS.pressJerk },
              { reps: '30 Metros', name: 'Empuje de Trineo Pesado (Sled Push)', load: 'Pesado • 90% Int.', yt: YT_VIDEOS.carryRope }
            ]
          }
        ]
      },

      // ==================== SEMANA 4 (ENTRENAMIENTOS 19 AL 24: FASE 3 HSR 6RM + CEA CADA 72H) ====================
      {
        num: 19,
        phase: 'Semana 4 • Fase 3 (Día 1 CEA / Pliometría Graduada)',
        title: 'Box Jumps (Step-Down), Squat Clean Pausado (96 kg) y 3 RFT',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Auditoría SLDS Obligatoria (≤3/10) y Activación',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española de Activación', sets: 3, reps: '30 seg', tempo: 'Descanso 60s', intensity: '75% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Almacenamiento de Energía (CEA) y Squat Clean con Pausa',
            type: 'strength',
            items: [
              { name: 'Drop Landings (3×8) + Box Jumps Bajada Caminada (4×6)', sets: 4, reps: '6 saltos', liftKey: null, pct: 0, fixedLoad: 'Bajada Caminada', tempo: 'Aterrizaje suave', rest: 'Desc 90s', yt: YT_VIDEOS.boxSquat },
              { name: 'Squat Clean con Pausa de 1s en el Fondo (Sin rebote)', sets: 5, reps: '2 reps', liftKey: 'cleanJerk', pct: 80, tempo: 'Pausa 1s abajo', rest: 'Desc 2:00', yt: YT_VIDEOS.clean }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 12 Min (4 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 12 MIN (4 Rondas)',
            wodIntensity: 'Intensidad: 85% (Reintegración de Saltos Suaves)',
            rounds: 4,
            items: [
              { reps: 'Min 1: 25–30 reps', name: 'Double-Unders Relajados (Aterrizaje en antepié)', load: 'Cuerda • 85% Int.', yt: YT_VIDEOS.calfTib },
              { reps: 'Min 2: 5 reps', name: 'Ring Muscle-Ups', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: 'Min 3: 12 reps/pierna', name: 'Elevación de Pantorrilla Unipodal Pesada', load: 'Tempo 3-1-3 • 85% Int.', yt: YT_VIDEOS.calfTib }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — 3 Rondas Por Tiempo (Cap 15 Min)',
            type: 'wod',
            wodFormat: '3 RONDAS POR TIEMPO (Time Cap: 15 Min)',
            wodIntensity: 'Intensidad: 85% (RPE 8/10 • Control de Impacto)',
            rounds: 3,
            items: [
              { reps: '400 Metros', name: 'Carrera Controlada en Llano (Si Bloque B ≤2/10)', load: '85% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: '15 Reps', name: 'Wall Balls (Cadencia fluida sin rebotar abajo)', load: '9 kg • 85% Intensidad', yt: YT_VIDEOS.boxSquat },
              { reps: '12 Reps', name: 'Pull-Ups (Dominadas)', load: 'Peso Corporal • 85% Int.', yt: YT_VIDEOS.muscleUp }
            ]
          }
        ]
      },
      {
        num: 20,
        phase: 'Semana 4 • Fase 3 (Día 2: Descarga Isométrica Post-CEA)',
        title: 'Push Press + Split Jerk (100 kg), Press Estricto y AMRAP 16',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Auditoría 24h Post-CEA y Descarga Isométrica',
            type: 'series',
            items: [
              { name: 'Test SLDS a las 24h Post-Pliometría', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española Isométrica Analgésica', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Empuje Pesado de Hombro y Cadena Posterior (Cero Impacto)',
            type: 'strength',
            items: [
              { name: 'Push Press + Split Jerk (Tibia Vertical)', sets: 6, reps: '2 + 1 reps', liftKey: 'cleanJerk', pct: 83, tempo: 'Pausa recepción', rest: 'Desc 2:00', yt: YT_VIDEOS.pressJerk },
              { name: 'Press Estricto con Barra', sets: 4, reps: '4 reps', liftKey: 'strictPress', pct: 85, tempo: 'Estricto', rest: 'Desc 2:00', yt: YT_VIDEOS.pressJerk }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Habilidad Gimnástica y Glúteo (4 Series)',
            type: 'wod',
            wodFormat: '4 SERIES POR CALIDAD (16 Min)',
            wodIntensity: 'Intensidad: 88% (Cero Impacto Rotuliano)',
            rounds: 4,
            items: [
              { reps: '15 Metros', name: 'Handstand Walk', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '10 Reps', name: 'Strict Chest-to-Bar Pull-Ups', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '12 Reps/pierna', name: 'Hip Thrust Unipodal con Banda', load: 'Controlado • 85% Int.', yt: YT_VIDEOS.hipThrust }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — AMRAP 16 Minutos (Impacto Cero)',
            type: 'wod',
            wodFormat: 'AMRAP 16 MINUTOS',
            wodIntensity: 'Intensidad: 88% (RPE 8.5/10 • Aeróbico de Tren Superior)',
            rounds: 4,
            items: [
              { reps: '18 Calorías', name: 'Remo RowErg', load: '88% Intensidad', yt: YT_VIDEOS.rowErg },
              { reps: '15 Reps', name: 'Toes-to-Bar', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.toesToBar },
              { reps: '12 Reps', name: 'Dumbbell Push Presses', load: '2 × 22.5 kg • 88% Int.', yt: YT_VIDEOS.pressJerk },
              { reps: '18 Calorías', name: 'SkiErg', load: '88% Intensidad', yt: YT_VIDEOS.skiEcho }
            ]
          }
        ]
      },
      {
        num: 21,
        phase: 'Semana 4 • Fase 3 (Día 3: Fuerza HSR 6RM)',
        title: 'HSR Sentadilla Trasera 6RM (136 kg), Split Squat y 5 RFT',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Biofeedback y Activación Pre-HSR',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española de Activación', sets: 2, reps: '30 seg', tempo: 'Descanso 90s', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Fuerza HSR Máxima (4 × 6RM @ Tempo 3-1-3)',
            type: 'strength',
            items: [
              { name: 'Sentadilla Trasera Completa (Pausa 1s abajo)', sets: 4, reps: '6 reps', liftKey: 'backSquat', pct: 80, tempo: 'Tempo 3-1-3', rest: 'Desc 2:30', yt: YT_VIDEOS.boxSquat },
              { name: 'Split Squat Pesado (Tibia Vertical)', sets: 3, reps: '8 reps/pierna', liftKey: null, pct: 0, fixedLoad: '2 × 32.5 kg', tempo: 'Tempo 3-0-3', rest: 'Desc 2:00', yt: YT_VIDEOS.splitSquat }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 15 Min (5 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 15 MIN (5 Rondas)',
            wodIntensity: 'Intensidad: 90% (Fuerza de Cuerda y Cadena Posterior)',
            rounds: 5,
            items: [
              { reps: 'Min 1: 2 subidas', name: 'Rope Climbs (4.5m • Bajada controlada)', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.carryRope },
              { reps: 'Min 2: 15 reps', name: 'Elevación de Sóleo Sentado Pesado', load: 'Tempo 3-1-3 • 90% Int.', yt: YT_VIDEOS.calfTib },
              { reps: 'Min 3: 10 reps', name: 'Glute-Ham Raises (GHR)', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.rdlDeadlift }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — 5 Rondas Por Tiempo (Cap 16 Min)',
            type: 'wod',
            wodFormat: '5 RONDAS POR TIEMPO (Time Cap: 16 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 9/10 • Fuerza-MetCon)',
            rounds: 5,
            items: [
              { reps: '15 Calorías', name: 'Echo Bike (Sillín 25°–30°)', load: '90% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: '10 Reps', name: 'Peso Muerto Pesado Controlado', liftKey: 'cleanJerk', pct: 100, loadSuffix: '90% Int.', yt: YT_VIDEOS.rdlDeadlift },
              { reps: '8 Reps', name: 'Strict Handstand Push-Ups', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.muscleUp }
            ]
          }
        ]
      },
      {
        num: 22,
        phase: 'Semana 4 • Fase 3 (Día 1 CEA / Pliometría Unipodal + Snatch)',
        title: 'Single-Leg Hop & Stick, Squat Snatch (70 kg) y EMOM 16',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Auditoría SLDS Obligatoria (≤3/10) y Activación',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española de Activación', sets: 3, reps: '30 seg', tempo: 'Descanso 60s', intensity: '75% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Pliometría Unipodal Controlada y Squat Snatch',
            type: 'strength',
            items: [
              { name: 'Single-Leg Hop & Stick (3×5/pierna • Pausa 3s)', sets: 3, reps: '5 saltos/pierna', liftKey: null, pct: 0, fixedLoad: 'Control Valgo', tempo: '3s Pausa', rest: 'Desc 90s', yt: YT_VIDEOS.splitSquat },
              { name: 'Squat Snatch (Recepción controlada sin rebote)', sets: 6, reps: '2 reps', liftKey: 'snatch', pct: 78, tempo: 'Sin rebote', rest: 'Desc 2:00', yt: YT_VIDEOS.snatch }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'EMOM 12 Min (4 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 12 MIN (4 Rondas)',
            wodIntensity: 'Intensidad: 88% (Coordinación Elástica)',
            rounds: 4,
            items: [
              { reps: 'Min 1: 35–45 reps', name: 'Double-Unders', load: 'Cuerda • 88% Int.', yt: YT_VIDEOS.calfTib },
              { reps: 'Min 2: 5 reps', name: 'Bar Muscle-Ups', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: 'Min 3: 45 seg', name: 'Plancha Abdominal Lastrada', load: 'Disco 15–20 kg • 85% Int.', yt: YT_VIDEOS.toesToBar }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — EMOM 16 Minutos (4 Rondas)',
            type: 'wod',
            wodFormat: 'EMOM 16 MINUTOS (4 Rondas de 4 Min)',
            wodIntensity: 'Intensidad: 88% (RPE 8.5/10 • Potencia Controlada)',
            rounds: 4,
            items: [
              { reps: 'Min 1: 10 Reps', name: 'Box Jumps (60 cm • Obligatorio bajar caminando)', load: 'Step-Down • 88% Int.', yt: YT_VIDEOS.boxSquat },
              { reps: 'Min 2: 12 Reps', name: 'Russian Kettlebell Swings', load: '32 kg • 88% Int.', yt: YT_VIDEOS.kbSwing },
              { reps: 'Min 3: 12 Reps', name: 'Burpees Estándar', load: 'Peso Corporal • 88% Int.', yt: YT_VIDEOS.bench },
              { reps: 'Min 4: Descanso', name: 'Minuto de Recuperación', load: 'Recuperación', yt: YT_VIDEOS.skiEcho }
            ]
          }
        ]
      },
      {
        num: 23,
        phase: 'Semana 4 • Fase 3 (Día 2: Descarga Isométrica + Banca Pesada)',
        title: 'Hang Clean & Jerk, Press de Banca 5×5 (119 kg) y Sprint WOD',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Auditoría 24h Post-CEA y Descarga Isométrica',
            type: 'series',
            items: [
              { name: 'Test SLDS a las 24h Post-Pliometría', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española Isométrica Analgésica', sets: 5, reps: '45 seg', tempo: 'Descanso 2:00', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Halterofilia Colgado y Press de Banca Pesado',
            type: 'strength',
            items: [
              { name: 'Hang Power Clean + Push Jerk', sets: 6, reps: '2 + 2 reps', liftKey: 'cleanJerk', pct: 78, tempo: 'Firme', rest: 'Desc 2:00', yt: YT_VIDEOS.clean },
              { name: 'Press de Banca con Barra (5 × 5)', sets: 5, reps: '5 reps', liftKey: 'bench', pct: 85, tempo: '2-1-1', rest: 'Desc 2:00', yt: YT_VIDEOS.bench }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Complejo Gimnástico en Barra y Cadena Distal (4 Rondas)',
            type: 'wod',
            wodFormat: '4 RONDAS POR CALIDAD (16 Min)',
            wodIntensity: 'Intensidad: 90% (Resistencia de Tracción)',
            rounds: 4,
            items: [
              { reps: '8 + 6 + 4 Reps', name: '8 Pull-Ups + 6 Chest-to-Bar + 4 Bar Muscle-Ups', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.muscleUp },
              { reps: '15 + 25 Reps', name: '15 Elevaciones de Pantorrilla + 25 Tibialis Raises', load: 'Controlado • 85% Int.', yt: YT_VIDEOS.calfTib }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — Por Tiempo (Cap 18 Min)',
            type: 'wod',
            wodFormat: 'POR TIEMPO (Time Cap: 18 Min)',
            wodIntensity: 'Intensidad: 92% (RPE 9/10 • Sprint Metabólico)',
            rounds: 1,
            items: [
              { reps: '50 Calorías', name: 'SkiErg', load: '92% Intensidad', yt: YT_VIDEOS.skiEcho },
              { reps: '30 Reps', name: 'Dumbbell Hang Clean & Jerks', load: '22.5 kg • 92% Intensidad', yt: YT_VIDEOS.kbSwing },
              { reps: '50 Calorías', name: 'Echo Bike (Sillín 25°–30°)', load: '92% Intensidad Final', yt: YT_VIDEOS.skiEcho }
            ]
          }
        ]
      },
      {
        num: 24,
        phase: 'Semana 4 • Fase 3 (Día 3: Fuerza HSR 6RM Frontal)',
        title: 'HSR Sentadilla Frontal 6RM (124 kg) y 4 RFT con Thrusters',
        blocks: [
          {
            code: 'BLOQUE A',
            name: 'Biofeedback y Activación Pre-HSR',
            type: 'series',
            items: [
              { name: 'Test SLDS en Tabla Declinada (25°)', sets: 1, reps: '3 reps', tempo: 'Tempo 3-1-3', intensity: 'EVA ≤ 3/10', yt: YT_VIDEOS.slds },
              { name: 'Sentadilla Española de Activación', sets: 2, reps: '30 seg', tempo: 'Descanso 90s', intensity: '70% MVC', yt: YT_VIDEOS.spanishSquat }
            ]
          },
          {
            code: 'BLOQUE B',
            name: 'Fuerza HSR Sentadilla Frontal (4 × 6RM @ Tempo 3-1-3)',
            type: 'strength',
            items: [
              { name: 'Sentadilla Frontal Completa (Pausa 1s abajo)', sets: 4, reps: '6 reps', liftKey: 'frontSquat', pct: 80, tempo: 'Tempo 3-1-3', rest: 'Desc 2:30', yt: YT_VIDEOS.boxSquat },
              { name: 'Hip Thrust con Barra Pesado', sets: 4, reps: '8 reps', liftKey: 'backSquat', pct: 94, tempo: 'Pausa 2s', rest: 'Desc 2:00', yt: YT_VIDEOS.hipThrust }
            ]
          },
          {
            code: 'BLOQUE C',
            name: 'Blindaje de Cadena Cinética (3 Rondas)',
            type: 'wod',
            wodFormat: '3 RONDAS POR CALIDAD (15 Min)',
            wodIntensity: 'Intensidad: 88% (Estabilidad de Cadera y Rodilla)',
            rounds: 3,
            items: [
              { reps: '8 Reps/pierna', name: 'Prensa de Piernas Unipodal (~150% Peso Corporal)', load: 'Tempo 3-0-3 • 88% Int.', yt: YT_VIDEOS.splitSquat },
              { reps: '30 Metros', name: 'Heavy Farmers Walk + 15 Abducciones con Banda', load: 'Pesado • 88% Int.', yt: YT_VIDEOS.carryRope }
            ]
          },
          {
            code: 'BLOQUE D',
            name: 'WOD — 4 Rondas Por Tiempo (Cap 20 Min)',
            type: 'wod',
            wodFormat: '4 RONDAS POR TIEMPO (Time Cap: 20 Min)',
            wodIntensity: 'Intensidad: 90% (RPE 9/10 • Reintegración de Thrusters)',
            rounds: 4,
            items: [
              { reps: '400 Metros', name: 'Remo RowErg', load: '90% Intensidad', yt: YT_VIDEOS.rowErg },
              { reps: '12 Reps', name: 'Thrusters Controlados (Descenso sin rebote)', liftKey: 'strictPress', pct: 45, loadSuffix: '90% Int.', yt: YT_VIDEOS.pressJerk },
              { reps: '12 Reps', name: 'Chest-to-Bar Pull-Ups', load: 'Peso Corporal • 90% Int.', yt: YT_VIDEOS.muscleUp }
            ]
          }
        ]
      }
    ];

    // =========================================================================
    // 3. ESTADO DE LA APLICACIÓN (ENTRENAMIENTOS 1 Y 2 EN VERDE POR DEFECTO)
    // =========================================================================
    let state = {
      activeWorkout: 3, // Abre en el Entrenamiento #3 listo para realizar, con 1 y 2 en verde
      completedWorkouts: { 1: true, 2: true },
      completedSets: {}, // { 'w3_b1_i0_s1': true }
      lifts1RM: { ...DEFAULT_1RM }
    };

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          state = {
            ...state,
            ...parsed,
            completedWorkouts: { 1: true, 2: true, ...(parsed.completedWorkouts || {}) },
            completedSets: parsed.completedSets || {},
            lifts1RM: { ...DEFAULT_1RM, ...(parsed.lifts1RM || {}) }
          };
        }
      } catch (e) {}
    }

    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {}
    }

    // =========================================================================
    // 4. RENDERIZADO DE LA INTERFAZ SIMPLE Y DIRECTA
    // =========================================================================
    function renderApp() {
      renderTop1RMStrip();
      renderWorkoutNumbersGrid();
      renderActiveWorkout();
      if (window.lucide) window.lucide.createIcons();
    }

    function renderTop1RMStrip() {
      const strip = document.getElementById('top1RMStrip');
      if (!strip) return;
      strip.innerHTML = Object.keys(LIFT_NAMES).map(k => `
        <div class="bg-white/10 rounded-lg py-1 px-1">
          <div class="text-sky-200 font-bold text-[9px]">${LIFT_NAMES[k].short}</div>
          <div class="text-white font-extrabold text-[11px]">${state.lifts1RM[k]}kg</div>
        </div>
      `).join('');
    }

    function renderWorkoutNumbersGrid() {
      const grid = document.getElementById('workoutNumbersGrid');
      const countBadge = document.getElementById('completedCountBadge');
      const toggleBtn = document.getElementById('btnToggleWorkoutDone');
      if (!grid) return;

      const doneTotal = WORKOUTS.filter(w => state.completedWorkouts[w.num]).length;
      if (countBadge) countBadge.textContent = `${doneTotal}/24 Completados`;

      const isCurrentDone = !!state.completedWorkouts[state.activeWorkout];
      if (toggleBtn) {
        toggleBtn.textContent = isCurrentDone ? '✓ Completado' : 'Marcar Completado';
        toggleBtn.className = isCurrentDone
          ? 'px-3 py-1 rounded-xl text-xs font-extrabold transition bg-emerald-500 text-white shadow-xs'
          : 'px-3 py-1 rounded-xl text-xs font-extrabold transition bg-slate-200 text-slate-700 hover:bg-emerald-500 hover:text-white';
      }

      grid.innerHTML = WORKOUTS.map(w => {
        const isDone = !!state.completedWorkouts[w.num];
        const isActive = state.activeWorkout === w.num;

        let cls = 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200';
        if (isDone && isActive) {
          cls = 'bg-emerald-600 text-white ring-2 ring-offset-1 ring-[#1A3153] shadow';
        } else if (isDone) {
          cls = 'bg-emerald-500 text-white shadow-xs';
        } else if (isActive) {
          cls = 'bg-[#1A3153] text-white ring-2 ring-offset-1 ring-[#1A3153] shadow';
        }

        return `
          <button
            onclick="selectWorkout(${w.num})"
            class="h-9 rounded-xl font-mono-num text-xs font-extrabold flex items-center justify-center transition ${cls}"
            title="Entrenamiento #${w.num}"
          >
            ${w.num}${isDone ? '<span class="text-[9px] ml-0.5">✓</span>' : ''}
          </button>
        `;
      }).join('');
    }

    function renderActiveWorkout() {
      const w = WORKOUTS.find(item => item.num === state.activeWorkout) || WORKOUTS[0];
      const isWorkoutDone = !!state.completedWorkouts[w.num];

      const phaseSub = document.getElementById('headerPhaseSubtitle');
      const numBadge = document.getElementById('activeWorkoutNumberBadge');
      const statusTag = document.getElementById('activeWorkoutStatusTag');
      const titleEl = document.getElementById('activeWorkoutTitle');
      const container = document.getElementById('workoutBlocksContainer');

      if (phaseSub) phaseSub.textContent = w.phase;
      if (numBadge) numBadge.textContent = `Entrenamiento #${w.num}`;
      if (statusTag) {
        statusTag.textContent = isWorkoutDone ? '✓ Completado' : 'En Curso';
        statusTag.className = isWorkoutDone
          ? 'text-xs font-extrabold text-emerald-600'
          : 'text-xs font-bold text-amber-600';
      }
      if (titleEl) titleEl.textContent = w.title;
      if (!container) return;

      container.innerHTML = w.blocks.map((blk, bIdx) => {
        if (blk.type === 'strength' || blk.type === 'series') {
          const itemsHtml = blk.items.map((item, iIdx) => {
            const kg = item.liftKey ? calcKg(item.liftKey, item.pct) : null;
            const loadBadge = kg
              ? `<span class="px-2.5 py-1 rounded-lg bg-indigo-50 text-[#1A3153] border border-indigo-200 font-mono-num text-xs font-extrabold">${kg} kg (${item.pct}% 1RM)</span>`
              : item.fixedLoad
              ? `<span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono-num text-xs font-bold">${item.fixedLoad}</span>`
              : `<span class="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold">${item.intensity || ''}</span>`;

            const setPills = Array.from({ length: item.sets || 1 }, (_, sIdx) => {
              const sKey = `w${w.num}_b${bIdx}_i${iIdx}_s${sIdx + 1}`;
              const sDone = isWorkoutDone || !!state.completedSets[sKey];
              return `
                <button
                  onclick="toggleSetPill('${sKey}')"
                  class="set-pill ${sDone ? 'set-pill-done' : 'set-pill-idle'}"
                >
                  S${sIdx + 1}${sDone ? ' ✓' : ''}
                </button>
              `;
            }).join('');

            return `
              <div class="p-3.5 space-y-2.5 border-b border-slate-100 last:border-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                    ${item.name}
                  </div>
                  <button
                    onclick="openYoutubeModal('${item.name.replace(/'/g, "\\'")}', '${item.yt}')"
                    class="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-extrabold flex items-center gap-1 flex-shrink-0 shadow-2xs transition"
                  >
                    <i data-lucide="play-circle" class="w-3.5 h-3.5"></i>
                    <span>YouTube</span>
                  </button>
                </div>

                <!-- Prescripción: Series x Reps + Peso Calculado + Tempo -->
                <div class="flex flex-wrap items-center gap-1.5 text-xs">
                  <span class="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono-num font-extrabold">
                    ${item.sets} × ${item.reps}
                  </span>
                  ${loadBadge}
                  <span class="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 font-semibold text-[11px]">
                    ${item.tempo}
                  </span>
                  ${item.rest ? `<span class="text-[11px] text-slate-400 font-semibold">${item.rest}</span>` : ''}
                </div>

                <!-- Botones de Series para marcar en verde -->
                <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
                  ${setPills}
                </div>
              </div>
            `;
          }).join('');

          return `
            <div class="workout-card">
              <div class="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-[#E84C22] text-white text-[10px] font-extrabold uppercase">${blk.code}</span>
                  <span class="text-xs font-extrabold text-slate-800">${blk.name}</span>
                </div>
              </div>
              <div class="divide-y divide-slate-100">
                ${itemsHtml}
              </div>
            </div>
          `;
        } else {
          // BLOQUES DE WOD (EMOM, AMRAP, POR TIEMPO / RFT, INTERVALOS) CON REPETICIONES E INTENSIDAD
          const wodItemsHtml = blk.items.map((item) => {
            const kg = item.liftKey ? calcKg(item.liftKey, item.pct) : null;
            const loadText = kg
              ? `${kg} kg (${item.pct}% 1RM) • ${item.loadSuffix || ''}`
              : item.load;

            return `
              <div class="p-3 flex items-center justify-between gap-2.5 border-b border-slate-100 last:border-0">
                <div class="min-w-0 flex-1 space-y-1">
                  <div class="flex flex-wrap items-center gap-1.5">
                    <span class="px-2 py-0.5 rounded-md bg-orange-100 text-[#E84C22] font-mono-num text-xs font-extrabold">
                      ${item.reps}
                    </span>
                    <span class="text-xs font-extrabold text-slate-900">
                      ${item.name}
                    </span>
                  </div>
                  <div class="text-[11px] font-bold text-[#1A3153]">
                    Carga / Intensidad: <span class="text-[#633CFF] font-mono-num">${loadText}</span>
                  </div>
                </div>

                <button
                  onclick="openYoutubeModal('${item.name.replace(/'/g, "\\'")}', '${item.yt}')"
                  class="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-extrabold flex items-center gap-1 flex-shrink-0 shadow-2xs transition"
                >
                  <i data-lucide="play-circle" class="w-3.5 h-3.5"></i>
                  <span>YouTube</span>
                </button>
              </div>
            `;
          }).join('');

          const roundsCount = blk.rounds || 1;
          const roundPills = Array.from({ length: roundsCount }, (_, rIdx) => {
            const rKey = `w${w.num}_b${bIdx}_r${rIdx + 1}`;
            const rDone = isWorkoutDone || !!state.completedSets[rKey];
            return `
              <button
                onclick="toggleSetPill('${rKey}')"
                class="set-pill ${rDone ? 'set-pill-done' : 'set-pill-idle'}"
              >
                R${rIdx + 1}${rDone ? ' ✓' : ''}
              </button>
            `;
          }).join('');

          return `
            <div class="workout-card">
              <div class="px-3.5 py-2.5 bg-slate-900 text-white space-y-1">
                <div class="flex items-center justify-between gap-2">
                  <span class="px-2 py-0.5 rounded bg-[#E84C22] text-white text-[10px] font-extrabold uppercase">${blk.code}</span>
                  <span class="text-[11px] font-mono-num font-bold text-amber-300">${blk.wodFormat}</span>
                </div>
                <div class="text-xs font-extrabold text-emerald-300">
                  ⚡ ${blk.wodIntensity}
                </div>
              </div>

              <div class="divide-y divide-slate-100">
                ${wodItemsHtml}
              </div>

              <div class="px-3.5 py-2.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span class="text-[11px] font-bold text-slate-500">Rondas completadas:</span>
                <div class="flex flex-wrap items-center gap-1.5">
                  ${roundPills}
                </div>
              </div>
            </div>
          `;
        }
      }).join('');
    }

    // =========================================================================
    // 5. ACCIONES INTERACTIVAS
    // =========================================================================
    function selectWorkout(num) {
      state.activeWorkout = Number(num);
      saveState();
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleCurrentWorkoutDone() {
      const n = state.activeWorkout;
      state.completedWorkouts[n] = !state.completedWorkouts[n];
      saveState();
      renderApp();
    }

    function toggleSetPill(key) {
      state.completedSets[key] = !state.completedSets[key];
      saveState();
      renderApp();
    }

    function openYoutubeModal(title, ytId) {
      const modal = document.getElementById('modalYoutube');
      const titleEl = document.getElementById('ytModalTitle');
      const iframe = document.getElementById('ytModalIframe');
      const directLink = document.getElementById('ytModalDirectLink');

      if (titleEl) titleEl.textContent = title;
      if (iframe) iframe.src = `https://www.youtube.com/embed/${ytId}?rel=0`;
      if (directLink) directLink.href = `https://www.youtube.com/watch?v=${ytId}`;

      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
      if (window.lucide) window.lucide.createIcons();
    }

    function closeYoutubeModal() {
      const modal = document.getElementById('modalYoutube');
      const iframe = document.getElementById('ytModalIframe');
      if (iframe) iframe.src = '';
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }

    function openModal(id) {
      const m = document.getElementById(id);
      if (!m) return;
      if (id === 'modal1RM') {
        Object.keys(DEFAULT_1RM).forEach(k => {
          const inp = document.getElementById(`input1rm-${k}`);
          if (inp) inp.value = state.lifts1RM[k];
        });
      }
      m.classList.remove('hidden');
      m.classList.add('flex');
    }

    function closeModal(id) {
      const m = document.getElementById(id);
      if (!m) return;
      m.classList.add('hidden');
      m.classList.remove('flex');
    }

    function save1RMProfile() {
      Object.keys(DEFAULT_1RM).forEach(k => {
        const inp = document.getElementById(`input1rm-${k}`);
        if (inp) {
          const v = Number(inp.value);
          if (v > 0 && v < 500) state.lifts1RM[k] = v;
        }
      });
      saveState();
      closeModal('modal1RM');
      renderApp();
    }

    function resetDefault1RMs() {
      state.lifts1RM = { ...DEFAULT_1RM };
      Object.keys(DEFAULT_1RM).forEach(k => {
        const inp = document.getElementById(`input1rm-${k}`);
        if (inp) inp.value = DEFAULT_1RM[k];
      });
      saveState();
      renderApp();
    }

    // =========================================================================
    // 6. TEMPORIZADOR RÁPIDO CON BEEP DE AUDIO
    // =========================================================================
    let qTimer = {
      targetSec: 45,
      leftSec: 45,
      label: 'Isometría 45s',
      running: false,
      intervalId: null
    };

    function playBeep(freq = 720, duration = 0.15) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!window.__audioCtx) window.__audioCtx = new AudioCtx();
        const ctx = window.__audioCtx;
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {}
    }

    function formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function setQuickTimer(sec, label) {
      if (qTimer.intervalId) clearInterval(qTimer.intervalId);
      qTimer.running = false;
      qTimer.targetSec = sec;
      qTimer.leftSec = sec;
      qTimer.label = label;
      renderQuickTimer();
    }

    function toggleQuickTimer() {
      if (qTimer.running) {
        clearInterval(qTimer.intervalId);
        qTimer.running = false;
        renderQuickTimer();
        return;
      }
      qTimer.running = true;
      playBeep(700, 0.12);
      renderQuickTimer();
      qTimer.intervalId = setInterval(() => {
        if (qTimer.leftSec > 1) {
          qTimer.leftSec--;
          if (qTimer.leftSec <= 3) playBeep(520, 0.08);
          renderQuickTimer();
        } else {
          clearInterval(qTimer.intervalId);
          qTimer.running = false;
          qTimer.leftSec = qTimer.targetSec;
          playBeep(920, 0.25);
          renderQuickTimer();
        }
      }, 1000);
    }

    function resetQuickTimer() {
      setQuickTimer(qTimer.targetSec, qTimer.label);
    }

    function renderQuickTimer() {
      const lbl = document.getElementById('quickTimerLabel');
      const disp = document.getElementById('quickTimerDisplay');
      const icon = document.getElementById('quickTimerIcon');
      if (lbl) lbl.textContent = qTimer.label;
      if (disp) disp.textContent = formatTime(qTimer.leftSec);
      if (icon) {
        icon.setAttribute('data-lucide', qTimer.running ? 'pause' : 'play');
        if (window.lucide) window.lucide.createIcons();
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      loadState();
      renderApp();
      renderQuickTimer();
    });
