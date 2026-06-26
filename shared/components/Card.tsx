import { twMerge } from "tailwind-merge";

type CardProps = {
  children: React.ReactNode;
  className?:string
};

export default function Card({ children,className}: CardProps) {
  return (
    <div className={twMerge("rounded-lg border-4 border-yellow-500 bg-white p-6 shadow",className)}>
      {children}
    </div>
  );
}