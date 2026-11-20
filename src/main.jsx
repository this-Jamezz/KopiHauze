import React from 'react'
import { createRoot } from 'react-dom/client'
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
const nav = [['Home', 'home'], ['Menu', 'drinks'], ['Coffee Cart', 'cart'], ['FAQ', 'faq'], ['Visit', 'visit']]

function External({ href, className, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
}

function NavLinks({ onSelect }) {
  return nav.map(([label, id]) => <a href={'#' + id} key={id} onClick={onSelect}>{label}</a>)
}

function Header() {
  return <header className="relative z-10 border-b border-line bg-cream">
    <div className="wrap flex min-h-14 items-center gap-3 sm:gap-6">
      <a href="#home" className="mr-auto flex items-center gap-2.5" aria-label="Kopi Hauz home">
        <img src="/kopi-hauz.png" width="34" height="34" alt="" />
        <span className="font-display text-lg sm:text-xl">Kopi Hauz</span>
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
  const menuCards = [
    { name: 'Kopi Hauz Drinks', image: '/menu-drinks.png', alt: 'Chocolate and matcha iced lattes', description: 'Handcrafted iced lattes and refreshing café beverages, made to cool you down and brighten your day.' },
    { name: 'Waffle & Pastries', image: '/menu-waffles.png', alt: 'Fresh waffles topped with fruit, cream, and chocolate', description: 'Golden, crisp-on-the-outside waffles loaded with fresh fruit, cream, and sweet toppings for the ultimate café treat.' },
    { name: 'Artisanal Pizzas', image: '/menu-pizza.png', alt: 'Salami and four-cheese pizzas', description: 'Hand-stretched crusts baked to perfection with rich cheeses and savory toppings, ideal for sharing.' },
    { name: 'Rice Meals', image: '/menu-rice.png', alt: 'Beef rice meals with vegetables', description: 'Hearty, comforting plates of tender beef, steamed rice, and crisp vegetables for a satisfying full meal.' },
  ]
  return <section id="drinks" className="wrap section">
    <h2>Menu</h2>
    <p className="mt-3 max-w-3xl text-lg text-muted">Crafted fresh to order with simple, honest ingredients—pull up a chair and make yourself at home.</p>
    <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
      {menuCards.map(({ name, image, alt, description }) => <article key={name} className="menu-card">
        <img src={image} alt={alt} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
        <h3 className="mt-3 font-display text-xl leading-tight">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </article>)}
    </div>
    <div className="mt-9 flex justify-center"><a href="/menu.html" className="button button-menu font-display text-lg">View Full Menu</a></div>
  </section>
}

const questions = [
  ['When is Kopi Hauz open?', <>{hours}. Closed on Mondays.</>],
  ['Where is Kopi Hauz located?', <>At {address}. <a href="#visit" className="text-link">See the Visit section</a>.</>],
  ['Can I book the coffee cart for an event?', <>Contact Kopi Hauz on <External href={facebook} className="text-link">Facebook</External> or call <a href={phone} className="text-link">{phoneLabel}</a> to check availability and request a quote.</>],
  ['What details should I include in my booking inquiry?', 'Share your event date, venue, estimated guest count, and serving hours.'],
  ['Where can I see the menu?', <a href="#drinks" className="text-link">See the Menu</a>],
]

function App() {
  return <>
    <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
    <Header />
    <main id="main">
      <section id="home" className="hero relative overflow-hidden text-cream">
        <svg aria-hidden="true" className="absolute size-0"><defs><clipPath id="hero-photo-clip" clipPathUnits="objectBoundingBox"><path d="M .4 0 H 1 V 1 H 0 C .16 .84 .18 .72 .2 .62 C .25 .4 .28 .22 .4 0 Z" /></clipPath></defs></svg>
        <div className="wrap relative z-[1] grid items-center gap-10 py-14 sm:py-20 lg:min-h-[min(74vh,720px)] lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="eyebrow text-gold">Balagtas, Bulacan</p>
            <h1 className="mt-4 font-display text-[clamp(3.6rem,8vw,6.5rem)] leading-none tracking-[-.055em]">Kopi Hauz</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90 sm:text-xl">Where coffee, waffles, pasta, and pizza converge in a symphony of flavor and comfort.</p>
            <p className="mt-7 font-semibold text-gold">{hours}</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#drinks" className="button button-gold">View Menu</a><a href="#cart" className="button button-outline">Book the Coffee Cart</a></div>
          </div>
        </div>
        <div className="hero-photo" role="img" aria-label="Warmly lit seating area at Kopi Hauz"><img src="/cafe-interior.png" alt="" /></div>
      </section>
      <Drinks />
      <section id="story" className="bg-teal text-cream">
        <div className="wrap section grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2>Our Story</h2>
            <p className="mt-5 max-w-xl font-display text-xl leading-relaxed text-cream/90">Welcome to Kopi Hauz, a specialty coffee house born in the heart of Balagtas, Bulacan. We started our journey with a simple vision: to create a warm, inviting haven where friends, families, and neighbors could gather to unwind, connect, and enjoy meticulously brewed coffee alongside a symphony of comfort food. What began as a simple passion for great coffee and good company has blossomed into the vibrant, welcoming space you see today. Whether you are stopping by for your daily caffeine fix, sharing golden-brown waffles and artisanal pizzas over late-night conversations, or savoring our signature comfort dishes, every detail is crafted with care. While our space and menu have grown, our core commitment to quality, local warmth, and heartfelt hospitality remains unchanged.</p>
          </div>
          <img src="/kopi-hauz-exterior.png" alt="Kopi Hauz café exterior glowing with lights at night" loading="lazy" className="mx-auto w-full max-w-md rounded-xl border-[10px] border-cream object-cover shadow-xl" />
        </div>
      </section>
      <section id="cart" className="bg-cream text-teal">
        <div className="wrap section grid gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div><h2>Coffee Cart for Events</h2><p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">Bring Kopi Hauz to birthdays, weddings, corporate gatherings, and other celebrations.</p>
            <div className="mt-7 flex flex-wrap gap-3"><External href={messenger} className="button button-gold">Inquire About Booking</External><a href={phone} className="button button-teal">Call to Inquire</a></div>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <h3 className="font-display text-2xl text-teal">What to send us</h3>
            <ul className="mt-4 grid list-disc gap-2 pl-5 sm:grid-cols-2"><li>Event date</li><li>Venue</li><li>Estimated guest count</li><li>Serving hours</li></ul>
            <p className="mt-5 text-muted">Ask us about pricing, availability, and service areas.</p>
          </div>
        </div>
      </section>
      <section id="faq" className="bg-teal text-cream">
        <div className="wrap section grid gap-7 lg:grid-cols-[0.7fr_1.3fr]">
          <h2>Frequently asked questions</h2>
          <div className="divide-y divide-line border-y border-line">
            {questions.map(([question, answer]) => <details name="cafe-faq" key={question}><summary className="faq-question flex min-h-15 cursor-pointer items-center justify-between gap-4 py-4 font-semibold">{question}</summary><div className="pb-5 pr-6 leading-relaxed text-cream/85">{answer}</div></details>)}
          </div>
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
      <a href="#home" className="flex items-center gap-3"><img src="/kopi-hauz.png" width="42" height="42" alt="" /><span className="font-display text-2xl">Kopi Hauz</span></a>
      <div className="flex flex-wrap gap-5 text-sm"><External href={facebook}>Facebook</External><External href={instagram}>Instagram</External><a href={phone}>{phoneLabel}</a></div>
      <p className="text-sm">Developed by James Ian Antonio and Miranda Lheriza</p>
    </div></footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
