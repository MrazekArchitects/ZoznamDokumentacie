/* Profession-by-profession DOCX export. Paragraph and section formatting is cloned
   from the supplied Word reference instead of being reconstructed in CSS. */
(function(){
'use strict';
const P=window.ZOZNAM_LIST_PARAGRAPHS||{};
const esc=value=>String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
function textRuns(xml,values){
 let i=0;
 return xml.replace(/(<w:t(?:\s+[^>]*)?>)([\s\S]*?)(<\/w:t>)/g,(m,start,old,end)=>start+esc(values[i++]??'')+end);
}
function p(name,text){return textRuns(P[name],[text]);}
function documentRow(item,numberWidth){
 const n=String(item?.cislo_dokumentu??'').replace(/[^0-9]/g,'');
 const num=n?String(Number(n)).padStart(numberWidth,'0') : '';
 // Explicit Word "Single" line spacing (240 twips, automatic rule).
 // Do not change the original font size, tabs, or paragraph before/after spacing.
 return textRuns(P.document,[num,String(item?.nazov_dokumentu||''),String(item?.nazov_suboru||'')])
  .replace(/<w:spacing w:before="0"\s*\/>/, '<w:spacing w:before="0" w:line="240" w:lineRule="auto"/>');
}
function pageBefore(xml){
 // Page-break-before is on the next profession's first paragraph (or continuation
 // document), preventing a surplus blank page if the preceding page fills exactly.
 // OOXML requires pageBreakBefore to follow pStyle/keepNext/keepLines,
 // and precede widowControl, numPr, tabs, spacing and other paragraph properties.
 // Inserting at the very beginning breaks this ordering for document list paragraphs.
 const tag='<w:pageBreakBefore/>';
 if(/<w:pPr(?:\s|>)/.test(xml)){
  return xml.replace(/(<w:pPr(?:\s[^>]*)?>)([\s\S]*?)(<\/w:pPr>)/,(full,open,inner,close)=>{
   if(/<w:pageBreakBefore\b/.test(inner))return full;
   const prefix=(inner.match(/^(?:(?:<w:pStyle\b[^>]*\/>|<w:keepNext\b[^>]*\/>|<w:keepLines\b[^>]*\/>))*/)||[''])[0];
   return open+prefix+tag+inner.slice(prefix.length)+close;
  });
 }
 return xml.replace(/<w:p\b[^>]*>/,m=>m+'<w:pPr>'+tag+'</w:pPr>');
}
function fillerCounts(count){
 // Reference: 1 item -> 14+3 blanks; 7 items -> 11+3;
 // remove one 12pt blank at each even-numbered item.
 let remaining=count>=33?0:Math.max(0,17-Math.floor(count/2));
 if(remaining>=5)return [remaining-3,3];
 if(remaining===4)return [2,2];
 if(remaining===3)return [1,2];
 if(remaining===2)return [1,1];
 if(remaining===1)return [1,0];
 return [0,0];
}
function sheetsFromData(data){
 const d=Array.isArray(data?.dokumentacia)?data.dokumentacia:[];
 const section=d.find(x=>String(x.sekcia_kod||'').toUpperCase()==='D');
 const result=[];
 for(const set of section?.stavebne_subory||[]){
  for(const object of set.stavebne_objekty||[]){
   for(const profession of object.profesie||[]){
    result.push({set,object,profession,documents:Array.isArray(profession.dokumenty)?profession.dokumenty:[]});
   }
  }
 }
 return result;
}
function buildBody(data,identity){
 const meta=data.udaje_projektu||{};
 const stageName=String(meta.stupen_dokumentacie_nazov||meta.stupen_dokumentacie_kod||'');
 const projectName=String(meta.nazov_projektu||'');
 const b=[];
 const sheets=sheetsFromData(data);
 if(!sheets.length)throw new Error('V časti D nie je žiadna profesia na export.');
 sheets.forEach((sheet,idx)=>{
  const {object,profession,documents}=sheet;
  const n=documents.length;
  const [top,bottom]=fillerCounts(Math.min(Math.max(n,1),33));
  b.push(idx?pageBefore(P.intro):P.intro);
  b.push(p('investor',identity.name||meta.stavebnik_meno||''));
  b.push(p('address',identity.address||meta.stavebnik_adresa||''));
  // The source template's paragraph immediately after the investor address
  // is mandatory. It is NOT one of the removable GGG filler paragraphs.
  b.push(P.separator);
  for(let i=0;i<top;i++)b.push(p('filler',''));
  b.push(p('project',projectName));
  b.push(p('stage',stageName.toLocaleUpperCase('sk-SK')));
  for(let i=0;i<bottom;i++)b.push(p('filler',''));
  const kind=String(object.typ_objektu||'SO').toUpperCase()==='PS'?'PS':'SO';
  const id=String(object.cislo_objektu||'').padStart(2,'0');
  const objectName=[kind+'-'+id,String(object.nazov_objektu||'')].filter(Boolean).join(' ');
  b.push(p('object',objectName));
  b.push(p('profession',String(profession.nazov_profesie||profession.kod_profesie||'')));
  // Keep the reference blank paragraph after every profession heading, even
  // when 33 documents must fit onto the first page.
  b.push(P.beforeDocs);
  if(!n){return;}
  // A profession uses three digits for every document if any numeric
  // document identifier in that profession is >= 100. Row count is irrelevant.
  const maxNumber=documents.reduce((max,doc)=>{
   const digits=String(doc?.cislo_dokumentu??'').replace(/[^0-9]/g,'');
   return digits?Math.max(max,Number(digits)):max;
  },-1);
  const numberWidth=maxNumber>=100?3:2;
  // Let Word paginate long document lists naturally. Only the next
  // profession starts on a new page; never break at 33/66/99 documents.
  documents.forEach(doc=>b.push(documentRow(doc,numberWidth)));
 });
 // Cloned source paragraphs must not reuse the template's unique Word paragraph IDs.
 return {xml:b.join('').replace(/\s+w14:(?:paraId|textId)="[A-Fa-f0-9]+"/g,''),sheets};
}
function updateHeader(xml,data){
 const meta=data.udaje_projektu||{};
 const stage=String(meta.stupen_dokumentacie_nazov||meta.stupen_dokumentacie_kod||'');
 const project=String(meta.nazov_projektu||'');
 // Source header has exactly two visible runs. Match their existing source strings,
 // preserve run-level Segoe UI Light and Semibold/Bold formatting.
 return xml.replace(/(<w:t(?:\s+[^>]*)?>)Projekt stavby – (<\/w:t>)/g,(_m,a,b)=>a+esc(stage)+' – '+b)
           .replace(/(<w:t(?:\s+[^>]*)?>)Rodinný dom Stredné Testy(<\/w:t>)/g,(_m,a,b)=>a+esc(project)+b);
}
async function create(data,identity){
 if(typeof JSZip==='undefined')throw new Error('JSZip nie je dostupný.');
 const raw=window.ZOZNAM_LIST_DOCX_BASE64;
 if(!raw||!P.document)throw new Error('Šablóna Zoznam nie je dostupná.');
 const zip=await JSZip.loadAsync(raw,{base64:true});
 const base=await zip.file('word/document.xml').async('string');
 const built=buildBody(data,identity||{});
 if(!/<w:body>/.test(base))throw new Error('Neplatné Word dokument.xml.');
 zip.file('word/document.xml',base.replace('<w:body>','<w:body>'+built.xml));
 for(const file of ['word/header1.xml','word/header2.xml']){
  if(zip.file(file))zip.file(file,updateHeader(await zip.file(file).async('string'),data));
 }
 return zip.generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',compression:'DEFLATE',compressionOptions:{level:6}});
}
window.ZoznamListDocx={create,_test:{sheetsFromData,fillerCounts,buildBody}};
})();
