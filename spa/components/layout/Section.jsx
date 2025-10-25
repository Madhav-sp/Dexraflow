export default function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`container-x py-20 ${className}`}>
      {children}
    </section>
  );
}
