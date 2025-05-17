"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Hammer, Search, Phone, User, Send, Settings } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [logoSrc, setLogoSrc] = useState<string | null>(null)
  const [logoSize, setLogoSize] = useState<number>(100)

  useEffect(() => {
    // Verificar se há um logo salvo no localStorage
    const savedLogo = localStorage.getItem("tapronto-logo")
    if (savedLogo) {
      setLogoSrc(savedLogo)
    }

    // Verificar se há um tamanho de logo salvo
    const savedSize = localStorage.getItem("tapronto-logo-size")
    if (savedSize) {
      setLogoSize(Number.parseInt(savedSize))
    }
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Cabeçalho */}
      <header className="text-white py-6 px-4 md:py-8 relative" style={{ backgroundColor: 'rgb(249, 164, 53)' }}>
        <Link href="/admin" className="absolute top-4 right-4 text-white/80 hover:text-white" title="Configurações">
          <Settings size={20} />
        </Link>
        <div className="container mx-auto flex flex-col items-center">
          {/* Área para o logo */}
          <div className="h-28 mb-4 flex items-center justify-center">
            {logoSrc ? (
              <img
                src={logoSrc || "/placeholder.svg"}
                alt="Tá Pronto Logo"
                className="object-contain"
                style={{
                  maxWidth: `${logoSize * 2.4}px`,
                  maxHeight: `${logoSize}px`,
                }}
              />
            ) : (
              <div className="text-white text-sm">Seu Logo Aqui</div>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-center">Tá Pronto</h1>
          <p className="text-center mt-2 max-w-2xl mx-auto">Conectando quem precisa com quem faz na sua cidade</p>
        </div>
      </header>

      {/* Explicação principal */}
      <section className="py-8 px-4 container mx-auto">
        <div className="max-w-3xl mx-auto bg-white-dark p-6 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-4 text-black">
            Quem somos
          </h2>
          <p className="text-center text-black">
Somos um grupo que acredita na potência do trabalho local. Desenvolvemos esta plataforma para conectar quem necessita de um serviço de alta qualidade aos profissionais que realmente dominam a sua área de atuação. Aqui, é possível encontrar e estabelecer conexões com eletricistas, pedreiros, pintores, marceneiros, encanadores e outros profissionais da sua área, sem complicações. Nossa meta é simplificar a rotina diária, valorizando a competência e a segurança dos serviços prestados perto de você.
          </p>
        </div>
      </section>

      {/* Formulários */}
      <section className="py-6 px-4 container mx-auto mb-12">
        <Tabs defaultValue="preciso" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white-dark">
            <TabsTrigger
              value="preciso"
              className="text-base py-3 data-[state=active]:bg-blue data-[state=active]:text-white"
            >
              <Search className="mr-2 h-4 w-4" />
              Preciso de um serviço
            </TabsTrigger>
            <TabsTrigger
              value="ofereco"
              className="text-base py-3 data-[state=active]:bg-orange data-[state=active]:text-white"
            >
              <Hammer className="mr-2 h-4 w-4" />
              Ofereço serviços
            </TabsTrigger>
          </TabsList>

          {/* Formulário para quem precisa de serviço */}
          <TabsContent value="preciso">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-6 text-black">Preencha os dados para encontrar um profissional</h3>

              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nome-cliente" className="text-black">
                    Nome completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="nome-cliente" placeholder="Seu nome" className="pl-10 border-gray-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone-cliente" className="text-black">
                    Telefone / WhatsApp
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="telefone-cliente" placeholder="(00) 00000-0000" className="pl-10 border-gray-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade-cliente" className="text-black">
                    Cidade
                  </Label>
                  <Select defaultValue="pontagrossa">
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Selecione a cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pontagrossa">Ponta Grossa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bairro-cliente" className="text-black">
                    Bairro
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      const outroInput = document.getElementById("outro-bairro-cliente")
                      if (outroInput) {
                        outroInput.style.display = value === "outro" ? "block" : "none"
                      }
                    }}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Selecione o bairro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="centro">Centro</SelectItem>
                      <SelectItem value="uvaranas">Uvaranas</SelectItem>
                      <SelectItem value="oficinas">Oficinas</SelectItem>
                      <SelectItem value="nova_russia">Nova Rússia</SelectItem>
                      <SelectItem value="contorno">Contorno</SelectItem>
                      <SelectItem value="jardim_carvalho">Jardim Carvalho</SelectItem>
                      <SelectItem value="neves">Neves</SelectItem>
                      <SelectItem value="boa_vista">Boa Vista</SelectItem>
                      <SelectItem value="chapada">Chapada</SelectItem>
                      <SelectItem value="colonia_dona_luiza">Colônia Dona Luiza</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <div id="outro-bairro-cliente" style={{ display: "none" }} className="mt-2">
                    <Input placeholder="Digite o nome do bairro" className="border-gray-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao-servico" className="text-black">
                    Descreva o que você precisa
                  </Label>
                  <Textarea
                    id="descricao-servico"
                    placeholder="Explique qual serviço você precisa, quando precisa e outras informações importantes..."
                    rows={4}
                    className="border-gray-300"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue hover:bg-blue/90">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar solicitação
                </Button>
              </form>
            </div>
          </TabsContent>

          {/* Formulário para quem oferece serviço */}
          <TabsContent value="ofereco">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-6 text-black">Cadastre-se como profissional</h3>

              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nome-profissional" className="text-black">
                    Nome completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="nome-profissional" placeholder="Seu nome" className="pl-10 border-gray-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone-profissional" className="text-black">
                    Telefone / WhatsApp
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="telefone-profissional" placeholder="(00) 00000-0000" className="pl-10 border-gray-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade-profissional" className="text-black">
                    Cidade
                  </Label>
                  <Select defaultValue="pontagrossa">
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Selecione a cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pontagrossa">Ponta Grossa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bairro-profissional" className="text-black">
                    Bairro onde atende
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      const outroInput = document.getElementById("outro-bairro-profissional")
                      if (outroInput) {
                        outroInput.style.display = value === "outro" ? "block" : "none"
                      }
                    }}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Selecione o bairro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="centro">Centro</SelectItem>
                      <SelectItem value="uvaranas">Uvaranas</SelectItem>
                      <SelectItem value="oficinas">Oficinas</SelectItem>
                      <SelectItem value="nova_russia">Nova Rússia</SelectItem>
                      <SelectItem value="contorno">Contorno</SelectItem>
                      <SelectItem value="jardim_carvalho">Jardim Carvalho</SelectItem>
                      <SelectItem value="neves">Neves</SelectItem>
                      <SelectItem value="boa_vista">Boa Vista</SelectItem>
                      <SelectItem value="chapada">Chapada</SelectItem>
                      <SelectItem value="colonia_dona_luiza">Colônia Dona Luiza</SelectItem>
                      <SelectItem value="todos">Todos os bairros</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <div id="outro-bairro-profissional" style={{ display: "none" }} className="mt-2">
                    <Input placeholder="Digite o nome do bairro" className="border-gray-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo-servico" className="text-black">
                    Que tipo de serviço você faz?
                  </Label>
                  <Select>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eletricista">Eletricista</SelectItem>
                      <SelectItem value="marceneiro">Marceneiro</SelectItem>
                      <SelectItem value="pedreiro">Pedreiro</SelectItem>
                      <SelectItem value="pintor">Pintor</SelectItem>
                      <SelectItem value="encanador">Encanador</SelectItem>
                      <SelectItem value="montador">Montador de Móveis</SelectItem>
                      <SelectItem value="jardineiro">Jardineiro</SelectItem>
                      <SelectItem value="diarista">Diarista</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full bg-orange hover:bg-orange/90">
                  <Send className="mr-2 h-4 w-4" />
                  Cadastrar meus serviços
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Rodapé */}
      <footer className="bg-white-dark py-6 px-4 border-t">
        <div className="container mx-auto text-center text-black text-sm">
          <p>© {new Date().getFullYear()} Tá Pronto - Todos os direitos reservados</p>
          <p className="mt-2">Conectando quem precisa com quem faz</p>
        </div>
      </footer>
    </main>
  )
}
