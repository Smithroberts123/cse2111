(function(){
  /* ---------- data ---------- */
  var LABS=[1,2,3,4,5,6,7,8,9].map(function(n){
    if(n===6) return {n:n,subs:[{id:'lab-6-pre-lab',label:'Pre-Lab'},{id:'lab-6-in-lab',label:'In-Lab'}]};
    return {n:n,subs:null};
  });
  var PLAY='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z"/></svg>';
  var SEARCH='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6.5 1a5.5 5.5 0 014.38 8.83l3.65 3.64-1.06 1.06-3.64-3.65A5.5 5.5 0 116.5 1zm0 1.5a4 4 0 100 8 4 4 0 000-8z"/></svg>';
  function yt(q){return 'https://www.youtube.com/results?search_query='+encodeURIComponent(q);}
  var VIDEOS=[
    {group:'Excel',tag:'x',items:[
      {t:'Relative vs. absolute cell references',d:'When to use $A$1, and why copied formulas “break.”',u:'https://www.youtube.com/watch?v=iDg9s7BJ2m4',by:'GCFLearnFree'},
      {t:'Mixed references ($A1 vs A$1)',d:'Locking just the row or just the column.',u:yt('excel mixed cell references explained')},
      {t:'IF and nested IF',d:'Making a cell show different results based on a condition.',u:yt('excel IF function nested IF tutorial')},
      {t:'AND / OR inside IF',d:'Testing more than one condition at once.',u:yt('excel IF AND OR function tutorial')},
      {t:'VLOOKUP and XLOOKUP',d:'Pulling a matching value out of another table.',u:yt('excel VLOOKUP XLOOKUP tutorial beginners')},
      {t:'COUNTIF, SUMIF, AVERAGEIF',d:'Counting and adding only the rows that match.',u:yt('excel COUNTIF SUMIF AVERAGEIF tutorial')},
      {t:'PivotTables',d:'Summarizing a big list in a few clicks.',u:yt('excel pivot table tutorial for beginners')},
      {t:'Charts that communicate',d:'Picking the right chart and labeling it clearly.',u:yt('excel charts tutorial beginners')}
    ]},
    {group:'Access',tag:'a',items:[
      {t:'Microsoft Access beginner tutorial',d:'Tables, forms, queries, and reports in one walkthrough.',u:'https://www.youtube.com/watch?v=ubmwp8kbfPc',by:'Kevin Stratvert'},
      {t:'Primary keys and foreign keys',d:'What makes a record unique, and how tables point to each other.',u:yt('primary key foreign key explained database')},
      {t:'Relationships and referential integrity',d:'One-to-many links, orphans, and the cascade options.',u:yt('microsoft access relationships referential integrity tutorial')},
      {t:'Importing text and Excel into Access',d:'The Get External Data wizard and Append to a table.',u:yt('microsoft access import text file append to table')},
      {t:'Select queries and the QBE grid',d:'Picking fields, criteria, and sorting in Design View.',u:yt('microsoft access query design view criteria tutorial')},
      {t:'Normalization basics',d:'Why one big table causes problems and how to split it.',u:yt('database normalization explained simple')}
    ]}
  ];

  /* ---------- build sidebar + grid ---------- */
  function svg(p){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>';}
  var IC={
    home:svg('<path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9v11h13V9"/><path d="M10 20v-5h4v5"/>'),
    stack:svg('<path d="M12 3.5 3.5 8 12 12.5 20.5 8z"/><path d="M3.5 12 12 16.5 20.5 12"/><path d="M3.5 16 12 20.5 20.5 16"/>'),
    folder:svg('<path d="M3.5 7.5a2 2 0 0 1 2-2h3.6l2 2h7.4a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>'),
    folderOpen:svg('<path d="M3.5 17V7.5a2 2 0 0 1 2-2h3.6l2 2h6.4a2 2 0 0 1 2 2v1"/><path d="M3.5 17.5 6 11.6a1.6 1.6 0 0 1 1.5-1h13.2l-2.5 7a2 2 0 0 1-1.9 1.4H5a1.5 1.5 0 0 1-1.5-1.5z"/>'),
    doc:svg('<path d="M7 3.5h7l4.5 4.5v12.5H7z"/><path d="M14 3.5V8h4.5"/><path d="M10 13h5.5M10 16.5h4"/>'),
    chev:svg('<path d="M9 6l6 6-6 6"/>'),
    quiz:svg('<rect x="5.5" y="4.5" width="13" height="16" rx="2"/><path d="M9 4.5V3h6v1.5"/><path d="M9 12.5l2 2 4-4"/>'),
    exam:svg('<path d="M2.5 9 12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11.2v4.3c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.3"/><path d="M21.5 9v5"/>'),
    book:svg('<path d="M4.5 5.5A1.5 1.5 0 0 1 6 4h4.5a1.5 1.5 0 0 1 1.5 1.5V20a1.5 1.5 0 0 0-1.5-1.5H4.5z"/><path d="M19.5 5.5A1.5 1.5 0 0 0 18 4h-4.5A1.5 1.5 0 0 0 12 5.5V20a1.5 1.5 0 0 1 1.5-1.5h6z"/>'),
    flag:svg('<path d="M6 21V4"/><path d="M6 4.5h11l-2 3.5 2 3.5H6"/>')
  };
  IC.doc=IC.doc;
  var FOLDER='<span class="closed">'+IC.folder+'</span><span class="open">'+IC.folderOpen+'</span>';
  document.getElementById('homeIco').innerHTML=IC.home;
  document.getElementById('labsIco').innerHTML=IC.stack;
  document.getElementById('labsChev').innerHTML=IC.chev;
  document.querySelectorAll('[data-ic]').forEach(function(e){e.innerHTML=IC[e.dataset.ic]||'';});
  var nav=document.getElementById('labNav'),grid=document.getElementById('labGrid')||document.createElement('div');
  LABS.forEach(function(l,i){
    var li=document.createElement('li');
    li.style.setProperty('--i',i);
    if(l.subs){
      var subId='sub-lab-'+l.n;
      li.innerHTML='<button class="nav-item folder" aria-expanded="false" aria-controls="'+subId+'" data-folder="'+l.n+'"><span class="lbl">Lab '+l.n+'</span><span class="pill">'+l.subs.length+'</span><span class="chev">'+IC.chev+'</span></button>'+
        '<div class="collapse sub" id="'+subId+'"><div class="collapse-inner"><ul>'+l.subs.map(function(s,j){return '<li style="--i:'+j+'"><a class="nav-item" href="'+s.id+'.html" data-view="'+s.id+'"><span class="ico">'+IC.doc+'</span><span class="lbl">'+s.label+'</span></a></li>';}).join('')+'</ul></div></div>';
      grid.insertAdjacentHTML('beforeend','<a class="labcard ready" href="'+l.subs[0].id+'.html"><b>Lab '+l.n+'</b><span>Pre-Lab + In-Lab ready</span></a>');
    }else{
      li.innerHTML='<a class="nav-item" href="lab-'+l.n+'.html" data-view="lab-'+l.n+'"><span class="lbl">Lab '+l.n+'</span><span class="soon">Soon</span></a>';
      grid.insertAdjacentHTML('beforeend','<a class="labcard" href="lab-'+l.n+'.html"><b>Lab '+l.n+'</b><span>Coming soon</span></a>');
    }
    nav.appendChild(li);
  });
  function setOpen(btn,open){
    btn.setAttribute('aria-expanded',String(open));
    var p=document.getElementById(btn.getAttribute('aria-controls'));
    p.classList.toggle('open',open);
    p.inert=!open;
  }
  document.querySelectorAll('.side [aria-controls]').forEach(function(b){
    setOpen(b,b.getAttribute('aria-expanded')==='true');
    b.addEventListener('click',function(){setOpen(b,b.getAttribute('aria-expanded')!=='true');});
  });
  var vbox=document.getElementById('videos');
  if(vbox)VIDEOS.forEach(function(g){
    var h='<div class="vid-group"><h3><span class="tag '+g.tag+'">'+g.group+'</span>'+(g.tag==='x'?'Spreadsheets':'Databases')+'</h3><div class="vids">';
    g.items.forEach(function(v){
      var direct=!!v.by;
      h+='<a class="vid" href="'+v.u+'" target="_blank" rel="noopener noreferrer"><span class="play'+(direct?'':' search')+'">'+(direct?PLAY:SEARCH)+'</span><span><b>'+v.t+'</b><small>'+v.d+'</small><em>'+(direct?'Video by '+v.by:'Search YouTube')+'</em></span></a>';
    });
    vbox.insertAdjacentHTML('beforeend',h+'</div></div>');
  });

  /* ---------- active page (sidebar opens instantly on load, animates only on click) ---------- */
  var root=document.documentElement;
  root.classList.add('no-anim');
  requestAnimationFrame(function(){requestAnimationFrame(function(){root.classList.remove('no-anim');});});
  var v=document.body.dataset.page;
  document.querySelectorAll('.side a').forEach(function(a){a.classList.toggle('active',a.dataset.view===v);});
  if(v.indexOf('lab-')===0)setOpen(document.getElementById('labsToggle'),true);
  document.getElementById('quizLink').classList.toggle('active',v.indexOf('practice-')===0);
  document.getElementById('resLink').classList.toggle('active',v==='resources');
  if(v.indexOf('exam-')===0)setOpen(document.getElementById('examToggle'),true);
  document.querySelectorAll('.side .folder').forEach(function(f){
    var has=v.indexOf('lab-'+f.dataset.folder+'-')===0;
    f.classList.toggle('has-active',has);
    if(has)setOpen(f,true);
  });
  document.querySelectorAll('.side .collapse.open').forEach(function(c){c.classList.add('instant');});
  document.querySelectorAll('.side [aria-controls]').forEach(function(b){
    b.addEventListener('click',function(){document.getElementById(b.getAttribute('aria-controls')).classList.remove('instant');});
  });

  /* ---------- mobile menu ---------- */
  var side=document.getElementById('side'),btn=document.getElementById('menuBtn'),scrim=document.getElementById('scrim');
  function closeMenu(){side.classList.remove('open');scrim.classList.remove('show');btn.setAttribute('aria-expanded','false');}
  btn.addEventListener('click',function(){var o=!side.classList.contains('open');side.classList.toggle('open',o);scrim.classList.toggle('show',o);btn.setAttribute('aria-expanded',String(o));});
  scrim.addEventListener('click',closeMenu);

  /* ---------- jump chips ---------- */
  document.querySelectorAll('.jump button,.rjump button').forEach(function(b){
    b.addEventListener('click',function(){var el=document.getElementById(b.dataset.go);if(el)el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
  });

  /* ---------- step checkmarks ---------- */
  var KEY='cse2111-hub-steps',done={};
  try{done=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){done={};}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(done));}catch(e){}}
  document.querySelectorAll('.page').forEach(function(pg){
    var name=pg.dataset.page;
    pg.querySelectorAll('li.step').forEach(function(li){
      var id=name+':'+li.dataset.id;
      var lab=document.createElement('label');lab.className='check';
      var cb=document.createElement('input');cb.type='checkbox';cb.checked=!!done[id];cb.setAttribute('aria-label','Mark step done');
      lab.appendChild(cb);lab.appendChild(document.createTextNode('Done'));
      li.insertBefore(lab,li.firstChild);
      if(done[id])li.classList.add('done');
      cb.addEventListener('change',function(){if(cb.checked)done[id]=1;else delete done[id];li.classList.toggle('done',cb.checked);save();update();});
    });
    var rb=pg.querySelector('.reset-btn');
    if(rb)rb.addEventListener('click',function(){
      pg.querySelectorAll('li.step').forEach(function(li){delete done[name+':'+li.dataset.id];li.classList.remove('done');li.querySelector('input').checked=false;});
      save();update();
    });
  });
  function update(){
    document.querySelectorAll('section.part').forEach(function(sec){
      var all=sec.querySelectorAll('li.step'),n=0;
      all.forEach(function(li){if(li.classList.contains('done'))n++;});
      sec.querySelector('.bar span').style.width=(all.length?Math.round(n/all.length*100):0)+'%';
    });
  }

  /* ---------- screenshot zoom ---------- */
  var dlg=document.getElementById('zoom'),dimg=dlg.querySelector('img');
  document.querySelectorAll('figure button').forEach(function(b){
    b.addEventListener('click',function(){var im=b.querySelector('img');dimg.src=im.src;dimg.alt=im.alt;if(dlg.showModal)dlg.showModal();});
  });
  dlg.addEventListener('click',function(){dlg.close();});

  update();
})();
