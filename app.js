'use strict';
const JSON_SCHEMA_VERSION='1.1';
const $=s=>document.querySelector(s), uid=()=>crypto.randomUUID?.()||Math.random().toString(36).slice(2);
const professionCatalog=Object.freeze([{"type": "section", "name": "--- Profesie základné ---"}, {"type": "item", "code": "ASR", "name": "Architektonicko-stavebné riešenie"}, {"type": "item", "code": "STA", "name": "Statika"}, {"type": "item", "code": "ZTI", "name": "Zdravotechnická inštalácia"}, {"type": "item", "code": "VYK", "name": "Vykurovanie"}, {"type": "item", "code": "PLY", "name": "Plynoinštalácia"}, {"type": "item", "code": "VZT", "name": "Vzduchotechnika a chladenie"}, {"type": "item", "code": "MAR", "name": "Meranie a regulácia"}, {"type": "item", "code": "ELI", "name": "Elektroinštalácia"}, {"type": "item", "code": "BLZ", "name": "Bleskozvod a uzemnenie"}, {"type": "item", "code": "SLP", "name": "Slaboprúdová inštalácia, Štruktúrované káblové rozvody"}, {"type": "item", "code": "HSP", "name": "Hlasová signalizácia požiaru"}, {"type": "item", "code": "EPS", "name": "Elektrická požiarna signalizácia"}, {"type": "item", "code": "SHZ", "name": "Stabilné hasiace zariadenia"}, {"type": "item", "code": "ODT", "name": "Zariadenie na odvod dymu a tepla"}, {"type": "item", "code": "USV", "name": "Umelé osvetlenie"}, {"type": "item", "code": "KRA", "name": "Krajinné, sadové a terénne úpravy"}, {"type": "item", "code": "DOP", "name": "Dopravné riešenie"}, {"type": "item", "code": "POD", "name": "Projekt organizácie dopravy"}, {"type": "item", "code": "COO", "name": "Civilná ochrana obyvateľstva"}, {"type": "item", "code": "TDZ", "name": "Trvalé dopravné značenie"}, {"type": "item", "code": "DDZ", "name": "Dočasné dopravné značenie"}, {"type": "section", "name": "--- Profesie areálové ---"}, {"type": "item", "code": "PNN", "name": "Elektrická prípojka nízkeho napätia"}, {"type": "item", "code": "PVN", "name": "Elektrická prípojka vysokého napätia"}, {"type": "item", "code": "VUO", "name": "Vonkajšie / verejné osvetlenie"}, {"type": "item", "code": "ARS", "name": "Areálové / miestne rozvody silnoprúdu"}, {"type": "item", "code": "AEK", "name": "Areálové / miestne rozvody elektronických komunikácií"}, {"type": "item", "code": "REK", "name": "Rozvody elektronických komunikácií"}, {"type": "item", "code": "VDS", "name": "Vedenia distribučnej sústavy"}, {"type": "section", "name": "--- Profesie špecializované ---"}, {"type": "item", "code": "BK", "name": "Betónové konštrukcie"}, {"type": "item", "code": "OK", "name": "Oceľové konštrukcie"}, {"type": "item", "code": "SKV", "name": "Systém kontroly vstupu"}, {"type": "item", "code": "EZS", "name": "Elektrická zabezpečovacia signalizácia"}, {"type": "item", "code": "UTO", "name": "Uzatvorený televízny okruh (CCIR)"}, {"type": "item", "code": "HSR", "name": "Hotelový systém riadenia"}, {"type": "item", "code": "NKS", "name": "Nemocničný komunikačný systém"}, {"type": "item", "code": "SKR", "name": "Systém riadenia procesov (SRTP, ASRTP, SKR)"}, {"type": "item", "code": "CRS", "name": "Centrálne riadiace systémy budov (BMS)"}, {"type": "item", "code": "ADR", "name": "Automatický systém dispečerského riadenia (ASDR)"}, {"type": "item", "code": "ZDT", "name": "Zdravotnícka technológia"}, {"type": "item", "code": "RTG", "name": "Projekt radiačnej ochrany"}, {"type": "item", "code": "MED", "name": "Medicinálne plyny"}, {"type": "item", "code": "TGZ", "name": "Výrobné technologické zariadenia"}, {"type": "item", "code": "ETS", "name": "Elektrická stanica"}, {"type": "item", "code": "PRS", "name": "Prevádzkový rozvod silnoprúdu"}, {"type": "item", "code": "NZE", "name": "Náhradný zdroj (elektrickej energie)"}, {"type": "item", "code": "FVZ", "name": "Fotovoltický zdroj (výkon meniča do 10 kW)"}, {"type": "item", "code": "FVE", "name": "Fotovoltická elektráreň (výkon meniča nad 10 kW)"}, {"type": "item", "code": "KGZ", "name": "Kogeneračný zdroj / KVET"}, {"type": "item", "code": "BAT", "name": "Batériové úložisko"}, {"type": "item", "code": "KTO", "name": "Katódová ochrana"}, {"type": "item", "code": "INE", "name": "Iná profesia vyššie neuvedená"}]);
const attachmentCatalog=Object.freeze([{"type": "section", "name": "--- Inžiniering ---"}, {"type": "item", "code": "SZS", "name": "Správa o prerokovaní stavebného zámeru"}, {"type": "section", "name": "--- Posúdenia ---"}, {"type": "item", "code": "PBS", "name": "Protipožiarna bezpečnosť stavby"}, {"type": "item", "code": "POV", "name": "Plán organizácie výstavby"}, {"type": "item", "code": "STP", "name": "Protokol z kontrolného statického posúdenia"}, {"type": "item", "code": "GDP", "name": "Geodetické podklady"}, {"type": "item", "code": "PAM", "name": "Pamiatkový výskum"}, {"type": "item", "code": "EIA", "name": "Posúdenie vplyvov na životné prostredie"}, {"type": "item", "code": "EHB", "name": "Energetické hodnotenie budovy"}, {"type": "item", "code": "DEN", "name": "Dendrologické posúdenie"}, {"type": "item", "code": "DEV", "name": "Náhradná výsadba drevín"}, {"type": "item", "code": "SVP", "name": "Svetelno-technické posúdenie"}, {"type": "item", "code": "HGP", "name": "Hydrogeologické posúdenie"}, {"type": "item", "code": "IGP", "name": "Inžinierskogeologické posúdenie"}, {"type": "item", "code": "HLU", "name": "Hluková štúdia"}, {"type": "item", "code": "IPP", "name": "Imisno-prenosové (rozptylová štúdia) posúdenie"}, {"type": "item", "code": "PEZ", "name": "Prieskum environmentálnej záťaže"}, {"type": "item", "code": "ECB", "name": "Energetický certifikát budovy"}, {"type": "item", "code": "STP", "name": "Svetelno-technické riešenie umelého osvetlenia"}, {"type": "item", "code": "INE", "name": "Iné posúdenie vyššie neuvedené"}, {"type": "section", "name": "--- Stavba ---"}, {"type": "item", "code": "STD", "name": "Stavebný denník"}, {"type": "item", "code": "ZSS", "name": "Záverečné stanovisko stavbyvedúceho"}]);
const documentationStageCatalog=Object.freeze([{"code": "SZP", "name": "Stavebný zámer"}, {"code": "SZZ", "name": "Zmena stavebného zámeru"}, {"code": "PSP", "name": "Projekt stavby"}, {"code": "PSZ", "name": "Zmena projektu stavby"}, {"code": "VPP", "name": "Vykonávací projekt"}, {"code": "RDS", "name": "Realizačná dokumentácia stavby"}, {"code": "DSZ", "name": "Dokumentácia skutočného zhotovenia"}, {"code": "ZDS", "name": "Zjednodušená dokumentácia stavby"}, {"code": "PSO", "name": "Projekt stavby na ohlásenie"}]);
const buildingTypeCatalog=Object.freeze([{"type": "section", "name": "--- Bytové budovy ---"}, {"type": "item", "code": "1111", "name": "Jednobytové budovy"}, {"type": "item", "code": "1112", "name": "Dvojbytové budovy"}, {"type": "item", "code": "1113", "name": "Trojbytové budovy"}, {"type": "item", "code": "1120", "name": "Viacbytové budovy"}, {"type": "item", "code": "1130", "name": "Iné bytové budovy"}, {"type": "section", "name": "--- Občianska vybavenosť ---"}, {"type": "item", "code": "1211", "name": "Hotely"}, {"type": "item", "code": "1212", "name": "Krátkodobé ubytovanie"}, {"type": "item", "code": "1213", "name": "Verejné stravovanie"}, {"type": "item", "code": "1220", "name": "Administratíva"}, {"type": "item", "code": "1230", "name": "Obchod a služby"}, {"type": "item", "code": "1241", "name": "Kultúru"}, {"type": "item", "code": "1242", "name": "Cirkev"}, {"type": "item", "code": "1250", "name": "Výchova a vzdelávanie"}, {"type": "item", "code": "1260", "name": "Zdravotníctvo"}, {"type": "item", "code": "1271", "name": "Šport"}, {"type": "item", "code": "1272", "name": "Rekreácia"}, {"type": "item", "code": "1280", "name": "Sociálne služby"}, {"type": "item", "code": "1290", "name": "Iná vybavenosť"}, {"type": "item", "code": "1290", "name": "Iné budovy pre vybavenosť"}, {"type": "section", "name": "--- Výroba ---"}, {"type": "item", "code": "1311", "name": "Potravinárska výroba"}, {"type": "item", "code": "1312", "name": "Spracovateľský priemysel"}, {"type": "item", "code": "1313", "name": "Iný priemysel"}, {"type": "item", "code": "1314", "name": "Sklady"}, {"type": "item", "code": "1321", "name": "Rastlinná výroba"}, {"type": "item", "code": "1322", "name": "Živočíšna výroba"}, {"type": "item", "code": "1323", "name": "Lesníctvo a poľovníctvo"}, {"type": "item", "code": "1330", "name": "Iná výroba"}, {"type": "section", "name": "--- Infraštruktúra ---"}, {"type": "item", "code": "1410", "name": "Dopravná vybavenosť"}, {"type": "item", "code": "1420", "name": "Technická vybavenosť"}, {"type": "item", "code": "1511", "name": "Drobné stavby prízemné"}, {"type": "item", "code": "1512", "name": "Drobné stavby podzemné"}, {"type": "section", "name": "--- Inžinierske stavby ---"}, {"type": "item", "code": "2111", "name": "Diaľnice"}, {"type": "item", "code": "2112", "name": "Cesty 1. triedy"}, {"type": "item", "code": "2113", "name": "Cesty 2. a 3. triedy"}, {"type": "item", "code": "2114", "name": "Miestne a účelové cesty"}, {"type": "item", "code": "2115", "name": "Cyklotrasy, chodníky"}, {"type": "item", "code": "2121", "name": "Železničné dráhy"}, {"type": "item", "code": "2122", "name": "Iné dráhy"}, {"type": "item", "code": "2130", "name": "Letiská"}, {"type": "item", "code": "2141", "name": "Mosty a mimoúrovňové križovania"}, {"type": "item", "code": "2142", "name": "Tunely"}, {"type": "item", "code": "2151", "name": "Iná dopravná vybavenosť"}, {"type": "item", "code": "2211", "name": "Vodohospodárske Stavby"}, {"type": "item", "code": "2212", "name": "Vodné nádrže, priehrady, odkaliská"}, {"type": "item", "code": "2213", "name": "Hydromeliorácie"}, {"type": "item", "code": "2214", "name": "Zásobovanie vodou"}, {"type": "item", "code": "2215", "name": "Odpadové vody"}, {"type": "item", "code": "2216", "name": "Fontány, historické vodohospodárske diela"}, {"type": "item", "code": "2311", "name": "Siete - ropa a plyn"}, {"type": "item", "code": "2312", "name": "Siete - voda"}, {"type": "item", "code": "2313", "name": "Siete - kanál, stoka"}, {"type": "item", "code": "2314", "name": "Siete - telekomunikácie"}, {"type": "item", "code": "2315", "name": "Siete - elektrina"}, {"type": "item", "code": "2321", "name": "Prípojky - plyn"}, {"type": "item", "code": "2322", "name": "Prípojky - voda"}, {"type": "item", "code": "2323", "name": "Prípojky - telekomunikácie"}, {"type": "item", "code": "2324", "name": "Prípojky - elektro"}, {"type": "item", "code": "2325", "name": "Prípojky - kanál"}, {"type": "item", "code": "2331", "name": "Energetické zdroje"}, {"type": "item", "code": "2331", "name": "Iné technické vybavenie"}, {"type": "item", "code": "2411", "name": "Bane, žažba"}, {"type": "item", "code": "2412", "name": "Chemické zariadenia"}, {"type": "item", "code": "2413", "name": "Ťažký priemysel"}, {"type": "item", "code": "2420", "name": "Nádrže, silá, kolóny, veže"}, {"type": "item", "code": "2511", "name": "Športové ihriská"}, {"type": "item", "code": "2512", "name": "Iný šport a rekreácia"}, {"type": "item", "code": "2520", "name": "Kultúra"}, {"type": "item", "code": "2530", "name": "Iná vybavenosť"}, {"type": "item", "code": "2611", "name": "Informačné konštrukcie"}, {"type": "item", "code": "2711", "name": "Drobné Ing stavby nadzemné"}, {"type": "item", "code": "2712", "name": "Drobné Ing stavby podzemné"}, {"type": "item", "code": "2713", "name": "Drobné Ing stavby energetické"}, {"type": "item", "code": "2720", "name": "Výškové konštrukcie"}, {"type": "section", "name": "--- Úpravy pozemku ---"}, {"type": "item", "code": "2811", "name": "Terénne úpravy"}, {"type": "item", "code": "2812", "name": "Vonkajšie úpravy"}]);
const emphasizedProfessionCodes=new Set(['ASR','STA','DOP','ELI','VYK','ZTI','VZT','PLY']);
const codes={stupne:documentationStageCatalog.map(x=>x.code),profesie:Object.fromEntries(professionCatalog.filter(x=>x.type==='item').map(x=>[x.code,x.name])),typy:{AAA:'Zoznam dokumentov a výkresov',TXT:'Technická správa',SIT:'Situácia',VYT:'Vytyčovací výkres',VYZ:'Výkres základov',VYS:'Výkres strechy',STV:'Kontrolovateľný statický výpočet',N01:'Pôdorys 1.NP',P01:'Pôdorys 1.PP',POH:'Pohľad',REZ:'Rez',VIZ:'Vizualizácia',DET:'Detail',SCH:'Schéma',VVZ:'Výkaz výrobkov a zariadení',VYV:'Výkaz výmer',ROZ:'Rozpočet',SPR:'Súhrnná správa',GDP:'Geodetické podklady',PBS:'Protipožiarna bezpečnosť stavby',POV:'Plán organizácie výstavby',EHB:'Energetické hodnotenie budovy',DEN:'Dendrologické posúdenie',SVP:'Svetelno-technické posúdenie',HGP:'Hydrogeologické posúdenie',IGP:'Inžinierskogeologické posúdenie',HLU:'Hluková štúdia',ECB:'Energetický certifikát budovy'}};
const projectCodeRegistry={stupen_dokumentacie:documentationStageCatalog,identifikacny_kod_stavby:buildingTypeCatalog};
const hardcodedProfessionCodes=Object.freeze({...codes.profesie});
function ensureProfessionRegistry(){
 if(!Array.isArray(model.professionRegistry)) model.professionRegistry=professionCatalog.filter(x=>x.type==='item').map(x=>({id:uid(),kod:x.code,nazov:x.name,system:true}));
 for(const x of professionCatalog.filter(x=>x.type==='item')) if(!model.professionRegistry.some(p=>p.kod===x.code)) model.professionRegistry.push({id:uid(),kod:x.code,nazov:x.name,system:true});
 return model.professionRegistry;
}
function professionOptions(){ensureProfessionRegistry();return [...model.professionRegistry]}
function professionName(code){return professionOptions().find(x=>x.kod===code)?.nazov||codes.profesie[code]||code}
function ensureAttachmentRegistry(){
 if(!Array.isArray(model.attachmentRegistry)) model.attachmentRegistry=attachmentCatalog.filter(x=>x.type==='item').map(x=>({id:uid(),kod:x.code,nazov:x.name,system:true}));
 for(const x of attachmentCatalog.filter(x=>x.type==='item')) if(!model.attachmentRegistry.some(p=>p.kod===x.code&&p.nazov===x.name)) model.attachmentRegistry.push({id:uid(),kod:x.code,nazov:x.name,system:true});
 return model.attachmentRegistry;
}
function catalogRows(catalog,registry,kind){
 const custom=registry.filter(x=>!x.system);let out=[];
 for(const entry of catalog){if(entry.type==='section')out.push({...entry});else{const row=registry.find(x=>x.system&&x.kod===entry.code&&x.nazov===entry.name)||registry.find(x=>x.kod===entry.code);if(row)out.push({type:'item',item:row})}}
 if(custom.length){out.push({type:'section',name:'--- Užívateľské ---'});out.push(...custom.map(item=>({type:'item',item})))}return out;
}
let includePdfSuffixInSelection=false;
const standardDocumentTypeCatalog=Object.freeze([
 {type:'item',code:'AAA',name:'Zoznam dokumentov a výkresov'},
 {type:'item',code:'SPR',name:'Súhrnná správa'},
 {type:'item',code:'SIT',name:'Situácia'},
 {type:'item',code:'STV',name:'Kontrolovateľný statický výpočet'},
 {type:'section',code:'---',name:'--- Výkresy ---'},
 {type:'item',code:'TXT',name:'Technická správa'},
 {type:'item',code:'SIT',name:'Situácia'},
 {type:'item',code:'VYT',name:'Vytyčovací výkres'},
 {type:'item',code:'VYZ',name:'Výkres základov'},
 {type:'levels',family:'P',code:'P++',name:'Podzemné podlažie +++'},
 {type:'levels',family:'N',code:'N++',name:'Nadzemné podlažie +++'},
 {type:'item',code:'VYS',name:'Výkres strechy'},
 {type:'item',code:'POH',name:'Pohľad'},
 {type:'item',code:'REZ',name:'Rez'},
 {type:'item',code:'VIZ',name:'Vizualizácia'},
 {type:'item',code:'DET',name:'Detail'},
 {type:'item',code:'SCH',name:'Schéma'},
 {type:'item',code:'VVZ',name:'Výkaz výrobkov a zariadení, výkaz prvkov'},
 {type:'item',code:'VYV',name:'Výkaz výmer'},
 {type:'item',code:'ROZ',name:'Rozpočet'}
]);
function attachmentDocumentTypeMenuRows(){
 ensureAttachmentRegistry();
 const rows=[];
 for(const entry of attachmentCatalog){
  if(entry.type!=='item')continue;
  const item=model.attachmentRegistry.find(x=>x.system&&x.kod===entry.code&&x.nazov===entry.name)||model.attachmentRegistry.find(x=>x.kod===entry.code&&x.nazov===entry.name);
  if(item)rows.push({type:'item',code:item.kod,name:item.nazov});
  if(entry.code==='SZS'||entry.code==='INE')rows.push({type:'section'});
 }
 const custom=model.attachmentRegistry.filter(x=>!x.system);
 if(custom.length){rows.push({type:'section'});rows.push(...custom.map(x=>({type:'item',code:x.kod,name:x.nazov})))}
 return rows;
}
function professionMenuRows(){
 ensureProfessionRegistry();
 const rows=[];
 for(const entry of professionCatalog){
  if(entry.type!=='item')continue;
  const item=model.professionRegistry.find(x=>x.system&&x.kod===entry.code&&x.nazov===entry.name)||model.professionRegistry.find(x=>x.kod===entry.code);
  if(item)rows.push({type:'item',code:item.kod,name:item.nazov});
  if(entry.code==='DDZ'||entry.code==='VDS')rows.push({type:'section'});
 }
 const custom=model.professionRegistry.filter(x=>!x.system);
 if(custom.length){rows.push({type:'section'});rows.push(...custom.map(x=>({type:'item',code:x.kod,name:x.nazov})))}
 return rows;
}

let pendingNewObjectId=null;
let model={verzia_schema:JSON_SCHEMA_VERSION,projekt:{id_projektu:'123456',nazov_projektu:'',stupen_dokumentacie:'SZP',identifikacny_kod_stavby:'1111',datum_vydania:'',revizia_zoznamu:'00',verzia_zoznamu:'v1.0',zoznam_vypracoval:''},lokalita:{adresa:{mesto:'',cityID:'',psc:'',ulica:'',supisne_cislo:'',orientacne_cislo:''}},stavebnik:null,_rawPersonsIndex:null,_rawLocationIndex:null,_opaqueVyjadrenia:null,_builderIdentityDirty:false,stavebneSubory:[{id:uid(),cislo:1,kod_stavby:'1111',nazov:'Hlavný stavebný súbor'}],sekcie:[{id:uid(),kod:'D',nazov:'Dokumentácia stavebných objektov',objekty:[]}],prilohy:[]}, sourceWorkbook=null, currentView='settings', expanded=new Set(), validationResults=[], validationCollapsed=false, validationHighlightId='';
const modeSearchValues={settings:'',buildingSets:'',objects:'',professions:'',all:'',documents:''};
const selectedDocumentIds=new Set();let lastSelectedDocumentId=null;
const collapsedDocumentSections=new Set(),collapsedDocumentBuildingSets=new Set(),collapsedDocumentObjects=new Set(),collapsedDocumentProfessions=new Set();
let documentFileDropMode=false;
let pendingDocumentsIndex=null;
let droppedDocumentCandidateFiles=[];
const attachedDocumentFiles=new Map();
const manuallyReplacedDocumentIds=new Set();
const attachedDocumentHandles=new Map();
const attachedDocumentSourceDirectories=new Map();
const manuallyDroppedDocumentIds=new Set();
const preservedIndexedDocumentIds=new Set();
let projectValidationResults=[];
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const normalizeFilter=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('sk');
const matchesFilter=(value,q)=>!q||normalizeFilter(value).includes(q);
const startsWithFilter=(value,q)=>!q||normalizeFilter(value).startsWith(normalizeFilter(q));

const publicSubjectTypeOptions=Object.freeze([{code:'S',name:'Súkromná osoba'},{code:'F',name:'Fyz. osoba - podnikateľ'},{code:'P',name:'Právnická osoba'}]);
function parseJsonTextLenient(text,name='JSON'){
 try{return JSON.parse(text)}catch(firstError){
  // Narrow recovery for generated JSON where a comma between two object properties was accidentally omitted.
  const fixed=String(text).replace(/("(?:[^"\\]|\\.)*"\s*)\n(\s*"[A-Za-zÀ-ž0-9_ -]+"\s*:)/g,'$1,\n$2');
  try{return JSON.parse(fixed)}catch{throw new Error(`Neplatný JSON ${name}: ${firstError.message}`)}
 }
}
const deepClone=value=>value==null?value:JSON.parse(JSON.stringify(value));
function schemaVersionNumber(value){const n=Number.parseFloat(String(value||'0').replace(',','.'));return Number.isFinite(n)?n:0}
function isLegacySchema(data){return schemaVersionNumber(data?.verzia_schema)<1.1}
function subjectTypeName(code){return publicSubjectTypeOptions.find(x=>x.code===code)?.name||publicSubjectTypeOptions[0].name}
function subjectTypeCode(value){const s=String(value||'').trim();return publicSubjectTypeOptions.find(x=>x.code===s||x.name===s)?.code||'S'}
function newPublicBuilder(){return{id:uid(),kategoria_kod:'stavebnik',typ_subjektu_kod:'S',akademicky_titul_pred_menom:'',meno:'',priezvisko:'',akademicky_titul_za_menom:'',obchodne_meno:'',ulica:'',supisne_cislo:'',orientacne_cislo:'',mesto:'',psc:''}}
function ensurePublicBuilder(){if(!model.stavebnik||typeof model.stavebnik!=='object')model.stavebnik=newPublicBuilder();return model.stavebnik}
function blankPublicAddress(){return{mesto:'',cityID:'',psc:'',ulica:'',supisne_cislo:'',orientacne_cislo:''}}
function ensurePublicLocation(){if(!model.lokalita||typeof model.lokalita!=='object')model.lokalita={adresa:blankPublicAddress()};if(!model.lokalita.adresa||typeof model.lokalita.adresa!=='object')model.lokalita.adresa=blankPublicAddress();model.lokalita.adresa={...blankPublicAddress(),...model.lokalita.adresa};return model.lokalita}
function normalizePscPublic(value){return String(value||'').replace(/\D/g,'').slice(0,5)}
function formatPscPublic(value){const v=normalizePscPublic(value);return v.length>3?`${v.slice(0,3)} ${v.slice(3)}`:v}
function cleanJsonValue(value){if(value===undefined||value===null)return undefined;const s=String(value).trim();return s===''?undefined:s}
function personArrayFromDataPublic(data){if(Array.isArray(data))return data.filter(x=>x&&typeof x==='object');if(Array.isArray(data?.osoby))return data.osoby.filter(x=>x&&typeof x==='object');if(data&&typeof data==='object'&&(data.typ_osoby||data.typ_subjektu))return[data];return[]}
function publicBuilderFromJson(x){x=x&&typeof x==='object'?x:{};const io=x.udaje_osoby||x.udaje_osoba||{},sub=x.udaje_subjektu||x.udaje_subjekt||{},a=x.adresa||{};return{...newPublicBuilder(),id:x.id_osoby||x.id||uid(),typ_subjektu_kod:subjectTypeCode(x.typ_subjektu||x.typ_subjektu_nazov||x.typ_subjektu_kod),akademicky_titul_pred_menom:String(io.akademicky_titul_pred_menom||''),meno:String(io.meno||''),priezvisko:String(io.priezvisko||''),akademicky_titul_za_menom:String(io.akademicky_titul_za_menom||''),obchodne_meno:String(sub.obchodne_meno||''),ulica:String(a.ulica||''),supisne_cislo:String(a.supisne_cislo||''),orientacne_cislo:String(a.orientacne_cislo||''),mesto:String(a.mesto||''),psc:normalizePscPublic(a.psc||'')}}
function isBuilderJson(x){const role=String(x?.typ_osoby??x?.kategoria_nazov??x?.kategoria_kod??'').toLowerCase();return role==='stavebník'||role==='stavebnik'}
function makeMinimalBuilderJson(b=ensurePublicBuilder()){
 const out={typ_osoby:'Stavebník',typ_subjektu:subjectTypeName(b.typ_subjektu_kod),adresa:{ulica:String(b.ulica||''),supisne_cislo:String(b.supisne_cislo||''),orientacne_cislo:String(b.orientacne_cislo||''),mesto:String(b.mesto||''),psc:normalizePscPublic(b.psc||'')}};
 if(b.typ_subjektu_kod==='S')out.udaje_osoby={akademicky_titul_pred_menom:String(b.akademicky_titul_pred_menom||''),meno:String(b.meno||''),priezvisko:String(b.priezvisko||''),akademicky_titul_za_menom:String(b.akademicky_titul_za_menom||'')};
 else out.udaje_subjektu={obchodne_meno:String(b.obchodne_meno||'')};
 return pruneEmpty(out)
}
function pruneEmpty(value){if(Array.isArray(value))return value.map(pruneEmpty).filter(v=>v!==undefined);if(value&&typeof value==='object'){const o={};for(const[k,v]of Object.entries(value)){const c=pruneEmpty(v);if(c===undefined)continue;if(c&&typeof c==='object'&&!Array.isArray(c)&&!Object.keys(c).length)continue;o[k]=c}return o}if(value===undefined||value===null)return undefined;if(typeof value==='string'&&!value.trim())return undefined;return value}
function mergePublicBuilderIntoRaw(raw,b){const out=deepClone(raw||{});out.typ_osoby='Stavebník';out.typ_subjektu=subjectTypeName(b.typ_subjektu_kod);out.adresa=out.adresa&&typeof out.adresa==='object'?out.adresa:{};Object.assign(out.adresa,{ulica:String(b.ulica||''),supisne_cislo:String(b.supisne_cislo||''),orientacne_cislo:String(b.orientacne_cislo||''),mesto:String(b.mesto||''),psc:normalizePscPublic(b.psc||'')});if(b.typ_subjektu_kod==='S'){out.udaje_osoby=out.udaje_osoby&&typeof out.udaje_osoby==='object'?out.udaje_osoby:{};Object.assign(out.udaje_osoby,{akademicky_titul_pred_menom:String(b.akademicky_titul_pred_menom||''),meno:String(b.meno||''),priezvisko:String(b.priezvisko||''),akademicky_titul_za_menom:String(b.akademicky_titul_za_menom||'')})}else{out.udaje_subjektu=out.udaje_subjektu&&typeof out.udaje_subjektu==='object'?out.udaje_subjektu:{};out.udaje_subjektu.obchodne_meno=String(b.obchodne_meno||'')}return out}
function applyPersonsIndexPublic(data){model._rawPersonsIndex=deepClone(data&&typeof data==='object'?data:{osoby:[]});const people=personArrayFromDataPublic(data),ix=people.findIndex(isBuilderJson),src=ix>=0?people[ix]:null;model.stavebnik=src?publicBuilderFromJson(src):newPublicBuilder();model._builderIdentityDirty=false;model._builderFieldsDirty=false;return{total:people.length,builder:!!src}}
function makePersonsIndexPublic(){if(model._rawPersonsIndex&&!model._builderFieldsDirty&&!model._builderIdentityDirty)return deepClone(model._rawPersonsIndex);const root=Array.isArray(model._rawPersonsIndex)?{osoby:deepClone(model._rawPersonsIndex)}:(model._rawPersonsIndex&&typeof model._rawPersonsIndex==='object'?deepClone(model._rawPersonsIndex):{osoby:[]});root.verzia_schema=JSON_SCHEMA_VERSION;let people=Array.isArray(root.osoby)?root.osoby:personArrayFromDataPublic(root);if(!Array.isArray(root.osoby))root.osoby=people;let ix=people.findIndex(isBuilderJson),builderJson=model._builderIdentityDirty?makeMinimalBuilderJson(ensurePublicBuilder()):mergePublicBuilderIntoRaw(ix>=0?people[ix]:{},ensurePublicBuilder());if(ix>=0)people[ix]=builderJson;else people.unshift(builderJson);root.osoby=people;return root}
function commitPublicBuilderAfterSave(savedPersons){if(!model._builderIdentityDirty&&!model._builderFieldsDirty)return;model._rawPersonsIndex=deepClone(savedPersons);model._builderFieldsDirty=false;const b=ensurePublicBuilder();if(b.typ_subjektu_kod==='S')b.obchodne_meno='';else{b.akademicky_titul_pred_menom='';b.meno='';b.priezvisko='';b.akademicky_titul_za_menom=''}model._builderIdentityDirty=false}
function locationAddressFromPublicData(data){if(!data||typeof data!=='object')return null;const src=data.miesto_stavby&&typeof data.miesto_stavby==='object'?data.miesto_stavby:(data.adresa&&typeof data.adresa==='object'?data.adresa:null);if(!src)return null;return{mesto:String(src.mesto||''),cityID:String(src.cityID??src.cityId??src.city_id??''),psc:String(src.psc||''),ulica:String(src.ulica||''),supisne_cislo:String(src.supisne_cislo||''),orientacne_cislo:String(src.orientacne_cislo||'')}}
// Public retains parcels invisibly but merges them using Private's non-interactive
// parcel-only policy. The raw index remains the export source of truth.
const publicLocationGroups=['stavebne_pozemky','susedne_stavby','susedne_pozemky'];
const publicAddressKeys=['mesto','psc','ulica','supisne_cislo','orientacne_cislo'];
function publicLocText(v){return v===undefined||v===null?'':String(v).trim()}
function publicAddressHasValues(a){return !!a&&publicAddressKeys.some(k=>publicLocText(a[k]))}
function publicAddressesDiffer(a,b){return publicAddressKeys.some(k=>{let av=publicLocText(a?.[k]),bv=publicLocText(b?.[k]);if(k==='psc'){av=av.replace(/\s/g,'');bv=bv.replace(/\s/g,'')}return av!==bv})}
function publicAddressSummary(a){const street=[a?.ulica,[a?.supisne_cislo,a?.orientacne_cislo].filter(Boolean).join('/')].filter(Boolean).join(' ');return [street,[a?.mesto,a?.psc].filter(Boolean).join(', ')].filter(Boolean).join(' | ')||'(prázdne)'}
function publicParcelIdentity(row){return ['register','cislo_parcely','list_vlastnictva'].map(k=>publicLocText(row?.[k]).toLocaleLowerCase('sk')).join('\u001f')}
function publicParcelsClash(a,b){
 if(publicParcelIdentity(a)!==publicParcelIdentity(b))return false;
 const ac=publicLocText(a.katastralne_uzemie),bc=publicLocText(b.katastralne_uzemie);
 return !ac||!bc||ac.localeCompare(bc,'sk',{sensitivity:'base'})===0;
}
function applyLocationIndexPublic(data,options={}){
 if(!data||typeof data!=='object'||Array.isArray(data))return{added:0,skipped:0};
 let root=model._rawLocationIndex&&typeof model._rawLocationIndex==='object'?deepClone(model._rawLocationIndex):null;
 if(!root)root={verzia_schema:JSON_SCHEMA_VERSION};
 const incomingAddress=locationAddressFromPublicData(data);
 const old=ensurePublicLocation().adresa;
 // Private's address mismatch confirmation, but parcel conflicts never prompt.
 if(incomingAddress&&publicAddressHasValues(incomingAddress)){
  let replace=!publicAddressHasValues(old);
  if(!replace&&publicAddressesDiffer(old,incomingAddress)){
   const name=String(options.name||'lokalita.json');
   replace=window.confirm(`Upozornenie – nezhodné údaje Miesta stavby.\n\nAktuálne údaje:\n${publicAddressSummary(old)}\n\n${name}:\n${publicAddressSummary(incomingAddress)}\n\nOK = použiť adresu z ${name}\nZrušiť = ponechať aktuálnu adresu`);
  }else if(!publicAddressesDiffer(old,incomingAddress)){
   for(const k of [...publicAddressKeys,'cityID'])if(!publicLocText(old[k])&&publicLocText(incomingAddress[k]))old[k]=incomingAddress[k];
  }
  if(replace)model.lokalita.adresa={...blankPublicAddress(),...incomingAddress};
 }
 let added=0,skipped=0;
 // Deliberately check all three groups: Private's parcel-only mode detects
 // duplicates even when a parcel is present in a different group.
 const previous=[];for(const group of publicLocationGroups){if(Array.isArray(root[group]))previous.push(...root[group])}
 for(const group of publicLocationGroups){
  const rows=Array.isArray(data[group])?data[group]:[];
  for(const raw of rows){
   if(!raw||typeof raw!=='object'||Array.isArray(raw)||!Object.values(raw).some(v=>publicLocText(v))){skipped++;continue}
   const identity=publicParcelIdentity(raw);
   if(!publicLocText(raw.cislo_parcely)||!identity){skipped++;continue}
   if(previous.some(ex=>publicParcelsClash(ex,raw))){skipped++;continue}
   const copy=deepClone(raw);if(!Array.isArray(root[group]))root[group]=[];root[group].push(copy);previous.push(copy);added++;
  }
 }
 // Preserve source properties and unknown metadata. Export the selected address.
 const incomingRoot=deepClone(data);
 for(const [key,value] of Object.entries(incomingRoot)){
  if(key==='miesto_stavby'||key==='adresa'||publicLocationGroups.includes(key))continue;
  if(!(key in root))root[key]=value;
 }
 root.miesto_stavby={...(root.miesto_stavby&&typeof root.miesto_stavby==='object'?root.miesto_stavby:{} )};
 const chosen=ensurePublicLocation().adresa;
 for(const key of [...publicAddressKeys,'cityID']){
  const v=publicLocText(chosen[key]);if(v)root.miesto_stavby[key]=v;else delete root.miesto_stavby[key];
 }
 model._rawLocationIndex=root;model._locationAddressDirty=false;
 return{added,skipped};
}
function makeLocationIndexPublic(){
 const raw=model._rawLocationIndex;
 if(raw&&typeof raw==='object'&&!model._locationAddressDirty)return deepClone(raw);
 const root=raw&&typeof raw==='object'?deepClone(raw):{verzia_schema:JSON_SCHEMA_VERSION};
 const a=ensurePublicLocation().adresa;
 const next={...(root.miesto_stavby&&typeof root.miesto_stavby==='object'?root.miesto_stavby:{})};
 for(const key of [...publicAddressKeys,'cityID']){
  const val=publicLocText(a[key]);if(val)next[key]=val;else delete next[key];
 }
 root.miesto_stavby=next;
 if(!raw)delete root.adresa;
 return root;
}

