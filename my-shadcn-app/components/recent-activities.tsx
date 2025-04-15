import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: "Nguyễn Văn A",
    action: "đã chốt đơn hàng",
    target: "VF8 Eco",
    time: "2 giờ trước",
    avatar: "NVA",
  },
  {
    user: "Trần Thị B",
    action: "đã thêm khách hàng mới",
    target: "Lê Văn Khách",
    time: "3 giờ trước",
    avatar: "TTB",
  },
  {
    user: "Lê Văn C",
    action: "đã cập nhật trạng thái khách hàng",
    target: "Phạm Thị Hằng",
    time: "5 giờ trước",
    avatar: "LVC",
  },
  {
    user: "Phạm Thị D",
    action: "đã đặt lịch hẹn với",
    target: "Nguyễn Văn Khách",
    time: "6 giờ trước",
    avatar: "PTD",
  },
  {
    user: "Hoàng Văn E",
    action: "đã chốt đơn hàng",
    target: "VF9 Plus",
    time: "8 giờ trước",
    avatar: "HVE",
  },
]

export default function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity, i) => (
        <div key={i} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36&text=${activity.avatar}`} alt={activity.user} />
            <AvatarFallback>{activity.avatar}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span> {activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
