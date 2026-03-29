import { useState, useEffect } from "react";

function FloatingHearts() {
  const items = ["🌸","💗","✨","🎀","💕","⭐","🌷","💖","🩷","🌺"];
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} style={{
          position:"absolute", bottom:-40,
          left: `${(i * 19 + 3) % 100}%`,
          fontSize: `${0.8 + (i % 3) * 0.35}rem`,
          opacity: 0.2,
          animation: `floatUp ${7 + (i % 5)}s linear ${(i * 0.6) % 5}s infinite`,
          userSelect:"none",
        }}>{items[i % items.length]}</span>
      ))}
    </div>
  );
}

const weekBlogs = {
  "Week 1": { emoji:"🌸", content:"This week I explored the basics of web design and started learning React! It was overwhelming at first but I'm getting the hang of it. Every bug I fixed felt like unlocking a new achievement! 💪✨" },
  "Week 2": { emoji:"🎨", content:"Deep dive into CSS and styling this week. I discovered the magic of flexbox and grid layouts. My pages are finally starting to look the way I imagined them in my head! 🎨" },
  "Week 3": { emoji:"💻", content:"This week was all about JavaScript fundamentals — functions, loops, arrays. It's like learning a new language but for computers. The logic is starting to click! 🧠💡" },
};

const photoWeeks = ["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6"];
const placeholderColors = ["#fce7f3","#fef3c7","#d1fae5","#dbeafe","#ede9fe","#fce7f3"];