// Schema-compatible consolidation of consolidated vyjadrenia.json and single
// vyjadrenie_*.json. No statement (or demand) is discarded due to duplicates.
function publicStatementArray(data){
 if(Array.isArray(data?.vyjadrenie))return data.vyjadrenie.filter(x=>x&&typeof x==='object'&&!Array.isArray(x));
 if(data?.vyjadrenie&&typeof data.vyjadrenie==='object'&&!Array.isArray(data.vyjadrenie))return[data.vyjadrenie];
 if(Array.isArray(data))return data.filter(x=>x&&typeof x==='object'&&!Array.isArray(x)&&(x.dotknuta_osoba!==undefined||x.skratka!==undefined||Array.isArray(x.pripomienky)));
 if(data&&typeof data==='object'&&!Array.isArray(data)&&(data.dotknuta_osoba!==undefined||data.skratka!==undefined||Array.isArray(data.pripomienky)))return[data];
 return[];
}
function isStatementsJsonDataPublic(data){return publicStatementArray(data).length>0||!!(data&&typeof data==='object'&&!Array.isArray(data)&&('vyjadrenie' in data||'spracovanie_vyjadreni' in data))}
function publicStatementValue(x){return String(x??'').trim().toLocaleLowerCase('sk')}
function publicStatementIdentity(s){const number=publicStatementValue(s.cislo_vyjadrenia),who=publicStatementValue(s.skratka||s.dotknuta_osoba);return number&&who?`${who}\u001f${number}`:''}
function publicStatementsSame(a,b){const n1=publicStatementValue(a.cislo_vyjadrenia),n2=publicStatementValue(b.cislo_vyjadrenia);if(!n1||n1!==n2)return false;const ab1=publicStatementValue(a.skratka),ab2=publicStatementValue(b.skratka),name1=publicStatementValue(a.dotknuta_osoba),name2=publicStatementValue(b.dotknuta_osoba);return !!(ab1&&ab1===ab2||name1&&name1===name2)}
function publicStatementFingerprint(s){return JSON.stringify(s,Object.keys(s||{}).sort())}
function publicMergeSupplemental(dst,src){
 for(const [k,v] of Object.entries(src||{})){
  if(v===null||v===undefined||v==='')continue;
  if(k==='pripomienky')continue;
  if(!(k in dst)||dst[k]===null||dst[k]===undefined||dst[k]==='')dst[k]=deepClone(v);
  else if(v&&typeof v==='object'&&!Array.isArray(v)&&dst[k]&&typeof dst[k]==='object'&&!Array.isArray(dst[k]))publicMergeSupplemental(dst[k],v);
 }
 return dst;
}
function publicMergeDemands(dst,incoming){
 if(!Array.isArray(dst.pripomienky))dst.pripomienky=[];
 for(const src of (Array.isArray(incoming.pripomienky)?incoming.pripomienky:[])){
  if(!src||typeof src!=='object')continue;
  const match=dst.pripomienky.find(e=>publicStatementValue(e?.pripomienka)===publicStatementValue(src.pripomienka)&&publicStatementValue(e?.zapracovanie)===publicStatementValue(src.zapracovanie));
  if(match){publicMergeSupplemental(match,src);continue}
  const sameText=dst.pripomienky.find(e=>publicStatementValue(e?.pripomienka)&&publicStatementValue(e.pripomienka)===publicStatementValue(src.pripomienka));
  if(sameText&&(!publicStatementValue(sameText.zapracovanie)||!publicStatementValue(src.zapracovanie))){publicMergeSupplemental(sameText,src);continue}
  dst.pripomienky.push(deepClone(src));
 }
}
function mergeOpaqueStatementsPublic(data){
 const incoming=publicStatementArray(data);if(!isStatementsJsonDataPublic(data))return{added:0,merged:0,skipped:0};
 let root=model._opaqueVyjadrenia;
 if(!root||typeof root!=='object'||Array.isArray(root))root={verzia_schema:JSON_SCHEMA_VERSION,spracovanie_vyjadreni:{zodpovedna_osoba:'',spolocnost:'',datum_spracovania:''},vyjadrenie:[]};
 if(!Array.isArray(root.vyjadrenie))root.vyjadrenie=publicStatementArray(root);
 if(!root.spracovanie_vyjadreni||typeof root.spracovanie_vyjadreni!=='object')root.spracovanie_vyjadreni={};
 if(data&&typeof data==='object'&&!Array.isArray(data)){
  for(const [key,value] of Object.entries(data))if(!['vyjadrenie','spracovanie_vyjadreni'].includes(key)&&!(key in root))root[key]=deepClone(value);
  publicMergeSupplemental(root.spracovanie_vyjadreni,data.spracovanie_vyjadreni||{});
 }
 let added=0,merged=0,skipped=0;
 for(const source of incoming){
  const imp=deepClone(source);const identity=publicStatementIdentity(imp);
  let previous=identity?root.vyjadrenie.find(x=>publicStatementIdentity(x)===identity||publicStatementsSame(x,imp)):null;
  if(!previous){previous=root.vyjadrenie.find(x=>JSON.stringify(x)===JSON.stringify(imp))}
  if(previous){
   const before=JSON.stringify(previous);
   publicMergeSupplemental(previous,imp);publicMergeDemands(previous,imp);
   if(JSON.stringify(previous)===before)skipped++;else merged++;
  }else{root.vyjadrenie.push(imp);added++}
 }
 model._opaqueVyjadrenia=root;return{added,merged,skipped};
}
function makeOpaqueStatementsPublic(){
 const root=model._opaqueVyjadrenia;
 if(!root||!Array.isArray(root.vyjadrenie))return null;
 const out=deepClone(root);
 if(!out.spracovanie_vyjadreni||typeof out.spracovanie_vyjadreni!=='object')out.spracovanie_vyjadreni={};
 for(const key of ['zodpovedna_osoba','spolocnost','datum_spracovania'])if(!(key in out.spracovanie_vyjadreni))out.spracovanie_vyjadreni[key]='';
 out.verzia_schema=JSON_SCHEMA_VERSION;return out;
}
function isPersonsJsonDataPublic(data){
 const arr=personArrayFromDataPublic(data);return arr.length>0&&arr.every(x=>!!(x.typ_osoby||x.typ_subjektu||x.kategoria_kod||x.typ_subjektu_kod));
}
function isLocationJsonDataPublic(data){
 if(!data||typeof data!=='object'||Array.isArray(data))return false;
 if(data.udaje_projektu||data.projekt||Array.isArray(data.dokumentacia)||isPersonsJsonDataPublic(data)||isStatementsJsonDataPublic(data))return false;
 return publicLocationGroups.some(k=>k in data)||('miesto_stavby' in data)||('adresa' in data);
}
function publicJsonKind(data,name=''){
 // Structure takes precedence over a nonstandard or misleading filename.
 if(isStatementsJsonDataPublic(data))return'statements';
 if(isPersonsJsonDataPublic(data))return'persons';
 if(isLocationJsonDataPublic(data))return'location';
 if(data&&typeof data==='object'&&!Array.isArray(data)&&(data.udaje_projektu&&data.dokumentacia||data.projekt&&(data.sekcie||data.stavebneSubory)))return'main';
 if(data&&typeof data==='object'&&!Array.isArray(data)&&Array.isArray(data.documents))return'documents';
 return indexKindFromName(name)||'';
}
function publicPrepareJsonEntries(parsed){
 const items=parsed.map(item=>({...item,kind:publicJsonKind(item.data,item.name||item.file?.name||'')}));
 const main=items.find(x=>x.kind==='main');
 return{items,main,persons:items.filter(x=>x.kind==='persons'),locations:items.filter(x=>x.kind==='location'),statements:items.filter(x=>x.kind==='statements')};
}

function legacyAddressFromMainPublic(data){if(!isLegacySchema(data))return null;const u=data?.udaje_projektu||data?.projekt||{},embedded=data?.miesto_stavby&&typeof data.miesto_stavby==='object'?data.miesto_stavby:{};const out={mesto:String(embedded.mesto??u.miesto_stavby_mesto??u.projekt_mesto??''),cityID:String(embedded.cityID??u.miesto_stavby_cityID??''),psc:String(embedded.psc??u.miesto_stavby_psc??u.projekt_psc??''),ulica:String(embedded.ulica??u.miesto_stavby_ulica??u.projekt_ulica??u.miesto_stavby??''),supisne_cislo:String(embedded.supisne_cislo??u.miesto_stavby_supisne_cislo??''),orientacne_cislo:String(embedded.orientacne_cislo??u.miesto_stavby_orientacne_cislo??'')};return Object.values(out).some(v=>String(v||'').trim())?out:null}
function legacyBuilderAddressPublic(value=''){const raw=String(value||'').trim();if(!raw)return{};const parts=raw.split(',').map(x=>x.trim()).filter(Boolean),street=parts[0]||'',city=parts.slice(1).join(' '),sm=street.match(/^(.*?)(?:\s+(\d+[A-Za-z]?)(?:\/(\d+[A-Za-z]?))?)?$/),cm=city.match(/^(.*?)(?:\s+(\d{3}\s?\d{2}))?$/);return{ulica:String(sm?.[1]||street).trim(),supisne_cislo:String(sm?.[2]||''),orientacne_cislo:String(sm?.[3]||''),mesto:String(cm?.[1]||city).trim(),psc:normalizePscPublic(cm?.[2]||'')}}
function legacyBuilderFromMainPublic(data){if(!isLegacySchema(data))return null;const u=data?.udaje_projektu||data?.projekt||{},name=String(u.stavebnik_meno??u.stavebnik??'').trim(),addr=String(u.stavebnik_adresa??u.adresa_stavebnika??'').trim();if(!name&&!addr)return null;const company=/\b(s\.?\s*r\.?\s*o\.?|a\.?\s*s\.?|k\.?\s*s\.?|v\.?\s*o\.?\s*s\.?|družstvo|spol\.?|s\.p\.)\b/i.test(name),b={...newPublicBuilder(),typ_subjektu_kod:company?'P':'S',...legacyBuilderAddressPublic(addr)};if(company)b.obchodne_meno=name;else{const bits=name.split(/\s+/).filter(Boolean);if(bits.length>1){b.priezvisko=bits.pop();b.meno=bits.join(' ')}else b.meno=name}return b}
function applyLegacyMainFallbackPublic(data,target){if(!isLegacySchema(data))return target;const a=legacyAddressFromMainPublic(data);if(a)target.lokalita={adresa:{...blankPublicAddress(),...a}};const b=legacyBuilderFromMainPublic(data);if(b)target.stavebnik=b;return target}
function listVersionFilePart(){return asciiFilePart(model.projekt.verzia_zoznamu||'v1.0','v1.0')}
function personsIndexFileName(){const projectId=normalizeProjectId(model.projekt.id_projektu)||'123456';return `${projectId}_osoby_${listVersionFilePart()}.json`}
function locationIndexFileName(){const projectId=normalizeProjectId(model.projekt.id_projektu)||'123456';return `${projectId}_lokalita_${listVersionFilePart()}.json`}
function statementsIndexFileName(){const projectId=normalizeProjectId(model.projekt.id_projektu)||'123456';return `${projectId}_vyjadrenia_${listVersionFilePart()}.json`}
function eSectionFilename(d,o,p,numberedMode,extension=null){
 const setNumber=String(Number(ensureBuildingSets().find(s=>s.id===o?.stavebnySuborId)?.cislo)||Number(ensureBuildingSets()[0]?.cislo)||1).padStart(2,'0');
 const base=[model.projekt.id_projektu,model.projekt.stupen_dokumentacie,setNumber,model.projekt.identifikacny_kod_stavby];
 const attachmentCode=String(d.typ_dokumentu||p?.kod||d.profesia||'SZS').slice(0,3).toUpperCase();
 const number=Number(d.cislo_dokumentu??0),num=String(number).padStart(3,'0');
 const sectionCode=numberedMode?`E${String(number).padStart(2,'0')}`:'E00';
 const a=numberedMode?[...base,sectionCode,attachmentCode,'001']:[...base,sectionCode,attachmentCode,num];
 if(d.revizia&&d.revizia!=='00')a.push(String(d.revizia).padStart(2,'0'));
 return a.filter(Boolean).join('_')+'.'+(extension||d.pripona||'pdf')
}
function filename(d,o,p){
 const setNumber=String(Number(ensureBuildingSets().find(s=>s.id===o?.stavebnySuborId)?.cislo)||Number(ensureBuildingSets()[0]?.cislo)||1).padStart(2,'0');
 const base=[model.projekt.id_projektu,model.projekt.stupen_dokumentacie,setNumber,model.projekt.identifikacny_kod_stavby];
 const cast=o?.kod||d.cast||'E00', prof=p?.kod||d.profesia||d.typ_dokumentu, num=String(d.cislo_dokumentu??0).padStart(3,'0');
 let a;
 if(cast==='A00'||cast==='B00') {
  const sectionCode=cast[0]+String(Number(d.cislo_dokumentu??0)).padStart(2,'0');
  a=[...base,sectionCode,prof||d.typ_dokumentu];
 }
 else if(cast==='C00') a=[...base,cast,prof||'SIT',num];
 else if(cast==='E00') return eSectionFilename(d,o,p,Boolean(model.eSectionToggle));
 else a=[...base,cast,prof,num,d.typ_dokumentu];
 if(d.revizia&&d.revizia!=='00')a.push(String(d.revizia).padStart(2,'0'));
 return a.filter(Boolean).join('_')+'.'+(d.pripona||'pdf')
}
function generatedDocumentBaseVariants(o,p,d){
 const current=filename(d,o,p).replace(/\.[^.]+$/,'').toLowerCase();
 if(documentSectionKey(o,d)!=='E')return [current];
 const alternate=eSectionFilename(d,o,p,!Boolean(model.eSectionToggle)).replace(/\.[^.]+$/,'').toLowerCase();
 return alternate===current?[current]:[current,alternate]
}
function inferESectionToggleFromNames(names){
 let numbered=0,e00=0;
 for(const raw of names||[]){
  const name=String(raw||'').split(/[\\/]/).pop();
  if(/_E00_[A-Z0-9]{3}_\d{3}(?:_|\.|$)/i.test(name))e00++;
  else if(/_E(?!00)\d{2}_[A-Z0-9]{3}_001(?:_|\.|$)/i.test(name))numbered++;
 }
 if(numbered&&!e00)return true;
 if(e00&&!numbered)return false;
 if(numbered||e00)return numbered>=e00;
 return null
}
function allObjects(){return model.sekcie.flatMap(s=>s.objekty||[])} function allProf(){return allObjects().flatMap(o=>(o.profesie||[]).map(p=>({o,p})))} function allDocs(){return allProf().flatMap(({o,p})=>(p.dokumenty||[]).map(d=>({o,p,d}))).concat((model.prilohy||[]).map(d=>({o:null,p:null,d})))}
function toast(t){const el=$('#toast');if(!el)return;el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1800)}
function setStatus(t){const el=$('#status');if(el)el.textContent=t;else console.info(t)}
function objectKind(o){return String(o.kod||'S01').toUpperCase().startsWith('P')?'P':'S'}
function objectNumber(o){const m=String(o.kod||'').match(/(\d+)/);return String(m?m[1]:'1').padStart(2,'0')}
function objectDisplay(o){return `${objectKind(o)==='P'?'PS':'SO'}-${objectNumber(o)}`}
function sortedConstructionObjects(){return allObjects().filter(o=>o.typ!=='cast').sort((a,b)=>{const ka=objectKind(a),kb=objectKind(b);if(ka!==kb)return ka==='S'?-1:1;return Number(objectNumber(a))-Number(objectNumber(b))||String(a.nazov||'').localeCompare(String(b.nazov||''),'sk')})}
function ensureBuildingSets(){if(!Array.isArray(model.stavebneSubory)||!model.stavebneSubory.length)model.stavebneSubory=[{id:uid(),cislo:1,kod_stavby:String(model.projekt.identifikacny_kod_stavby||'1111').split(/\s+[–-]\s+/)[0],nazov:'Hlavný stavebný súbor'}];model.stavebneSubory.forEach((x,i)=>{x.id=x.id||uid();x.cislo=Math.max(1,Number(x.cislo)||i+1);x.kod_stavby=String(x.kod_stavby||'1111').slice(0,4);x.nazov=x.nazov|| (i===0?'Hlavný stavebný súbor':'Stavebný súbor')});const first=model.stavebneSubory[0].id;allObjects().filter(o=>o.typ!=='cast').forEach(o=>{if(!model.stavebneSubory.some(s=>s.id===o.stavebnySuborId))o.stavebnySuborId=first});return model.stavebneSubory}
function buildingSetDisplay(x){return `S${String(Math.max(1,Number(x.cislo)||1)).padStart(2,'0')}`}
function calculatedBuildingSetValue(){return ensureBuildingSets().length>1?'Áno':'Nie'}
function projectBuildingCode(){return String(model.projekt.identifikacny_kod_stavby||'1111').split(/\s+[–-]\s+/)[0].trim().slice(0,4)}
function syncSingleBuildingSetCodeFromProject(){const sets=ensureBuildingSets();if(sets.length===1)sets[0].kod_stavby=projectBuildingCode()}
function updateContextFilterFeedback(query,resultCount){
 const search=$('#search');if(!search)return;
 search.classList.remove('context-filter-active','context-filter-empty');
 if(!String(query||'').trim())return;
 search.classList.add(resultCount>0?'context-filter-active':'context-filter-empty');
}
function updateContextButtons(){
 const toolbar=$('#toolbar'),button=$('#contextAction');if(!button||!toolbar)return;
 let secondary=$('#contextSecondaryAction');
 if(!secondary){secondary=document.createElement('button');secondary.id='contextSecondaryAction';secondary.type='button';secondary.hidden=true;button.insertAdjacentElement('afterend',secondary)}
 let tertiary=$('#contextTertiaryAction');
 if(!tertiary){tertiary=document.createElement('button');tertiary.id='contextTertiaryAction';tertiary.type='button';tertiary.hidden=true;secondary.insertAdjacentElement('afterend',tertiary)}
 const config={buildingSets:['+ Súbor stavieb',addBuildingSet],objects:['+ Súbor stavieb',addObjectGroupWithStarter],professions:['+ Profesia',()=>addProfession()],settings:['Kontrola',runPublicProjectValidation],all:['+ Príloha',()=>addAttachment()]};
 toolbar.classList.toggle('documents-context-actions',currentView==='documents');
 toolbar.classList.toggle('construction-renumber-context-actions',currentView==='objects');
 if(currentView==='documents'){
  button.textContent='Skontrolovať';button.onclick=runDocumentValidation;
  secondary.hidden=false;secondary.textContent='Prečíslovať';secondary.onclick=renumberDocuments;
  documentFileDropMode=false;tertiary.hidden=true;
 }else if(currentView==='objects'){
  button.textContent='+ Súbor stavieb';button.onclick=addObjectGroupWithStarter;
  secondary.hidden=false;secondary.className='';secondary.textContent='Prečíslovať';secondary.onclick=renumberConstructionHierarchy;
  tertiary.hidden=true;
 }else{
  secondary.hidden=true;tertiary.hidden=true;const [label,handler]=config[currentView]||config.all;button.textContent=label;button.onclick=handler;
 }
 const search=$('#search');if(search)search.placeholder=currentView==='settings'?'Hľadať v údajoch projektu':currentView==='buildingSets'?'Hľadať v súboroch stavieb':currentView==='objects'?'Hľadať v stavebných objektoch':currentView==='professions'?'Hľadať v profesiách':currentView==='all'?'Hľadať v prílohách':'Hľadať v dokumentácii';
}
function normalizedText(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function sequentialGaps(values){const nums=[...new Set(values.map(Number).filter(n=>Number.isFinite(n)&&n>0))].sort((a,b)=>a-b);if(nums.length<2)return[];const gaps=[];for(let n=nums[0];n<=nums[nums.length-1];n++)if(!nums.includes(n))gaps.push(n);return gaps}
function runDocumentValidation(){
 const results=[];
 const sectionOrder={A:0,B:1,C:2,D:3,E:4};
 const addResult=(result,sort)=>results.push({...result,sort});
 for(const kind of ['S','P']){
  const objects=sortedConstructionObjects().filter(o=>objectKind(o)===kind),gaps=sequentialGaps(objects.map(o=>objectNumber(o)));
  if(gaps.length)addResult(
   {kind:'object',id:objects[0]?.id||'',title:`Chýbajúce čísla ${kind==='S'?'SO':'PS'}: ${gaps.map(n=>String(n).padStart(2,'0')).join(', ')}`},
   {section:'D',objectNumber:gaps[0]||0,professionCode:'',documentNumber:-1,typeCode:''}
  );
 }
 for(const {o,p} of allProf()){
  const docs=p.dokumenty||[],gaps=sequentialGaps(docs.map(d=>d.cislo_dokumentu));
  if(gaps.length)addResult(
   {kind:'profession',id:p.id,objectId:o.id,title:`${objectDisplay(o)} / ${p.kod}: chýbajúce čísla dokumentov ${gaps.map(n=>String(n).padStart(3,'0')).join(', ')}`},
   {section:'D',objectNumber:objectNumber(o),professionCode:String(p.kod||''),documentNumber:gaps[0]||0,typeCode:''}
  );
  for(const d of docs){
   const numericDocumentNumber=Math.max(0,Number(d.cislo_dokumentu)||0);
   const documentNumber=String(numericDocumentNumber).padStart(3,'0');
   const sectionKey=documentSectionKey(o,d);
   const documentType=String(d.typ_dokumentu||'').trim()||'---';
   const documentName=d.nazov_dokumentu||'Dokument';
   const label=sectionKey==='D'
    ? `D / ${objectDisplay(o)} / ${documentType} - ${documentNumber} - ${documentName}`
    : `${sectionKey} / ${documentType} - ${documentNumber} - ${documentName}`;
   const errors=[];
   if(!['A','B'].includes(sectionKey)&&!normalizedScale(d.mierka)&&!normalizedText(d.nazov_dokumentu).includes('sprava'))errors.push('chýba mierka');
   if(!String(d.zodpovedny_projektant||'').trim())errors.push('chýba zodpovedný projektant');
   if(errors.length)addResult(
    {kind:'document',id:d.id,objectId:o.id,professionId:p.id,title:`${label}: ${errors.join(', ')}`},
    sectionKey==='D'
     ? {section:'D',objectNumber:objectNumber(o),professionCode:String(p.kod||''),documentNumber:numericDocumentNumber,typeCode:documentType}
     : {section:sectionKey,objectNumber:-1,professionCode:'',documentNumber:numericDocumentNumber,typeCode:documentType}
   );
  }
 }
 results.sort((a,b)=>{
  const as=a.sort||{},bs=b.sort||{};
  const sectionDiff=(sectionOrder[as.section]??99)-(sectionOrder[bs.section]??99);
  if(sectionDiff)return sectionDiff;
  if(as.section==='D'){
   const objectDiff=(Number(as.objectNumber)||0)-(Number(bs.objectNumber)||0);
   if(objectDiff)return objectDiff;
   const professionDiff=String(as.professionCode||'').localeCompare(String(bs.professionCode||''),'sk',{sensitivity:'base'});
   if(professionDiff)return professionDiff;
   return (Number(as.documentNumber)||0)-(Number(bs.documentNumber)||0);
  }
  const documentDiff=(Number(as.documentNumber)||0)-(Number(bs.documentNumber)||0);
  if(documentDiff)return documentDiff;
  return String(as.typeCode||'').localeCompare(String(bs.typeCode||''),'sk',{sensitivity:'base'});
 });
 validationResults=results;validationCollapsed=false;render();if(!results.length)toast('Kontrola nenašla žiadne chyby.')
}
// The Stavebné objekty toolbar exclusively renumbers construction groups and
// their objects. Keep the persistent IDs, object affiliations and documents intact.
function renumberConstructionHierarchy(){
 ensureBuildingSets().forEach((set,setIndex)=>{
  set.cislo=setIndex+1; // S01, S02, ... regardless of previous starting number.
  const counters={S:0,P:0};
  for(const object of objectsInSetDisplayOrder(set.id)){
   const kind=objectKind(object);
   object.kod=kind+String(++counters[kind]).padStart(2,'0');
  }
 });
 validationResults=[];render();toast('Číslovanie súborov a stavebných objektov bolo upravené.');
}

// The Dokumenty toolbar renumbers document numbers only. Never change set
// numbers or SO/PS codes here: those are handled exclusively by the button above.
function renumberDocuments(){
 // A, B, C and E are numbered continuously inside the whole section,
 // starting with the current number of the first document in that section.
 for(const sectionKey of ['A','B','C','E']){
  const docs=orderedSectionDocuments(sectionKey).map(({d})=>d);
  if(!docs.length)continue;
  const firstNumber=Number(docs[0].cislo_dokumentu);
  const start=Math.max(0,Number.isFinite(firstNumber)?firstNumber:1);
  docs.forEach((d,i)=>d.cislo_dokumentu=start+i);
 }
 // D is numbered independently inside every profession, starting with
 // that profession's current first document number.
 for(const {o,p} of allProf()){
  const docs=p.dokumenty||[];
  if(!docs.length||documentSectionKey(o,docs[0])!=='D')continue;
  const firstNumber=Number(docs[0].cislo_dokumentu);
  const start=Math.max(0,Number.isFinite(firstNumber)?firstNumber:1);
  docs.forEach((d,i)=>d.cislo_dokumentu=start+i);
 }
 validationResults=[];render();toast('Číslovanie bolo upravené.')
}
function validationHtml(){if(!validationResults.length)return'';return `<div class="validation-panel ${validationCollapsed?'collapsed':''}"><button type="button" class="validation-header" data-validation-toggle><span>Výsledky kontroly</span><strong>${validationResults.length}</strong></button>${validationCollapsed?'':`<table class="validation-table"><tbody>${validationResults.map((r,i)=>`<tr><td><button type="button" data-validation-index="${i}">${esc(r.title)}</button></td></tr>`).join('')}</tbody></table>`}</div>`}
function focusValidationResult(index){const r=validationResults[index];if(!r)return;if(r.objectId)collapsedDocumentObjects.delete(r.objectId);if(r.professionId)collapsedDocumentProfessions.delete(r.professionId);collapsedDocumentSections.delete('D');validationHighlightId=r.id;render();requestAnimationFrame(()=>{let el=r.kind==='document'?document.querySelector(`[data-document-row="${r.id}"]`):r.kind==='profession'?document.querySelector(`[data-profession-collapse="${r.id}"]`)?.closest('tr'):document.querySelector(`[data-object-collapse="${r.id}"]`)?.closest('tr');if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.add('validation-highlight');setTimeout(()=>el.classList.remove('validation-highlight'),2200)}})}
function beginConstructionObjectNameEdit(objectId,button){const o=allObjects().find(x=>x.id===objectId);if(!o)return;const input=document.createElement('input');input.className='construction-name-inline-editor';input.value=o.nazov||'';button.replaceWith(input);requestAnimationFrame(()=>{input.focus();input.select()});const commit=()=>{o.nazov=input.value.trim()||'Stavebný objekt';render()};input.onkeydown=e=>{if(e.key==='Enter')commit();if(e.key==='Escape')render()};input.onblur=commit}

