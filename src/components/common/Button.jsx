const Button = ({
  children,
  onClick,
  href,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1BB7C4] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:text-base";

  const variants = {
    primary:
      "bg-[#1BB7C4] text-white hover:bg-[#159da8] active:bg-[#128b95]",

    secondary:
      "border-2 border-[#056699] bg-transparent text-[#056699] hover:bg-[#056699] hover:text-white",

    outline:
      "border border-[#1BB7C4] bg-transparent text-[#056699] hover:bg-[#1BB7C4] hover:text-white",
  };

  const styles = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={styles}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
};

export default Button;