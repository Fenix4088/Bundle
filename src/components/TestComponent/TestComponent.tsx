import React from 'react';
import { Counter } from './Counter';
import { LazyLoadSample } from './LazyLoadSample';
import json from './react.json';
import { UserInfo } from './UserInfo';
import jpeg from './abstract.jpeg';
import largeSvg from './abstract.svg';
import svg, { ReactComponent as SvgIcon } from './plus.svg';
import png from './react.png';
import webp from './react.webp';
import svgSearates from './searates.svg';
import './styleScss.scss';
import './styleSass.sass';
import './styleCss.css';
import cssModules from './styleCssModules.module.css';
import sassModules from './styleSassModules.module.sass';
import scssModules from './styleScssModules.module.scss';

// eslint-disable-next-line no-console
console.log({
  webp,
  jpeg,
  png,
  svgAsBase64: svg,
  SvgAsComponent: SvgIcon,
  cssModules,
  sassModules,
  scssModules,
  json,
});

const LazyLoadComponent = React.lazy(
  () =>
    new Promise<{ default: typeof LazyLoadSample }>((resolve) => {
      setTimeout(() => {
        resolve(import(/* webpackChunkName: "LazyLoadSample" */ './LazyLoadSample'));
      }, 2000);
    })
);

const TestComponent: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <UserInfo />
      <Counter />
      <div>
        <img src={svgSearates} alt="Searates" width="150" style={{ marginTop: 20 }} />
      </div>
      <div className="flag-ukraine" style={{ marginTop: 20 }} />
      <h1 className={sassModules['sass-module']}>TestComponent</h1>
      <br />
      <br />
      <div className="scss-global-variables">
        <div>scss global variables</div>
        <div className="variable font-path">$font-path:</div>
        <div className="variable images-path">$images-path:</div>
        <div className="variable svg-path">$svg-path:</div>
      </div>
      <br />
      <div className="block">
        <div className="scss">svg component</div>
        <SvgIcon />
      </div>
      <div className="block">
        <div className="css">svg</div>
        <img src={svg} alt="svg" />
      </div>
      <div className="block">
        <div className="css">large svg</div>
        <img src={largeSvg} width="400" alt="large svg" />
      </div>
      <div className="block">
        <div className={cssModules['css-module']}>png</div>
        <img src={png} alt="png" />
      </div>
      <div className="block">
        <div className={scssModules['scss-module']}>jpeg</div>
        <img src={jpeg} alt="jpeg" width="400" />
      </div>
      <div className="block">
        <div className="sass">webp</div>
        <img src={webp} alt="webp" />
      </div>
      <div style={{ textAlign: 'initial' }} className="block">
        <div className="json">json</div>
        <pre>{JSON.stringify(json, null, 2)}</pre>
      </div>
      <div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <LazyLoadComponent />
        </React.Suspense>
      </div>
    </div>
  );
};

TestComponent.displayName = TestComponent.name;

export { TestComponent };
