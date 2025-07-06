"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { User, Edit, Trash2, Shield, Plus, Search, Filter, UserCheck, UserX } from "lucide-react"
import { toast } from "sonner"
import EnhancedDataTable from "../components/EnhancedDataTable"

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: 'user' | 'admin' | 'super_admin'
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  const supabase = createClient()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error: any) {
      console.error("Error loading users:", error)
      toast.error("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq("id", userId)

      if (error) throw error
      
      toast.success("User role updated successfully")
      loadUsers()
    } catch (error: any) {
      console.error("Error updating user role:", error)
      toast.error("Failed to update user role")
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      // Note: In a real application, you might want to soft delete or archive users
      // instead of permanently deleting them
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId)

      if (error) throw error
      
      toast.success("User deleted successfully")
      loadUsers()
    } catch (error: any) {
      console.error("Error deleting user:", error)
      toast.error("Failed to delete user")
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const userColumns = [
    {
      key: "avatar",
      title: "",
      render: (value: any, row: UserProfile) => (
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      )
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
      render: (value: string, row: UserProfile) => (
        <div>
          <p className="font-medium text-neutral-900">{value}</p>
          {row.full_name && (
            <p className="text-sm text-neutral-600">{row.full_name}</p>
          )}
        </div>
      )
    },
    {
      key: "role",
      title: "Role",
      sortable: true,
      render: (value: string) => {
        const roleColors = {
          user: "bg-blue-100 text-blue-800",
          admin: "bg-green-100 text-green-800",
          super_admin: "bg-purple-100 text-purple-800"
        }
        const roleLabels = {
          user: "User",
          admin: "Admin",
          super_admin: "Super Admin"
        }
        return (
          <Badge className={`${roleColors[value as keyof typeof roleColors]} font-medium`}>
            {roleLabels[value as keyof typeof roleLabels]}
          </Badge>
        )
      }
    },
    {
      key: "created_at",
      title: "Joined",
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-neutral-600">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    },
    {
      key: "status",
      title: "Status",
      render: (value: any, row: UserProfile) => (
        <Badge className="bg-green-100 text-green-800">
          Active
        </Badge>
      )
    }
  ]

  const userActions = {
    edit: (user: UserProfile) => {
      setSelectedUser(user)
      setIsEditDialogOpen(true)
    },
    delete: (user: UserProfile) => {
      // This will be handled by the AlertDialog
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">User Management</h1>
          <p className="text-neutral-600 mt-2">Manage user accounts and permissions</p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Search users by email or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-neutral-500" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="admin">Admins</option>
                <option value="super_admin">Super Admins</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <EnhancedDataTable
        data={filteredUsers}
        columns={userColumns}
        title={`Users (${filteredUsers.length})`}
        searchPlaceholder="Search users..."
        actions={{
          edit: userActions.edit,
          delete: (user: UserProfile) => {
            // Custom delete action with confirmation
          }
        }}
      />

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input value={selectedUser.email} disabled />
              </div>
              <div>
                <Label>Full Name</Label>
                <Input 
                  value={selectedUser.full_name || ""} 
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label>Role</Label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => updateUserRole(selectedUser.id, e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditDialogOpen(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input placeholder="Enter email address" />
            </div>
            <div>
              <Label>Full Name</Label>
              <Input placeholder="Enter full name" />
            </div>
            <div>
              <Label>Role</Label>
              <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Create User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}