
type Props = {
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  [key: string]: unknown;
}

export function Card({ children, className, color, ...rest }: Props) {

  const colorMap: Record<string, string> = {
    primary: 'bg-primary-500 text-white',
    secondary: 'bg-secondary-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-amber-500 text-black',
    info: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    inherit: 'bg-slate-800 text-white',
  };

  return (
    <div className={`${colorMap[color || 'inherit']} ${className || 'rounded-sm shadow-sm'}`} {...rest}>
      {children}
    </div>
  );
}
