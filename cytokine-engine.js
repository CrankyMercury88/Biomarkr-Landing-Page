
// ═══════════════════════════════════════════════════════
// MARKERS (Optimized for Light Mode & Accessibility)
// ═══════════════════════════════════════════════════════
const MARKERS = [
  {key:'il6',  label:'IL-6',  color:'#dc2626', dash: [],             uln:7,    unit:'pg/mL'}, 
  {key:'il10', label:'IL-10', color:'#2563eb', dash: [6, 6],         uln:9.8,  unit:'pg/mL'}, 
  {key:'tnfa', label:'TNF-α', color:'#ea580c', dash: [12, 6],        uln:8.1,  unit:'pg/mL'}, 
  {key:'ifng', label:'IFN-γ', color:'#059669', dash: [3, 3],         uln:15.1, unit:'pg/mL'}, 
  {key:'il1b', label:'IL-1β', color:'#7c3aed', dash: [12, 4, 3, 4],  uln:5.0,  unit:'pg/mL'}, 
  {key:'pct',  label:'PCT*',  color:'#b45309', dash: [8, 8],         uln:0.1,  unit:'ng/mL'}, 
];

const PANEL_DESC = [
  {key:'il6', color:'#dc2626',
   tagline:'Acute phase initiator · first responder',
   body:'IL-6 is produced within hours by macrophages and T-cells in response to infection, trauma, and radiation. It drives the acute phase response, stimulating hepatic synthesis of CRP, fibrinogen, and complement proteins. <strong>Elevated in virtually all CBRN scenarios and in autoimmune flares</strong> — its amplitude and rate of rise help gauge severity.',
   uln:'ULN 7 pg/mL'},
  {key:'il10', color:'#2563eb',
   tagline:'Compensatory immune regulator',
   body:'IL-10 is the primary anti-inflammatory cytokine, produced by regulatory T-cells and macrophages to limit immune-mediated tissue damage. <strong>Sustained high IL-10 indicates immunoparalysis</strong> — a predictor of poor outcome in sepsis. High IL-10 in cancer reflects the tumour\'s immune evasion strategy.',
   uln:'ULN 9.8 pg/mL'},
  {key:'tnfa', color:'#ea580c',
   tagline:'Vascular alarm · endothelial activator',
   body:'TNF-α is an early-response cytokine driving endothelial activation, vascular permeability, and neutrophil recruitment. It is the <strong>primary therapeutic target in RA and IBD</strong> (anti-TNF biologics). In sepsis it drives the haemodynamic collapse; in VHF it mediates the vascular leak syndrome.',
   uln:'ULN 8.1 pg/mL'},
  {key:'ifng', color:'#059669',
   tagline:'Pathogen type discriminator · Th1 effector',
   body:'IFN-γ is produced by activated CD4+ Th1 cells, CD8+ cytotoxic T-cells, and NK cells. <strong>Markedly elevated IFN-γ identifies viral and intracellular bacterial pathogens</strong> (VHF, hantavirus, tularemia, brucellosis). Suppressed IFN-γ signals T-cell exhaustion (cancer) or lymphopenia (radiation). It is the single most discriminating marker in the panel.',
   uln:'ULN 15.1 pg/mL'},
  {key:'il1b', color:'#7c3aed',
   tagline:'Inflammasome sensor · cellular damage marker',
   body:'IL-1β is released via NLRP3 inflammasome activation in response to pathogen-associated molecular patterns (PAMPs) and damage-associated molecular patterns (DAMPs). <strong>Early IL-1β elevation identifies inflammasome-activating events</strong> including radiation exposure, cellular necrosis, viral RNA sensing, and urate crystal deposition in gout. It is the target of anakinra in RA.',
   uln:'ULN 5.0 pg/mL'},
  {key:'pct', color:'#b45309',
   tagline:'Bacterial aetiology discriminator · available expansion marker',
   body:'Procalcitonin is produced systemically (across multiple tissues) in response to bacterial endotoxin and cytokines, with a 6–12 hour lag after the cytokine surge. <strong>High PCT identifies bacterial infection; near-normal PCT in the context of marked cytokine elevation identifies viral, radiological, or chemical aetiology</strong>. PCT is not included in the standard Q-SENS cytokine panel but is trivially addable as an off-the-shelf assay. Its inclusion in this simulator illustrates the platform\'s expandability and the diagnostic value of pairing bacterial aetiology discrimination with the cytokine signature.',
   uln:'ULN 0.1 ng/mL'},
];

// ═══════════════════════════════════════════════════════
// CONDITIONS DATA
// ═══════════════════════════════════════════════════════
const T_CBRN   = [0,2,6,12,24,48,72];
const T_HEALTH = [0,3,7,12,20,35,60,90];
const T_MDD = [-10,-5,0,3,7,12,20,35,60,90]; // includes pre-onset baseline window

