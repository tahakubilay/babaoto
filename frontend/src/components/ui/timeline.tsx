
import React from 'react';

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  amount: string;
  isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, description, amount, isLeft }) => {
  return (
    <div className={`flex items-center w-full`}>
      {isLeft ? (
        <>
          <div className="w-1/2 pr-8 text-right">
            <div className="p-4 bg-card rounded-lg">
              <h3 className="font-bold">{title}</h3>
              <p>{description}</p>
              <p className="font-bold">{amount}</p>
            </div>
          </div>
          <div className="w-1/12 flex justify-center">
            <div className="h-full w-0.5 bg-primary"></div>
            <div className="absolute w-4 h-4 bg-primary rounded-full"></div>
          </div>
          <div className="w-1/2 pl-8">
            <p className="text-muted-foreground">{date}</p>
          </div>
        </>
      ) : (
        <>
          <div className="w-1/2 pr-8 text-right">
            <p className="text-muted-foreground">{date}</p>
          </div>
          <div className="w-1/12 flex justify-center">
            <div className="h-full w-0.5 bg-primary"></div>
            <div className="absolute w-4 h-4 bg-primary rounded-full"></div>
          </div>
          <div className="w-1/2 pl-8">
            <div className="p-4 bg-card rounded-lg">
              <h3 className="font-bold">{title}</h3>
              <p>{description}</p>
              <p className="font-bold">{amount}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Timeline: React.FC = () => {
  // Replace with your actual data
  const timelineData = [
    { date: '21.09.2024', title: 'Eylül Senet Ödemesi', description: 'Açıklama...', amount: '500 TL', isLeft: true },
    { date: '22.09.2024', title: 'Ekim Senet Ödemesi', description: 'Açıklama...', amount: '600 TL', isLeft: false },
  ];

  return (
    <div className="space-y-8">
      {timelineData.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Timeline;
