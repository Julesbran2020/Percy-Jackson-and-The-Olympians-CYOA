// Percy Jackson CYOA — Single-file JavaScript (no HTML needed)
// Drop this <script> on a blank page and it will inject UI, CSS, and logic.

(function () {
  // --- Inject CSS -----------------------------------------------------------
  const css = `:root{--bg:#0b1220;--panel:#121a2b;--accent:#6fd3ff;--accent-2:#ffd36f;--muted:#a9b4c7;--text:#e9f0ff;--danger:#ff6f6f;--success:#71ffa5}
  html,body{height:100%;background:radial-gradient(1200px 800px at 70% -10%,#163050 0%,var(--bg) 60%),linear-gradient(180deg,#0b1220,#070b14 70%);color:var(--text);font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,Helvetica,Arial,"Apple Color Emoji","Segoe UI Emoji";margin:0}
  .wrap{min-height:100%;display:grid;place-items:center;padding:2rem}
  .game{width:min(900px,100%);background:color-mix(in oklab,var(--panel) 88%,#000 12%);border:1px solid color-mix(in oklab,var(--panel) 60%,#fff 10%);border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.4),inset 0 0 40px rgba(111,211,255,.06);overflow:hidden}
  header{padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(180deg,rgba(111,211,255,.08),transparent);border-bottom:1px solid rgba(255,255,255,.06)}
  .title{font-weight:800;letter-spacing:.4px;font-size:1.05rem;color:var(--accent);display:flex;gap:.6rem;align-items:center}
  .title .pill{font-size:.75rem;color:var(--bg);background:var(--accent);padding:.1rem .5rem;border-radius:999px;font-weight:700}
  .controls{display:flex;gap:.5rem;flex-wrap:wrap}
  .btn{background:#1a243a;color:var(--text);border:1px solid rgba(255,255,255,.1);padding:.55rem .8rem;border-radius:10px;cursor:pointer;transition:transform .08s ease,border-color .15s ease,background .2s ease;font-weight:600;letter-spacing:.2px;font-size:.9rem}
  .btn:hover{transform:translateY(-1px);border-color:var(--accent)}
  .btn:active{transform:translateY(0)}
  .btn.primary{background:linear-gradient(180deg,rgba(111,211,255,.2),rgba(111,211,255,.08));border-color:rgba(111,211,255,.4)}
  .btn.ghost{background:transparent;border-color:rgba(255,255,255,.18);color:var(--muted)}
  .btn.warn{border-color:rgba(255,111,111,.45);color:#ffd6d6;background:rgba(255,111,111,.15)}
  .body{padding:1.25rem;display:grid;gap:1rem;align-items:start;grid-template-columns:1.1fr .9fr}
  @media (max-width:820px){.body{grid-template-columns:1fr}}
  .scene{background:linear-gradient(180deg,rgba(10,18,30,.8),rgba(10,18,30,.5));border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:1rem 1rem 1.1rem;min-height:260px;position:relative;overflow:hidden}
  .scene h2{margin:.25rem 0 .5rem;font-size:1.15rem;color:var(--accent-2)}
  .scene p{color:var(--text);opacity:.95;line-height:1.55}
  .choices{display:grid;gap:.6rem;margin-top:.4rem}
  .choice{background:#121b2e;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:.8rem .9rem;cursor:pointer;transition:background .2s ease,transform .06s ease,border-color .2s ease}
  .choice:hover{background:#17223a;border-color:var(--accent);transform:translateY(-1px)}
  .choice kbd{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);padding:.05rem .35rem;border-radius:6px;font-size:.7rem;margin-right:.5rem}
  .choice small{color:var(--muted);display:block;margin-top:.2rem}
  .sidebar{display:grid;gap:1rem}
  .panel{background:#0f1728;border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:.9rem}
  .panel h3{margin:0 0 .5rem;font-size:.95rem;color:var(--muted);font-weight:700;letter-spacing:.3px;text-transform:uppercase}
  .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem}
  .stat{background:#0b1425;border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:.6rem;text-align:center}
  .stat .v{font-size:1.15rem;font-weight:800;color:var(--accent)}
  .log{max-height:220px;overflow:auto;scroll-behavior:smooth;border-radius:10px;background:#0b1323;border:1px solid rgba(255,255,255,.06);padding:.6rem}
  .log p{margin:.25rem 0;font-size:.9rem;color:var(--muted)}
  footer{padding:.75rem 1.25rem 1.25rem;display:flex;gap:.6rem;flex-wrap:wrap;justify-content:flex-end}
  .hint{margin-right:auto;color:var(--muted);font-size:.9rem}
  .ending{font-weight:800;letter-spacing:.3px}
  .ending.heroic{color:var(--success)}
  .ending.tragic{color:var(--danger)}
  .ending.secret{color:var(--accent)}
  .fade-enter{opacity:0;transform:translateY(6px)}
  .fade-enter-active{opacity:1;transform:translateY(0);transition:opacity .25s ease,transform .25s ease}`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // GitHub repo (opens in new tab with G)
  const REPO_URL = 'https://github.com/Julesbran2020/Percy-Jackson-and-The-Olympians-CYOA.git';

  // --- Build DOM ------------------------------------------------------------
  const wrap = div('wrap');
  const game = div('game', { role: 'application', 'aria-label': 'Trial of the Half-Blood interactive story' });
  const header = el('header');
  const title = div('title');
  title.innerHTML = '<span>🌊 Trial of the Half-Blood</span><span class="pill">CYOA</span>';
  const controls = div('controls');
  const btnBack = button('⟵ Back', 'ghost', 'btn-back', 'Go back one scene (Alt+←)');
  const btnSave = button('💾 Save', '', 'btn-save', 'Save progress (Ctrl/Cmd+S)');
  const btnLoad = button('📂 Load', '', 'btn-load', 'Load last save');
  const btnGithub = button(' GitHub', 'ghost', 'btn-github', 'Open project repository (G)');
  const btnRestart = button('↺ Restart', 'warn', 'btn-restart', 'Restart the story');
  controls.append(btnBack, btnSave, btnLoad, btnGithub, btnRestart);
  header.append(title, controls);

  const body = div('body');
  const scene = div('scene'); scene.id = 'scene'; scene.tabIndex = 0;

  const sidebar = div('sidebar');
  const panelStats = panel('Stats');
  const statsGrid = div('stats');
  const statBravery = statBlock('Bravery', 'stat-bravery');
  const statWisdom = statBlock('Wisdom', 'stat-wisdom');
  const statLoyalty = statBlock('Loyalty', 'stat-loyalty');
  statsGrid.append(statBravery.wrap, statWisdom.wrap, statLoyalty.wrap);
  panelStats.append(statsGrid);

  const panelLog = panel('Log');
  const logEl = div('log'); logEl.id = 'log'; logEl.setAttribute('aria-live','polite'); logEl.setAttribute('aria-label','Choice log');
  panelLog.append(logEl);
  sidebar.append(panelStats, panelLog);

  body.append(scene, sidebar);

  const footer = el('footer');
  const hint = div('hint'); hint.innerHTML = 'Tip: Press <kbd>1</kbd>-<kbd>4</kbd> to choose, <kbd>Alt</kbd>+<kbd>←</kbd> to go back.';
  const btnContinue = button('Continue', 'primary', 'btn-continue'); btnContinue.style.display = 'none';
  footer.append(hint, btnContinue);

  game.append(header, body, footer);
  wrap.append(game);
  document.body.append(wrap);

  // --- Utilities ------------------------------------------------------------
  function el(tag, attrs) { const e = document.createElement(tag); if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function div(cls, attrs){ const e = el('div', attrs); if (cls) e.className = cls; return e; }
  function button(text, variant, id, title){ const b = el('button'); b.className = 'btn'+(variant?(' '+variant):''); if (id) b.id = id; if (title) b.title=title; b.textContent = text; return b; }
  function panel(titleText){ const p = div('panel'); const h3 = el('h3'); h3.textContent = titleText; p.append(h3); return p; }
  function statBlock(label, id){ const w = div('stat'); const v = div('v'); v.id = id; v.textContent = '0'; const t = document.createElement('div'); t.textContent = label; w.append(v, t); return { wrap: w, v }; }
  function nodeEl(tag, html) { const e = el(tag); e.innerHTML = html; return e; }
  function log(msg){ const p = el('p'); p.textContent = msg; logEl.appendChild(p); logEl.scrollTop = logEl.scrollHeight; }
  function byId(id){ return document.getElementById(id); }

  // --- Story Data -----------------------------------------------------------
  const story = {
    start: 'intro',
    nodes: {
      intro: {
        title: 'Arrival at Camp Half-Blood',
        text: `You wake in a car that smells like burnt monster and lemon. A centaur in tweed taps the window. <em>“Welcome to Camp Half-Blood,”</em> says Chiron. That night, the Oracle hisses:<br><br>
               <blockquote><em>“A child unclaimed, with fate concealed,<br/>Must face a foe that gods have sealed.<br/>In storm or flame the path shall show—<br/>To save Olympus, or sink below.”</em></blockquote>
               Annabeth studies you. <em>“That prophecy was about you, wasn’t it?”</em> The conch horn blares across the valley. Something big has begun.`,
        choices: [
          { key:'1', label:'Seek the truth — ask Chiron about the prophecy.', to:'path_knowledge', effects:{ wisdom:+1 } },
          { key:'2', label:'Train first — prove yourself in combat.', to:'path_valor', effects:{ bravery:+1 } },
          { key:'3', label:'Sneak out at night — investigate alone.', to:'path_shadows', effects:{ bravery:+1, wisdom:-1 } },
        ]
      },
      path_knowledge: {
        title: 'Path of Knowledge',
        text: `You find Chiron beneath the Big House eaves. He nods toward the attic. <em>“Answers seldom come without questions.”</em><br/>The Oracle’s mist coils again: the stolen <strong>Caduceus</strong> lies beyond the border. You must assemble a team—or risk it alone.`,
        choices: [
          { key:'1', label:'Recruit Annabeth and Grover (balanced team)', to:'kn_team', effects:{ loyalty:+1 } },
          { key:'2', label:'Go alone (dangerous)', to:'kn_solo', effects:{ bravery:+1 } },
          { key:'3', label:'Ask Hephaestus cabin for gadgets', to:'kn_gadgets', effects:{ wisdom:+1 } },
        ]
      },
      kn_team: {
        title: 'Plans at the Fire Pit',
        text: `Annabeth sketches a route in the dirt. Grover bleats anxiously. <em>“We’ll need stealth,”</em> she says. At the border, a dracaenae patrols.`,
        choices: [
          { key:'1', label:'Distract with Grover’s reed music; sneak past.', to:'kn_team_stealth', effects:{ wisdom:+1, loyalty:+1 } },
          { key:'2', label:'Ambush the patrol together.', to:'kn_team_fight', effects:{ bravery:+1 } },
        ]
      },
      kn_team_stealth: {
        title: 'The Quiet Way',
        text: `The lull of reed-pipes draws the monster aside. You slip through pine and shadow, reaching a half-buried shrine glowing sea-green.`,
        choices: [
          { key:'1', label:'Investigate the shrine.', to:'shrine_discovery', effects:{ wisdom:+1, flag_shrine:true } },
          { key:'2', label:'Ignore it and track the Caduceus’ trail.', to:'vault_approach' },
        ]
      },
      kn_team_fight: {
        title: 'Border Skirmish',
        text: `Steel clashes, sap sprays. You fight back-to-back with Annabeth; Grover trips the dracaenae with vines. Victorious, you find metallic feathers—harpy scouts? The trail points east.`,
        choices: [
          { key:'1', label:'Follow the harpy trail to a storm-lit vault.', to:'vault_approach', effects:{ bravery:+1 } },
          { key:'2', label:'Search for nearby clues.', to:'shrine_discovery', effects:{ wisdom:+1, flag_shrine:true } },
        ]
      },
      kn_solo: {
        title: 'Alone Beyond the Pines',
        text: `Moonlight paints the road silver. Without backup, every twig crack sounds like talons. A figure steps from the trees—Luke. <em>“We want the same thing,”</em> he says.<br/><small>(Going solo raises the stakes.)</small>`,
        choices: [
          { key:'1', label:'Hear Luke out to learn more.', to:'luke_tempt', effects:{ wisdom:+1 } },
          { key:'2', label:'Refuse—prepare to fight.', to:'solo_fight', effects:{ bravery:+1 } },
        ]
      },
      kn_gadgets: {
        title: 'Workshop Sparks',
        text: `Hephaestus kids hand you a telescoping spear, a bronze drone-bee, and a click-lock shield. <em>“Try not to explode,”</em> someone grins.`,
        choices: [
          { key:'1', label:'Scout with the drone (safe).', to:'vault_approach', effects:{ wisdom:+1 } },
          { key:'2', label:'Test the spear on a training automaton (risky).', to:'spear_mishap', effects:{ bravery:+1, wisdom:-1 } },
        ]
      },
      spear_mishap: {
        title: 'Whoops',
        text: `The spear detonates a dummy a little <em>too</em> hard. Sirens in the shop. You bail—probably fine. The trail still leads to a storm-lit vault.`,
        choices: [ { key:'1', label:'Head to the vault.', to:'vault_approach' } ]
      },
      vault_approach: {
        title: 'Storm-Lit Vault',
        text: `Lightning spiderwebs over a derelict museum annex. Inside: a bronze door humming with wards. The Caduceus sigil flickers.`,
        choices: [
          { key:'1', label:'Solve the ward puzzle.', to:'vault_puzzle', effects:{ wisdom:+1 } },
          { key:'2', label:'Force it open.', to:'vault_force', effects:{ bravery:+1, wisdom:-1 } },
        ]
      },
      vault_puzzle: {
        title: 'Serpents of Hermes',
        text: `Two bronze snakes form a lock. You trace a path that mirrors them in reverse; the door sighs open.`,
        choices: [ { key:'1', label:'Claim the Caduceus and return to camp.', to:'ending_heroic', effects:{ flag_claim:true } } ]
      },
      vault_force: {
        title: 'Trap sprung',
        text: `You ram the door. A shock ripples out; harpies descend shrieking. In the chaos, you grab the Caduceus—but alarms echo across the city.`,
        choices: [ { key:'1', label:'Escape into alleys.', to:'ending_mysterious', effects:{ bravery:+1 } } ]
      },
      path_valor: {
        title: 'Training Grounds',
        text: `Capture-the-Flag night. Ares kids grin like wolves. Someone whispers about a <em>secret map</em> in Chiron’s study.`,
        choices: [
          { key:'1', label:'Challenge Ares’ best fighter.', to:'valor_duel', effects:{ bravery:+1 } },
          { key:'2', label:'Protect a younger camper under attack.', to:'valor_protect', effects:{ loyalty:+1 } },
          { key:'3', label:'Sneak a look at the secret map.', to:'valor_sneak', effects:{ wisdom:+1, bravery:-1 } },
        ]
      },
      valor_duel: {
        title: 'The Duel',
        text: `Bronze rings on bronze. You barely parry a brutal overhead strike—then feint, sweep the knee, and tap the flag. The hill roars.`,
        choices: [ { key:'1', label:'Accept leadership of a quick quest team.', to:'valor_lead', effects:{ loyalty:+1 } } ]
      },
      valor_lead: {
        title: 'Leader’s Call',
        text: `With the camp’s respect, you’re offered command. A storm gathers over the city.`,
        choices: [ { key:'1', label:'Lead the team to the vault.', to:'vault_approach', effects:{ bravery:+1 } } ]
      },
      valor_protect: {
        title: 'Shield of the Small',
        text: `You interpose your shield; the bully’s strike glances off. The camper looks at you like you hung the moon. Somewhere, Athena takes notice.`,
        choices: [
          { key:'1', label:'Follow Athena’s omen toward the forest shrine.', to:'shrine_discovery', effects:{ wisdom:+1, flag_mercy:true, flag_shrine:true } },
          { key:'2', label:'Report to Chiron for a sanctioned quest.', to:'vault_approach', effects:{ loyalty:+1 } },
        ]
      },
      valor_sneak: {
        title: 'Caught in the Study',
        text: `You’re not alone—Chiron clears his throat. He sighs, then slides you the map. <em>“If you must defy, at least be clever about it.”</em>`,
        choices: [ { key:'1', label:'Head out under the radar.', to:'vault_approach', effects:{ wisdom:+1 } } ]
      },
      path_shadows: {
        title: 'Forest at Midnight',
        text: `You slip past curfew into trees that whisper like old oaths. A presence matches your steps. Luke appears, half-smile, half-warning.`,
        choices: [
          { key:'1', label:'Trust Luke to learn the truth.', to:'luke_tempt', effects:{ wisdom:+1, loyalty:-1 } },
          { key:'2', label:'Refuse and fight.', to:'shadow_fight', effects:{ bravery:+1 } },
          { key:'3', label:'Run deeper; seek an ancient shrine.', to:'shrine_discovery', effects:{ wisdom:+1, flag_shrine:true } },
        ]
      },
      luke_tempt: {
        title: 'Temptation',
        text: `Luke speaks of gods who fail their children. <em>“Join me. Take power, then decide.”</em> The forest holds its breath.`,
        choices: [
          { key:'1', label:'Pretend to join—spy from within.', to:'betrayer_path', effects:{ wisdom:+1 } },
          { key:'2', label:'Reject him outright.', to:'shadow_fight', effects:{ bravery:+1, loyalty:+1 } },
        ]
      },
      betrayer_path: {
        title: 'Gray Morality',
        text: `You nod. Luke smiles like a locked door opening. He leads you toward a storm-lit vault—and a choice you can’t unmake.`,
        choices: [
          { key:'1', label:'Deliver the Caduceus to Luke.', to:'ending_betrayer', effects:{ loyalty:-2 } },
          { key:'2', label:'Double-cross him at the last second.', to:'vault_puzzle', effects:{ bravery:+1, loyalty:+1 } },
        ]
      },
      shadow_fight: {
        title: 'Edge of the Blade',
        text: `Steel flashes. You’re faster than fear. Luke retreats into shadow, eyes unreadable. The path ahead hums with storm energy.`,
        choices: [ { key:'1', label:'Pursue to the vault.', to:'vault_approach', effects:{ bravery:+1 } } ]
      },
      solo_fight: {
        title: 'Outnumbered',
        text: `Alone, you barely fend off a flurry. A harpy screech distracts Luke; you break away toward the storm’s call.`,
        choices: [ { key:'1', label:'Head for the vault.', to:'vault_approach' } ]
      },
      shrine_discovery: {
        title: 'Ancient Shrine',
        text: `Sea-green glyphs awaken. A whisper: <em>Balance, not conquest.</em> You see futures branching like lightning. You feel… seen.`,
        choices: [
          { key:'1', label:'Accept the shrine’s guidance (mercy).', to:'guided_mercy', effects:{ wisdom:+1, flag_mercy:true } },
          { key:'2', label:'Take its power (ambition).', to:'guided_ambition', effects:{ bravery:+1, loyalty:-1 } },
          { key:'3', label:'Leave it undisturbed.', to:'vault_approach' },
        ]
      },
      guided_mercy: { title:'Gentle Current', text:`A cool tide fills your chest. For a moment you’re <em>both</em> shore and sea. The shrine dims, satisfied.`, choices:[ { key:'1', label:'Continue.', to:'vault_approach' } ] },
      guided_ambition: { title:'Riptide', text:`Power gushes through you. The shrine’s light gutters. Somewhere, something old notices.`, choices:[ { key:'1', label:'Continue.', to:'vault_approach' } ] },

      ending_heroic: { title:'Ending — Heroic', text:`<span class="ending heroic">You return the Caduceus.</span> The camp cheers, banners snapping like waves. A sigil blazes over your head—it’s your claiming. You are seen. You are home.`, choices:[] },
      ending_mysterious: { title:'Ending — Mysterious', text:`<span class="ending secret">You vanish into storm-soaked alleys.</span> With the Caduceus in hand and questions multiplying, you sense a deeper game—Kronos’ echo in the thunder.`, choices:[] },
      ending_betrayer: { title:'Ending — Betrayer', text:`<span class="ending tragic">You hand the Caduceus to Luke.</span> Power answers your call, but the campfire’s warmth never finds you again. Some doors, once closed, do not reopen.`, choices:[] },
      ending_true: { title:'Ending — Balance Restored', text:`<span class="ending heroic">Truth blossoms.</span> Oracle, shrine, mercy—your choices align. You are revealed as a bridge between legacies. Instead of victory, you choose balance, and the storm makes room for sunlight.`, choices:[] },
    }
  };

  // --- State ---------------------------------------------------------------
  const initialState = () => ({ current: story.start, history: [], stats: { bravery:0, wisdom:0, loyalty:0 }, flags:{} });
  let state = initialState();

  function applyEffects(effects = {}){
    for (const [k,v] of Object.entries(effects)){
      if (k.startsWith('flag_')) state.flags[k] = Boolean(v);
      else if (k in state.stats) state.stats[k] += v;
      else state.flags[k] = v;
    }
  }
  function meetsTrueEnding(){
    return state.flags.flag_shrine && state.flags.flag_mercy && state.history.includes('path_knowledge');
  }

  // --- Render ---------------------------------------------------------------
  function renderStats(){
    byId('stat-bravery').textContent = state.stats.bravery;
    byId('stat-wisdom').textContent = state.stats.wisdom;
    byId('stat-loyalty').textContent = state.stats.loyalty;
  }

  function show(nodeId){
    const node = story.nodes[nodeId]; if (!node) return;
    state.current = nodeId;

    scene.innerHTML = '';
    scene.classList.add('fade-enter');

    const h2 = nodeEl('h2', node.title);
    const text = nodeEl('p', node.text);
    const choicesWrap = div('choices');

    scene.append(h2, text, choicesWrap);

    if (!node.choices || node.choices.length === 0){
      const btn = document.createElement('button'); btn.className='btn primary'; btn.textContent='Play Again';
      btn.onclick = restart; choicesWrap.append(btn);
    } else {
      node.choices.forEach((c, idx) => {
        const choice = div('choice', { tabindex:'0', role:'button', 'aria-label': c.label });
        choice.innerHTML = `<kbd>${c.key || idx+1}</kbd> ${c.label}` + (c.hint?`<small>${c.hint}</small>`:'');
        choice.addEventListener('click', () => choose(c));
        choice.addEventListener('keydown', (e)=>{ if (e.key==='Enter' || e.key===' ') { e.preventDefault(); choose(c); } });
        choicesWrap.append(choice);
      });
    }

    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        scene.classList.add('fade-enter-active');
        setTimeout(()=>scene.classList.remove('fade-enter','fade-enter-active'), 260);
      });
    });

    renderStats();
    updateFooter();
    scene.focus();
  }

  function choose(choice){
    state.history.push(state.current);
    applyEffects(choice.effects || {});
    log(`→ ${choice.label}`);
    if (choice.to === 'vault_puzzle' && meetsTrueEnding()){ show('ending_true'); persist(); return; }
    show(choice.to);
    persist();
  }

  // --- Controls -------------------------------------------------------------
  function back(){ if (!state.history.length) return; const prev = state.history.pop(); show(prev); persist(); }
  function restart(){ state = initialState(); logEl.innerHTML=''; log('— New game started —'); show(story.start); persist(); }
  function persist(){ try { localStorage.setItem('pj_cyoa_save', JSON.stringify(state)); } catch(e){} }
  function load(){
    try {
      const raw = localStorage.getItem('pj_cyoa_save');
      if (!raw) return false;
      const s = JSON.parse(raw);
      if (!s || !s.current) return false;
      state = s;
      show(state.current);
      renderStats();
      log('— Save loaded —');
      return true;
    } catch(e){ return false; }
  }
  function updateFooter(){ btnBack.disabled = state.history.length === 0; }

  // --- Events ---------------------------------------------------------------
  window.addEventListener('keydown', (e)=>{
    const key = e.key;
    if (e.altKey && key === 'ArrowLeft'){ e.preventDefault(); back(); return; }
    if ((e.ctrlKey||e.metaKey) && key.toLowerCase()==='s'){ e.preventDefault(); persist(); log('— Saved —'); return; }
    if (key.toLowerCase() === 'g'){ e.preventDefault(); window.open(REPO_URL, '_blank', 'noopener'); return; }
    if (/^[1-4]$/.test(key)){
      const node = story.nodes[state.current]; const idx = parseInt(key,10);
      const c = (node.choices||[]).find(ch => (ch.key||'').toString()===key) || node.choices?.[idx-1];
      if (c) choose(c);
    }
  });

  btnBack.onclick = back;
  btnRestart.onclick = restart;
  btnSave.onclick = () => { persist(); log('— Saved —'); };
  btnLoad.onclick = () => { if (!load()) log('— No save found —'); };
  btnGithub.onclick = () => window.open(REPO_URL, '_blank', 'noopener');

  // --- Helpers --------------------------------------------------------------
  function byId(id){ return document.getElementById(id); }

  // Seed stats nodes now that they exist in DOM
  (function seedStatIds(){
    // (IDs already assigned in statBlock)
  })();

  // Initialize game ----------------------------------------------------------
  restart();
})();