export default function Blog() {
  const [blogOpen, setBlogOpen] = useState(null);
  const [activePhotoWeek, setActivePhotoWeek] = useState(0);
  const [photos, setPhotos] = useState(
    placeholderColors.map((c, i) => ({ id:i, color:c, src:null, label:`Photo ${i+1}` }))
  );

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotos(prev => [...prev, { id: Date.now(), src: url, color:"#fce7f3", label:`Photo ${prev.length+1}` }]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&family=Dancing+Script:wght@700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --pink:#f472b6;--pink-l:#fce7f3;--pink-m:#fbcfe8;
          --cream:#fffbeb;--mauve:#ede9fe;--text:#3d1a2e;--muted:#9d6e85;
        }
        html{scroll-behavior:smooth;}
        body{background:var(--pink-l);font-family:'DM Sans',sans-serif;color:var(--text);overflow-x:hidden;}

        /* NAV */
        nav{
          position:sticky;top:0;z-index:200;
          background:rgba(255,255,255,0.88);backdrop-filter:blur(18px);
          border-bottom:2px solid var(--pink-m);
          padding:0 48px;height:62px;
          display:flex;align-items:center;justify-content:space-between;
          box-shadow:0 4px 24px #f472b615;
          animation:slideDown .6s both;
        }
        .nav-logo{font-family:'Dancing Script',cursive;font-size:1.55rem;color:var(--pink);}
        .nav-links{display:flex;gap:4px;list-style:none;}
        .nav-links a{
          font-size:.72rem;font-weight:500;letter-spacing:2px;text-transform:uppercase;
          color:var(--muted);text-decoration:none;padding:8px 14px;border-radius:50px;
          transition:all .2s;
        }
        .nav-links a:hover{background:var(--pink-m);color:var(--pink);}

        /* HERO */
        .hero{
          position:relative;min-height:92vh;overflow:hidden;
          display:flex;align-items:center;
          background:linear-gradient(135deg,#fce7f3 0%,#fffbeb 50%,#ede9fe 100%);
          padding:80px 64px;
        }
        .hero-content{position:relative;z-index:2;max-width:580px;animation:fadeUp .9s .2s both;}
        .hero-pill{
          display:inline-flex;align-items:center;gap:6px;
          background:#fff;border:2px solid var(--pink-m);border-radius:50px;
          padding:6px 18px;font-size:.7rem;font-weight:500;letter-spacing:2px;
          text-transform:uppercase;color:var(--pink);margin-bottom:26px;
          box-shadow:0 4px 16px #f472b620;
        }
        .hero-name{
          font-family:'Playfair Display',serif;
          font-size:clamp(3rem,7vw,5.2rem);font-weight:900;line-height:1.0;
          letter-spacing:-2px;color:var(--text);
        }
        .hero-name em{font-style:italic;color:var(--pink);}
        .hero-sub{font-size:.82rem;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--muted);margin-top:10px;}
        .hero-desc{font-size:.97rem;color:var(--muted);line-height:1.75;margin-top:18px;max-width:420px;}
        .hero-btns{display:flex;gap:12px;margin-top:32px;flex-wrap:wrap;}

        .btn-main{
          background:var(--pink);color:#fff;border:none;border-radius:50px;
          padding:13px 32px;font-family:'DM Sans',sans-serif;
          font-size:.78rem;font-weight:500;letter-spacing:2px;text-transform:uppercase;
          cursor:pointer;box-shadow:0 8px 24px #f472b640;transition:transform .18s,box-shadow .18s;
        }
        .btn-main:hover{transform:translateY(-3px);box-shadow:0 14px 36px #f472b655;}
        .btn-ghost{
          background:#fff;color:var(--pink);border:2px solid var(--pink);border-radius:50px;
          padding:12px 28px;font-family:'DM Sans',sans-serif;
          font-size:.78rem;font-weight:500;letter-spacing:2px;text-transform:uppercase;
          cursor:pointer;transition:all .18s;
        }
        .btn-ghost:hover{background:var(--pink-m);}

        /* hero blobs */
        .blob1{
          position:absolute;right:40px;top:50%;transform:translateY(-50%);
          width:360px;height:360px;border-radius:60% 40% 70% 30%/50% 60% 40% 50%;
          background:linear-gradient(135deg,#f9a8d4,#c084fc);opacity:.18;
          animation:morph 8s ease-in-out infinite;z-index:1;
        }
        .blob2{
          position:absolute;right:130px;top:20%;
          width:200px;height:200px;border-radius:40% 60% 50% 50%/60% 40% 60% 40%;
          background:linear-gradient(135deg,#fde68a,#f9a8d4);opacity:.22;
          animation:morph 6s ease-in-out 2s infinite;z-index:1;
        }

        /* SECTIONS */
        .sec{padding:80px 64px;}
        .sec-label{
          display:inline-flex;align-items:center;gap:6px;
          font-size:.68rem;font-weight:500;letter-spacing:3px;text-transform:uppercase;
          color:var(--pink);background:var(--pink-l);border:1.5px solid var(--pink-m);
          border-radius:50px;padding:5px 16px;margin-bottom:14px;
        }
        .sec-title{
          font-family:'Playfair Display',serif;
          font-size:clamp(2rem,5vw,3rem);font-weight:900;
          color:var(--text);letter-spacing:-1px;line-height:1.1;
        }
        .sec-title span{color:var(--pink);font-style:italic;}

        /* ABOUT */
        #about{background:#fff;}
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center;max-width:1080px;margin:0 auto;}
        .about-blob-wrap{position:relative;display:flex;justify-content:center;}
        .about-blob{
          width:270px;height:270px;
          border-radius:60% 40% 55% 45%/50% 55% 45% 55%;
          background:linear-gradient(135deg,var(--pink-m),var(--mauve));
          display:flex;align-items:center;justify-content:center;
          animation:morph 10s ease-in-out infinite;
          box-shadow:0 20px 60px #f472b630;
          font-size:5rem;
        }
        .about-sticker{
          position:absolute;bottom:18px;left:50%;transform:translateX(-50%) rotate(-6deg);
          background:#fff;border:2.5px solid var(--text);border-radius:50px;
          padding:8px 22px;font-family:'Dancing Script',cursive;font-size:1.2rem;
          box-shadow:4px 4px 0 var(--pink-m);white-space:nowrap;
        }
        .about-text p{font-size:.96rem;color:var(--muted);line-height:1.8;margin-top:16px;}

        /* BLOG */
        #weekly-blog{background:linear-gradient(160deg,var(--pink-l),var(--cream));}
        .blog-grid{
          display:grid;grid-template-columns:repeat(3,1fr);
          gap:24px;max-width:1000px;margin:40px auto 0;
        }
        .blog-card{
          border-radius:24px;background:#fff;border:2px solid var(--pink-m);
          padding:32px 28px;cursor:pointer;
          transition:transform .22s,box-shadow .22s;
          position:relative;overflow:hidden;
          animation:fadeUp .6s both;
        }
        .blog-card::before{
          content:'';position:absolute;top:0;left:0;right:0;height:5px;
          background:linear-gradient(90deg,var(--pink),#c084fc);
          border-radius:24px 24px 0 0;
        }
        .blog-card:hover{transform:translateY(-8px) rotate(-1deg);box-shadow:0 20px 48px #f472b630;}
        .blog-emoji{font-size:2.2rem;margin-bottom:14px;display:block;}
        .blog-week{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--text);}
        .blog-preview{font-size:.84rem;color:var(--muted);margin-top:10px;line-height:1.6;
          display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
        .blog-cta{
          display:inline-block;margin-top:18px;font-size:.7rem;font-weight:500;
          letter-spacing:2px;text-transform:uppercase;color:var(--pink);
          background:var(--pink-l);border-radius:50px;padding:6px 16px;
          border:1.5px solid var(--pink-m);transition:all .18s;
        }
        .blog-card:hover .blog-cta{background:var(--pink);color:#fff;border-color:var(--pink);}

        /* MODAL */
        .overlay{
          position:fixed;inset:0;z-index:500;
          background:rgba(61,26,46,.5);backdrop-filter:blur(10px);
          display:flex;align-items:center;justify-content:center;
          animation:fadeIn .25s both;padding:20px;
        }
        .modal{
          background:#fff;border-radius:32px;padding:48px;max-width:520px;width:100%;
          border:2px solid var(--pink-m);box-shadow:0 32px 80px #f472b640;
          animation:popIn .3s both;position:relative;
        }
        .modal-x{
          position:absolute;top:18px;right:18px;
          background:var(--pink-l);border:none;border-radius:50%;
          width:36px;height:36px;font-size:1rem;
          cursor:pointer;color:var(--pink);transition:background .18s;
        }
        .modal-x:hover{background:var(--pink-m);}
        .modal-emoji{font-size:3rem;margin-bottom:12px;display:block;}
        .modal-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900;}
        .modal-body{font-size:1rem;color:var(--muted);line-height:1.8;margin-top:16px;}

        /* PHOTOS */
        #photos{background:var(--cream);}
        .photos-top{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:12px;max-width:1000px;margin:0 auto;}
        .upload-lbl{
          background:#fff;border:2px solid var(--pink);border-radius:50px;
          padding:10px 24px;font-size:.72rem;font-weight:500;letter-spacing:2px;
          text-transform:uppercase;color:var(--pink);cursor:pointer;
          transition:all .18s;display:flex;align-items:center;gap:6px;
        }
        .upload-lbl:hover{background:var(--pink);color:#fff;}
        .week-tabs{display:flex;gap:8px;max-width:1000px;margin:26px auto 22px;flex-wrap:wrap;align-items:center;}
        .w-tab{
          background:#fff;border:2px solid var(--pink-m);border-radius:50px;
          padding:8px 20px;font-size:.72rem;font-weight:500;letter-spacing:2px;
          text-transform:uppercase;color:var(--muted);cursor:pointer;transition:all .18s;
        }
        .w-tab.on{background:var(--pink);color:#fff;border-color:var(--pink);}
        .w-tab:hover:not(.on){border-color:var(--pink);color:var(--pink);}
        .nav-arrow{
          background:#fff;border:2px solid var(--pink-m);border-radius:50%;
          width:36px;height:36px;font-size:1.1rem;cursor:pointer;color:var(--pink);
          display:flex;align-items:center;justify-content:center;transition:all .18s;
        }
        .nav-arrow:hover{background:var(--pink);color:#fff;border-color:var(--pink);}
        .photo-grid{
          display:grid;grid-template-columns:repeat(3,1fr);
          gap:18px;max-width:1000px;margin:0 auto;
        }
        .photo-card{
          border-radius:20px;overflow:hidden;border:2px solid var(--pink-m);
          aspect-ratio:1;cursor:pointer;transition:transform .22s,box-shadow .22s;
        }
        .photo-card:hover{transform:scale(1.05) rotate(1.5deg);box-shadow:0 16px 40px #f472b630;}
        .photo-card img{width:100%;height:100%;object-fit:cover;display:block;}
        .photo-ph{
          width:100%;height:100%;display:flex;flex-direction:column;
          align-items:center;justify-content:center;gap:8px;font-size:2rem;
        }
        .photo-ph small{font-size:.68rem;letter-spacing:2px;text-transform:uppercase;color:#bbb;}

        /* VIDEOS */
        #videos{background:linear-gradient(160deg,var(--mauve) 0%,var(--pink-l) 100%);}
        .vid-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;max-width:1000px;margin:40px auto 0;}
        .vid-card{
          border-radius:20px;overflow:hidden;border:2px solid rgba(244,114,182,.3);
          background:#fff;box-shadow:0 8px 32px #f472b618;transition:transform .22s,box-shadow .22s;
        }
        .vid-card:hover{transform:translateY(-6px);box-shadow:0 20px 48px #f472b635;}
        .vid-card video{width:100%;display:block;}
        .vid-label{font-size:.72rem;font-weight:500;letter-spacing:2px;text-transform:uppercase;
          color:var(--muted);text-align:center;padding:12px 0;}

        /* FOOTER */
        footer{
          background:var(--text);color:var(--pink-m);
          padding:40px 64px;
          display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;
        }
        .f-logo{font-family:'Dancing Script',cursive;font-size:1.55rem;color:var(--pink);}
        .f-links{display:flex;gap:24px;list-style:none;flex-wrap:wrap;}
        .f-links a{font-size:.68rem;letter-spacing:2px;text-transform:uppercase;color:#6b3d54;text-decoration:none;transition:color .18s;}
        .f-links a:hover{color:var(--pink);}
        .f-copy{font-size:.68rem;color:#6b3d54;letter-spacing:1px;}

        /* SPARKLES */
        .spk{position:absolute;color:var(--pink);pointer-events:none;animation:twinkle 2s ease-in-out infinite;}

        /* ANIMATIONS */
        @keyframes slideDown{from{opacity:0;transform:translateY(-24px);}to{opacity:1;transform:none;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:none;}}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes popIn{from{opacity:0;transform:scale(.88);}to{opacity:1;transform:scale(1);}}
        @keyframes morph{
          0%,100%{border-radius:60% 40% 55% 45%/50% 55% 45% 55%;}
          33%{border-radius:40% 60% 45% 55%/60% 40% 55% 45%;}
          66%{border-radius:55% 45% 60% 40%/45% 60% 40% 55%;}
        }
        @keyframes floatUp{
          0%{transform:translateY(0) rotate(0deg);opacity:.2;}
          80%{opacity:.2;}
          100%{transform:translateY(-110vh) rotate(360deg);opacity:0;}
        }
        @keyframes twinkle{
          0%,100%{opacity:1;transform:scale(1) rotate(0);}
          50%{opacity:.4;transform:scale(1.5) rotate(20deg);}
        }

        @media(max-width:768px){
          .about-grid{grid-template-columns:1fr;}
          .blog-grid,.vid-grid,.photo-grid{grid-template-columns:1fr 1fr;}
          .hero,.sec{padding:60px 24px;}
          footer{padding:32px 24px;}
          .nav-links{display:none;}
        }
        @media(max-width:500px){
          .blog-grid,.photo-grid,.vid-grid{grid-template-columns:1fr;}
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">Lainey's Portfolio 🌸</div>
        <ul className="nav-links">
          {[["home","Home"],["about","About Me"],["weekly-blog","Weekly Blog"],["photos","Photos"],["videos","Videos"]].map(([id,label])=>(
            <li key={id}><a href={`#${id}`} onClick={e=>{e.preventDefault();scrollTo(id);}}>{label}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <FloatingHearts />
        <span className="spk" style={{top:"14%",right:"38%",fontSize:"1.8rem"}}>✦</span>
        <span className="spk" style={{top:"72%",right:"54%",fontSize:"1rem",animationDelay:"1s"}}>✦</span>
        <span className="spk" style={{top:"28%",right:"22%",animationDelay:"0.5s",fontSize:"1.3rem"}}>✦</span>
        <div className="blob1"/>
        <div className="blob2"/>
        <div className="hero-content">
          <div className="hero-pill">✦ BSIT 4C Student</div>
          <h1 className="hero-name">Elaine Mae<br /><em>A. Bertiz</em></h1>
          <p className="hero-sub">Lainey's Portfolio ✨</p>
          <p className="hero-desc">A creative space where I document my journey through technology, design, and everything in between. 💗</p>
          <div className="hero-btns">
            <button className="btn-main" onClick={()=>scrollTo("about")}>Meet Lainey 🌷</button>
            <button className="btn-ghost" onClick={()=>scrollTo("weekly-blog")}>Read Blog →</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="sec">
        <div className="about-grid">
          <div className="about-blob-wrap">
            <div className="about-blob">🌸</div>
            <div className="about-sticker">Hey there! 💕</div>
          </div>
          <div>
            <div className="sec-label">✦ About Me</div>
            <h2 className="sec-title">I'm <span>Lainey!</span></h2>
            <p className="about-text" style={{marginTop:0}}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet arcu sit amet leo porta, id placerat ex interdum. Fusce fermentum ornare lectus, ut dictum turpis convallis vitae.</p>
              <p style={{marginTop:14}}>Nunc semper vitae nibh sit amet dignissim. Nunc lorem nunc, placerat et augue ac, elementum mollis turpis. Ut sit amet tempus ante. Suspendisse tempus augue eget iaculis posuere. In hac habitasse platea dictumst. Duis sollicitudin erat ac urna maximus fermentum.</p>
            </p>
            <button className="btn-main" style={{marginTop:28}} onClick={()=>scrollTo("weekly-blog")}>Read my blog 📖</button>
          </div>
        </div>
      </section>

      {/* WEEKLY BLOG */}
      <section id="weekly-blog" className="sec">
        <div style={{textAlign:"center"}}>
          <div className="sec-label" style={{margin:"0 auto 14px"}}>✦ Updates</div>
          <h2 className="sec-title">Weekly <span>Blog</span></h2>
          <p style={{color:"var(--muted)",marginTop:10,fontSize:".9rem"}}>Click a card to read more 💌</p>
        </div>
        <div className="blog-grid">
          {Object.entries(weekBlogs).map(([week,data],i)=>(
            <div key={week} className="blog-card" style={{animationDelay:`${i*.12}s`}} onClick={()=>setBlogOpen(week)}>
              <span className="blog-emoji">{data.emoji}</span>
              <div className="blog-week">{week}</div>
              <p className="blog-preview">{data.content}</p>
              <span className="blog-cta">Read more →</span>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG MODAL */}
      {blogOpen && (
        <div className="overlay" onClick={()=>setBlogOpen(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <button className="modal-x" onClick={()=>setBlogOpen(null)}>✕</button>
            <span className="modal-emoji">{weekBlogs[blogOpen].emoji}</span>
            <div className="modal-title">{blogOpen}</div>
            <p className="modal-body">{weekBlogs[blogOpen].content}</p>
          </div>
        </div>
      )}

      {/* PHOTOS */}
      <section id="photos" className="sec">
        <div className="photos-top">
          <div>
            <div className="sec-label">✦ Gallery</div>
            <h2 className="sec-title">Photos <span>✨</span></h2>
          </div>
          <label className="upload-lbl" htmlFor="photo-upload">
            📷 Upload Image
            <input id="photo-upload" type="file" accept="image/*" style={{display:"none"}} onChange={handleUpload}/>
          </label>
        </div>
        <div className="week-tabs">
          <button className="nav-arrow" onClick={()=>setActivePhotoWeek(p=>Math.max(0,p-1))}>‹</button>
          {photoWeeks.map((w,i)=>(
            <button key={w} className={`w-tab${activePhotoWeek===i?" on":""}`} onClick={()=>setActivePhotoWeek(i)}>{w}</button>
          ))}
          <button className="nav-arrow" onClick={()=>setActivePhotoWeek(p=>Math.min(photoWeeks.length-1,p+1))}>›</button>
        </div>
        <div className="photo-grid">
          {photos.slice(0,6).map((p,i)=>(
            <div key={p.id} className="photo-card" style={{animationDelay:`${i*.08}s`}}>
              {p.src
                ? <img src={p.src} alt={p.label}/>
                : <div className="photo-ph" style={{background:p.color}}>
                    <span>🌸</span><small>{p.label}</small>
                  </div>
              }
            </div>
          ))}
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="sec">
        <div style={{textAlign:"center"}}>
          <div className="sec-label" style={{margin:"0 auto 14px"}}>✦ Watch</div>
          <h2 className="sec-title">Random <span>Videos</span></h2>
        </div>
        <div className="vid-grid">
          {[
            {id:1,src:"https://www.w3schools.com/html/mov_bbb.mp4",label:"Video 1 🎬"},
            {id:2,src:"https://www.w3schools.com/html/movie.mp4",label:"Video 2 🎥"},
            {id:3,src:"https://www.w3schools.com/html/mov_bbb.mp4",label:"Video 3 🌟"},
          ].map(v=>(
            <div key={v.id} className="vid-card">
              <video controls><source src={v.src} type="video/mp4"/></video>
              <div className="vid-label">{v.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="f-logo">Lainey's Portfolio 🌸</span>
        <ul className="f-links">
          {[["home","Home"],["about","About Me"],["weekly-blog","Weekly Blog"],["photos","Photos"],["videos","Videos"]].map(([id,label])=>(
            <li key={id}><a href={`#${id}`} onClick={e=>{e.preventDefault();scrollTo(id);}}>{label}</a></li>
          ))}
        </ul>
        <span className="f-copy">© 2025 Elaine Mae A. Bertiz · BSIT 4C 💗</span>
      </footer>
    </>
  );
}