// A blur/change callback can request render while another render is replacing
// the same DOM subtree. Defer nested requests so the browser never receives
// re-entrant innerHTML mutations; commit callbacks still update the model.
let renderActive=false,renderPending=false,renderPendingScheduled=false;
function render(){
 if(renderActive){renderPending=true;return}
 renderActive=true;
 try{return renderInternal()}
 finally{
  renderActive=false;
  if(renderPending&&!renderPendingScheduled){
   renderPending=false;renderPendingScheduled=true;
   queueMicrotask(()=>{renderPendingScheduled=false;render()});
  }
 }
}
function renderInternal(){
 model.projekt.id_projektu=normalizeProjectId(model.projekt.id_projektu)||'123456';
 updateContextButtons();ensureProfessionRegistry();ensureBuildingSets();ensureObjectHierarchy();
 $('#idProjektu').value=model.projekt.id_projektu||''; const idDisplay=$('#idProjektuDisplay'); if(idDisplay) idDisplay.textContent=model.projekt.id_projektu||'—';
 let c=$('#content'),q=normalizeFilter($('#search').value.trim());
 if(currentView==='settings'){const resultCount=projectPropertyRows().filter(x=>matchesFilter(`${x.label} ${projectDisplayValue(x.key,x.value)}`,q)).length+(!q?5:0);c.innerHTML=publicProjectValidationHtml()+settingsHtml(q);bindInputs();updateContextFilterFeedback(q,resultCount);return}
 if(currentView==='buildingSets'){
   const sets=ensureBuildingSets().filter(x=>matchesFilter(`${buildingSetDisplay(x)} ${x.kod_stavby} ${x.nazov}`,q));
   c.innerHTML=`<table class="objects-table building-sets-table two-zone-table"><colgroup><col class="building-set-number-col"><col class="building-set-type-col"><col><col class="action-zone-2"></colgroup><thead><tr><th>Číslo</th><th>Typ</th><th>Názov</th><th class="table-action-zone">Akcie</th></tr></thead><tbody>${sets.map(buildingSetRow).join('')}${buildingSetAddRow()}</tbody></table>`;
   bindInputs();updateContextFilterFeedback(q,sets.length);return;
 }
 if(currentView==='objects'){
   const sets=ensureBuildingSets();
   const matchingCount=sets.reduce((sum,set)=>sum+objectsInSetDisplayOrder(set.id).filter(o=>matchesFilter(`${buildingSetDisplay(set)} ${set.kod_stavby} ${set.nazov} ${objectDisplay(o)} ${o.nazov||''}`,q)).length,0);
   c.innerHTML=constructionHierarchyTable(q);
   bindInputs();bindConstructionHierarchyDrag();focusNewObjectRow();updateContextFilterFeedback(q,matchingCount||sets.filter(set=>matchesFilter(`${buildingSetDisplay(set)} ${set.kod_stavby} ${set.nazov}`,q)).length);return;
 }
 if(currentView==='professions'){
   const rows=catalogRows(professionCatalog,ensureProfessionRegistry(),'profession').filter(x=>x.type==='section'||matchesFilter(`${x.item.kod||''} ${x.item.nazov||''}`,q));
   c.innerHTML=`<table class="objects-table professions-table two-zone-table"><colgroup><col class="profession-code-col"><col><col class="action-zone-2"></colgroup><thead><tr><th class="profession-code-col">Kód</th><th>Názov</th><th class="table-action-zone">Akcie</th></tr></thead><tbody>${rows.map(x=>x.type==='section'?registrySectionRow(x.name):professionModeRow(x.item)).join('')}</tbody></table>`;
   bindInputs();updateContextFilterFeedback(q,rows.filter(x=>x.type!=='section').length);return;
 }
 if(currentView==='all'){
   const rows=catalogRows(attachmentCatalog,ensureAttachmentRegistry(),'attachment').filter(x=>x.type==='section'||matchesFilter(`${x.item.kod||''} ${x.item.nazov||''}`,q));
   c.innerHTML=`<table class="objects-table professions-table attachments-table two-zone-table"><colgroup><col class="profession-code-col"><col><col class="action-zone-2"></colgroup><thead><tr><th class="profession-code-col">Kód</th><th>Názov</th><th class="table-action-zone">Akcie</th></tr></thead><tbody>${rows.map(x=>x.type==='section'?registrySectionRow(x.name):attachmentModeRow(x.item)).join('')}</tbody></table>`;
   bindInputs();updateContextFilterFeedback(q,rows.filter(x=>x.type!=='section').length);return;
 }
 let rows='';
 if(currentView==='documents') rows=documentRowsBySection(q);
 c.innerHTML=rows?`${validationHtml()}<div class="documentation-table-scroll"><table class="documentation-table two-zone-table ${documentFileDropMode?'document-file-drop-active':''}"><colgroup><col class="col-number" style="width:77px"><col class="col-label"><col class="col-type" style="width:47px"><col class="col-revision" style="width:47px"><col class="col-scale" style="width:67px"><col class="col-person"><col class="col-filename"><col class="action-zone-3" style="width:92px"></colgroup><thead><tr><th>Číslo</th><th>Názov</th><th class="doc-type-col">Typ</th><th class="doc-revision-col">Rev</th><th class="doc-scale-col"></th><th>Projektant</th><th>Názov súboru</th><th class="table-action-zone"></th></tr></thead><tbody>${rows}</tbody></table></div>`:'<div class="empty">Dokumentácia zatiaľ neobsahuje žiadne položky.</div>';bindInputs();updateContextFilterFeedback(q,q?c.querySelectorAll('[data-document-row],[data-object-collapse],[data-profession-collapse]').length:1)
}
const documentSections=[
 {key:'A',title:'Zoznam dokumentácie'},
 {key:'B',title:'Súhrnná správa'},
 {key:'C',title:'Situačné výkresy'},
 {key:'D',title:'Dokumentácia stavebných objektov'},
 {key:'E',title:'Prílohy'}
];
const jsonSectionNames=Object.freeze({A:'Zoznam dokumentácie',B:'Súhrnná správa',C:'Situačné výkresy',D:'Dokumentácia stavebných objektov',E:'Prílohy'});
function catalogName(catalog,code){return catalog.find(x=>x.type==='item'&&x.code===code)?.name||''}
function jsonScale(value){const scale=normalizedScale(value);if(!scale)return'';return scale==='rôzna'?'rôzna':`1:${scale}`}
function jsonDocument(d,o,p,section){
 const out={
  cislo_dokumentu:String(Math.max(0,Number(d.cislo_dokumentu)||0)).padStart(3,'0'),
  typ_dokumentu:String(d.typ_dokumentu||p?.kod||''),
  nazov_dokumentu:String(d.nazov_dokumentu||'')
 };
 if(!['A','B'].includes(section)){
  const scale=jsonScale(d.mierka);
  if(scale&&scale!=='1:0')out.mierka=scale
 }
 const revision=String(d.revizia??'').replace(/\D/g,'').padStart(2,'0');
 if(revision&&!/^0+$/.test(revision))out.revizia=revision;
 out.zodpovedny_projektant=String(d.zodpovedny_projektant||'');
 out.nazov_suboru=filename(d,o,p).replace(/\.[^.]+$/,'');
 return out
}
function serializeJsonModel(){
 const stageCode=String(model.projekt.stupen_dokumentacie||'SZP').split(/\s+[–-]\s+/)[0].trim();
 const buildingCode=String(model.projekt.identifikacny_kod_stavby||'1111').split(/\s+[–-]\s+/)[0].trim();
 const result={
  verzia_schema:JSON_SCHEMA_VERSION,
  udaje_projektu:{
   id_projektu:normalizeProjectId(model.projekt.id_projektu||''),
   nazov_projektu:String(model.projekt.nazov_projektu||''),
   stupen_dokumentacie_kod:stageCode,
   stupen_dokumentacie_nazov:documentationStageCatalog.find(x=>x.code===stageCode)?.name||'',
   identifikacny_kod_stavby_kod:buildingCode,
   identifikacny_kod_stavby_nazov:buildingTypeCatalog.find(x=>x.type==='item'&&x.code===buildingCode)?.name||'',
   subor_stavieb_viac:calculatedBuildingSetValue(),
   zoznam_datum:String(model.projekt.datum_vydania||''),
   zoznam_revizia:String(model.projekt.revizia_zoznamu||'00').padStart(2,'0'),
   zoznam_verzia:String(model.projekt.verzia_zoznamu||'v1.0'),
   zoznam_vypracoval:String(model.projekt.zoznam_vypracoval||'')
  },
  dokumentacia:[]
 };
 for(const key of ['A','B','C']){
  const docs=allDocs().filter(({o,d})=>documentSectionKey(o,d)===key).map(({o,p,d})=>jsonDocument(d,o,p,key));
  result.dokumentacia.push({sekcia_kod:key,sekcia_nazov:jsonSectionNames[key],dokumenty:docs})
 }
 const sets=ensureBuildingSets().map(set=>({
  subor_stavieb_cislo:String(Number(set.cislo)||1).padStart(2,'0'),
  subor_stavieb_nazov:String(set.nazov||''),
  identifikacny_kod_stavby_kod:String(set.kod_stavby||'1111'),
  stavebne_objekty:sortedConstructionObjects().filter(o=>o.stavebnySuborId===set.id).map(o=>({
   typ_objektu:objectKind(o)==='P'?'PS':'SO',cislo_objektu:objectNumber(o),nazov_objektu:String(o.nazov||''),
   profesie:(o.profesie||[]).map(p=>({kod_profesie:String(p.kod||''),nazov_profesie:String(p.nazov||professionName(p.kod)||''),dokumenty:(p.dokumenty||[]).map(d=>jsonDocument(d,o,p,'D'))}))
  }))
 }));
 result.dokumentacia.push({sekcia_kod:'D',sekcia_nazov:jsonSectionNames.D,stavebne_subory:sets});
 const edocs=allDocs().filter(({o,d})=>documentSectionKey(o,d)==='E').map(({o,p,d})=>jsonDocument(d,o,p,'E'));
 result.dokumentacia.push({sekcia_kod:'E',sekcia_nazov:jsonSectionNames.E,dokumenty:edocs});
 return result
}
function parseJsonScale(value){const raw=String(value||'').trim();if(!raw)return'';if(normalizeFilter(raw)==='rozna'||normalizeFilter(raw)==='rozne')return'rôzna';return raw.replace(/^1\s*:\s*/,'').replace(/\D/g,'')}
function internalDocumentFromJson(src,section){
 const type=String(src.typ_dokumentu||src.typ_dokumentu_kod||src.typ||'').trim().toUpperCase();
 return {...newDoc(Number(src.cislo_dokumentu)||0),nazov_dokumentu:String(src.nazov_dokumentu||src.nazov||''),typ_dokumentu:type,revizia:String(src.revizia??src.revizia_dokumentu??'00').replace(/^R-?/i,'').padStart(2,'0'),mierka:['A','B'].includes(section)?'':parseJsonScale(src.mierka),zodpovedny_projektant:String(src.zodpovedny_projektant||''),pripona:'pdf',cast:`${section}00`}
}
function modelFromStructuredJson(data){
 const u=data.udaje_projektu||{};
 const projekt={
  id_projektu:normalizeProjectId(u.id_projektu||'123456')||'123456',nazov_projektu:String(u.nazov_projektu||''),
  stupen_dokumentacie:String(u.stupen_dokumentacie_kod||'SZP'),identifikacny_kod_stavby:String(u.identifikacny_kod_stavby_kod||'1111'),
  datum_vydania:String(u.zoznam_datum||''),revizia_zoznamu:String(u.zoznam_revizia||'00'),verzia_zoznamu:String(u.zoznam_verzia||'v1.0'),
  zoznam_vypracoval:String(u.zoznam_vypracoval||'')
 };
 const objects=[],customProfessions=new Map(),customAttachments=new Map();
 const sections=Array.isArray(data.dokumentacia)?data.dokumentacia:Object.values(data.dokumentacia||{});
 const byKey=new Map(sections.map(x=>[String(x.sekcia_kod||x.pismeno||'').toUpperCase(),x]));
 for(const key of ['A','B','C','E']){
  const section=byKey.get(key)||{};const docs=Array.isArray(section.dokumenty)?section.dokumenty:[];
  const cast={id:uid(),kod:`${key}00`,nazov:String(section.sekcia_nazov||jsonSectionNames[key]),typ:'cast',profesie:[]};
  if(key==='E'){
   const groups=new Map();for(const src of docs){const d=internalDocumentFromJson(src,key),code=d.typ_dokumentu||'SZS';if(!groups.has(code))groups.set(code,{id:uid(),kod:code,nazov:catalogName(attachmentCatalog,code)||String(src.typ_dokumentu_nazov||code),dokumenty:[]});groups.get(code).dokumenty.push(d);if(!attachmentCatalog.some(x=>x.type==='item'&&x.code===code))customAttachments.set(code,groups.get(code).nazov)}cast.profesie=[...groups.values()]
  }else{
   const fixed={A:'AAA',B:'SPR',C:'SIT'}[key],p={id:uid(),kod:fixed,nazov:codes.typy[fixed]||fixed,dokumenty:docs.map(x=>internalDocumentFromJson(x,key))};if(p.dokumenty.length)cast.profesie=[p]
  }
  objects.push(cast)
 }
 const dSection=byKey.get('D')||{};
 const importedSets=Array.isArray(dSection.stavebne_subory)?dSection.stavebne_subory:[{cislo_suboru:'01',identifikacny_kod_stavby_kod:String(u.identifikacny_kod_stavby_kod||'1111'),nazov_suboru:'Hlavný stavebný súbor',stavebne_objekty:(dSection.stavebne_objekty||dSection.objekty||[])}];
 const stavebneSubory=importedSets.map((x,i)=>({id:uid(),cislo:Math.max(1,Number(x.subor_stavieb_cislo??x.cislo_suboru)||i+1),kod_stavby:String(x.identifikacny_kod_stavby_kod||x.kod_stavby||'1111'),nazov:String(x.subor_stavieb_nazov||x.nazov_suboru||x.nazov|| (i===0?'Hlavný stavebný súbor':'Stavebný súbor'))}));
 for(let setIndex=0;setIndex<importedSets.length;setIndex++)for(const srcO of (importedSets[setIndex].stavebne_objekty||[])){
  const kind=String(srcO.typ_objektu||'SO').toUpperCase()==='PS'?'P':'S',number=String(srcO.cislo_objektu||'1').replace(/\D/g,'').padStart(2,'0');
  const o={id:uid(),kod:`${kind}${number}`,nazov:String(srcO.nazov_objektu||'Stavebný objekt'),typ:'object',stavebnySuborId:stavebneSubory[setIndex].id,profesie:[]};
  for(const srcP of (srcO.profesie||[])){
   const code=String(srcP.kod_profesie||srcP.kod||'ASR').toUpperCase(),name=String(srcP.nazov_profesie||professionName(code)||code);
   const p={id:uid(),kod:code,nazov:name,dokumenty:(srcP.dokumenty||[]).map(x=>internalDocumentFromJson(x,'D'))};o.profesie.push(p);
   if(!professionCatalog.some(x=>x.type==='item'&&x.code===code))customProfessions.set(code,name)
  }objects.push(o)
 }
 const m=normalize({verzia_schema:String(data.verzia_schema||'1.0'),projekt,lokalita:{adresa:blankPublicAddress()},stavebnik:newPublicBuilder(),_rawPersonsIndex:null,_rawLocationIndex:null,_opaqueVyjadrenia:null,_builderIdentityDirty:false,stavebneSubory,sekcie:[{id:uid(),kod:'KOMPLET',nazov:'Kompletný zoznam dokumentácie',objekty:objects}],prilohy:[]});
 applyLegacyMainFallbackPublic(data,m);
 const previousModel=model;model=m;ensureProfessionRegistry();ensureAttachmentRegistry();model=previousModel;
 for(const [kod,nazov] of customProfessions)if(!m.professionRegistry.some(x=>x.kod===kod))m.professionRegistry.push({id:uid(),kod,nazov,system:false});
 for(const [kod,nazov] of customAttachments)if(!m.attachmentRegistry.some(x=>x.kod===kod))m.attachmentRegistry.push({id:uid(),kod,nazov,system:false});
 return m
}
function importJsonData(data){return data&&data.udaje_projektu&&data.dokumentacia?modelFromStructuredJson(data):normalize(data)}

function documentSectionKey(o,d){const code=String(o?.kod||d?.cast||'');if(code==='A00')return'A';if(code==='B00')return'B';if(code==='C00')return'C';if(code==='E00')return'E';return'D'}
function sectionHeaderRow(section,itemCount=0){
 const empty=itemCount===0?'<span class="empty-suffix">&nbsp;&nbsp;&nbsp;(prázdne)</span>':'';
 const usesDownArrow=['A','B','C','D','E'].includes(section.key);
 const multiSets=ensureBuildingSets().length>1;
 const dTitle=multiSets?'Pridať súbor stavieb':'Pridať stavebný objekt';
 const dAttr=multiSets?'data-add-section-building-set="D"':'data-add-section-object="D"';
 const addAction=headerIcon(usesDownArrow?'btn-down-action':'btn-white',section.key==='D'?dTitle:'Pridať dokument',section.key==='D'?dAttr:`data-add-section-doc="${section.key}"`,iconDown);
 const eToggle=section.key==='E'?eSectionToggleButton():'';
 const action=addAction+eToggle;
 return `<tr class="document-section section-${section.key.toLowerCase()}"><td colspan="7" class="hierarchy-header-cell" data-section-collapse="${section.key}"><strong>${section.key} – ${esc(section.title)}</strong>${empty}</td><td class="table-action-zone subheader-actions">${action}</td></tr>`
}
function headerIcon(kind,title,attrs,path){return `<button type="button" class="icon-btn header-action ${kind}" ${attrs} title="${title}" aria-label="${title}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">${path}</svg></button>`}
function eSectionToggleButton(){
 const on=Boolean(model.eSectionToggle);
 const mark=on?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 12.5L10 17L18.5 7"/></svg>';
 return `<button type="button" class="icon-btn header-action e-section-toggle ${on?'is-on':'is-off'}" data-e-section-toggle title="${on?'Vypnúť':'Zapnúť'}" aria-label="${on?'Vypnúť':'Zapnúť'}">${mark}</button>`
}
const iconPlus='<path d="M12 5v14M5 12h14"></path>',iconDown='<path d="M12 5v14M7 14l5 5 5-5"></path>',iconCopy='<rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',iconTrash='<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',iconMove='<path d="M5 12h13M14 7l5 5-5 5"></path>';
function buildingSetSubsectionRow(set){
 const objects=sortedConstructionObjects().filter(o=>o.stavebnySuborId===set.id),documentCount=objects.reduce((sum,o)=>sum+(o.profesie||[]).reduce((n,p)=>n+(p.dokumenty||[]).length,0),0),empty=documentCount===0?'<span class="empty-suffix">&nbsp;&nbsp;&nbsp;(prázdne)</span>':'';
 const actions=headerIcon('btn-down-action','Pridať stavebný objekt',`data-add-object-to-building-set="${set.id}"`,iconDown)+headerIcon('btn-copy','Duplikovať súbor stavieb',`data-duplicate-doc-building-set="${set.id}"`,iconCopy)+headerIcon('btn-danger','Zmazať súbor stavieb',`data-delete-doc-building-set="${set.id}"`,iconTrash);
 return `<tr class="document-building-set-subsection"><td colspan="7" class="hierarchy-header-cell" data-building-set-collapse="${set.id}"><strong>D – S${String(Number(set.cislo)||1).padStart(2,'0')} – ${esc(set.nazov||'Stavebný súbor')}</strong>${empty}</td><td class="table-action-zone subheader-actions">${actions}</td></tr>`
}
function constructionSubsectionRow(o){
 const documentCount=(o.profesie||[]).reduce((sum,p)=>sum+(p.dokumenty||[]).length,0),empty=documentCount===0?'<span class="empty-suffix">&nbsp;&nbsp;&nbsp;(prázdne)</span>':'';
 const actions=headerIcon('btn-down-action','Pridať profesiu',`data-header-add-prof="${o.id}"`,iconDown)+headerIcon('btn-copy','Duplikovať stavebný objekt',`data-header-duplicate-object="${o.id}"`,iconCopy)+headerIcon('btn-danger','Zmazať stavebný objekt',`data-del-object="${o.id}"`,iconTrash);
 const sets=ensureBuildingSets(),set=sets.find(s=>s.id===o.stavebnySuborId)||sets[0],prefix=sets.length===1?`D – ${esc(objectDisplay(o))} – `:`D – S${String(Number(set?.cislo)||1).padStart(2,'0')} – ${esc(objectDisplay(o))} – `;
 return `<tr class="document-subsection section-d-subsection"><td colspan="7" class="hierarchy-header-cell" data-object-collapse="${o.id}"><strong>${prefix}</strong><button type="button" class="construction-name-inline-button" data-object-name-edit="${o.id}">${esc(o?.nazov||'')}</button>${empty}</td><td class="table-action-zone subheader-actions">${actions}</td></tr>`
}
function professionSubsectionRow(o,p){
 const code=String(p?.kod||'INE').toUpperCase(),name=p?.nazov||professionName(code),empty=(p.dokumenty||[]).length===0?'<span class="empty-suffix">&nbsp;&nbsp;&nbsp;(prázdne)</span>':'';
 const actions=headerIcon('btn-down-action','Pridať dokument',`data-add-prof-doc="${p.id}"`,iconDown)+headerIcon('btn-white','Presunúť profesiu',`data-move-prof="${p.id}"`,iconMove)+headerIcon('btn-danger','Zmazať profesiu',`data-del-prof="${p.id}"`,iconTrash);
 return `<tr class="document-profession-subsection"><td colspan="7"><div class="profession-header-layout"><button type="button" class="profession-subheader-button" data-profession-header="${p.id}" title="Zmeniť profesiu"><strong>${esc(code)} – ${esc(name)}</strong>${empty}<span class="profession-dropdown-mark" aria-hidden="true">▾</span></button><span class="profession-drag-zone" data-profession-drag="${p.id}" data-profession-object="${o.id}" title="Presunúť profesiu v rámci stavebného objektu"></span><button type="button" class="profession-collapse-space" data-profession-collapse="${p.id}" data-object-id="${o.id}" aria-label="Zbaliť alebo rozbaliť profesiu"></button></div></td><td class="table-action-zone subheader-actions">${actions}</td></tr>`
}
function documentRowsBySection(q=''){
 const grouped=new Map(documentSections.map(x=>[x.key,[]]));
 for(const item of allDocs()){
  if(q&&!matchesFilter(`${item.o?.kod||''} ${item.o?.nazov||''} ${item.p?.kod||''} ${item.p?.nazov||''} ${JSON.stringify(item.d)}`,q))continue;
  grouped.get(documentSectionKey(item.o,item.d))?.push(item)
 }
 return documentSections.map(section=>{
  let items=grouped.get(section.key)||[];
  if(section.key!=='D'){
   items=items.sort((a,b)=>{const ao=Number.isFinite(Number(a.d._displayOrder))?Number(a.d._displayOrder):Number.MAX_SAFE_INTEGER,bo=Number.isFinite(Number(b.d._displayOrder))?Number(b.d._displayOrder):Number.MAX_SAFE_INTEGER;return ao-bo});
   const header=sectionHeaderRow(section,items.length);if(collapsedDocumentSections.has(section.key))return header;
   return header+items.map(({o,p,d})=>documentRow(o,p,d,section.key)).join('');
  }
  const sets=ensureBuildingSets();
  const allConstructionObjects=sortedConstructionObjects().filter(o=>!q||matchesFilter(`${objectDisplay(o)} ${o.nazov||''} ${(o.profesie||[]).map(p=>`${p.kod||''} ${p.nazov||''} ${(p.dokumenty||[]).map(d=>JSON.stringify(d)).join(' ')}`).join(' ')}`,q));
  const totalDocs=allConstructionObjects.reduce((sum,o)=>sum+(o.profesie||[]).reduce((n,p)=>n+(p.dokumenty||[]).length,0),0);
  const header=sectionHeaderRow(section,totalDocs);if(collapsedDocumentSections.has(section.key))return header;
  const renderObjects=objects=>objects.map(o=>{
   const objectHeader=constructionSubsectionRow(o);if(collapsedDocumentObjects.has(o.id))return objectHeader;
   const professions=(o.profesie||[]).filter(p=>!q||matchesFilter(`${p.kod||''} ${p.nazov||''} ${(p.dokumenty||[]).map(d=>JSON.stringify(d)).join(' ')}`,q));
   return objectHeader+professions.map(p=>{
    const professionHeader=professionSubsectionRow(o,p);
    if(collapsedDocumentProfessions.has(p.id))return professionHeader;
    return professionHeader+(p.dokumenty||[]).filter(d=>!q||matchesFilter(`${o.kod||''} ${o.nazov||''} ${p.kod||''} ${p.nazov||''} ${JSON.stringify(d)}`,q)).map(d=>documentRow(o,p,d,section.key)).join('');
   }).join('');
  }).join('');
  if(sets.length===1)return header+renderObjects(allConstructionObjects.filter(o=>o.stavebnySuborId===sets[0].id));
  return header+sets.map(set=>{
   const objects=allConstructionObjects.filter(o=>o.stavebnySuborId===set.id);
   const setHeader=buildingSetSubsectionRow(set);
   return setHeader+(collapsedDocumentBuildingSets.has(set.id)?'':renderObjects(objects));
  }).join('')
 }).join('')
}

