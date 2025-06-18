import { Card } from '@/components/commons/ui/Card';
import React from 'react'

type Props = {
  title: string;
  children: React.ReactNode;
}

export default function EmptyBox({ title, children }: Props) {
  return (
    <Card className="p-8 rounded-2xl">
      <h3 className="font-bold text-2xl mb-4">{title}</h3>
      {children}
    </Card>
  )
}
