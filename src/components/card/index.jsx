const Card = ({ children, className }) => {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 transition hover:shadow-cyan-500/20 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
