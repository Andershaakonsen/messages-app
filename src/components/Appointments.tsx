import React from "react";

type Props = {
  navn: string;
};

const Appointments: React.FC<Props> = ({ navn }) => {
  return <div>Appointments</div>;
};

export default Appointments;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: "red" | "blue";
}

const Button = ({ className, ...props }: ButtonProps) => {
  return <button {...props} className={`${className} bg-red-50 p-4`} />;
};
