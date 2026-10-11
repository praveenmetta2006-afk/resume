import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

/* ================= DATA (unchanged) ================= */

const profile = {
  name: "Metta Praveen Kumar",
  role: "Full Stack + AI Developer",
  college: "Lendi Institute of Engineering and Technology",
  branch: "Computer Science Engineering",
  year: "3rd Year",
  cgpa: "9.19",
  graduation: "2028",
  location: "Vizag, Andhra Pradesh",
  email: "praveenmetta2006@gmail.com",
  phone: "8374131583",
  github: "https://github.com/praveenmetta2006-afk",
  linkedin: "https://www.linkedin.com/in/metta-praveen-kumar-a0955834a/"
};

const skills = {
  "Programming": ["C", "C++", "Java", "Python"],
  "Web Development": ["HTML", "CSS", "JavaScript", "React"],
  "Database": ["MySQL", "MongoDB"],
  "Tools": ["Git", "GitHub", "VS Code"]
};

const projects = [
  {
    number: "01",
    title: "AgentGuard",
    subtitle: "AI Agent Verification & Error Detection",
    tags: ["React", "Ollama", "LLM", "Node.js"],
    text:
      "A web dashboard for monitoring multi-step AI agent workflows and identifying errors in tool usage and execution. Worked on the frontend dashboard and Ollama/local LLM integration to connect the application with the AI workflow."
  },
  {
    number: "02",
    title: "Fake Interview Detection System",
    subtitle: "AI + Computer Vision",
    tags: ["Python", "AI", "Computer Vision"],
    text:
      "An AI-based interview monitoring system integrating face detection, multiple-face detection, face recognition, continuous identity verification, eye tracking, head pose estimation, gaze analysis, and voice detection. The system flags suspicious behavior such as extra faces, off-screen gaze, and unexpected voices."
  },
  {
    number: "03",
    title: "Quiz Application",
    subtitle: "Java Application",
    tags: ["Java", "Quiz", "Scoring"],
    text:
      "A Java-based quiz application with question handling, answer validation, user interaction, and automated scoring, designed to reduce manual evaluation and provide a simple user-friendly experience."
  },
  {
    number: "04",
    title: "Agri Talk Application",
    subtitle: "Agriculture Software Project",
    tags: ["Agriculture", "Software", "Team Project"],
    text:
      "An agriculture-focused application designed to provide useful farming information and support for a real-world community need. Contributed to planning, development, testing, and feature improvement."
  }
];

const education = [
  {
    period: "2028 — Expected",
    title: "B.Tech — Computer Science Engineering",
    place: "Lendi Institute of Engineering and Technology",
    detail: "Currently in 3rd year • CGPA: 9.19"
  },
  {
    period: "Higher Secondary",
    title: "Intermediate",
    place: "Narayana Junior College",
    detail: "93%"
  },
  {
    period: "Secondary School",
    title: "10th Standard",
    place: "Sri Shanti Niketan High School",
    detail: "91%"
  }
];

const certifications = [
  {
    title: "Neural Networks for Computer Vision and Natural Language Processing",
    provider: "NPTEL",
    period: "Jan–Apr 2026",
    score: "79/100",
    meta: "12-week course"
  },
  {
    title: "Introduction to Industry 4.0 and Industrial Internet of Things",
    provider: "NPTEL",
    period: "Jul–Oct 2025",
    score: "76/100",
    meta: "12-week course"
  },
  {
    title: "Yoga and Positive Psychology for Managing Career and Life",
    provider: "NPTEL",
    period: "Aug–Oct 2024",
    score: "48/100",
    meta: "8-week course"
  },
  {
    title: "EduSkills Virtual Internships",
    provider: "EduSkills",
    period: "Completed",
    score: "",
    meta: "Virtual internship experience"
  }
];

const roles = [
  "Full Stack Developer",
  "AI / LLM Builder",
  "Computer Vision Explorer",
  "Problem Solver"
];

const tickerItems = [
  ...Object.values(skills).flat(),
  "Full Stack", "AI", "LLM", "Computer Vision"
];

/* ================= HELPERS / HOOKS ================= */

