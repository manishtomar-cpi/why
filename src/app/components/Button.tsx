'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { motion, MotionProps } from 'framer-motion';
import cn from 'classnames'; 
import { COLORS } from '../constants/colors';

// Custom type to merge attributes while resolving conflicts
type MergedButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof MotionProps
> &
  MotionProps;

interface ButtonProps extends MergedButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className,
  asChild = false,
  ...props
}) => {
  const baseClasses =
    'px-6 py-3 rounded-md font-semibold focus:outline-none transition-transform transform inline-flex items-center justify-center';

  let variantStyles: React.CSSProperties = {};

  if (variant === 'primary') {
    variantStyles = {
      backgroundColor: COLORS.primary, // Purple
      color: COLORS.white,
    };
  } else if (variant === 'secondary') {
    variantStyles = {
      backgroundColor: COLORS.white,
      color: '#4B5563', // Gray-700
      border: '1px solid #D1D5DB', // Gray-300
    };
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(baseClasses, className),
      style: { ...variantStyles, ...children.props.style },
      ...props,
    });
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(baseClasses, className)}
      style={variantStyles}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
