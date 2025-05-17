"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

export default function LogoResizer({ logoSrc }: { logoSrc: string }) {
  const [size, setSize] = useState(100)
  const [savedSize, setSavedSize] = useState(100)

  useEffect(() => {
    // Carregar o tamanho salvo do localStorage
    const savedLogoSize = localStorage.getItem("tapronto-logo-size")
    if (savedLogoSize) {
      const parsedSize = Number.parseInt(savedLogoSize)
      setSize(parsedSize)
      setSavedSize(parsedSize)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("tapronto-logo-size", size.toString())
    setSavedSize(size)
  }

  return (
    <div className="space-y-4">
      <div className="bg-orange p-4 rounded-md flex items-center justify-center" style={{ height: "120px" }}>
        {logoSrc ? (
          <img
            src={logoSrc || "/placeholder.svg"}
            alt="Logo Preview"
            style={{
              maxWidth: `${size * 2.4}px`,
              maxHeight: `${size}px`,
            }}
            className="object-contain"
          />
        ) : (
          <div className="text-white">Nenhum logo carregado</div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="logo-size" className="text-black">
            Tamanho do Logo: {size}%
          </Label>
          <Button onClick={handleSave} size="sm" variant="outline" className="h-8">
            <Save className="h-4 w-4 mr-1" /> Salvar
          </Button>
        </div>
        <Slider
          id="logo-size"
          min={50}
          max={150}
          step={5}
          value={[size]}
          onValueChange={(values) => setSize(values[0])}
        />
        <p className="text-xs text-gray-500">Ajuste o tamanho do logo para que fique adequado ao cabeçalho do site.</p>
      </div>
    </div>
  )
}
