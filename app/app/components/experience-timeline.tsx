import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin } from "lucide-react"

interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  responsibilities: string[]
}

interface ExperienceTimelineProps {
  items: ExperienceItem[]
}

export default function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <div key={index} className="mb-12 md:mb-16 relative">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Timeline connector */}
            <div className="hidden md:flex flex-col items-center mr-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Briefcase className="w-6 h-6" />
              </div>
              {index !== items.length - 1 && <div className="h-full w-0.5 bg-primary/30 mt-4"></div>}
            </div>

            {/* Content card */}
            <Card className="flex-grow p-6 border border-muted hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col space-y-4">
                <div className="flex md:hidden items-center gap-2 mb-2 text-primary">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">Experience</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <Badge variant="outline" className="w-fit text-xs px-2 py-0.5 bg-primary/5">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.period}
                  </Badge>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <span className="font-medium">{item.company}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center text-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.location}
                  </span>
                </div>

                <div className="pt-2">
                  <ul className="space-y-2">
                    {item.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ))}
    </div>
  )
}

