"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Hammer,
  Search,
  Phone,
  User,
  Send,
  Settings,
} from "lucide-react"
import Link from "next/link"
// Importar logo como caminho (se for Next.js e está na pasta public)
const LogoPath = "/Logo.png"

export default function Home() {
  const [logoSrc, setLogoSrc] = useState<string | null>(null)
  const [logoSize, setLogoSize] = useState<number>(100)

  // Estados para formulário "Preciso de um serviço"
  const [nomeCliente, setNomeCliente] = useState("")
  const [telefoneCliente, setTelefoneCliente] = useState("")
  const [cidadeCliente, setCidadeCliente] = useState("Ponta Grossa")
  const [bairroCliente, setBairroCliente] = useState("")
  const [outroBairroCliente, setOutroBairroCliente] = useState("")
  const [descricaoServico, setDescricaoServico] = useState("")

  const [nomeProfissional, setNomeProfissional] = useState("")
  const [telefoneProfissional, setTelefoneProfissional] = useState("")
  const [tipoServico, setTipoServico] = useState("")
  const [descricaoHabilidades, setDescricaoHabilidades] = useState("")
  const [bairroFuncionario, setBairroFuncionario] = useState("")
  const [cidadeFuncionario, setCidadeFuncionario] = useState("")
  const [outroBairroFuncionario, setOutroBairroFuncionario] = useState("")

  useEffect(() => {
    // Pega logo salva no localStorage, se houver
    const savedLogo = localStorage.getItem("tapronto-logo")
    if (savedLogo) {
      setLogoSrc(savedLogo)
    } else {
      setLogoSrc(LogoPath) // Usa a logo padrão da pasta public
    }

    // Pega tamanho salvo no localStorage
    const savedSize = localStorage.getItem("tapronto-logo-size")
    if (savedSize) {
      setLogoSize(Number.parseInt(savedSize))
    }
  }, [])

  // Handler do envio do formulário "Preciso de um serviço"
  const handleEnviarSolicitacao = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Usa o bairro selecionado, se for "outro" usa o outroBairroCliente
    const bairroFinal =
      bairroCliente === "outro" ? outroBairroCliente.trim() : bairroCliente

    if (!nomeCliente.trim() || !telefoneCliente.trim() || !descricaoServico.trim() || !bairroFinal) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    const numeroWhats = "5542999277206" // Troque para seu número no formato internacional (DD+Número sem + ou espaços)

    // Monta a mensagem para WhatsApp
    const mensagem = 
      `Olá, meu nome é ${nomeCliente}.\n` +
      `Preciso do seguinte serviço: ${descricaoServico}.\n` +
      `Cidade: ${cidadeCliente}\n` +
      `Bairro: ${bairroFinal}\n` +
      `Telefone para contato: ${telefoneCliente}`

    // Codifica a mensagem para a URL
    const urlWhats = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`

    // Abre o WhatsApp numa nova aba
    window.open(urlWhats, "_blank")
  }

  // Handler do envio do formulário "Ofereço serviços"
  const handleEnviarCadastro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!nomeProfissional.trim() || !telefoneProfissional.trim() || !tipoServico || !descricaoHabilidades.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    const numeroWhats = "5542999277206" // Use o mesmo número ou outro se necessário

    // Monta a mensagem para WhatsApp
    const mensagem = 
      `Olá, meu nome é ${nomeProfissional}.\n` +
      `Gostaria de me cadastrar como profissional.\n` +
      `Tipo de serviço: ${tipoServico}\n` +
      `Minhas habilidades: ${descricaoHabilidades}\n` +
      `Cidade: ${cidadeFuncionario}\n` +
      `Telefone para contato: ${telefoneProfissional}`

    // Codifica a mensagem para a URL
    const urlWhats = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`

    // Abre o WhatsApp numa nova aba
    window.open(urlWhats, "_blank")
  }

  // Função para controlar a exibição do input "Outro bairro"
  const handleChangeBairro = (value: string) => {
    setBairroCliente(value)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Cabeçalho */}
      <header
        className="text-white py-6 px-4 md:py-8 relative"
        style={{ backgroundColor: "rgb(36, 36, 43)" }}
      >
        <div className="container mx-auto flex flex-col items-center">
          {/* Área para o logo */}
          <div className="h-28 mb-4 flex items-center justify-center">
            {logoSrc ? (
              <img
                src={logoSrc}
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
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Tá Pronto
          </h1>
          <p className="text-center mt-2 max-w-2xl mx-auto">
            Conectando quem precisa com quem faz.
          </p>
        </div>
      </header>

      {/* Explicação principal */}
      <section className="py-8 px-4 container mx-auto">
        <div className="max-w-3xl mx-auto bg-white-dark p-6 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-4 text-black">
            Quem somos
          </h2>
          <p className="text-center text-black">
            Somos um grupo que acredita na potência do trabalho local.
            Desenvolvemos esta plataforma para conectar quem necessita de um
            serviço de alta qualidade aos profissionais que realmente dominam a
            sua área de atuação. Aqui, é possível encontrar e estabelecer
            conexões com eletricistas, pedreiros, pintores, marceneiros,
            encanadores e outros profissionais da sua área, sem complicações.
            Nossa meta é simplificar a rotina diária, valorizando a competência
            e a segurança dos serviços prestados perto de você.
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
              <h3 className="text-lg font-medium mb-6 text-black">
                Preencha os dados para encontrar um profissional
              </h3>

              <form className="space-y-6" onSubmit={handleEnviarSolicitacao}>
                <div className="space-y-2">
                  <Label htmlFor="nome-cliente" className="text-black">
                    Nome completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="nome-cliente"
                      placeholder="Seu nome"
                      className="pl-10 border-gray-300"
                      value={nomeCliente}
                      onChange={(e) => setNomeCliente(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone-cliente" className="text-black">
                    Telefone / WhatsApp
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="telefone-cliente"
                      placeholder="(00) 00000-0000"
                      className="pl-10 border-gray-300"
                      value={telefoneCliente}
                      onChange={(e) => setTelefoneCliente(e.target.value)}
                      required
                      type="tel"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade-cliente" className="text-black">
                    Cidade
                  </Label>
                  <Select
                    value={cidadeCliente}
                    onValueChange={(value) => {
                      setCidadeCliente(value)
                      setBairroCliente("") // Resetar bairro ao mudar de cidade
                    }}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Selecione a cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ponta Grossa">Ponta Grossa</SelectItem>
                      <SelectItem value="São Paulo">São Paulo</SelectItem>
                      <SelectItem value="Curitiba">Curitiba</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bairro-cliente" className="text-black">
                    Bairro
                  </Label>
                  <Select
                    value={bairroCliente}
                    onValueChange={(value) => {
                      handleChangeBairro(value)
                    }}
                  >

                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Selecione o bairro" />
                </SelectTrigger>
                <SelectContent>
                  {cidadeCliente === "Ponta Grossa" ? (
                    <>
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
                    </>
                  ) : cidadeCliente === "São Paulo" ? (
                    <>
                      <SelectItem value="moema">Moema</SelectItem>
                      <SelectItem value="pinheiros">Pinheiros</SelectItem>
                      <SelectItem value="vila_madalena">Vila Madalena</SelectItem>
                      <SelectItem value="tatuape">Tatuapé</SelectItem>
                      <SelectItem value="itaquera">Itaquera</SelectItem>
                      <SelectItem value="lapa">Lapa</SelectItem>
                      <SelectItem value="santana">Santana</SelectItem>
                      <SelectItem value="morumbi">Morumbi</SelectItem>
                      <SelectItem value="perdizes">Perdizes</SelectItem>
                      <SelectItem value="bela_vista">Bela Vista</SelectItem>
                    </>
                  ) : cidadeCliente === "Curitiba" ? (
                    <>
                      <SelectItem value="batel">Batel</SelectItem>
                      <SelectItem value="agua_verde">Água Verde</SelectItem>
                      <SelectItem value="centro">Centro</SelectItem>
                      <SelectItem value="santa_felicidade">Santa Felicidade</SelectItem>
                      <SelectItem value="boqueirao">Boqueirão</SelectItem>
                      <SelectItem value="cic">CIC</SelectItem>
                      <SelectItem value="pinheirinho">Pinheirinho</SelectItem>
                      <SelectItem value="capao_raso">Capão Raso</SelectItem>
                      <SelectItem value="cabral">Cabral</SelectItem>
                      <SelectItem value="bairro_alto">Bairro Alto</SelectItem>
                    </>
                  ) : null}
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>

                  </Select>
                  {bairroCliente === "outro" && (
                    <div className="mt-2">
                      <Input
                        placeholder="Digite o nome do bairro"
                        className="border-gray-300"
                        value={outroBairroCliente}
                        onChange={(e) => setOutroBairroCliente(e.target.value)}
                        required
                      />
                    </div>
                  )}
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
                    value={descricaoServico}
                    onChange={(e) => setDescricaoServico(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-blue hover:bg-blue/90 text-white">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar solicitação
                </Button>
              </form>
            </div>
          </TabsContent>

          {/* Formulário para quem oferece serviço */}
          <TabsContent value="ofereco">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-6 text-black">
                Cadastre-se como profissional
              </h3>

              <form className="space-y-6" onSubmit={handleEnviarCadastro}>
                <div className="space-y-2">
                  <Label htmlFor="nome-profissional" className="text-black">
                    Nome completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="nome-profissional"
                      placeholder="Seu nome"
                      className="pl-10 border-gray-300"
                      value={nomeProfissional}
                      onChange={(e) => setNomeProfissional(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone-profissional" className="text-black">
                    Telefone / WhatsApp
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="telefone-profissional"
                      placeholder="(00) 00000-0000"
                      className="pl-10 border-gray-300"
                      type="tel"
                      value={telefoneProfissional}
                      onChange={(e) => setTelefoneProfissional(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo-servico" className="text-black">
                    Tipo de serviço
                  </Label>
                  <Select
                    value={tipoServico}
                    onValueChange={(value) => setTipoServico(value)}
                    required
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Selecione o tipo de serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eletricista">Eletricista</SelectItem>
                      <SelectItem value="pedreiro">Pedreiro</SelectItem>
                      <SelectItem value="pintor">Pintor</SelectItem>
                      <SelectItem value="marceneiro">Marceneiro</SelectItem>
                      <SelectItem value="encanador">Encanador</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              <div className="space-y-2">
                  <Label htmlFor="cidade-cliente" className="text-black">
                    Cidade
                  </Label>
                  <Select
                    value={cidadeFuncionario}
                    onValueChange={(value) => {
                      setCidadeFuncionario(value)
                      setBairroFuncionario("") // Resetar bairro ao mudar de cidade
                    }}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Selecione a cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ponta Grossa">Ponta Grossa</SelectItem>
                      <SelectItem value="São Paulo">São Paulo</SelectItem>
                      <SelectItem value="Curitiba">Curitiba</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

             

                 
                <div className="space-y-2">
                  <Label htmlFor="descricao-habilidades" className="text-black">
                    Descreva suas habilidades e experiência
                  </Label>
                  <Textarea
                    id="descricao-habilidades"
                    placeholder="Conte um pouco sobre você e seus serviços"
                    rows={4}
                    className="border-gray-300"
                    value={descricaoHabilidades}
                    onChange={(e) => setDescricaoHabilidades(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-orange hover:bg-orange/90 text-white">
                  <Hammer className="mr-2 h-4 w-4" />
                  Enviar cadastro
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}