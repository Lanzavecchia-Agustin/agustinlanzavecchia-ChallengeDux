import { Button as PButton, ButtonProps } from 'primereact/button';

export function Button(props: ButtonProps) {
  return (
    <PButton {...props} className={`p-button${props.className ? ` ${props.className}` : ''}`} />
  );
}