const ALL_CONDITIONS = [
  // ── CBRN ─────────────────────────────────────────────
  {
    id:'sepsis', cat:'cbrn', grp:'sepsis', color:'#0284c7',
    name:'Bacterial Sepsis', sub:'Systemic bacterial infection',
    catLabel:'SEPSIS',
    summary:'Rapid IL-6 and TNF-α surge with progressive PCT elevation — the hallmark of bacterial aetiology.',
    il6: [0.4,0.5,2, 15, 50, 30,15], il10:[0.5,0.5,1,  8, 20, 12, 6],
    tnfa:[0.4,0.5,3, 20, 30, 15, 8], ifng:[0.5,0.5,1,  5, 10,  8, 4],
    il1b:[0.4,0.5,2, 10, 25, 15, 8], pct: [0.5,0.5,1,  5, 15, 20,25],
    tags:[['High PCT','dt-pct-hi'],['IL-6 & TNF-α co-rise','dt-storm'],['IL-10 → immunoparalysis','dt-il10-hi']],
    rationale:{
      p1:'Bacterial sepsis is driven by pattern recognition of pathogen-associated molecular patterns (PAMPs) — primarily lipopolysaccharide from gram-negative organisms and peptidoglycan from gram-positive organisms. Toll-like receptor activation on macrophages and dendritic cells triggers rapid IL-6 and TNF-α secretion within 1–4 hours, preceding the clinical signs of fever and haemodynamic compromise.',
      p2:'Procalcitonin rises with a 6–12 hour lag, synthesised across multiple tissue types in response to the cytokine milieu and direct endotoxin stimulation. <strong>A PCT value above 2 ng/mL (20× ULN) within 12–24 hours strongly supports bacterial aetiology</strong> and distinguishes sepsis from viral infection, ARS, and chemical exposure — all of which present with elevated cytokines but near-normal PCT.',
      p3:'IL-10 rises as a compensatory anti-inflammatory signal. Its sustained elevation beyond 48 hours indicates immunoparalysis — a state of profound monocyte deactivation associated with secondary infection risk and increased mortality. Serial Q-SENS monitoring identifies this transition before clinical deterioration.',
      boxes:[
        {title:'Clinical Decision Support', color:'#0284c7', body:'<strong>Antibiotic escalation trigger:</strong> rising PCT + IL-6 within 12h of presentation. <strong>Antibiotic stewardship:</strong> falling PCT indicates response to therapy — guides de-escalation without repeated cultures.'},
        {title:'Key Discriminator', color:'#b45309', body:'High PCT separates bacterial sepsis from viral haemorrhagic fever, radiation syndrome, and chemical exposure — all of which may present with similar clinical severity but do not drive PCT elevation.'},
      ]
    }
  },
  {
    id:'vhf', cat:'cbrn', grp:'bio', color:'#dc2626',
    name:'Viral Haemorrhagic Fever', sub:'Ebola / Lassa / Marburg-like',
    catLabel:'BIOLOGICAL',
    summary:'Cytokine storm driven by massive IFN-γ and TNF-α. Low PCT despite critical illness — viral, not bacterial.',
    il6: [2,5,20, 80,200,250,150], il10:[1,3,15, 60,150,200,120],
    tnfa:[2,5,25,100,250,300,180], ifng:[2,8,50,150,250,220,100],
    il1b:[1.5,3,15,60,120,100,60], pct: [0.5,0.5,0.8,2,3,3.5,4],
    tags:[['Very low PCT (viral)','dt-pct-lo'],['IFN-γ dominant (T-cell/NK)','dt-ifng-hi'],['Cytokine storm','dt-storm']],
    rationale:{
      p1:'Viral haemorrhagic fevers (Ebola, Lassa, Marburg) cause immune dysregulation through direct viral destruction of macrophages and dendritic cells — the very cells responsible for an organised immune response. The resultant cytokine storm is characterised by massive TNF-α (driving vascular leak and haemorrhage) and markedly elevated IFN-γ reflecting the T-cell and NK cell anti-viral response.',
      p2:'<strong>The pathognomonic feature is the cytokine-PCT dissociation:</strong> IFN-γ, TNF-α, and IL-6 may reach 200–300× ULN while PCT stays below 5× ULN. This pattern directly informs antibiotic stewardship in resource-limited settings — escalating antibiotics for a VHF patient with near-normal PCT is both ineffective and harmful.',
      p3:'IL-10 elevation reflects the compensatory regulatory immune response attempting to contain the cytokine storm. In VHF, this compensation fails catastrophically, and rising IL-10 alongside TNF-α signals impending immune collapse rather than resolution.',
      boxes:[
        {title:'Clinical Decision Support', color:'#dc2626', body:'<strong>Isolation trigger:</strong> high IFN-γ + high TNF-α + near-normal PCT in a febrile patient with relevant exposure history. Directs antiviral supportive care rather than empirical antibiotics.'},
        {title:'Key Discriminator', color:'#059669', body:'IFN-γ >50× ULN with PCT <5× ULN is inconsistent with bacterial sepsis and points to viral or intracellular pathogen aetiology. Among CBRN threats, this pattern is specific to biological viral agents.'},
      ]
    }
  },
  {
    id:'hantavirus', cat:'cbrn', grp:'bio', color:'#7c3aed',
    name:'Andes Hantavirus (HPS)', sub:'Hantavirus Pulmonary Syndrome',
    catLabel:'BIOLOGICAL',
    summary:'Biphasic: mild prodrome then explosive IFN-γ-dominant surge as CD8+ T-cell immunopathology drives ARDS.',
    il6: [1,1.5,4,15, 60,120, 80], il10:[0.8,1,3,12, 40, 80, 50],
    tnfa:[1,1.5,5,20, 80,150,100], ifng:[1,  2,10,50,150,180,100],
    il1b:[0.8,1,4,15, 50, 80, 50], pct: [0.5,0.5,0.6,0.8,1,1.2,1.5],
    tags:[['IFN-γ dominant (CD8+)','dt-ifng-hi'],['Low PCT (viral)','dt-pct-lo'],['Biphasic — late ARDS','dt-delay']],
    rationale:{
      p1:'<strong>Andes hantavirus is the only hantavirus known to transmit between humans</strong>, and is currently responsible for an active outbreak aboard MV Hondius (May 2026). Hantavirus Pulmonary Syndrome is unique among viral respiratory illnesses: pulmonary oedema is driven primarily by CD8+ T-cell immunopathology rather than direct viral cytotoxicity. The lungs fill with fluid because the immune response, not the virus, damages the capillary endothelium.',
      p2:'This produces the characteristic signature: massive IFN-γ elevation (CD8+ effector marker) alongside high TNF-α driving pulmonary capillary leak. The clinical implication is counterintuitive — <strong>immune suppression may reduce pulmonary damage</strong> in severe HPS. Early Q-SENS measurement identifies candidates for immunomodulatory intervention before clinical ARDS is established.',
      p3:'PCT stays near-normal throughout, distinguishing HPS from bacterial pneumonia. The cytokine surge precedes PCT and CRP elevation by 6–12 hours — in a quarantine setting such as a cruise ship, <strong>daily cytokine monitoring provides a 6–12 hour early warning window</strong> that neither PCT nor CRP can provide.',
      boxes:[
        {title:'Quarantine / Cruise Ship Context', color:'#7c3aed', body:'Daily fingerstick Q-SENS testing in quarantined passengers detects the cytokine signature of HPS before fever declares. A pattern shift — rising IFN-γ with stable PCT — flags the patient for isolation escalation and antiviral consideration.'},
        {title:'Key Discriminator', color:'#059669', body:'Compared to bacterial pneumonia: low PCT + high IFN-γ. Compared to chemical exposure: much higher amplitude. The biphasic kinetic (mild at 0–12h, explosive at 24–48h) is diagnostically important.'},
      ]
    }
  },
  {
    id:'ars', cat:'cbrn', grp:'rad', color:'#b45309',
    name:'Acute Radiation Syndrome', sub:'Hematopoietic / GI (ARS)',
    catLabel:'RADIOLOGICAL',
    summary:'Early transient IL-6/IL-1β spike (inflammasome, 2–6h) then progressive suppression as lymphopenia develops. PCT stays flat — no infection.',
    il6: [0.4,8,20,12,5,3,2], il10:[0.4,2,8,5,2.5,2,1.5],
    tnfa:[0.4,4,12,7,3,2,1.5], ifng:[0.4,1,3,1.5,0.8,0.5,0.4],
    il1b:[0.4,8,18,10,4,2.5,2], pct: [0.4,0.4,0.5,0.5,0.4,0.4,0.4],
    tags:[['Early spike then fall','dt-early'],['Very low PCT (no infection)','dt-noinfect'],['Low IFN-γ (lymphopenia)','dt-pct-lo']],
    rationale:{
      p1:'Ionising radiation triggers immediate NLRP3 inflammasome activation through double-strand DNA breaks and reactive oxygen species. This produces an early IL-6 and IL-1β spike within 2–4 hours — a bystander inflammatory response that precedes any clinical symptoms. The magnitude of this early cytokine surge may correlate with absorbed dose, making it a candidate biodosimetry marker.',
      p2:'Progressive lymphopenia follows as radiosensitive lymphocyte populations are depleted. This is reflected in the declining IFN-γ trajectory — T-cell depletion abolishes the IFN-γ production capacity within 24–48 hours. The combination of early IL-6/IL-1β spike followed by falling IFN-γ is <strong>pathognomonic for radiation exposure</strong>.',
      p3:'<strong>PCT remains normal throughout — the most clinically important finding in ARS.</strong> In a mass casualty radiological event, patients presenting with fever, nausea, and elevated IL-6 would be empirically treated for infection. A normal PCT in the context of a cytokine spike and falling IFN-γ immediately redirects the diagnosis toward radiation exposure, preventing inappropriate antibiotic use and triggering G-CSF therapy.',
      boxes:[
        {title:'Biodosimetry Application', color:'#b45309', body:'The amplitude and timing of the early IL-6/IL-1β spike may be dose-dependent. Q-SENS measurement within 2–6h of suspected exposure could provide an early biological dose estimate, guiding triage decisions in mass casualty scenarios.'},
        {title:'Key Discriminator', color:'#b45309', body:'Early cytokine spike + normal PCT + falling IFN-γ is unique to ARS and is inconsistent with sepsis, VHF, or chemical exposure. This triad is the basis for ARS triage in the absence of dosimetry data.'},
      ]
    }
  },
  {
    id:'chemical', cat:'cbrn', grp:'chem', color:'#059669',
    name:'Chemical Exposure', sub:'Nerve agent / Organophosphate',
    catLabel:'CHEMICAL',
    summary:'Moderate neurogenic inflammation. Low PCT, low IFN-γ, lower amplitude than biological threats — discriminates chemical from biological in mixed-threat scenarios.',
    il6: [0.4,2,5,7,6,4,3], il10:[0.4,1,3,5,4,3,2],
    tnfa:[0.4,2,6,8,6,4,2.5], ifng:[0.4,0.5,1,2,2,1.5,1],
    il1b:[0.4,2,5,7,5,3.5,2.5], pct:[0.4,0.4,0.5,0.5,0.5,0.4,0.4],
    tags:[['Low PCT (no infection)','dt-noinfect'],['Low amplitude vs biological','dt-early'],['Neurogenic inflammation','dt-delay']],
    rationale:{
      p1:'Nerve agent (organophosphate) exposure causes acute acetylcholinesterase inhibition, triggering a neurogenic inflammatory response through excessive acetylcholine accumulation at cholinergic synapses. This produces moderate cytokine elevation dominated by IL-6 and TNF-α, reflecting macrophage activation secondary to cholinergic crisis and tissue stress.',
      p2:'The key discriminating feature is <strong>amplitude</strong>: chemical exposure produces 5–10× ULN cytokine elevation, compared to 50–300× in biological viral threats and 100–200× in severe sepsis. In a mixed-threat or ambiguous CBRN scenario, this low-amplitude pattern with normal PCT shifts the differential strongly toward chemical rather than biological exposure.',
      p3:'IFN-γ remains low throughout, reflecting the absence of intracellular pathogen recognition or viral T-cell activation. PCT stays near-normal. Q-SENS measurement within 2–4 hours of exposure provides this discrimination before agent identification is available — a critical advantage in the early minutes to hours of a suspected CBRN event.',
      boxes:[
        {title:'Mixed-Threat Discrimination', color:'#059669', body:'In a suspected CBRN event where agent identity is unknown, a moderate cytokine elevation with low PCT and low IFN-γ prioritises chemical decontamination and atropine therapy over antiviral or antibiotic intervention.'},
        {title:'Key Discriminator', color:'#059669', body:'Cytokine amplitude <10× ULN + normal PCT + low IFN-γ distinguishes chemical exposure from biological threats (10–100× higher amplitude), ARS (early spike pattern), and sepsis (rising PCT).'},
      ]
    }
  },
  // ── HEALTH CONDITIONS ────────────────────────────────
  {
    id:'ra', cat:'health', grp:'auto', color:'#c026d3',
    name:'Rheumatoid Arthritis', sub:'Inflammatory flare (days–weeks)',
    catLabel:'AUTOIMMUNE',
    summary:'IL-6 and TNF-α co-elevation — the molecular signature of RA and the direct targets of biologic therapies. Near-normal PCT distinguishes from septic arthritis.',
    T:T_HEALTH, tUnit:'days',
    il6: [3, 3.5,10,18,20,13, 6, 4], il10:[2, 2.5, 6, 9, 9, 7, 4, 3],
    tnfa:[3, 3.5,10,18,20,13, 7, 4], ifng:[1.5,  2, 4, 7, 8, 6, 3, 2],
    il1b:[2, 2.5, 7,12,14,10, 5, 3], pct: [0.7,0.7,0.8,0.9,1,0.9,0.8,0.7],
    tags:[['IL-6 + TNF-α co-elevation','dt-tnf-hi'],['Low PCT (autoimmune)','dt-noinfect'],['Biologic therapy targets visible','dt-early']],
    rationale:{
      p1:'Rheumatoid arthritis is driven by a self-sustaining synovial inflammatory cascade in which IL-6 and TNF-α are the central and co-equal mediators. Synovial fibroblasts, macrophages, and activated T-cells create a feed-forward loop of cytokine production that drives joint destruction through osteoclast activation, cartilage degradation, and pannus formation.',
      p2:'These two cytokines are not just markers — they are the <strong>direct therapeutic targets of the most effective RA biologics</strong>: tocilizumab and sarilumab target the IL-6 receptor; infliximab, adalimumab, and etanercept target TNF-α. Serial Q-SENS monitoring could guide biologic selection and track treatment response non-invasively, replacing or supplementing ESR and CRP which are indirect and non-specific.',
      p3:'<strong>PCT near-normal throughout</strong> is the critical clinical finding that distinguishes active RA from septic arthritis — a differential diagnosis that determines whether a patient receives antibiotics, joint aspiration, or biologic escalation. A PCT spike in a known RA patient should immediately prompt infection workup.',
      boxes:[
        {title:'Therapeutic Monitoring', color:'#c026d3', body:'IL-6 and TNF-α response to biologic therapy is visible within 24–48 hours of infusion. Q-SENS serial monitoring could objectively measure primary non-response (no cytokine reduction) vs secondary failure, guiding switching decisions earlier than clinical assessment alone.'},
        {title:'Key Discriminator', color:'#b45309', body:'RA produces 15–20× ULN IL-6 and TNF-α with near-normal PCT. This pattern distinguishes active autoimmune disease from superimposed infection and from the much higher amplitude cytokine storm of CBRN threats.'},
      ]
    }
  },
  {
    id:'ibd', cat:'health', grp:'auto', color:'#0284c7',
    name:"IBD / Crohn's Disease", sub:'Mucosal flare (days–weeks)',
    catLabel:'AUTOIMMUNE',
    summary:"TNF-α dominant with high IFN-γ (Th1 pathophysiology of Crohn's). First-line anti-TNF biologics target the dominant cytokine directly.",
    T:T_HEALTH, tUnit:'days',
    il6: [2, 3, 8,14,18,11, 6, 3], il10:[1.5,  2, 4, 8,10, 7, 4,2.5],
    tnfa:[3, 4,12,20,22,14, 7, 4], ifng:[2,    3, 7,12,14,10, 5,  3],
    il1b:[2, 3, 7,12,14,10, 5, 3], pct: [0.6,0.7, 1,1.5, 2,1.5, 1,0.8],
    tags:[['TNF-α dominant (anti-TNF target)','dt-tnf-hi'],['IFN-γ elevated (Th1 / Crohn\'s)','dt-ifng-hi'],['Low-mod PCT','dt-noinfect']],
    rationale:{
      p1:'Crohn\'s disease is characterised by a dysregulated Th1/Th17 mucosal immune response. TNF-α is the dominant effector cytokine, produced by lamina propria macrophages and activated T-cells in response to commensal bacterial antigens that inappropriately penetrate the damaged mucosal barrier. TNF-α sustains the inflammatory loop, impairs epithelial repair, and drives transmural inflammation characteristic of Crohn\'s.',
      p2:'IFN-γ elevation reflects the Th1 polarisation of Crohn\'s disease — a feature that distinguishes it from ulcerative colitis (more Th2/Th17 dominant) and supports the utility of IFN-γ as a differentiating marker within IBD subtypes. <strong>Anti-TNF biologics (infliximab, adalimumab) target the dominant cytokine directly</strong>, and their efficacy can be tracked by serial TNF-α measurement.',
      p3:'PCT is mildly elevated in active IBD due to mucosal barrier breach and bacterial translocation. A PCT spike above 2 ng/mL in an IBD patient should prompt investigation for abscess, perforation, or systemic infection rather than IBD flare alone. Q-SENS cytokine profiling can distinguish a pure inflammatory flare (TNF-α/IFN-γ elevated, PCT stable) from an infectious complication (PCT rising).',
      boxes:[
        {title:'Disease Activity Monitoring', color:'#0284c7', body:'Serial Q-SENS measurement during biologic induction quantifies the cytokine response objectively. Sustained TNF-α elevation despite therapy identifies primary non-responders who require switch to an alternate mechanism (vedolizumab, ustekinumab).'},
        {title:'Key Discriminator', color:'#b45309', body:'IBD shows TNF-α + IFN-γ co-elevation at 15–22× ULN with mildly elevated PCT. The IFN-γ component helps distinguish Crohn\'s from UC (lower IFN-γ) and from chemical or radiation exposure (very low IFN-γ).'},
      ]
    }
  },
  {
    id:'cancer', cat:'health', grp:'onco', color:'#7c3aed',
    name:'Cancer-Associated Inflammation', sub:'Advanced solid tumour (weeks–months)',
    catLabel:'ONCOLOGIC',
    summary:'Chronically elevated IL-6 (paraneoplastic) and IL-10 (immune evasion). Suppressed IFN-γ reflects T-cell exhaustion — the mechanism targeted by checkpoint inhibitors.',
    T:T_HEALTH, tUnit:'days',
    il6: [4,4.5,5.5, 7, 9,11,13,14], il10:[3,3.5,4.5, 6, 7,7.5, 8,8.5],
    tnfa:[2,2.5,  3, 4, 5, 6,6.5, 7], ifng:[1,  1,1.1,1.3,1.5, 2,2.5,  3],
    il1b:[2,2.5,  3, 4, 5,6.5, 7, 8], pct: [0.5,0.5,0.6,0.7,0.7,0.8,0.8,0.8],
    tags:[['High IL-10 (immune evasion)','dt-il10-hi'],['Low IFN-γ (T-cell exhaustion)','dt-exhaust'],['Normal PCT','dt-noinfect']],
    rationale:{
      p1:'Advanced solid tumours reshape the systemic immune environment through multiple overlapping mechanisms. Tumour-derived IL-6 drives paraneoplastic inflammation, cancer cachexia, and anaemia of chronic disease — its serum level correlates with tumour burden and is an independent predictor of prognosis in multiple cancer types.',
      p2:'IL-10 is produced by the tumour microenvironment (TAMs, T-regulatory cells, tumour cells directly) as an immune evasion strategy. High circulating IL-10 suppresses CD8+ T-cell proliferation, NK cell activity, and dendritic cell maturation — the very effector mechanisms required for anti-tumour immunity. <strong>The resulting low IFN-γ reflects T-cell exhaustion</strong>, the central mechanism exploited by cancers to escape immune surveillance and the target of PD-1/PD-L1 checkpoint inhibitor therapy.',
      p3:'PCT stays near-normal unless secondary infection occurs. Q-SENS is therefore directly relevant to immunotherapy monitoring: <strong>a rising IFN-γ after checkpoint inhibitor initiation signals T-cell re-engagement and predicts therapeutic response</strong>. A rising IL-6 may signal immune-related adverse events (irAEs) such as pneumonitis or colitis, prompting steroid intervention before clinical deterioration.',
      boxes:[
        {title:'Immunotherapy Monitoring', color:'#7c3aed', body:'<strong>Response prediction:</strong> rising IFN-γ within 1–2 weeks of checkpoint inhibitor therapy signals T-cell reinvigoration. <strong>irAE detection:</strong> IL-6 spike + IL-10 rise may precede clinical symptoms of immune pneumonitis or hepatitis by 24–48 hours.'},
        {title:'Key Discriminator', color:'#b45309', body:'Cancer shows chronically elevated IL-6 + IL-10 with suppressed IFN-γ — a pattern unique in the panel. This distinguishes it from infection (high IFN-γ), RA (high TNF-α with normal IL-10), and ARS (early spike pattern). Normal PCT excludes concurrent bacterial infection.'},
      ]
    }
  },
  {
    id:'mdd', cat:'health', grp:'psych', color:'#db2777',
    name:'Major Depressive Disorder', sub:'Inflammatory subtype (weeks–months)',
    catLabel:'PSYCHIATRIC',
    summary:'Mild, persistent IL-6 / TNF-α / IL-1β elevation seen in roughly a quarter to a third of MDD patients — an order of magnitude smaller than autoimmune or oncologic elevations, with normal PCT.',
    T:T_MDD, tUnit:'days',
    il6: [1.0,1.0,1.6,1.6,1.7,1.7,1.8,1.8,1.9,1.9], il10:[1.0,1.0,0.9,0.9,0.85,0.85,0.85,0.8,0.8,0.8],
    tnfa:[1.0,1.0,1.4,1.4,1.5,1.5,1.5,1.6,1.6,1.6], ifng:[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],
    il1b:[1.0,1.0,1.2,1.2,1.3,1.3,1.3,1.4,1.4,1.4], pct: [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],
    tags:[['IL-6 / TNF-α mildly elevated','dt-tnf-hi'],['Normal PCT (non-infectious)','dt-noinfect'],['~25–30% of MDD show this profile','dt-early']],
    rationale:{
      p1:'A substantial body of meta-analytic evidence (Dowlati et al. 2010; Köhler et al. 2017; Osimo et al. 2020) finds that a subset of patients with major depressive disorder have modestly elevated circulating IL-6, TNF-α, IL-1β, and CRP relative to non-depressed controls. The effect sizes are small to moderate — typically 1.2–2× rather than the 10–300× elevations seen in infection or cytokine-storm states — and are not present in all patients with MDD.',
      p2:'The proposed mechanism links peripheral cytokine signalling to depressive symptoms via several pathways: activation of the kynurenine pathway diverts tryptophan away from serotonin synthesis toward neuroactive (and at high levels, neurotoxic) metabolites; IL-6 and TNF-α can activate microglia and alter neurotransmission and neuroplasticity; and chronic low-grade inflammation is associated with HPA-axis dysregulation seen in melancholic depression. <strong>This is sometimes called the "cytokine hypothesis" or "inflammatory subtype" of depression</strong> — it is one contributing pathway among many, not a unifying mechanism for all MDD.',
      p3:'<strong>PCT remains normal</strong>, which is the key feature distinguishing this pattern from an infectious or sickness-behaviour process that can present with depressive-like symptoms (fatigue, anhedonia, withdrawal). Clinically, elevated baseline CRP/IL-6 has been associated in some trials with reduced response to standard SSRIs and with greater benefit from anti-inflammatory adjuncts (e.g. omega-3 fatty acids, celecoxib) — though IL-6-pathway biologics (e.g. tocilizumab) have shown mixed results in depression trials and are not an established treatment.',
      boxes:[
        {title:'Treatment Stratification (Investigational)', color:'#db2777', body:'Some trials suggest patients with elevated baseline CRP/IL-6 are less likely to respond to SSRIs alone and may benefit more from anti-inflammatory augmentation. This remains a research question, not standard of care — Q-SENS profiling here is illustrative of a possible future stratification tool, not a validated diagnostic.'},
        {title:'Key Discriminator', color:'#b45309', body:'Amplitude is the tell: MDD\'s inflammatory subtype produces 1.2–2× ULN elevations, roughly an order of magnitude below RA, IBD, or cancer-associated inflammation (10–20×), and far below acute infectious or CBRN cytokine storms (50–300×). Normal PCT excludes an infectious driver of the symptom picture.'},
      ]
    }
  },
];

