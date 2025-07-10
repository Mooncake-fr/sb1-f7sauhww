import { cn } from '@/lib/utils';

interface EmojiOption {
  emoji: string;
  label: string;
  value: number;
  color: string;
}

interface MetricSelectorProps {
  options: EmojiOption[];
  onSelect: (value: number) => void;
  selectedValue?: number;
}

export default function MetricSelector({ options, onSelect, selectedValue }: MetricSelectorProps) {
  return (
    <div className="flex justify-between items-center gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={cn(
            'flex flex-col items-center p-2 rounded-lg transition-all',
            'hover:bg-gray-50',
            selectedValue === option.value ? 'ring-2 ring-blue-500' : ''
          )}
        >
          <span className="text-2xl mb-1">{option.emoji}</span>
          <span className={cn('text-xs font-medium', option.color)}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}