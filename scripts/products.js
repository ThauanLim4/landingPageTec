const hardwares = [
    [
        {
            id: 1,
            name: 'AISURIX Placa gráfica RX 5500 XT 8gb GDDR6, 128 bits,',
            price: 1183.90,
            img: '../components/imgProducts/pdv/rx5500xt.png',
            characteristics: `Marca: AISURIX <br>
            Modelo: RX 5500XT 8G <br>
            Interface do hardware: PCI Express x4 <br>
            Memória de vídeo: 8 GB <br>
            Tipo de memória de vídeo: GDDR6 <br>
            Interface da placa de vídeo: PCI Express <br>
            Peças para montagem: placa de vídeo <br>
            Interface de saída de vídeo: DisplayPort, HDMI <br>
            Potência em watts: 130 Watt-hours <br>
            Peso do produto: 939 g <br>
            Dimensões do produto: 23,93 x 9,5 x 4,04 cm; 939 g  <br>`
        },

        {
            id: 2,
            name: 'MSI GeForce GTX 1650 128-Bit HDMI/DP/DVI 4GB GDRR6',
            price: 939.00,
            img: '../components/imgProducts/pdv/gtx1650.png',
            characteristics: `
            Marca: MSI <br>
            Fabricante: MSI <br>
            Série: GTX 1650 D6 Ventus XS OCV3 <br>
            Cor: Preto <br>
            Altura do produto: 4,41 polegadas <br>
            Largura do produto: 1,65 polegadas
            Velocidade do relógio de memória: 12 GH <br>z
            Modelo de placa de vídeo: NVIDIA GeForce GTX 1650 <br>
            Marca do chipset de vídeo: NVIDIA <br>
            Tipo de memória de vídeo: GDDR6 <br>
            Memória de vídeo: 4 GB
            Interface da placa de vídeo: PCI-Express x16 <br>
            Voltagem: 90 <br>
            Peso do produto: 671 g <br>
            Dimensões do produto: 17,91 x 4,19 x 11,2 cm; 671 g <br> `
        },

        {
            id: 3,
            name: 'Placa de Vídeo Gigabyte - GeForce GTX 1660, 6GB GDDR5',
            price: 1772.70,
            img: '../components/imgProducts/pdv/gtx1660.png',
            characteristics: `
            Tamanho da memória RAM da placa gráfica: 6GB <br>
            Velocidade do clock da GPU: 1830 MHz <br>
            Marca: GIGABYTE <br>
            Cor: Preto <br>
            Altura do produto: 40 milímetros <br>
            Largura do produto: 28 centímetros <br>
            Velocidade do relógio de memória: 1830 MHz <br>
            Modelo de placa de vídeo: NVIDIA GeForce GTX 1660 <br>
            Marca do chipset de vídeo: GIGABYTE <br>
            Tipo de memória de vídeo: GDDR5 <br>
            Memória de vídeo: 6 <br>
            Interface da placa de vídeo: PCI Express <br>
            Potência em watts: 450 watts <br> `
        }
    ],

    [
        {
            id: 1,
            brand: 'intel',
            name: 'Processador Intel Core I5-12400F 2.5GHZ (Turbo 4.4GHZ) Cache 18MB 6 Núcleos 12 Threads 12ª Ger LGA 1700',
            price: 919.90,
            img: '../components/imgProducts/cpu/i5-12400f.png',
            characteristics: `
            Marca: Intel <br>
            Fabricante da CPU: Intel <br>
            Modelo da CPU: Intel Core i5-12400F <br>
            Velocidade da CPU: 2,5 GHz <br>
            Tipo de soquete do processador: LGA 1700 <br>
            Velocidade do processador: 2,5 GHz <br>
            Número de processadores: 6 <br>
            Tecnologia da memória: DDR <br>
            Tipo de Memória: GDDR4 <br>
            Velocidade do relógio de memória: 2,5 GHz <br>
            Entradas para memória: 1 <br>
            Potência em watts: 65 watts <br>
            Peso do produto: 300 g <br>
            Dimensões do produto: 3 x 4 x 1 cm; 300 g <br>
            `
        },
    
        {
            id: 2,
            brand: 'amd',
            name: 'Processador AMD Ryzen 5 5600G, 3.9GHz (4.4GHz Max Turbo), AM4, Vídeo Integrado, 6 Núcleos',
            price: 833.25,
            img: '../components/imgProducts/cpu/r5-5600g.png',
            characteristics: `
            Marca: AMD <br>
            Fabricante da CPU: AMD <br>
            Modelo da CPU: Ryzen 5 5600G <br>
            Velocidade do processador: 3,9 GHz <br>
            Soquete da CPU:	Socket AM4 <br>
            Formato: atx <br>
            Altura do produto: 6 milímetros <br>
            Largura do produto: 40 milímetros <br>
            Resolução: 7680 x 4320 <br>
            Número de núcleos: 6 <br>
            Tipo de memória de vídeo: GDDR6 <br>
            Interface da placa de vídeo: PCI Express <br>
            Etiqueta Nacional de Eficiência Energética (ENCE): 100% <br>
            Potência em watts: 65 watts <br>
            Peso do produto: 410 g <br>
            Dimensões do produto: 4 x 4 x 0,6 cm; 411,07 g <br>
            `
        },
    
        {
            id: 3,
            brand: 'amd',
            name: 'PROCESSADOR AMD RYZEN 7 5700X 3.4GHz (TURBO 4.6GHz) AM4, Cerâmica cinza ',
            price: 1129.90,
            img: '../components/imgProducts/cpu/r7-5700x.png',
            characteristics: `
            Marca: AMD <br>
            Fabricante da CPU: AMD <br>
            Modelo da CPU: Ryzen 7 <br>
            Velocidade da CPU: 3.4 GHz <br>
            Soquete da CPU: Socket AM4 <br>
            Tipo de soquete do processador: Socket AM4 <br>
            Número de núcleos: 8 <br>
            Tipo de Memória: DIMM <br>
            Potência em watts: 65 watts <br>
            Peso do produto: 1 g <br>
            Dimensões do produto: 4 x 4 x 0,6 cm; 1 g <br>
            `
        },
    ],

    [
        {
            id: 1,
            name: 'Placa Mãe Gigabyte A520M S2H DDR4, AMD, AM4',
            price: 579.90,
            img: '../components/imgProducts/mboard/a520h-s2.png',
            characteristics: `
            Marca: GIGABYTE <br>
            Fabricante: Gigabyte <br>
            Modelo: A520M S2H <br>
            Cor: preto <br>
            Formato: Micro ATX <br>
            Altura do produto: 35 milímetros <br>
            Largura do produto: 24,4 centímetros <br>
            Tipo de soquete do processador: Soquete AM4 <br>
            Número de processadores: 1 <br>
            Tecnologia da memória: DDR4 <br>
            Tipo de Memória: DDR4 SDRAM <br>
            Máximo de memória RAM compatível: 64 GB <br>
            Velocidade do clock de memória: 5000 MHz <br>
            Entradas para memórias RAM: 2 <br>
            Interface da placa de vídeo: PCI-Express x4 <br>
            Número de portas USB 2.0: 2 <br>
            Número de Conexões HDMI: 1 <br>
            Peso do produto: 460 g <br>
            Dimensões do produto: 20,5 x 24,4 x 3,5 cm; 460 g <br>
            `
        },
    
        {
            id: 2,
            name: 'Placa Mãe Gigabyte B450M DS3H V2',
            price: 588.00,
            img: '../components/imgProducts/mboard/B450M-DS3H-V2.png',
            characteristics: `
            Marca: GIGABYTE <br>
            Fabricante: Gigabyte <br>
            Número do modelo: B450M DS3H V2 <br> 
            Altura do produto: 40 milímetros <br>
            Largura do produto: 21,5 centímetros <br>
            Tipo de processador: AMD Athlon <br>
            Tipo de soquete do processador: Soquete AM4 <br>
            Tecnologia da memória: DDR4 <br>
            Velocidade do clock de memória: 3200 MHz <br>
            Entradas para memória RAM: 4 <br>
            Interface da placa de vídeo: PCI-Express x4 <br>
            Número de portas USB 2.0: 2 <br>
            Número de Conexões HDMI: 1 <br>
            Peso do produto: 510 g <br>
            Dimensões do produto: 24,4 x 21,5 x 4 cm; 510 g <br>
            Suporta AMD Ryzen série 5000 / 3ª Geração Ryzen / 2ª  <br>Geração Ryzen / 1ª Geração Ryzen / 2ª Geração Ryzen com <br> Radeon Vega Graphics / 1ª Geração Ryzen com Radeon Vega  <br>Graphics / Athlon com processadores Radeon Vega Graphics <br>
            Ultra-Fast PCIe Gen3 x4 M.2 com suporte ao modo PCIe <br> NVMe e SATA <br>
` 
        },
    
        {
            id: 3,
            name: 'Placa Mãe Gigabyte B550M AORUS Elite, Chipset B550, AMD AM4, mATX, DDR4',
            price: 729.98,
            img: '../components/imgProducts/mboard/b550m.png',
            characteristics: `
            Marca: GIGABYTE  <br>
            Fabricante: Gigabyte <br>
            Modelo: B550M AORUS ELITE <br>
            Altura do produto: 35 milímetros <br>
            Largura do produto: 24,4 centímetros <br>
            Tipo de soquete do processador: Soquete AM4 <br>
            Tecnologia da memória: DDR4 <br>
            Tipo de Memória: DDR4 SDRAM <br>
            Máximo de memória RAM compatível: 128 GB <br>
            Velocidade do clock de memória: 4733 MHz <br>
            Interface da placa de vídeo: PCI Express <br>
            Número de portas USB 2.0: 4 <br>
            Número de Conexões HDMI: 1 <br>
            Peso do produto: 1 Kilograms <br>
            Dimensões do produto: 24,4 x 24,4 x 3,5 cm; 1 quilogramas <br>
            `
        },
    
    ],

    [
        {
            id: 1,
            name: 'HD Seagate BarraCuda, 1TB, 3.5, SATA',
            price: 317.90,
            img: '../components/imgProducts/armaz/hd-1TB.png',
            characteristics: `
            Marca: Seagate <br>
            Capacidade de armazenamento digital: 1 TB(TeraByte) <br>
            Interface do disco rígido: Serial ATA-600 <br>
            Tipo de conexão: SATA <br>
            Cor: cinza <br>
            Altura do produto: 2,01 centímetros <br>
            Largura do produto: 10,16 centímetros <br>
            Tipo de Memória: EDO DRAM <br>
            Tamanho do HD: 1 TB <br>
            Tecnologia do HD: Disco rígido mecânico <br>
            Velocidade do HD: 7200 RPM(rotações por minuto ) <br>
            Potência em watts: 5.3 watts <br>
            Peso do produto: 349 g <br>
            Dimensões do produto: 14,69 x 10,16 x 2,01 cm; 349,27 g  <br>
            `

        },
        
        {
            id: 2,
            name: 'SSD Kingston NV2 500GB NVMe M.2 2280 ',
            price: 312.00,
            img: '../components/imgProducts/armaz/nvme-500gb.png',
            characteristics: `
            Capacidade de armazenamento digital: 500 GB <br>
            Interface do disco rígido: NVMe <br>
            Marca: Kingston <br>
            Tipo de conexão: PCIe <br>
            Cor: Azul <br>
            Peso do produto: 7 g <br>
            Dimensões do produto: 8 x 2,2 x 0,38 cm; 7 g <br>
            `
        },
        
        {
            id: 3,
            name: 'HD SSD Kingston SA400S37 480GB ',
            price: 259.90,
            img: '../components/imgProducts/armaz/ssd.png',
            characteristics: `
            Capacidade de armazenamento digital: 480 GB <br>
            Tipo de conexão: SATA <br>
            Marca: Kingston <br>
            Velocidade de leitura: 500 MB <br>
            Peso do produto: 60 Gramas <br>`
        },
        
    ],

    [
        {
            id: 1,
            name: 'Gabinete Gamer Pichau HX300M Glass, Mid-tower, Lateral de Vidro, Branco',
            price: 258.90,
            img: '../components/imgProducts/gabinete/hx300.png',
            characteristics: `
            Marca: Pichau <br>
            Modelo: PG-HX3-WHM1  <br>
            Compatibilidade da placa-mãe: Mini ITX e mATX <br>
            Entradas: 1 x USB 3.0, 2 x USB 2.0 e Áudio HD.  <br>
            Cor: Branco <br>
            Material: Vidro <br>
            Método de refrigeração: Ar e Água <br>
            Ventoinhas incluídas: 1 x 120 mm Branca, Sem LED <br>
            Ventoinhas suportadas: Superior: 2 x 120 mm | Traseira: 1 x 120 mm <br>
            Water cooler suportado: Traseira: 120 mm <br>
            Altura máxima do cooler da CPU: 160 mm <br>
            Comprimento máximo da VGA(placa de vídeo): 350 mm <br>
            Dimensões (CxLxA): 365 x 210 x 385 mm <br>
            Baias: 2 x 3,5" | 4 x 2,5" <br>

`
        },
        
        {
            id: 2,
            name: 'GABINETE MICRO ATX SEM FONTE F02 PRETO BRX ',
            price: 100.69,
            img: '../components/imgProducts/gabinete/brx.png',
            characteristics: `
            Marca: BRX <br>
            Peso do produto:2 600 Gramas <br>
            Fabricante: BRX <br>
            Dimensões do produto: 40 x 24 x 47 cm; 2,6 quilogramas <br>
            Posição da fonte: topo <br>
            Número de entradas: 2 x USB, 1 x microfone, 1 x fone de ouvido <br>
            `
        },
        
        {
            id: 3,
            name: 'Gabinete Redragon Wideload Pro CA-604B-PRO',
            price: 389.98,
            img: '../components/imgProducts/gabinete/CA-604B-PRO.png',
            characteristics: `
            Modelo: Gabinete Redragon Wideload Pro Preto CA-604B-PRO <br>
            Marca: Redragon <br>
            Classe de tamanho: Mid Tower <br>
            Materiais: Aço SPCC e Vidro Temperado <br>
            Cor: Preto <br>
            Suporte para tamanho de placa mãe: ATX, Micro-ATX, Mini-ITX <br>
            Slots de expansão PCI: 6 <br>
            Baia de discos: 2x 2.5" e 2x 3.5"  <br>
            Conexões do painel frontal: 1x USB 3.0, 1x USB 2.0, P3 (microfone + fone) <br>
            Suporte para fans: Topo: 3x 120 mm ou 2x 140mm | Lateral: 2x 120mm | Inferior: 3x 120mm ou 2x 140mm | Traseira: 1x 120mm <br>
            Ventoinhas incluídas: Nenhuma <br>
            Suporte para Water Coolers: Topo: 360mm ou 280mm | Lateral: 240mm | Inferior: 360mm ou 280mm <br>
            Comprimento de placa de vídeo: 395 mm <br>
            Altura para air cooler: 175 mm <br>
            Peso bruto(g): 7500 <br>
            Peso líquido(g): 5900 <br>
            Dimensões do Produto: 308mm (L) x 395 mm (A) x 428 mm (P) <br>
            Dimensões da Caixa: 378mm (L) x 446 mm (A) x 514 mm (P) <br>
            `
        },
        
    ],

    [
        {
            id: 1,
            name: 'Corsair FONTE ATX 750W - CV750-80 PLUS BRONZE - COM CABO DE FORÇA',
            price: 789.90,
            img: '../components/imgProducts/fontes/cv750w.png',
            characteristics: `
            Marca: 	Corsair <br>
            Modelo: CP-9020237-BR <br>
            Versão: ATX12V: v2.31 <br>
            Tecnologia da ventoinha: Sleeve <br>
            Tamanho da ventoinha: 120mm <br>
            Modo Zero RPM: Não <br>
            Modular: Não <br>
            Horas: MTBF 100.000 horas <br>
            Pronto para multi-GPU: Não <br>
            Potência: 750 watts <br>
            Formato PSU: ATX <br>
            Conector: 1 x Conector ATX | 2 x Conector PCIe | 7 x Conector SATA | 2 x Conector EPS12V <br> | 1 x Conector de Floppy`
        },
        
        {
            id: 2,
            name: 'Fonte de Alimentação Redragon 500W 80 Plus Bronze PFC Ativo S/Cabo',
            price: 314.39,
            img: '../components/imgProducts/fontes/reddragon-500w.png',
            characteristics: `
            Nome: Redragon RGPS 500W <br>
            Tamanho do ventilador: 140mm <br>
            Fonte de Alta Performance 500W (80 PLUS Bronze) <br>
            Certificado de Eficiência: 80 PLUS Bronze <br>
            Conectores: 24P(20+4) x 1 | Molex x 2 | SATA x 6 | PCI-E 8P(6+2) x 1 | CPU 8P(4+4) x 1 
            PFC Ativo <br>
            OBS: Não acompanha cabo de energia. <br>
            Dimensões da Fonte: 160 x 150 x 86 MM <br>
            Cabo: 500 MM <br>
            `
        },
        
        {
            id: 3,
            name: 'FONTE ATX 650W - CV650-80 PLUS BRONZE - COM CABO DE FORCA',
            price: 449.00,
            img: '../components/imgProducts/fontes/cv650w.png',
            characteristics: `
            Marca: Corsair <br>
            Modelo:	CP-9020236-BR <br>
            Versão ATX12V: 	v2.31 <br>
            Temperatura nominal: 30 ° C <br>
            Potência: 650 watts <br>
            Tecnologia de rolamento: Sleeve <br>
            Tamanho da ventoinha: 120mm <br>
            MTBF: 100.000 horas <br>
            Eficiência: 80 PLUS Bronze <br>
            Formato: ATX <br>
            Tipo de cabo: Sleeve pretos e planos <br>
            Versão EPS12V: v2.92 <br>
            Proteções: OVP (sobretensão) <br>
            UVP (subtensão) <br>
            SCP (curto-circuito) <br>
            OTP (sobretensão) <br>
            OPP (sobretensão) <br>
            Conectores: 1 x Conector ATX | 1 x Conector EPS12V | 1 x Conector de disquete | 2 x Conector PCIe | 7 x Conector SATA
            Dimensões: 	150 mm x 86 mm x 125 mm <br>`
        },
    ],

    [
        {
            id: 1,
            name: 'Monitor AOC 23,8',
            price: 539.10,
            img: '../components/imgProducts/monitores/aoc23.png',
            characteristics: `
            Marca: AOC <br>
            Tamanho da tela: 24 Polegadas <br>
            Resolução: 2K DCI 1080p <br>
            Proporção de tela: 16:9 <br>
            Tempo de resposta: 6 Milliseconds <br>
            Cor: Preto <br>
            Altura do produto: 36,3 milímetros <br>
            Largura do produto: 54 centímetros <br>
            Resolução da tela: 1920 x 1080 pixels <br>
            Tecnologia de conexão: VGA, HDMI <br>
            Número de Conexões HDMI: 1 <br>
            Voltagem: 90 Volts, 240 Volts <br>
            Etiqueta Nacional de Eficiência Energética (ENCE): Ligado < 24 Watts (máximo), Ligado < 21 Watts (típico), Stand By < 0,5 Watt <br>
            Peso do produto: 2,7 Kilograms <br>
            Dimensões do produto: 32,09 x 53,95 x 3,63 cm; 2,7 quilogramas <br>
            Número do modelo: 24B1XHM  <br>
            Características especiais: Bordas Ultrafinas | Anti-reflexivo | Adaptive-Sync | Low Blue Mode | O monitor possui saída de áudio P2 para fone de ouvido (não possui caixas de som) <br>

            `
        },
        
        {
            id: 2,
            name: 'AOC Hero 27" - Monitor Gamer, 144Hz IPS 1ms G-Sync Compatible 27G2, Preto ',
            price: 1299.00,
            img: '../components/imgProducts/monitores/aoc-hero27.png',
            characteristics: `
            Tipo de Tela: 23,8" Widescreen IPS <br>
            Resolução: 2560 x 1440 QHD <br>
            Brilho: 250 cd/m² <br>
            Taxa de atualização: 155 Hz <br>
            Tempo de Resposta: 1 ms <br>
            Alto-Falantes incluidos: Nenhum <br>
            Tamanho do painel: 27 polegadas" <br>
            Proporção de tela: 16:9 <br>
            Formato de tela: Widescreen <br>
            Tipo de Painel: VA <br>
            Iluminação do painel: W-LED <br>
            Resolução Máxima: HDMI2.0 : 2560 x 1440@144Hz DP1.2 : 2560 x 1440@155Hz <br>
            Taxa de Atualização: 155 Hz <br>
            Suporte de cores: Maior que 16 Milhões <br>
            Conexões: 2x HDMI 2.0a | 1x Display Port 1.2 | 1x Saída de Áudio <br>
            Recursos: Tecnologia Anti Luz Azul | Tecnologia Anti-Cintilação | Base ajustável  <br>
            Dimensões Monitor com base: (L x A x P) - mm 612,5 x (398,6 ~ 528,6) x 227,4 mm <br>
            Dimensões Monitor sem base: (L x A x P) - mm 612,5 x 365,8 x 46,6 mm <br>
            Dimensões Embalagem (L x A x P) - mm <br>
            `
        },
        
        {
            id: 3,
            name: 'Samsung T350 - Monitor Gamer, 24", FHD, 75Hz, HDMI, VGA, Freesync, Preto ',
            price: 609.00,
            img: '../components/imgProducts/monitores/t350.png',
            characteristics: `
            Tamanho da Tela: 24 polegadas  <br>
            Tipo de Painel: IPS <br>
            Curvatura da Tela: Plano <br>
            Brilho (típico): 250 cd/m² <br>
            Resolução: 1920 x 1080 <br>
            Proporção de Tela: 16:09 <br>
            Tempo de Resposta: 5 ms <br>
            Taxa de Atualização: Max 75Hz <br>
            Ângulo de Visão (Horizontal / Vertical): 178°/178° <br>
            Suporte de Cores: Max 16.7 <br>
            Entrada de Sinal: 1x vga | 1x HDMI 1. <br>
            Recursos: Eco Saving Plus, Eye Saver Mode, Flicker Free, Game mode, Image Size, FreeSync, Off Timer Plus <br>
            Certificação Windows: Windows 1 <br>
            Cor: Preto <br>
            Inclinação Ajustável: -2.0° ~ +20.0°- VESA (mm): 100 x 100 <br>
            `
        },
        
    ],

    [
        {
            id: 1,
            name: 'Caixa de Som Gamer Redragon Anvil RGB Branco - GS560W',
            price: 339.90,
            img: '../components/imgProducts/som/gs560w.png',
            characteristics: `
            Marca: RedDragon <br>
            Nome do modelo: GS560W <br>
            Tipo de alto-falante: Componente <br>
            Configuração de canais de som surround: 2.0 <br>
            Cor: branco <br>
            Dimensões do produto: 10,6P x 11L x 44,6A centímetros <br>
            Peso do produto: 921 Gramas <br>
            Fabricante: Redragon <br>
            Modelo: GS560 <br>
            Conectividade do alto-falante: USB com fio + 3,5 mm <br>
            Potência em watts: 4 watts <br>
            Peso do produto: 921 g <br>
            Resposta de frequência: 150 Hz <br>
            Tecnologia de conectividade: com fio <br>
            Modo de saída de áudio: Surround <br>
            `
        },
        
        {
            id: 2,
            name: 'CX DE SOM SOUNDBAR GAMER REDRAGON ADIEMUS - GS560 ',
            price: 369.00,
            img: '../components/imgProducts/som/gs560.png',
            characteristics: `
            Nome: Soundbar Gamer Redragon Adiemus RGB <br>
            Modelo: GS560 <br>
            Material da soundbar: Plástico ABS <br>
            Potência RMS: 3W 2 (THD1%) <br>
            Potência PMPO: 10W <br>
            Impedância dos falantes: 4Ω3W <br>
            Resposta em frequência: 150Hz - 20KHz <br>
            Conectores: 1x USB 2.0, 1x 3.5mm  <br>
            Roda de volume: Sim <br>
            Características especiais: Design elegante e minimalista que se adapta a qualquer ambiente | Iluminação RGB na base da unidade para trazer mais brilho ao setup do usuário | Roda de volume na parte frontal da unidade para ajustes rápidos de volume | Botão touch capacitivo na parte superior para mais praticidade. <br>
            `
        },
        
        {
            id: 3,
            name: 'C3Tech Caixa de som SP-301BK Preto - Sistema de audio 2.0 P2 Com Blindagem Eletromagnética alimentacao via porta USB ',
            price: 24.90,
            img: '../components/imgProducts/som/g3tech.png',
            characteristics: `
            Marca: C3TECH <br>
            Potência máxima de saída dos alto-falantes: 3 Watts <br>
            Resposta de frequência: 20 Hz <br>
            Tecnologia de conectividade: USB <br>
            Configuração de canais de som surround: 2.0 <br>
            Cor: Preto <br>
            Dimensões do produto: 6,5P x 6,5L x 6,9A centímetros <br>
            Peso do produto: 220 Gramas <br>
            Impedância: 40 Ohm <br>
            Fabricante: C3 TECH <br>
            Modelo: SP-301 <br>
            Tipo de amplificação do alto-falante: Ativo <br>
            Porta de áudio: Jack de 3,5 mm <br>
            Tipo de material: Plástico <br>
            Conexões: USB <br>
            Distância focal máxima: USB 2.0, Áudio estéreo <br>
            Peso do produto: 220 g <br>
            `
        },
    ],

    [
        {
            id: 1,
            name: 'Redragon TECLADO MECANICO GAMER FIZZ RGB PRETO SWITCH MARROM',
            price: 208.44,
            img: '../components/imgProducts/perifericos/redDragon-fizz.png',
            characteristics: `
            Acionamento: Mecânico  <br>
            Hotswap DIY: Sim <br>
            COR: Preto <br>
            Formato: 60% <br>
            Design: Carcaça alta <br>
            Layout: ABNT2 <br>
            Conectividade: USB 2.0 Tipo C <br>
            Altura Ajustável: Sim <br>
            Materiais do case: Plástico ABS <br>
            Iluminação: Rainbow <br>
            Rollover: N-Key Rollover <br>
            Comprimento do cabo: 1.8 m <br>
            Keycaps: ABS doubleshot <br>
            Características: Layout compacto 60% para os gamers que procuram deixar o máximo de espaço possível sobre a mesa | Cabo USB Tipo C removível para maior praticidade durante o transporte |  Keycaps feitas com o método double shot injection resultando em legendas duradouras |  Layout ABNT2 feito especialmente para o mercado brasileiro <br>
            `
        },
        
        {
            id: 2,
            name: 'Mouse Gamer Logitech G203 LIGHTSYNC RGB, Efeito de Ondas de Cores, 6 Botões Programáveis e Até 8.000 DPI - Preto ',
            price: 149.88,
            img: '../components/imgProducts/perifericos/Logitech-G203.png',
            characteristics: `
            Marca: Logitech <br>
            Modelo: Logitech g203 <br>
            Resolução do sensor: 200 - 8.000 DPI <br>
            Formato de dados USB: 16 bits/eixo <br>
            Taxa de transmissão USB: 1000 Hz (1 ms) <br>
            Microprocessador: 32 bits ARM <br>
            Altura: 116,6 mm <br>
            Largura: 62,15 mm <br>
            Profundidade: 38,2 mm <br>
            Comprimento do cabo: 2,1  <br>
            Recursos especiais: Sensor para jogos de 8.000 DPI | Iluminação RGB LIGHTSYNC totalmente personalizável | Design clássico com 6 botões personalizáveis | Exclusivo sistema de tensionamento dos botões esquerdo e direito <br>
            Peso: 150 gramas <br>

            `
        },
        
        {
            id: 3,
            name: 'Headphone Fone de Ouvido Havit HV-H2002d, Gamer, com Microfone, Falante 53mm, Plug 3.5mm',
            price: 175.98,
            img: '../components/imgProducts/perifericos/havit-hv-h2002d.png',
            characteristics: `
            Formato do fone de ouvido: Over-ear <br>
            Com luz LED: Não <br>
            Conectividade: com fio <br>
            Com Bluetooth: Não <br>
            Com tecnologia TWS: Não <br>
            Tipos de conectores: Jack 3.5 mm <br>
            Comprimento do cabo: 1.7 m <br>
            Fabricante: Havit <br>
            Marca: Havit <br>
            Modelo: H2002d <br>
            Cor: Preto <br>
            Com microfone: Sim <br>
            Unidade de diafragma: 53 mm <br>
            Impedância: 64 Ω <br>
            Resposta em frequência: 20 Hz - 20 kHz <br>
            Sensibilidade: 110 dB <br>
            Com cancelamento de ruído: Sim <br>
            É resistente à água: Sim <br>
            É à prova d'água: Não <br>
            `
        },
        
    ]

]

let [placasDeVideo, cpu, placaMae, armazenamento, gabinete, fontes, perifericos, monitores, som] = hardwares