const CBRN_IDS   = ['sepsis','vhf','hantavirus','ars','chemical'];
const HEALTH_IDS = ['ra','ibd','cancer','mdd'];

const GRP_META = {
  sepsis:{label:'SEPSIS',       color:'#0284c7'},
  bio:   {label:'BIOLOGICAL',   color:'#dc2626'},
  rad:   {label:'RADIOLOGICAL', color:'#b45309'},
  chem:  {label:'CHEMICAL',     color:'#059669'},
  auto:  {label:'AUTOIMMUNE',   color:'#c026d3'},
  onco:  {label:'ONCOLOGIC',    color:'#7c3aed'},
  psych: {label:'PSYCHIATRIC',  color:'#db2777'},
};

// ═══════════════════════════════════════════════════════
// STATE & HELPERS
// ═══════════════════════════════════════════════════════
const state = {
  condIdCBRN:'sepsis',
  condIdHealth:'ra',
  severity:'moderate', age:35, sex:'M', bmi:24,
  vaccinated:false, immunosupp:false,
  timeCBRN:24, timeHealth:14,
};

const getCond       = id => ALL_CONDITIONS.find(c=>c.id===id);
const currentCBRN   = ()  => getCond(state.condIdCBRN);
const currentHealth = ()  => getCond(state.condIdHealth);
const getT          = cond => cond.T || T_CBRN;