/* Typewriter: types, pauses, deletes, loops. The blinking cursor is CSS. */
function useTypewriter(words) {
  const [text, setText] = useState("");
  useEffect(() => {
    let w = 0, c = 0, deleting = false, t;
    const tick = () => {
      const word = words[w];
      if (!deleting) {
        c++;
        setText(word.slice(0, c));
        if (c === word.length) { deleting = true; t = setTimeout(tick, 1600); return; }
        t = setTimeout(tick, 80);
      } else {
        c--;
        setText(word.slice(0, c));
        if (c === 0) { deleting = false; w = (w + 1) % words.length; t = setTimeout(tick, 350); return; }
        t = setTimeout(tick, 40);
      }
    };
    t = setTimeout(tick, 700);
    return () => clearTimeout(t);
  }, []);
  return text;
}

/* Number counts up when it scrolls into view */
function Count({ to, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

/* Splits text into letters so each one can jump on hover */
function Letters({ text }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span className="ltr" style={{ "--i": i }} key={i}>{ch === " " ? "\u00A0" : ch}</span>
      ))}
    </>
  );
}

/* 3D tilt + moving spotlight (mouse and touch) */
function Tilt({ children, className = "", max = 10, ...rest }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const leave = () => {
    const el = ref.current;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={move}
      onPointerLeave={leave}
      onPointerUp={leave}
      {...rest}
    >
      {children}
    </div>
  );
}

/* Button gets pulled slightly toward the pointer */
function Magnetic({ children }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.28;
    const y = (e.clientY - r.top - r.height / 2) * 0.38;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const leave = () => { ref.current.style.transform = ""; };
  return (
    <span className="magnetic" ref={ref} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </span>
  );
}

/* Click ripple */
function ripple(e) {
  const b = e.currentTarget;
  const r = b.getBoundingClientRect();
  const s = Math.max(r.width, r.height) * 2;
  const sp = document.createElement("span");
  sp.className = "ripple";
  sp.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  b.appendChild(sp);
  setTimeout(() => sp.remove(), 700);
}

/* Custom cursor: small dot + trailing ring that grows over clickable things */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let x = 0, y = 0, rx = 0, ry = 0, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      dot.current.style.opacity = 1;
      ring.current.style.opacity = 1;
      dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      const hot = e.target.closest?.("a, button, .project-card, .skill-list span, .credential, .contact-card");
      ring.current.classList.toggle("hot", !!hot);
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    loop();
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div className="cursor-dot" ref={dot}></div>
      <div className="cursor-ring" ref={ring}></div>
    </>
  );
}

/* Thin progress bar at the top of the page */
function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="progress" ref={bar}></div>;
}

