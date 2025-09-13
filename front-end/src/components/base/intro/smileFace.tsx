import {
  useTrail,
  useChain,
  useSprings,
  animated,
  useSpringRef,
  useSpring,
} from "@react-spring/web";
import { useEffect } from "react";
import styles from "./styles.module.css";

const COORDS = [
  [50, 30],
  [90, 30],
  [50, 50],
  [60, 60],
  [70, 60],
  [80, 60],
  [90, 50],
];

const STROKE_WIDTH = 0.5;
const OFFSET = STROKE_WIDTH / 2;
const MAX_WIDTH = 150 + OFFSET * 2;
const MAX_HEIGHT = 100 + OFFSET * 2;

type SmileAppProps = {
  isExiting: boolean;
  onExitComplete: () => void;
};

export default function SmileApp({ isExiting, onExitComplete }:SmileAppProps) {
  const gridApi = useSpringRef();
  const boxApi = useSpringRef();

  const gridSprings = useTrail(16, {
    ref: gridApi,
    from: { x2: 0, y2: 0 },
    to: { x2: MAX_WIDTH, y2: MAX_HEIGHT },
  });

  const [boxSprings, boxApiFn] = useSprings(7, (i) => ({
    ref: boxApi,
    from: { scale: 0 },
    to: { scale: 1 },
    delay: i * 200,
    config: { mass: 2, tension: 220 },
  }));

  // fade container in/out
  const [fadeStyle, fadeApi] = useSpring(() => ({
    opacity: 1,
    scale: 1,
    config: { duration: 1500 },
  }));

  useChain([gridApi, boxApi], [0, 1], 1500);

  // handle exit
  useEffect(() => {
    if (isExiting) {
      // fade and shrink out
      fadeApi.start({
        opacity: 0,
        scale: 0.8,
        onRest: onExitComplete, // notify parent when done
      });

      // reverse the boxes
      boxApiFn.start((i) => ({
        to: { scale: 0 },
        delay: i * 100,
      }));
    }
  }, [isExiting]);

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
    <animated.div
      className={styles["background-container"]}
      style={fadeStyle}
    >
      <div className={styles.container}>
        <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
          <g>
            {gridSprings.map(({ x2 }, index) => (
              <animated.line
                x1={0}
                y1={index * 10 + OFFSET}
                x2={x2}
                y2={index * 10 + OFFSET}
                key={`h-${index}`}
                strokeWidth={STROKE_WIDTH}
                stroke="currentColor"
              />
            ))}
            {gridSprings.map(({ y2 }, index) => (
              <animated.line
                x1={index * 10 + OFFSET}
                y1={0}
                x2={index * 10 + OFFSET}
                y2={y2}
                key={`v-${index}`}
                strokeWidth={STROKE_WIDTH}
                stroke="currentColor"
              />
            ))}
          </g>
          {boxSprings.map(({ scale }, index) => (
            <animated.rect
              key={index}
              width={10}
              height={10}
              fill="currentColor"
              style={{
                transformOrigin: `${5 + OFFSET * 2}px ${5 + OFFSET * 2}px`,
                transform: `translate(${
                  COORDS[index][0] + OFFSET
                }px, ${COORDS[index][1] + OFFSET}px)`,
                scale,
              }}
            />
          ))}
        </svg>
      </div>
    </animated.div>
    </div>
  );
}