const fmtTime = (t, cat) => {
  if(cat==='cbrn') return `${t} h`;
  if(t<7)  return `${t}d`;
  if(t<30) return `${Math.round(t/7)}w`;
  return `${Math.round(t/30)}mo`;
};

// ═══════════════════════════════════════════════════════
// INTERPOLATION (Catmull-Rom)
// ═══════════════════════════════════════════════════════
function cm(p0,p1,p2,p3,t){
  const t2=t*t,t3=t2*t;
  return .5*(2*p1+(-p0+p2)*t+(2*p0-5*p1+4*p2-p3)*t2+(-p0+3*p1-3*p2+p3)*t3);
}
function interp(vals,h,Tv){
  const Tarr=Tv||T_CBRN;
  if(h<=Tarr[0])return vals[0];
  if(h>=Tarr[Tarr.length-1])return vals[Tarr.length-1];
  let i=0;
  while(i<Tarr.length-1&&Tarr[i+1]<=h)i++;
  const t=(h-Tarr[i])/(Tarr[i+1]-Tarr[i]);
  return Math.max(0.05,cm(vals[Math.max(0,i-1)],vals[i],vals[i+1],vals[Math.min(vals.length-1,i+2)],t));
}

// ═══════════════════════════════════════════════════════
// MODIFIERS
// ═══════════════════════════════════════════════════════
function applyMods(raw,mk,grp){
  if(raw<=0.55)return raw;
  const {severity,age,sex,bmi,vaccinated,immunosupp}=state;
  let m={mild:.35,moderate:1,severe:2.6}[severity];
  if(mk!=='pct'){
    if(age>65)m*=.62; else if(age>55)m*=.82; else if(age<25)m*=1.12;
  }
  if(sex==='F'&&['il6','tnfa','il1b'].includes(mk))m*=1.18;
  if(mk==='il6'&&bmi>=30)m*=1+(bmi-30)*.02;
  if(vaccinated&&grp==='bio'){
    if(['ifng','tnfa'].includes(mk))m*=.52;
    else if(mk==='il6')m*=.62;
  }
  if(immunosupp&&mk!=='pct')m*=.42;
  return Math.min(raw*m,{il6:2500,il10:800,tnfa:600,ifng:600,il1b:400,pct:400}[mk]||500);
}

