import { Button } from '@/components/ui/button'
import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Edit } from 'lucide-react'
import { Badge } from '@/components/ui/badge'


const CourseTable = () => {
  const {data, isLoading} = useGetCreatorCourseQuery()
  const navigate = useNavigate();

  if(isLoading) return <LoadingSpinner />

  return (
    <div>
      <Button onClick={() => navigate(`create`)}>Create a New Course</Button>
       <Table>
      <TableCaption>A list of your recent courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.courses.map((course) => (
          <TableRow key={course._id}>
            <TableCell>{course.courseTitle}</TableCell>
            <TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
            <TableCell><Badge> {course.isPublished ? "Published" : "Draft"}</Badge></TableCell>
            <TableCell className="text-right">
              <Button size='sm' variant='outline' onClick={() => navigate(`${course._id}`)}><Edit /></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>  
    </div>
  )
}

export default CourseTable
