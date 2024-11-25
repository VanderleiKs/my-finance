'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/app/_components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/app/_components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/_components/ui/select'

// Simulated data for cafes
const cafes = [
    { id: 1, name: 'Café Aroma' },
    { id: 2, name: 'Expresso Delícia' },
    { id: 3, name: 'Grão Perfeito' },
]

export default function QRCodeGenerator() {
    const [selectedCafe, setSelectedCafe] = useState<string | undefined>()
    const [qrValue, setQrValue] = useState('')
    const [color, setColor] = useState('#fff')

    useEffect(() => {
        if (selectedCafe) {
            setQrValue(`https://seucafe.com/login?cafe=${selectedCafe}`)
        }
    }, [selectedCafe])

    const handleDownload = () => {
        const svg = document.getElementById('qr-code')
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg)
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const img = new Image()
            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx?.drawImage(img, 0, 0)
                const pngFile = canvas.toDataURL('image/png')
                const downloadLink = document.createElement('a')
                downloadLink.download = `qr-code-${selectedCafe}.png`
                downloadLink.href = pngFile
                downloadLink.click()
            }
            img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <input
                type="color"
                onChange={(color) => setColor(color.target.value)}
            />
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Gerador de QR Code para Cafés</CardTitle>
                    <CardDescription>
                        Selecione um café para gerar seu QR code único
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Select onValueChange={setSelectedCafe}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um café" />
                        </SelectTrigger>
                        <SelectContent>
                            {cafes.map((cafe) => (
                                <SelectItem
                                    key={cafe.id}
                                    value={cafe.id.toString()}>
                                    {cafe.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {qrValue && (
                        <div className="flex justify-center">
                            <QRCodeSVG
                                id="qr-code"
                                fgColor={color}
                                bgColor="#000"
                                value={qrValue}
                                size={200}
                            />
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={handleDownload} disabled={!qrValue}>
                        Baixar QR Code
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
