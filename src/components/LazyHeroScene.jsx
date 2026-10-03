import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SceneFallback from './SceneFallback.jsx';

const HeroScene = lazy(() => import('./HeroScene.jsx'));

export default function LazyHeroScene(props) {
  const mount = useRef(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowPower = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 8) <= 4;

  useEffect(() => {
    if (reducedMotion || lowPower || !mount.current) return undefined;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '120px' });
    observer.observe(mount.current);
    return () => observer.disconnect();
  }, [lowPower, reducedMotion]);

  return (
    <div className="scene-lazy-mount" ref={mount}>
      {visible && !reducedMotion && !lowPower
        ? <Suspense fallback={<SceneFallback />}><HeroScene {...props} /></Suspense>
        : <SceneFallback />}
    </div>
  );
}
