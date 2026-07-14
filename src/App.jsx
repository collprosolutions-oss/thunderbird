import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import './App.css'

const PHONE_DISPLAY = '506-232-7045'
const PHONE_TEL = '+15062327045'

const SERVICES = [
  {
    id: 'roofing',
    title: 'Roofing',
    text: 'Durable. Reliable. Built to protect.',
  },
  {
    id: 'siding',
    title: 'Siding',
    text: 'Enhance curb appeal and add value.',
  },
  {
    id: 'framing',
    title: 'Framing',
    text: 'Strong foundations. Solid results.',
  },
  {
    id: 'renovations',
    title: 'Renovations',
    text: 'From upgrades to full transformations.',
  },
]

const fadeUp = (reduceMotion) => ({
  hidden: { opacity: reduceMotion ? 1 : 0.18, y: reduceMotion ? 0 : 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] },
  },
})

const stagger = (reduceMotion) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduceMotion ? 0 : 0.1,
      delayChildren: reduceMotion ? 0 : 0.12,
    },
  },
})

function Bolt({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M13 2 4 14h6l-1 8 11-14h-7l2-6Z" />
    </svg>
  )
}

function ServiceIcon({ type }) {
  if (type === 'roofing') {
    return (
      <svg className="service__icon" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" />
        <path className="accent" d="M14 30 32 14l18 16H14Z" />
        <path fill="#fff" d="M20 30h24v18H20z" />
        <rect className="accent" x="28" y="36" width="8" height="12" />
      </svg>
    )
  }
  if (type === 'siding') {
    return (
      <svg className="service__icon" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" />
        <path fill="#fff" d="M18 22h28v24H18z" />
        <path className="accent" d="M14 26 32 12l18 14H14Z" />
        <path className="line" d="M20 32h24M20 38h24M20 44h24" />
      </svg>
    )
  }
  if (type === 'framing') {
    return (
      <svg className="service__icon" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" />
        <path className="accent" d="M14 30 32 14l18 16" />
        <path className="line" d="M18 48V30h28v18M32 14v34M24 30v18M40 30v18" />
      </svg>
    )
  }
  return (
    <svg className="service__icon" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" />
      <path
        className="accent"
        d="M22 18h6l4 10 4-10h6l-7 16v12h-6V34l-7-16Zm18 22 8 10h-7l-5-7-5 7h-7l8-10 4-5 4 5Z"
      />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2 4 5v6c0 5.25 3.4 10.15 8 11.4 4.6-1.25 8-6.15 8-11.4V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.5-4.5 1.4 1.4-5.9 5.9Z"
      />
    </svg>
  )
}

function Reveal({ children, className, reduceMotion }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp(reduceMotion)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
    >
      {children}
    </motion.div>
  )
}

