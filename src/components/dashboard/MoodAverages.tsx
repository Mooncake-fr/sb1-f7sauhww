import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface MoodAveragesProps {
  title: string;
  todayValue?: number;
  historicalData: number[];
}

export default function MoodAverages({ title, todayValue, historicalData }: MoodAveragesProps) {
  const getEmojiForValue = (value: number) => {
    if (value <= 3) return '😞';
    if (value <= 5) return '😐';
    if (value <= 7.5) return '😊';
    return '🤩';
  };

  const getColorForValue = (value: number) => {
    if (value <= 3) return 'text-red-500';
    if (value <= 5) return 'text-yellow-500';
    if (value <= 7.5) return 'text-green-500';
    return 'text-blue-500';
  };

  const historicalAverage = useMemo(() => {
    if (!historicalData.length) return 0;
    return historicalData.reduce((a, b) => a + b, 0) / historicalData.length;
  }, [historicalData]);

  if (!todayValue) return null;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-5">
        <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <div className="mb-2">
              <span className="text-4xl">{getEmojiForValue(todayValue)}</span>
            </div>
            <div className={cn('font-medium', getColorForValue(todayValue))}>
              <span className="text-sm">Aujourd'hui</span>
            </div>
          </div>
          <div className="h-12 w-px bg-gray-200 mx-4" />
          <div className="text-center flex-1">
            <div className="mb-2">
              <span className="text-4xl">{getEmojiForValue(historicalAverage)}</span>
            </div>
            <div className={cn('font-medium', getColorForValue(historicalAverage))}>
              <span className="text-sm">Moyenne sur 20j</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}