function nextBuildingSetNumber(){const used=new Set(ensureBuildingSets().map(x=>Number(x.cislo)));let n=1;while(used.has(n))n++;return n}
function createObjectForSet(setId,name='Stavebný objekt'){
 const used=new Set(allObjects().filter(o=>o.stavebnySuborId===setId&&objectKind(o)==='S').map(o=>Number(objectNumber(o))));let n=1;while(used.has(n))n++;
 const o={id:uid(),kod:'S'+String(n).padStart(2,'0'),nazov:name,stavebnySuborId:setId,profesie:[]};addStarterProfessionToObject(o);model.sekcie[0].objekty.push(o);return o
}
function addObjectGroupWithStarter(){const n=nextBuildingSetNumber(),set={id:uid(),cislo:n,kod_stavby:'1111',nazov:'Stavebný súbor'};model.stavebneSubory.push(set);const o=createObjectForSet(set.id);pendingNewObjectId=o.id;render()}
function addBuildingSet(){addObjectGroupWithStarter()}
function duplicateBuildingSet(id){
 const src=ensureBuildingSets().find(x=>x.id===id);if(!src)return;
 const set={id:uid(),cislo:nextBuildingSetNumber(),kod_stavby:src.kod_stavby,nazov:'Stavebný súbor'};model.stavebneSubory.push(set);
 const sourceObjects=objectsInSetDisplayOrder(id);for(const source of sourceObjects){const clone=structuredClone(source);clone.id=uid();clone.stavebnySuborId=set.id;clone.profesie=(clone.profesie||[]).map(p=>({...p,id:uid(),dokumenty:(p.dokumenty||[]).map(d=>({...d,id:uid()}))}));model.sekcie[0].objekty.push(clone)}
 if(!sourceObjects.length)createObjectForSet(set.id);render()
}
function deleteBuildingSet(id){const sets=ensureBuildingSets();if(sets[0]?.id===id||sets.length<=1)return;const ids=new Set(objectsInSetDisplayOrder(id).map(o=>o.id));model.sekcie.forEach(sec=>sec.objekty=sec.objekty.filter(o=>!ids.has(o.id)));model.stavebneSubory=sets.filter(x=>x.id!==id);render()}
function buildingSetRow(x){return ''}
function buildingSetAddRow(){return ''}
function showBuildingSetTypeMenu(button,id){closeFloatingEditor();const set=ensureBuildingSets().find(x=>x.id===id);if(!set)return;const menu=document.createElement('div');menu.className='doc-type-menu building-set-type-menu';menu.innerHTML=buildingTypeCatalog.map(x=>x.type==='section'?`<div class="project-menu-section">${esc(x.name)}</div>`:`<button type="button" data-building-set-code="${x.code}" class="${set.kod_stavby===x.code?'selected':''}"><strong>${x.code}</strong><span>${esc(x.name)}</span></button>`).join('');positionFloatingMenu(menu,button);menu.querySelectorAll('[data-building-set-code]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();e.stopPropagation();set.kod_stavby=b.dataset.buildingSetCode;closeFloatingEditor();render()})}
function objectModeRow(o){const kind=objectKind(o),number=objectNumber(o);return `<tr class="object-list-row" data-object-row="${o.id}"><td class="object-number-cell"><span class="object-code-control"><button type="button" class="object-prefix" data-object-prefix="${o.id}" aria-haspopup="listbox" title="Zmeniť typ objektu">${kind==='P'?'PS':'SO'}</button><span class="object-separator">-</span><button type="button" class="object-number-display" data-object-number="${o.id}" title="Upraviť číslo">${number}</button><input class="object-number-input" data-object-number-input="${o.id}" value="${number}" inputmode="numeric" pattern="[0-9]*" maxlength="2" aria-label="Číslo objektu"></span></td><td><input class="object-name-input" data-path="obj:${o.id}:nazov" value="${esc(o.nazov||'')}" aria-label="Názov objektu"></td><td class="object-actions-col table-action-zone"><button type="button" class="icon-btn btn-copy" data-duplicate-object="${o.id}" title="Duplikovať objekt" aria-label="Duplikovať objekt"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button><button type="button" class="icon-btn btn-danger" data-del-object="${o.id}" title="Zmazať objekt" aria-label="Zmazať objekt"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></td></tr>`}
function objectAddRow(){return `<tr class="object-add-row"><td colspan="2"><button type="button" class="object-add-button" data-add-object-row title="Pridať stavebný objekt" aria-label="Pridať stavebný objekt"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 4v16M4 12h16"></path></svg></button></td><td class="table-action-zone"></td></tr>`}
function focusNewObjectRow(){if(!pendingNewObjectId)return;const id=pendingNewObjectId;pendingNewObjectId=null;requestAnimationFrame(()=>{const row=document.querySelector(`[data-object-row="${id}"]`);if(!row)return;row.classList.add('object-row-created');row.scrollIntoView({block:'center',behavior:'smooth'});setTimeout(()=>row.classList.remove('object-row-created'),2600)})}
function usedProfessionCodes(){return new Set(allProf().map(({p})=>String(p.kod||'').toUpperCase()))}

function registrySectionRow(name){return `<tr class="registry-section-row"><td colspan="2">${esc(name)}</td><td class="table-action-zone"></td></tr>`}
function attachmentModeRow(p){return `<tr class="object-list-row profession-list-row"><td><input class="profession-code-input" data-registry-attachment="${p.id}:kod" value="${esc(p.kod)}" maxlength="3" ${p.system?'readonly':''}></td><td><input class="object-name-input registry-name-input" data-registry-attachment="${p.id}:nazov" value="${esc(p.nazov)}" ${p.system?'readonly':''}></td><td class="object-actions-col table-action-zone"><button type="button" class="icon-btn btn-copy" data-duplicate-registry-attachment="${p.id}" title="Duplikovať prílohu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">${iconCopy}</svg></button><button type="button" class="icon-btn btn-danger" data-del-registry-attachment="${p.id}" title="Zmazať prílohu" ${p.system?'disabled':''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">${iconTrash}</svg></button></td></tr>`}
// v249: Reveal newly created registry rows only after the table has been rebuilt.
// Use the PAGE scrollbar (not the table's horizontal scrollbar).
function revealAddedRegistryEntry(kind,id,placement){
 const viewAtCreation=currentView;
 const search=$('#search');
 if(search&&search.value){search.value='';modeSearchValues[currentView]=''}
 // Private supports collapsible "Užívateľské" groups. A new row must not be
 // inserted into a group that is still visually collapsed.
 if(typeof collapsedRegistryGroups!=='undefined')collapsedRegistryGroups[kind]?.delete('Užívateľské');
 render();
 requestAnimationFrame(()=>{
  if(currentView!==viewAtCreation)return;
  const selector=kind==='profession'?'[data-registry-prof]':'[data-registry-attachment]';
  const field=Array.from(document.querySelectorAll(selector)).find(el=>el.getAttribute(kind==='profession'?'data-registry-prof':'data-registry-attachment')===id+':kod');
  if(!field)return;
  const row=field.closest('tr');if(!row)return;
  const scroller=document.scrollingElement||document.documentElement;
  const limit=Math.max(0,scroller.scrollHeight-scroller.clientHeight);
  if(limit<=0)return; // No vertical scrollbar: no movement needed.
  const position=placement==='center'
   ?scroller.scrollTop+row.getBoundingClientRect().top+row.getBoundingClientRect().height/2-scroller.clientHeight/2
   :limit;
  window.scrollTo(0,Math.max(0,Math.min(limit,position)));
 });
}
function addAttachment(){ensureAttachmentRegistry();let n=1,k;do{k='X'+String(n++).padStart(2,'0')}while(model.attachmentRegistry.some(p=>p.kod===k));const entry={id:uid(),kod:k,nazov:'Nová príloha',system:false};model.attachmentRegistry.push(entry);revealAddedRegistryEntry('attachment',entry.id,'bottom')}
function professionModeRow(p){const used=usedProfessionCodes().has(String(p.kod||'').toUpperCase()),emphasized=emphasizedProfessionCodes.has(String(p.kod||'').toUpperCase());return `<tr class="object-list-row profession-list-row ${used?'profession-used':''} ${emphasized?'profession-emphasized':''} ${String(p.kod||'').toUpperCase()==='ASR'?'profession-asr':''}"><td><input class="profession-code-input" data-registry-prof="${p.id}:kod" value="${esc(p.kod)}" maxlength="3" ${p.system?'readonly':''}></td><td><input class="object-name-input registry-name-input" data-registry-prof="${p.id}:nazov" value="${esc(p.nazov)}" ${p.system?'readonly':''}></td><td class="object-actions-col table-action-zone"><button type="button" class="icon-btn btn-copy" data-duplicate-registry-prof="${p.id}" title="Duplikovať profesiu" aria-label="Duplikovať profesiu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">${iconCopy}</svg></button><button type="button" class="icon-btn btn-danger" data-del-registry-prof="${p.id}" title="Zmazať profesiu" aria-label="Zmazať profesiu" ${p.system?'disabled':''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">${iconTrash}</svg></button></td></tr>`}
function objectRow(o){return `<tr class="row-object"><td><button class="tree-toggle" data-toggle="${o.id}">${expanded.has(o.id)?'▾':'▸'}</button><b>${esc(o.kod)}</b></td><td><input data-path="object:${o.id}:nazov" value="${esc(o.nazov)}"></td><td colspan="5"><span class="badge">${(o.profesie||[]).length} profesií</span></td><td class="muted">Zmena kódu sa prenesie do všetkých názvov súborov</td><td class="actions"><button data-add-prof="${o.id}">+ Profesia</button><button class="danger" data-del-object="${o.id}">×</button></td></tr>`}
function professionRow(o,p){return `<tr class="row-profession"><td class="indent-1"><button class="tree-toggle" data-toggle="${p.id}">${expanded.has(p.id)?'▾':'▸'}</button><b>${esc(o.kod)}.${esc(p.kod)}</b></td><td><input data-path="prof:${p.id}:nazov" value="${esc(p.nazov)}"></td><td colspan="5"><span class="badge">${(p.dokumenty||[]).length} dokumentov</span></td><td class="muted">Zmena profesie sa prenesie do všetkých jej dokumentov</td><td class="actions"><button data-add-doc="${p.id}">+ Dokument</button><button class="danger" data-del-prof="${p.id}">×</button></td></tr>`}
function normalizedScale(v){const raw=String(v||'').trim();if(!raw)return '';const normalized=normalizeFilter(raw);if(normalized==='rozna'||normalized==='rozne')return 'rôzna';const digits=raw.replace(/^1\s*:\s*/, '').replace(/\D/g,'');return digits&&Number(digits)!==0?digits:''}
function scaleDisplay(v){const n=normalizedScale(v);return n==='rôzna'?'rôzna':(n?`1:${n}`:'—')}
function documentRow(o,p,d,sectionKey=documentSectionKey(o,d)){
 const type=String(d.typ_dokumentu||'TXT').slice(0,3).toUpperCase(),revision=String(d.revizia||'00').replace(/\D/g,'').slice(0,2).padStart(2,'0'),number=Math.max(0,Number(d.cislo_dokumentu)||0),file=filename(d,o,p),selected=selectedDocumentIds.has(d.id);
 const hasAssignedFile=attachedDocumentFiles.has(d.id),wasManuallyReplaced=manuallyReplacedDocumentIds.has(d.id);
 return `<tr class="row-document section-row-${sectionKey.toLowerCase()} ${selected?'document-selected':''} ${hasAssignedFile?'document-file-assigned':'document-file-missing'} ${hasAssignedFile&&wasManuallyReplaced?'document-file-replaced':''}" data-document-row="${d.id}">
 <td class="doc-number-cell"><span class="doc-number-wrap editable-affordance"><input type="text" inputmode="numeric" data-path="doc:${d.id}:cislo_dokumentu" value="${esc(number)}" class="doc-number-input" aria-label="Číslo dokumentu"><button type="button" class="number-dial" data-number-dial="${d.id}" title="Potiahnutím zmeniť číslo" aria-label="Potiahnutím zmeniť číslo"><span class="number-dial-core"></span></button></span></td>
 <td class="doc-name-cell"><div class="doc-name-layout"><input class="editable-control doc-name-input" data-path="doc:${d.id}:nazov_dokumentu" value="${esc(d.nazov_dokumentu)}"><button type="button" class="document-selection-zone" data-select-document="${d.id}" title="Vybrať dokument" aria-label="Vybrať dokument"></button></div></td>
 <td class="doc-type-cell"><button type="button" class="doc-type-button editable-control" data-doc-type="${d.id}" title="${esc(codes.typy[type]||type)}">${esc(type)}</button></td>
 <td class="doc-revision-cell"><button type="button" class="doc-revision-display editable-control" data-doc-revision="${d.id}">${revision==='00'?'—':`R${esc(revision)}`}</button><input data-path="doc:${d.id}:revizia" value="${esc(revision)}" maxlength="2" inputmode="numeric" class="doc-revision-input editable-control" aria-label="Revízia"></td>
 <td class="doc-scale-cell ${sectionKey==='A'||sectionKey==='B'?'doc-scale-disabled':''}">${sectionKey==='A'||sectionKey==='B'?'':`<button type="button" class="doc-scale-display editable-control" data-doc-scale="${d.id}">${esc(scaleDisplay(d.mierka))}</button><input class="doc-scale-input editable-control" data-doc-scale-input="${d.id}" value="${esc(normalizedScale(d.mierka))}" inputmode="text" aria-label="Mierka">`}</td>
 <td class="doc-person-cell"><input class="doc-person-input editable-control" data-path="doc:${d.id}:zodpovedny_projektant" data-person-picker="${d.id}" value="${esc(d.zodpovedny_projektant||'')}" placeholder="Zodpovedný projektant" autocomplete="off"></td>
 <td class="filename-cell"><input class="filename-input editable-control" data-filename-editor="${d.id}" value="${esc(file)}" aria-label="Vypočítaný názov súboru"></td>
 <td class="actions doc-actions table-action-zone"><button type="button" class="icon-btn suffix-toggle ${includePdfSuffixInSelection?'active':''}" data-suffix-toggle title="${includePdfSuffixInSelection?'Kopírovať vrátane prípony PDF':'Kopírovať bez prípony PDF'}" aria-pressed="${includePdfSuffixInSelection}" aria-label="${includePdfSuffixInSelection?'Vyberať celý názov vrátane .pdf':'Vyberať názov bez .pdf'}"><span class="suffix-label"><span class="suffix-star">*</span><span class="suffix-pdf">.pdf</span></span></button><button type="button" class="icon-btn btn-copy" data-duplicate-doc="${d.id}" title="Duplikovať dokument" aria-label="Duplikovať dokument"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button><button type="button" class="icon-btn btn-danger" data-del-doc="${d.id}" title="Zmazať dokument" aria-label="Zmazať dokument"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></td></tr>`
}

function publicProjectValidationTargets(){
 const a=ensurePublicLocation().adresa,b=ensurePublicBuilder(),out=[['project','id_projektu','ID projektu',model.projekt.id_projektu],['project','nazov_projektu','Názov projektu',model.projekt.nazov_projektu],['address','ulica','Miesto stavby – Ulica',a.ulica],['address','mesto','Miesto stavby – Mesto',a.mesto],['address','psc','Miesto stavby – PSČ',a.psc]];
 if(b.typ_subjektu_kod==='S'){out.push(['builder','meno','Stavebník – Meno',b.meno],['builder','priezvisko','Stavebník – Priezvisko',b.priezvisko])}else if(b.typ_subjektu_kod==='P')out.push(['builder','obchodne_meno','Stavebník – Obchodné meno',b.obchodne_meno]);return out
}
function runPublicProjectValidation(){projectValidationResults=publicProjectValidationTargets().filter(x=>!String(x[3]||'').trim()).map(([scope,key,label])=>({scope,key,title:`${label}: chýba hodnota`}));render();if(!projectValidationResults.length)toast('Kontrola nenašla žiadne chyby.')}
function publicProjectValidationHtml(){if(!projectValidationResults.length)return'';return `<div class="validation-panel"><button type="button" class="validation-header"><span>Výsledky kontroly</span><strong>${projectValidationResults.length}</strong></button><table class="validation-table"><tbody>${projectValidationResults.map((r,i)=>`<tr><td><button type="button" data-project-validation-index="${i}">${esc(r.title)}</button></td></tr>`).join('')}</tbody></table></div>`}
function publicValidationSelector(r){if(r.scope==='project')return `[data-project="${CSS.escape(r.key)}"]`;if(r.scope==='address')return `[data-public-address="${CSS.escape(r.key)}"]`;return `[data-public-builder="${CSS.escape(r.key)}"]`}
function flashPublicProjectValidation(index){const r=projectValidationResults[index];if(!r)return;const el=document.querySelector(publicValidationSelector(r));if(!el)return;el.scrollIntoView({behavior:'smooth',block:'center'});const wasWarn=el.classList.contains('field-warning-required');let step=0;const pulse=()=>{const on=step%2===0;el.classList.toggle('validation-flash-invert',wasWarn&&on);el.classList.toggle('validation-flash-red',!wasWarn&&on);step++;if(step<4)setTimeout(pulse,250);else{el.classList.remove('validation-flash-invert','validation-flash-red');el.focus({preventScroll:true});try{el.select()}catch{}}};pulse()}
function projectPropertyRows(){
 const projectLabels=[['id_projektu','ID projektu'],['nazov_projektu','Názov projektu']];
 const documentationLabels=[['stupen_dokumentacie','Stupeň dokumentácie'],['identifikacny_kod_stavby','Identifikačný kód stavby'],['subor_stavieb','Súbor stavieb'],['datum_vydania','Dátum vydania'],['revizia_zoznamu','Revízia zoznamu'],['verzia_zoznamu','Verzia zoznamu'],['zoznam_vypracoval','Zoznam vypracoval']];
 const make=(items,group)=>items.map(([key,label])=>({key,label,value:model.projekt[key]??'',system:true,group}));
 return make(projectLabels,'project').concat(make(documentationLabels,'documentation'));
}
function projectDisplayValue(key,value){if(key==='subor_stavieb')return calculatedBuildingSetValue();const options=projectCodeRegistry[key];if(!options)return value??'';const code=String(value??'').split(/\s+[–-]\s+/)[0].trim();const found=options.find(x=>x.type!=='section'&&x.code===code);return found?`${code} – ${found.name}`:code}
function projectSettingsTable(rows,extraClass=''){
 return `<table class="objects-table settings-table two-zone-table ${extraClass}"><colgroup><col class="settings-name-col"><col><col class="action-zone-2"></colgroup><tbody>${rows.map(x=>{const required=['id_projektu','nazov_projektu'].includes(x.key),warn=required&&!String(x.value||'').trim()?' field-warning-required':'';const valueCell=x.key==='subor_stavieb'?`<span class="settings-calculated-value">${esc(projectDisplayValue(x.key,x.value))}</span>`:`<input class="${warn.trim()}" ${required?'data-required-warning="1"':''} data-project="${esc(x.key)}" data-custom-project="0" ${projectCodeRegistry[x.key]?'data-project-picker="1"':''} value="${esc(projectDisplayValue(x.key,x.value))}">`;return `<tr class="settings-row-${esc(x.key)}"><td><span class="settings-fixed-label">${esc(x.label)}</span></td><td>${valueCell}</td><td class="table-action-zone"></td></tr>`}).join('')}</tbody></table>`
}
function publicFieldGroup(inputs,layout){return `<div class="public-field-group public-field-${layout}">${inputs.join('')}</div>`}
function publicAddressTable(q=''){
 const a=ensurePublicLocation().adresa,streetMatch=!q||matchesFilter(`Miesto stavby Ulica a číslo ${a.ulica} ${a.supisne_cislo} ${a.orientacne_cislo}`,q),cityMatch=!q||matchesFilter(`Miesto stavby Mesto a PSČ ${a.mesto} ${a.psc}`,q),rows=[];
 if(streetMatch)rows.push(`<tr><td><span class="settings-fixed-label"><span class="ui-label-strong">Miesto stavby</span> – Ulica a číslo</span></td><td>${publicFieldGroup([`<input class="${!String(a.ulica||'').trim()?'field-warning-required':''}" data-required-warning="1" data-public-address="ulica" value="${esc(a.ulica||'')}" placeholder="Ulica">`,`<input data-public-address="supisne_cislo" value="${esc(a.supisne_cislo||'')}" placeholder="Súpisné číslo">`,`<input data-public-address="orientacne_cislo" value="${esc(a.orientacne_cislo||'')}" placeholder="Orientačné číslo">`],'address')}</td><td class="table-action-zone"></td></tr>`);
 if(cityMatch)rows.push(`<tr><td><span class="settings-fixed-label"><span class="ui-label-strong">Miesto stavby</span> – Mesto a PSČ</span></td><td>${publicFieldGroup([`<input class="${!String(a.mesto||'').trim()?'field-warning-required':''}" data-required-warning="1" data-public-address="mesto" value="${esc(a.mesto||'')}" placeholder="Mesto">`,`<input class="${!String(a.psc||'').trim()?'field-warning-required':''}" data-required-warning="1" data-public-address="psc" value="${esc(formatPscPublic(a.psc||''))}" placeholder="PSČ" inputmode="numeric">`],'city')}</td><td class="table-action-zone"></td></tr>`);
 return `<table class="objects-table settings-table public-address-table two-zone-table"><colgroup><col class="settings-name-col"><col><col class="action-zone-2"></colgroup><tbody>${rows.join('')}</tbody></table>`
}
function publicBuilderTable(q=''){
 const b=ensurePublicBuilder(),privatePerson=b.typ_subjektu_kod==='S',typeLabel=subjectTypeName(b.typ_subjektu_kod),identityText=privatePerson?[b.akademicky_titul_pred_menom,b.meno,b.priezvisko,b.akademicky_titul_za_menom].join(' '):b.obchodne_meno;
 const identity=privatePerson?publicFieldGroup([
  `<input data-public-builder="akademicky_titul_pred_menom" value="${esc(b.akademicky_titul_pred_menom||'')}" placeholder="Titul pred menom">`,
  `<input class="${!String(b.meno||'').trim()?'field-warning-required':''}" data-required-warning="1" data-public-builder="meno" value="${esc(b.meno||'')}" placeholder="Meno">`,
  `<input class="${!String(b.priezvisko||'').trim()?'field-warning-required':''}" data-required-warning="1" data-public-builder="priezvisko" value="${esc(b.priezvisko||'')}" placeholder="Priezvisko">`,
  `<input data-public-builder="akademicky_titul_za_menom" value="${esc(b.akademicky_titul_za_menom||'')}" placeholder="Titul za menom">`,
  `<button type="button" class="app-select-control public-builder-type" data-public-builder-type>${esc(typeLabel)}</button>`],'identity'):
  publicFieldGroup([`<input class="${b.typ_subjektu_kod==='P'&&!String(b.obchodne_meno||'').trim()?'field-warning-required':''}" ${b.typ_subjektu_kod==='P'?'data-required-warning="1"':''} data-public-builder="obchodne_meno" value="${esc(b.obchodne_meno||'')}" placeholder="Obchodné meno">`,`<button type="button" class="app-select-control public-builder-type" data-public-builder-type>${esc(typeLabel)}</button>`],'company');
 const addrLabel=privatePerson?'Trvalý pobyt':'Sídlo',rows=[];
 if(!q||matchesFilter(`Stavebník ${typeLabel} ${identityText}`,q))rows.push(`<tr class="public-builder-primary-label"><td><span class="settings-fixed-label ui-label-strong">Stavebník</span></td><td>${identity}</td><td class="table-action-zone"></td></tr>`);
 if(!q||matchesFilter(`${addrLabel} Ulica a číslo ${b.ulica} ${b.supisne_cislo} ${b.orientacne_cislo}`,q))rows.push(`<tr><td><span class="settings-fixed-label">${addrLabel} – Ulica a číslo</span></td><td>${publicFieldGroup([`<input data-public-builder="ulica" value="${esc(b.ulica||'')}" placeholder="Ulica">`,`<input data-public-builder="supisne_cislo" value="${esc(b.supisne_cislo||'')}" placeholder="Súpisné číslo">`,`<input data-public-builder="orientacne_cislo" value="${esc(b.orientacne_cislo||'')}" placeholder="Orientačné číslo">`],'address')}</td><td class="table-action-zone"></td></tr>`);
 if(!q||matchesFilter(`${addrLabel} Mesto a PSČ ${b.mesto} ${b.psc}`,q))rows.push(`<tr><td><span class="settings-fixed-label">${addrLabel} – Mesto a PSČ</span></td><td>${publicFieldGroup([`<input data-public-builder="mesto" value="${esc(b.mesto||'')}" placeholder="Mesto">`,`<input data-public-builder="psc" value="${esc(formatPscPublic(b.psc||''))}" placeholder="PSČ" inputmode="numeric">`],'city')}</td><td class="table-action-zone"></td></tr>`);
 return `<table class="objects-table settings-table public-builder-table two-zone-table"><colgroup><col class="settings-name-col"><col><col class="action-zone-2"></colgroup><tbody>${rows.join('')}</tbody></table>`
}
function settingsHtml(q=''){
 const rows=projectPropertyRows().filter(x=>matchesFilter(`${x.label} ${projectDisplayValue(x.key,x.value)}`,q)),project=rows.filter(x=>x.group==='project'),documentation=rows.filter(x=>x.group==='documentation');
 return `<div class="settings-table-stack">${projectSettingsTable(project,'settings-table-project')}${projectSettingsTable(documentation,'settings-table-documentation')}${publicAddressTable(q)}${publicBuilderTable(q)}</div>`
}
function addProjectProperty(){model.projekt.customProperties=model.projekt.customProperties||[];model.projekt.customProperties.push({key:'custom_'+uid(),label:'Nový údaj',value:''});render()}
function findDoc(id){return allDocs().find(x=>x.d.id===id)?.d} function findProf(id){return allProf().find(x=>x.p.id===id)}
function findDocContext(id){return allDocs().find(x=>x.d.id===id)||null}
function fileExtensionFromName(name){const match=String(name||'').match(/\.([^.\/]+)$/);return match?match[1].toLowerCase().replace(/[^a-z0-9]+/g,''):'bin'}
function absoluteSourcePathFromFile(file){
 // Standard browsers intentionally do not expose an absolute local filesystem path.
 // Desktop/webview runtimes may expose one through non-standard File.path/fullPath/mozFullPath.
 for(const candidate of [file?.path,file?.fullPath,file?.mozFullPath,file?._sourceFullPath]){
  const value=String(candidate||'').trim();
  if(/^[A-Za-z]:[\\/]/.test(value)||/^\\\\[^\\/]+[\\/][^\\/]+/.test(value))return value;
 }
 return '';
}
function sourceDirectoryFromFile(file){
 const full=absoluteSourcePathFromFile(file);
 if(!full)return '';
 const slash=Math.max(full.lastIndexOf('\\'),full.lastIndexOf('/'));
 return slash>=0?full.slice(0,slash):'';
}
function sourceLocationFromFile(file){
 // Preserve this helper for existing import/recovery logic, but never call a basename a path.
 // Relative directory selections may still carry webkitRelativePath; this is not an absolute Windows/UNC path.
 return sourceDirectoryFromFile(file)||String(file?.webkitRelativePath||'').trim();
}
function assignDroppedFileToDocument(documentId,file,handle=null){
 const found=findDocContext(documentId);if(!found||!file)return;
 const wasAlreadyAssigned=attachedDocumentFiles.has(documentId);
 const extension=fileExtensionFromName(file.name),sourceDirectory=sourceDirectoryFromFile(file);
 attachedDocumentFiles.set(documentId,file);if(wasAlreadyAssigned)manuallyReplacedDocumentIds.add(documentId);else manuallyReplacedDocumentIds.delete(documentId);if(handle)attachedDocumentHandles.set(documentId,handle);else attachedDocumentHandles.delete(documentId);
 if(sourceDirectory)attachedDocumentSourceDirectories.set(documentId,sourceDirectory);else attachedDocumentSourceDirectories.delete(documentId);
 manuallyDroppedDocumentIds.add(documentId);found.d.pripona=extension||'bin';found.d.priradeny_subor_nazov=file.name||'';found.d.priradeny_subor_povodna_cesta=sourceDirectory;
 render();
 if(sourceDirectory)toast(`Priradený súbor: ${file.name||'súbor'}`);else toast(`Priradený súbor: ${file.name||'súbor'} · prehliadač neposkytol úplnú cestu; pole path zostane prázdne`)
}
async function validateAttachedDocumentFiles(){
 let missing=0,checked=0;
 for(const [documentId,file] of [...attachedDocumentFiles.entries()]){
  checked++;let current=file,valid=true;const handle=attachedDocumentHandles.get(documentId);
  try{
   if(handle&&handle.kind==='file'){current=await handle.getFile();attachedDocumentFiles.set(documentId,current)}
   else if(file?.slice)await file.slice(0,Math.min(1,file.size||1)).arrayBuffer();
   else valid=false;
  }catch(_){valid=false}
  if(!valid){attachedDocumentFiles.delete(documentId);attachedDocumentHandles.delete(documentId);manuallyReplacedDocumentIds.delete(documentId);missing++;}
 }
 if(missing)toast(`Chýbajúce súbory: ${missing}. Označené oranžovou farbou.`);
 return {checked,missing};
}
let documentFileDragHoverRow=null;
function clearDocumentFileDragHover(){
 if(documentFileDragHoverRow?.isConnected)documentFileDragHoverRow.classList.remove('document-file-drag-over');
 documentFileDragHoverRow=null;
 document.querySelectorAll('.document-file-drag-over').forEach(row=>row.classList.remove('document-file-drag-over'));
}
function dataTransferHasFiles(dataTransfer){
 if(!dataTransfer)return false;
 if(dataTransfer.files?.length)return true;
 return Array.from(dataTransfer.types||[]).includes('Files');
}
function documentFileDropRowFromEvent(e){
 let target=e.target instanceof Element?e.target:null;
 let row=target?.closest?.('[data-document-row]')||null;
 if(!row&&Number.isFinite(e.clientX)&&Number.isFinite(e.clientY))row=document.elementFromPoint(e.clientX,e.clientY)?.closest?.('[data-document-row]')||null;
 return row;
}
function eventIsMainImportDropZone(e){
 const target=e.target instanceof Element?e.target:null;
 return Boolean(target?.closest?.('#dropZone'));
}
function setDocumentFileDragHover(row){
 if(documentFileDragHoverRow===row)return;
 if(documentFileDragHoverRow?.isConnected)documentFileDragHoverRow.classList.remove('document-file-drag-over');
 documentFileDragHoverRow=row||null;
 if(documentFileDragHoverRow)documentFileDragHoverRow.classList.add('document-file-drag-over');
}
async function droppedFileAndHandleFromTransfer(dataTransfer){
 const item=Array.from(dataTransfer?.items||[]).find(x=>x.kind==='file');
 if(item&&typeof item.getAsFileSystemHandle==='function'){
  try{const handle=await item.getAsFileSystemHandle();if(handle?.kind==='file')return {file:await handle.getFile(),handle}}catch(_){}
 }
 const file=(dataTransfer?.files?.length?dataTransfer.files[0]:item?.getAsFile?.())||null;
 return {file,handle:null};
}
function handleDocumentFileDragCapture(e){
 if(!documentFileDropMode||currentView!=='documents'||!dataTransferHasFiles(e.dataTransfer)||eventIsMainImportDropZone(e))return;
 e.preventDefault();
 if(e.dataTransfer)e.dataTransfer.dropEffect='copy';
 setDocumentFileDragHover(documentFileDropRowFromEvent(e));
}
async function handleDocumentFileDropCapture(e){
 if(!documentFileDropMode||currentView!=='documents'||!dataTransferHasFiles(e.dataTransfer)||eventIsMainImportDropZone(e))return;
 // Critical: cancel the browser's native "open dropped file" navigation before any row handler can miss it.
 e.preventDefault();
 e.stopPropagation();
 const row=documentFileDropRowFromEvent(e),{file,handle}=await droppedFileAndHandleFromTransfer(e.dataTransfer);
 clearDocumentFileDragHover();
 if(row&&file)assignDroppedFileToDocument(row.dataset.documentRow,file,handle);
 else if(file)toast('Súbor presuňte priamo na riadok dokumentu');
}
document.addEventListener('dragenter',handleDocumentFileDragCapture,true);
document.addEventListener('dragover',handleDocumentFileDragCapture,true);
document.addEventListener('drop',handleDocumentFileDropCapture,true);
document.addEventListener('dragleave',e=>{if(documentFileDropMode&&currentView==='documents'&&(!e.relatedTarget||e.clientX===0&&e.clientY===0))clearDocumentFileDragHover()},true);
window.addEventListener('blur',clearDocumentFileDragHover);
function bindDocumentFileDropZones(){
 if(!documentFileDropMode)return;
 document.querySelectorAll('[data-document-row]').forEach(row=>{
  row.classList.add('document-file-drop-row');
  row.title=attachedDocumentFiles.has(row.dataset.documentRow)?`Priradený súbor: ${attachedDocumentFiles.get(row.dataset.documentRow).name}. Presunutím nového súboru ho nahradíte.`:'Presuňte súbor na tento riadok';
  row.querySelectorAll('input,textarea,select,button,a,.editable-control,.doc-number-input,.number-dial,.document-selection-zone').forEach(control=>{if('readOnly' in control)control.readOnly=true;control.tabIndex=-1;control.setAttribute('aria-disabled','true')});
 })
}
function orderedSectionDocuments(sectionKey){
 const items=allDocs().filter(({o,d})=>documentSectionKey(o,d)===sectionKey);
 return items.sort((a,b)=>{
  const ao=Number.isFinite(Number(a.d._displayOrder))?Number(a.d._displayOrder):Number.MAX_SAFE_INTEGER;
  const bo=Number.isFinite(Number(b.d._displayOrder))?Number(b.d._displayOrder):Number.MAX_SAFE_INTEGER;
  return ao-bo;
 });
}
function dragGroupForDocument(context){
 if(!context)return null;
 const section=documentSectionKey(context.o,context.d);
 return section==='D'?`D:${context.p?.id||''}`:`${section}`;
}
function orderedDragGroup(context){
 if(!context)return[];
 const section=documentSectionKey(context.o,context.d);
 if(section==='D')return (context.p?.dokumenty||[]).map(d=>({o:context.o,p:context.p,d}));
 return orderedSectionDocuments(section);
}
function dragBlockIds(sourceId){
 const source=findDocContext(sourceId);if(!source)return[];
 const group=dragGroupForDocument(source),ordered=orderedDragGroup(source);
 const selectedInGroup=ordered.filter(x=>selectedDocumentIds.has(x.d.id)&&dragGroupForDocument(x)===group).map(x=>x.d.id);
 return selectedDocumentIds.has(sourceId)&&selectedInGroup.length>1?selectedInGroup:[sourceId];
}
function reorderDocumentBlock(sourceId,targetId,placeAfter=false){
 const source=findDocContext(sourceId),target=findDocContext(targetId);if(!source||!target)return false;
 if(dragGroupForDocument(source)!==dragGroupForDocument(target))return false;
 const ordered=orderedDragGroup(source),blockIds=dragBlockIds(sourceId),blockSet=new Set(blockIds);
 if(!blockIds.length||blockSet.has(targetId))return false;
 const block=ordered.filter(x=>blockSet.has(x.d.id));
 const remaining=ordered.filter(x=>!blockSet.has(x.d.id));
 let to=remaining.findIndex(x=>x.d.id===targetId);if(to<0)return false;if(placeAfter)to++;
 remaining.splice(to,0,...block);
 const section=documentSectionKey(source.o,source.d);
 if(section==='D')source.p.dokumenty=remaining.map(x=>x.d);
 else remaining.forEach((x,i)=>x.d._displayOrder=i);
 return true;
}
function bindProfessionDragSelection(){
 document.querySelectorAll('[data-profession-drag]').forEach(zone=>{
  zone.onpointerdown=e=>{
   if(e.button!==0)return;
   e.preventDefault();e.stopPropagation();
   const sourceId=zone.dataset.professionDrag,objectId=zone.dataset.professionObject;
   const sourceRow=zone.closest('tr.document-profession-subsection');
   if(!sourceRow)return;
   const startX=e.clientX,startY=e.clientY;
   let dragging=false,ghost=null,grabOffsetY=0,targetId=null,after=false;
   const clear=()=>document.querySelectorAll('.profession-drag-target-before,.profession-drag-target-after').forEach(el=>el.classList.remove('profession-drag-target-before','profession-drag-target-after'));
   const move=ev=>{
    if(!dragging&&Math.hypot(ev.clientX-startX,ev.clientY-startY)>=5){
     dragging=true;
     const rect=sourceRow.getBoundingClientRect(),table=document.createElement('table'),body=document.createElement('tbody'),clone=sourceRow.cloneNode(true);
     table.className='documentation-table document-drag-ghost profession-drag-ghost';
     clone.querySelectorAll('button,input').forEach(el=>el.tabIndex=-1);
     [...sourceRow.children].forEach((cell,i)=>{if(clone.children[i])clone.children[i].style.width=`${cell.getBoundingClientRect().width}px`});
     body.appendChild(clone);table.appendChild(body);table.style.left=`${rect.left}px`;table.style.top=`${rect.top}px`;table.style.width=`${rect.width}px`;
     grabOffsetY=startY-rect.top;document.body.appendChild(table);ghost=table;sourceRow.classList.add('document-drag-source');
    }
    if(!dragging)return;
    ghost.style.top=`${ev.clientY-grabOffsetY}px`;
    clear();targetId=null;
    const row=document.elementFromPoint(ev.clientX,ev.clientY)?.closest('tr.document-profession-subsection');
    if(!row||row===sourceRow)return;
    const candidate=row.querySelector('[data-profession-drag]');
    if(!candidate||candidate.dataset.professionObject!==objectId)return;
    targetId=candidate.dataset.professionDrag;
    const rect=row.getBoundingClientRect();const ghostMid=ev.clientY-grabOffsetY+sourceRow.getBoundingClientRect().height/2;
    after=ghostMid>rect.top+rect.height/2;
    row.classList.add(after?'profession-drag-target-after':'profession-drag-target-before');
   };
   const up=()=>{
    document.removeEventListener('pointermove',move,true);document.removeEventListener('pointerup',up,true);
    clear();sourceRow.classList.remove('document-drag-source');ghost?.remove();
    if(!dragging){
     // A pointer gesture below the drag threshold is an ordinary click.
     // Delegate to the existing hierarchy toggle so click and drag coexist.
     sourceRow.querySelector('[data-profession-collapse]')?.click();
     return;
    }
    if(!targetId)return;
    const object=allObjects().find(o=>o.id===objectId);if(!object)return;
    const professions=object.profesie||[],from=professions.findIndex(p=>p.id===sourceId),to=professions.findIndex(p=>p.id===targetId);
    if(from<0||to<0||from===to)return;
    const [item]=professions.splice(from,1);const targetIndex=professions.findIndex(p=>p.id===targetId);
    professions.splice(targetIndex+(after?1:0),0,item);render();
   };
   document.addEventListener('pointermove',move,true);document.addEventListener('pointerup',up,true);
  };
 });
}
function bindDocumentDragSelection(){
 document.querySelectorAll('[data-select-document]').forEach(zone=>{
  zone.onpointerdown=e=>{
   if(e.button!==0)return;e.preventDefault();e.stopPropagation();
   const sourceId=zone.dataset.selectDocument,startX=e.clientX,startY=e.clientY,sourceRow=zone.closest('[data-document-row]');let dragging=false,targetId=null,after=false,ghost=null,grabOffsetY=0;
   const clear=()=>document.querySelectorAll('.document-drag-target-before,.document-drag-target-after').forEach(el=>el.classList.remove('document-drag-target-before','document-drag-target-after'));
   const makeGhost=()=>{if(!sourceRow)return;const rect=sourceRow.getBoundingClientRect(),table=document.createElement('table'),body=document.createElement('tbody'),clone=sourceRow.cloneNode(true);table.className='documentation-table document-drag-ghost';clone.querySelectorAll('input,button').forEach(el=>el.tabIndex=-1);[...sourceRow.children].forEach((cell,i)=>{const w=cell.getBoundingClientRect().width;if(clone.children[i])clone.children[i].style.width=`${w}px`});body.appendChild(clone);table.appendChild(body);table.style.left=`${rect.left}px`;table.style.top=`${rect.top}px`;table.style.width=`${rect.width}px`;grabOffsetY=startY-rect.top;document.body.appendChild(table);sourceRow.classList.add('document-drag-source');ghost=table};
   const move=ev=>{
    if(!dragging&&Math.hypot(ev.clientX-startX,ev.clientY-startY)>=5){dragging=true;document.body.classList.add('document-row-dragging');makeGhost()}
    if(!dragging)return;if(ghost)ghost.style.top=`${ev.clientY-grabOffsetY}px`;clear();const row=document.elementFromPoint(ev.clientX,ev.clientY)?.closest('[data-document-row]');if(!row||row===sourceRow)return;
    const candidate=row.dataset.documentRow,src=findDocContext(sourceId),dst=findDocContext(candidate);if(!src||!dst)return;
    const ss=documentSectionKey(src.o,src.d),ds=documentSectionKey(dst.o,dst.d);if(ss!==ds||(ss==='D'&&src.p?.id!==dst.p?.id))return;
    targetId=candidate;const rect=row.getBoundingClientRect();after=ev.clientY>rect.top+rect.height/2;row.classList.add(after?'document-drag-target-after':'document-drag-target-before');
   };
   const up=ev=>{document.removeEventListener('pointermove',move,true);document.removeEventListener('pointerup',up,true);document.body.classList.remove('document-row-dragging');sourceRow?.classList.remove('document-drag-source');ghost?.remove();clear();if(dragging&&targetId&&reorderDocumentBlock(sourceId,targetId,after)){render();return}selectDocumentRow(sourceId,e)};
   document.addEventListener('pointermove',move,true);document.addEventListener('pointerup',up,true);
  };
 });
}
function normalizedPickerText(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('sk').trim()}
function showProjectCodeMenu(input){
 closeFloatingEditor();const key=input.dataset.project,options=projectCodeRegistry[key];if(!options)return;
 const query=key==='identifikacny_kod_stavby'&&input.dataset.pickerFiltering==='1'?normalizedPickerText(input.value):'';
 const filtered=[];let section=null;
 for(const opt of options){if(opt.type==='section'){section=opt;continue}
  if(query&&!normalizedPickerText(opt.code+' '+opt.name).includes(query))continue;
  if(section){filtered.push(section);section=null}filtered.push(opt);
 }
 const menu=document.createElement('div');menu.className='doc-type-menu project-code-menu';menu.setAttribute('role','listbox');
 menu.innerHTML=filtered.map(x=>x.type==='section'?`<div class="picker-section-header">${esc(x.name)}</div>`:`<button type="button" data-project-code="${esc(x.code)}"><strong>${esc(x.code)}</strong><span>${esc(x.name)}</span></button>`).join('');
 positionFloatingMenu(menu,input);
 menu.querySelectorAll('[data-project-code]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();e.stopPropagation();model.projekt[key]=b.dataset.projectCode;if(key==='identifikacny_kod_stavby')syncSingleBuildingSetCodeFromProject();closeFloatingEditor();render()});
 return filtered.filter(x=>x.type==='item');
}
const nameTitlesBefore=['Bc.','Mgr.','Mgr. art.','Mgr. arch.','Ing.','Ing. arch.','MUDr.','MDDr.','MVDr.','JUDr.','PhDr.','RNDr.','PaedDr.','PharmDr.','ThDr.','ThLic.','doc.','prof.','BA','B.A.','BSc.','B.Sc.','BEng.','B.Eng.','MA','M.A.','MSc.','M.Sc.','MEng.','M.Eng.','MArch.','M.Arch.','LL.B.','LL.M.','Dr.','Dipl.-Ing.'].sort((a,b)=>a.localeCompare(b,'sk'));
const nameTitlesAfter=['PhD.','ArtD.','CSc.','DrSc.'].sort((a,b)=>a.localeCompare(b,'sk'));
function showAcademicTitleMenu(input){
 document.querySelector('.academic-title-menu')?.remove();
 const isBefore=(input.dataset.personField||input.dataset.publicBuilder||'').includes('akademicky_titul_pred_menom');
 const values=(isBefore?nameTitlesBefore:nameTitlesAfter).filter(v=>normalizedPickerText(v).startsWith(normalizedPickerText(input.value)));
 if(!values.length)return;
 const menu=document.createElement('div');menu.className='person-menu academic-title-menu';
 menu.innerHTML=values.map((v,i)=>`<button type="button" data-academic-title-index="${i}">${esc(v)}</button>`).join('');
 positionFloatingMenu(menu,input);
 menu.querySelectorAll('[data-academic-title-index]').forEach(btn=>btn.onpointerdown=e=>{e.preventDefault();e.stopPropagation();const chosen=values[Number(btn.dataset.academicTitleIndex)];input.dataset.academicTitleSelected=chosen;input.value=chosen;input.dispatchEvent(new Event('input',{bubbles:true}));menu.remove();input.focus();input.select()});
}
function bindAcademicTitles(){document.querySelectorAll('[data-person-field],[data-public-builder]').forEach(input=>{
 const key=input.dataset.personField||input.dataset.publicBuilder||'';
 if(!/akademicky_titul_(pred|za)_menom/.test(key))return;
 input.addEventListener('focus',()=>{if(input.dataset.academicTitleSelected!==input.value)showAcademicTitleMenu(input)});
 input.addEventListener('input',()=>{if(input.dataset.academicTitleSelected===input.value)return;delete input.dataset.academicTitleSelected;showAcademicTitleMenu(input)});
 });}
function bindReliableFormNavigation(){
 const selector='[data-project]:not([data-project-picker]):not([readonly]),[data-public-address],[data-public-builder],[data-person-field],[data-statement-field],[data-statements-meta]';
 document.querySelectorAll(selector).forEach(input=>{
 input.addEventListener('keydown',event=>{
  if(event.key!=='Tab'&&event.key!=='Enter')return;
  const fields=[...document.querySelectorAll(selector)].filter(e=>!e.disabled&&e.getClientRects().length);
  const pos=fields.indexOf(input);if(pos<0)return;
  const target=event.key==='Tab'?fields[pos+(event.shiftKey?-1:1)]:input;
  if(!target)return;
  event.preventDefault();event.stopImmediatePropagation();
  const identity=(el)=>{for(const attr of ['data-project','data-public-address','data-public-builder','data-person-field','data-statement-field','data-statements-meta'])if(el.hasAttribute(attr))return [attr,el.getAttribute(attr)];return null};
  const id=identity(target);
  if(input.onchange)input.dispatchEvent(new Event('change',{bubbles:false}));
  requestAnimationFrame(()=>{const match=id?[...document.querySelectorAll('['+id[0]+']')].find(el=>el.getAttribute(id[0])===id[1]):null;
   if(match){match.focus({preventScroll:true});if(typeof match.select==='function')match.select()}
  });
 },true);
 });
}

function closeObjectTypeMenu(){document.querySelector('.object-type-menu')?.remove()}
function showObjectTypeMenu(button,id){
 closeObjectTypeMenu();const menu=document.createElement('div');menu.className='object-type-menu';menu.setAttribute('role','listbox');
 menu.innerHTML='<button type="button" data-kind="S"><strong>SO</strong><span>Stavebný objekt</span></button><button type="button" data-kind="P"><strong>PS</strong><span>Prevádzkový súbor</span></button>';
 positionPopupClearOfTrigger(menu,button,{margin:8,gap:6,scrollbarAllowance:18});
 menu.querySelectorAll('[data-kind]').forEach(x=>x.onclick=e=>{e.stopPropagation();const o=allObjects().find(v=>v.id===id);if(o){o.kod=x.dataset.kind+objectNumber(o);render()}closeObjectTypeMenu()});
}
function editObjectNumber(id){
 const row=document.querySelector(`[data-object-row="${id}"]`),input=row?.querySelector('[data-object-number-input]');if(!row||!input)return;
 document.querySelectorAll('.object-list-row.editing-number').forEach(r=>{if(r!==row)r.classList.remove('editing-number')});
 row.classList.add('editing-number');input.value=objectNumber(allObjects().find(o=>o.id===id));
 requestAnimationFrame(()=>{input.focus();input.select()})
}
function commitObjectNumber(input,renderAfter=true){
 const o=allObjects().find(v=>v.id===input.dataset.objectNumberInput);if(!o)return;
 const digits=input.value.replace(/\D/g,'').slice(0,2);if(digits)o.kod=objectKind(o)+digits.padStart(2,'0');
 if(renderAfter){render();return}
 const row=input.closest('[data-object-row]');row?.classList.remove('editing-number');
 const display=row?.querySelector('[data-object-number]');if(display)display.textContent=objectNumber(o)
}
function editBuildingSetNumber(id){
 const row=document.querySelector(`[data-building-group-row="${id}"]`),input=row?.querySelector('[data-hierarchy-set-number-input]');if(!row||!input)return;
 row.classList.add('editing-set-number');const set=ensureBuildingSets().find(x=>x.id===id);input.value=String(Number(set?.cislo)||1);
 requestAnimationFrame(()=>{input.focus();input.select()})
}
function commitBuildingSetNumber(input){
 const set=ensureBuildingSets().find(x=>x.id===input.dataset.hierarchySetNumberInput);if(!set)return;
 const digits=input.value.replace(/\D/g,'').slice(0,2);set.cislo=Math.max(1,Number(digits)||1);render()
}
function duplicateObject(id){const source=allObjects().find(o=>o.id===id);if(!source)return;const kind=objectKind(source),used=new Set(allObjects().filter(o=>objectKind(o)===kind).map(o=>Number(objectNumber(o))));let n=1;while(used.has(n))n++;const clone=structuredClone(source);clone.id=uid();clone.kod=kind+String(n).padStart(2,'0');clone.profesie=(clone.profesie||[]).map(p=>({...p,id:uid(),dokumenty:(p.dokumenty||[]).map(d=>({...d,id:uid()}))}));const section=model.sekcie.find(s=>(s.objekty||[]).some(o=>o.id===id))||model.sekcie[0];section.objekty.push(clone);render()}

let floatingEditorOutsideController=null;
function closeFloatingEditor(){
 if(floatingEditorOutsideController){floatingEditorOutsideController.abort();floatingEditorOutsideController=null}
 document.querySelectorAll('.doc-type-menu').forEach(x=>x.remove())
}
function pointerIsInsideFloatingEditor(e){
 if(e.target?.closest?.('.doc-type-menu'))return true;
 return [...document.querySelectorAll('.doc-type-menu')].some(menu=>{const r=menu.getBoundingClientRect();return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom})
}
function installFloatingEditorOutsideHandler(trigger){ /* handled by the global pass-through popup dismissor */ }
function positionPopupClearOfTrigger(menu,trigger,{margin=8,gap=6,scrollbarAllowance=22}={}){
 if(!menu.isConnected)document.body.appendChild(menu);
 const r=trigger.getBoundingClientRect();
 menu.style.left=`${margin}px`;menu.style.top=`${margin}px`;menu.style.width='max-content';menu.style.maxWidth=`calc(100vw - ${margin*2}px)`;
 const naturalWidth=Math.ceil(menu.scrollWidth+scrollbarAllowance);
 const width=Math.min(Math.max(naturalWidth,Math.ceil(r.width)),Math.max(1,window.innerWidth-margin*2));
 menu.style.width=`${width}px`;
 const spaceBelow=Math.max(0,window.innerHeight-r.bottom-gap-margin);
 const spaceAbove=Math.max(0,r.top-gap-margin);
 const placeBelow=spaceBelow>=menu.scrollHeight||spaceBelow>=spaceAbove;
 const available=Math.max(48,placeBelow?spaceBelow:spaceAbove);
 menu.style.maxHeight=`${available}px`;
 const height=Math.min(menu.scrollHeight,available);
 const left=Math.max(margin,Math.min(r.left,window.innerWidth-width-margin));
 const top=placeBelow?r.bottom+gap:Math.max(margin,r.top-gap-height);
 menu.style.left=`${left}px`;menu.style.top=`${top}px`;
 menu.dataset.popupPlacement=placeBelow?'below':'above';
}
function positionFloatingMenu(menu,button){positionPopupClearOfTrigger(menu,button,{margin:12,gap:6,scrollbarAllowance:24})}
function documentTypeCatalogFor(d){const found=allDocs().find(x=>x.d.id===d.id);return documentSectionKey(found?.o,d)==='E'?attachmentDocumentTypeMenuRows():standardDocumentTypeCatalog}
function documentTargets(id){return selectedDocumentIds.has(id)&&selectedDocumentIds.size>1?[...selectedDocumentIds]:[id]}
function applyDocumentValue(id,key,value){for(const targetId of documentTargets(id)){const target=findDoc(targetId);if(target)target[key]=value}}
function showLevelTypeMenu(parentMenu,button,d,family){
 const levelMenu=document.createElement('div');levelMenu.className='doc-type-menu level-type-menu';levelMenu.setAttribute('role','listbox');
 const max=family==='N'?99:5,label=family==='N'?'NP':'PP';
 levelMenu.innerHTML=Array.from({length:max},(_,i)=>{const n=i+1,k=family+String(n).padStart(2,'0');return `<button type="button" role="option" data-level-code="${k}"><strong>${k}</strong><span>Podlažie ${n}.${label}</span></button>`}).join('');
 positionFloatingMenu(levelMenu,button);levelMenu.style.zIndex='100002';
 levelMenu.querySelectorAll('[data-level-code]').forEach(x=>x.onpointerdown=e=>{e.preventDefault();e.stopPropagation();applyDocumentValue(d.id,'typ_dokumentu',x.dataset.levelCode);closeFloatingEditor();render()});
}
function showDocumentTypeMenu(button,id){
 closeFloatingEditor();const d=findDoc(id);if(!d)return;
 const menu=document.createElement('div');menu.className='doc-type-menu';menu.setAttribute('role','listbox');
 menu.innerHTML=documentTypeCatalogFor(d).map(x=>{
  if(x.type==='section')return `<div class="doc-type-divider" role="separator"></div>`;
  if(x.type==='levels')return `<button type="button" role="option" data-level-family="${x.family}" class="level-family-row ${String(d.typ_dokumentu).startsWith(x.family)?'selected':''}"><strong>${x.code}</strong><span>${esc(x.name)}</span></button>`;
  return `<button type="button" role="option" data-type-code="${esc(x.code)}" class="${d.typ_dokumentu===x.code?'selected':''}"><strong>${esc(x.code)}</strong><span>${esc(x.name)}</span></button>`
 }).join('');positionFloatingMenu(menu,button);
 menu.querySelectorAll('[data-type-code]').forEach(x=>x.onpointerdown=e=>{e.preventDefault();e.stopPropagation();applyDocumentValue(id,'typ_dokumentu',x.dataset.typeCode);closeFloatingEditor();render()});
 menu.querySelectorAll('[data-level-family]').forEach(x=>x.onpointerdown=e=>{e.preventDefault();e.stopPropagation();showLevelTypeMenu(menu,x,d,x.dataset.levelFamily)});
 installFloatingEditorOutsideHandler(button);
}
function showProfessionHeaderMenu(button,id){
 closeFloatingEditor();
 const found=findProf(id);if(!found)return;
 const {p}=found,menu=document.createElement('div');menu.className='doc-type-menu profession-header-menu';menu.setAttribute('role','listbox');
 menu.innerHTML=professionMenuRows().map(x=>x.type==='section'?`<div class="doc-type-divider" role="separator"></div>`:`<button type="button" role="option" data-profession-code="${x.code}" class="${p.kod===x.code?'selected':''}"><strong>${x.code}</strong><span>${esc(x.name)}</span></button>`).join('');
 positionFloatingMenu(menu,button);
 menu.querySelectorAll('[data-profession-code]').forEach(x=>x.onclick=()=>{p.kod=x.dataset.professionCode;p.nazov=professionName(p.kod);closeFloatingEditor();render()});
 installFloatingEditorOutsideHandler(button);
}
function createStarterDocument(number=1){return {...newDoc(number),nazov_dokumentu:'Dokument',typ_dokumentu:'TXT'} }
function addStarterProfessionToObject(o,code='ASR'){
 if(!o)return null;o.profesie=o.profesie||[];
 let p=o.profesie.find(x=>x.kod===code);
 if(!p){p={id:uid(),kod:code,nazov:professionName(code),dokumenty:[createStarterDocument(1)]};o.profesie.push(p)}
 else if(!(p.dokumenty||[]).length){p.dokumenty=[createStarterDocument(1)]}
 return p
}
function showProfessionChoiceMenu(button,objectId){
 closeFloatingEditor();const o=allObjects().find(x=>x.id===objectId);if(!o)return;const menu=document.createElement('div');menu.className='doc-type-menu profession-header-menu';menu.innerHTML=professionMenuRows().map(x=>x.type==='section'?`<div class="doc-type-divider" role="separator"></div>`:`<button type="button" data-add-prof-code="${x.code}"><strong>${x.code}</strong><span>${esc(x.name)}</span></button>`).join('');positionFloatingMenu(menu,button);menu.querySelectorAll('[data-add-prof-code]').forEach(x=>x.onclick=()=>{const kod=x.dataset.addProfCode;if(!(o.profesie||[]).some(p=>p.kod===kod))o.profesie.push({id:uid(),kod,nazov:professionName(kod),dokumenty:[createStarterDocument(1)]});closeFloatingEditor();render()})
}
function showMoveProfessionMenu(button,professionId){
 closeFloatingEditor();const found=findProf(professionId);if(!found)return;const menu=document.createElement('div');menu.className='doc-type-menu profession-header-menu';menu.innerHTML=sortedConstructionObjects().filter(o=>o.id!==found.o.id).map(o=>`<button type="button" data-target-object="${o.id}"><strong>${esc(objectDisplay(o))}</strong><span>${esc(o.nazov||'')}</span></button>`).join('')||'<div class="menu-empty">Nie je dostupný iný stavebný objekt.</div>';positionFloatingMenu(menu,button);menu.querySelectorAll('[data-target-object]').forEach(x=>x.onclick=()=>{const target=allObjects().find(o=>o.id===x.dataset.targetObject);found.o.profesie=found.o.profesie.filter(p=>p.id!==found.p.id);target.profesie=target.profesie||[];target.profesie.push(found.p);closeFloatingEditor();render()});installFloatingEditorOutsideHandler(button)
}
function createEmptyObject(){const raw=prompt('Číslo stavebného objektu (01–99):','01');if(raw===null)return;const digits=String(raw).replace(/\D/g,'').slice(0,2).padStart(2,'0');const name=prompt('Názov stavebného objektu:','Nový stavebný objekt');if(name===null)return;const o={id:uid(),kod:'S'+digits,nazov:name.trim()||'Stavebný objekt',stavebnySuborId:buildingSetId||ensureBuildingSets()[0].id,profesie:[]};addStarterProfessionToObject(o);model.sekcie[0].objekty.push(o);render()}
function scaleStoredValue(value){const raw=String(value??'').trim();if(!raw)return '';if(/^[0-9]+$/.test(raw)){const n=String(Number(raw));return Number(n)!==0?`1:${n}`:''}return 'rôzna'}
function editDocumentScale(id){const targets=[...documentTargets(id)],d=findDoc(id),input=document.querySelector(`[data-doc-scale-input="${id}"]`),cell=input?.closest('.doc-scale-cell');if(!d||!input||!cell)return;cell.classList.add('editing');input.value=normalizedScale(d.mierka);const choose=value=>{input.value=value;const stored=scaleStoredValue(value);for(const targetId of targets){const target=findDoc(targetId);if(target)target.mierka=stored}requestAnimationFrame(render)};input._scaleChoose=choose;requestAnimationFrame(()=>{input.focus();input.select();showDocumentValueMenu(input,documentSuggestionValues('mierka'),choose,false)})}
function commitDocumentScale(input){const id=input.dataset.docScaleInput,d=findDoc(id);if(!d)return;applyDocumentValue(id,'mierka',scaleStoredValue(input.value));render()}
// v250: One keyboard/commit path for user-defined registry codes and names.
// Keep system-defined entries read-only and outside the custom-row Tab sequence.
function normalizeCustomRegistryCode(value){
 const exceptions={'Ł':'L','ł':'L','Đ':'D','đ':'D','Ð':'D','ð':'D','Þ':'TH','þ':'TH','Æ':'AE','æ':'AE','Œ':'OE','œ':'OE','Ø':'O','ø':'O','ß':'SS','ẞ':'SS','ı':'I'};
 return Array.from(String(value||'')).map(char=>exceptions[char]||char)
  .join('').normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
  .toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,3);
}
function bindCustomRegistryEditor(kind){
 const attr=kind==='profession'?'data-registry-prof':'data-registry-attachment';
 const dataKey=kind==='profession'?'registryProf':'registryAttachment';
 const registry=()=>kind==='profession'?professionOptions():ensureAttachmentRegistry();
 const inputs=Array.from(document.querySelectorAll('input['+attr+']')).filter(el=>!el.readOnly);
 const commit=input=>{
  const [id,key]=(input.dataset[dataKey]||'').split(':');
  const entry=registry().find(x=>x.id===id);
  if(!entry||entry.system)return;
  const value=key==='kod'?normalizeCustomRegistryCode(input.value):input.value.trim();
  if(value)entry[key]=value; // Empty value keeps the current entry (legacy rule).
  input.value=entry[key]||'';
  if(kind==='profession'&&key==='kod'){
   const row=input.closest('tr'),code=String(entry.kod||'').toUpperCase();
   if(row){
    row.classList.toggle('profession-used',usedProfessionCodes().has(code));
    row.classList.toggle('profession-emphasized',emphasizedProfessionCodes.has(code));
    row.classList.toggle('profession-asr',code==='ASR');
   }
  }
 };
 const focusNext=target=>{
  if(!target)return;
  // Do not rerender on blur: that destroys the newly focused field and
  // interrupts Tab/Enter (and can swallow a user's immediate next keystroke).
  target.focus();target.select();
 };
 inputs.forEach((input,index)=>{
  const key=input.dataset[dataKey].split(':')[1];
  if(key==='kod'){
   const format=()=>{
    if(input.isComposing)return;
    const start=input.selectionStart,end=input.selectionEnd;
    const before=normalizeCustomRegistryCode(input.value.slice(0,start??input.value.length));
    const through=normalizeCustomRegistryCode(input.value.slice(0,end??input.value.length));
    const normalized=normalizeCustomRegistryCode(input.value);
    if(input.value!==normalized){input.value=normalized;input.setSelectionRange(before.length,through.length);}
   };
   input.addEventListener('input',format);
   input.addEventListener('compositionend',format);
  }
  input.addEventListener('change',()=>commit(input));
  input.addEventListener('keydown',e=>{
   let target=null;
   if(key==='kod'&&(e.key==='Enter'||(e.key==='Tab'&&!e.shiftKey)))target=inputs[index+1];
   else if(key==='nazov'&&e.key==='Tab'&&!e.shiftKey)target=inputs[index+1];
   else if(e.key==='Tab'&&e.shiftKey)target=inputs[index-1];
   if(!target||e.isComposing)return;
   // The sequence is code -> name -> next custom row code. Never land on action buttons.
   e.preventDefault();
   commit(input);
   focusNext(target);
  });
 });
}

function installDefaultTextSelection(){
 document.querySelectorAll('input:not([type="file"]):not([type="checkbox"]):not([type="radio"]), textarea').forEach(input=>{
  if(input.dataset.selectAllBound)return;input.dataset.selectAllBound='1';
  input.addEventListener('focus',()=>{
   if(input.dataset.suppressSelectOnce==='1'){delete input.dataset.suppressSelectOnce;input.dataset.justFocused='0';return}
   input.dataset.justFocused='1';
   // Select immediately: a queued animation-frame selection can occur after
   // the first keystroke and unexpectedly overwrite newly typed characters.
   if(typeof input.select==='function')input.select();
  });
  input.addEventListener('input',()=>{input.dataset.justFocused='0'});
  input.addEventListener('pointerup',e=>{if(input.dataset.justFocused==='1'){e.preventDefault();input.dataset.justFocused='0'}});
  input.addEventListener('blur',()=>{input.dataset.justFocused='0'});
 });
}

function editDocumentRevision(id){
 const targets=[...documentTargets(id)];
 const button=document.querySelector(`[data-doc-revision="${id}"]`),cell=button?.closest('.doc-revision-cell'),input=cell?.querySelector('.doc-revision-input');if(!cell||!input)return;
 cell.classList.add('editing');requestAnimationFrame(()=>{input.focus();input.select();showDocumentValueMenu(input,documentSuggestionValues('revizia').map(v=>String(v).replace(/\D/g,'').slice(0,2).padStart(2,'0')),value=>{input.value=value;for(const targetId of targets){const target=findDoc(targetId);if(target)target.revizia=value}requestAnimationFrame(render)})})
}
function attachNumberDial(event,id){
 event.preventDefault();event.stopPropagation();const dial=event.currentTarget,core=dial.querySelector('.number-dial-core'),doc=findDoc(id);if(!doc)return;
 const startX=event.clientX,startY=event.clientY;let lastX=startX,lastY=startY,lastTime=performance.now(),dragAccumulator=0;
 const pixelsPerIncrement=8;
 function move(ev){const dx=ev.clientX-lastX,dy=ev.clientY-lastY,dt=Math.max(1,performance.now()-lastTime),distance=Math.hypot(dx,dy),speed=distance/dt*1000;let step=1;if(speed>=1100)step=10;else if(speed>=650)step=5;else if(speed>=280)step=2;const signedMovement=Math.abs(dy)>=Math.abs(dx)?-dy:dx;dragAccumulator+=signedMovement;const increments=Math.trunc(dragAccumulator/pixelsPerIncrement);if(increments){doc.cislo_dokumentu=Math.max(0,(Number(doc.cislo_dokumentu)||0)+increments*step);dragAccumulator-=increments*pixelsPerIncrement;const input=dial.closest('.doc-number-wrap')?.querySelector('.doc-number-input');if(input)input.value=doc.cislo_dokumentu}const tx=ev.clientX-startX,ty=ev.clientY-startY,total=Math.hypot(tx,ty)||1,mag=Math.min(4,total);core.style.transform=`translate(${tx/total*mag}px,${ty/total*mag}px)`;lastX=ev.clientX;lastY=ev.clientY;lastTime=performance.now()}
 function up(){core.style.transform='translate(0,0)';window.removeEventListener('mousemove',move);window.removeEventListener('mouseup',up);render()}
 window.addEventListener('mousemove',move);window.addEventListener('mouseup',up)
}
function projectPeople(){return [...new Set(allDocs().map(x=>String(x.d.zodpovedny_projektant||'').trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'sk'))}
function closePersonMenu(){document.querySelectorAll('.person-menu').forEach(x=>x.remove())}
function showPersonMenu(input,filterByInput=false){
 closePersonMenu();const query=filterByInput?normalizeFilter(input.value):'';const names=projectPeople().filter(n=>matchesFilter(n,query));if(!names.length)return;
 const menu=document.createElement('div');menu.className='person-menu';menu.innerHTML=names.map(n=>`<button type="button" data-person-value="${esc(n)}">${esc(n)}</button>`).join('');
 positionPopupClearOfTrigger(menu,input,{margin:8,gap:6,scrollbarAllowance:22});
 menu.querySelectorAll('[data-person-value]').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();const value=b.dataset.personValue,id=input.dataset.personPicker;input.value=value;if(id)applyDocumentValue(id,'zodpovedny_projektant',value);else input.dispatchEvent(new Event('change',{bubbles:true}));closePersonMenu();requestAnimationFrame(render)},{capture:true}));
}
function documentSuggestionValues(key){
 const values=allDocs().map(({d})=>String(d?.[key]??'').trim()).filter(Boolean);
 if(key==='mierka'){
  values.push('10','50','100','200','500','1000','5000','rôzna');
  return [...new Set(values.map(normalizedScale).filter(Boolean))].sort((a,b)=>{const an=Number(a),bn=Number(b),aNum=Number.isFinite(an),bNum=Number.isFinite(bn);if(aNum&&bNum)return an-bn;if(aNum)return -1;if(bNum)return 1;return a.localeCompare(b,'sk')});
 }
 return [...new Set(values)].sort((a,b)=>a.localeCompare(b,'sk',{numeric:true}));
}
function firstDocumentWords(){
 const permanent=['Technická správa','Výkres','Pôdorys','Rez','Pohľad','Detail','Schéma','Situácia','Správa','Výkaz','Tabuľka'];
 const used=allDocs().map(({d})=>String(d?.nazov_dokumentu||'').trim().split(/\s+/)[0]).filter(Boolean);
 return [...new Set([...permanent,...used])].sort((a,b)=>a.localeCompare(b,'sk'));
}
function showDocumentValueMenu(input,values,onChoose,filterByInput=false){
 closePersonMenu();const query=filterByInput?normalizeFilter(input.value):'';const filtered=values.filter(v=>startsWithFilter(v,query));if(!filtered.length)return;
 const menu=document.createElement('div');menu.className='person-menu document-value-menu';if(input.matches('[data-doc-scale-input]'))menu.classList.add('scale-value-menu');
 menu.innerHTML=filtered.map(v=>`<button type="button" data-document-value="${esc(v)}">${esc(v)}</button>`).join('');
 positionPopupClearOfTrigger(menu,input,{margin:8,gap:6,scrollbarAllowance:22});
 menu.querySelectorAll('[data-document-value]').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();const value=b.dataset.documentValue;onChoose(value);closePersonMenu()},{capture:true}));
}

