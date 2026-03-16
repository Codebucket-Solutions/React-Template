import ButtonsExamples from '../exampleComponents/buttons';
import ColorVariables from '../exampleComponents/colorVariables';
import InputExamples from '../exampleComponents/input';
import TableExample from '../exampleComponents/table';
import styles from './styles.module.scss';

const showcaseHighlights = [
  'Thin page wrappers with implementation in containers',
  'Mock-first data flows so the template boots without a backend',
  'Deterministic worktree setup for agent and human validation',
  'Local runtime signals for browser-first debugging',
];

const ShowcaseContainer = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Design system sandbox</p>
          <h1>Component Showcase</h1>
          <p>
            Use this page as the default living reference for the template&apos;s shared UI
            building blocks. It is intentionally visual, fast to inspect, and easy for agents to
            compare before and after changes.
          </p>
        </div>

        <div className={styles.highlightCard}>
          <h2>Harness highlights</h2>
          <ul>
            {showcaseHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <TableExample />
      <ButtonsExamples />
      <InputExamples />
      <ColorVariables />
    </div>
  );
};

export default ShowcaseContainer;
