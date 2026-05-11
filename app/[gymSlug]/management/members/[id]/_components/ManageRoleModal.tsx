'use client'

import { useActionState } from "react"

// components
import { Modal } from "@/app/components/ui/Modal"
import { manageRoleAction, RoleUpdateResponse } from "@/app/actions/management/managerole"

type Props = {
  isOpen: boolean
  onClose: () => void
  membershipId: string
}

const initialState: RoleUpdateResponse = {}

export default function ManageRoleModal({ isOpen, onClose, membershipId }: Props) {
  const [state, formAction, isPending] = useActionState(manageRoleAction, initialState)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Role Management"}>
      <form action={formAction} className="form-basic">
        <input type="hidden" name="membershipId" value={membershipId} />

        <label className="flex flex-col gap-2">
          <span>Select new role</span>
          <select name="newRole">
            <option value="member">Member</option>
            <option value="staff">Staff</option>
          </select>
        </label>

        {state.error && <p className="text-red-500">{state.error}</p>}
        {state.success && <p className="text-green-500">Sucessfully changed role.</p>}

        <button type="submit" disabled={isPending}>{isPending ? 'Updating role...' : 'Update role'}</button>
      </form>
    </Modal>
  )
}