import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { formatNumber } from '@/lib/utils';

export default function CountUp({ value, formatter = formatNumber, duration = 1.1, className }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView) return undefined;

    if (reducedMotion) {
      node.textContent = formatter(value);
      return undefined;
    }

    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        node.textContent = formatter(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [isInView, value, duration, formatter, reducedMotion]);

  return (
    <span ref={nodeRef} className={className}>
      {formatter(0)}
    </span>
  );
}
