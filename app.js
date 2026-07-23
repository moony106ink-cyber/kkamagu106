// 헤더 스크롤 시 배경
const nav=document.getElementById('nav');
if(nav){addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>12));}

// 스크롤 등장 애니메이션 (서브페이지 요소들: 1회)
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

// 발주서 -> Formspree 전송 (메일앱 없이 바로 발송, inquiry 페이지에서만)
const form=document.getElementById('orderForm');
const sendBtn=document.getElementById('sendBtn');
if(form && sendBtn){
  const $=id=>document.getElementById(id);
  const status=$('status');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name=$('f_name').value.trim();
    const contact=$('f_contact').value.trim();
    const agree=$('f_agree').value.trim();
    if(!name||!contact){status.className='order-status err';status.textContent='이름/회사명과 연락처는 꼭 입력해주세요.';return;}
    if(agree!=='동의'){status.className='order-status err';status.textContent="개인정보 수집 동의란에 '동의'라고 입력해주세요.";return;}
    status.className='order-status';status.textContent='보내는 중...';
    sendBtn.disabled=true;
    try{
      const res=await fetch(form.action,{
        method:'POST',
        headers:{'Accept':'application/json'},
        body:new FormData(form)
      });
      if(res.ok){
        form.reset();
        status.className='order-status ok';status.textContent='문의가 전송되었습니다. 검토 후 회신드리겠습니다. 감사합니다.';
      }else{
        status.className='order-status err';status.textContent='전송에 실패했습니다. 잠시 후 다시 시도하거나 kamagui106@gmail.com 으로 보내주세요.';
      }
    }catch(err){
      status.className='order-status err';status.textContent='전송 중 오류가 발생했습니다. kamagui106@gmail.com 으로 보내주세요.';
    }finally{
      sendBtn.disabled=false;
    }
  });
}
