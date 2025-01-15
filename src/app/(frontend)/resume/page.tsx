'use client'
import { Button, Resume } from "@/components";

export default function ResumePage() {

  const handleDownload = () => {
    console.log("download")
  }

  return (
    <div>
      <Button onClick={handleDownload}>Descargar</Button>
      <Resume />
    </div>
  )
}