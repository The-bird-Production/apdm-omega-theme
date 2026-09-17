// Local to this theme — not registered in theme.json, imported directly
// by the page templates that need a banner (page.title already sets the
// browser tab title via the CMS's own metadata handling, no need to
// duplicate it here).
export default function Hero({ title, subtitle, banner, children }) {
  return (
    <div className={'subtitle d-flex flex-column edito ' + banner}>
      {children}
      <div className="title d-flex flex-column justify-content-center flex-grow-1 text-white text-center">
        <h1 className="display1">{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </div>
      <div className="arrow justify-content-center">
        <a href="#main" className="m-3">
          <i className="bi bi-arrow-down text-white"></i>
        </a>
      </div>
    </div>
  );
}
