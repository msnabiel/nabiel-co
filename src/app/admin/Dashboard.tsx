"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Package, TrendingUp, DollarSign, Search, Filter, MoreVertical, Eye, Download, RefreshCw } from "lucide-react"

interface Order {
  id: number
  name: string
  email: string
  total: number
  status: string
  created_at: string
  items?: any[]
  phone?: string
  address?: string
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (error) {
      toast.error("Failed to fetch orders")
    } else {
      setOrders(data || [])
    }
    setLoading(false)
  }

  const refreshOrders = async () => {
    setRefreshing(true)
    await fetchOrders()
    setRefreshing(false)
    toast.success("Orders refreshed")
  }

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
    
    if (error) {
      toast.error("Update failed")
    } else {
      toast.success("Status updated")
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      )
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-amber-50 text-amber-600 border-amber-200"
      case "processing": return "bg-blue-50 text-blue-600 border-blue-200"
      case "shipped": return "bg-purple-50 text-purple-600 border-purple-200"
      case "delivered": return "bg-emerald-50 text-emerald-600 border-emerald-200"
      case "cancelled": return "bg-red-50 text-red-600 border-red-200"
      default: return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "⏳"
      case "processing": return "⚙️"
      case "shipped": return "🚚"
      case "delivered": return "✅"
      case "cancelled": return "❌"
      default: return "📦"
    }
  }

  const filtered = orders.filter((order) => {
    const matchesSearch = order.email.toLowerCase().includes(search.toLowerCase()) ||
                         order.name.toLowerCase().includes(search.toLowerCase()) ||
                         order.id.toString().includes(search)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter(o => o.status === "pending").length,
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
              <p className="text-sm text-gray-500 mt-1">{filtered.length} orders</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshOrders}
                disabled={refreshing}
                className="h-8"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="h-8"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
                <p className="text-xs text-gray-500">Total orders</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl font-semibold text-gray-900">₹{(stats.totalRevenue / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500">Revenue</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingOrders}</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white border-gray-200 h-10"
            />
          </div>
          
          {showFilters && (
            <div className="animate-in slide-in-from-top-2 duration-200">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white border-gray-200 h-10">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 pb-6">
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((order) => (
              <Card key={order.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">#{order.id}</span>
                        <Badge className={`text-xs px-2 py-1 border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)} {order.status}
                        </Badge>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-1 truncate">{order.name}</h3>
                      <p className="text-sm text-gray-500 truncate mb-2">{order.email}</p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-gray-900">₹{order.total.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Select onValueChange={(status) => updateStatus(order.id, status)}>
                        <SelectTrigger className="w-8 h-8 p-0 border-0">
                          <MoreVertical className="w-4 h-4" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectItem value="pending">Mark as Pending</SelectItem>
                          <SelectItem value="processing">Mark as Processing</SelectItem>
                          <SelectItem value="shipped">Mark as Shipped</SelectItem>
                          <SelectItem value="delivered">Mark as Delivered</SelectItem>
                          <SelectItem value="cancelled">Mark as Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white rounded-t-3xl sm:rounded-lg w-full sm:max-w-lg sm:mx-4 max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Order #{selectedOrder.id}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                  className="h-8 w-8 p-0"
                >
                  ✕
                </Button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="space-y-6">
                {/* Status */}
                <div className="text-center">
                  <Badge className={`text-sm px-3 py-1 border ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)} {selectedOrder.status}
                  </Badge>
                </div>
                
                {/* Customer Info */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Customer</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Name:</span> {selectedOrder.name}</p>
                    <p><span className="text-gray-500">Email:</span> {selectedOrder.email}</p>
                    {selectedOrder.phone && (
                      <p><span className="text-gray-500">Phone:</span> {selectedOrder.phone}</p>
                    )}
                    {selectedOrder.address && (
                      <p><span className="text-gray-500">Address:</span> {selectedOrder.address}</p>
                    )}
                  </div>
                </div>
                
                {/* Order Info */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Order Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total:</span>
                      <span className="font-semibold">₹{selectedOrder.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span>{new Date(selectedOrder.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span>{new Date(selectedOrder.created_at).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Items */}
                {selectedOrder.items && selectedOrder.items.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Items</h3>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quick Actions */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(selectedOrder.id, "shipped")}
                      className="h-10"
                    >
                      🚚 Ship Order
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(selectedOrder.id, "delivered")}
                      className="h-10"
                    >
                      ✅ Delivered
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}