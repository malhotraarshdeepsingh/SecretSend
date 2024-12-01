import React from 'react';
import { Skeleton } from './ui/skeleton';
import { Card } from './ui/card';

export function MessageCardSkeleton() {
  return (
    <Card className="card-bordered">
        <div className="p-4 border rounded shadow-sm">
        <Skeleton className="w-full h-6 mb-4" />
        <Skeleton className="w-1/2 h-4 mb-2" />
        <Skeleton className="w-1/3 h-4 mb-2" />
        <Skeleton className="w-full h-8" />
        </div>
    </Card>
  );
}
