import type { Priority } from '../../data/edu/workflow';
import { PRIORITY_LABEL, PRIORITY_STYLE } from '../../data/edu/workflow';

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const style = PRIORITY_STYLE[priority];
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium ${style.bg} ${style.fg}`}>
      {PRIORITY_LABEL[priority]}
    </span>
  );
}
