import { useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import './App.css'

const IMAGES = {
  hero:
    'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=2400&q=80',
  roofing:
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80',
  renovations:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  craft:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
}

const fadeUp = (reduceMotion) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
  },
})

const stagger = (reduceMotion) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduceMotion ? 0 : 0.12,
      delayChildren: reduceMotion ? 0 : 0.15,
    },
  },
})

function BirdMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 4.5 26 16h-5v8H11v-8H6L16 4.5Zm-7.5 21.5L16 20l7.5 6H20l-4-3.2L12 26H8.5Z"
      />
    </svg>
  )
}

function Header() {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <a href="#top" className="header__mark">
          <BirdMark className="header__bird" />
          <span className="header__name">Thunderbird</span>
        </a>
        <nav className="header__nav" aria-label="Primary">
          <a href="#services">Services</a>
          <a href="#craft">Our craft</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header__phone" href="tel:+15550188400">
          (555) 018-8400
        </a>
      </div>
    </header>
  )
}

function Hero({ reduceMotion }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 120])
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.08, 1])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__media" aria-hidden="true">
        <motion.img
          src={IMAGES.hero}
          alt=""
          style={{ y, scale }}
          initial={reduceMotion ? false : { scale: 1.16 }}
          animate={reduceMotion ? undefined : { scale: 1.08 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="hero__shade" />
      <motion.div
        className="hero__content"
        variants={stagger(reduceMotion)}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero__brand" variants={fadeUp(reduceMotion)}>
          <div className="hero__brand-name">Thunderbird</div>
          <span className="hero__brand-line">Roofing &amp; Renovations</span>
        </motion.div>
        <motion.h1 className="hero__headline" variants={fadeUp(reduceMotion)}>
          Built to weather every season.
        </motion.h1>
        <motion.p className="hero__lede" variants={fadeUp(reduceMotion)}>
          Durable roofs and thoughtful renovations that protect your home and elevate how it
          lives.
        </motion.p>
        <motion.div className="hero__actions" variants={fadeUp(reduceMotion)}>
          <a className="btn btn--primary" href="#contact">
            Request an estimate
          </a>
          <a className="btn btn--ghost" href="tel:+15550188400">
            Call (555) 018-8400
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Reveal({ children, className, reduceMotion }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp(reduceMotion)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

function Services({ reduceMotion }) {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <Reveal reduceMotion={reduceMotion}>
          <p className="section__eyebrow">What we do</p>
          <h2 className="section__title">Roofing and renovations under one roof.</h2>
          <p className="section__lede">
            From storm-ready roof systems to interior and exterior refreshes, we bring clear
            communication and craftsmanship you can count on.
          </p>
        </Reveal>

        <div className="services__grid">
          <Reveal className="service" reduceMotion={reduceMotion}>
            <div className="service__visual">
              <img
                src={IMAGES.roofing}
                alt="Roofing crew installing shingles on a residential home"
                loading="lazy"
              />
            </div>
            <div className="service__body">
              <h3>Roofing</h3>
              <p>
                Repair, replacement, and inspections built for lasting protection—installed with
                care and finished clean.
              </p>
              <ul className="service__list">
                <li>Roof repair &amp; leak resolution</li>
                <li>Full roof replacement</li>
                <li>Storm damage assessments</li>
                <li>Shingle, metal &amp; flat systems</li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="service service--flip" reduceMotion={reduceMotion}>
            <div className="service__visual">
              <img
                src={IMAGES.renovations}
                alt="Renovated modern home exterior with clean lines and warm materials"
                loading="lazy"
              />
            </div>
            <div className="service__body">
              <h3>Renovations</h3>
              <p>
                Thoughtful updates that improve how your home looks, works, and feels—without the
                chaos of unclear timelines.
              </p>
              <ul className="service__list">
                <li>Kitchen &amp; bath remodeling</li>
                <li>Exterior refreshes</li>
                <li>Siding, trim &amp; entryways</li>
                <li>Interior finish upgrades</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Craft({ reduceMotion }) {
  return (
    <section className="section craft" id="craft">
      <div className="wrap craft__layout">
        <Reveal className="craft__copy" reduceMotion={reduceMotion}>
          <p className="section__eyebrow">Our craft</p>
          <h2 className="section__title">Honest work. Clean finishes. Homes that hold up.</h2>
          <p className="section__lede">
            Thunderbird was built on a simple standard: show up prepared, explain the options,
            and leave every project stronger than we found it.
          </p>
          <div className="craft__points">
            <div>
              <h3>Straight answers</h3>
              <p>
                Clear scopes, realistic timelines, and recommendations that put your home first—not
                the upsell.
              </p>
            </div>
            <div>
              <h3>Weather-ready builds</h3>
              <p>
                Materials and detailing chosen for durability, drainage, and the climate your roof
                actually faces.
              </p>
            </div>
            <div>
              <h3>Respect for your space</h3>
              <p>
                Job sites kept orderly, neighbors considered, and walkthroughs that make sure the
                finish matches the plan.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal className="craft__visual" reduceMotion={reduceMotion}>
          <img
            src={IMAGES.craft}
            alt="Detailed architectural structure showing quality construction craftsmanship"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  )
}

function Process({ reduceMotion }) {
  const steps = [
    {
      title: 'Inspect & listen',
      text: 'We walk the property, document conditions, and hear what you need from the project.',
    },
    {
      title: 'Plan the work',
      text: 'You get a clear proposal with options, materials, and a schedule you can plan around.',
    },
    {
      title: 'Build & stand behind it',
      text: 'Our crews execute with care, then walk the finish with you before we call it done.',
    },
  ]

  return (
    <section className="section process" id="process">
      <div className="wrap">
        <Reveal reduceMotion={reduceMotion}>
          <p className="section__eyebrow">How we work</p>
          <h2 className="section__title">A process built for clarity.</h2>
          <p className="section__lede">
            No jargon, no pressure—just a steady path from first look to final walkthrough.
          </p>
        </Reveal>
        <motion.ol
          className="process__steps"
          variants={stagger(reduceMotion)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step) => (
            <motion.li
              key={step.title}
              className="process__step"
              variants={fadeUp(reduceMotion)}
            >
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

function Contact({ reduceMotion }) {
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    setStatus(
      `Thanks${name ? `, ${name}` : ''}. We’ll be in touch shortly to schedule your estimate.`,
    )
    form.reset()
  }

  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <Reveal className="contact__panel" reduceMotion={reduceMotion}>
          <div className="contact__copy">
            <p className="section__eyebrow">Get started</p>
            <h2 className="section__title">Request your free estimate.</h2>
            <p className="section__lede">
              Tell us about your roof or renovation project. We’ll follow up with next steps and a
              time that works for you.
            </p>
            <dl className="contact__details">
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href="tel:+15550188400">(555) 018-8400</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:hello@thunderbirdrr.com">hello@thunderbirdrr.com</a>
                </dd>
              </div>
              <div>
                <dt>Service area</dt>
                <dd>Local residential &amp; light commercial</dd>
              </div>
            </dl>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="service">Project type</label>
              <select id="service" name="service" defaultValue="roofing">
                <option value="roofing">Roofing</option>
                <option value="renovation">Renovation</option>
                <option value="both">Roofing &amp; renovation</option>
                <option value="inspection">Inspection / assessment</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Project details</label>
              <textarea
                id="message"
                name="message"
                placeholder="Briefly describe the work you need…"
              />
            </div>
            <button className="btn btn--primary btn--full" type="submit">
              Send estimate request
            </button>
            <p className="form-status" role="status" aria-live="polite">
              {status}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <p className="footer__brand">Thunderbird Roofing &amp; Renovations</p>
        <p className="footer__note">© {year} All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="site">
      <Header />
      <main>
        <Hero reduceMotion={reduceMotion} />
        <Services reduceMotion={reduceMotion} />
        <Craft reduceMotion={reduceMotion} />
        <Process reduceMotion={reduceMotion} />
        <Contact reduceMotion={reduceMotion} />
      </main>
      <Footer />
    </div>
  )
}