/* Floating dots that connect to each other and react to the pointer */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = ref.current;
    const ctx = c.getContext("2d");
    let w = 0, h = 0, nodes = [], raf, visible = true;
    const m = { x: -999, y: -999 };

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(80, Math.floor((w * h) / 17000));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.6
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of nodes) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy);
        if (d < 110 && d > 0) { p.x += (dx / d) * 1.2; p.y += (dy / d) * 1.2; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(17,17,17,.45)";
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(17,17,17,${(1 - d / 130) * 0.18})`;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
        const dm = Math.hypot(nodes[i].x - m.x, nodes[i].y - m.y);
        if (dm < 170) {
          ctx.strokeStyle = `rgba(17,17,17,${(1 - dm / 170) * 0.45})`;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(m.x, m.y); ctx.stroke();
        }
      }
    };

    const loop = () => { if (visible) draw(); raf = requestAnimationFrame(loop); };
    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      m.x = e.clientX - r.left; m.y = e.clientY - r.top;
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(c);
    init();
    loop();
    window.addEventListener("resize", init);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("resize", init);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <canvas className="particles" ref={ref}></canvas>;
}

/* ================= APP ================= */

function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typed = useTypewriter(roles);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  /* active nav section (same as before) */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* scroll reveal: anything with class "reveal" gets class "in" when visible */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* header gets a shadow after scrolling */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app">
      <Cursor />
      <ScrollProgress />

      <header className={scrolled ? "nav-shell scrolled" : "nav-shell"}>
        <div className="nav">
          <button className="brand" onClick={() => goTo("home")} aria-label="Go to home">
            MPK<span>.</span>
          </button>

          <button
            className={menuOpen ? "menu-btn open" : "menu-btn"}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span><span></span><span></span>
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {["home", "about", "skills", "projects", "education", "contact"].map((item) => (
              <button
                key={item}
                className={active === item ? "active" : ""}
                onClick={() => goTo(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          <a className="nav-contact" href={`mailto:${profile.email}`}>Let's Talk <b>↗</b></a>
        </div>
      </header>

      <main>
        {/* ---------- HERO ---------- */}
        <section id="home" className="hero section">
          <Particles />

          <div className="hero-copy">
            <p className="eyebrow hero-in" style={{ "--i": 0 }}>FULL STACK + AI DEVELOPER</p>
            <h1>
              <span className="hl"><span style={{ "--i": 1 }}>Building digital</span></span>
              <span className="hl"><span style={{ "--i": 2 }}>experiences with</span></span>
              <span className="hl wave">
                <span style={{ "--i": 3 }}><Letters text="code & intelligence." /></span>
              </span>
            </h1>

            <p className="typed-line hero-in" style={{ "--i": 4 }}>
              I am a <b>{typed}</b><i className="caret"></i>
            </p>

            <p className="hero-text hero-in" style={{ "--i": 5 }}>
              Computer Science Engineering student focused on full-stack development,
              AI applications, and practical software solutions.
            </p>
            <div className="hero-actions hero-in" style={{ "--i": 6 }}>
              <Magnetic>
                <button className="primary-btn" onClick={(e) => { ripple(e); goTo("projects"); }}>View My Work ↗</button>
              </Magnetic>
              <Magnetic>
                <button className="secondary-btn" onClick={(e) => { ripple(e); goTo("contact"); }}>Contact Me</button>
              </Magnetic>
            </div>
            <div className="hero-meta hero-in" style={{ "--i": 7 }}>
              <span>📍 {profile.location}</span>
              <span>🎓 {profile.graduation}</span>
              <span>CGPA {profile.cgpa}</span>
            </div>
          </div>

          <div className="hero-visual reveal zoom">
            <Tilt className="portrait-card" max={14}>
              <div className="portrait">
                <div className="portrait-glow"></div>
                <div className="scan"></div>
                <div className="orbit o1"><i></i></div>
                <div className="orbit o2"><i></i></div>
                <div className="avatar">MPK</div>
                <div className="portrait-label">
                  <span>METTA</span>
                  <strong>PRAVEEN KUMAR</strong>
                </div>
              </div>
              <div className="vertical-text">CREATIVE • DEVELOPER • BUILDER</div>
            </Tilt>
            <div className="floating-code">&lt;/&gt;</div>
          </div>
        </section>

        {/* ---------- SKILL TICKER ---------- */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i}>{item}<em>✦</em></span>
            ))}
          </div>
        </div>

        {/* ---------- ABOUT ---------- */}
        <section id="about" className="section">
          <SectionTitle number="01" title="About Me" />
          <div className="about-grid">
            <div className="about-lead reveal left">
              <p>
                I’m <strong>Metta Praveen Kumar</strong>, a Computer Science Engineering
                student at <strong>Lendi Institute of Engineering and Technology</strong>,
                currently pursuing my B.Tech with a <strong>9.19 CGPA</strong>.
              </p>
            </div>
            <div className="about-body reveal right">
              <p>
                I’m passionate about Full Stack Development and Artificial Intelligence,
                with hands-on experience building web applications and AI-based projects.
                I enjoy turning ideas into practical applications and solving real-world
                problems through technology.
              </p>
              <p>
                My current career direction is <strong>Full Stack + AI Development</strong>.
                I’m especially interested in modern web applications, AI/LLM integration,
                and building practical software products.
              </p>
              <div className="about-facts">
                {[
                  ["EDUCATION", "B.Tech CSE"],
                  ["COLLEGE", "Lendi Institute of Engineering and Technology"],
                  ["STATUS", "3rd Year Student"],
                  ["GRADUATION", "2028"]
                ].map(([k, v], i) => (
                  <div className="fact reveal" style={{ "--d": `${0.15 * i}s` }} key={k}>
                    <small>{k}</small><span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="stats">
            <div className="stat reveal zoom" style={{ "--d": "0s" }}>
              <strong><Count to={9.19} decimals={2} /></strong><small>CGPA</small>
            </div>
            <div className="stat reveal zoom" style={{ "--d": ".12s" }}>
              <strong><Count to={projects.length} />+</strong><small>Projects</small>
            </div>
            <div className="stat reveal zoom" style={{ "--d": ".24s" }}>
              <strong><Count to={certifications.length} /></strong><small>Certifications</small>
            </div>
            <div className="stat reveal zoom" style={{ "--d": ".36s" }}>
              <strong><Count to={3} suffix="rd" /></strong><small>Year of study</small>
            </div>
          </div>
        </section>

        {/* ---------- SKILLS ---------- */}
        <section id="skills" className="section section-dark">
          <SectionTitle number="02" title="Skills" light />
          <div className="skills-grid">
            {Object.entries(skills).map(([group, items], i) => (
              <div className="skill-group reveal" style={{ "--d": `${i * 0.12}s` }} key={group}>
                <span className="skill-index">0{i + 1}</span>
                <h3>{group}</h3>
                <div className="skill-list">
                  {items.map((skill, j) => (
                    <span key={skill} style={{ "--i": j }}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- PROJECTS ---------- */}
        <section id="projects" className="section">
          <SectionTitle number="03" title="Selected Projects" />
          <div className="projects">
            {projects.map((project, i) => (
              <div className="project-slot reveal" style={{ "--d": `${(i % 2) * 0.12}s` }} key={project.number}>
                <Tilt className="project-card" max={7} tabIndex={0}>
                  <div className="project-top">
                    <span className="p-num">{project.number}</span>
                    <span className="p-arrow">↗</span>
                  </div>
                  <div className="project-content">
                    <p className="project-subtitle">{project.subtitle}</p>
                    <h3><b>{project.title}</b></h3>
                    <p>{project.text}</p>
                    <div className="tags">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </Tilt>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- EDUCATION ---------- */}
        <section id="education" className="section section-soft">
          <SectionTitle number="04" title="Education & Credentials" />
          <div className="education-grid">
            <div className="timeline reveal">
              {education.map((item, i) => (
                <div className="timeline-item reveal left" style={{ "--d": `${0.2 + i * 0.2}s` }} key={item.title}>
                  <div className="timeline-dot"></div>
                  <span className="period">{item.period}</span>
                  <h3>{item.title}</h3>
                  <p>{item.place}</p>
                  <small>{item.detail}</small>
                </div>
              ))}
            </div>

            <div className="credentials">
              <div className="credential-heading reveal">
                <span>01</span>
                <h3>Certifications</h3>
              </div>
              {certifications.map((cert, i) => (
                <div className="credential reveal right" style={{ "--d": `${i * 0.1}s` }} key={cert.title}>
                  <div>
                    <small>{cert.provider} • {cert.period}</small>
                    <h4>{cert.title}</h4>
                    <p>{cert.meta}{cert.score ? ` • Score ${cert.score}` : ""}</p>
                  </div>
                  <span className="arrow">↗</span>
                </div>
              ))}
              <div className="credential achievement reveal right" style={{ "--d": ".4s" }}>
                <div>
                  <small>ACHIEVEMENT</small>
                  <h4>LNIT Hackathon</h4>
                  <p>Participant</p>
                </div>
                <span className="arrow star">★</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section id="contact" className="section contact-section">
          <div className="blob b1"></div>
          <div className="blob b2"></div>
          <div className="contact-wrap">
            <p className="eyebrow reveal">05 — GET IN TOUCH</p>
            <h2 className="reveal">Have an idea?<br /><span>Let’s build it.<i className="caret"></i></span></h2>
            <p className="contact-intro reveal">
              I’m open to learning opportunities, collaborations, internships,
              and interesting software projects.
            </p>

            <div className="contact-grid">
              <a href={`mailto:${profile.email}`} className="contact-card reveal" style={{ "--d": "0s" }}>
                <small>EMAIL</small>
                <strong>{profile.email}</strong>
                <span>↗</span>
              </a>
              <a href={`tel:+91${profile.phone}`} className="contact-card reveal" style={{ "--d": ".1s" }}>
                <small>PHONE</small>
                <strong>+91 {profile.phone}</strong>
                <span>↗</span>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="contact-card reveal" style={{ "--d": ".2s" }}>
                <small>GITHUB</small>
                <strong>praveenmetta2006-afk</strong>
                <span>↗</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-card reveal" style={{ "--d": ".3s" }}>
                <small>LINKEDIN</small>
                <strong>Metta Praveen Kumar</strong>
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>© {new Date().getFullYear()} Metta Praveen Kumar</div>
        <div>FULL STACK + AI DEVELOPER</div>
        <button onClick={() => goTo("home")}>Back to top ↑</button>
      </footer>
    </div>
  );
}

function SectionTitle({ number, title, light = false }) {
  return (
    <div className={light ? "section-title light reveal" : "section-title reveal"}>
      <span>{number}</span>
      <h2>{title}</h2>
      <div></div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
