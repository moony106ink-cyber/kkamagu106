// 헤더 스크롤 시 배경
const nav=document.getElementById('nav');
if(nav){addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>12));}

// 스크롤 등장 애니메이션
const io=new IntersectionObserver((es)=>{
  es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
},{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Work 카테고리 필터 (work 페이지에서만 동작)
const tabs=document.querySelectorAll('.work-tab');
if(tabs.length){
  const cards=document.querySelectorAll('.work-card[data-cat]');
  tabs.forEach(t=>t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const f=t.dataset.filter;
    cards.forEach(c=>{c.hidden = !(f==='all' || c.dataset.cat===f);});
  }));
}

// 발주서 -> 메일 (inquiry 페이지에서만 동작)
const $=id=>document.getElementById(id);
const sendBtn=$('sendBtn');
if(sendBtn){
  const status=$('status');
  sendBtn.addEventListener('click',()=>{
    const name=$('f_name').value.trim();
    const contact=$('f_contact').value.trim();
    const agree=$('f_agree').value.trim();
    if(!name||!contact){status.className='order-status err';status.textContent='이름/회사명과 연락처는 꼭 입력해주세요.';return;}
    if(agree!=='동의'){status.className='order-status err';status.textContent="개인정보 수집 동의란에 '동의'라고 입력해주세요.";return;}
    const lines=[
      '■ 이름/회사명: '+name,
      '■ 연락처: '+contact,
      '■ 작업 종류: '+($('f_type').value.trim()||'-'),
      '■ 예산: '+($('f_budget').value.trim()||'-'),
      '■ 희망 마감일: '+($('f_due').value.trim()||'-'),
      '',
      '■ 내용:',
      ($('f_body').value.trim()||'-'),
      '',
      '■ 개인정보 수집 동의: 동의'
    ].join('\n');
    const subject='[까마귀106 발주서] '+name;
    location.href='mailto:kamagui106@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines);
    status.className='order-status ok';status.textContent='메일 앱을 열었습니다. 발송 버튼을 눌러 전송을 완료해주세요.';
  });
}
