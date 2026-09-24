import './PhoneContent.css'

export function Avatar({ initials = 'JD' }: { initials?: string }) {
  return (
    <div className="avatar-fill">
      <span>{initials}</span>
    </div>
  )
}

export function PhoneScreen() {
  return (
    <div className="phone-screen">
      <div className="phone-screen__notch" />
      <div className="phone-screen__status">
        <span>9:41</span>
        <span>••••</span>
      </div>

      <div className="phone-screen__header">
        <div className="phone-screen__avatar">JD</div>
        <div>
          <p className="phone-screen__name">Jordan Dae</p>
          <p className="phone-screen__role">Product Designer</p>
        </div>
      </div>

      <div className="phone-screen__bubbles">
        <div className="bubble bubble--in">Hey — sent over the new shots 👋</div>
        <div className="bubble bubble--out">These look great, love the motion</div>
        <div className="bubble bubble--in">Scroll down to see it in action</div>
      </div>

      <div className="phone-screen__home" />
    </div>
  )
}