function getFold(cond,mk,h){
  return applyMods(interp(cond[mk.key],h,getT(cond)),mk.key,cond.grp);
}
function foldsAt(cond,h){return MARKERS.map(mk=>getFold(cond,mk,h));}

// ═══════════════════════════════════════════════════════
// HEATMAP COLOR
// ═══════════════════════════════════════════════════════
const STOPS=[
  [-1.3,[248,250,252]],[-0.3,[186,230,253]],[0,[56,189,248]],
  [0.7,[251,191,36]],[1.1,[239,68,68]],[1.7,[126,34,206]],[2.3,[76,29,149]],
];
function lerpRGB(a,b,t){return[0,1,2].map(i=>Math.round(a[i]+t*(b[i]-a[i])));}
function foldBg(f){
  const lf=Math.log10(Math.max(0.05,f));
  let i=0;while(i<STOPS.length-1&&STOPS[i+1][0]<=lf)i++;
  if(i>=STOPS.length-1){const[r,g,b]=STOPS[STOPS.length-1][1];return`rgb(${r},${g},${b})`;}
  const t=(lf-STOPS[i][0])/(STOPS[i+1][0]-STOPS[i][0]);
  const[r,g,b]=lerpRGB(STOPS[i][1],STOPS[i+1][1],t);return`rgb(${r},${g},${b})`;
}
function foldFg(f){
  const lf=Math.log10(Math.max(0.05,f));
  let i=0;while(i<STOPS.length-1&&STOPS[i+1][0]<=lf)i++;
  const t=i>=STOPS.length-1?1:(lf-STOPS[i][0])/(STOPS[i+1][0]-STOPS[i][0]);
  const[r,g,b]=i>=STOPS.length-1?STOPS[STOPS.length-1][1]:lerpRGB(STOPS[i][1],STOPS[i+1][1],t);
  return(r*.3+g*.6+b*.1)>140?'#0f172a':'#ffffff';
}

// ═══════════════════════════════════════════════════════
// CHARTS
// ═══════════════════════════════════════════════════════
const HOURS = Array.from({length:73},(_,i)=>i);
const DAYS  = Array.from({length:101},(_,i)=>i-10); // -10..90, extra range shows pre-onset baseline
let chartCBRN   = null;
let chartHealth = null;

const cbrnCursorPlugin = {
  id:'cur-cbrn',
  afterDraw(c){
    const x=c.scales.x.getPixelForValue(state.timeCBRN);
    const{top,bottom}=c.chartArea;
    c.ctx.save();
    c.ctx.beginPath();c.ctx.moveTo(x,top);c.ctx.lineTo(x,bottom);
    c.ctx.strokeStyle='rgba(71,85,105,0.3)';c.ctx.lineWidth=2;
    c.ctx.setLineDash([4,4]);c.ctx.stroke();c.ctx.restore();
  }
};

const healthCursorPlugin = {
  id:'cur-health',
  afterDraw(c){
    const x=c.scales.x.getPixelForValue(state.timeHealth);
    const{top,bottom}=c.chartArea;
    c.ctx.save();
    c.ctx.beginPath();c.ctx.moveTo(x,top);c.ctx.lineTo(x,bottom);
    c.ctx.strokeStyle='rgba(71,85,105,0.3)';c.ctx.lineWidth=2;
    c.ctx.setLineDash([4,4]);c.ctx.stroke();c.ctx.restore();
  }
};

const phasePlugin = {
  id:'ph',
  beforeDatasetsDraw(c){
    const{ctx,chartArea:{left,right,top,bottom},scales}=c;
    const x24=scales.x.getPixelForValue(24);
    ctx.save();
    ctx.fillStyle='rgba(2,132,199,0.03)';ctx.fillRect(left,top,x24-left,bottom-top);
    ctx.fillStyle='rgba(220,38,38,0.02)';ctx.fillRect(x24,top,right-x24,bottom-top);
    ctx.beginPath();ctx.moveTo(x24,top);ctx.lineTo(x24,bottom);
    ctx.strokeStyle='rgba(71,85,105,0.2)';ctx.lineWidth=1;
    ctx.setLineDash([6,6]);ctx.stroke();ctx.setLineDash([]);
    ctx.restore();
  }
};