function popupContainsPointer(popup,e){
 if(e.target?.closest?.('.doc-type-menu,.person-menu,.object-type-menu'))return true;
 const r=popup.getBoundingClientRect();
 return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
}
function closeAllTransientPopups(){
 closeFloatingEditor();
 closePersonMenu();
 closeObjectTypeMenu();
}
function installGlobalPopupPassThroughDismissal(){
 if(document.documentElement.dataset.popupPassThroughBound==='1')return;
 document.documentElement.dataset.popupPassThroughBound='1';
 document.addEventListener('pointerdown',e=>{
  const popups=[...document.querySelectorAll('.doc-type-menu,.person-menu,.object-type-menu')];
  if(!popups.length||popups.some(p=>popupContainsPointer(p,e)))return;
  // Close synchronously during capture, but do not cancel, stop, clone, or replay
  // the event. The original pointer event continues to the clicked control.
  closeAllTransientPopups();
 },true);
}
installGlobalPopupPassThroughDismissal();
function duplicateDocument(id){
 const found=findDocContext(id);if(!found)return;
 const section=documentSectionKey(found.o,found.d);
 const group=section==='D'
  ? (found.p?.dokumenty||[]).map(d=>({o:found.o,p:found.p,d}))
  : orderedSectionDocuments(section);
 const used=new Set(group.map(({d})=>Math.max(0,Number(d.cislo_dokumentu)||0)));
 let next=Math.max(0,Number(found.d.cislo_dokumentu)||0)+1;while(used.has(next))next++;
 const clone={...structuredClone(found.d),id:uid(),cislo_dokumentu:next};
 if(attachedDocumentFiles.has(id)){clone.pripona='pdf';delete clone.priradeny_subor_nazov}
 if(section==='D'){
  // Preserve the user's current profession order and append the duplicate.
  found.p.dokumenty=found.p.dokumenty||[];
  found.p.dokumenty.push(clone);
 }else{
  // Freeze the current visual section order, then append the duplicate at the back.
  group.forEach(({d},i)=>d._displayOrder=i);
  clone._displayOrder=group.length;
  model.prilohy.push(clone);
 }
 selectedDocumentIds.clear();selectedDocumentIds.add(clone.id);lastSelectedDocumentId=clone.id;render()
}
function alignFilenameEnd(input){requestAnimationFrame(()=>{input.scrollLeft=input.scrollWidth})}
function selectFilename(input){const end=includePdfSuffixInSelection?input.value.length:Math.max(0,input.value.lastIndexOf('.'));requestAnimationFrame(()=>{input.setSelectionRange(0,end<0?input.value.length:end);input.scrollLeft=input.scrollWidth})}
function visibleDocumentIds(){return [...document.querySelectorAll('[data-document-row]')].map(r=>r.dataset.documentRow)}
function selectDocumentRow(id,event){const ids=visibleDocumentIds();if(event.shiftKey&&lastSelectedDocumentId&&ids.includes(lastSelectedDocumentId)){const a=ids.indexOf(lastSelectedDocumentId),b=ids.indexOf(id),lo=Math.min(a,b),hi=Math.max(a,b);if(!event.ctrlKey&&!event.metaKey)selectedDocumentIds.clear();ids.slice(lo,hi+1).forEach(x=>selectedDocumentIds.add(x))}else if(event.ctrlKey||event.metaKey){selectedDocumentIds.has(id)?selectedDocumentIds.delete(id):selectedDocumentIds.add(id);lastSelectedDocumentId=id}else{selectedDocumentIds.clear();selectedDocumentIds.add(id);lastSelectedDocumentId=id}render()}
function bindHierarchyClickPair(el,onSingle,onDouble,{ignoreNestedControls=true}={}){
 let timer=null;
 const isIgnored=e=>{
  if(!ignoreNestedControls)return false;
  const control=e.target.closest('input,select,textarea,a,button');
  return !!control&&control!==el;
 };
 el.addEventListener('click',e=>{
  if(isIgnored(e))return;
  clearTimeout(timer);
  timer=setTimeout(()=>{timer=null;onSingle(el,e)},220);
 });
 el.addEventListener('dblclick',e=>{
  if(isIgnored(e))return;
  clearTimeout(timer);timer=null;
  e.preventDefault();
  onDouble(el,e);
 });
}
function bindHierarchyControls(){
 document.querySelectorAll('[data-section-collapse]').forEach(el=>bindHierarchyClickPair(el,
  el=>{const id=el.dataset.sectionCollapse;collapsedDocumentSections.has(id)?collapsedDocumentSections.delete(id):collapsedDocumentSections.add(id);render()},
  el=>{const id=el.dataset.sectionCollapse;if(collapsedDocumentSections.has(id)){collapsedDocumentSections.clear();collapsedDocumentObjects.clear();collapsedDocumentProfessions.clear()}else{documentSections.forEach(x=>collapsedDocumentSections.add(x.key))}render()}
 ));
 document.querySelectorAll('[data-object-collapse]').forEach(el=>bindHierarchyClickPair(el,
  el=>{const id=el.dataset.objectCollapse;collapsedDocumentObjects.has(id)?collapsedDocumentObjects.delete(id):collapsedDocumentObjects.add(id);render()},
  el=>{const id=el.dataset.objectCollapse;if(collapsedDocumentObjects.has(id)){collapsedDocumentObjects.clear();collapsedDocumentProfessions.clear()}else{sortedConstructionObjects().forEach(o=>collapsedDocumentObjects.add(o.id))}render()}
 ));
 document.querySelectorAll('[data-profession-collapse]').forEach(el=>bindHierarchyClickPair(el,
  el=>{const id=el.dataset.professionCollapse;collapsedDocumentProfessions.has(id)?collapsedDocumentProfessions.delete(id):collapsedDocumentProfessions.add(id);render()},
  el=>{const objectId=el.dataset.objectId,object=allObjects().find(o=>o.id===objectId),clickedId=el.dataset.professionCollapse;if(collapsedDocumentProfessions.has(clickedId)){(object?.profesie||[]).forEach(p=>collapsedDocumentProfessions.delete(p.id))}else{(object?.profesie||[]).forEach(p=>collapsedDocumentProfessions.add(p.id))}render()},
  {ignoreNestedControls:false}
 ));
}

