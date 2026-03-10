import AdminModal from './AdminModal'
import Button from '../ui/Button'

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirm delete',
  message = 'Are you sure you want to delete this item?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false
}) {
  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={title}
      subtitle=""
      size="sm"
    >
      <div className="space-y-6">
        <p className="text-slate-600 leading-7">{message}</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Button
            variant="secondary"
            className="w-full sm:w-auto justify-center"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            className="w-full sm:w-auto justify-center bg-red-600 hover:bg-red-700 shadow-none"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting...' : confirmText}
          </Button>
        </div>
      </div>
    </AdminModal>
  )
}