const monoFont = "'IBM Plex Mono',monospace";
const axisColor = '#737373'; 
const gridColor = '#e6e6e6'; 

function getGradient(ctx, chartArea, color) {
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, color + '20'); // 12% opacity
  gradient.addColorStop(1, color + '00'); // 0% opacity
  return gradient;
}

function buildChartCBRN(){
  const ctx=document.getElementById('mainChartCBRN').getContext('2d');
  const c=currentCBRN();
  const ds=MARKERS.map(mk=>({
    label:mk.label,
    data:HOURS.map(h=>getFold(c,mk,h)),
    borderColor:mk.color,
    borderDash: mk.dash,
    backgroundColor: function(context) {
      const chart = context.chart;
      const {ctx, chartArea} = chart;
      if (!chartArea) return null;
      return getGradient(ctx, chartArea, mk.color);
    },
    borderWidth: 3,
    pointRadius: 2, 
    pointBackgroundColor: '#ffffff', 
    pointBorderColor: mk.color, 
    pointBorderWidth: 2, 
    pointHoverRadius: 5, 
    pointHoverBackgroundColor: mk.color,
    tension: 0.4,
    fill: true,
  }));
  ds.push({label:'_uln',data:HOURS.map(()=>1),borderColor:'rgba(71,85,105,0.4)',
    borderWidth:1.5,borderDash:[5,5],pointRadius:0,fill:false});
  if(chartCBRN)chartCBRN.destroy();
  chartCBRN=new Chart(ctx,{
    type:'line',plugins:[phasePlugin,cbrnCursorPlugin],
    data:{labels:HOURS,datasets:ds},
    options:{
      responsive:true,maintainAspectRatio:false,animation:{duration:400, easing: 'easeOutQuart'},
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        tooltip:{
          backgroundColor:'rgba(255,255,255,0.95)',
          titleColor: '#0f172a', bodyColor: '#475569',
          borderColor:'rgba(226,232,240,1)',borderWidth:1,padding:12,
          titleFont: {family: monoFont, size: 13},
          bodyFont: {family: monoFont, size: 12, weight: 600},
          boxPadding: 6,
          usePointStyle: true,
          callbacks:{
            title:i=>`${i[0].label} h`,
            label:i=>{
              if(i.dataset.label==='_uln')return null;
              const mk=MARKERS.find(m=>m.label===i.dataset.label);
              if(!mk)return null;
              const f=i.raw,conc=f*mk.uln;
              return ` ${mk.label}: ${f.toFixed(1)}× ULN  (${conc.toFixed(conc<10?2:0)} ${mk.unit})`;
            }
          }
        }
      },
      scales:{
        x:{type:'linear',min:0,max:72,
          title:{display:true,text:'Hours post symptom onset',color:axisColor,font:{size:12,family:monoFont, weight: 600}},
          ticks:{color:axisColor,font:{size:11,family:monoFont},stepSize:12,callback:v=>v+'h'},
          grid:{color:gridColor, tickLength: 8}},
        y:{type:'linear',min:0,
          title:{display:true,text:'Fold above ULN',color:axisColor,font:{size:12,family:monoFont, weight: 600}},
          ticks:{color:axisColor,font:{size:11,family:monoFont},maxTicksLimit:8,callback:v=>v+'×'},
          grid:{color:gridColor, tickLength: 8, borderDash: [4, 4]}}
      }
    }
  });
}

function buildChartHealth(){
  const ctx=document.getElementById('mainChartHealth').getContext('2d');
  const c=currentHealth();
  const ds=MARKERS.map(mk=>({
    label:mk.label,
    data:DAYS.map(h=>getFold(c,mk,h)),
    borderColor:mk.color,
    borderDash: mk.dash,
    backgroundColor: function(context) {
      const chart = context.chart;
      const {ctx, chartArea} = chart;
      if (!chartArea) return null;
      return getGradient(ctx, chartArea, mk.color);
    },
    borderWidth: 3,
    pointRadius: 2, 
    pointBackgroundColor: '#ffffff', 
    pointBorderColor: mk.color, 
    pointBorderWidth: 2, 
    pointHoverRadius: 5, 
    pointHoverBackgroundColor: mk.color,
    tension: 0.4,
    fill: true,
  }));
  ds.push({label:'_uln',data:DAYS.map(()=>1),borderColor:'rgba(71,85,105,0.4)',
    borderWidth:1.5,borderDash:[5,5],pointRadius:0,fill:false});
  if(chartHealth)chartHealth.destroy();
  chartHealth=new Chart(ctx,{
    type:'line',plugins:[healthCursorPlugin],
    data:{labels:DAYS,datasets:ds},
    options:{
      responsive:true,maintainAspectRatio:false,animation:{duration:400, easing: 'easeOutQuart'},
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        tooltip:{
          backgroundColor:'rgba(255,255,255,0.95)',
          titleColor: '#0f172a', bodyColor: '#475569',
          borderColor:'rgba(226,232,240,1)',borderWidth:1,padding:12,
          titleFont: {family: monoFont, size: 13},
          bodyFont: {family: monoFont, size: 12, weight: 600},
          boxPadding: 6,
          usePointStyle: true,
          callbacks:{
            title:i=>fmtTime(i[0].label,'health'),
            label:i=>{
              if(i.dataset.label==='_uln')return null;
              const mk=MARKERS.find(m=>m.label===i.dataset.label);
              if(!mk)return null;
              const f=i.raw,conc=f*mk.uln;
              return ` ${mk.label}: ${f.toFixed(1)}× ULN  (${conc.toFixed(conc<10?2:0)} ${mk.unit})`;
            }
          }
        }
      },
      scales:{
        x:{type:'linear',min:-10,max:90,
          title:{display:true,text:'Days from onset / disease activity',color:axisColor,font:{size:12,family:monoFont, weight: 600}},
          ticks:{color:axisColor,font:{size:11,family:monoFont},
            callback:v=>{const m={'-10':'-10d','-5':'-5d',0:'Onset',3:'3d',7:'1w',12:'12d',20:'3w',35:'5w',60:'2mo',90:'3mo'};return m[v]??null;}},
          grid:{color:gridColor, tickLength: 8}},
        y:{type:'linear',min:0,
          title:{display:true,text:'Fold above ULN',color:axisColor,font:{size:12,family:monoFont, weight: 600}},
          ticks:{color:axisColor,font:{size:11,family:monoFont},maxTicksLimit:8,callback:v=>v+'×'},
          grid:{color:gridColor, tickLength: 8, borderDash: [4, 4]}}
      }
    }
  });
}

// ═══════════════════════════════════════════════════════
// BUILD UI COMPONENTS
// ═══════════════════════════════════════════════════════
function buildLegend(containerId){
  document.getElementById(containerId).innerHTML=
    MARKERS.map(mk=>{
      let style=`border-bottom: 3px solid ${mk.color};`;
      if(mk.dash.length) style+=` border-bottom-style: dashed;`; 
      return `<div class="legend-item" title="${mk.label}"><div class="legend-swatch" style="${style}"></div>${mk.label}</div>`;
    }).join('')+
    `<div class="legend-item"><div class="legend-swatch" style="border-bottom: 2px dashed rgba(71,85,105,0.5);"></div>1× ULN</div>`;
}

function buildMarkerCards(containerId, prefix){
  document.getElementById(containerId).innerHTML=MARKERS.map(mk=>`
    <div class="card mcard" style="border-left-color: ${mk.color}">
      <div class="mcard-top">
        <div class="mcard-name" style="color:${mk.color}">${mk.label}</div>
        <div class="mcard-unit">${mk.unit}</div>
      </div>
      <div class="mcard-val" id="${prefix}-mv-${mk.key}">—</div>
      <div class="mcard-fold" id="${prefix}-mf-${mk.key}">—</div>
      <div class="mbar-bg"><div class="mbar" id="${prefix}-mb-${mk.key}" style="background:${mk.color}"></div></div>
    </div>`).join('');
}

