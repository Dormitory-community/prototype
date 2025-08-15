"use client"

import type React from "react"
import { useRef } from "react"
import { Box, Button, IconButton, Stack, Typography, useTheme } from "@mui/material"
import { CameraAlt, Delete, Image as ImageIcon } from "@mui/icons-material"

interface ImageUploadProps {
    images: string[]
    onImagesChange: (images: string[]) => void
    maxImages?: number
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImagesChange, maxImages = 5 }) => {
    const theme = useTheme()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return

        const newImages: string[] = []
        const remainingSlots = maxImages - images.length

        Array.from(files)
            .slice(0, remainingSlots)
            .forEach((file) => {
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        if (e.target?.result) {
                            newImages.push(e.target.result as string)
                            if (newImages.length === Math.min(files.length, remainingSlots)) {
                                onImagesChange([...images, ...newImages])
                            }
                        }
                    }
                    reader.readAsDataURL(file)
                }
            })

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index)
        onImagesChange(newImages)
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                사진 첨부 ({images.length}/{maxImages})
            </Typography>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleFileSelect}
            />

            <Stack direction="row" spacing={2} flexWrap="wrap" mb={2}>
                {images.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            width: 120,
                            height: 120,
                            borderRadius: 2,
                            overflow: "hidden",
                            border: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <img
                            src={image || "/placeholder.svg"}
                            alt={`업로드된 이미지 ${index + 1}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                        <IconButton
                            onClick={() => handleRemoveImage(index)}
                            sx={{
                                position: "absolute",
                                top: 4,
                                right: 4,
                                bgcolor: "rgba(0, 0, 0, 0.6)",
                                color: "white",
                                width: 24,
                                height: 24,
                                "&:hover": {
                                    bgcolor: "rgba(0, 0, 0, 0.8)",
                                },
                            }}
                        >
                            <Delete sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Box>
                ))}
            </Stack>

            {images.length < maxImages && (
                <Button
                    variant="outlined"
                    startIcon={<CameraAlt />}
                    onClick={handleUploadClick}
                    sx={{
                        borderRadius: theme.shape.borderRadius,
                        textTransform: "none",
                    }}
                >
                    사진 추가 ({maxImages - images.length}장 더 가능)
                </Button>
            )}

            {images.length === 0 && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 120,
                        border: `2px dashed ${theme.palette.divider}`,
                        borderRadius: 2,
                        bgcolor: theme.palette.grey[50],
                        cursor: "pointer",
                    }}
                    onClick={handleUploadClick}
                >
                    <ImageIcon sx={{ fontSize: 40, color: theme.palette.grey[400], mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        클릭하여 사진을 추가하세요
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default ImageUpload
