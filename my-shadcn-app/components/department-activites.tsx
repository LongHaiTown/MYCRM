"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Activity = {
  id: number
  user: string
  userAvatar: string
  action: string
  target: string
  time: string
  type: "sale" | "customer" | "task" | "meeting" | "other"
}

// Dữ liệu mẫu cho hoạt động theo phòng ban
const departmentActivities: Record<number, Activity[]> = {
  1: [
    {
      id: 1,
      user: "Nguyễn Văn A",
      userAvatar: "NVA",
      action: "đã chốt đơn hàng",
      target: "VF8 Eco",
      time: "2 giờ trước",
      type: "sale",
    },
    {
      id: 2,
      user: "Trần Thị B",
      userAvatar: "TTB",
      action: "đã thêm khách hàng mới",
      target: "Lê Văn Khách",
      time: "3 giờ trước",
      type: "customer",
    },
    {
      id: 3,
      user: "Lê Văn C",
      userAvatar: "LVC",
      action: "đã cập nhật trạng thái khách hàng",
      target: "Phạm Thị Hằng",
      time: "5 giờ trước",
      type: "customer",
    },
    {
      id: 4,
      user: "Phạm Thị D",
      userAvatar: "PTD",
      action: "đã đặt lịch hẹn với",
      target: "Nguyễn Văn Khách",
      time: "6 giờ trước",
      type: "meeting",
    },
    {
      id: 5,
      user: "Hoàng Văn E",
      userAvatar: "HVE",
      action: "đã chốt đơn hàng",
      target: "VF9 Plus",
      time: "8 giờ trước",
      type: "sale",
    },
  ],
  2: [
    {
      id: 6,
      user: "Trần Thị B",
      userAvatar: "TTB",
      action: "đã giải quyết yêu cầu hỗ trợ của",
      target: "Nguyễn Văn Khách",
      time: "1 giờ trước",
      type: "customer",
    },
    {
      id: 7,
      user: "Đỗ Thị F",
      userAvatar: "DTF",
      action: "đã gọi điện cho",
      target: "Lê Văn Khách",
      time: "3 giờ trước",
      type: "customer",
    },
    {
      id: 8,
      user: "Vũ Văn G",
      userAvatar: "VVG",
      action: "đã cập nhật thông tin khách hàng",
      target: "Phạm Thị Hằng",
      time: "4 giờ trước",
      type: "customer",
    },
  ],
  3: [
    {
      id: 9,
      user: "Lê Văn C",
      userAvatar: "LVC",
      action: "đã tạo chiến dịch marketing mới",
      target: "Khuyến mãi tháng 6",
      time: "2 giờ trước",
      type: "task",
    },
    {
      id: 10,
      user: "Ngô Thị H",
      userAvatar: "NTH",
      action: "đã cập nhật nội dung website",
      target: "Trang chủ",
      time: "5 giờ trước",
      type: "task",
    },
  ],
  4: [
    {
      id: 11,
      user: "Phạm Thị D",
      userAvatar: "PTD",
      action: "đã phê duyệt yêu cầu nghỉ phép của",
      target: "Nguyễn Văn A",
      time: "1 giờ trước",
      type: "other",
    },
    {
      id: 12,
      user: "Lý Văn I",
      userAvatar: "LVI",
      action: "đã cập nhật thông tin nhân viên",
      target: "Trần Thị B",
      time: "3 giờ trước",
      type: "other",
    },
  ],
}

const typeColors: Record<string, string> = {
  sale: "bg-green-500",
  customer: "bg-blue-500",
  task: "bg-purple-500",
  meeting: "bg-yellow-500",
  other: "bg-gray-500",
}

type DepartmentActivitiesProps = {
  departmentId: number
}

export default function DepartmentActivities({ departmentId }: DepartmentActivitiesProps) {
  const activities = departmentActivities[departmentId] || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
        <CardDescription>Các hoạt động gần đây của phòng ban</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="relative mr-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={`/placeholder.svg?height=36&width=36&text=${activity.userAvatar}`}
                    alt={activity.user}
                  />
                  <AvatarFallback>{activity.userAvatar}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                    typeColors[activity.type]
                  }`}
                />
              </div>
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
      </CardContent>
    </Card>
  )
}
