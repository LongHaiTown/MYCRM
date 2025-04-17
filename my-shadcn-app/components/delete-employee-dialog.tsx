"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type DeleteEmployeeDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => Promise<void>
  employeeName: string
}

export default function DeleteEmployeeDialog({
  open,
  onOpenChange,
  onConfirm,
  employeeName,
}: DeleteEmployeeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa nhân viên</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa nhân viên <span className="font-semibold">{employeeName}</span>? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 