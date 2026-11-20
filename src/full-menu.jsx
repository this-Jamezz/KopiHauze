import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const drinkGroups = [
  {
    name: 'Coffee',
    items: [
      ['Americano', 'Espresso mellowed with hot water.', 100],
      ['Flavored Americano', 'Americano with your choice of flavored syrup.', 130],
      ['Café Latte', 'Espresso blended with steamed milk.', 160],
      ['Caramel Macchiato', 'Espresso and milk finished with caramel.', 160],
      ['Cappuccino Cream', 'Espresso with creamy milk foam.', 160],
      ['Dark Mocha', 'Coffee and chocolate blended with milk.', 160],
      ['Dirty Matcha', 'Matcha and milk with a shot of espresso.', 160],
      ['Roti Island Latte', 'A creamy signature coffee latte.', 195],
      ['Salted Caramel', 'Coffee and milk with salted caramel.', 160],
      ['Spanish Latte', 'Espresso with milk and sweetened condensed milk.', 160],
      ['Vanilla Latte', 'Espresso and milk with vanilla.', 160],
    ],
  },
  {
    name: 'Non-Coffee',
    items: [
      ['Chocolate Latte', 'Chocolate blended with creamy milk.', 160],
      ['Chocomint', 'Chocolate and cool mint blended with milk.', 160],
      ['Matcha Latte', 'Matcha blended with creamy milk.', 160],
    ],
  },
  {
    name: 'Frappe',
    items: [
      ['Caramel', 'A blended caramel and cream drink.', 175],
      ['Cookies n’ Cream', 'A creamy blended drink with cookie pieces.', 175],
      ['Dark Choco Chips', 'A chocolate frappe with dark chocolate chips.', 175],
      ['Mocha', 'Coffee and chocolate blended with ice and cream.', 175],
    ],
  },
  {
    name: 'Smoothies',
    items: [
      ['Mango', 'A refreshing smoothie made with mango.', 160],
      ['Mango & Banana', 'Mango and banana blended into a creamy smoothie.', 160],
      ['Mango Melon', 'Mango and melon blended into a fruity smoothie.', 160],
      ['Strawberry', 'A refreshing smoothie made with strawberries.', 160],
    ],
  },
  {
    name: 'Snow Series',
    items: [
      ['Peach Perfect Snow', 'A cool, creamy peach-flavored blended drink.', 195],
      ['Peppermint Snow', 'A cool, creamy peppermint-flavored blended drink.', 195],
      ['Pina Colada Sky', 'A tropical pineapple and coconut-inspired blended drink.', 195],
    ],
  },
]

const foodGroups = [
  {
    name: 'Pasta',
    items: [
      ['Carbonara', 'Creamy sauce tossed with pasta and savory toppings.', 230],
      ['Chicken Alfredo', 'Chicken and pasta coated in a creamy Alfredo sauce.', 230],
      ['Creamy Chicken Pesto', 'Chicken and pasta in a creamy pesto sauce.', 300],
      ['Penne Arabiata', 'Penne pasta with a bold tomato and chili sauce.', 230],
      ['Shrimp Aglio Olio', 'Shrimp and pasta tossed with garlic and olive oil.', 300],
      ['Spaghetti', 'Spaghetti served with a rich, savory sauce.', 230],
    ],
  },
  {
    name: 'Pizza',
    items: [
      ['Cheese', 'Pizza crust topped with tomato sauce and melted cheese.', 380],
      ['Beef Me Up', 'Savory beef and cheese on a baked pizza crust.', 380],
      ['Duo Delight', 'A satisfying combination of toppings with cheese on pizza crust.', 400],
      ['Garlic Shrimp', 'Shrimp, garlic, and cheese on a baked pizza crust.', 420],
      ['Marguerita', 'Tomato, cheese, and basil on a crisp pizza crust.', 300],
      ['Pesto Vegie', 'Vegetables and cheese with pesto on pizza crust.', 400],
    ],
  },
  {
    name: 'Pica-Pica',
    items: [
      ['Cheezy Fries', 'Crisp fries topped with a rich cheese sauce.', 160],
      ['Hauz Fries', 'Golden fries finished with the house seasoning.', 150],
      ['Nacho Fiesta', 'Crunchy nachos with cheese sauce and savory toppings.', 300],
      ['Pautin Fries', 'Crisp fries topped with savory sauce and cheese.', 200],
    ],
  },
  {
    name: 'Pastries',
    items: [
      ['Double Choco Cookie', 'A chocolate cookie with extra chocolate in every bite.', 60],
      ['Choco Banana', 'A sweet chocolate and banana pastry treat.', 60],
      ['Oatmeal Cookie', 'A classic cookie made with hearty oats.', 60],
    ],
  },
  {
    name: 'Light Meals',
    items: [
      ['Cheezy Beef Wrap', 'Seasoned beef and cheese wrapped in a soft tortilla.', 180],
      ['Chicken n’ Chips', 'Savory chicken served with crisp fries.', 180],
      ['Clubhouse Sandwich', 'A layered sandwich with savory fillings and bread.', 195],
      ['Club-wich', 'A hearty sandwich layered with savory fillings.', 180],
      ['Savory Chicken Wrap', 'Seasoned chicken and fresh fillings in a soft tortilla.', 180],
    ],
  },
  {
    name: 'Waffle',
    items: [
      ['Liege Waffle', 'A golden, buttery Liege-style waffle.', 100],
      ['Liege Waffle w/add on', 'Liege waffle with your choice of butter, maple syrup, chocolate, or caramel.', 160],
      ['Plain Waffle (with Maple syrup)', 'A classic waffle served with maple syrup.', 100],
      ['Plain Waffle w/add on', 'Plain waffle with your choice of butter, maple syrup, chocolate, or caramel.', 160],
      ['Waffle-Ice Cream', 'Waffle topped with ice cream and chocolate and caramel drizzle.', 160],
      ['Waffle Mango & Cream', 'Golden waffle topped with mango and cream.', 160],
      ['Waffle Strawberry & Cream', 'Golden waffle topped with strawberries and cream.', 160],
      ['Waffle Banana & Peanut Butter', 'Golden waffle topped with banana and peanut butter.', 160],
    ],
  },
]
const anchors = [...drinkGroups.map(group => group.name), ...foodGroups.map(group => group.name)]
const sectionId = name => name.toLowerCase().replaceAll(' ', '-')

