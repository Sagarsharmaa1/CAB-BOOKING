function AnimatedGrid() {
  return (
    <div 
      className="grid-layer" 
      aria-hidden="true" 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        opacity: 0.05,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
      }}
    />
  );
}

export default AnimatedGrid;
