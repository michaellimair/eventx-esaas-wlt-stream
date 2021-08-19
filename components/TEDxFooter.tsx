import { FC } from 'react';

const TEDxFooter: FC = () => (
  <footer style={{ borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
    <p>
      Made by
      {' '}
      <a
        href="https://michaellimair.github.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        Michael Lim
      </a>
      {` ${new Date().getFullYear()}. Originally for `}
      <a
        href="https://tedxcityuhongkong.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        TEDxCityUHongKong
      </a>
      . Best viewed on the latest version of Chrome.
    </p>
  </footer>
);

export default TEDxFooter;