function Header() {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <a className="header__brand" href="#top">
          <Bolt className="header__bolt" />
          <span className="header__name">Thunderbird</span>
        </a>
        <nav className="header__nav" aria-label="Primary">
          <a href="#services">Services</a>
          <a href="#trust">Why us</a>
          <a href="#quote">Free quote</a>
        </nav>
        <a className="header__call" href={`tel:${PHONE_TEL}`}>
          <Bolt className="header__bolt" />
          <span>{PHONE_DISPLAY}</span>
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
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 110])
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.06, 1])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__media" aria-hidden="true">
        <motion.img
          src="/hero.png"
          alt=""
          style={{ y, scale }}
          initial={reduceMotion ? false : { scale: 1.12, opacity: 0.85 }}
          animate={reduceMotion ? undefined : { scale: 1.06, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
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
          <div className="hero__brand-sub">
            Construction &amp; Renovation Ltd
            <Bolt className="bolt" />
          </div>
        </motion.div>
        <motion.h1 className="hero__headline" variants={fadeUp(reduceMotion)}>
          Quality work. Built to last.
        </motion.h1>
        <motion.p className="hero__lede" variants={fadeUp(reduceMotion)}>
          Roofing, siding, framing, and renovations — done right, with bilingual service you can
          trust.
        </motion.p>
        <motion.div className="hero__actions" variants={fadeUp(reduceMotion)}>
          <a className="btn btn--yellow" href={`tel:${PHONE_TEL}`}>
            Text or call
            <span className="btn__phone">{PHONE_DISPLAY}</span>
          </a>
          <a className="btn btn--ghost" href="#quote">
            Free quote
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Services({ reduceMotion }) {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <Reveal reduceMotion={reduceMotion}>
          <p className="section__eyebrow">
            <Bolt className="bolt" />
            What we build
          </p>
          <h2 className="section__title">Roofing. Siding. Framing. Renovations.</h2>
          <p className="section__lede">
            From storm-ready roofs to full transformations, Thunderbird brings strength,
            craftsmanship, and clear communication to every job.
          </p>
        </Reveal>

        <motion.div
          className="services__grid"
          variants={stagger(reduceMotion)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SERVICES.map((service) => (
            <motion.article
              key={service.id}
              className="service"
              variants={fadeUp(reduceMotion)}
            >
              <ServiceIcon type={service.id} />
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Trust({ reduceMotion }) {
  return (
    <section className="section trust" id="trust">
      <div className="wrap">
        <Reveal reduceMotion={reduceMotion}>
          <p className="section__eyebrow">
            <Bolt className="bolt" />
            Why Thunderbird
          </p>
          <h2 className="section__title">Local. Trusted. Dependable.</h2>
          <p className="section__lede">
            We stand behind our work — and we work for you, in the language you’re most
            comfortable with.
          </p>
        </Reveal>

        <div className="trust__grid">
          <Reveal className="trust__item" reduceMotion={reduceMotion}>
            <div className="trust__badge">
              <ShieldIcon />
              15 years workmanship warranty
            </div>
            <h3>Protected long after the job</h3>
            <p>
              Every project is backed by a 15-year workmanship warranty — because quality work
              should outlast the season it was built in.
            </p>
          </Reveal>

          <Reveal className="trust__item" reduceMotion={reduceMotion}>
            <div className="trust__badge trust__badge--dark">
              Bilingual service — we work for you
            </div>
            <h3>Clear talk. Solid results.</h3>
            <p>
              Get straight answers, honest timelines, and a crew that shows up ready to build —
              without the runaround.
            </p>
            <div className="trust__values">
              <span>Local</span>
              <span>Trusted</span>
              <span>Dependable</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Quote({ reduceMotion }) {
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    setStatus(
      `Thanks${name ? `, ${name}` : ''}. We’ll follow up soon — or text/call ${PHONE_DISPLAY} anytime.`,
    )
    form.reset()
  }

  return (
    <section className="section quote" id="quote">
      <div className="wrap">
        <Reveal className="quote__panel" reduceMotion={reduceMotion}>
          <div className="quote__copy">
            <p className="section__eyebrow">
              <Bolt className="bolt" />
              Free quote
            </p>
            <h2 className="section__title">Text or call for a free quote.</h2>
            <p className="section__lede">
              Tell us about your roofing, siding, framing, or renovation project. Prefer to talk
              now? Reach us directly.
            </p>
            <a className="quote__phone" href={`tel:${PHONE_TEL}`}>
              <span className="quote__phone-label">Text or call</span>
              <span className="quote__phone-number">{PHONE_DISPLAY}</span>
            </a>
          </div>

          <form className="quote__form" onSubmit={handleSubmit}>
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
              <input id="email" name="email" type="email" autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="service">Service needed</label>
              <select id="service" name="service" defaultValue="roofing">
                <option value="roofing">Roofing</option>
                <option value="siding">Siding</option>
                <option value="framing">Framing</option>
                <option value="renovations">Renovations</option>
                <option value="multiple">Multiple services</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Project details</label>
              <textarea
                id="message"
                name="message"
                placeholder="What do you need help with?"
              />
            </div>
            <button className="btn btn--red btn--full" type="submit">
              Request free quote
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
        <p className="footer__brand">Thunderbird Construction &amp; Renovation Ltd.</p>
        <p className="footer__note">
          © {year} ·{' '}
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
        </p>
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
        <Trust reduceMotion={reduceMotion} />
        <Quote reduceMotion={reduceMotion} />
      </main>
      <Footer />
    </div>
  )
}
