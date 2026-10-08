(function(){
'use strict';
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const colNum=s=>{let n=0;for(const c of s)n=n*26+c.charCodeAt(0)-64;return n};
const colName=n=>{let s='';while(n){n--;s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26)}return s};
const addr=a=>{const m=String(a).toUpperCase().match(/^([A-Z]+)(\d+)$/);return m?{c:colNum(m[1]),r:+m[2]}:null};
class Cell{constructor(row,c){this.row=row;this.col=c;this.value=null;this.style={};this.numFmt=''}get address(){return colName(this.col)+this.row.number}}
class Row{constructor(ws,n){this.worksheet=ws;this.number=n;this.height=undefined;this.cells=new Map()}getCell(c){if(typeof c==='string')c=addr(c).c;if(!this.cells.has(c))this.cells.set(c,new Cell(this,c));return this.cells.get(c)}}
class Worksheet{constructor(name){this.name=name;this.rows=new Map()}getCell(a){const p=typeof a==='string'?addr(a):a;return this.getRow(p.r).getCell(p.c)}getRow(n){if(!this.rows.has(n))this.rows.set(n,new Row(this,n));return this.rows.get(n)}get rowCount(){return Math.max(0,...this.rows.keys())}eachRow(cb){[...this.rows.keys()].sort((a,b)=>a-b).forEach(n=>cb(this.rows.get(n),n))}spliceRows(start,count){for(const n of [...this.rows.keys()])if(n>=start&&n<start+count)this.rows.delete(n);else if(n>=start+count){const r=this.rows.get(n);this.rows.delete(n);r.number=n-count;for(const c of r.cells.values())c.row=r;this.rows.set(n-count,r)}}}
class Workbook{
 constructor(){this.worksheets=[];this._zip=null;this._sheetPaths=new Map();this.xlsx={load:b=>this._load(b),writeBuffer:()=>this._write()}}
 addWorksheet(name){const w=new Worksheet(name);this.worksheets.push(w);return w}
 getWorksheet(name){return this.worksheets.find(x=>x.name===name)}
 async _load(buf){const zip=await JSZip.loadAsync(buf);this._zip=zip;let shared=[];const ss=zip.file('xl/sharedStrings.xml');if(ss){const xml=await ss.async('string');const doc=new DOMParser().parseFromString(xml,'application/xml');shared=[...doc.getElementsByTagName('si')].map(si=>[...si.getElementsByTagName('t')].map(t=>t.textContent).join(''))}
 const wbdoc=new DOMParser().parseFromString(await zip.file('xl/workbook.xml').async('string'),'application/xml');const relDoc=new DOMParser().parseFromString(await zip.file('xl/_rels/workbook.xml.rels').async('string'),'application/xml');const rels={};[...relDoc.getElementsByTagName('Relationship')].forEach(r=>rels[r.getAttribute('Id')]=r.getAttribute('Target'));
 for(const s of [...wbdoc.getElementsByTagName('sheet')]){const name=s.getAttribute('name'),rid=s.getAttribute('r:id')||s.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships','id');let target=rels[rid];if(!target)continue;target=target.replace(/^\/?/,'');if(!target.startsWith('xl/'))target='xl/'+target;const ws=this.addWorksheet(name);this._sheetPaths.set(name,target);const f=zip.file(target);if(!f)continue;const doc=new DOMParser().parseFromString(await f.async('string'),'application/xml');for(const ce of [...doc.getElementsByTagName('c')]){const p=addr(ce.getAttribute('r'));if(!p)continue;const cell=ws.getRow(p.r).getCell(p.c),t=ce.getAttribute('t'),v=ce.getElementsByTagName('v')[0]?.textContent??'',is=ce.getElementsByTagName('is')[0];if(t==='s')cell.value=shared[+v]??'';else if(t==='inlineStr')cell.value=[...(is?.getElementsByTagName('t')||[])].map(x=>x.textContent).join('');else if(t==='b')cell.value=v==='1';else cell.value=v===''?'':(Number.isFinite(+v)?+v:v)} }
 return this}
 _sheetXml(ws){let rows='';ws.eachRow(r=>{let cells='';[...r.cells.keys()].sort((a,b)=>a-b).forEach(c=>{const cell=r.cells.get(c),v=cell.value;if(v===null||v===undefined)return;const a=cell.address;if(typeof v==='number')cells+=`<c r="${a}"><v>${v}</v></c>`;else if(typeof v==='boolean')cells+=`<c r="${a}" t="b"><v>${v?1:0}</v></c>`;else cells+=`<c r="${a}" t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`});if(cells)rows+=`<row r="${r.number}">${cells}</row>`});return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rows}</sheetData></worksheet>`}
 async _write(){let zip=this._zip||new JSZip();if(!this._zip){zip.file('[Content_Types].xml',`<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>${this.worksheets.map((_,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/></Types>`);zip.file('_rels/.rels',`<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`);zip.file('xl/workbook.xml',`<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${this.worksheets.map((w,i)=>`<sheet name="${esc(w.name)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')}</sheets></workbook>`);zip.file('xl/_rels/workbook.xml.rels',`<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${this.worksheets.map((_,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')}</Relationships>`)}
 this.worksheets.forEach((w,i)=>{const path=this._sheetPaths.get(w.name)||`xl/worksheets/sheet${i+1}.xml`;zip.file(path,this._sheetXml(w))});return zip.generateAsync({type:'uint8array',compression:'DEFLATE'})}
}
window.ExcelJS={Workbook};
window.ZoznamDocx={async create(model,data){
 const b64=window.ZOZNAM_DOCX_TEMPLATE_BASE64;if(!b64)throw new Error('DOCX šablóna nie je dostupná.');
 const bytes=Uint8Array.from(atob(b64),c=>c.charCodeAt(0)),zip=await JSZip.loadAsync(bytes);
 const W='http://schemas.openxmlformats.org/wordprocessingml/2006/main',R='http://schemas.openxmlformats.org/officeDocument/2006/relationships';
 const parser=new DOMParser(),serializer=new XMLSerializer();
 const doc=parser.parseFromString(await zip.file('word/document.xml').async('string'),'application/xml');
 const body=doc.getElementsByTagNameNS(W,'body')[0];
 const txt=n=>[...n.getElementsByTagNameNS(W,'t')].map(x=>x.textContent).join('');
 const setParagraphText=(p,text)=>{const ts=[...p.getElementsByTagNameNS(W,'t')];if(ts.length){ts[0].textContent=String(text??'');for(let i=1;i<ts.length;i++)ts[i].textContent=''}else{const r=doc.createElementNS(W,'w:r'),t=doc.createElementNS(W,'w:t');t.textContent=String(text??'');r.appendChild(t);p.appendChild(r)}};
 const replaceText=(root,map)=>{for(const p of [...root.getElementsByTagNameNS(W,'p')])for(const [needle,repl0] of Object.entries(map)){const repl=String(repl0??'');let nodes=[...p.getElementsByTagNameNS(W,'t')],all=nodes.map(n=>n.textContent||'').join(''),at=all.indexOf(needle);while(at>=0){let pos=0,si=-1,ei=-1,so=0,eo=0;for(let i=0;i<nodes.length;i++){const len=(nodes[i].textContent||'').length;if(si<0&&at>=pos&&at<=pos+len){si=i;so=at-pos}if(at+needle.length>=pos&&at+needle.length<=pos+len){ei=i;eo=at+needle.length-pos;break}pos+=len}if(si<0||ei<0)break;const before=(nodes[si].textContent||'').slice(0,so),after=(nodes[ei].textContent||'').slice(eo);nodes[si].textContent=before+repl+(si===ei?after:'');for(let i=si+1;i<ei;i++)nodes[i].textContent='';if(ei>si)nodes[ei].textContent=after;all=nodes.map(n=>n.textContent||'').join('');at=all.indexOf(needle)}}};
 const cloneByText=(needle)=>{const p=[...body.children].find(n=>n.localName==='p'&&txt(n).includes(needle));if(!p)throw new Error('Chýba prototyp odseku: '+needle);return p.cloneNode(true)};
 const clearRuns=p=>{for(const n of [...p.children])if(n.localName!=='pPr')p.removeChild(n)};
 const makeRun=(text,protoRun,opt={})=>{const r=doc.createElementNS(W,'w:r');let rPr=protoRun?.getElementsByTagNameNS(W,'rPr')[0]?.cloneNode(true)||doc.createElementNS(W,'w:rPr');
  for(const f of [...rPr.getElementsByTagNameNS(W,'rFonts')]){f.setAttributeNS(W,'w:ascii',opt.bold?'Segoe UI Semibold':'Segoe UI Light');f.setAttributeNS(W,'w:hAnsi',opt.bold?'Segoe UI Semibold':'Segoe UI Light');f.setAttributeNS(W,'w:cs',opt.bold?'Segoe UI Semibold':'Segoe UI Light')}
  if(opt.bold&&!rPr.getElementsByTagNameNS(W,'b').length)rPr.appendChild(doc.createElementNS(W,'w:b'));
  if(opt.color){let c=rPr.getElementsByTagNameNS(W,'color')[0]||doc.createElementNS(W,'w:color');c.setAttributeNS(W,'w:val',opt.color);if(!c.parentNode)rPr.appendChild(c)}
  // Template prototypes may already contain yellow highlighting. Remove it first,
  // then apply highlighting only when the live document revision is 01 or higher.
  for(const h of [...rPr.getElementsByTagNameNS(W,'highlight')])h.remove();
  for(const shd of [...rPr.getElementsByTagNameNS(W,'shd')])shd.remove();
  if(opt.highlight){let h=doc.createElementNS(W,'w:highlight');h.setAttributeNS(W,'w:val',opt.highlight===true?'yellow':opt.highlight);rPr.appendChild(h)}
  if(opt.fill){const shd=doc.createElementNS(W,'w:shd');shd.setAttributeNS(W,'w:val','clear');shd.setAttributeNS(W,'w:color','auto');shd.setAttributeNS(W,'w:fill',opt.fill);rPr.appendChild(shd)}
  r.appendChild(rPr);const t=doc.createElementNS(W,'w:t');t.setAttribute('xml:space','preserve');t.textContent=String(text??'');r.appendChild(t);return r};
 const addTab=p=>{const r=doc.createElementNS(W,'w:r'),tab=doc.createElementNS(W,'w:tab');r.appendChild(tab);p.appendChild(r)};
 const setLabelTabbedValue=(needle,label,value)=>{const p=[...body.children].find(n=>n.localName==='p'&&txt(n).includes(needle));if(!p)return;const proto=[...p.getElementsByTagNameNS(W,'r')][0];clearRuns(p);p.appendChild(makeRun(label,proto));addTab(p);p.appendChild(makeRun(value,proto))};
 const makeTabbed=(proto,vals,opt={})=>{const p=proto.cloneNode(true),pr=[...p.getElementsByTagNameNS(W,'r')][0];clearRuns(p);const pPr=p.getElementsByTagNameNS(W,'pPr')[0]||p.insertBefore(doc.createElementNS(W,'w:pPr'),p.firstChild);for(const shd of [...pPr.getElementsByTagNameNS(W,'shd')])shd.remove();if(opt.fill){const shd=doc.createElementNS(W,'w:shd');shd.setAttributeNS(W,'w:val','clear');shd.setAttributeNS(W,'w:color','auto');shd.setAttributeNS(W,'w:fill',opt.fill);pPr.appendChild(shd)}vals.forEach((v,i)=>{if(i)addTab(p);p.appendChild(makeRun(v,pr,{...opt,highlight:false}))});return p};
 const pageBreak=()=>{const p=doc.createElementNS(W,'w:p'),r=doc.createElementNS(W,'w:r'),b=doc.createElementNS(W,'w:br');b.setAttributeNS(W,'w:type','page');r.appendChild(b);p.appendChild(r);return p};
 const project=model.projekt||{},u=data.udaje_projektu||{};
 const placeStreet=project.miesto_stavby_ulica??u.miesto_stavby_ulica??project.miesto_stavby??u.miesto_stavby??'';
 const placeCity=project.miesto_stavby_mesto??u.miesto_stavby_mesto??'';
 const placePsc=project.miesto_stavby_psc??u.miesto_stavby_psc??'';
 const cityParagraph=[...body.children].find(n=>n.localName==='p'&&(txt(n).includes('MM11NN22')||txt(n).includes('<<projekt_mesto>>')));
 const pscParagraph=[...body.children].find(n=>n.localName==='p'&&(txt(n).includes('PP33SS44')||txt(n).includes('<<projekt_psc>>')));
 const map={
  '<<stupen_dokumentacie_nazov >>':u.stupen_dokumentacie_nazov||project.stupen_dokumentacie||'',
  '<<stupen_dokumentacie_nazov>>':u.stupen_dokumentacie_nazov||project.stupen_dokumentacie||'',
  '<< stupen_dokumentacie_nazov>>':String(u.stupen_dokumentacie_nazov||project.stupen_dokumentacie||'').toLocaleUpperCase('sk-SK'),
  '<<nazov_projektu>>':project.nazov_projektu||'', '<<stavebnik_meno>>':project.stavebnik||'',
  '<<stavebnik_adresa>>':project.adresa_stavebnika||'', '<<zoznam_spracoval1>>':project.zoznam_vypracoval||'',
  '<<zoznam_spracoval2>>':'', '<<id_stavby>>':project.id_projektu||'', '<<projekt_ulica>>':placeStreet,
  '<<projekt_mesto>>':placeCity,'<<projekt_psc>>':placePsc,'<<zoznam_datum>>':project.datum_vydania||'', '<<zoznam_revizia>>':project.revizia_zoznamu||'00'
 };
 replaceText(doc,map);
 // Title-page author: keep the template's 13 cm tab stop and place the name at that tab.
 const preparedP=[...body.children].find(n=>n.localName==='p'&&txt(n).includes('Spracoval:'));
 if(preparedP){const proto=[...preparedP.getElementsByTagNameNS(W,'r')][0];clearRuns(preparedP);preparedP.appendChild(makeRun('Spracoval:',proto));addTab(preparedP);preparedP.appendChild(makeRun(project.zoznam_vypracoval||'',proto))}
 setLabelTabbedValue('ID stavby:','ID stavby:',project.id_projektu||'');
 setLabelTabbedValue('Názov stavby:','Názov stavby:',project.nazov_projektu||'');
 setLabelTabbedValue('Miesto stavby:','Miesto stavby:',placeStreet);
 const setContinuationTabbedValue=(p,value)=>{if(!p)return;const proto=[...p.getElementsByTagNameNS(W,'r')][0];clearRuns(p);addTab(p);p.appendChild(makeRun(value,proto))};
 setContinuationTabbedValue(cityParagraph,placeCity);
 setContinuationTabbedValue(pscParagraph,placePsc);
 setLabelTabbedValue('Počet strán zoznamu dokumentácie:','Počet strán zoznamu dokumentácie:','__NUMPAGES__');
 setLabelTabbedValue('Dátum vydania','Dátum vydania',project.datum_vydania||'');
 setLabelTabbedValue('Označenie revízie:','Označenie revízie:',project.revizia_zoznamu||'00');
 for(const hf of ['word/header1.xml','word/header2.xml']){const f=zip.file(hf);if(f){const hd=parser.parseFromString(await f.async('string'),'application/xml'),hp=[...hd.getElementsByTagNameNS(W,'p')].find(p=>txt(p).includes('stupen_dokumentacie_nazov'));if(hp){const runs=[...hp.getElementsByTagNameNS(W,'r')],light=runs.find(r=>{const fs=r.getElementsByTagNameNS(W,'rFonts')[0];return fs&&(fs.getAttributeNS(W,'ascii')||'').includes('Light')})||runs[0],bold=runs.find(r=>r.getElementsByTagNameNS(W,'b').length)||runs[runs.length-1];
   // Header must be one uninterrupted right-aligned line. Remove tab stops and
   // any inherited tab runs that could push the first part back to the left.
   let pPr=hp.getElementsByTagNameNS(W,'pPr')[0];if(!pPr){pPr=hd.createElementNS(W,'w:pPr');hp.insertBefore(pPr,hp.firstChild)}
   for(const tabs of [...pPr.getElementsByTagNameNS(W,'tabs')])tabs.remove();
   let jc=pPr.getElementsByTagNameNS(W,'jc')[0];if(!jc){jc=hd.createElementNS(W,'w:jc');pPr.appendChild(jc)}jc.setAttributeNS(W,'w:val','right');
   for(const n of [...hp.children])if(n.localName!=='pPr')hp.removeChild(n);const cloneRun=(text,src)=>{const r=src.cloneNode(true);for(const tab of [...r.getElementsByTagNameNS(W,'tab')])tab.remove();const ts=[...r.getElementsByTagNameNS(W,'t')];if(ts.length){ts[0].textContent=text;for(let i=1;i<ts.length;i++)ts[i].textContent=''}else{const t=hd.createElementNS(W,'w:t');t.setAttribute('xml:space','preserve');t.textContent=text;r.appendChild(t)}return r};hp.appendChild(cloneRun(u.stupen_dokumentacie_nazov||project.stupen_dokumentacie||'',light));hp.appendChild(cloneRun(' – ',light));hp.appendChild(cloneRun(project.nazov_projektu||'',bold))}else replaceText(hd,map);zip.file(hf,serializer.serializeToString(hd))}}
 // Word does not recalculate body fields before the first screen paint in all
 // desktop configurations. Keep the v134 SECTIONPAGES field, but populate its
 // cached result from the exact frozen export snapshot so the first-open value is
 // useful immediately. A manual field update can still replace it with Word's own
 // final pagination.
 const estimateDocxPages=()=>{
  // Pages 1 and 2 are fixed front matter. The register begins on page 3.
  // Count rendered paragraph-height units from the same immutable JSON snapshot
  // used to generate the register. Prototype paragraph spacing is included only
  // for the first document in each self-contained document group.
  let units=1.35; // register column header
  const wrappedLines=(d)=>{
   const no=String(d?.cislo_dokumentu||'');
   const type=String(d?.typ_dokumentu||'');
   const name=String(d?.nazov_dokumentu||'');
   const scale=String(d?.mierka||'');
   const person=String(d?.zodpovedny_projektant||'');
   // Approximate the effective tabbed widths used by the template. Long values
   // wrap independently in the name and responsible-person areas.
   const nameLines=Math.max(1,Math.ceil((name.length+Math.max(0,type.length-3)*0.35)/42));
   const personLines=Math.max(1,Math.ceil(person.length/31));
   const scaleLines=scale.length>14?2:1;
   return Math.max(nameLines,personLines,scaleLines)+(no.length>9?.12:0);
  };
  const addGroupDocs=docs=>{
   (docs||[]).forEach((d,i)=>{units+=wrappedLines(d)+(i===0?.42:0)});
  };
  for(const sec of data.dokumentacia||[]){
   units+=1.35; // section heading
   if(sec.sekcia_kod==='D'){
    const sets=sec.stavebne_subory||[];
    for(const set of sets){
     if(sets.length>1)units+=1.15;
     for(const o of set.stavebne_objekty||[]){
      units+=1.25;
      for(const pf of o.profesie||[]){units+=1.05;addGroupDocs(pf.dokumenty)}
     }
    }
   }else addGroupDocs(sec.dokumenty);
  }
  // With the template margins/font/spacing, the register fits approximately
  // 38 normal line units per page. Use a tiny epsilon to avoid a floating-point
  // boundary creating an intermittent extra page.
  const registerPages=Math.max(1,Math.ceil((units-0.08)/38));
  return 2+registerPages;
 };
 const cachedPageCount=estimateDocxPages();
 const countP=[...body.children].find(n=>n.localName==='p'&&txt(n).includes('__NUMPAGES__'));
 if(countP){
  const protoRun=[...countP.getElementsByTagNameNS(W,'r')][0]||null;
  for(const r of [...countP.getElementsByTagNameNS(W,'r')])if(txt(r).includes('__NUMPAGES__'))r.remove();
  const fieldRun=(kind,text='')=>{const r=makeRun(text,protoRun);let rPr=r.getElementsByTagNameNS(W,'rPr')[0];if(!rPr){rPr=doc.createElementNS(W,'w:rPr');r.insertBefore(rPr,r.firstChild)}
   let fonts=rPr.getElementsByTagNameNS(W,'rFonts')[0];if(!fonts){fonts=doc.createElementNS(W,'w:rFonts');rPr.insertBefore(fonts,rPr.firstChild)}
   for(const a of ['ascii','hAnsi','cs','eastAsia'])fonts.setAttributeNS(W,'w:'+a,'Segoe UI Light');
   for(const t of [...r.getElementsByTagNameNS(W,'t')])t.remove();
   if(kind==='instr'){const x=doc.createElementNS(W,'w:instrText');x.setAttribute('xml:space','preserve');x.textContent=' SECTIONPAGES ';r.appendChild(x)}
   else if(kind==='result'){const x=doc.createElementNS(W,'w:t');x.textContent=String(cachedPageCount);r.appendChild(x)}
   else{const x=doc.createElementNS(W,'w:fldChar');x.setAttributeNS(W,'w:fldCharType',kind);r.appendChild(x)}
   return r};
  countP.appendChild(fieldRun('begin'));
  countP.appendChild(fieldRun('instr'));
  countP.appendChild(fieldRun('separate'));
  countP.appendChild(fieldRun('result'));
  countP.appendChild(fieldRun('end'));
  const noteRun=makeRun('   ← aktualizujte pole (update field) alebo prepíšte',protoRun,{color:'FF0000'});
  // The template run can inherit hidden-text properties. Explicitly remove them
  // so the instruction is always visible in Word while remaining outside the field.
  const notePr=noteRun.getElementsByTagNameNS(W,'rPr')[0];
  if(notePr){
   for(const n of [...notePr.children])if(n.localName==='vanish'||n.localName==='webHidden')n.remove();
   let noteColor=notePr.getElementsByTagNameNS(W,'color')[0];
   if(!noteColor){noteColor=doc.createElementNS(W,'w:color');notePr.appendChild(noteColor)}
   noteColor.setAttributeNS(W,'w:val','FF0000');
   for(const tag of ['sz','szCs']){
    let sizeNode=notePr.getElementsByTagNameNS(W,tag)[0];
    if(!sizeNode){sizeNode=doc.createElementNS(W,'w:'+tag);notePr.appendChild(sizeNode)}
    sizeNode.setAttributeNS(W,'w:val','20');
   }
  }
  countP.appendChild(noteRun);
 }
 // Use the template paragraphs as exact formatting prototypes (tabs, indents, spacing, fonts).
 const colProto=cloneByText('číslo dokumentu'),secProto=cloneByText('A ZOZNAM'),firstDocProto=cloneByText('C00.SIT.001'),nextDocProto=cloneByText('C00.SIT.002'),objProto=cloneByText('SO-02 Bytový dom'),profProto=cloneByText('Architektúra a'),eProto=cloneByText('zoznam PRÍLOH');
 const yellowP=[...body.children].find(n=>n.localName==='p'&&txt(n).includes('Žltou vyznačený text'));
 const allRevisions=[];for(const sec of data.dokumentacia||[]){for(const d of sec.dokumenty||[])allRevisions.push(String(d.revizia||'00').replace(/\D/g,'').padStart(2,'0'));for(const set of sec.stavebne_subory||[])for(const o of set.stavebne_objekty||[])for(const pf of o.profesie||[])for(const d of pf.dokumenty||[])allRevisions.push(String(d.revizia||'00').replace(/\D/g,'').padStart(2,'0'))}
 const activeRevisions=[...new Set(allRevisions.filter(r=>Number(r)>0))].sort((a,b)=>Number(a)-Number(b));
 if(yellowP){
  if(!activeRevisions.length)yellowP.remove();
  else{const proto=[...yellowP.getElementsByTagNameNS(W,'r')][0]||null;clearRuns(yellowP);
   const append=(text,fill='')=>yellowP.appendChild(makeRun(text,proto,{fill}));
   if(activeRevisions.length===1&&activeRevisions[0]==='01'){
    append('Žltou vyznačený text','FFFF00');append(' sú revízie výkresov/správ, alebo nové/doplnené výkresy/správy.');
   }else{
    append('Farebne vyznačený text sú revízie výkresov/správ, alebo nové/doplnené výkresy/správy. ');
    append('Žltou vyznačený text','FFFF00');append(' je revízia 01, ');
    append('zelenou vyznačený text','92D050');append(' je revízia 02, ');
    append('modrou vyznačený text','00FFFF');append(' je revízia 03 a ');
    append('fialovou vyznačený text','C9A0DC');append(' je iná revízia.');
   }
  }
 }
 const sect=[...body.children].find(n=>n.localName==='sectPr');
 // Always remove the template's complete sample register before inserting live
 // content. The old implementation started removal after the revision-note
 // paragraph; when that paragraph was conditionally removed, the sample A-E
 // register remained and a second generated register was appended.
 const templateRegisterStart=[...body.children].find(n=>n.localName==='p'&&txt(n).includes('číslo dokumentu'));
 if(!templateRegisterStart)throw new Error('V šablóne chýba začiatok zoznamu dokumentácie.');
 let removeRegister=false;
 for(const n of [...body.children]){
  if(n===templateRegisterStart)removeRegister=true;
  if(removeRegister&&n!==sect)body.removeChild(n);
 }
 const insert=n=>body.insertBefore(n,sect);
 // The template's register-header prototype already begins with a column break,
 // which acts as the single required page break in this one-column document.
 // Do not add pageBreakBefore as that would create an extra blank page.
 const registerHeader=colProto.cloneNode(true);insert(registerHeader);
 const sectionNames={A:'ZOZNAM DOKUMENTÁCIE',B:'SÚHRNNÁ SPRÁVA',C:'SITUAČNÉ VÝKRESY',D:'DOKUMENTÁCIA STAVEBNÝCH OBJEKTOV'};
 const code=(section,d,o,pf)=>{const n=String(Number(d.cislo_dokumentu)||0);if(section==='A'||section==='B')return `${section}${n.padStart(2,'0')}.${d.typ_dokumentu||''}`;if(section==='C'||section==='E')return `${section}${n.padStart(2,'0')}.${d.typ_dokumentu||''}`;return `D${String(o.cislo_objektu||'01').padStart(2,'0')}.${pf.kod_profesie||''}.${n.padStart(3,'0')}.${d.typ_dokumentu||''}`.replace(/\.$/,'')};
 const revisionFill=rev=>{const n=Number(String(rev||'00').replace(/\D/g,''))||0;return n===1?'FFFF00':n===2?'92D050':n===3?'00FFFF':n>0?'C9A0DC':''};
 const addDoc=(section,d,o,pf,isFirst=false)=>insert(makeTabbed(isFirst?firstDocProto:nextDocProto,[code(section,d,o,pf),d.nazov_dokumentu||'',d.mierka||'',d.zodpovedny_projektant||''],{fill:revisionFill(d.revizia)}));
 let currentObj='',currentProf='';
 for(const sec of data.dokumentacia||[]){const k=sec.sekcia_kod;
  if(['A','B','C'].includes(k)){const sp=secProto.cloneNode(true);setParagraphText(sp,`${k}  ${sectionNames[k]}`);insert(sp);for(const [i,d] of (sec.dokumenty||[]).entries())addDoc(k,d,null,null,i===0)}
  if(k==='D'){const sp=secProto.cloneNode(true);setParagraphText(sp,`D  ${sectionNames.D}`);insert(sp);
   for(const set of sec.stavebne_subory||[])for(const o of set.stavebne_objekty||[]){currentObj=`${o.typ_objektu||'SO'}-${String(o.cislo_objektu||'01').padStart(2,'0')} ${o.nazov_objektu||''}`;const op=objProto.cloneNode(true);setParagraphText(op,currentObj);insert(op);for(const pf of o.profesie||[]){currentProf=pf.nazov_profesie||pf.kod_profesie||'';const pp=profProto.cloneNode(true);setParagraphText(pp,currentProf);insert(pp);for(const [i,d] of (pf.dokumenty||[]).entries())addDoc('D',d,o,pf,i===0)}}}
  if(k==='E'){const ep=eProto.cloneNode(true);setParagraphText(ep,'ZOZNAM PRÍLOH – ČASŤ E');insert(ep);for(const [i,d] of (sec.dokumenty||[]).entries())addDoc('E',d,null,null,i===0)}
 }
 // Keep the cached SECTIONPAGES result stable when the document leaves
 // Protected View / Enable Editing. Word otherwise recalculates this body field too
 // early and temporarily resets it to 1. Do not mark the field dirty and explicitly
 // remove automatic-open recalculation settings. The field remains available for a
 // manual Update Field operation when the user wants Word's final layout-engine count.
 for(const begin of [...doc.getElementsByTagNameNS(W,'fldChar')]){
  if(begin.getAttributeNS(W,'fldCharType')==='begin')begin.removeAttributeNS(W,'dirty');
 }
 const settingsFile=zip.file('word/settings.xml');
 if(settingsFile){
  const settingsDoc=parser.parseFromString(await settingsFile.async('string'),'application/xml');
  for(const n of [...settingsDoc.getElementsByTagNameNS(W,'updateFields')])n.remove();
  zip.file('word/settings.xml',serializer.serializeToString(settingsDoc));
 }
 zip.file('word/document.xml',serializer.serializeToString(doc));
 return zip.generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',compression:'DEFLATE'});
}};
})();

/* Ondrej Miklanek © 2026 */