const selectedConstructionObjectIds=new Set();let lastSelectedConstructionObjectId='';
function ensureObjectHierarchy(){
 const sets=ensureBuildingSets();const first=sets[0];
 for(const set of sets){let objs=allObjects().filter(o=>o.typ!=='cast'&&o.stavebnySuborId===set.id);if(!objs.length)createObjectForSet(set.id);else objs.forEach(o=>{if(!(o.profesie||[]).length)addStarterProfessionToObject(o);else o.profesie.forEach(p=>{if(!(p.dokumenty||[]).length)p.dokumenty=[createStarterDocument(1)]})})}
 return first
}
function objectsInSetDisplayOrder(setId){
 const raw=model.sekcie.flatMap(sec=>sec.objekty||[]).filter(o=>o.typ!=='cast'&&o.stavebnySuborId===setId);
 return raw.filter(o=>objectKind(o)==='S').concat(raw.filter(o=>objectKind(o)==='P'))
}
function sortedConstructionObjects(){return ensureBuildingSets().flatMap(set=>objectsInSetDisplayOrder(set.id))}
function replaceObjectOrderForSet(setId,ordered){
 const ids=new Set(ordered.map(o=>o.id)),section=model.sekcie[0],others=section.objekty.filter(o=>!ids.has(o.id));
 const cast=others.filter(o=>o.typ==='cast'),nonTarget=others.filter(o=>o.typ!=='cast');
 section.objekty=cast.concat(nonTarget,ordered.filter(o=>objectKind(o)==='S'),ordered.filter(o=>objectKind(o)==='P'))
}
function setActionIcon(kind,title,attrs,path,disabled=false){return `<button type="button" class="icon-btn hierarchy-action ${kind}" ${attrs} title="${title}" ${disabled?'disabled':''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">${path}</svg></button>`}
function constructionSetRow(set,index,q){
 const matches=!q||matchesFilter(`${buildingSetDisplay(set)} ${set.kod_stavby} ${set.nazov}`,q)||objectsInSetDisplayOrder(set.id).some(o=>matchesFilter(`${objectDisplay(o)} ${o.nazov}`,q));if(!matches)return'';
 const actions=setActionIcon('btn-plus-action','Pridať súbor stavieb',`data-hierarchy-add-set="${set.id}"`,iconPlus)+setActionIcon('btn-copy','Duplikovať súbor stavieb',`data-hierarchy-duplicate-set="${set.id}"`,iconCopy)+setActionIcon('btn-danger','Zmazať súbor stavieb',`data-hierarchy-delete-set="${set.id}"`,iconTrash,index===0);
 const row=`<tr class="construction-group-row" data-building-group-row="${set.id}"><td colspan="2" class="hierarchy-set-number-cell"><button type="button" class="hierarchy-set-number-display" data-hierarchy-set-number="${set.id}">${buildingSetDisplay(set)}</button><input class="hierarchy-set-number-input" data-hierarchy-set-number-input="${set.id}" value="${Number(set.cislo)||1}" inputmode="numeric" maxlength="2"></td><td><button type="button" class="hierarchy-set-type ${String(set.kod_stavby||'')!==projectBuildingCode()?'building-code-mismatch':''}" data-building-set-type="${set.id}" title="${String(set.kod_stavby||'')!==projectBuildingCode()?'Kód sa nezhoduje s identifikačným kódom stavby v údajoch projektu':''}">${esc(set.kod_stavby)}</button></td><td><div class="hierarchy-name-wrap"><input class="hierarchy-name-input" data-building-set-name="${set.id}" value="${esc(set.nazov)}"><span class="hierarchy-drag-zone" data-group-drag="${set.id}"></span></div></td><td class="table-action-zone">${actions}</td></tr>`;
 const objects=objectsInSetDisplayOrder(set.id).filter(o=>!q||matchesFilter(`${objectDisplay(o)} ${o.nazov}`,q));return row+objects.map((o,i)=>constructionObjectNestedRow(o,i)).join('')
}
function constructionObjectNestedRow(o,index){
 const actions=setActionIcon('btn-plus-action','Pridať stavebný objekt',`data-hierarchy-add-object="${o.id}"`,iconPlus)+setActionIcon('btn-copy','Duplikovať stavebný objekt',`data-hierarchy-duplicate-object="${o.id}"`,iconCopy)+setActionIcon('btn-danger','Zmazať stavebný objekt',`data-hierarchy-delete-object="${o.id}"`,iconTrash,index===0);
 return `<tr class="construction-object-nested-row ${selectedConstructionObjectIds.has(o.id)?'is-selected':''}" data-object-row="${o.id}" data-object-set="${o.stavebnySuborId}"><td class="hierarchy-prefix-cell"><button type="button" class="object-prefix" data-object-prefix="${o.id}">${objectKind(o)==='P'?'PS-':'SO-'}</button></td><td class="hierarchy-number-cell"><button type="button" class="object-number-display" data-object-number="${o.id}">${objectNumber(o)}</button><input class="object-number-input" data-object-number-input="${o.id}" value="${objectNumber(o)}" inputmode="numeric" maxlength="2"></td><td class="hierarchy-object-drag-cell"><span class="hierarchy-object-drag-zone" data-object-drag="${o.id}" title="Vybrať alebo presunúť"></span></td><td><div class="hierarchy-name-wrap"><input class="hierarchy-name-input" data-path="obj:${o.id}:nazov" value="${esc(o.nazov||'')}"><span class="hierarchy-drag-zone" data-object-drag="${o.id}" title="Vybrať alebo presunúť"></span></div></td><td class="table-action-zone">${actions}</td></tr>`
}
function constructionHierarchyTable(q=''){return `<div class="construction-hierarchy-scroll"><table class="objects-table construction-hierarchy-table"><colgroup><col class="hierarchy-number-half"><col class="hierarchy-number-half"><col class="hierarchy-type-col"><col><col class="action-zone-3"></colgroup><thead><tr><th colspan="2">Číslo</th><th>Typ</th><th>Názov</th><th class="table-action-zone">Akcie</th></tr></thead><tbody>${ensureBuildingSets().map((set,i)=>constructionSetRow(set,i,q)).join('')}</tbody></table></div>`}
function addObjectToSet(setId){const o=createObjectForSet(setId);pendingNewObjectId=o.id;render()}
function duplicateObjectInHierarchy(id){const source=allObjects().find(o=>o.id===id);if(!source)return;const clone=structuredClone(source);clone.id=uid();clone.profesie=(clone.profesie||[]).map(p=>({...p,id:uid(),dokumenty:(p.dokumenty||[]).map(d=>({...d,id:uid()}))}));const siblings=objectsInSetDisplayOrder(source.stavebnySuborId),used=new Set(siblings.filter(o=>objectKind(o)===objectKind(source)).map(o=>Number(objectNumber(o))));let n=Number(objectNumber(source))+1;while(used.has(n))n++;clone.kod=objectKind(source)+String(n).padStart(2,'0');model.sekcie[0].objekty.push(clone);render()}
function deleteObjectInHierarchy(id){const o=allObjects().find(x=>x.id===id);if(!o)return;const siblings=objectsInSetDisplayOrder(o.stavebnySuborId);if(siblings[0]?.id===id||siblings.length<=1)return;model.sekcie.forEach(sec=>sec.objekty=sec.objekty.filter(x=>x.id!==id));selectedConstructionObjectIds.delete(id);render()}
function selectConstructionObject(id,event){const order=sortedConstructionObjects().map(o=>o.id);if(event.shiftKey&&lastSelectedConstructionObjectId){const a=order.indexOf(lastSelectedConstructionObjectId),b=order.indexOf(id);if(a>=0&&b>=0){if(!event.ctrlKey&&!event.metaKey)selectedConstructionObjectIds.clear();for(let i=Math.min(a,b);i<=Math.max(a,b);i++)selectedConstructionObjectIds.add(order[i])}}else if(event.ctrlKey||event.metaKey){selectedConstructionObjectIds.has(id)?selectedConstructionObjectIds.delete(id):selectedConstructionObjectIds.add(id);lastSelectedConstructionObjectId=id}else{selectedConstructionObjectIds.clear();selectedConstructionObjectIds.add(id);lastSelectedConstructionObjectId=id}render()}
function moveConstructionBlock(sourceId,targetSetId,targetObjectId=null,after=false){
 const source=allObjects().find(o=>o.id===sourceId);if(!source)return false;const selected=selectedConstructionObjectIds.has(sourceId)?sortedConstructionObjects().filter(o=>selectedConstructionObjectIds.has(o.id)):[source];const movingIds=new Set(selected.map(o=>o.id));
 const targetKind=objectKind(source);selected.forEach(o=>o.stavebnySuborId=targetSetId);
 const targetList=objectsInSetDisplayOrder(targetSetId).filter(o=>!movingIds.has(o.id));let idx=targetObjectId?targetList.findIndex(o=>o.id===targetObjectId):targetList.length;if(idx<0)idx=targetList.length;if(after)idx++;
 const sameKind=selected.filter(o=>objectKind(o)===targetKind),otherKind=selected.filter(o=>objectKind(o)!==targetKind);targetList.splice(idx,0,...sameKind,...otherKind);replaceObjectOrderForSet(targetSetId,targetList);return true
}
function moveBuildingSetBlock(sourceSetId,targetSetId,after=false){
 const sets=ensureBuildingSets();const from=sets.findIndex(x=>x.id===sourceSetId),toBase=sets.findIndex(x=>x.id===targetSetId);
 if(from<0||toBase<0||sourceSetId===targetSetId)return false;
 const [moving]=sets.splice(from,1);let to=sets.findIndex(x=>x.id===targetSetId);if(after)to++;sets.splice(Math.max(0,to),0,moving);model.stavebneSubory=sets;return true
}
function bindBuildingSetDrag(){
 document.querySelectorAll('[data-group-drag]').forEach(zone=>zone.onpointerdown=e=>{if(e.button!==0)return;e.preventDefault();e.stopPropagation();const sourceId=zone.dataset.groupDrag,row=zone.closest('[data-building-group-row]'),startX=e.clientX,startY=e.clientY;let dragging=false,targetId='',after=false,ghost=null;
  const clear=()=>document.querySelectorAll('.construction-group-drag-before,.construction-group-drag-after').forEach(x=>x.classList.remove('construction-group-drag-before','construction-group-drag-after'));
  const move=ev=>{if(!dragging&&Math.hypot(ev.clientX-startX,ev.clientY-startY)>5){dragging=true;const r=row.getBoundingClientRect();ghost=row.cloneNode(true);ghost.className+=' construction-drag-ghost';ghost.style.cssText=`position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;z-index:9999;pointer-events:none;opacity:.88`;document.body.appendChild(ghost);row.classList.add('construction-drag-source')}if(!dragging)return;ghost.style.top=`${ev.clientY-16}px`;clear();const tr=document.elementFromPoint(ev.clientX,ev.clientY)?.closest('[data-building-group-row]');if(!tr||tr===row)return;targetId=tr.dataset.buildingGroupRow;const r=tr.getBoundingClientRect();after=ev.clientY>r.top+r.height/2;tr.classList.add(after?'construction-group-drag-after':'construction-group-drag-before')};
  const up=()=>{document.removeEventListener('pointermove',move,true);document.removeEventListener('pointerup',up,true);ghost?.remove();row?.classList.remove('construction-drag-source');clear();if(dragging&&targetId&&moveBuildingSetBlock(sourceId,targetId,after))render()};document.addEventListener('pointermove',move,true);document.addEventListener('pointerup',up,true)
 })
}
function bindConstructionHierarchyDrag(){
 bindBuildingSetDrag();
 document.querySelectorAll('[data-object-drag]').forEach(zone=>zone.onpointerdown=e=>{if(e.button!==0)return;e.preventDefault();e.stopPropagation();const id=zone.dataset.objectDrag,startX=e.clientX,startY=e.clientY,row=zone.closest('tr');let dragging=false,targetSet='',targetObject='',after=false,ghost=null;
  const clear=()=>document.querySelectorAll('.construction-drop-before,.construction-drop-after,.construction-group-drop').forEach(x=>x.classList.remove('construction-drop-before','construction-drop-after','construction-group-drop'));
  const move=ev=>{if(!dragging&&Math.hypot(ev.clientX-startX,ev.clientY-startY)>5){dragging=true;const r=row.getBoundingClientRect();ghost=row.cloneNode(true);ghost.className+=' construction-drag-ghost';ghost.style.cssText=`position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;z-index:9999;pointer-events:none;opacity:.88`;document.body.appendChild(ghost);row.classList.add('construction-drag-source')}if(!dragging)return;ghost.style.top=`${ev.clientY-16}px`;clear();const el=document.elementFromPoint(ev.clientX,ev.clientY);const tr=el?.closest('tr');if(!tr)return;if(tr.dataset.objectRow){targetObject=tr.dataset.objectRow;targetSet=tr.dataset.objectSet;const r=tr.getBoundingClientRect();after=ev.clientY>r.top+r.height/2;tr.classList.add(after?'construction-drop-after':'construction-drop-before')}else if(tr.dataset.buildingGroupRow){targetSet=tr.dataset.buildingGroupRow;targetObject='';tr.classList.add('construction-group-drop')}};
  const up=()=>{document.removeEventListener('pointermove',move,true);document.removeEventListener('pointerup',up,true);ghost?.remove();row.classList.remove('construction-drag-source');clear();if(dragging&&targetSet){moveConstructionBlock(id,targetSet,targetObject,after);render()}else selectConstructionObject(id,e)};document.addEventListener('pointermove',move,true);document.addEventListener('pointerup',up,true)
 })
}
function showPublicBuilderTypeMenu(anchor){
 closePersonMenu?.();const old=document.querySelector('.public-builder-type-menu');if(old)old.remove();const menu=document.createElement('div');menu.className='person-menu public-builder-type-menu';menu.innerHTML=publicSubjectTypeOptions.map(x=>`<button type="button" data-public-builder-type-value="${x.code}">${esc(x.name)}</button>`).join('');document.body.appendChild(menu);positionFloatingMenu(menu,anchor);menu.querySelectorAll('[data-public-builder-type-value]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();if(ensurePublicBuilder().typ_subjektu_kod!==b.dataset.publicBuilderTypeValue){model._builderIdentityDirty=true;model._builderFieldsDirty=true}ensurePublicBuilder().typ_subjektu_kod=b.dataset.publicBuilderTypeValue;menu.remove();render()});setTimeout(()=>document.addEventListener('pointerdown',function closer(e){if(!menu.contains(e.target)&&e.target!==anchor){menu.remove();document.removeEventListener('pointerdown',closer)}},true),0)
}
function bindInputs(){
 document.querySelectorAll('.professions-table input[readonly],.attachments-table input[readonly]').forEach(input=>{input.addEventListener('focus',()=>input.select());input.addEventListener('click',()=>input.select())});
 installDefaultTextSelection();bindHierarchyControls();bindDocumentFileDropZones();
 document.querySelectorAll('[data-building-set-collapse]').forEach(el=>bindHierarchyClickPair(el,
  el=>{const id=el.dataset.buildingSetCollapse;collapsedDocumentBuildingSets.has(id)?collapsedDocumentBuildingSets.delete(id):collapsedDocumentBuildingSets.add(id);render()},
  el=>{const id=el.dataset.buildingSetCollapse;if(collapsedDocumentBuildingSets.has(id)){collapsedDocumentBuildingSets.clear()}else{ensureBuildingSets().forEach(set=>collapsedDocumentBuildingSets.add(set.id))}render()}
 ));
 bindDocumentDragSelection();
 bindProfessionDragSelection();
 document.querySelectorAll('[data-person-picker]').forEach(i=>{i.addEventListener('focus',()=>showPersonMenu(i,false));i.addEventListener('input',()=>showPersonMenu(i,true))});
 document.querySelectorAll('.doc-name-input').forEach(i=>{const show=(filterByInput=false)=>showDocumentValueMenu(i,firstDocumentWords(),value=>{i.value=value;i.dispatchEvent(new Event('change',{bubbles:true}))},filterByInput);i.addEventListener('focus',()=>show(false));i.addEventListener('input',()=>show(true));i.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();i.blur()}if(e.key==='Escape')render()})});
 document.querySelectorAll('[data-filename-editor]').forEach(i=>{const original=i.value;alignFilenameEnd(i);i.addEventListener('focus',()=>selectFilename(i));i.addEventListener('pointerup',e=>{if(document.activeElement===i){e.preventDefault();selectFilename(i)}});const restore=()=>{i.value=original;alignFilenameEnd(i);i.blur()};i.addEventListener('blur',()=>{i.value=original;alignFilenameEnd(i)});i.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key==='Escape'){e.preventDefault();restore()}})});
 document.querySelectorAll('[data-suffix-toggle]').forEach(b=>b.onclick=()=>{includePdfSuffixInSelection=!includePdfSuffixInSelection;render()});
 document.querySelectorAll('[data-toggle]').forEach(b=>b.onclick=()=>{expanded.has(b.dataset.toggle)?expanded.delete(b.dataset.toggle):expanded.add(b.dataset.toggle);render()});
 document.querySelectorAll('[data-path]').forEach(i=>i.onchange=()=>{let [t,id,k]=i.dataset.path.split(':'),x=t==='doc'?findDoc(id):t==='prof'?findProf(id)?.p:allObjects().find(o=>o.id===id);let value=i.value;if(t==='doc'&&k==='cislo_dokumentu')value=Math.max(0,Number(String(value).replace(/\D/g,''))||0);if(t==='doc'&&k==='revizia')value=String(value||'0').replace(/\D/g,'').slice(0,2).padStart(2,'0');if(t==='doc'&&['nazov_dokumentu','typ_dokumentu','revizia','mierka','zodpovedny_projektant'].includes(k))applyDocumentValue(id,k,value);else x[k]=value;render()});
 document.querySelectorAll('.doc-revision-input').forEach(i=>{i.oninput=()=>{i.value=i.value.replace(/\D/g,'').slice(0,2)};i.onkeydown=e=>{if(e.key==='Enter')i.blur();if(e.key==='Escape')render()}});
 document.querySelectorAll('[data-doc-revision]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();editDocumentRevision(b.dataset.docRevision)});
 document.querySelectorAll('[data-number-dial]').forEach(b=>b.onmousedown=e=>attachNumberDial(e,b.dataset.numberDial));
 document.querySelectorAll('.doc-number-input').forEach(i=>i.oninput=()=>{i.value=i.value.replace(/\D/g,'')});
 bindCustomRegistryEditor('profession');
 document.querySelectorAll('[data-duplicate-registry-prof]').forEach(b=>b.onclick=()=>{const p=professionOptions().find(x=>x.id===b.dataset.duplicateRegistryProf);if(!p)return;let n=1,k;do{k='X'+String(n++).padStart(2,'0')}while(model.professionRegistry.some(x=>x.kod===k));model.professionRegistry.push({id:uid(),kod:k,nazov:p.nazov+' kópia',system:false});render()});
 document.querySelectorAll('[data-del-registry-prof]').forEach(b=>b.onclick=()=>{const p=professionOptions().find(x=>x.id===b.dataset.delRegistryProf);if(!p||p.system)return;model.professionRegistry=professionOptions().filter(p=>p.id!==b.dataset.delRegistryProf);render()});
 bindCustomRegistryEditor('attachment');
 document.querySelectorAll('[data-duplicate-registry-attachment]').forEach(b=>b.onclick=()=>{const p=ensureAttachmentRegistry().find(x=>x.id===b.dataset.duplicateRegistryAttachment);if(!p)return;model.attachmentRegistry.push({id:uid(),kod:p.kod,nazov:p.nazov+' kópia',system:false});render()});
 document.querySelectorAll('[data-del-registry-attachment]').forEach(b=>b.onclick=()=>{const p=ensureAttachmentRegistry().find(x=>x.id===b.dataset.delRegistryAttachment);if(!p||p.system)return;model.attachmentRegistry=ensureAttachmentRegistry().filter(x=>x.id!==p.id);render()});
 document.querySelectorAll('[data-hierarchy-add-set]').forEach(b=>b.onclick=e=>{e.stopPropagation();addObjectGroupWithStarter()});
 document.querySelectorAll('[data-hierarchy-duplicate-set]').forEach(b=>b.onclick=e=>{e.stopPropagation();duplicateBuildingSet(b.dataset.hierarchyDuplicateSet)});
 document.querySelectorAll('[data-hierarchy-delete-set]').forEach(b=>b.onclick=e=>{e.stopPropagation();deleteBuildingSet(b.dataset.hierarchyDeleteSet)});
 document.querySelectorAll('[data-hierarchy-add-object]').forEach(b=>b.onclick=e=>{e.stopPropagation();const o=allObjects().find(x=>x.id===b.dataset.hierarchyAddObject);if(o)addObjectToSet(o.stavebnySuborId)});
 document.querySelectorAll('[data-hierarchy-duplicate-object]').forEach(b=>b.onclick=e=>{e.stopPropagation();duplicateObjectInHierarchy(b.dataset.hierarchyDuplicateObject)});
 document.querySelectorAll('[data-hierarchy-delete-object]').forEach(b=>b.onclick=e=>{e.stopPropagation();deleteObjectInHierarchy(b.dataset.hierarchyDeleteObject)});
 document.querySelectorAll('[data-add-building-set]').forEach(b=>b.onclick=addBuildingSet);
 document.querySelectorAll('[data-duplicate-building-set]').forEach(b=>b.onclick=()=>duplicateBuildingSet(b.dataset.duplicateBuildingSet));
 document.querySelectorAll('[data-delete-building-set]').forEach(b=>b.onclick=()=>deleteBuildingSet(b.dataset.deleteBuildingSet));
 document.querySelectorAll('[data-hierarchy-set-number]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();e.stopPropagation();editBuildingSetNumber(b.dataset.hierarchySetNumber)});
 document.querySelectorAll('[data-hierarchy-set-number-input]').forEach(i=>{i.oninput=()=>{i.value=i.value.replace(/\D/g,'').slice(0,2)};i.onblur=()=>commitBuildingSetNumber(i);i.onkeydown=e=>{if(e.key==='Enter')i.blur();if(e.key==='Escape')render()}});
 document.querySelectorAll('[data-building-set-type]').forEach(b=>b.onclick=e=>{e.stopPropagation();showBuildingSetTypeMenu(b,b.dataset.buildingSetType)});
 document.querySelectorAll('[data-building-set-name]').forEach(i=>i.onchange=()=>{const x=ensureBuildingSets().find(v=>v.id===i.dataset.buildingSetName);if(x)x.nazov=i.value.trim()||'Stavebný súbor';render()});
 document.querySelectorAll('[data-building-set-number]').forEach(i=>{i.onfocus=()=>{i.value=String(Number(i.value.replace(/\D/g,''))||1);requestAnimationFrame(()=>i.select())};i.oninput=()=>{i.value=i.value.replace(/\D/g,'').slice(0,2)};i.onblur=()=>{const x=ensureBuildingSets().find(v=>v.id===i.dataset.buildingSetNumber);if(x)x.cislo=Math.max(1,Number(i.value)||1);render()};i.onkeydown=e=>{if(e.key==='Enter')i.blur();if(e.key==='Escape')render()}});
 document.querySelectorAll('[data-project-picker]').forEach(i=>{i.onclick=e=>{e.stopPropagation();showProjectCodeMenu(i)};i.onfocus=()=>{i.dataset.pickerFiltering='0';if(i.dataset.project==='identifikacny_kod_stavby')i.select();showProjectCodeMenu(i)};i.oninput=()=>{i.dataset.pickerFiltering='1';showProjectCodeMenu(i)};i.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();e.stopPropagation();const matches=showProjectCodeMenu(i);if(matches?.length===1){model.projekt[i.dataset.project]=matches[0].code;if(i.dataset.project==='identifikacny_kod_stavby')syncSingleBuildingSetCodeFromProject();closeFloatingEditor();render()}}else if(e.key==='Escape'){closeFloatingEditor();i.value=projectDisplayValue(i.dataset.project,model.projekt[i.dataset.project])}}});
 document.querySelectorAll('[data-project-validation-index]').forEach(b=>b.onclick=()=>flashPublicProjectValidation(Number(b.dataset.projectValidationIndex)));
 document.querySelectorAll('[data-public-address]').forEach(i=>{i.oninput=()=>{const a=ensurePublicLocation().adresa,key=i.dataset.publicAddress;if(key==='psc'){i.value=formatPscPublic(i.value);a.psc=normalizePscPublic(i.value)}else{a[key]=i.value;if(key==='mesto')a.cityID=''}model._locationAddressDirty=true};i.onchange=()=>render()});
 document.querySelectorAll('[data-public-builder]').forEach(i=>{i.oninput=()=>{const b=ensurePublicBuilder(),key=i.dataset.publicBuilder;if(key==='psc'){i.value=formatPscPublic(i.value);b.psc=normalizePscPublic(i.value)}else b[key]=i.value;model._builderFieldsDirty=true;if(['obchodne_meno','meno','priezvisko'].includes(key))model._builderIdentityDirty=true};i.onchange=()=>render()});
 document.querySelectorAll('[data-public-builder-type]').forEach(btn=>btn.onclick=e=>{e.stopPropagation();showPublicBuilderTypeMenu(btn)});
 bindAcademicTitles();bindReliableFormNavigation();
 const projectInputs=[...document.querySelectorAll('[data-project]')];
 const commitProjectInput=i=>{if(i.dataset.projectPicker||i.dataset.calculatedProject)return;if(i.dataset.customProject==='1'){const x=(model.projekt.customProperties||[]).find(x=>x.key===i.dataset.project);if(x)x.value=i.value}else model.projekt[i.dataset.project]=i.dataset.project==='id_projektu'?normalizeProjectId(i.value):i.value};
 projectInputs.forEach((i,projectInputIndex)=>{
  if(i.dataset.project==='id_projektu'){
   i.onbeforeinput=e=>{
    if(e.data&&/[a-z]/.test(e.data)){
     e.preventDefault();
     const start=i.selectionStart??i.value.length,end=i.selectionEnd??start;
     const insert=normalizeProjectId(e.data);
     i.setRangeText(insert,start,end,'end');
     i.dispatchEvent(new Event('input',{bubbles:true}));
    }
   };
   i.oninput=()=>{
    const start=i.selectionStart??i.value.length;
    const normalized=normalizeProjectId(i.value);
    if(i.value!==normalized){i.value=normalized;const pos=Math.min(start,normalized.length);i.setSelectionRange(pos,pos)}
    model.projekt.id_projektu=normalized;
   };
  }
  i.onchange=()=>{commitProjectInput(i);render()};
  i.addEventListener('keydown',e=>{
   if(e.key!=='Tab'||i.dataset.projectPicker||i.dataset.calculatedProject)return;
   const nextIndex=projectInputIndex+(e.shiftKey?-1:1),next=projectInputs[nextIndex];
   if(!next)return;
   e.preventDefault();
   commitProjectInput(i);
   const nextKey=next.dataset.project;
   render();
   requestAnimationFrame(()=>{
    const target=[...document.querySelectorAll('[data-project]')].find(x=>x.dataset.project===nextKey);
    if(!target)return;
    target.focus();
    if(!target.readOnly&&typeof target.select==='function')target.select();
   });
  });
 });
 document.querySelectorAll('[data-project-label]').forEach(i=>i.onchange=()=>{const x=(model.projekt.customProperties||[]).find(x=>x.key===i.dataset.projectLabel);if(x)x.label=i.value;render()});
 document.querySelectorAll('[data-duplicate-project-property]').forEach(b=>b.onclick=()=>{const x=projectPropertyRows().find(x=>x.key===b.dataset.duplicateProjectProperty);if(!x)return;model.projekt.customProperties=model.projekt.customProperties||[];model.projekt.customProperties.push({key:'custom_'+uid(),label:x.label+' kópia',value:x.value});render()});
 document.querySelectorAll('[data-delete-project-property]').forEach(b=>b.onclick=()=>{model.projekt.customProperties=(model.projekt.customProperties||[]).filter(x=>x.key!==b.dataset.deleteProjectProperty);render()});
 document.querySelectorAll('[data-add-object-row]').forEach(b=>b.onclick=addObject);
 document.querySelectorAll('[data-duplicate-doc]').forEach(b=>b.onclick=()=>duplicateDocument(b.dataset.duplicateDoc));
 document.querySelectorAll('[data-add-prof]').forEach(b=>b.onclick=()=>addProfession(b.dataset.addProf));document.querySelectorAll('[data-add-doc]').forEach(b=>b.onclick=()=>addDocument(b.dataset.addDoc));
 document.querySelectorAll('[data-object-prefix]').forEach(b=>b.onclick=e=>{e.stopPropagation();showObjectTypeMenu(b,b.dataset.objectPrefix)});
 document.querySelectorAll('[data-object-number]').forEach(b=>{
  b.onpointerdown=e=>{
   e.preventDefault();
   const active=document.querySelector('[data-object-number-input]:focus');
   if(active&&active.dataset.objectNumberInput!==b.dataset.objectNumber)commitObjectNumber(active,false);
   editObjectNumber(b.dataset.objectNumber);
  };
 });
 document.querySelectorAll('[data-object-number-input]').forEach(i=>{i.oninput=()=>{i.value=i.value.replace(/\D/g,'').slice(0,2)};i.onblur=()=>commitObjectNumber(i);i.onkeydown=e=>{if(e.key==='Enter')i.blur();if(e.key==='Escape')render()}});
 document.querySelectorAll('[data-doc-type]').forEach(b=>b.onclick=e=>{e.stopPropagation();showDocumentTypeMenu(b,b.dataset.docType)});
 document.querySelectorAll('[data-profession-header]').forEach(b=>b.onclick=e=>{e.stopPropagation();showProfessionHeaderMenu(b,b.dataset.professionHeader)});
 document.querySelectorAll('[data-object-name-edit]').forEach(b=>b.onclick=e=>{e.stopPropagation();beginConstructionObjectNameEdit(b.dataset.objectNameEdit,b)});
 document.querySelectorAll('[data-validation-toggle]').forEach(b=>b.onclick=()=>{validationCollapsed=!validationCollapsed;render()});
 document.querySelectorAll('[data-validation-index]').forEach(b=>b.onclick=()=>focusValidationResult(Number(b.dataset.validationIndex)));
 document.querySelectorAll('[data-header-add-prof]').forEach(b=>b.onclick=e=>{e.stopPropagation();showProfessionChoiceMenu(b,b.dataset.headerAddProf)});
 document.querySelectorAll('[data-add-section-doc]').forEach(b=>b.onclick=e=>{e.stopPropagation();addSectionDocument(b.dataset.addSectionDoc)});
 document.querySelectorAll('[data-add-section-object]').forEach(b=>b.onclick=e=>{e.stopPropagation();addConstructionObjectFromDocuments()});
 document.querySelectorAll('[data-add-section-building-set]').forEach(b=>b.onclick=e=>{e.stopPropagation();addBuildingSetFromDocuments()});
 document.querySelectorAll('[data-add-object-to-building-set]').forEach(b=>b.onclick=e=>{e.stopPropagation();addConstructionObjectFromDocuments(b.dataset.addObjectToBuildingSet)});
 document.querySelectorAll('[data-duplicate-doc-building-set]').forEach(b=>b.onclick=e=>{e.stopPropagation();duplicateBuildingSetFromDocuments(b.dataset.duplicateDocBuildingSet)});
 document.querySelectorAll('[data-delete-doc-building-set]').forEach(b=>b.onclick=e=>{e.stopPropagation();deleteBuildingSetFromDocuments(b.dataset.deleteDocBuildingSet)});
 document.querySelectorAll('[data-e-section-toggle]').forEach(b=>b.onclick=e=>{e.stopPropagation();model.eSectionToggle=!Boolean(model.eSectionToggle);render()});
 document.querySelectorAll('[data-add-prof-doc]').forEach(b=>b.onclick=e=>{e.stopPropagation();addProfessionDocument(b.dataset.addProfDoc)});
 document.querySelectorAll('[data-move-prof]').forEach(b=>b.onclick=e=>{e.stopPropagation();showMoveProfessionMenu(b,b.dataset.moveProf)});
 document.querySelectorAll('[data-header-duplicate-object]').forEach(b=>b.onclick=e=>{e.stopPropagation();duplicateObjectInHierarchy(b.dataset.headerDuplicateObject)});
 document.querySelectorAll('[data-doc-scale]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();editDocumentScale(b.dataset.docScale)});
 document.querySelectorAll('[data-doc-scale-input]').forEach(i=>{i.oninput=()=>{showDocumentValueMenu(i,documentSuggestionValues('mierka'),i._scaleChoose||(()=>{}),true)};i.onblur=()=>commitDocumentScale(i);i.onkeydown=e=>{if(e.key==='Enter')i.blur();if(e.key==='Escape')render()}});
 document.querySelectorAll('[data-duplicate-object]').forEach(b=>b.onclick=()=>duplicateObject(b.dataset.duplicateObject));
 document.querySelectorAll('[data-del-doc]').forEach(b=>b.onclick=()=>{let x=allDocs().find(x=>x.d.id===b.dataset.delDoc);if(!x)return;attachedDocumentFiles.delete(x.d.id);attachedDocumentHandles.delete(x.d.id);attachedDocumentSourceDirectories.delete(x.d.id);manuallyDroppedDocumentIds.delete(x.d.id);manuallyReplacedDocumentIds.delete(x.d.id);preservedIndexedDocumentIds.delete(x.d.id);if(x.p)x.p.dokumenty=x.p.dokumenty.filter(d=>d.id!==x.d.id);else model.prilohy=model.prilohy.filter(d=>d.id!==x.d.id);render()});
 document.querySelectorAll('[data-del-prof]').forEach(b=>b.onclick=()=>{const x=findProf(b.dataset.delProf);if(!x)return;const documentCount=(x.p.dokumenty||[]).length;if(documentCount===0||confirm(`Vymazať profesiu a ${documentCount} dokumentov?`)){x.o.profesie=x.o.profesie.filter(p=>p.id!==x.p.id);render()}});
 document.querySelectorAll('[data-del-object]').forEach(b=>b.onclick=()=>{const o=allObjects().find(o=>o.id===b.dataset.delObject);if(!o)return;const documentCount=(o.profesie||[]).reduce((sum,p)=>sum+(p.dokumenty||[]).length,0);if(documentCount===0||confirm('Vymazať objekt, všetky profesie a dokumenty?')){model.sekcie.forEach(s=>s.objekty=s.objekty.filter(x=>x.id!==o.id));render()}})
}

