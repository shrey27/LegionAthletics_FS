import './footer.css';

export function Footer({ fixed }) {
  return (
    <footer
      className={`footer--ctr flex-ct-ct flex-vertical sm-s ${
        fixed && 'fixed'
      }`}
    >
      <span className='md bl mg-half'>Connect with me</span>
      <div>
        <a href='https://twitter.com/home'>
          <img
            className='box__image__sm'
            src='https://img.icons8.com/color/48/000000/twitter--v1.png'
            alt='logo'
          />
        </a>
        <a href='https://github.com/shrey27'>
          <img
            className='box__image__sm'
            src='https://img.icons8.com/glyph-neue/48/000000/github.png'
            alt='logo'
          />
        </a>
        <a href='https://www.linkedin.com/in/shrey27/'>
          <img
            className='box__image__sm'
            src='https://img.icons8.com/color/48/000000/linkedin.png'
            alt='logo'
          />
        </a>
      </div>
      <span className='primary sm reg mg-half'>
        © 2022 Legion Athletics Pvt Ltd. All rights reserved.
      </span>
    </footer>
  );
}