function buildPanelMarkers(){
  document.getElementById('markersGrid').innerHTML=PANEL_DESC.map(m=>`
    <div class="card mk-card" style="border-left-color:${m.color}">
      <div class="mk-name" style="color:${m.color}">${MARKERS.find(x=>x.key===m.key).label}</div>
      <div class="mk-tagline">${m.tagline}</div>
      <div class="mk-body">${m.body}</div>
      <div class="mk-uln">${m.uln}</div>
    </div>`).join('');
}

function buildCondCardsCBRN(){
  document.getElementById('condCardsCBRN').innerHTML=CBRN_IDS.map(id=>{
    const c=getCond(id);
    const active=id===state.condIdCBRN?' active':'';
    return `<div class="card cond-card${active}" style="--cond-color:${c.color}" onclick="selectCondCBRN('${id}')">
      <div class="cond-dot" style="background:${c.color}"></div>
      <div>
        <div class="cond-card-name">${c.name}</div>
        <div class="cond-card-sub">${c.sub}</div>
      </div>
    </div>`;
  }).join('');
}

function buildCondCardsHealth(){
  document.getElementById('condCardsHealth').innerHTML=HEALTH_IDS.map(id=>{
    const c=getCond(id);
    const active=id===state.condIdHealth?' active':'';
    return `<div class="card cond-card${active}" style="--cond-color:${c.color}" onclick="selectCondHealth('${id}')">
      <div class="cond-dot" style="background:${c.color}"></div>
      <div>
        <div class="cond-card-name">${c.name}</div>
        <div class="cond-card-sub">${c.sub}</div>
      </div>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════
// UPDATE FUNCTIONS
// ═══════════════════════════════════════════════════════
function updateMarkerCards(cond, t, prefix, timeLabelId){
  const folds=foldsAt(cond,t);
  document.getElementById(timeLabelId).textContent=
    cond.cat==='cbrn'?fmtTime(t,'cbrn'):fmtTime(t,'health');
  MARKERS.forEach((mk,i)=>{
    const fold=folds[i],conc=fold*mk.uln;
    const pct=Math.min(100,Math.max(0,(Math.log10(fold)-Math.log10(.05))/(Math.log10(800)-Math.log10(.05))*100));
    const cs=mk.key==='pct'?(conc<.1?conc.toFixed(3):conc.toFixed(2)):(conc<10?conc.toFixed(1):conc.toFixed(0));
    document.getElementById(`${prefix}-mv-${mk.key}`).textContent=cs;
    document.getElementById(`${prefix}-mf-${mk.key}`).textContent=`${fold.toFixed(1)}× ULN`;
    document.getElementById(`${prefix}-mb-${mk.key}`).style.width=`${pct}%`;
  });
}

function updateChartMeta(cond, tagId, summaryId, discTagsId){
  document.getElementById(tagId).textContent=cond.name;
  document.getElementById(tagId).style.cssText=`color:${cond.color};border-color:${cond.color};background:${cond.color}15;`;
  document.getElementById(summaryId).textContent=cond.summary;
  document.getElementById(discTagsId).innerHTML=cond.tags.map(([l,cl])=>
    `<span class="disc-tag">${l}</span>`).join(''); 
}

function updateRationale(cond, dotId, nameId, catId, textId, rightId){
  const r=cond.rationale;
  document.getElementById(dotId).style.background=cond.color;
  document.getElementById(nameId).textContent=cond.name;
  document.getElementById(catId).textContent=cond.sub;
  document.getElementById(textId).innerHTML=[r.p1,r.p2,r.p3].map(p=>`<p>${p}</p>`).join('');
  document.getElementById(rightId).innerHTML=r.boxes.map(b=>`
    <div class="rat-box" style="border-left: 4px solid ${b.color}">
      <div class="rat-box-title" style="color:${b.color}">${b.title}</div>
      <div class="rat-box-body">${b.body}</div>
    </div>`).join('');
}

function updatePhaseCBRN(){
  const h=state.timeCBRN;
  const p=['Pre-onset','Early Prodrome','Early Response','Developing','Established','Sustained','Late Phase'];
  let i=0;
  if(h>=60)i=6;else if(h>=36)i=5;else if(h>=18)i=4;else if(h>=9)i=3;else if(h>=4)i=2;else if(h>=1)i=1;
  document.getElementById('timePhaseCBRN').textContent=p[i];
}

function renderHeatmapRows(ids, h, bodyId, selectedId){
  let lastGrp=null;
  document.getElementById(bodyId).innerHTML=ids.map(id=>{
    const cond=getCond(id);
    let divider='';
    if(cond.grp!==lastGrp){
      lastGrp=cond.grp;
      const gm=GRP_META[cond.grp];
      divider=`<tr class="hmap-grp-row"><td colspan="8" style="color:${gm.color}">${gm.label}</td></tr>`;
    }
    const folds=foldsAt(cond,h);
    const sel=cond.id===selectedId?' selected':'';
    const gm=GRP_META[cond.grp];
    let row=`${divider}<tr class="hmap-row${sel}" onclick="${cond.cat==='cbrn'?'selectCondCBRN':'selectCondHealth'}('${id}')">`;
    row+=`<td class="td-cond"><span class="cn">${cond.name}</span><span class="cs">${cond.sub}</span></td>`;
    row+=`<td class="td-cat"><span class="cat-pill" style="color:${gm.color};border-color:${gm.color}50;background:${gm.color}15">${cond.catLabel}</span></td>`;
    folds.forEach((fold,i)=>{
      const mk=MARKERS[i];
      const bg=foldBg(fold),fg=foldFg(fold);
      const conc=fold*mk.uln;
      const fs=fold>=100?Math.round(fold)+'×':fold>=10?fold.toFixed(0)+'×':fold.toFixed(1)+'×';
      const cs=mk.key==='pct'?conc.toFixed(3)+' ng/mL':conc.toFixed(1)+' pg/mL';
      row+=`<td class="td-val" style="background:${bg};color:${fg}" title="${mk.label}: ${fs} (${cs})">
        <span class="vf">${fs}</span><span class="vc">${cs}</span></td>`;
    });
    row+='</tr>';
    return row;
  }).join('');
}

function updateCBRNHeatmap(){
  document.getElementById('hmapCBRNLabel').textContent=`${state.timeCBRN} h`;
  document.getElementById('hmapCBRNSlider').value=state.timeCBRN;
  renderHeatmapRows(CBRN_IDS, state.timeCBRN, 'hmapBodyCBRN', state.condIdCBRN);
}

function updateHealthHeatmap(){
  document.getElementById('hmapHealthLabel').textContent=fmtTime(state.timeHealth,'health');
  document.getElementById('hmapHealthSlider').value=state.timeHealth;
  renderHeatmapRows(HEALTH_IDS, state.timeHealth, 'hmapBodyHealth', state.condIdHealth);
}

function updateAllCBRN(){
  buildChartCBRN();
  updateChartMeta(currentCBRN(),'condTagCBRN','chartSummaryCBRN','discTagsCBRN');
  updateMarkerCards(currentCBRN(),state.timeCBRN,'cbrn','valTimeLabelCBRN');
  updateCBRNHeatmap();
  updateRationale(currentCBRN(),'ratDotCBRN','ratNameCBRN','ratCatCBRN','ratTextCBRN','ratRightCBRN');
  updatePhaseCBRN();
}

function updateAllHealth(){
  buildChartHealth();
  updateChartMeta(currentHealth(),'condTagHealth','chartSummaryHealth','discTagsHealth');
  updateMarkerCards(currentHealth(),state.timeHealth,'hlth','valTimeLabelHealth');
  updateHealthHeatmap();
  updateRationale(currentHealth(),'ratDotHealth','ratNameHealth','ratCatHealth','ratTextHealth','ratRightHealth');
}

function updateAll(){
  updateAllCBRN();
  updateAllHealth();
}

// ═══════════════════════════════════════════════════════
// EVENT HANDLERS
// ═══════════════════════════════════════════════════════
function selectCondCBRN(id){
  state.condIdCBRN=id;
  buildCondCardsCBRN();
  updateAllCBRN();
}

function selectCondHealth(id){
  state.condIdHealth=id;
  buildCondCardsHealth();
  updateAllHealth();
}

function setSev(s){
  state.severity=s;
  ['mild','moderate','severe'].forEach(sv=>{
    const map={mild:'sevMild',moderate:'sevMod',severe:'sevSev'};
    document.getElementById(map[sv]).classList.toggle('active',sv===s);
  });
  updateAll();
}
function setSex(s){
  state.sex=s;
  document.getElementById('sexM').classList.toggle('active',s==='M');
  document.getElementById('sexF').classList.toggle('active',s==='F');
  updateAll();
}
function setIms(v){
  state.immunosupp=v;
  document.getElementById('imsN').classList.toggle('active',!v);
  document.getElementById('imsY').classList.toggle('active',v);
  updateAll();
}
function setVac(v){
  state.vaccinated=v;
  document.getElementById('vacN').classList.toggle('active',!v);
  document.getElementById('vacY').classList.toggle('active',v);
  updateAll();
}

// ═══════════════════════════════════════════════════════
// VIEW TOGGLE
// ═══════════════════════════════════════════════════════
function setView(view) {
  const cbrnHalf = document.getElementById('cbrnHalf');
  const hlthHalf = document.getElementById('hlthHalf');
  const btnCBRN  = document.getElementById('btnViewCBRN');
  const btnHlth  = document.getElementById('btnViewHlth');

  if (view === 'cbrn') {
    cbrnHalf.style.display = '';
    hlthHalf.style.display = 'none';
    btnCBRN.classList.add('active');
    btnHlth.classList.remove('active');
    buildChartCBRN();
    updateChartMeta(currentCBRN(),'condTagCBRN','chartSummaryCBRN','discTagsCBRN');
    if (chartCBRN) chartCBRN.update('none');
  } else {
    cbrnHalf.style.display = 'none';
    hlthHalf.style.display = '';
    btnCBRN.classList.remove('active');
    btnHlth.classList.add('active');
    buildChartHealth();
    updateChartMeta(currentHealth(),'condTagHealth','chartSummaryHealth','discTagsHealth');
    if (chartHealth) chartHealth.update('none');
  }
}

// ═══════════════════════════════════════════════════════
// DESIGN-SYSTEM COLOR OVERRIDES (muted, monochrome-aligned)
// ═══════════════════════════════════════════════════════
(function(){
  const _MKC={il6:'#a23b32',il10:'#36506b',tnfa:'#9a6a00',ifng:'#2f7d52',il1b:'#5d4b8c',pct:'#7a6a55'};
  MARKERS.forEach(m=>{ if(_MKC[m.key]) m.color=_MKC[m.key]; });
  PANEL_DESC.forEach(m=>{ if(_MKC[m.key]) m.color=_MKC[m.key]; });
  // Heatmap intensity → monochrome ink ramp (pale paper → near-black)
  STOPS.length=0;
  STOPS.push([-1.3,[247,247,247]],[0,[226,226,226]],[0.7,[182,182,182]],[1.1,[135,135,135]],[1.7,[74,74,74]],[2.3,[18,18,18]]);
  // Conditions + categories → neutral ink (selection shown structurally, not by hue)
  ALL_CONDITIONS.forEach(c=>{ c.color='#0a0a0a'; if(c.rationale&&c.rationale.boxes) c.rationale.boxes.forEach(b=>b.color='#0a0a0a'); });
  Object.keys(GRP_META).forEach(k=>{ GRP_META[k].color='#6b6b6b'; });
})();

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded',()=>{
  buildLegend('chartLegendCBRN');
  buildLegend('chartLegendHealth');
  buildCondCardsCBRN();
  buildCondCardsHealth();
  buildMarkerCards('markerGridCBRN','cbrn');
  buildMarkerCards('markerGridHealth','hlth');
  buildPanelMarkers();
  
  // Set default view to Health (Inflammatory)
  setView('health');
  updateAll(); // Initializes data and rationale for both views

  // CBRN time slider
  document.getElementById('timeSliderCBRN').addEventListener('input',function(){
    state.timeCBRN=+this.value;
    document.getElementById('timeValCBRN').textContent=fmtTime(state.timeCBRN,'cbrn');
    updatePhaseCBRN();
    updateMarkerCards(currentCBRN(),state.timeCBRN,'cbrn','valTimeLabelCBRN');
    updateCBRNHeatmap();
    if(chartCBRN)chartCBRN.update('none');
  });

  // Health time slider
  document.getElementById('timeSliderHealth').addEventListener('input',function(){
    state.timeHealth=+this.value;
    document.getElementById('timeValHealth').textContent=fmtTime(state.timeHealth,'health');
    updateMarkerCards(currentHealth(),state.timeHealth,'hlth','valTimeLabelHealth');
    updateHealthHeatmap();
    if(chartHealth)chartHealth.update('none');
  });

  // Heatmap CBRN slider (synced)
  document.getElementById('hmapCBRNSlider').addEventListener('input',function(){
    state.timeCBRN=+this.value;
    document.getElementById('timeSliderCBRN').value=state.timeCBRN;
    document.getElementById('timeValCBRN').textContent=fmtTime(state.timeCBRN,'cbrn');
    updatePhaseCBRN();
    updateMarkerCards(currentCBRN(),state.timeCBRN,'cbrn','valTimeLabelCBRN');
    updateCBRNHeatmap();
    if(chartCBRN)chartCBRN.update('none');
  });

  // Heatmap Health slider (synced)
  document.getElementById('hmapHealthSlider').addEventListener('input',function(){
    state.timeHealth=+this.value;
    document.getElementById('timeSliderHealth').value=state.timeHealth;
    document.getElementById('timeValHealth').textContent=fmtTime(state.timeHealth,'health');
    updateMarkerCards(currentHealth(),state.timeHealth,'hlth','valTimeLabelHealth');
    updateHealthHeatmap();
    if(chartHealth)chartHealth.update('none');
  });

  // Age slider
  document.getElementById('ageSlider').addEventListener('input',function(){
    state.age=+this.value;
    document.getElementById('ageVal').textContent=`${state.age} yr`;
    updateAll();
  });

  // BMI slider
  document.getElementById('bmiSlider').addEventListener('input',function(){
    state.bmi=+this.value;
    document.getElementById('bmiVal').textContent=this.value;
    updateAll();
  });

  // ==========================================
  // BUG FIX: Programmatic Slider Nudge on Load
  // ==========================================
  const healthSlider = document.getElementById('hmapHealthSlider');
  if (healthSlider) {
    healthSlider.dispatchEvent(new Event('input'));
  }
  
  const cbrnSlider = document.getElementById('hmapCBRNSlider');
  if (cbrnSlider) {
    cbrnSlider.dispatchEvent(new Event('input'));
  }
});
