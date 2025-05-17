"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Check, AlertCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LogoResizer from "@/components/logo-resizer"
import Link from "next/link"

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [existingLogo, setExistingLogo] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se há um logo salvo no localStorage
    const savedLogo = localStorage.getItem("tapronto-logo")
    if (savedLogo) {
      setExistingLogo(savedLogo)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setError(null)

    if (selectedFile) {
      // Validar o tipo de arquivo
      if (!selectedFile.type.startsWith("image/")) {
        setError("Por favor, selecione um arquivo de imagem válido.")
        setFile(null)
        return
      }

      // Validar o tamanho do arquivo (máximo 2MB)
      if (selectedFile.size > 2 * 1024 * 1024) {
        setError("A imagem deve ter no máximo 2MB.")
        setFile(null)
        return
      }

      // Criar uma URL para preview
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      // Limpar a URL quando o componente for desmontado
      return () => URL.revokeObjectURL(objectUrl)
    } else {
      setPreview(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Por favor, selecione um arquivo para fazer upload.")
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Simular o upload (em um ambiente real, você enviaria para um servidor)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Salvar no localStorage para demonstração
      const reader = new FileReader()
      reader.onloadend = () => {
        localStorage.setItem("tapronto-logo", reader.result as string)
        setSuccess(true)
        setUploading(false)
        setExistingLogo(reader.result as string)

        // Definir um tamanho padrão para o logo
        localStorage.setItem("tapronto-logo-size", "100")

        // Redirecionar após 2 segundos
        setTimeout(() => {
          router.push("/admin")
          router.refresh()
        }, 2000)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setError("Ocorreu um erro ao fazer upload da imagem. Tente novamente.")
      setUploading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white-dark p-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-6 flex items-center">
          <Link href="/" className="text-black hover:text-orange flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para o site
          </Link>
          <h1 className="text-2xl font-bold text-black text-center flex-1">Painel de Administração</h1>
        </div>

        <Tabs defaultValue={existingLogo ? "adjust" : "upload"}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload">Upload de Logo</TabsTrigger>
            <TabsTrigger value="adjust" disabled={!existingLogo}>
              Ajustar Logo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Upload de Logo</CardTitle>
                <CardDescription>Faça upload do logo para o site Tá Pronto</CardDescription>
              </CardHeader>
              <CardContent>
                {success ? (
                  <Alert className="bg-green-50 border-green-200 mb-4">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Upload concluído!</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Seu logo foi adicionado com sucesso. Agora você pode ajustá-lo.
                    </AlertDescription>
                  </Alert>
                ) : error ? (
                  <Alert className="bg-red-50 border-red-200 mb-4">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertTitle className="text-red-800">Erro</AlertTitle>
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                ) : null}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo" className="text-black">
                      Selecione o arquivo de logo
                    </Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="border-gray-300"
                    />
                    <p className="text-xs text-gray-500">Formatos aceitos: PNG, JPG, SVG. Tamanho máximo: 2MB.</p>
                  </div>

                  {preview && (
                    <div className="mt-4">
                      <Label className="text-black mb-2 block">Preview:</Label>
                      <div className="bg-orange p-4 rounded border flex items-center justify-center h-32">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt="Preview do logo"
                          className="max-h-24 object-contain"
                          style={{ maxWidth: "240px", maxHeight: "100px" }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Dica: Como sua logo é 1024x1024, ela será redimensionada para se ajustar ao cabeçalho. Após o
                        upload, você poderá ajustar o tamanho.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleUpload}
                  disabled={!file || uploading || success}
                  className="w-full bg-orange hover:bg-orange/90"
                >
                  {uploading ? (
                    <>
                      <span className="animate-pulse mr-2">Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Fazer upload do logo
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="adjust">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Ajustar Logo</CardTitle>
                <CardDescription>Ajuste o tamanho do logo para melhor visualização</CardDescription>
              </CardHeader>
              <CardContent>{existingLogo && <LogoResizer logoSrc={existingLogo} />}</CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/")}>
                  Voltar para o site
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (confirm("Tem certeza que deseja remover o logo?")) {
                      localStorage.removeItem("tapronto-logo")
                      localStorage.removeItem("tapronto-logo-size")
                      setExistingLogo(null)
                      router.refresh()
                    }
                  }}
                >
                  Remover Logo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
