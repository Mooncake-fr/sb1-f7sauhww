import { useState } from 'react';
import { cn } from '@/lib/utils';

interface EmojiOption {
  emoji: string;
  label: string;
  value: number;
  color: string;
}

interface MetricCardProps {
  title: string;
  options: EmojiOption[];
  onSelect: (value: number) => void;
  selectedValue?: number;
}

export default function MetricCard({ title, options, onSelect, selectedValue }: MetricCardProps) {
  const [selected, setSelected] = useState<number | undefined>(selectedValue);

  const handleSelect = (value: number) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
        <div className="flex justify-between items-center gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'flex flex-col items-center p-2 rounded-lg transition-all',
                'hover:bg-gray-50',
                selected === option.value ? 'ring-2 ring-blue-500' : ''
              )}
            >
              <span className="text-2xl mb-1">{option.emoji}</span>
              <span 
                className={cn(
                  'text-xs font-medium',
                  option.color
                )}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}