function ItemCard({ name, description, price }) {
  return <article className="overflow-hidden rounded-xl border border-line bg-paper">
    <div className="grid aspect-[4/3] place-items-center bg-teal/10 px-4 text-center text-sm font-semibold text-teal">Photo coming soon</div>
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg leading-snug">{name}</h3>
        <span className="shrink-0 font-bold tabular-nums">{price === null ? 'Add price' : `₱${price.toFixed(2)}`}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  </article>
}

function GroupSection({ name, items }) {
  return <section id={sectionId(name)} className="scroll-mt-20 py-8 sm:py-10">
    <h2 className="font-display text-3xl">{name}</h2>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => <ItemCard key={`${name}-${index}`} name={item[0]} description={item[1]} price={item[2]} />)}
    </div>
  </section>
}

function FullMenu() {
  const [activeCategory, setActiveCategory] = useState(sectionId(anchors[0]))

  useEffect(() => {
    const sections = anchors.map(name => document.getElementById(sectionId(name))).filter(Boolean)
    const observer = new IntersectionObserver(entries => {
      const current = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (current) setActiveCategory(current.target.id)
    }, { rootMargin: '-110px 0px -68% 0px', threshold: 0 })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return <>
    <header className="sticky top-0 z-10 border-b border-line bg-cream/95 backdrop-blur">
      <div className="wrap flex min-h-14 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5" aria-label="Kopi Hauz home">
          <img src="/kopi-hauz.png" width="34" height="34" alt="" />
          <span className="font-display text-lg">Kopi Hauz</span>
        </a>
        <a href="/" className="text-sm font-semibold text-link">Back to Home</a>
      </div>
      <nav aria-label="Menu categories" className="border-t border-line/70">
        <div className="wrap flex gap-3 overflow-x-auto py-3 text-sm font-semibold">
          {anchors.map(name => {
            const id = sectionId(name)
            const active = activeCategory === id
            return <a key={id} href={`#${id}`} onClick={() => setActiveCategory(id)} aria-current={active ? 'location' : undefined} className={`category-tab shrink-0 ${active ? 'category-tab-active' : ''}`}>{name}</a>
          })}
        </div>
      </nav>
    </header>
    <main id="top" className="wrap pb-12 pt-10 sm:pt-14">
      <div className="max-w-3xl">
        <p className="eyebrow text-teal">Kopi Hauz</p>
        <h1 className="mt-2 font-display text-5xl">Full Menu</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">Find a favorite or discover something new. All prices are in Philippine pesos.</p>
      </div>
      <div className="mt-7 divide-y divide-line">
        {drinkGroups.map(group => <GroupSection key={group.name} {...group} />)}
      </div>
      <div className="mt-6 border-t border-line">
        <div className="py-8">
          <h2 className="font-display text-4xl">Food</h2>
          <p className="mt-2 text-muted">Freshly prepared favorites for sharing, snacking, or making a meal of it.</p>
        </div>
        {foodGroups.map(group => <GroupSection key={group.name} {...group} />)}
      </div>
      <a href="#top" className="sr-only">Back to top</a>
    </main>
    <footer className="bg-dark text-cream">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 py-7">
        <a href="/" className="font-display text-xl">Kopi Hauz</a>
        <p className="text-sm">Questions? Call <a href="tel:+639270656137" className="underline underline-offset-4">0927 065 6137</a></p>
      </div>
    </footer>
  </>
}

createRoot(document.getElementById('root')).render(<FullMenu />)
