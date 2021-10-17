import * as React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import AllTopicTable from '../../components/tables/AllTopicTable/AllTopicTable'

export default function Topics() {
  return (
    <AdminLayout>
      <div>
        <AllTopicTable />
      </div>
    </AdminLayout>
  )
}
