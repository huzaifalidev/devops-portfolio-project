import { Card } from "@/components/ui/card"

interface EducationItem {
  title: string
  institution: string
  period: string
}

interface EducationTreeProps {
  items: EducationItem[]
}

export default function EducationTree({ items }: EducationTreeProps) {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <div key={index} className="mb-8 flex">
          <div className="flex flex-col items-center mr-4">
            <div className="w-4 h-4 rounded-full bg-primary"></div>
            {index !== items.length - 1 && <div className="h-full w-0.5 bg-primary"></div>}
          </div>
          <Card className="flex-grow p-6 shadow-md">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-muted-foreground">{item.institution}</p>
            <p className="text-sm text-muted-foreground">{item.period}</p>
          </Card>
        </div>
      ))}
    </div>
  )
}

