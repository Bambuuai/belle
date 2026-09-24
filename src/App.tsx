import { useState } from 'react'
import { MorphingCard } from './components/MorphingCard/MorphingCard'
import { DockedAvatar } from './components/MorphingCard/DockedAvatar'
import { Avatar, PhoneScreen } from './demo/PhoneContent'
import './App.css'

const LAYOUT_ID = 'jordan-avatar'

function App() {
  const [settled, setSettled] = useState(false)

  return (
    <>
      <nav className="nav">
        <span className="nav__logo">Studio</span>
        <span className="nav__link">Work</span>
      </nav>

      <header className="hero">
        <p className="hero__eyebrow">Case study</p>
        <h1 className="hero__title">
          A phone in your hand,
          <br />
          a face in your mind.
        </h1>
        <p className="hero__sub">Scroll to see the card open, then fold back into an avatar.</p>
      </header>

      <MorphingCard
        layoutId={LAYOUT_ID}
        avatar={<Avatar initials="JD" />}
        expanded={<PhoneScreen />}
        avatarSize={104}
        expandedWidth={360}
        expandedHeight={640}
        scrollHeight={320}
        onSettleChange={setSettled}
      />

      <section className="intro">
        <div className="intro__avatar-slot">
          <DockedAvatar layoutId={LAYOUT_ID} avatar={<Avatar initials="JD" />} visible={settled} size={72} />
        </div>
        <div className="intro__copy">
          <h2>Jordan keeps the conversation going</h2>
          <p>
            Once the card folds shut, the avatar stays with you — a small, constant presence as the
            rest of the story unfolds beneath it.
          </p>
          <p>
            This is the reusable piece: a <code>MorphingCard</code> that owns the open/close scroll
            animation, and a <code>DockedAvatar</code> that picks the shape back up wherever the page
            needs it next. Swap the avatar and expanded content for real project media to reuse the
            pattern for a work index, à la daybreak.studio.
          </p>
          <p>
            Try scrolling back up — the handoff runs in reverse too.
          </p>
        </div>
      </section>

      <section className="filler">
        <p>Keep scrolling — the avatar rides along with the copy.</p>
      </section>
      <section className="filler">
        <p>This space is just to prove the dock holds its position on the way down.</p>
      </section>
      <section className="filler filler--end">
        <p>End of the demo.</p>
      </section>
    </>
  )
}

export default App
