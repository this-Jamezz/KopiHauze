import React from 'react'
import { createRoot } from 'react-dom/client'
import { categories, originalMenuUrl } from './menu'
import './styles.css'

const directions = 'https://maps.app.goo.gl/suRSrSjMkdAXUCdR6'
const facebook = 'https://www.facebook.com/people/Kopihauz-Cafe/61555278689283/'
const instagram = 'https://www.instagram.com/kopihauzcafe/'
const messenger = 'https://m.me/61555278689283'
const phone = 'tel:+639270656137'
const phoneLabel = '0927 065 6137'
const hours = 'Tuesday–Sunday, 4:30 PM–10:30 PM'
const address = '177 Pulong Gubat, Balagtas, Bulacan 3016'
const map = 'https://www.google.com/maps?q=' + encodeURIComponent('Kopihauz Cafe, ' + address) + '&output=embed'
const money = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 2, minimumFractionDigits: 0 })
const nav = [['Home', 'home'], ['Drinks Menu', 'drinks'], ['Coffee Cart', 'cart'], ['FAQ', 'faq'], ['Visit', 'visit']]

function External({ href, className, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
}

function NavLinks({ onSelect }) {
  return nav.map(([label, id]) => <a href={'#' + id} key={id} onClick={onSelect}>{label}</a>)
}

function Header() {
  return <header className="relative z-10 border-b border-line bg-cream">
    <div className="wrap flex min-h-20 items-center gap-3 sm:gap-6">
      <a href="#home" className="mr-auto flex items-center gap-2.5" aria-label="Kopi Hauz home">
        <img src="/kopi-hauz.svg" width="48" height="48" alt="" />
        <span className="font-display text-xl sm:text-2xl">Kopi Hauz</span>
      </a>
      <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-semibold lg:flex"><NavLinks /></nav>
      <details className="mobile-nav lg:hidden">
        <summary aria-label="Navigation menu" className="grid size-11 cursor-pointer place-items-center rounded-full border border-line">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </summary>
        <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full grid border-b border-line bg-cream px-5 py-3 shadow-lg">
          <NavLinks onSelect={event => { event.currentTarget.closest('details').open = false }} />
        </nav>
      </details>
      <External href={directions} className="button button-teal shrink-0 max-sm:px-3 max-sm:text-xs">Get Directions</External>
    </div>
  </header>
}

function Drinks() {
  const hasPrices = categories.some(category => category.drinks.length)
  return <section id="drinks" className="wrap section">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2>Drinks Menu</h2>
      {originalMenuUrl && <External href={originalMenuUrl} className="text-link">View Original Menu</External>}
    </div>
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {categories.map(({ name, drinks }) => <article key={name} className="rounded-xl border border-line bg-paper p-5">
        <h3 className="font-display text-2xl">{name}</h3>
        {!!drinks.length && <dl className="mt-4 divide-y divide-line">{drinks.map(drink => <div key={drink.name} className="flex justify-between gap-3 py-2"><dt>{drink.name}</dt><dd className="shrink-0 text-right tabular-nums">{money.format(drink.price)}</dd></div>)}</dl>}
      </article>)}
    </div>
    {!hasPrices && <p className="mt-5 text-muted">Ask us about current drinks and prices on <External href={facebook} className="text-link">Facebook</External>.</p>}
  </section>
}

const questions = [
  ['When is Kopi Hauz open?', <>{hours}. Closed on Mondays.</>],
  ['Where is Kopi Hauz located?', <>At {address}. <a href="#visit" className="text-link">See the Visit section</a>.</>],
  ['Can I book the coffee cart for an event?', <>Contact Kopi Hauz on <External href={facebook} className="text-link">Facebook</External> or call <a href={phone} className="text-link">{phoneLabel}</a> to check availability and request a quote.</>],
  ['What details should I include in my booking inquiry?', 'Share your event date, venue, estimated guest count, and serving hours.'],
  ['Where can I see the drinks menu?', <a href="#drinks" className="text-link">See the Drinks Menu</a>],
]

function App() {
  return <>
    <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
    <Header />
    <main id="main">
      <section id="home" className="hero text-cream">
        <div className="wrap grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <div>
            <p className="eyebrow text-gold">Balagtas, Bulacan</p>
            <h1 className="mt-4 font-display text-[clamp(3.6rem,9vw,8.25rem)] leading-none tracking-[-.055em]">Kopi Hauz</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90 sm:text-xl">Where coffee, waffles, pasta, and pizza converge in a symphony of flavor and comfort.</p>
            <p className="mt-7 font-semibold text-gold">{hours}</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#drinks" className="button button-gold">View Drinks Menu</a><a href="#cart" className="button button-outline">Book the Coffee Cart</a></div>
          </div>
          <div className="brand-arch mx-auto grid w-full max-w-88 place-items-center px-9 py-8 lg:py-14">
            <img src="/kopi-hauz.svg" width="290" height="290" alt="Kopi Hauz Coffee + Waffle logo" className="h-auto w-full drop-shadow-xl" />
          </div>
        </div>
      </section>
      <Drinks />
      <section id="cart" className="bg-teal text-cream">
        <div className="wrap section grid gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div><h2>Coffee Cart for Events</h2><p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/90">Bring Kopi Hauz to birthdays, weddings, corporate gatherings, and other celebrations.</p>
            <div className="mt-7 flex flex-wrap gap-3"><External href={messenger} className="button button-gold">Inquire About Booking</External><a href={phone} className="button button-outline">Call to Inquire</a></div>
          </div>
          <div className="rounded-2xl border border-gold/40 bg-white/5 p-6 sm:p-8">
            <h3 className="font-display text-2xl text-gold">What to send us</h3>
            <ul className="mt-4 grid list-disc gap-2 pl-5 sm:grid-cols-2"><li>Event date</li><li>Venue</li><li>Estimated guest count</li><li>Serving hours</li></ul>
            <p className="mt-5 text-cream/85">Ask us about pricing, availability, and service areas.</p>
          </div>
        </div>
      </section>
      <section id="faq" className="wrap section grid gap-7 lg:grid-cols-[0.7fr_1.3fr]">
        <h2>Frequently asked questions</h2>
        <div className="divide-y divide-line border-y border-line">
          {questions.map(([question, answer]) => <details name="cafe-faq" key={question}><summary className="faq-question flex min-h-15 cursor-pointer items-center justify-between gap-4 py-4 font-semibold">{question}</summary><div className="pb-5 pr-6 leading-relaxed text-muted">{answer}</div></details>)}
        </div>
      </section>
      <section id="visit" className="border-t border-line bg-paper">
        <div className="wrap section grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <h2>Visit Kopi Hauz</h2>
            <address className="mt-5 space-y-2 text-lg not-italic text-muted"><p>{address}</p><p>{hours}</p><p><a href={phone} className="text-link">{phoneLabel}</a></p></address>
            <External href={directions} className="button button-teal mt-7">Get Directions</External>
          </div>
          <iframe className="h-78 w-full rounded-xl border border-line bg-cream" title="Google Maps location of Kopi Hauz Café" src={map} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div>
      </section>
    </main>
    <footer className="bg-dark text-cream"><div className="wrap flex flex-wrap items-center justify-between gap-6 py-8">
      <a href="#home" className="flex items-center gap-3"><img src="/kopi-hauz.svg" width="42" height="42" alt="" /><span className="font-display text-2xl">Kopi Hauz</span></a>
      <div className="flex flex-wrap gap-5 text-sm"><External href={facebook}>Facebook</External><External href={instagram}>Instagram</External><a href={phone}>{phoneLabel}</a></div>
    </div></footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
