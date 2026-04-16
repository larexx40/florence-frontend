import { useState, useRef } from "react"
import { Upload, Link, X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  value: string | File | null
  onChange: (value: string | File | null) => void
  preview?: string | null
}

export default function ImageUpload({ value, onChange, preview }: ImageUploadProps) {
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file")
  const [urlInput, setUrlInput] = useState<string>(typeof value === "string" ? value : "")
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0])
    }
  }

  const handleUrlChange = (url: string) => {
    setUrlInput(url)
    onChange(url)
  }

  const clearImage = () => {
    onChange(null)
    setUrlInput("")
  }

  const getPreviewUrl = () => {
    if (preview) return preview
    if (value instanceof File) return URL.createObjectURL(value)
    if (typeof value === "string" && value) return value
    return null
  }

  const previewUrl = getPreviewUrl()

  return (
    <div className="space-y-3">
      {/* Toggle Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setUploadMode("file")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            uploadMode === "file"
              ? "bg-cblue-600 text-white"
              : "bg-cgrey-100 text-cdark-600 hover:bg-cgrey-200"
          }`}
        >
          <Upload size={16} />
          File Upload
        </button>
        <button
          type="button"
          onClick={() => setUploadMode("url")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            uploadMode === "url"
              ? "bg-cblue-600 text-white"
              : "bg-cgrey-100 text-cdark-600 hover:bg-cgrey-200"
          }`}
        >
          <Link size={16} />
          Image URL
        </button>
      </div>

      {/* File Upload Mode */}
      {uploadMode === "file" && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
            dragActive
              ? "border-cblue-500 bg-cblue-50"
              : "border-cdark-200 hover:border-cblue-400"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {value instanceof File || previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl || ""}
                alt="Preview"
                className="max-h-32 mx-auto rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  clearImage()
                }}
                className="absolute -top-2 -right-2 p-1 bg-error-500 text-white rounded-full hover:bg-error-600"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-10 w-10 text-cdark-400" />
              <p className="mt-2 text-sm text-cdark-600">
                Drag & drop an image here, or click to select
              </p>
              <p className="text-xs text-cdark-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>
      )}

      {/* URL Input Mode */}
      {uploadMode === "url" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
            />
            {urlInput && (
              <button
                type="button"
                onClick={clearImage}
                className="p-2 text-cdark-500 hover:text-error-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
          {urlInput && (
            <div className="relative">
              <img
                src={urlInput}
                alt="Preview"
                className="max-h-32 rounded-lg object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none"
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Current Value Display */}
      {value && (
        <div className="flex items-center gap-2 p-2 bg-cgrey-50 rounded-lg">
          <ImageIcon size={16} className="text-cblue-600" />
          <span className="text-sm text-cdark-600 truncate flex-1">
            {value instanceof File ? value.name : typeof value === "string" ? value : "No image"}
          </span>
        </div>
      )}
    </div>
  )
}
