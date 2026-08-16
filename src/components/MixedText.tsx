import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/** Renders Arabic RTL and Latin/English tokens LTR inside mixed strings. */
export function MixedText({ text, as: Tag = "span", className, style }: Props) {
  const nodes: ReactNode[] = [];
  const re = /[A-Za-z][A-Za-z0-9+\/\-']*/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(
        <span key={`a-${last}`} className="ar" dir="rtl">
          {text.slice(last, match.index)}
        </span>,
      );
    }
    nodes.push(
      <span key={`e-${match.index}`} className="en" dir="ltr">
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(
      <span key={`a-${last}`} className="ar" dir="rtl">
        {text.slice(last)}
      </span>,
    );
  }

  return (
    <Tag className={className} style={style} dir="rtl">
      {nodes}
    </Tag>
  );
}