function nextDocumentNumber(docs=[]){const used=new Set(docs.map(d=>Number(d.cislo_dokumentu)||0).filter(n=>n>0));let n=1;while(used.has(n))n++;return n}
function ensureSectionContainer(key){
 const code=`${key}00`;let o=allObjects().find(x=>x.kod===code);
 if(!o){const title=documentSections.find(x=>x.key===key)?.title||key;o={id:uid(),kod:code,nazov:title,typ:'cast',profesie:[]};model.sekcie[0].objekty.push(o)}
 let defaultCode={A:'AAA',B:'SPR',C:'SIT',E:'SZS'}[key]||'TXT';let p=(o.profesie||[]).find(x=>x.kod===defaultCode);
 if(!p){p={id:uid(),kod:defaultCode,nazov:key==='E'?(attachmentCatalog.find(x=>x.type==='item'&&x.code===defaultCode)?.name||defaultCode):(codes.typy[defaultCode]||defaultCode),dokumenty:[]};o.profesie.push(p)}
 return{o,p}
}
function addSectionDocument(key){const {o,p}=ensureSectionContainer(key),n=((key==='A'||key==='B')&&!p.dokumenty.length)?0:nextDocumentNumber(p.dokumenty);const defaults={A:['AAA','Zoznam dokumentácie'],B:['SPR','Súhrnná správa'],C:['SIT','Situácia'],E:[p.kod,'Príloha']}[key]||['TXT','Dokument'];p.dokumenty.push({...newDoc(n),nazov_dokumentu:defaults[1],typ_dokumentu:defaults[0],cast:o.kod});collapsedDocumentSections.delete(key);render()}
function addProfessionDocument(professionId){const found=findProf(professionId);if(!found)return;const n=nextDocumentNumber(found.p.dokumenty);found.p.dokumenty.push(newDoc(n));collapsedDocumentObjects.delete(found.o.id);collapsedDocumentProfessions.delete(found.p.id);render()}
function addConstructionObjectFromDocuments(buildingSetId){
 const used=new Set(allObjects().filter(o=>objectKind(o)==='S').map(o=>Number(objectNumber(o))).filter(Number.isFinite));
 let n=1;while(used.has(n))n++;
 const o={id:uid(),kod:'S'+String(n).padStart(2,'0'),nazov:'Stavebný objekt',stavebnySuborId:buildingSetId||ensureBuildingSets()[0].id,profesie:[]};
 addStarterProfessionToObject(o);model.sekcie[0].objekty.push(o);
 collapsedDocumentSections.delete('D');collapsedDocumentObjects.delete(o.id);
 const starter=o.profesie?.[0];if(starter)collapsedDocumentProfessions.delete(starter.id);
 render();
}
function addBuildingSetFromDocuments(){const n=nextBuildingSetNumber();model.stavebneSubory.push({id:uid(),cislo:n,kod_stavby:'1111',nazov:'Stavebný súbor'});collapsedDocumentSections.delete('D');render()}
function duplicateBuildingSetFromDocuments(id){const src=ensureBuildingSets().find(x=>x.id===id);if(!src)return;model.stavebneSubory.push({id:uid(),cislo:nextBuildingSetNumber(),kod_stavby:src.kod_stavby,nazov:'Stavebný súbor'});collapsedDocumentSections.delete('D');render()}
function deleteBuildingSetFromDocuments(id){deleteBuildingSet(id);collapsedDocumentBuildingSets.delete(id);collapsedDocumentSections.delete('D')}

