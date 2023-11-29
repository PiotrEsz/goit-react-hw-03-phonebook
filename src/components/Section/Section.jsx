import sec from './Section.module.css';

const Section = ({ children, title }) => {
  return (
    <>
      <h2 className={sec.section__header}>{title}</h2>
      <div className={sec.section}>{children}</div>
    </>
  );
};

export default Section;
