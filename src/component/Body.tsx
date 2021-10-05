import { ReactNode } from 'react';
import './Body.scss';

type BodyProps = {
  children: ReactNode;
};

export default function Body({ children }: BodyProps) {
  return <main className="body_layout">{children}</main>;
}