function newDoc(n=1){return{id:uid(),cislo_dokumentu:n,nazov_dokumentu:'Dokument',typ_dokumentu:'TXT',revizia:'00',mierka:'',zodpovedny_projektant:'',pripona:'pdf'}}
function addObject(){let used=new Set(allObjects().filter(o=>objectKind(o)==='S').map(o=>Number(objectNumber(o)))),n=1;while(used.has(n))n++;let o={id:uid(),kod:'S'+String(n).padStart(2,'0'),nazov:'Stavebný objekt',stavebnySuborId:ensureBuildingSets()[0].id,profesie:[]};const p=addStarterProfessionToObject(o);model.sekcie[0].objekty.push(o);expanded.add(o.id);if(p)expanded.add(p.id);pendingNewObjectId=o.id;render()}function addProfession(oid){if(currentView==='professions'&&!oid){ensureProfessionRegistry();let n=1,k;do{k='X'+String(n).padStart(2,'0');n++}while(model.professionRegistry.some(p=>p.kod===k));const entry={id:uid(),kod:k,nazov:'Nová profesia',system:false};model.professionRegistry.push(entry);revealAddedRegistryEntry('profession',entry.id,'bottom');return}let o=allObjects().find(x=>x.id===oid)||allObjects()[0];if(!o)return toast('Najprv pridajte stavebný objekt');let k=professionOptions().map(x=>x.kod).find(k=>!(o.profesie||[]).some(p=>p.kod===k))||'INE',p={id:uid(),kod:k,nazov:professionName(k),dokumenty:[createStarterDocument(1)]};o.profesie.push(p);expanded.add(o.id);expanded.add(p.id);render()}function addDocument(pid){let x=findProf(pid)||allProf()[0];if(!x)return toast('Najprv pridajte profesiu');x.p.dokumenty.push(newDoc(x.p.dokumenty.length+1));expanded.add(x.o.id);expanded.add(x.p.id);render()}
function normalize(m){
 m=m||{};m.verzia_schema=JSON_SCHEMA_VERSION;m.projekt=m.projekt||{};
 if(!('verzia_zoznamu' in m.projekt))m.projekt.verzia_zoznamu='v1.0';
 if(!('zoznam_vypracoval' in m.projekt))m.projekt.zoznam_vypracoval='';
 if(!('stupen_dokumentacie' in m.projekt))m.projekt.stupen_dokumentacie='SZP';
 if(!('identifikacny_kod_stavby' in m.projekt))m.projekt.identifikacny_kod_stavby='1111';
 if(!('datum_vydania' in m.projekt))m.projekt.datum_vydania='';
 if(!('revizia_zoznamu' in m.projekt))m.projekt.revizia_zoznamu='00';
 // Legacy in-memory shapes are migrated once and no longer serialized in the main JSON.
 if((m.projekt.miesto_stavby_ulica||m.projekt.miesto_stavby_mesto||m.projekt.miesto_stavby_psc||m.projekt.miesto_stavby)&&!m.lokalita){m.lokalita={adresa:{...blankPublicAddress(),ulica:String(m.projekt.miesto_stavby_ulica||m.projekt.miesto_stavby||''),mesto:String(m.projekt.miesto_stavby_mesto||''),psc:String(m.projekt.miesto_stavby_psc||'')}}}
 if(!m.lokalita)m.lokalita={adresa:blankPublicAddress()};
 if(!m.stavebnik&&(m.projekt.stavebnik||m.projekt.stavebnik_meno||m.projekt.adresa_stavebnika||m.projekt.stavebnik_adresa)){const fake={verzia_schema:'1.0',udaje_projektu:{stavebnik_meno:m.projekt.stavebnik_meno||m.projekt.stavebnik||'',stavebnik_adresa:m.projekt.stavebnik_adresa||m.projekt.adresa_stavebnika||''}};m.stavebnik=legacyBuilderFromMainPublic(fake)}
 delete m.projekt.miesto_stavby_ulica;delete m.projekt.miesto_stavby_mesto;delete m.projekt.miesto_stavby_psc;delete m.projekt.miesto_stavby;delete m.projekt.stavebnik;delete m.projekt.stavebnik_meno;delete m.projekt.adresa_stavebnika;delete m.projekt.stavebnik_adresa;
 m.lokalita={adresa:{...blankPublicAddress(),...(m.lokalita?.adresa||{})}};m.stavebnik={...newPublicBuilder(),...(m.stavebnik||{})};
 if(!('_rawPersonsIndex' in m))m._rawPersonsIndex=null;if(!('_rawLocationIndex' in m))m._rawLocationIndex=null;if(!('_opaqueVyjadrenia' in m))m._opaqueVyjadrenia=null;if(!('_builderIdentityDirty' in m))m._builderIdentityDirty=false;if(!('_builderFieldsDirty' in m))m._builderFieldsDirty=false;if(!('_locationAddressDirty' in m))m._locationAddressDirty=false;
 m.sekcie=m.sekcie||[{id:uid(),kod:'D',nazov:'Dokumentácia stavebných objektov',objekty:[]}];
 m.sekcie.forEach(sec=>{sec.id=sec.id||uid();sec.objekty=(sec.objekty||[]).map(o=>({...o,id:o.id||uid(),profesie:(o.profesie||[]).map(p=>({...p,id:p.id||uid(),dokumenty:(p.dokumenty||[]).map(d=>({...newDoc(),...d,id:d.id||uid()}))}))}))});
 m.prilohy=(m.prilohy||[]).map(d=>({...newDoc(),...d,id:d.id||uid(),cast:'E00'}));
 if(!Array.isArray(m.stavebneSubory)||!m.stavebneSubory.length)m.stavebneSubory=[{id:uid(),cislo:1,kod_stavby:String(m.projekt.identifikacny_kod_stavby||'1111').slice(0,4),nazov:'Hlavný stavebný súbor'}];
 const first=m.stavebneSubory[0].id;m.sekcie.flatMap(sec=>sec.objekty||[]).filter(o=>o.typ!=='cast').forEach(o=>{if(!m.stavebneSubory.some(x=>x.id===o.stavebnySuborId))o.stavebnySuborId=first});return m
}
function cellText(cell){
 const v=cell?.value;
 if(v==null)return '';
 if(typeof v==='object'){
  if(v.result!=null)return String(v.result);
  if(v.text!=null)return String(v.text);
  if(Array.isArray(v.richText))return v.richText.map(x=>x.text||'').join('');
  if(v.hyperlink)return String(v.text||v.hyperlink);
  return '';
 }
 return String(v);
}
function cleanCode(v){return String(v||'').trim().split(/\s*-\s*/)[0].trim()}
function getOrCreateObject(objects,code,name,type='object'){
 let o=objects.get(code);if(!o){o={id:uid(),kod:code,nazov:name||code,typ:type,profesie:[]};objects.set(code,o)}else if(name&&(!o.nazov||o.nazov===code))o.nazov=name;return o
}
function getOrCreateProf(o,code,name){let p=(o.profesie||[]).find(x=>x.kod===code);if(!p){p={id:uid(),kod:code,nazov:name||codes.profesie[code]||codes.typy[code]||code,dokumenty:[]};o.profesie.push(p)}return p}
async function importXlsx(buf){
 let wb=new ExcelJS.Workbook();const bytes=buf instanceof Uint8Array?buf:new Uint8Array(buf);await wb.xlsx.load(bytes);sourceWorkbook=wb;
 let u=wb.getWorksheet('Udaje'),z=wb.getWorksheet('Zoznam');
 let p={id_projektu:cellText(u?.getCell('F4'))||cellText(u?.getCell('D4')),stupen_dokumentacie:cleanCode(cellText(u?.getCell('F5'))||cellText(u?.getCell('D5')))||'SZP',cislo_stavby:String(cellText(u?.getCell('F6'))||cellText(u?.getCell('D6'))||'1').padStart(2,'0'),identifikacny_kod_stavby:cleanCode(cellText(u?.getCell('F7'))||cellText(u?.getCell('D7')))||'1111',nazov_projektu:'',miesto_stavby_ulica:'',miesto_stavby_mesto:'',miesto_stavby_psc:'',datum_vydania:'',revizia_zoznamu:'00',verzia_zoznamu:cellText(u?.getCell('F8'))||cellText(u?.getCell('D8'))||'v1.0',stavebnik:'',adresa_stavebnika:'',zoznam_vypracoval:''};
 const objectNames={};
 if(u){
  for(let r=9;r<=40;r++){const idx=Number(cellText(u.getCell(`C${r}`))),name=cellText(u.getCell(`D${r}`)).trim();if(idx>0&&idx<=99&&name&&!/^\d+$/.test(name))objectNames['S'+String(idx).padStart(2,'0')]=name}
  // Prevádzkové súbory are maintained separately in G9:H18.
  for(let r=9;r<=18;r++){const idx=Number(cellText(u.getCell(`G${r}`))),name=cellText(u.getCell(`H${r}`)).trim();if(idx>0&&idx<=99&&name&&!/^\d+$/.test(name))objectNames['P'+String(idx).padStart(2,'0')]=name}
 }
 const objects=new Map();let currentObject='',currentProf='';
 const partNames={A00:'Zoznam dokumentácie',B00:'Súhrnná správa',C00:'Situačné výkresy',E00:'Prílohy'};
 z?.eachRow((r,n)=>{
  const B=cellText(r.getCell(2)).trim(),C=cleanCode(cellText(r.getCell(3))),D=cellText(r.getCell(4)).trim(),E=cellText(r.getCell(5)).trim(),F=cellText(r.getCell(6)).trim(),G=cellText(r.getCell(7)).trim(),H=cellText(r.getCell(8)).trim(),I=cellText(r.getCell(9)).trim(),K=cellText(r.getCell(11)).trim()||'pdf';
  const objFromHeader=(E.match(/^(S\d{2}|P\d{2})\s*-\s*(.+)$/)||[]);const profFromHeader=(H.match(/^([A-Z0-9]{2,3})\s*-\s*(.+)$/)||[]);
  if(!D&&objFromHeader[1]){currentObject=objFromHeader[1];currentProf=profFromHeader[1]||currentProf;getOrCreateObject(objects,currentObject,objFromHeader[2]||objectNames[currentObject]||currentObject);if(currentProf)getOrCreateProf(objects.get(currentObject),currentProf,profFromHeader[2]);return}
  if(!D)return;
  // Rows pre-populated only by formulas are placeholders, not actual documents.
  if(!E&&!G&&!H)return;
  let cast=/^[ABCE]00$/.test(B)?B:(/^[SP]\d{2}$/.test(B)?B:(/^[SP]\d{2}$/.test(currentObject)?currentObject:''));
  let prof=C||currentProf;
  let typ=cleanCode(I);
  if(!typ||typ==='#N/A'){const m=cellText(r.getCell(10)).match(/_([A-Z][A-Z0-9]{2})_(?:\d{3})(?:_|$)/);typ=m?.[1]||(/^[ABCE]00$/.test(cast)?({A00:'AAA',B00:'SPR',C00:'SIT'}[cast]||prof):'TXT')}
  if(cast==='A00')prof='AAA';if(cast==='B00')prof='SPR';if(cast==='C00')prof='SIT';if(cast==='E00')prof=typ;
  if(!cast||!prof)return;
  const title=E||(I.includes(' - ')?I.split(/\s*-\s*/).slice(1).join(' - '):'')||codes.typy[typ]||typ;
  if(!title||title==='#N/A')return;
  const o=getOrCreateObject(objects,cast,partNames[cast]||objectNames[cast]||cast,/^[ABCE]00$/.test(cast)?'cast':'object');
  const pr=getOrCreateProf(o,prof,codes.profesie[prof]||codes.typy[prof]||prof);
  pr.dokumenty.push({id:uid(),cislo_dokumentu:Number(D)||0,nazov_dokumentu:title,typ_dokumentu:typ||prof,revizia:F||'00',mierka:G,zodpovedny_projektant:H,pripona:K,cast});
 });
 // Prefer the names explicitly maintained on the Udaje sheet.
 for(const [code,name] of Object.entries(objectNames)){const o=getOrCreateObject(objects,code,name,'object');o.nazov=name}
 attachedDocumentFiles.clear();attachedDocumentHandles.clear();attachedDocumentSourceDirectories.clear();manuallyDroppedDocumentIds.clear();manuallyReplacedDocumentIds.clear();
 model=normalize({verzia_schema:'1.0',projekt:p,sekcie:[{id:uid(),kod:'KOMPLET',nazov:'Kompletný zoznam dokumentácie',objekty:[...objects.values()].sort((a,b)=>{const order=x=>({A00:0,B00:1,C00:2,E00:999}[x]??(/^[SP]\d{2}$/.test(x)?100+Number(x.slice(1)):500));return order(a.kod)-order(b.kod)})}],prilohy:[]});
 expanded=new Set(allObjects().map(o=>o.id));allProf().forEach(x=>expanded.add(x.p.id));setStatus(`Načítané z XLSX · ${allObjects().length} častí/objektov · ${allDocs().length} dokumentov`);toast(`Načítané: ${allObjects().length} častí/objektov, ${allDocs().length} dokumentov`);render()
}
function download(blob,name){let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
async function bundledTemplateWorkbook(){
 const b64=window.ZOZNAM_XLSX_TEMPLATE_BASE64||'';if(!b64)return new ExcelJS.Workbook();
 const raw=atob(b64),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
 const wb=new ExcelJS.Workbook();await wb.xlsx.load(bytes);return wb
}
async function exportXlsx(){
 let wb=sourceWorkbook||await bundledTemplateWorkbook(),u=wb.getWorksheet('Udaje')||wb.addWorksheet('Udaje'),z=wb.getWorksheet('Zoznam')||wb.addWorksheet('Zoznam');
 u.getCell('D4').value=model.projekt.id_projektu;u.getCell('F4').value=model.projekt.id_projektu;u.getCell('D5').value=model.projekt.stupen_dokumentacie;u.getCell('F5').value=model.projekt.stupen_dokumentacie;u.getCell('D6').value=Number(model.projekt.cislo_stavby)||1;u.getCell('F6').value=Number(model.projekt.cislo_stavby)||1;u.getCell('D7').value=model.projekt.identifikacny_kod_stavby;u.getCell('F7').value=model.projekt.identifikacny_kod_stavby;u.getCell('B8').value='Verzia zoznamu';u.getCell('D8').value=model.projekt.verzia_zoznamu||'v1.0';u.getCell('F8').value=model.projekt.verzia_zoznamu||'v1.0';
 // Synchronise the construction-object list on Udaje.
 for(let r=9;r<=40;r++){u.getCell(`C${r}`).value=r-8;u.getCell(`D${r}`).value=null}
 for(let r=9;r<=18;r++){u.getCell(`G${r}`).value=r-8;u.getCell(`H${r}`).value=null}
 allObjects().filter(o=>o.typ!=='cast'&&/^S\d{2}$/.test(o.kod)).sort((a,b)=>a.kod.localeCompare(b.kod)).forEach(o=>{const r=8+Number(o.kod.slice(1));if(r<=40)u.getCell(`D${r}`).value=o.nazov});
 allObjects().filter(o=>o.typ!=='cast'&&/^P\d{2}$/.test(o.kod)).sort((a,b)=>a.kod.localeCompare(b.kod)).forEach(o=>{const r=8+Number(o.kod.slice(1));if(r<=18)u.getCell(`H${r}`).value=o.nazov});
 const styleDoc=z.getRow(4),styleGroup=z.getRow(18),styleSection=z.getRow(2);if(z.rowCount>1)z.spliceRows(2,z.rowCount-1);
 const clone=(src,dst)=>{dst.height=src.height;for(let i=1;i<=12;i++){dst.getCell(i).style=JSON.parse(JSON.stringify(src.getCell(i).style||{}));dst.getCell(i).numFmt=src.getCell(i).numFmt}};
 let rn=2,add=(type,vals)=>{let r=z.getRow(rn++);clone(type==='doc'?styleDoc:type==='group'?styleGroup:styleSection,r);Object.entries(vals).forEach(([k,v])=>r.getCell(Number(k)).value=v);return r};
 const sectionNames={A00:'Zoznam dokumentácie',B00:'Súhrnná správa',C00:'Situačné výkresy',E00:'Prílohy'};
 const writeDoc=(o,p,d)=>add('doc',{2:o.kod,3:o.typ==='cast'?'':p.kod,4:d.cislo_dokumentu,5:d.nazov_dokumentu,6:d.revizia==='00'?'':d.revizia,7:d.mierka||'',8:d.zodpovedny_projektant||'',9:`${d.typ_dokumentu} - ${codes.typy[d.typ_dokumentu]||p.nazov||''}`,10:filename(d,o,p).replace(/\.[^.]+$/,''),11:d.pripona||'pdf',12:filename(d,o,p)});
 for(const code of ['A00','B00','C00']){const o=allObjects().find(x=>x.kod===code);if(!o)continue;add('section',{2:code[0],5:sectionNames[code],9:code});for(const p of o.profesie||[])for(const d of p.dokumenty||[])writeDoc(o,p,d)}
 const construction=allObjects().filter(o=>o.typ!=='cast');if(construction.length)add('section',{2:'D',5:'Dokumentácia stavebných objektov'});
 for(const o of construction)for(const p of o.profesie||[]){add('group',{5:`${o.kod} - ${o.nazov}`,8:`${p.kod} - ${p.nazov}`});for(const d of p.dokumenty||[])writeDoc(o,p,d)}
 const e=allObjects().find(x=>x.kod==='E00');if(e){add('section',{2:'E',5:sectionNames.E00,9:'E00'});for(const p of e.profesie||[])for(const d of p.dokumenty||[])writeDoc(e,p,d)}
 let out=await wb.xlsx.writeBuffer();download(new Blob([out]),`${model.projekt.id_projektu}_zoznam_dokumentacie.xlsx`)
}
async function exportDocx(){const snapshotModel=JSON.parse(JSON.stringify(model)),snapshotData=JSON.parse(JSON.stringify(serializeJsonModel()));const builder=ensurePublicBuilder();snapshotModel.projekt.stavebnik=builder.typ_subjektu_kod!=='S'?String(builder.obchodne_meno||'').trim():[builder.akademicky_titul_pred_menom,builder.meno,builder.priezvisko,builder.akademicky_titul_za_menom].map(x=>String(x||'').trim()).filter(Boolean).join(' ');const streetNo=[builder.supisne_cislo,builder.orientacne_cislo].filter(Boolean).join('/');snapshotModel.projekt.adresa_stavebnika=[[builder.ulica,streetNo].filter(Boolean).join(' '),builder.mesto,formatPscPublic(builder.psc)].filter(Boolean).join(', ');const projectId=normalizeProjectId(snapshotModel.projekt.id_projektu)||'123456',version=asciiFilePart(snapshotModel.projekt.verzia_zoznamu||'v1.0','v1.0');const blob=await window.ZoznamDocx.create(snapshotModel,snapshotData);download(blob,`${projectId}_zoznam_${version}.docx`)}
async function fileFromZipEntry(entry,name){
 const bytes=await entry.async('uint8array');
 return new File([bytes],name,{type:'application/octet-stream'});
}
function indexKindFromName(name){
 const base=String(name||'').split(/[\\/]/).pop().toLowerCase();
 if(/^[a-z0-9]+_dokumenty(?:_.+)?\.json$/.test(base)||base==='documents new.json'||/^[a-z0-9]+[_ -]dokumenty[_ -]exportovane\.json$/.test(base))return'documents';
 if(/^[a-z0-9]+_osoby(?:_.+)?\.json$/.test(base))return'persons';
 if(/^[a-z0-9]+_lokalita(?:_.+)?\.json$/.test(base))return'location';
 if(/^[a-z0-9]+_vyjadrenia(?:_.+)?\.json$/.test(base)||/^vyjadrenie[_ -].*\.json$/.test(base))return'statements';
 return''
}
function documentContextByGeneratedBase(base){
 const wanted=String(base||'').replace(/\.[^.]+$/,'').toLowerCase();
 return allDocs().find(({o,p,d})=>filename(d,o,p).replace(/\.[^.]+$/,'').toLowerCase()===wanted)||null;
}
function normalizeArchivePath(path){return String(path||'').replace(/\\/g,'/').replace(/^\.\//,'').replace(/^\/+|\/+$/g,'')}
function documentsIndexFileName(){const projectId=normalizeProjectId(model.projekt.id_projektu)||'123456';return `${projectId}_dokumenty_${listVersionFilePart()}.json`}
function makeDocumentsIndex(){
 const names=[];for(const {o,p,d} of allDocs()){if(!attachedDocumentFiles.has(d.id)&&!preservedIndexedDocumentIds.has(d.id))continue;names.push(filename(d,o,p))}
 return {verzia_schema:JSON_SCHEMA_VERSION,project_id:normalizeProjectId(model.projekt.id_projektu)||'123456',documents:names}
}
function expectedExportRelativePath(o,p,d,fileName){
 const sectionFolders={A:'A - Zoznam dokumentácie',B:'B - Súhrnná správa',C:'C - Situačné výkresy',D:'D - Dokumentácia stavebných objektov',E:'E - Prílohy'};
 const section=documentSectionKey(o,d),base=asciiFilePart(sectionFolders[section]||section,section);
 if(section!=='D')return normalizeArchivePath(`${base}/${fileName}`);
 const sets=ensureBuildingSets(),multipleSets=sets.length>1,set=sets.find(x=>x.id===o?.stavebnySuborId)||sets[0];
 let path=base;
 if(multipleSets&&set){const n=`${buildingSetDisplay(set)} - ${asciiFilePart(set.nazov,'Stavebný súbor')}`;path+=`/${n}`}
 const on=`${objectDisplay(o)} - ${asciiFilePart(o?.nazov,'Stavebný objekt')}`;
 const pn=`${asciiFilePart(p?.kod,'XXX')} - ${asciiFilePart(p?.nazov||professionName(p?.kod),'Profesia')}`;
 return normalizeArchivePath(`${path}/${on}/${pn}/${fileName}`)
}
function fileRelativePath(file){return normalizeArchivePath(file?._archivePath||file?._dropPath||file?.webkitRelativePath||file?.name||'')}
function pathMatchesExpected(actual,expected){
 actual=normalizeArchivePath(actual).toLowerCase();expected=normalizeArchivePath(expected).toLowerCase();
 return actual===expected||actual.endsWith('/'+expected)
}
// ZIP import is filesystem-driven (schema 1.1): zoznam.json defines valid stems,
// A-E folders provide actual bytes. A PDF wins over any alternate extension.
function archiveDocumentStem(name){return String(name||'').split(/[\\/]/).pop().replace(/\.[^.]+$/,'').toLocaleLowerCase('sk')}
function archivePathIsInOfficialTree(path){
 const official=officialExportFolderNames(),parts=normalizeArchivePath(path).toLowerCase().split('/').filter(Boolean);
 return parts.length>1&&parts.slice(0,-1).some(part=>official.has(part));
}
function validDocumentStems(){
 const valid=new Set();
 for(const {o,p,d} of allDocs())for(const stem of generatedDocumentBaseVariants(o,p,d))valid.add(stem.toLocaleLowerCase('sk'));
 return valid;
}
function officialDocumentCandidates(files){
 const valid=validDocumentStems();
 return Array.from(files||[]).filter(file=>fileIsInOfficialExportTree(file)&&valid.has(archiveDocumentStem(file.name)));
}
function candidatePreference(file,expected){
 const ext=fileExtensionFromName(file?.name||'').toLowerCase();
 const path=fileRelativePath(file);
 return [ext==='pdf'?0:1,pathMatchesExpected(path,expected)?0:1,
   path.toLocaleLowerCase('sk')];
}
function preferCandidate(a,b,expected){
 const x=candidatePreference(a,expected),y=candidatePreference(b,expected);
 for(let i=0;i<x.length;i++)if(x[i]!==y[i])return i===2?x[i].localeCompare(y[i],'sk'):x[i]-y[i];
 return 0;
}
function attachDocumentsFromFolders(availableFiles,{reset=true}={}){
 if(reset){attachedDocumentFiles.clear();attachedDocumentHandles.clear();attachedDocumentSourceDirectories.clear();manuallyDroppedDocumentIds.clear();}
 const files=officialDocumentCandidates(availableFiles);
 const eMode=inferESectionToggleFromNames(files.map(f=>f.name));
 if(eMode!==null)model.eSectionToggle=eMode;
 const byStem=new Map();for(const file of files){const stem=archiveDocumentStem(file.name);if(!byStem.has(stem))byStem.set(stem,[]);byStem.get(stem).push(file)}
 let assigned=0,missing=0;
 const seenFiles=new Set();
 for(const {o,p,d} of allDocs()){
  const stem=archiveDocumentStem(filename(d,o,p));
  const variants=generatedDocumentBaseVariants(o,p,d);
  const stemOrder=[...new Set([stem,...variants])];
  const expected=expectedExportRelativePath(o,p,d,filename(d,o,p));
  let chosen=null;
  for(const candidateStem of stemOrder){
   const group=[...(byStem.get(candidateStem)||[])].sort((a,b)=>preferCandidate(a,b,expected));
   chosen=group.find(f=>!seenFiles.has(f))||null;
   if(chosen)break;
  }
  if(!chosen){if(!attachedDocumentFiles.has(d.id))missing++;continue}
  seenFiles.add(chosen);
  attachedDocumentFiles.set(d.id,chosen);
  d.pripona=fileExtensionFromName(chosen.name)||'pdf';
  d.priradeny_subor_nazov=chosen.name;
  d.priradeny_subor_povodna_cesta='';
  assigned++;
 }
 return {assigned,missing,scanned:files.length};
}

function officialExportFolderNames(){
 const names=['A - Zoznam dokumentácie','B - Súhrnná správa','C - Situačné výkresy','D - Dokumentácia stavebných objektov','E - Prílohy'];
 return new Set(names.map(x=>asciiFilePart(x,x[0]).toLowerCase()));
}
function fileIsInOfficialExportTree(file){
 const official=officialExportFolderNames(),parts=fileRelativePath(file).toLowerCase().split('/').filter(Boolean);
 return parts.some(part=>official.has(part));
}
function mergeDocumentCandidateFiles(files,{reset=false}={}){
 if(reset)droppedDocumentCandidateFiles=[];
 const merged=[...droppedDocumentCandidateFiles,...Array.from(files||[])],seen=new Set(),out=[];
 for(const file of merged){
  const key=`${fileRelativePath(file).toLowerCase()}|${file.size}|${file.lastModified}`;
  if(seen.has(key))continue;seen.add(key);out.push(file);
 }
 droppedDocumentCandidateFiles=out;return droppedDocumentCandidateFiles;
}
function bestCandidateForDocument(files,listedName,expected){
 const sameName=files.filter(f=>String(f.name||'').toLowerCase()===listedName);
 // Tier 1: exact inverse-export path.
 const exact=sameName.find(f=>pathMatchesExpected(fileRelativePath(f),expected));if(exact)return exact;
 // Tier 2: same unique filename anywhere below one of the official exported A/B/C/D/E trees.
 const official=sameName.find(fileIsInOfficialExportTree);if(official)return official;
 // Tier 3: same unique filename in any other folder explicitly dropped by the user.
 return sameName[0]||null;
}
async function applyDocumentsIndex(index,availableFiles=[],options={}){
 const listed=Array.isArray(index?.documents)?index.documents:[],requiredNames=new Set(listed.map(x=>String(typeof x==='string'?x:(x?.file_name||x?.new_file_name||'')).trim()).filter(Boolean).map(x=>x.toLowerCase())),files=Array.from(availableFiles||[]);
 if(options.reset!==false){attachedDocumentFiles.clear();attachedDocumentHandles.clear();attachedDocumentSourceDirectories.clear();manuallyDroppedDocumentIds.clear();preservedIndexedDocumentIds.clear()}
 let assigned=0,missing=0;
 for(const {o,p,d} of allDocs()){
  const base=filename(d,o,p).replace(/\.[^.]+$/,'').toLowerCase(),listedName=[...requiredNames].find(name=>name.replace(/\.[^.]+$/,'')===base);if(!listedName)continue;
  preservedIndexedDocumentIds.add(d.id);d.pripona=fileExtensionFromName(listedName)||d.pripona||'pdf';
  const expected=expectedExportRelativePath(o,p,d,listedName),file=bestCandidateForDocument(files,listedName,expected);
  if(file){attachedDocumentFiles.set(d.id,file);d.pripona=fileExtensionFromName(file.name);d.priradeny_subor_nazov=file.name;assigned++}else if(!attachedDocumentFiles.has(d.id))missing++
 }
 return {assigned,missing,listed:requiredNames.size}
}
function unresolvedIndexedDocumentsCount(){
 if(!pendingDocumentsIndex)return 0;
 const listed=new Set((Array.isArray(pendingDocumentsIndex.documents)?pendingDocumentsIndex.documents:[]).map(x=>String(x||'').toLowerCase()));
 let n=0;for(const {o,p,d} of allDocs()){const base=filename(d,o,p).replace(/\.[^.]+$/,'').toLowerCase(),isListed=[...listed].some(x=>x.replace(/\.[^.]+$/,'')===base);if(isListed&&!attachedDocumentFiles.has(d.id))n++}return n
}
function publicImportSnapshot(){return{
 model:deepClone(model),sourceWorkbook,pendingDocumentsIndex,droppedDocumentCandidateFiles:[...droppedDocumentCandidateFiles],
 attachedDocumentFiles:new Map(attachedDocumentFiles),preservedIndexedDocumentIds:new Set(preservedIndexedDocumentIds),
 expanded:new Set(expanded)
}}
function publicRestoreImportSnapshot(s){
 model=s.model;sourceWorkbook=s.sourceWorkbook;pendingDocumentsIndex=s.pendingDocumentsIndex;
 droppedDocumentCandidateFiles=s.droppedDocumentCandidateFiles;
 attachedDocumentFiles.clear();for(const[k,v]of s.attachedDocumentFiles)attachedDocumentFiles.set(k,v);
 preservedIndexedDocumentIds.clear();for(const v of s.preservedIndexedDocumentIds)preservedIndexedDocumentIds.add(v);
 expanded=s.expanded;
}
async function publicAtomicImport(task){const previous=publicImportSnapshot();try{return await task()}catch(err){publicRestoreImportSnapshot(previous);throw err}}
async function importProjectZip(file){return publicAtomicImport(async()=>{
 const zip=await JSZip.loadAsync(await file.arrayBuffer());
 const entries=Object.values(zip.files).filter(e=>!e.dir);
 const jsonEntries=entries.filter(e=>/\.json$/i.test(e.name)&&!archivePathIsInOfficialTree(e.name));
 const parsed=[];
 for(const e of jsonEntries){const data=parseJsonTextLenient(await e.async('string'),e.name);parsed.push({name:e.name,data})}
 const grouped=publicPrepareJsonEntries(parsed);
 if(!grouped.main)throw new Error('ZIP neobsahuje platný hlavný JSON zoznamu dokumentácie.');
 // No changes occur before every JSON has parsed successfully.
 model=importJsonData(grouped.main.data);sourceWorkbook=null;
 pendingDocumentsIndex=null;droppedDocumentCandidateFiles=[];attachedDocumentFiles.clear();preservedIndexedDocumentIds.clear();
 model._rawPersonsIndex=null;model._rawLocationIndex=null;model._opaqueVyjadrenia=null;
 for(const e of grouped.persons)applyPersonsIndexPublic(e.data);
 for(const e of grouped.locations)applyLocationIndexPublic(e.data,{name:e.name.split('/').pop()});
 for(const e of grouped.statements)mergeOpaqueStatementsPublic(e.data);
 const files=[],validStems=validDocumentStems();
 for(const e of entries){if(!archivePathIsInOfficialTree(e.name)||!validStems.has(archiveDocumentStem(e.name)))continue;
  const f=await fileFromZipEntry(e,e.name.split('/').pop());f._archivePath=e.name;files.push(f)}
 const result=attachDocumentsFromFolders(files);
 expanded=new Set(allObjects().map(o=>o.id));allProf().forEach(x=>expanded.add(x.p.id));
 setStatus(`Načítané zo ZIP · priradené ${result.assigned}, chýba ${result.missing}`);
 toast('ZIP bol úspešne načítaný');render();
})}

async function collectDroppedFiles(dataTransfer){
 if(!dataTransfer)return [];
 const out=[];
 async function walkEntry(entry,prefix=''){
  if(entry.isFile){
   await new Promise(resolve=>entry.file(file=>{file._dropPath=normalizeArchivePath(`${prefix}${file.name}`);out.push(file);resolve()},()=>resolve()));
   return;
  }
  if(entry.isDirectory){
   const reader=entry.createReader(),children=[];
   while(true){
    const batch=await new Promise(resolve=>reader.readEntries(resolve,()=>resolve([])));
    if(!batch.length)break;children.push(...batch);
   }
   for(const child of children)await walkEntry(child,`${prefix}${entry.name}/`);
  }
 }
 async function walkHandle(handle,prefix=''){
  if(handle.kind==='file'){
   try{const file=await handle.getFile();file._dropPath=normalizeArchivePath(`${prefix}${file.name}`);out.push(file)}catch(_){}
   return;
  }
  if(handle.kind==='directory'&&handle.values){
   try{for await(const child of handle.values())await walkHandle(child,`${prefix}${handle.name}/`)}catch(_){}
  }
 }
 const items=Array.from(dataTransfer.items||[]).filter(item=>item.kind==='file');
 if(items.length){
  for(const item of items){
   let handled=false;
   if(typeof item.getAsFileSystemHandle==='function'){
    try{const handle=await item.getAsFileSystemHandle();if(handle){await walkHandle(handle,'');handled=true}}catch(_){}
   }
   if(!handled&&typeof item.webkitGetAsEntry==='function'){
    try{const entry=item.webkitGetAsEntry();if(entry){await walkEntry(entry,'');handled=true}}catch(_){}
   }
   if(!handled){const file=item.getAsFile?.();if(file)out.push(file)}
  }
 }
 if(!out.length)out.push(...Array.from(dataTransfer.files||[]));
 const seen=new Set();return out.filter(file=>{const key=`${file._dropPath||file.webkitRelativePath||file.name}|${file.size}|${file.lastModified}`;if(seen.has(key))return false;seen.add(key);return true});
}
async function importDroppedFiles(files){return publicAtomicImport(async()=>{
 const list=Array.from(files||[]);if(!list.length)return;
 const zipFile=list.find(f=>/\.zip$/i.test(f.name));if(zipFile){
  // Nested transaction protects the calling state as well.
  await importProjectZip(zipFile);return;
 }
 const jsonFiles=list.filter(f=>/\.json$/i.test(f.name)),parsed=[];
 for(const f of jsonFiles){parsed.push({file:f,name:f.name,data:parseJsonTextLenient(await f.text(),f.name)})}
 const grouped=publicPrepareJsonEntries(parsed),main=grouped.main;
 const payloadFiles=list.filter(f=>!/\.(json|xlsx)$/i.test(f.name));
 if(main){
  model=importJsonData(main.data);sourceWorkbook=null;pendingDocumentsIndex=null;
  droppedDocumentCandidateFiles=[];attachedDocumentFiles.clear();preservedIndexedDocumentIds.clear();
  model._rawPersonsIndex=null;model._rawLocationIndex=null;model._opaqueVyjadrenia=null;
  expanded=new Set(allObjects().map(o=>o.id));allProf().forEach(x=>expanded.add(x.p.id));
 }
 for(const entry of grouped.persons)applyPersonsIndexPublic(entry.data);
 for(const entry of grouped.locations)applyLocationIndexPublic(entry.data,{name:entry.name});
 for(const entry of grouped.statements)mergeOpaqueStatementsPublic(entry.data);
 if(payloadFiles.length)mergeDocumentCandidateFiles(payloadFiles,{reset:!!main});
 let result=null;if(payloadFiles.length)result=attachDocumentsFromFolders(droppedDocumentCandidateFiles,{reset:!!main});
 if(main||grouped.persons.length||grouped.locations.length||grouped.statements.length||grouped.items.some(x=>x.kind==='documents')||payloadFiles.length){
  setStatus(payloadFiles.length?`Načítané podklady · priradené ${result?.assigned||0}, chýba ${result?.missing||0}`:'Načítané z JSON');
  toast('Podklady boli úspešne načítané');render();return;
 }
 const xlsx=list.find(f=>/\.xlsx$/i.test(f.name));if(xlsx){await importXlsx(await xlsx.arrayBuffer());return}
 throw new Error('Nepodporovaný vstup. Presuňte hlavný JSON, kompatibilné sprievodné JSON, ZIP alebo priečinky/súbory dokumentácie.');
})}

function reportPublicImportError(err){console.warn(err);if(/(?:lokalita|vyjadrenie|vyjadrenia)[^\/]*\.json/i.test(String(err?.message||'')))return;alert('Súbor sa nepodarilo načítať: '+err.message)}
$('#fileInput').onchange=async e=>{try{await importDroppedFiles(e.target.files)}catch(err){reportPublicImportError(err)}finally{e.target.value=''}};
const exportJsonFile=()=>{
 const projectId=normalizeProjectId(model.projekt.id_projektu)||'123456';
 const version=asciiFilePart(model.projekt.verzia_zoznamu,'v1.0');
 const persons=makePersonsIndexPublic(),location=makeLocationIndexPublic(),statements=makeOpaqueStatementsPublic();
 download(new Blob([JSON.stringify(serializeJsonModel(),null,2)],{type:'application/json'}),`${projectId}_zoznam_${version}.json`);
 download(new Blob([JSON.stringify(persons,null,2)],{type:'application/json'}),personsIndexFileName());
 download(new Blob([JSON.stringify(location,null,2)],{type:'application/json'}),locationIndexFileName());
 if(statements)download(new Blob([JSON.stringify(statements,null,2)],{type:'application/json'}),statementsIndexFileName());
 commitPublicBuilderAfterSave(persons);
};
function asciiFilePart(value,fallback=''){
 const text=String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7E]/g,'').replace(/[<>:"/\\|?*\x00-\x1F]/g,' ').replace(/\s+/g,' ').trim().replace(/[. ]+$/,'');
 return text||fallback;
}
function normalizeProjectId(value){
 return String(value??'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);
}
function blankA4PdfBytes(){
 const objects=[
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.276 841.89] /Resources << >> /Contents 4 0 R >>',
  '<< /Length 0 >>\nstream\nendstream'
 ];
 let pdf='%PDF-1.4\n%ZOZNAM\n',offsets=[0];
 for(let i=0;i<objects.length;i++){offsets.push(new TextEncoder().encode(pdf).length);pdf+=`${i+1} 0 obj\n${objects[i]}\nendobj\n`}
 const xrefOffset=new TextEncoder().encode(pdf).length;
 pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;
 for(let i=1;i<offsets.length;i++)pdf+=`${String(offsets[i]).padStart(10,'0')} 00000 n \n`;
 pdf+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
 return new TextEncoder().encode(pdf)
}
function zipPdfName(d,o,p){
 const raw=filename(d,o,p).replace(/\.[^.]+$/,'.pdf');
 return asciiFilePart(raw,'dokument.pdf')
}
function zipAttachedFileName(d,o,p){return asciiFilePart(filename(d,o,p),`dokument.${d.pripona||'bin'}`)}
async function addDocumentFileToZip(folder,d,o,p,blankPdf){
 const attached=attachedDocumentFiles.get(d.id);
 if(attached){folder.file(zipAttachedFileName(d,o,p),await attached.arrayBuffer());return}
 folder.file(zipPdfName(d,o,p),blankPdf)
}
async function exportProjectZip(){
 await validateAttachedDocumentFiles();
 const zip=new JSZip(),projectId=normalizeProjectId(model.projekt.id_projektu)||'123456';
 const root=zip,version=asciiFilePart(model.projekt.verzia_zoznamu||'v1.0','v1.0');
 root.file(`${projectId}_zoznam_${version}.json`,JSON.stringify(serializeJsonModel(),null,2));
 const sectionFolders={A:'A - Zoznam dokumentácie',B:'B - Súhrnná správa',C:'C - Situačné výkresy',D:'D - Dokumentácia stavebných objektov',E:'E - Prílohy'};
 const folderPaths=Object.fromEntries(Object.entries(sectionFolders).map(([key,name])=>[key,asciiFilePart(name,key)]));
 const folders=Object.fromEntries(Object.entries(folderPaths).map(([key,name])=>[key,root.folder(name)]));
 const blankPdf=blankA4PdfBytes(),zipPaths=new Map();
 async function addTracked(folder,path,d,o,p){const attached=attachedDocumentFiles.get(d.id),name=attached?zipAttachedFileName(d,o,p):zipPdfName(d,o,p),relative=normalizeArchivePath(`${path}/${name}`);if([...zipPaths.values()].some(x=>archiveDocumentStem(x)===archiveDocumentStem(relative)&&normalizeArchivePath(x).split('/').slice(0,-1).join('/').toLowerCase()===relative.split('/').slice(0,-1).join('/').toLowerCase()))throw new Error(`Kolízia názvov dokumentov v ZIP: ${relative}`);await addDocumentFileToZip(folder,d,o,p,blankPdf);zipPaths.set(d.id,relative)}
 for(const {o,p,d} of allDocs()){const section=documentSectionKey(o,d);if(!['A','B','C','E'].includes(section))continue;await addTracked(folders[section],folderPaths[section],d,o,p)}
 const sets=ensureBuildingSets(),multipleSets=sets.length>1;
 for(const set of sets){
  let setFolder=folders.D,setPath=folderPaths.D;
  if(multipleSets){const n=`${buildingSetDisplay(set)} - ${asciiFilePart(set.nazov,'Stavebný súbor')}`;setFolder=setFolder.folder(n);setPath+=`/${n}`}
  for(const o of objectsInSetDisplayOrder(set.id)){
   const on=`${objectDisplay(o)} - ${asciiFilePart(o.nazov,'Stavebný objekt')}`,objectFolder=setFolder.folder(on),objectPath=`${setPath}/${on}`;
   for(const p of (o.profesie||[])){
    const pn=`${asciiFilePart(p.kod,'XXX')} - ${asciiFilePart(p.nazov||professionName(p.kod),'Profesia')}`,professionFolder=objectFolder.folder(pn),professionPath=`${objectPath}/${pn}`;
    for(const d of (p.dokumenty||[]))await addTracked(professionFolder,professionPath,d,o,p)
   }
  }
 }
 const savedPersons=makePersonsIndexPublic();
 root.file(personsIndexFileName(),JSON.stringify(savedPersons,null,2));
 root.file(locationIndexFileName(),JSON.stringify(makeLocationIndexPublic(),null,2));
 const opaqueStatements=makeOpaqueStatementsPublic();if(opaqueStatements)root.file(statementsIndexFileName(),JSON.stringify(opaqueStatements,null,2));
 const blob=await zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:6}});
 download(blob,`${projectId}_${version}.zip`);commitPublicBuilderAfterSave(savedPersons)
}
$('#exportJson').onclick=()=>{exportJsonFile();closeSaveFlyout()};$('#exportXlsx').onclick=exportXlsx;
const saveZipMenu=$('#saveZipMenu');if(saveZipMenu)saveZipMenu.onclick=async()=>{closeSaveFlyout();try{await exportProjectZip()}catch(err){console.error(err);alert('ZIP sa nepodarilo vytvoriť: '+err.message)}};
const saveDocxMenu=$('#saveDocxMenu');if(saveDocxMenu)saveDocxMenu.onclick=async()=>{closeSaveFlyout();try{await exportDocx()}catch(err){console.error(err);alert('DOCX sa nepodarilo vytvoriť: '+err.message)}};
const saveFlyout=$('#saveFlyout'),saveMenuButton=$('#saveMenuButton');
function setSaveFlyout(open){if(!saveFlyout)return;saveFlyout.classList.toggle('open',open);saveMenuButton?.setAttribute('aria-expanded',String(open))}
function closeSaveFlyout(){setSaveFlyout(false)}
if(saveMenuButton)saveMenuButton.onclick=e=>{e.stopPropagation();setSaveFlyout(!saveFlyout.classList.contains('open'))};
if(saveFlyout){saveFlyout.addEventListener('mouseenter',()=>setSaveFlyout(true));saveFlyout.addEventListener('mouseleave',()=>setSaveFlyout(false));}
document.addEventListener('pointerdown',e=>{if(saveFlyout&&!saveFlyout.contains(e.target))closeSaveFlyout()});const exportXlsxToolbar=$('#exportXlsxToolbar');if(exportXlsxToolbar)exportXlsxToolbar.onclick=exportXlsx;const exportDocxBtn=$('#exportDocx');if(exportDocxBtn)exportDocxBtn.onclick=exportDocx;const addObjectBtn=$('#addObject');if(addObjectBtn)addObjectBtn.onclick=addObject;const addProfessionBtn=$('#addProfession');if(addProfessionBtn)addProfessionBtn.onclick=()=>addProfession();const addDocumentBtn=$('#addDocument');if(addDocumentBtn)addDocumentBtn.onclick=()=>addDocument();$('#search').oninput=()=>{modeSearchValues[currentView]=$('#search').value;render()};const expandAllBtn=$('#expandAll');if(expandAllBtn)expandAllBtn.onclick=()=>{allObjects().forEach(o=>expanded.add(o.id));allProf().forEach(x=>expanded.add(x.p.id));render()};const collapseAllBtn=$('#collapseAll');if(collapseAllBtn)collapseAllBtn.onclick=()=>{expanded.clear();render()};const idCell=document.querySelector('.project-id-cell'),idInput=$('#idProjektu'),idDisplay=$('#idProjektuDisplay');
function beginIdEdit(){idCell.classList.add('editing');idInput.value=model.projekt.id_projektu||'';requestAnimationFrame(()=>{idInput.focus();idInput.select()})}
function commitIdEdit(){model.projekt.id_projektu=normalizeProjectId(idInput.value)||'123456';idInput.value=model.projekt.id_projektu;idCell.classList.remove('editing');render()}
idDisplay.onclick=beginIdEdit;idCell.addEventListener('click',e=>{if(e.target===idCell)beginIdEdit()});
idInput.addEventListener('beforeinput',e=>{
 if(e.inputType==='insertText'&&typeof e.data==='string'){
  const inserted=normalizeProjectId(e.data);
  if(inserted!==e.data){
   e.preventDefault();
   const start=idInput.selectionStart??idInput.value.length,end=idInput.selectionEnd??start;
   idInput.setRangeText(inserted,start,end,'end');
   idInput.dispatchEvent(new Event('input',{bubbles:true}));
  }
 }
});
idInput.addEventListener('paste',e=>{
 e.preventDefault();
 const inserted=normalizeProjectId(e.clipboardData?.getData('text')||'');
 const start=idInput.selectionStart??idInput.value.length,end=idInput.selectionEnd??start;
 idInput.setRangeText(inserted,start,end,'end');
 idInput.dispatchEvent(new Event('input',{bubbles:true}));
});
idInput.oninput=()=>{const value=normalizeProjectId(idInput.value);if(idInput.value!==value)idInput.value=value};idInput.onchange=commitIdEdit;idInput.onblur=commitIdEdit;idInput.onkeydown=e=>{if(e.key==='Enter')idInput.blur();if(e.key==='Escape'){idInput.value=model.projekt.id_projektu||'';idCell.classList.remove('editing')}};const dz=$('#dropZone');['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag')}));['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag')}));dz.addEventListener('drop',async e=>{try{await importDroppedFiles(await collectDroppedFiles(e.dataTransfer))}catch(err){reportPublicImportError(err)}});
document.querySelectorAll('#views button').forEach(b=>b.onclick=()=>{const dz=$('#dropZone');['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag')}));['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag')}));dz.addEventListener('drop',async e=>{try{await importDroppedFiles(await collectDroppedFiles(e.dataTransfer))}catch(err){reportPublicImportError(err)}});
document.querySelectorAll('#views button').forEach(x=>x.classList.remove('active'));b.classList.add('active');modeSearchValues[currentView]=$('#search').value;currentView=b.dataset.view;$('#search').value=modeSearchValues[currentView]||'';render()});render();


// Exact PBS-shell header interactions.
(()=>{
  const drop=document.getElementById('dropZone');
  const input=document.getElementById('fileInput');
  if(!drop||!input)return;
  const expand=()=>drop.classList.add('expanded');
  const collapse=()=>drop.classList.remove('expanded');
  let initialCollapseTimer=setTimeout(()=>{if(!drop.matches(':hover')&&!drop.classList.contains('drag-active'))collapse()},5000);
  drop.addEventListener('mouseenter',()=>{clearTimeout(initialCollapseTimer);expand()});
  drop.addEventListener('mouseleave',collapse);
  drop.addEventListener('click',e=>{e.stopPropagation();input.click();});
  drop.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();input.click();}});
  input.addEventListener('change',()=>{if(input.files&&input.files.length){drop.classList.remove('empty');drop.classList.add('loaded');collapse();}});
  let depth=0;
  window.addEventListener('dragenter',e=>{if(!Array.from(e.dataTransfer?.types||[]).includes('Files'))return;if(documentFileDropMode&&currentView==='documents'&&!eventIsMainImportDropZone(e))return;e.preventDefault();depth++;drop.classList.add('drag-active','expanded');});
  window.addEventListener('dragover',e=>{if(!Array.from(e.dataTransfer?.types||[]).includes('Files'))return;if(documentFileDropMode&&currentView==='documents'&&!eventIsMainImportDropZone(e))return;e.preventDefault();drop.classList.add('drag-active','expanded');});
  window.addEventListener('dragleave',()=>{depth=Math.max(0,depth-1);if(!depth){drop.classList.remove('drag-active');collapse();}});
  window.addEventListener('drop',()=>{depth=0;drop.classList.remove('drag-active','expanded');});
})();

/* Ondrej Miklanek © 2026 */
